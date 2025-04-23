from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from typing import Dict, List, Optional
import os
from dotenv import load_dotenv

# Import ML models and services
from models.recommendation import RecommendationModel
from models.forecast import ForecastModel
from models.pricing import PricingModel
from schemas.responses import (
    RecommendationResponse,
    ForecastResponse,
    PriceResponse
)

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="AgriLink ML API",
    description="Machine Learning API for AgriLink - Direct Vegetable Marketplace",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize ML models
recommendation_model = RecommendationModel()
forecast_model = ForecastModel()
pricing_model = PricingModel()

@app.get("/")
async def root():
    return {"message": "Welcome to AgriLink ML API"}

@app.get("/recommend", response_model=RecommendationResponse)
async def get_recommendations(user_id: str = Query(..., description="User ID to get recommendations for")):
    try:
        recommendations = recommendation_model.get_recommendations(user_id)
        return {"recommendations": recommendations}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@app.get("/forecast", response_model=ForecastResponse)
async def get_forecast(product_id: str = Query(..., description="Product ID to forecast demand for")):
    try:
        forecast_data = forecast_model.get_forecast(product_id)
        return forecast_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating forecast: {str(e)}")

@app.get("/price", response_model=PriceResponse)
async def get_price_recommendation(product_id: str = Query(..., description="Product ID to get price recommendation for")):
    try:
        price_data = pricing_model.get_price_recommendation(product_id)
        return price_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating price recommendation: {str(e)}")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
