"use client"

import { useEffect, useState } from "react"
import { Truck, ShoppingBasket } from "lucide-react"

interface TickerItem {
  id: number
  type: "order" | "listing"
  message: string
}

const sampleTickerItems: TickerItem[] = [
  { id: 1, type: "order", message: "New order of Carrots from Colombo" },
  { id: 2, type: "listing", message: "Fresh Tomatoes just listed from Kandy" },
  { id: 3, type: "order", message: "Bulk order of Potatoes from Anuradhapura" },
  { id: 4, type: "listing", message: "Organic Lettuce just listed from Nuwara Eliya" },
  { id: 5, type: "order", message: "New order of Onions from Jaffna" },
]

const LiveTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === sampleTickerItems.length - 1 ? 0 : prevIndex + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const currentItem = sampleTickerItems[currentIndex]

  return (
    <div className="bg-agri-primary/10 py-2 text-agri-dark">
      <div className="container">
        <div className="flex items-center justify-center">
          {currentItem.type === "order" ? (
            <ShoppingBasket className="mr-2 h-4 w-4" />
          ) : (
            <Truck className="mr-2 h-4 w-4" />
          )}
          <p className="text-sm font-medium">{currentItem.message}</p>
        </div>
      </div>
    </div>
  )
}

export default LiveTicker
