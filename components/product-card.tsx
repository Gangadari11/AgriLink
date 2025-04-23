import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  unit: string
  image: string
  farmerName: string
  location: string
  organic?: boolean
}

const ProductCard = ({ id, name, price, unit, image, farmerName, location, organic = false }: ProductCardProps) => {
  return (
    <div className="group rounded-lg border bg-card shadow-sm transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden rounded-t-lg">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {organic && <Badge className="absolute right-2 top-2 bg-green-500 text-white">Organic</Badge>}
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-medium">{name}</h3>
          <p className="font-semibold text-agri-primary">
            Rs. {price.toFixed(2)}/{unit}
          </p>
        </div>
        <p className="mb-3 text-xs text-muted-foreground">
          from {farmerName} • {location}
        </p>
        <Button className="w-full bg-agri-primary text-white hover:bg-agri-dark">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  )
}

export default ProductCard
