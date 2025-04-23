import pandas as pd
import numpy as np
import os
import joblib
from typing import List, Dict
import random

class RecommendationModel:
    def __init__(self):
        """
        Initialize the recommendation model.
        In a production environment, this would load a trained model.
        """
        # Mock data for demonstration
        self.user_product_matrix = {
            "user1": ["product1", "product3", "product5"],
            "user2": ["product2", "product4", "product6"],
            "user3": ["product1", "product2", "product3"],
            "user4": ["product4", "product5", "product6"],
            "user5": ["product1", "product4", "product6"],
        }
        
        # All available products
        self.all_products = [
            "product1", "product2", "product3", "product4", 
            "product5", "product6", "product7", "product8", 
            "product9", "product10"
        ]
        
        print("Recommendation model initialized")
    
    def get_recommendations(self, user_id: str, num_recommendations: int = 5) -> List[str]:
        """
        Get product recommendations for a user.
        
        Args:
            user_id: The ID of the user to get recommendations for
            num_recommendations: Number of recommendations to return
            
        Returns:
            List of product IDs recommended for the user
        """
        # Check if user exists in our data
        if user_id in self.user_product_matrix:
            # Get products the user has already interacted with
            user_products = self.user_product_matrix[user_id]
            
            # Find similar users (simple collaborative filtering)
            similar_users = []
            for uid, products in self.user_product_matrix.items():
                if uid != user_id:
                    # Calculate similarity (number of common products)
                    common_products = set(user_products).intersection(set(products))
                    if common_products:
                        similar_users.append((uid, len(common_products)))
            
            # Sort by similarity
            similar_users.sort(key=lambda x: x[1], reverse=True)
            
            # Get recommendations from similar users
            recommendations = []
            for uid, _ in similar_users:
                for product in self.user_product_matrix[uid]:
                    if product not in user_products and product not in recommendations:
                        recommendations.append(product)
                        if len(recommendations) >= num_recommendations:
                            return recommendations
            
            # If we don't have enough recommendations, add random products
            remaining = num_recommendations - len(recommendations)
            if remaining > 0:
                available_products = [p for p in self.all_products if p not in user_products and p not in recommendations]
                recommendations.extend(random.sample(available_products, min(remaining, len(available_products))))
            
            return recommendations
        else:
            # For new users, return popular products (random in this mock)
            return random.sample(self.all_products, min(num_recommendations, len(self.all_products)))
