"""LLM abstraction layer for Brain CLI."""
from typing import Iterator, Optional, List, Dict
import anthropic
import requests
import json
from rich.console import Console
from db import get_db

console = Console()

SYSTEM_PROMPT = """
You are Second Brain — a deeply intelligent, almost eerily perceptive thinking partner
built into the user's personal knowledge base.

You don't just retrieve information. You think alongside the user. You notice patterns
they haven't noticed. You connect ideas across notes they wrote months apart. You ask
the question they didn't know they needed to ask.

Your personality:
- Intellectually curious and genuinely excited by ideas
- Direct and sharp — no filler, no corporate padding
- Occasionally surprising — surface a connection or implication that wasn't obvious
- Honest: if the notes don't contain enough to answer well, say so clearly

How you use the provided notes:
- Treat them as the user's actual thoughts, not just documents
- Quote sparingly, synthesize liberally
- When answering, reference specific notes by title when relevant
- Look for tensions, contradictions, or evolutions in thinking across notes

Response style:
- Conversational but substantive
- Structured only when the content genuinely needs it
- End with a follow-up thought or question when it would spark useful reflection

Context provided to you is from semantic search across the user's personal notes.
Treat it as a window into their mind. Think accordingly.
"""


class LLMClient:
    """Unified LLM client supporting Anthropic and OpenRouter."""

    def __init__(self):
        db = get_db()
        self.provider = db.get_config("provider")
        self.api_key = db.get_config("api_key", decrypt=True)
        self.model = db.get_config("model")

        if self.provider == "anthropic":
            self.client = anthropic.Anthropic(api_key=self.api_key)

    def chat(
        self,
        messages: List[Dict[str, str]],
        system: Optional[str] = None
    ) -> Iterator[str]:
        """
        Send a chat request and stream the response.

        Args:
            messages: List of message dicts with 'role' and 'content'
            system: Optional system prompt

        Yields:
            Response text chunks
        """
        if self.provider == "anthropic":
            yield from self._chat_anthropic(messages, system)
        elif self.provider == "openrouter":
            yield from self._chat_openrouter(messages, system)
        else:
            raise ValueError(f"No AI provider configured. Run 'brain setup' first.")

    def _chat_anthropic(
        self,
        messages: List[Dict[str, str]],
        system: Optional[str]
    ) -> Iterator[str]:
        """Chat using Anthropic API."""
        try:
            with self.client.messages.stream(
                model=self.model,
                max_tokens=4096,
                system=system or SYSTEM_PROMPT,
                messages=messages
            ) as stream:
                for text in stream.text_stream:
                    yield text
        except Exception as e:
            console.print(f"[red]Error: {e}[/red]")
            yield ""

    def _chat_openrouter(
        self,
        messages: List[Dict[str, str]],
        system: Optional[str]
    ) -> Iterator[str]:
        """Chat using OpenRouter API."""
        # Prepend system message to messages if provided
        if system:
            messages = [{"role": "system", "content": system}] + messages

        try:
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {self.api_key}",
                    "HTTP-Referer": "brain-cli",
                    "Content-Type": "application/json"
                },
                json={
                    "model": self.model,
                    "messages": messages,
                    "stream": True
                },
                stream=True,
                timeout=60
            )

            response.raise_for_status()

            for line in response.iter_lines():
                if not line:
                    continue

                line = line.decode('utf-8')

                if line.startswith('data: '):
                    data = line[6:]  # Remove 'data: ' prefix

                    if data == '[DONE]':
                        break

                    try:
                        chunk = json.loads(data)
                        delta = chunk.get('choices', [{}])[0].get('delta', {})
                        content = delta.get('content', '')
                        if content:
                            yield content
                    except json.JSONDecodeError:
                        continue

        except Exception as e:
            console.print(f"[red]Error: {e}[/red]")
            yield ""


def get_llm_client() -> LLMClient:
    """Get LLM client instance."""
    return LLMClient()
