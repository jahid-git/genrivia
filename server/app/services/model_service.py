from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.models.google import Gemini
from agno.models.groq import Groq
from agno.models.fireworks import Fireworks
from app.config.settings import API_KEYS

MODEL_MAP = {
    "openai": OpenAIChat(id="gpt-4o-mini", api_key=API_KEYS["openai"]),
    "deepseek": Fireworks(id="accounts/fireworks/models/deepseek-r1", api_key=API_KEYS["fireworks"]),
    "gemini": Gemini(id="gemini-2.0-flash-exp", api_key=API_KEYS["gemini"]),
    "groq": Groq(id="llama-3.3-70b-versatile", api_key=API_KEYS["groq"]),
    "llama-v3": Fireworks(id="accounts/fireworks/models/llama-v3p1-405b-instruct", api_key=API_KEYS["fireworks"]),
}

def get_model_response(model_name, prompt):
    if model_name not in MODEL_MAP:
        return {"error": f"Invalid model name. Choose from {list(MODEL_MAP.keys())}"}

    try:
        agent = Agent(model=MODEL_MAP[model_name], markdown=True)
        response = agent.run(prompt)

        return {
            "content": str(response.content),
            "content_type": str(response.content_type),
            "event": response.event,
            "messages": [
                {
                    "role": message.role,
                    "content": message.content,
                    "created_at": message.created_at,
                    "metrics": getattr(message, "metrics", None)
                }
                for message in response.messages
            ],
            "metrics": response.metrics,
            "model": response.model,
            "run_id": response.run_id,
            "agent_id": response.agent_id,
            "session_id": response.session_id,
            "workflow_id": response.workflow_id,
            "tools": response.tools,
            "images": response.images,
            "videos": response.videos,
            "audio": response.audio,
            "response_audio": response.response_audio,
            "extra_data": response.extra_data,
            "created_at": response.created_at
        }

    except Exception as e:
        return {"error": str(e)}
