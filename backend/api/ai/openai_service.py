import openai
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize OpenAI client
client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_openai_response(system_prompt: str, user_prompt: str, model: str = "gpt-3.5-turbo") -> str:
    """
    Get a response from OpenAI's API
    """
    try:
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        # Return a fallback response in case of API error
        return f"Sorry, I encountered an error while processing your request: {str(e)}"

def get_embedding(text: str, model: str = "text-embedding-ada-002") -> list:
    """
    Get embeddings for text using OpenAI's embedding API
    """
    try:
        response = client.embeddings.create(
            input=text,
            model=model
        )
        return response.data[0].embedding
    except Exception as e:
        raise Exception(f"Error getting embedding: {str(e)}")