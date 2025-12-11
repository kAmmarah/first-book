from ..ai.openai_service import get_openai_response

def translate_content(text: str, target_language: str = "ur"):
    # Map language codes to full names
    language_map = {
        "ur": "Urdu",
        "en": "English",
        "es": "Spanish",
        "fr": "French",
        "de": "German"
    }
    
    target_language_name = language_map.get(target_language, "Urdu")
    
    system_prompt = f"""
    You are an expert translator who translates educational content.
    Translate the provided text to {target_language_name}.
    Maintain the meaning and tone of the original content.
    """
    
    prompt = f"""
    Please translate the following text to {target_language_name}:
    
    {text}
    """
    
    # Get translated content from OpenAI
    translated_text = get_openai_response(system_prompt, prompt)
    
    return translated_text