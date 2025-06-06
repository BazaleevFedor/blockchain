import openai
import os
from dotenv import load_dotenv
from models import SolutionRequest

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def evaluate_solution(data: SolutionRequest):
    prompt = f"""
    Квест ID: {data.quest_id}
    Решение: {data.solution}

    Проверь решение. Дай фидбэк, score (0-100) и вердикт (pass/fail).
    """
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.3
    )
    content = response.choices[0].message.content
    return {"feedback": content}
