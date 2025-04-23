import { Search, Filter, Truck, Leaf, Tag, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import ProductCard from "@/components/product-card"

const products = [
  {
    id: "1",
    name: "Fresh Carrots",
    price: 180,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Kamal Perera",
    location: "Nuwara Eliya",
    organic: true,
  },
  {
    id: "2",
    name: "Tomatoes",
    price: 200,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Saman Silva",
    location: "Kandy",
    organic: false,
  },
  {
    id: "3",
    name: "Bell Peppers",
    price: 450,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Lakshmi Devi",
    location: "Kandy",
    organic: true,
  },
  {
    id: "4",
    name: "Potatoes",
    price: 180,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Anil Jayawardena",
    location: "Badulla",
    organic: false,
  },
  {
    id: "5",
    name: "Green Beans",
    price: 260,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Priyanka Fernando",
    location: "Nuwara Eliya",
    organic: true,
  },
  {
    id: "6",
    name: "Cabbage",
    price: 140,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Nimal Bandara",
    location: "Nuwara Eliya",
    organic: false,
  },
  {
    id: "7",
    name: "Leeks",
    price: 220,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Mahesh Gunawardena",
    location: "Bandarawela",
    organic: false,
  },
  {
    id: "8",
    name: "Spinach",
    price: 280,
    unit: "kg",
    image: "/placeholder.svg?height=300&width=300",
    farmerName: "Lakshmi Devi",
    location: "Kandy",
    organic: true,
  },
]

export default function ShopPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Shop Banner */}
      <div className="bg-agri-primary py-8 text-white">
        <div className="container">
          <h1 className="mb-2 text-3xl font-bold">Marketplace</h1>
          <p className="text-lg">Fresh, local produce direct from farmers</p>
        </div>
      </div>

      <div className="container mx-auto flex-1 p-4 md:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search for vegetables..." className="pl-9" />
          </div>
          <Select defaultValue="newest">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Filters Sidebar */}
          <Card className="h-fit md:sticky md:top-4">
            <CardContent className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center text-lg font-semibold">
                  <Filter className="mr-2 h-5 w-5" />
                  Filters
                </h2>
                <Button variant="link" className="h-auto p-0 text-sm">
                  Reset
                </Button>
              </div>

              <Accordion type="multiple" defaultValue={["categories", "price", "features", "location"]}>
                <AccordionItem value="categories">
                  <AccordionTrigger className="py-3 text-sm font-medium">Categories</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vegetables" />
                        <label htmlFor="vegetables" className="text-sm">
                          Vegetables
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="fruits" />
                        <label htmlFor="fruits" className="text-sm">
                          Fruits
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="grains" />
                        <label htmlFor="grains" className="text-sm">
                          Grains & Rice
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="spices" />
                        <label htmlFor="spices" className="text-sm">
                          Spices
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="price">
                  <AccordionTrigger className="py-3 text-sm font-medium">Price Range</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <Slider defaultValue={[0, 500]} min={0} max={1000} step={10} />
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Rs. 0</p>
                        <p className="text-sm">Rs. 1000</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="features">
                  <AccordionTrigger className="py-3 text-sm font-medium">Features</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="organic" />
                        <label htmlFor="organic" className="flex items-center text-sm">
                          <Leaf className="mr-1 h-3 w-3 text-green-600" />
                          Organic
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="freeDelivery" />
                        <label htmlFor="freeDelivery" className="flex items-center text-sm">
                          <Truck className="mr-1 h-3 w-3 text-blue-600" />
                          Free Delivery
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="discount" />
                        <label htmlFor="discount" className="flex items-center text-sm">
                          <Tag className="mr-1 h-3 w-3 text-red-600" />
                          On Sale
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="location">
                  <AccordionTrigger className="py-3 text-sm font-medium">Location</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="nuwara-eliya" />
                        <label htmlFor="nuwara-eliya" className="text-sm">
                          Nuwara Eliya
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="kandy" />
                        <label htmlFor="kandy" className="text-sm">
                          Kandy
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="colombo" />
                        <label htmlFor="colombo" className="text-sm">
                          Colombo
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="badulla" />
                        <label htmlFor="badulla" className="text-sm">
                          Badulla
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="anuradhapura" />
                        <label htmlFor="anuradhapura" className="text-sm">
                          Anuradhapura
                        </label>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Button className="mt-4 w-full bg-agri-primary text-white hover:bg-agri-dark">Apply Filters</Button>
            </CardContent>
          </Card>

          {/* Product Grid */}
          <div className="col-span-1 md:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{products.length}</span> products
                </p>
              </div>
              <div className="flex items-center">
                <Badge className="bg-agri-primary text-white">
                  <ShoppingCart className="mr-1 h-3 w-3" />
                  <span className="text-xs">5 items in cart</span>
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
