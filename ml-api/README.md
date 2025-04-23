# AgriLink ML API

This is the machine learning API for AgriLink, a direct vegetable marketplace. It provides endpoints for product recommendations, demand forecasting, and price recommendations.

## Features

- Product recommendations based on user behavior
- Demand forecasting for products
- Dynamic pricing recommendations

## Setup

1. Clone the repository
2. Create a virtual environment:
   \`\`\`
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   \`\`\`
3. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\`
4. Create a `.env` file based on `.env.example`
5. Run the application:
   \`\`\`
   uvicorn main:app --reload
   \`\`\`

## API Endpoints

- `GET /recommend?user_id={user_id}` - Get product recommendations for a user
- `GET /forecast?product_id={product_id}` - Get demand forecast for a product
- `GET /price?product_id={product_id}` - Get price recommendation for a product

## Deployment

### Using Docker

1. Build the Docker image:
   \`\`\`
   docker build -t agrilink-ml-api .
   \`\`\`
2. Run the container:
   \`\`\`
   docker run -p 8000:8000 -e PORT=8000 agrilink-ml-api
   \`\`\`

### Using Render or Railway

1. Connect your GitHub repository to Render or Railway
2. Set the build command to `pip install -r requirements.txt`
3. Set the start command to `uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set the environment variables as needed

## Development

To run the API in development mode:

\`\`\`
uvicorn main:app --reload
\`\`\`

This will start the API server at http://localhost:8000 with auto-reload enabled.

## Documentation

API documentation is available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc
