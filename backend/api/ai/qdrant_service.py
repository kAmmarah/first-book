import qdrant_client
from qdrant_client.models import Distance, VectorParams, PointStruct
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Qdrant client
client = qdrant_client.QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

COLLECTION_NAME = "book_chapters"

def create_collection():
    """
    Create a collection for storing book chapter embeddings
    """
    try:
        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(size=1536, distance=Distance.COSINE)
        )
        print(f"Collection '{COLLECTION_NAME}' created successfully")
    except Exception as e:
        print(f"Collection already exists or error occurred: {str(e)}")

def store_embeddings(chapter_id: str, text: str, embedding: list):
    """
    Store chapter embeddings in Qdrant
    """
    points = [
        PointStruct(
            id=chapter_id,
            vector=embedding,
            payload={"chapter_id": chapter_id, "text": text}
        )
    ]
    
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

def search_similar_chunks(query_embedding: list, limit: int = 5):
    """
    Search for similar text chunks based on query embedding
    """
    search_result = client.search(
        collection_name=COLLECTION_NAME,
        query_vector=query_embedding,
        limit=limit
    )
    
    return search_result