export interface User {
  id: string
  name: string
  email: string
  role: "farmer" | "buyer" | "admin"
  location: string
  phone?: string
  avatar?: string
  createdAt: Date
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  quantity: number;
  minimumOrder?: number;
  farmerId: string;
  farmerName: string;
  location: string;
  category: string;
  images: string[];
  features: string[];
  organic: boolean;
