#!/bin/bash

# Brain CLI Setup Script
# Creates notes directory, installs dependencies, and runs setup wizard

set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║   ██████╗ ██████╗ ███████╗ ██████╗ ██╗  ██╗██╗   ██╗       ║"
echo "║   ██╔══██╗██╔══██╗██╔════╝██╔════╝ ██║  ██║╚██╗ ██╔╝       ║"
echo "║   ██████╔╝██████╔╝█████╗  ██║  ███╗███████║ ╚████╔╝        ║"
echo "║   ██╔══██╗██╔══██╗██╔══╝  ██║   ██║██╔══██║  ╚██╔╝         ║"
echo "║   ██████╔╝██║  ██║███████╗╚██████╔╝██║  ██║   ██║          ║"
echo "║   ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝          ║"
echo "║                                                            ║"
echo "║              🧠 Personal Second Brain 🧠                   ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Create notes directory
NOTES_DIR="$HOME/notes"
if [ ! -d "$NOTES_DIR" ]; then
    echo "📁 Creating notes directory at $NOTES_DIR"
    mkdir -p "$NOTES_DIR"
    echo "   ✓ Created!"
else
    echo "📁 Notes directory already exists at $NOTES_DIR"
fi

# Install dependencies
echo ""
echo "📦 Installing Python dependencies..."
pip install -r requirements.txt --quiet
echo "   ✓ Dependencies installed!"

# Run setup wizard
echo ""
echo "⚙️  Launching setup wizard..."
echo ""

python cli.py setup

echo ""
echo "═════════════════════════════════════════════════════════════"
echo ""
echo "✨ You're all set! Here's your cheatsheet:"
echo ""
echo "   brain ingest          Index all notes in ~/notes/"
echo "   brain watch           Watch for changes and auto-index"
echo "   brain search <query>  Semantic search across notes"
echo "   brain chat            Interactive chat with your brain"
echo "   brain summarize <file> Generate summary + tags"
echo "   brain related <file>  Find related notes"
echo "   brain viz             Launch 3D visualization"
echo "   brain stats           Show brain statistics"
echo ""
echo "═════════════════════════════════════════════════════════════"
echo ""
