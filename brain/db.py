"""Database schema and helpers for Brain CLI."""
import sqlite3
import json
from pathlib import Path
from typing import Optional, List, Dict, Any
from datetime import datetime
import numpy as np
from cryptography.fernet import Fernet

from config import DB_PATH, get_encryption_key


class Database:
    """SQLite database manager for Brain."""

    def __init__(self):
        self.db_path = DB_PATH
        self.conn: Optional[sqlite3.Connection] = None
        self.cipher = Fernet(get_encryption_key())
        self._init_db()

    def _init_db(self):
        """Initialize database schema."""
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row

        # Create notes table
        self.conn.execute("""
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                filepath TEXT UNIQUE NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                summary TEXT,
                tags TEXT,
                embedding BLOB,
                last_modified REAL NOT NULL,
                created_at REAL NOT NULL
            )
        """)

        # Create config table
        self.conn.execute("""
            CREATE TABLE IF NOT EXISTS config (
                key TEXT PRIMARY KEY,
                value TEXT NOT NULL
            )
        """)

        # Create index for faster searches
        self.conn.execute("""
            CREATE INDEX IF NOT EXISTS idx_notes_filepath ON notes(filepath)
        """)

        self.conn.commit()

    def set_config(self, key: str, value: str, encrypt: bool = False):
        """Store a config value, optionally encrypted."""
        if encrypt:
            value = self.cipher.encrypt(value.encode()).decode()

        self.conn.execute(
            "INSERT OR REPLACE INTO config (key, value) VALUES (?, ?)",
            (key, value)
        )
        self.conn.commit()

    def get_config(self, key: str, decrypt: bool = False) -> Optional[str]:
        """Retrieve a config value, optionally decrypted."""
        cursor = self.conn.execute("SELECT value FROM config WHERE key = ?", (key,))
        row = cursor.fetchone()

        if row is None:
            return None

        value = row["value"]
        if decrypt:
            value = self.cipher.decrypt(value.encode()).decode()

        return value

    def has_config(self) -> bool:
        """Check if initial setup has been completed."""
        provider = self.get_config("provider")
        return provider is not None

    def upsert_note(
        self,
        filepath: str,
        title: str,
        content: str,
        embedding: np.ndarray,
        summary: Optional[str] = None,
        tags: Optional[List[str]] = None,
        last_modified: Optional[float] = None
    ):
        """Insert or update a note in the database."""
        if last_modified is None:
            last_modified = Path(filepath).stat().st_mtime

        now = datetime.now().timestamp()

        # Serialize embedding to bytes
        embedding_bytes = embedding.tobytes()

        # Serialize tags to JSON
        tags_json = json.dumps(tags or [])

        # Check if note exists
        cursor = self.conn.execute(
            "SELECT id FROM notes WHERE filepath = ?",
            (filepath,)
        )
        exists = cursor.fetchone()

        if exists:
            self.conn.execute("""
                UPDATE notes
                SET title = ?, content = ?, summary = ?, tags = ?,
                    embedding = ?, last_modified = ?
                WHERE filepath = ?
            """, (title, content, summary, tags_json, embedding_bytes, last_modified, filepath))
        else:
            self.conn.execute("""
                INSERT INTO notes (filepath, title, content, summary, tags, embedding, last_modified, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """, (filepath, title, content, summary, tags_json, embedding_bytes, last_modified, now))

        self.conn.commit()

    def get_note(self, filepath: str) -> Optional[Dict[str, Any]]:
        """Retrieve a note by filepath."""
        cursor = self.conn.execute(
            "SELECT * FROM notes WHERE filepath = ?",
            (filepath,)
        )
        row = cursor.fetchone()

        if row is None:
            return None

        return self._row_to_dict(row)

    def get_note_by_id(self, note_id: int) -> Optional[Dict[str, Any]]:
        """Retrieve a note by ID."""
        cursor = self.conn.execute(
            "SELECT * FROM notes WHERE id = ?",
            (note_id,)
        )
        row = cursor.fetchone()

        if row is None:
            return None

        return self._row_to_dict(row)

    def get_all_notes(self) -> List[Dict[str, Any]]:
        """Retrieve all notes."""
        cursor = self.conn.execute("SELECT * FROM notes ORDER BY created_at DESC")
        return [self._row_to_dict(row) for row in cursor.fetchall()]

    def get_all_embeddings(self) -> List[tuple[int, np.ndarray]]:
        """Get all note IDs and embeddings for similarity search."""
        cursor = self.conn.execute("SELECT id, embedding FROM notes WHERE embedding IS NOT NULL")
        results = []
        for row in cursor.fetchall():
            embedding = np.frombuffer(row["embedding"], dtype=np.float32)
            results.append((row["id"], embedding))
        return results

    def delete_note(self, filepath: str):
        """Delete a note from the database."""
        self.conn.execute("DELETE FROM notes WHERE filepath = ?", (filepath,))
        self.conn.commit()

    def get_stats(self) -> Dict[str, Any]:
        """Get database statistics."""
        cursor = self.conn.execute("SELECT COUNT(*) as count FROM notes")
        note_count = cursor.fetchone()["count"]

        cursor = self.conn.execute("SELECT tags FROM notes WHERE tags IS NOT NULL")
        all_tags = []
        for row in cursor.fetchall():
            all_tags.extend(json.loads(row["tags"]))

        tag_counts = {}
        for tag in all_tags:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1

        top_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)[:10]

        return {
            "note_count": note_count,
            "total_tags": len(tag_counts),
            "top_tags": top_tags
        }

    def _row_to_dict(self, row: sqlite3.Row) -> Dict[str, Any]:
        """Convert a database row to a dictionary."""
        data = dict(row)

        # Deserialize tags
        if data.get("tags"):
            data["tags"] = json.loads(data["tags"])

        # Deserialize embedding
        if data.get("embedding"):
            data["embedding"] = np.frombuffer(data["embedding"], dtype=np.float32)

        return data

    def close(self):
        """Close database connection."""
        if self.conn:
            self.conn.close()


# Singleton instance
_db_instance: Optional[Database] = None

def get_db() -> Database:
    """Get or create database singleton."""
    global _db_instance
    if _db_instance is None:
        _db_instance = Database()
    return _db_instance
