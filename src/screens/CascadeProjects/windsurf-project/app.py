from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Setlist storage file
SETLIST_FILE = 'setlists.json'

def load_setlists():
    """Load setlists from JSON file."""
    if not os.path.exists(SETLIST_FILE):
        return []
    with open(SETLIST_FILE, 'r') as f:
        return json.load(f)

def save_setlists(setlists):
    """Save setlists to JSON file."""
    with open(SETLIST_FILE, 'w') as f:
        json.dump(setlists, f, indent=2)

@app.route('/')
def index():
    """Render the main page."""
    return render_template('index.html')

@app.route('/setlists', methods=['GET'])
def get_setlists():
    """Retrieve all setlists."""
    setlists = load_setlists()
    return jsonify(setlists)

@app.route('/setlists', methods=['POST'])
def create_setlist():
    """Create a new setlist."""
    setlists = load_setlists()
    new_setlist = request.json
    
    # Generate a unique ID
    new_setlist['id'] = len(setlists) + 1 if setlists else 1
    
    setlists.append(new_setlist)
    save_setlists(setlists)
    return jsonify(new_setlist), 201

@app.route('/setlists/<int:setlist_id>', methods=['PUT'])
def update_setlist(setlist_id):
    """Update an existing setlist."""
    setlists = load_setlists()
    for setlist in setlists:
        if setlist['id'] == setlist_id:
            setlist.update(request.json)
            save_setlists(setlists)
            return jsonify(setlist)
    return jsonify({"error": "Setlist not found"}), 404

@app.route('/setlists/<int:setlist_id>', methods=['DELETE'])
def delete_setlist(setlist_id):
    """Delete a setlist."""
    setlists = load_setlists()
    setlists = [sl for sl in setlists if sl['id'] != setlist_id]
    save_setlists(setlists)
    return '', 204

if __name__ == '__main__':
    app.run(debug=True)
