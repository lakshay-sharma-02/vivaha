"""Configuration management for Brain CLI."""
from pathlib import Path
from typing import Optional
import os

# Paths
HOME = Path.home()
BRAIN_DIR = HOME / ".brain"
DB_PATH = BRAIN_DIR / "brain.db"
NOTES_DIR = HOME / "notes"

# Ensure directories exist
BRAIN_DIR.mkdir(parents=True, exist_ok=True)
NOTES_DIR.mkdir(parents=True, exist_ok=True)

# Embeddings
EMBEDDING_MODEL = "all-MiniLM-L6-v2"
EMBEDDING_DIM = 384

# Search
TOP_K_RESULTS = 5
SIMILARITY_THRESHOLD = 0.45

# Visualization
VIZ_PORT = 7007

# Encryption key for API keys (stored in environment or generated)
ENCRYPTION_KEY_PATH = BRAIN_DIR / ".key"

def get_encryption_key() -> bytes:
    """Get or create encryption key for storing API keys."""
    from cryptography.fernet import Fernet

    if ENCRYPTION_KEY_PATH.exists():
        return ENCRYPTION_KEY_PATH.read_bytes()
    else:
        key = Fernet.generate_key()
        ENCRYPTION_KEY_PATH.write_bytes(key)
        ENCRYPTION_KEY_PATH.chmod(0o600)  # Secure permissions
        return key
