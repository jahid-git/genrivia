from flask import Flask
from flask_cors import CORS
from app.routes.response_routes import response_bp
from app.routes.chat_routes import chat_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(response_bp)
    app.register_blueprint(chat_bp)

    return app
