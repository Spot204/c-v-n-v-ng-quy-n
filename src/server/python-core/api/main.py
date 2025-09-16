from flask_cors import CORS
from flask import Flask, request, jsonify

from ahp import lookup_data

app =  Flask(__name__)
CORS(app)

@app.route('/api/ahp', methods =['POST'])

def ahp_api():
    try:
        data = request.get_json()
        result = lookup_data(data)
        return request
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
if __name__ == '__main__':
    app.run(port=5000, debug=True)
