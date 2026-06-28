"""File ingestion and indexing for Brain CLI."""
from pathlib import Path
from typing import Optional
import frontmatter
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler, FileModifiedEvent, FileCreatedEvent, FileDeletedEvent
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn
from db import get_db
from embeddings import get_embedding_generator
from config import NOTES_DIR

console = Console()


def extract_note_content(filepath: Path) -> tuple[str, str]:
    """
    Extract title and content from a markdown file.

    Returns:
        (title, content) tuple
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            post = frontmatter.load(f)

        # Get title from frontmatter or first heading or filename
        title = post.get('title')
        if not title:
            # Try to extract from first line if it's a heading
            content_lines = post.content.strip().split('\n')
            if content_lines and content_lines[0].startswith('#'):
                title = content_lines[0].lstrip('#').strip()
            else:
                title = filepath.stem

        content = post.content.strip()
        return title, content
    except Exception as e:
        console.print(f"[red]Error reading {filepath}: {e}[/red]")
        return filepath.stem, ""


def index_note(filepath: Path, show_progress: bool = True) -> bool:
    """
    Index a single note file.

    Returns:
        True if successful, False otherwise
    """
    try:
        if not filepath.exists():
            if show_progress:
                console.print(f"[yellow]File not found: {filepath}[/yellow]")
            return False

        title, content = extract_note_content(filepath)

        if not content:
            if show_progress:
                console.print(f"[yellow]Empty note: {filepath}[/yellow]")
            return False

        # Generate embedding
        embedder = get_embedding_generator()
        embedding = embedder.generate(content)

        # Store in database
        db = get_db()
        db.upsert_note(
            filepath=str(filepath),
            title=title,
            content=content,
            embedding=embedding,
            last_modified=filepath.stat().st_mtime
        )

        if show_progress:
            console.print(f"[green]✓[/green] Indexed: {filepath.name}")

        return True
    except Exception as e:
        if show_progress:
            console.print(f"[red]Error indexing {filepath}: {e}[/red]")
        return False


def ingest_all(notes_dir: Optional[Path] = None) -> int:
    """
    Ingest all markdown files in the notes directory.

    Returns:
        Number of notes indexed
    """
    if notes_dir is None:
        notes_dir = NOTES_DIR

    # Find all markdown files
    md_files = list(notes_dir.rglob("*.md"))

    if not md_files:
        console.print(f"[yellow]No markdown files found in {notes_dir}[/yellow]")
        return 0

    console.print(f"[cyan]Found {len(md_files)} markdown files[/cyan]")

    # Index all files with progress bar
    indexed_count = 0
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("Indexing notes...", total=len(md_files))

        for filepath in md_files:
            if index_note(filepath, show_progress=False):
                indexed_count += 1
            progress.advance(task)

    console.print(f"[green]✓ Indexed {indexed_count}/{len(md_files)} notes[/green]")
    return indexed_count


class NoteFileHandler(FileSystemEventHandler):
    """Watches for changes to markdown files and auto-indexes them."""

    def on_modified(self, event):
        if isinstance(event, FileModifiedEvent) and event.src_path.endswith('.md'):
            filepath = Path(event.src_path)
            console.print(f"[dim]File modified: {filepath.name}[/dim]")
            index_note(filepath)

    def on_created(self, event):
        if isinstance(event, FileCreatedEvent) and event.src_path.endswith('.md'):
            filepath = Path(event.src_path)
            console.print(f"[dim]File created: {filepath.name}[/dim]")
            index_note(filepath)

    def on_deleted(self, event):
        if isinstance(event, FileDeletedEvent) and event.src_path.endswith('.md'):
            filepath = Path(event.src_path)
            console.print(f"[dim]File deleted: {filepath.name}[/dim]")
            db = get_db()
            db.delete_note(str(filepath))
            console.print(f"[green]✓[/green] Removed from index: {filepath.name}")


def watch_notes(notes_dir: Optional[Path] = None):
    """
    Watch the notes directory for changes and auto-index.

    This is a blocking call that runs until interrupted.
    """
    if notes_dir is None:
        notes_dir = NOTES_DIR

    console.print(f"[cyan]Watching {notes_dir} for changes...[/cyan]")
    console.print("[dim]Press Ctrl+C to stop[/dim]")

    event_handler = NoteFileHandler()
    observer = Observer()
    observer.schedule(event_handler, str(notes_dir), recursive=True)
    observer.start()

    try:
        observer.join()
    except KeyboardInterrupt:
        observer.stop()
        console.print("\n[yellow]Stopped watching[/yellow]")

    observer.join()
