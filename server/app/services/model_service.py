import uuid
from flask import jsonify 
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.models.google import Gemini
from agno.models.groq import Groq
from agno.models.fireworks import Fireworks
from app.config.settings import API_KEYS

MODEL_MAP = {
    "openai": OpenAIChat(id="gpt-4o-mini", api_key=API_KEYS["openai"]),
    "deepseek": Fireworks(
        id="accounts/fireworks/models/deepseek-r1", api_key=API_KEYS["fireworks"]
    ),
    "gemini": Gemini(id="gemini-2.0-flash-exp", api_key=API_KEYS["gemini"]),
    "groq": Groq(id="llama-3.3-70b-versatile", api_key=API_KEYS["groq"]),
    "llama-v3": Fireworks(
        id="accounts/fireworks/models/llama-v3p1-405b-instruct",
        api_key=API_KEYS["fireworks"],
    ),
}

model_name = "gemini"

agent = Agent(
    model=MODEL_MAP[model_name],
    description="""You are a very friendly healthcare AI, named Genrivia, who entirely behaves like a friendly good human being,
    and sometimes entertaining and sigma and too in order to keep the user engaged (You always be sigma and savage while keeping
    the response short and a scolding manner regarding to health). Also, as a professional doctor, you don't answer to questions
    other than your topic. Your specific task is to generate a personalized health and wellness plan for the user based on his
    health factors. You do not suggest the user to see doctor or schedule a medical appointment. YOU ARE THE PROFESSIONAL DOCTOR.
    """,
    add_history_to_messages=True,
    num_history_responses=20,
    read_chat_history=True,
    markdown=True,
)


def initialize():
    prompt = """
    Analyze the user data and generate a personalized health and wellness plan. 
    For this, you will be needing a few details: Age, Gender, Height & Weight (BMI Calculation), Medical history (chronic diseases, allergies), Family medical history (genetic risks) and anything else if you feel is necessary (For exmaple, anything else that is relevant to the user's problem or context) to analyze.
    As you do not have all these informations, simply ask the user for one of them by a follow up question. Then continue asking for all of them gradually in seperate messages. Don't ask to answer all of them at a time, use follow up questions for any of them.

    As soon as you feel like you've got everything necessary, then analyze them and generate the plan in following format.

    RESPONSE FORMAT:
    - **Diet:** Recommended meal plans.
    - **Exercise:** Customized workout routines, include .
    - **Mental Health:** Mindfulness and relaxation techniques.
    - **Health Tips:** Additional suggestions for better well-being including sleep time and stuff. Put some personalized tips for the user as well.

    Do not suggest any medicine directly. If necessary, mention to take suggestion from a professional doctor and specialist.
    ***ALWAYS REMEMBER, YOU ARE A FRIENDLY, SIGMA AND SAVAGE AI DOCTOR, CONCERNED OF USER'S HEALTH ALL THE TIME.***
    """

    agent.run(prompt)


initialize()

def get_model_response(payload):
    try:
        responses = []
        response = agent.run(payload["prompt"])
        assistant_response = {
            "id": str(uuid.uuid4()),
            "role": "assistant",
            "content": "",
            "reasoning": response.content.strip(),
        }
        responses.append(assistant_response)

        return jsonify(responses)

    except Exception as e:
        return jsonify({"error": str(e)}), 500
