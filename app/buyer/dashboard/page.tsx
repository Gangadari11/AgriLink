"use client"
import Image from "next/image"
import Link from "next/link"
import {
  ShoppingCart,
  Clock,
  User,
  Heart,
  Settings,
  Search,
  Truck,
  Package,
  MapPin,
  Calendar,
  Bell,
  ChevronRight,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function BuyerDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/buyer/dashboard" className="flex items-center gap-2 font-semibold">
              <ShoppingCart className="h-5 w-5 text-agri-primary" />
              <span>Buyer Dashboard</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Shopping</h2>
              <div className="space-y-1">
                <Link
                  href="/shop"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Marketplace
                </Link>
                <Link
                  href="/buyer/orders"
                  className="flex items-center rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  My Orders
                </Link>
                <Link
                  href="/buyer/favorites"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </Link>
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Account</h2>
              <div className="space-y-1">
                <Link
                  href="/buyer/profile"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
                <Link
                  href="/buyer/settings"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </div>
            </div>
          </nav>
          <div className="border-t p-4">
            <div className="flex items-center gap-3">
              <Image
                src="/placeholder.svg?height=40&width=40"
                alt="Buyer profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Ahmed Khan</p>
                <p className="text-xs text-muted-foreground">Colombo</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <h1 className="text-2xl font-bold">My Orders</h1>
              <div className="flex w-full items-center gap-2 sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search orders..." className="pl-9" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Filter</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuItem>All Orders</DropdownMenuItem>
                    <DropdownMenuItem>Processing</DropdownMenuItem>
                    <DropdownMenuItem>Shipped</DropdownMenuItem>
                    <DropdownMenuItem>Delivered</DropdownMenuItem>
                    <DropdownMenuItem>Cancelled</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Order Tabs */}
            <Tabs defaultValue="all" className="mb-8">
              <TabsList>
                <TabsTrigger value="all">All Orders</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <Card>
                  <CardHeader className="px-6 py-4">
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>View and manage your orders</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-0 divide-y">
                      {/* Order 1 */}
                      <div className="p-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Order #AG10045</p>
                              <Badge variant="outline" className="bg-amber-100 text-amber-700">
                                In Transit
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on April 15, 2023</p>
                          </div>
                          <Button variant="outline" size="sm" className="sm:w-auto">
                            Track Order
                          </Button>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                          <div className="flex items-start gap-3">
                            <Image
                              src="/placeholder.svg?height=60&width=60"
                              alt="Carrots"
                              width={60}
                              height={60}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <p className="font-medium">Fresh Carrots</p>
                              <p className="text-sm text-muted-foreground">15 kg × Rs. 180</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Truck className="h-4 w-4 text-amber-600" />
                            <div>
                              <p>Estimated Delivery</p>
                              <p className="font-medium">April 18, 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-agri-primary" />
                            <div>
                              <p>From</p>
                              <p className="font-medium">Kamal Perera, Nuwara Eliya</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order 2 */}
                      <div className="p-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Order #AG10044</p>
                              <Badge variant="outline" className="bg-green-100 text-green-700">
                                Delivered
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on April 10, 2023</p>
                          </div>
                          <Button variant="outline" size="sm" className="sm:w-auto">
                            View Details
                          </Button>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                          <div className="flex items-start gap-3">
                            <Image
                              src="/placeholder.svg?height=60&width=60"
                              alt="Tomatoes"
                              width={60}
                              height={60}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <p className="font-medium">Tomatoes</p>
                              <p className="text-sm text-muted-foreground">10 kg × Rs. 200</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-4 w-4 text-green-600" />
                            <div>
                              <p>Delivered On</p>
                              <p className="font-medium">April 12, 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-agri-primary" />
                            <div>
                              <p>From</p>
                              <p className="font-medium">Saman Silva, Kandy</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order 3 */}
                      <div className="p-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium">Order #AG10043</p>
                              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                                Processing
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Placed on April 16, 2023</p>
                          </div>
                          <Button variant="outline" size="sm" className="sm:w-auto">
                            Track Order
                          </Button>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                          <div className="flex items-start gap-3">
                            <Image
                              src="/placeholder.svg?height=60&width=60"
                              alt="Bell Peppers"
                              width={60}
                              height={60}
                              className="rounded-md object-cover"
                            />
                            <div>
                              <p className="font-medium">Bell Peppers</p>
                              <p className="text-sm text-muted-foreground">5 kg × Rs. 450</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Package className="h-4 w-4 text-blue-600" />
                            <div>
                              <p>Status</p>
                              <p className="font-medium">Being Prepared</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-4 w-4 text-agri-primary" />
                            <div>
                              <p>From</p>
                              <p className="font-medium">Lakshmi Devi, Kandy</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center p-6">
                    <Button variant="outline">View All Orders</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="active">
                {/* Active orders content */}
                <div className="rounded-md border bg-amber-50 p-4">
                  <p className="text-center text-amber-700">You have 2 active orders in progress</p>
                </div>
              </TabsContent>

              <TabsContent value="completed">
                {/* Completed orders content */}
                <div className="rounded-md border bg-green-50 p-4">
                  <p className="text-center text-green-700">You have 10 completed orders</p>
                </div>
              </TabsContent>

              <TabsContent value="cancelled">
                {/* Cancelled orders content */}
                <div className="rounded-md border bg-muted p-4">
                  <p className="text-center text-muted-foreground">You don't have any cancelled orders</p>
                </div>
              </TabsContent>
            </Tabs>

            {/* Recommendations Section */}
            <div className="mb-6">
              <h2 className="mb-4 text-xl font-semibold">Recommended For You</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {/* Product 1 */}
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Bell Peppers"
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute right-2 top-2 bg-green-500 text-white">Organic</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Organic Bell Peppers</h3>
                      <p className="font-semibold text-agri-primary">Rs. 450/kg</p>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">from Lakshmi Devi • Kandy</p>
                    <div className="flex items-center text-sm text-amber-500">
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-agri-primary text-white hover:bg-agri-dark">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>

                {/* Product 2 */}
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src="/placeholder.svg?height=200&width=200" alt="Spinach" fill className="object-cover" />
                    <Badge className="absolute right-2 top-2 bg-green-500 text-white">Organic</Badge>
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Fresh Spinach</h3>
                      <p className="font-semibold text-agri-primary">Rs. 280/kg</p>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">from Priyanka Fernando • Nuwara Eliya</p>
                    <div className="flex items-center text-sm text-amber-500">
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-agri-primary text-white hover:bg-agri-dark">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>

                {/* Product 3 */}
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src="/placeholder.svg?height=200&width=200" alt="Carrots" fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Fresh Carrots</h3>
                      <p className="font-semibold text-agri-primary">Rs. 180/kg</p>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">from Kamal Perera • Nuwara Eliya</p>
                    <div className="flex items-center text-sm text-amber-500">
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-agri-primary text-white hover:bg-agri-dark">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>

                {/* Product 4 */}
                <Card className="overflow-hidden">
                  <div className="relative aspect-square">
                    <Image src="/placeholder.svg?height=200&width=200" alt="Potatoes" fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-medium">Fresh Potatoes</h3>
                      <p className="font-semibold text-agri-primary">Rs. 180/kg</p>
                    </div>
                    <p className="mb-3 text-xs text-muted-foreground">from Anil Jayawardena • Badulla</p>
                    <div className="flex items-center text-sm text-amber-500">
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="mr-1 h-4 w-4 fill-amber-500 text-amber-500" />
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button className="w-full bg-agri-primary text-white hover:bg-agri-dark">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" className="gap-1">
                  View More Recommendations
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Recent Notifications</CardTitle>
                  <Button variant="ghost" size="sm">
                    Mark all as read
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <Bell className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Order #AG10044 has been delivered!</p>
                      <p className="text-sm text-muted-foreground">
                        Your order of Tomatoes (10kg) has been delivered. Please rate your experience.
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                      <Package className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Special Offer: Fresh Carrots</p>
                      <p className="text-sm text-muted-foreground">
                        Kamal Perera is offering a 10% discount on carrots for bulk orders.
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">3 days ago</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 rounded-lg border p-4">
                    <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                      <Truck className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium">Order #AG10043 status update</p>
                      <p className="text-sm text-muted-foreground">
                        Your order has been processed and is being prepared for shipping.
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">4 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Notifications
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
