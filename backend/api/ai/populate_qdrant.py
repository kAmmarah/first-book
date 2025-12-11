#!/usr/bin/env python3
"""
Script to populate the Qdrant collection with sample book content.
"""

import os
import sys
from dotenv import load_dotenv

# Add the parent directory to the path to import from api module
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ai.qdrant_service import store_embeddings
from ai.openai_service import get_embedding

def chunk_text(text, chunk_size=1000, overlap=200):
    """
    Split text into overlapping chunks.
    """
    words = text.split()
    chunks = []
    
    for i in range(0, len(words), chunk_size - overlap):
        chunk = ' '.join(words[i:i + chunk_size])
        chunks.append(chunk)
        if i + chunk_size >= len(words):
            break
    
    return chunks

def main():
    """Main function to populate Qdrant collection with sample content."""
    load_dotenv()
    
    # Sample book content (in a real scenario, this would come from actual book chapters)
    sample_content = {
        "chapter1": {
            "title": "Fundamentals of AI in Education",
            "content": """Artificial Intelligence (AI) is transforming education by enabling personalized learning experiences, automating administrative tasks, and providing intelligent tutoring systems. This chapter introduces the core concepts and applications of AI in educational settings.

AI in education refers to the use of machine learning algorithms, natural language processing, computer vision, and other AI technologies to enhance teaching and learning processes. Unlike traditional educational software, AI systems can adapt to individual learners, provide real-time feedback, and continuously improve based on data.

Key Applications:
1. Personalized Learning Paths: AI systems analyze learner data to create customized learning paths that adapt to individual needs, preferences, and progress rates.
2. Intelligent Tutoring Systems: These systems provide one-on-one instruction and feedback, simulating human tutoring experiences with scalability.
3. Automated Assessment and Feedback: AI can grade assignments, provide instant feedback, and identify areas where students need additional support.
4. Predictive Analytics: By analyzing patterns in student data, AI can predict which students might struggle and intervene early.

Benefits of AI in Education:
Enhanced Personalization: Every learner has unique strengths, weaknesses, and learning preferences. AI enables truly personalized educational experiences that adapt in real-time.
Scalability: Quality education can be scaled to reach more learners without compromising the personal touch that's crucial for effective learning.
Accessibility: AI-powered tools can make education more accessible to learners with disabilities through features like speech-to-text, text-to-speech, and visual assistance.
Data-Driven Insights: Educators gain valuable insights into learning patterns, helping them improve curriculum design and teaching methods.

Challenges and Considerations:
Privacy and Data Security: Educational data is sensitive and must be protected. Institutions must implement robust security measures and transparent data policies.
Equity and Access: While AI can democratize education, unequal access to technology can exacerbate existing educational disparities.
Ethical AI Development: AI systems must be developed with fairness, transparency, and accountability to avoid reinforcing biases or discrimination.

The Future of AI in Education:
As AI technology continues to evolve, we can expect even more sophisticated educational tools that provide hyper-personalized learning experiences, immersive simulations, and seamless integration between physical and digital learning environments."""
        }
    }
    
    print("Populating Qdrant collection with sample content...")
    
    try:
        # Process each chapter
        for chapter_id, chapter_data in sample_content.items():
            print(f"Processing chapter: {chapter_data['title']}")
            
            # Chunk the content
            chunks = chunk_text(chapter_data['content'])
            print(f"Split into {len(chunks)} chunks")
            
            # Process each chunk
            for i, chunk in enumerate(chunks):
                # Generate embedding
                embedding = get_embedding(chunk)
                
                # Create a unique ID for this chunk
                chunk_id = f"{chapter_id}_chunk_{i}"
                
                # Store in Qdrant
                store_embeddings(chunk_id, chunk, embedding)
                print(f"Stored chunk {i+1}/{len(chunks)}")
        
        print("Qdrant collection populated successfully!")
    except Exception as e:
        print(f"Error populating Qdrant collection: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()