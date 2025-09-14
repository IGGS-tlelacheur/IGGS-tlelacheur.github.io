#!/usr/bin/env python3
"""
Ultra-simple HTTP server for quick testing
Just runs Python's built-in server with minimal setup
"""

import http.server
import socketserver
import os
import webbrowser
import sys

PORT = 8000

def main():
    # Change to script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    # Check if index.html exists
    if not os.path.exists('index.html'):
        print("❌ index.html not found!")
        return

    try:
        with socketserver.TCPServer(("", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
            print(f"✅ Server running at: http://localhost:{PORT}")
            print("🌐 Opening browser...")
            webbrowser.open(f"http://localhost:{PORT}")
            print("⏹️  Press Ctrl+C to stop")
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Stopped")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    main()