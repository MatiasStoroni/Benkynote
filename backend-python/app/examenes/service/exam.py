from openai import OpenAI
import os

# Utilizamos el cliente de openai
api_key = os.getenv('OPENAI_API_KEY')
openai_client = OpenAI(api_key=api_key)

# Generamos el examen
def generate_exam(content: str) -> str:
    response = openai_client.chat.completions.create(
        model = 'ft:gpt-4o-mini-2024-07-18:personal:benkynote-exams-2:A7SW1t08',
        messages = [{'role': 'system','content': 'You are an exam generator. The user will give you one or more notes that can be based on one or more topics/subjects and your job is to generate a deterministic and consistent structured exam taking into account the exam duration and the types of exercises, both parameters that are sent to you in the first line of the input.'},
                    {'role': 'user', 'content': content}]
    )
    return response.choices[0].message