"""HTTP server for 3D brain visualization."""
import json
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import webbrowser
import threading
from typing import Dict, List, Any
from db import get_db
from search import cosine_similarity
from config import VIZ_PORT

VIZ_DIR = Path(__file__).parent


class VizHandler(SimpleHTTPRequestHandler):
    """Custom handler for serving visualization."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(VIZ_DIR), **kwargs)

    def do_GET(self):
        if self.path == '/':
            # Serve index.html
            self.path = '/index.html'
            return SimpleHTTPRequestHandler.do_GET(self)
        elif self.path == '/api/graph':
            # Serve graph data
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            data = self._get_graph_data()
            self.wfile.write(json.dumps(data).encode())
        elif self.path.startswith('/api/open'):
            # Open file in editor
            filepath = self.path[len('/api/open?path='):]
            try:
                import subprocess
                subprocess.run(['xdg-open', filepath], check=False)
                self.send_response(200)
                self.end_headers()
            except Exception as e:
                self.send_error(500, str(e))
        else:
            return SimpleHTTPRequestHandler.do_GET(self)

    def _get_graph_data(self) -> Dict[str, Any]:
        """Get nodes and edges for visualization."""
        db = get_db()
        notes = db.get_all_notes()

        # Build nodes
        nodes = []
        note_embeddings = []

        for note in notes:
            if note.get('embedding') is not None:
                note_embeddings.append((note['id'], note['embedding']))

            nodes.append({
                'id': note['id'],
                'title': note['title'],
                'tags': note.get('tags', []),
                'summary': note.get('summary', ''),
                'connections_count': 0,  # Will be calculated
                'created_at': note.get('created_at', 0)
            })

        # Build edges (only where similarity > 0.45)
        edges = []
        connection_counts = {n['id']: 0 for n in nodes}

        for i, (id1, emb1) in enumerate(note_embeddings):
            for id2, emb2 in note_embeddings[i+1:]:
                similarity = cosine_similarity(emb1, emb2)
                if similarity > 0.45:
                    edges.append({
                        'source': id1,
                        'target': id2,
                        'similarity': float(similarity)
                    })
                    connection_counts[id1] += 1
                    connection_counts[id2] += 1

        # Update connection counts
        for node in nodes:
            node['connections_count'] = connection_counts.get(node['id'], 0)

        return {'nodes': nodes, 'edges': edges}

    def log_message(self, format, *args):
        # Suppress default logging
        pass


def start_server(open_browser: bool = True):
    """Start the visualization server."""
    server = HTTPServer(('localhost', VIZ_PORT), VizHandler)

    url = f'http://localhost:{VIZ_PORT}'

    if open_browser:
        # Open in browser after a short delay
        def open_url():
            webbrowser.open(url)

        threading.Timer(0.5, open_url).start()

    print(f"🧠 Visualization running at {url}")
    print("Press Ctrl+C to stop")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[yellow]Server stopped[/yellow]")
        server.shutdown()
