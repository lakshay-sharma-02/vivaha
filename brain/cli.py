#!/usr/bin/env python3
"""Brain CLI - Personal second brain tool."""
import sys
from pathlib import Path
from typing import Optional
import typer
from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich import print as rprint

# Import submodules
from setup_wizard import run_setup
from ingest import ingest_all, watch_notes, index_note
from search import search
from connections import find_related
from summarize import summarize_note
from db import get_db
from config import NOTES_DIR

app = typer.Typer(
    name="brain",
    help="🧠 Personal second brain - chat with your notes",
    add_completion=False
)
console = Console()


@app.command()
def setup():
    """Run the interactive setup wizard."""
    run_setup()


@app.command()
def ingest():
    """Index all notes in ~/notes/."""
    console.print(f"[cyan]Indexing notes from {NOTES_DIR}[/cyan]\n")
    count = ingest_all()
    if count > 0:
        console.print(f"\n[green]✓ Ready! Try 'brain search <query>' or 'brain chat'[/green]")


@app.command()
def watch():
    """Watch ~/notes/ for changes and auto-index."""
    watch_notes()


@app.command(name="search")
def search_cmd(
    query: str = typer.Argument(..., help="Search query"),
    limit: int = typer.Option(5, "--limit", "-n", help="Number of results")
):
    """Semantic search across your notes."""
    results = search(query, top_k=limit)

    if not results:
        console.print("[yellow]No results found[/yellow]")
        return

    console.print(f"\n[cyan]Found {len(results)} results for:[/cyan] [bold]{query}[/bold]\n")

    for i, note in enumerate(results, 1):
        similarity = note.get('similarity', 0)
        title = note['title']
        filepath = Path(note['filepath'])

        # Show excerpt
        content = note['content'][:200].replace('\n', ' ')
        if len(note['content']) > 200:
            content += '...'

        console.print(Panel(
            f"[bold]{title}[/bold]\n"
            f"[dim]{filepath.name}[/dim]\n\n"
            f"{content}\n\n"
            f"[dim]Similarity: {similarity:.2%}[/dim]",
            title=f"#{i}",
            border_style="cyan" if i == 1 else "dim"
        ))


@app.command()
def chat():
    """Interactive chat with your notes."""
    from chat import get_llm_client, SYSTEM_PROMPT
    from search import search as semantic_search

    db = get_db()
    provider = db.get_config("provider")

    if provider == "skip":
        console.print("[red]AI features disabled. Run 'brain setup' to configure.[/red]")
        return

    console.clear()
    console.print(Panel.fit(
        "[bold cyan]⬡ Second Brain[/bold cyan]\n\n"
        "Chat with your notes. I'll search your knowledge base for relevant context.\n"
        "[dim]Press Ctrl+C to exit[/dim]",
        border_style="cyan"
    ))

    client = get_llm_client()
    messages = []

    try:
        while True:
            # Get user input
            console.print("\n[bold cyan]You:[/bold cyan]", end=" ")
            user_input = input().strip()

            if not user_input:
                continue

            # Search for relevant context
            with console.status("[dim]Searching notes...[/dim]"):
                results = semantic_search(user_input, top_k=5)

            # Build context from results
            context_parts = []
            if results:
                for note in results:
                    context_parts.append(
                        f"## {note['title']}\n"
                        f"{note['content'][:800]}\n"
                    )

            context = "\n\n".join(context_parts) if context_parts else "No relevant notes found."

            # Build the message with context
            full_prompt = f"Context from your notes:\n\n{context}\n\n---\n\nUser question: {user_input}"
            messages.append({"role": "user", "content": full_prompt})

            # Stream response
            console.print("\n[bold green]Brain:[/bold green] ", end="")
            response = ""
            for chunk in client.chat(messages, system=SYSTEM_PROMPT):
                console.print(chunk, end="")
                response += chunk
            console.print()  # Newline after response

            # Add assistant response to history
            messages.append({"role": "assistant", "content": response})

    except KeyboardInterrupt:
        console.print("\n\n[dim]Goodbye![/dim]")
        sys.exit(0)


@app.command()
def summarize(
    filepath: str = typer.Argument(..., help="Path to note file")
):
    """Generate summary and tags for a note."""
    db = get_db()
    provider = db.get_config("provider")

    if provider == "skip":
        console.print("[red]AI features disabled. Run 'brain setup' to configure.[/red]")
        return

    summarize_note(filepath, write_back=True)


@app.command()
def related(
    filepath: str = typer.Argument(..., help="Path to note file"),
    limit: int = typer.Option(5, "--limit", "-n", help="Number of results")
):
    """Find notes related to the given note."""
    results = find_related(filepath, top_k=limit)

    if not results:
        console.print("[yellow]No related notes found[/yellow]")
        return

    filepath_obj = Path(filepath)
    console.print(f"\n[cyan]Notes related to:[/cyan] [bold]{filepath_obj.name}[/bold]\n")

    for i, note in enumerate(results, 1):
        similarity = note.get('similarity', 0)
        title = note['title']
        note_path = Path(note['filepath'])

        tags = note.get('tags', [])
        tags_str = ', '.join(tags) if tags else 'no tags'

        console.print(
            f"[bold]{i}. {title}[/bold] "
            f"[dim]({similarity:.2%} similar)[/dim]\n"
            f"   {note_path.name}\n"
            f"   [dim]{tags_str}[/dim]\n"
        )


@app.command()
def viz():
    """Launch 3D brain visualization in browser."""
    from viz.server import start_server
    start_server(open_browser=True)


@app.command()
def stats():
    """Show brain statistics."""
    db = get_db()
    stats_data = db.get_stats()

    console.print("\n[bold cyan]🧠 Brain Statistics[/bold cyan]\n")

    # Notes count
    console.print(f"[green]Notes:[/green] {stats_data['note_count']}")
    console.print(f"[green]Unique tags:[/green] {stats_data['total_tags']}\n")

    # Top tags
    if stats_data['top_tags']:
        table = Table(title="Top Tags", show_header=True)
        table.add_column("Tag", style="cyan")
        table.add_column("Count", justify="right", style="green")

        for tag, count in stats_data['top_tags']:
            table.add_row(tag, str(count))

        console.print(table)

    console.print()


def main():
    """Entry point for CLI."""
    # Check if setup is needed on first run
    if len(sys.argv) == 1 or (len(sys.argv) > 1 and sys.argv[1] not in ['setup', '--help', '-h']):
        db = get_db()
        if not db.has_config():
            console.print("[yellow]First time setup required![/yellow]")
            console.print("[dim]Run 'brain setup' to get started[/dim]\n")
            sys.exit(1)

    app()


if __name__ == "__main__":
    main()
