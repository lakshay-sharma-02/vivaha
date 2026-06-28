"""Local embeddings generation using sentence-transformers."""
from sentence_transformers import SentenceTransformer
import numpy as np
from typing import List
from config import EMBEDDING_MODEL


class EmbeddingGenerator:
    """Generates embeddings using local sentence-transformers model."""

    def __init__(self):
        self.model = SentenceTransformer(EMBEDDING_MODEL)

    def generate(self, text: str) -> np.ndarray:
        """Generate embedding for a single text."""
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding.astype(np.float32)

    def generate_batch(self, texts: List[str]) -> List[np.ndarray]:
        """Generate embeddings for multiple texts."""
        embeddings = self.model.encode(texts, convert_to_numpy=True, show_progress_bar=True)
        return [emb.astype(np.float32) for emb in embeddings]


# Singleton instance
_embedding_generator: EmbeddingGenerator = None


def get_embedding_generator() -> EmbeddingGenerator:
    """Get or create embedding generator singleton."""
    global _embedding_generator
    if _embedding_generator is None:
        _embedding_generator = EmbeddingGenerator()
    return _embedding_generator
