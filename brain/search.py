"""Semantic search over notes using embeddings."""
import numpy as np
from typing import List, Dict, Any
from db import get_db
from embeddings import get_embedding_generator
from config import TOP_K_RESULTS


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Calculate cosine similarity between two vectors."""
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


def search(query: str, top_k: int = TOP_K_RESULTS) -> List[Dict[str, Any]]:
    """
    Perform semantic search over all notes.

    Args:
        query: Search query text
        top_k: Number of results to return

    Returns:
        List of notes with similarity scores
    """
    db = get_db()
    embedder = get_embedding_generator()

    # Generate query embedding
    query_embedding = embedder.generate(query)

    # Get all note embeddings
    all_embeddings = db.get_all_embeddings()

    if not all_embeddings:
        return []

    # Calculate similarities
    results = []
    for note_id, note_embedding in all_embeddings:
        similarity = cosine_similarity(query_embedding, note_embedding)
        results.append((note_id, similarity))

    # Sort by similarity (descending) and take top k
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
