#!/usr/bin/env python3
"""
Script to initialize the Qdrant collection for the AI Interactive Book platform.
"""

import os
import sys
from dotenv import load_dotenv
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams

# Add the parent directory to the path to import from api module
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from ai.qdrant_service import create_collection

def main():
    """Main function to initialize Qdrant collection."""
    load_dotenv()
    
    # Get Qdrant configuration from environment variables
    qdrant_url = os.getenv("QDRANT_URL")
    qdrant_api_key = os.getenv("QDRANT_API_KEY")
    
    if not qdrant_url or not qdrant_api_key:
        print("Error: QDRANT_URL and QDRANT_API_KEY must be set in environment variables")
        sys.exit(1)
    
    print(f"Initializing Qdrant collection at {qdrant_url}")
    
    try:
        # Create the collection
        create_collection()
        print("Qdrant collection initialized successfully!")
    except Exception as e:
        print(f"Error initializing Qdrant collection: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()