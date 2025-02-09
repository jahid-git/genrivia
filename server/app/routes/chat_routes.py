from flask import Blueprint, request, jsonify
from app.services.model_service import get_model_response

chat_bp = Blueprint("chat", __name__)

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    print(data)
    model_name = data.get('model', 'openai')
    prompt = data.get('prompt')

    if not model_name or not prompt:
        return jsonify({'error': 'Model and prompt are required'}), 400

    response_data = get_model_response(model_name, prompt)
    return jsonify(response_data)
