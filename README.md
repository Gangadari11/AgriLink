# AgriLink - Direct Vegetable Marketplace

AgriLink is a comprehensive platform connecting farmers directly with buyers, eliminating middlemen and ensuring fresher produce at better prices. The platform includes ML-powered features for demand forecasting, personalized recommendations, and dynamic pricing.

## 🏗️ Architecture

- **Frontend**: React.js with Redux for state management
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **ML Backend**: FastAPI with scikit-learn
- **Payment Gateway**: PayHere
- **Authentication**: JWT

## 🚀 Features

### For Farmers
- Upload harvest information (type, quantity, price, freshness estimate)
- View order status and manage deliveries
- Access demand forecasts and pricing recommendations
- Manage product listings

### For Buyers
- Browse and search for fresh vegetables
- View product details including freshness estimates
- Receive personalized product recommendations
- Place orders and track delivery status
- Secure payment processing

### For Admins
- Comprehensive dashboard with analytics
- User management
- Product approval system
- Order oversight and dispute resolution

## 📂 Project Structure

```
/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── components/     # Reusable components
│       ├── pages/          # Page components
│       ├── redux/          # Redux store and slices
│       ├── layouts/        # Layout components
│       └── utils/          # Utility functions
│
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   └── routes/             # API routes
│
└── ml-api/                 # FastAPI ML backend
    ├── models/             # ML models
    ├── schemas/            # Pydantic schemas
    └── utils/              # Utility functions
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB
- Python 3.8+
- npm or yarn

### Frontend Setup
1. Navigate to the client directory:
   ```
   cd client
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```
   npm start
   ```

### Backend Setup
1. Navigate to the server directory:
   ```
   cd server
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   PAYHERE_MERCHANT_ID=your_payhere_merchant_id
   PAYHERE_MERCHANT_SECRET=your_payhere_merchant_secret
   PAYHERE_RETURN_URL=http://localhost:3000/payment/success
   PAYHERE_CANCEL_URL=http://localhost:3000/payment/cancel
   PAYHERE_NOTIFY_URL=http://localhost:5000/api/payments/notify
   ML_API_URL=http://localhost:8000
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### ML API Setup
1. Navigate to the ml-api directory:
   ```
   cd ml-api
   ```
2. Create a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
4. Create a `.env` file with the following variables:
   ```
   PORT=8000
   ```
5. Start the development server:
   ```
   uvicorn main:app --reload
   ```

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository to Vercel or Netlify
2. Set the build command to `cd client && npm install && npm run build`
3. Set the output directory to `client/build`
4. Set the environment variables as needed

### Backend Deployment (Render/Railway/Heroku)
1. Connect your GitHub repository to your chosen platform
2. Set the build command to `cd server && npm install`
3. Set the start command to `cd server && npm start`
4. Set the environment variables as needed

### ML API Deployment (Render/Railway)
1. Connect your GitHub repository to your chosen platform
2. Set the build command to `cd ml-api && pip install -r requirements.txt`
3. Set the start command to `cd ml-api && uvicorn main:app --host 0.0.0.0 --port $PORT`
4. Set the environment variables as needed

## 📝 API Documentation

API documentation is available at:
- Backend API: http://localhost:5000/api-docs
- ML API: http://localhost:8000/docs

## 🧪 Testing

### Frontend Testing
```
cd client
npm test
```

### Backend Testing
```
cd server
npm test
```

### ML API Testing
```
cd ml-api
pytest
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
