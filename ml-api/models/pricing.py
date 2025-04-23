import pandas as pd
import numpy as np
import os
import joblib
from typing import Dict
import random

class PricingModel:
    def __init__(self):
        """
        Initialize the pricing model.
        In a production environment, this would load a trained model.
        """
        # Mock data for demonstration
        self.product_data = {
            "product1": {"category": "vegetables", "currentPrice": 120, "cost": 80, "demand": "high"},
            "product2": {"category": "fruits", "currentPrice": 150, "cost": 100, "demand": "medium"},
            "product3": {"category": "vegetables", "currentPrice": 90, "cost": 60, "demand": "low"},
            "product4": {"category": "grains", "currentPrice": 200, "cost": 140, "demand": "high"},
            "product5": {"category": "fruits", "currentPrice": 180, "cost": 120, "demand": "medium"},
        }
        
        # Market factors
        self.market_factors = {
            "vegetables": 1.05,  # Vegetables market is growing
            "fruits": 0.98,      # Fruits market is slightly declining
            "grains": 1.02,      # Grains market is stable with slight growth
            "spices": 1.10,      # Spices market is growing fast
            "other": 1.00        # Other categories are stable
        }
        
        print("Pricing model initialized")
    
    def get_price_recommendation(self, product_id: str) -> Dict:
        """
        Get price recommendation for a product.
        
        Args:
            product_id: The ID of the product to get price recommendation for
            
        Returns:
            Dictionary with price recommendation data
        """
        # Check if product exists in our data
        if product_id in self.product_data:
            product = self.product_data[product_id]
            
            # Get market factor for the product category
            market_factor = self.market_factors.get(product["category"], 1.0)
            
            # Calculate base recommended price
            base_price = product["currentPrice"]
            
            # Adjust based on demand
            demand_factor = 1.0
            if product["demand"] == "high":
                demand_factor = 1.1
            elif product["demand"] == "low":
                demand_factor = 0.9
            
            # Calculate recommended price
            recommended_price = base_price * market_factor * demand_factor
            
            # Ensure minimum profit margin
            min_price = product["cost"] * 1.2  # 20% minimum margin
            recommended_price = max(recommended_price, min_price)
            
            # Calculate price range
            min_range = max(min_price, recommended_price * 0.9)
            max_range = recommended_price * 1.1
            
            # Determine reason for recommendation
            if market_factor > 1.05:
                reason = f"Growing market demand for {product['category']}"
            elif market_factor < 0.95:
                reason = f"Declining market demand for {product['category']}"
            elif demand_factor > 1.05:
                reason = "High product-specific demand"
            elif demand_factor < 0.95:
                reason = "Low product-specific demand"
            else:
                reason = "Optimal price based on market conditions"
            
            return {
                "currentPrice": product["currentPrice"],
                "recommendedPrice": round(recommended_price, 2),
                "priceRange": {
                    "min": round(min_range, 2),
                    "max": round(max_range, 2)
                },
                "reason": reason
            }
        else:
            # For unknown products, return a default recommendation
            return {
                "currentPrice": 100.0,
                "recommendedPrice": 110.0,
                "priceRange": {
                    "min": 100.0,
                    "max": 120.0
                },
                "reason": "Default recommendation due to limited data"
            }
