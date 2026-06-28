"""Interactive setup wizard for Brain CLI."""
from rich.console import Console
from rich.panel import Panel
from rich.prompt import Prompt
from InquirerPy import inquirer
from db import get_db

console = Console()

# Available providers
ANTHROPIC = "anthropic"
OPENROUTER = "openrouter"
SKIP = "skip"

# Anthropic models
ANTHROPIC_MODELS = [
    ("claude-haiku-4-5-20251001", "Claude Haiku 4.5 (fast, cheap)"),
    ("claude-sonnet-4-6", "Claude Sonnet 4.6 (recommended)"),
    ("claude-opus-4-8", "Claude Opus 4.8 (most capable)"),
]

# OpenRouter free models
OPENROUTER_FREE_MODELS = [
    ("meta-llama/llama-3.3-70b-instruct:free", "Meta Llama 3.3 70B"),
    ("meta-llama/llama-3.1-70b-instruct:free", "Meta Llama 3.1 70B"),
    ("mistralai/mistral-7b-instruct:free", "Mistral 7B"),
    ("google/gemma-2-9b-it:free", "Google Gemma 2 9B"),
    ("deepseek/deepseek-r1:free", "DeepSeek R1"),
    ("microsoft/phi-3-mini-128k-instruct:free", "Microsoft Phi-3 Mini"),
]


def run_setup():
    """Run the interactive setup wizard."""
    console.clear()

    console.print(Panel.fit(
        "[bold cyan]⬡ Second Brain Setup[/bold cyan]\n\n"
        "Let's configure your AI provider for chat and summarization features.\n"
        "[dim]Note: Semantic search works locally without any API keys.[/dim]",
        border_style="cyan"
    ))

    # Step 1: Choose provider
    provider_choice = inquirer.select(
        message="Choose your AI provider:",
        choices=[
            {"name": "Anthropic (Claude) — needs API key", "value": ANTHROPIC},
            {"name": "OpenRouter — free models available, needs API key", "value": OPENROUTER},
            {"name": "Skip for now (search only, no chat/summarize)", "value": SKIP},
        ],
        default=OPENROUTER,
    ).execute()

    db = get_db()

    if provider_choice == SKIP:
        db.set_config("provider", SKIP)
        console.print("\n[green]✓ Setup complete (search-only mode)[/green]")
        console.print("[dim]Run 'brain setup' anytime to configure AI features.[/dim]")
        return

    # Step 2: Get API key
    if provider_choice == ANTHROPIC:
        console.print("\n[cyan]Get your API key at: https://console.anthropic.com/[/cyan]")
    else:
        console.print("\n[cyan]Get your free API key at: https://openrouter.ai/keys[/cyan]")

    api_key = Prompt.ask("\n[bold]Enter your API key[/bold]", password=True)

    if not api_key.strip():
        console.print("[red]No API key provided. Setup cancelled.[/red]")
        return

    # Step 3: Choose model
    if provider_choice == ANTHROPIC:
        model_choice = inquirer.select(
            message="Choose your model:",
            choices=[{"name": desc, "value": model_id} for model_id, desc in ANTHROPIC_MODELS],
            default="claude-sonnet-4-6",
        ).execute()
    else:
        model_choice = inquirer.select(
            message="Choose your model (all free):",
            choices=[{"name": desc, "value": model_id} for model_id, desc in OPENROUTER_FREE_MODELS],
            default="meta-llama/llama-3.3-70b-instruct:free",
        ).execute()

    # Step 4: Save configuration
    db.set_config("provider", provider_choice)
    db.set_config("api_key", api_key, encrypt=True)
    db.set_config("model", model_choice)

    console.print("\n[green]✓ Setup complete![/green]")
    console.print(f"[dim]Provider: {provider_choice}[/dim]")
    console.print(f"[dim]Model: {model_choice}[/dim]")
    console.print("\n[cyan]Run 'brain ingest' to index your notes, then 'brain chat' to start chatting.[/cyan]")
