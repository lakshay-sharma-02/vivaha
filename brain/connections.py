"""Find connections between notes based on embedding similarity."""
import numpy as np
from typing import List, Dict, Any
from pathlib import Path
from db import get_db
from search import cosine_similarity
from config import TOP_K_RESULTS


def find_related(filepath: str, top_k: int = TOP_K_RESULTS) -> List[Dict[str, Any]]:
    """
    Find notes related to the given note.

    Args:
        filepath: Path to the note file
        top_k: Number of related notes to return

    Returns:
        List of related notes with similarity scores
    """
    db = get_db()

    # Get the target note
    target_note = db.get_note(filepath)
    if not target_note or target_note.get("embedding") is None:
        return []

    target_embedding = target_note["embedding"]
    target_id = target_note["id"]

    # Get all other embeddings
    all_embeddings = db.get_all_embeddings()

    # Calculate similarities
    results = []
    for note_id, note_embedding in all_embeddings:
        if note_id == target_id:
            continue  # Skip self

        similarity = cosine_similarity(target_embedding, note_embedding)
        results.append((note_id, similarity))

    # Sort by similarity and take top k
    results.sort(key=lambda x: x[1], reverse=True)
    top_results = results[:top_k]

    # Fetch full note data
    enriched_results = []
    for note_id, similarity in top_results:
        note = db.get_note_by_id(note_id)
        if note:
            note["similarity"] = similarity
            enriched_results.append(note)

    return enriched_results
