from flask import Blueprint, request, jsonify
from app.services.model_service import get_model_response

chat_bp = Blueprint("chat", __name__)

@chat_bp.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()

    if "payload" not in data:
        return jsonify({"error": "Payload is required"}), 400

    payload = data["payload"]

    return get_model_response(payload)
