"""Auto-summarization and tagging for notes."""
from pathlib import Path
from typing import Optional, List
import frontmatter
from rich.console import Console
from db import get_db
from chat import get_llm_client, SYSTEM_PROMPT

console = Console()

SUMMARY_PROMPT = """Summarize the following note in 2-3 sentences. Be concise but capture the key ideas.

Note title: {title}
Content:
{content}

Respond with ONLY the summary, no other text."""

TAGS_PROMPT = """Generate 3-5 relevant tags for this note. Tags should be lowercase, single words or short phrases.

Note title: {title}
Content:
{content}
Summary: {summary}

Respond with ONLY a JSON array of tags, e.g., ["tag1", "tag2", "tag3"]"""


def generate_summary(title: str, content: str) -> str:
    """Generate a summary for a note using LLM."""
    client = get_llm_client()

    prompt = SUMMARY_PROMPT.format(title=title, content=content[:3000])

    response = ""
    for chunk in client.chat(
        messages=[{"role": "user", "content": prompt}],
        system="You are a concise summarizer. Respond with only the summary."
    ):
        response += chunk

    return response.strip()


def generate_tags(title: str, content: str, summary: str) -> List[str]:
    """Generate tags for a note using LLM."""
    import json

    client = get_llm_client()

    prompt = TAGS_PROMPT.format(title=title, content=content[:2000], summary=summary)

    response = ""
    for chunk in client.chat(
        messages=[{"role": "user", "content": prompt}],
        system="You are a tag generator. Respond with only a JSON array of tags."
    ):
        response += chunk

    try:
        # Try to extract JSON from response
        response = response.strip()
        if response.startswith('['):
            tags = json.loads(response)
        else:
            # Try to find JSON array in response
            import re
            match = re.search(r'\[.*?\]', response, re.DOTALL)
            if match:
                tags = json.loads(match.group())
            else:
                tags = []

        return [t.lower().strip() for t in tags if isinstance(t, str)][:5]
    except:
        return []


def summarize_note(filepath: str, write_back: bool = True) -> Optional[dict]:
    """
    Generate summary and tags for a note.

    Args:
        filepath: Path to the note file
        write_back: If True, write summary and tags to frontmatter

    Returns:
        Dict with summary and tags, or None on error
    """
    filepath = Path(filepath)

    if not filepath.exists():
        console.print(f"[red]File not found: {filepath}[/red]")
        return None

    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)

        title = post.get('title', filepath.stem)
        content = post.content

        if not content.strip():
            console.print(f"[yellow]Note is empty: {filepath}[/yellow]")
            return None

        console.print(f"[cyan]Generating summary for: {filepath.name}[/cyan]")

        # Generate summary
        with console.status("[dim]Generating summary...[/dim]"):
            summary = generate_summary(title, content)

        console.print(f"[green]Summary:[/green] {summary}")

        # Generate tags
        with console.status("[dim]Generating tags...[/dim]"):
            tags = generate_tags(title, content, summary)

        console.print(f"[green]Tags:[/green] {', '.join(tags)}")

        # Write back to frontmatter if requested
        if write_back:
            post['summary'] = summary
            post['tags'] = tags

            with open(filepath, 'w', encoding='utf-8') as f:
                frontmatter.dump(post, f)

            console.print(f"[green]✓ Updated frontmatter in {filepath.name}[/green]")

        # Update database
        db = get_db()
        db.upsert_note(
            filepath=str(filepath),
            title=title,
            content=content,
            summary=summary,
            tags=tags,
            last_modified=filepath.stat().st_mtime
        )

        return {"summary": summary, "tags": tags}

    except Exception as e:
        console.print(f"[red]Error: {e}[/red]")
        return None
