import pandas as pd
import numpy as np
import os
import joblib
from typing import Dict, List
import random
from datetime import datetime, timedelta

class ForecastModel:
    def __init__(self):
        """
        Initialize the demand forecast model.
        In a production environment, this would load a trained time series model.
        """
        # Mock data for demonstration
        self.product_history = {
            "product1": self._generate_mock_history(base_demand=100, trend=1.05),
            "product2": self._generate_mock_history(base_demand=80, trend=0.98),
            "product3": self._generate_mock_history(base_demand=120, trend=1.02),
            "product4": self._generate_mock_history(base_demand=60, trend=1.10),
            "product5": self._generate_mock_history(base_demand=90, trend=0.95),
        }
        
        print("Forecast model initialized")
    
    def _generate_mock_history(self, base_demand: float, trend: float, days: int = 30) -> List[Dict]:
        """Generate mock historical data for a product"""
        history = []
        date = datetime.now() - timedelta(days=days)
        
        demand = base_demand
        for _ in range(days):
            # Add some randomness
            daily_demand = int(demand * (0.9 + 0.2 * random.random()))
            
            history.append({
                "date": date.strftime("%Y-%m-%d"),
                "demand": daily_demand
            })
            
            # Apply trend
            demand *= trend
            date += timedelta(days=1)
            
        return history
    
    def get_forecast(self, product_id: str) -> Dict:
        """
        Get demand forecast for a product.
        
        Args:
            product_id: The ID of the product to forecast demand for
            
        Returns:
            Dictionary with forecast data
        """
        # Check if product exists in our data
        if product_id in self.product_history:
            history = self.product_history[product_id]
            
            # Calculate recent trend
            recent_demands = [item["demand"] for item in history[-7:]]  # Last week
            avg_recent_demand = sum(recent_demands) / len(recent_demands)
            
            older_demands = [item["demand"] for item in history[-14:-7]]  # Week before
            avg_older_demand = sum(older_demands) / len(older_demands)
            
            # Determine trend
            trend_ratio = avg_recent_demand / avg_older_demand if avg_older_demand > 0 else 1
            
            if trend_ratio > 1.05:
                trend = "increasing"
            elif trend_ratio < 0.95:
                trend = "decreasing"
            else:
                trend = "stable"
            
            # Simple forecast
            daily_forecast = avg_recent_demand * trend_ratio
            weekly_forecast = daily_forecast * 7
            monthly_forecast = daily_forecast * 30
            
            # Add some factors that influence the forecast
            factors = [
                {"name": "Seasonality", "impact": random.uniform(0.8, 1.2)},
                {"name": "Market Trends", "impact": random.uniform(0.9, 1.1)},
                {"name": "Weather Conditions", "impact": random.uniform(0.7, 1.3)}
            ]
            
            return {
                "forecast": {
                    "daily": round(daily_forecast, 2),
                    "weekly": round(weekly_forecast, 2),
                    "monthly": round(monthly_forecast, 2)
                },
                "trend": trend,
                "confidence": 0.85,  # Mock confidence level
                "factors": factors
            }
        else:
            # For unknown products, return a default forecast
            return {
                "forecast": {
                    "daily": 10.0,
                    "weekly": 70.0,
                    "monthly": 300.0
                },
                "trend": "stable",
                "confidence": 0.6,
                "factors": [
                    {"name": "Limited Data", "impact": 1.0}
                ]
            }
