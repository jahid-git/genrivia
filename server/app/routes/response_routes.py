from flask import Blueprint, request, jsonify
from app.services.model_service import get_model_response

response_bp = Blueprint("response", __name__)

@response_bp.route('/api/test', methods=['GET'])
def get_response():
    prompt = request.args.get('prompt')
    model_name = request.args.get('model', 'openai')

    if not prompt:
        return jsonify({'error': 'Prompt parameter is required'}), 400

    response_data = get_model_response(model_name, prompt)
    return jsonify(response_data)
