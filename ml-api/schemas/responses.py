from pydantic import BaseModel
from typing import List, Dict, Optional

class RecommendationResponse(BaseModel):
    recommendations: List[str]

class ForecastResponse(BaseModel):
    forecast: Dict[str, float]
    trend: str
    confidence: Optional[float] = None
    factors: Optional[List[Dict[str, float]]] = None

class PriceResponse(BaseModel):
    currentPrice: float
    recommendedPrice: float
    priceRange: Dict[str, float]
    reason: str
