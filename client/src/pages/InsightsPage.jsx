"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const InsightsPage = () => {
  const [marketTrends, setMarketTrends] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real application, this would be an API call
    // For now, we'll use mock data
    const mockData = [
      { month: "Jan", carrots: 4000, tomatoes: 2400, potatoes: 2400 },
      { month: "Feb", carrots: 3000, tomatoes: 1398, potatoes: 2210 },
      { month: "Mar", carrots: 2000, tomatoes: 9800, potatoes: 2290 },
      { month: "Apr", carrots: 2780, tomatoes: 3908, potatoes: 2000 },
      { month: "May", carrots: 1890, tomatoes: 4800, potatoes: 2181 },
      { month: "Jun", carrots: 2390, tomatoes: 3800, potatoes: 2500 },
      { month: "Jul", carrots: 3490, tomatoes: 4300, potatoes: 2100 },
    ]

    setTimeout(() => {
      setMarketTrends(mockData)
      setLoading(false)
    }, 1000)
  }, [])

  const articles = [
    {
      id: 1,
      title: "Sustainable Farming Practices for Small-Scale Farmers",
      excerpt:
        "Learn how small-scale farmers can implement sustainable practices to improve yield and reduce environmental impact.",
      date: "June 15, 2023",
      image: "https://via.placeholder.com/300x200",
      category: "Farming",
    },
    {
      id: 2,
      title: "Market Trends: The Rising Demand for Organic Vegetables",
      excerpt: "Explore the growing market for organic produce and how farmers can capitalize on this trend.",
      date: "May 28, 2023",
      image: "https://via.placeholder.com/300x200",
      category: "Market Analysis",
    },
    {
      id: 3,
      title: "Technology in Agriculture: IoT Solutions for Modern Farming",
      excerpt: "Discover how Internet of Things (IoT) technology is revolutionizing farming practices.",
      date: "April 10, 2023",
      image: "https://via.placeholder.com/300x200",
      category: "Technology",
    },
  ]

  return (
    <MainLayout>
      <div className="bg-gradient-to-r from-agri-primary/10 to-agri-secondary/10 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-agri-dark mb-4">Agricultural Insights</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Stay informed with the latest market trends, farming techniques, and industry news to make data-driven
            decisions for your agricultural business.
          </p>
        </div>
      </div>

      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-agri-dark mb-8">Market Price Trends</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-agri-primary"></div>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-md">
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={marketTrends}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="carrots" stroke="#FF6B6B" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="tomatoes" stroke="#4ECDC4" />
                <Line type="monotone" dataKey="potatoes" stroke="#45B7D1" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center text-sm text-gray-500">
              Average market prices (LKR per kg) over the last 7 months
            </div>
          </div>
        )}
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-agri-dark mb-8">Latest Articles</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className="text-xs font-semibold text-agri-primary uppercase tracking-wider">
                    {article.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-800 mt-2">{article.title}</h3>
                  <p className="text-gray-600 mt-2">{article.excerpt}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <Link to={`/insights/${article.id}`} className="text-agri-primary font-medium hover:underline">
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 container mx-auto px-4">
        <h2 className="text-2xl font-bold text-agri-dark mb-8">Seasonal Crop Calendar</h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-agri-primary text-white">
              <tr>
                <th className="py-3 px-4 text-left">Crop</th>
                <th className="py-3 px-4 text-center">Jan</th>
                <th className="py-3 px-4 text-center">Feb</th>
                <th className="py-3 px-4 text-center">Mar</th>
                <th className="py-3 px-4 text-center">Apr</th>
                <th className="py-3 px-4 text-center">May</th>
                <th className="py-3 px-4 text-center">Jun</th>
                <th className="py-3 px-4 text-center">Jul</th>
                <th className="py-3 px-4 text-center">Aug</th>
                <th className="py-3 px-4 text-center">Sep</th>
                <th className="py-3 px-4 text-center">Oct</th>
                <th className="py-3 px-4 text-center">Nov</th>
                <th className="py-3 px-4 text-center">Dec</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Carrots</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Tomatoes</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Potatoes</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-medium">Cabbage</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Beans</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center bg-green-100">✓</td>
                <td className="py-3 px-4 text-center"></td>
                <td className="py-3 px-4 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500">✓ indicates optimal growing seasons in Sri Lanka</div>
      </section>

      <section className="py-12 bg-agri-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Get the latest agricultural insights, market trends, and farming tips delivered straight to your inbox.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md focus:outline-none text-gray-800"
                required
              />
              <button
                type="submit"
                className="bg-white text-agri-primary px-6 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default InsightsPage
