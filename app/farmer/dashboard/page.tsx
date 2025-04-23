"use client"

import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import {
  BarChart3,
  Package,
  Truck,
  Settings,
  Plus,
  Calendar,
  ArrowUpRight,
  CreditCard,
  TrendingUp,
  LineChart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const FarmerDashboardPage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/farmer/dashboard" className="flex items-center gap-2 font-semibold">
              <Package className="h-5 w-5 text-agri-primary" />
              <span>Farmer Dashboard</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Management</h2>
              <div className="space-y-1">
                <Link
                  href="/farmer/dashboard"
                  className="flex items-center rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Overview
                </Link>
                <Link
                  href="/farmer/inventory"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Package className="mr-2 h-4 w-4" />
                  My Listings
                </Link>
                <Link
                  href="/farmer/add-harvest"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Harvest
                </Link>
                <Link
                  href="/farmer/insights"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Insights
                </Link>
                <Link
                  href="/farmer/deliveries"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Truck className="mr-2 h-4 w-4" />
                  Deliveries
                </Link>
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Account</h2>
              <div className="space-y-1">
                <Link
                  href="/farmer/settings"
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
                alt="Farmer profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Kamal Perera</p>
                <p className="text-xs text-muted-foreground">Nuwara Eliya</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <Button className="bg-agri-primary text-white hover:bg-agri-dark" asChild>
                <Link href="/farmer/add-harvest">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Harvest
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Sales</p>
                      <p className="text-2xl font-bold">Rs. 147,350</p>
                    </div>
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <CreditCard className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    <span>12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                      <p className="text-2xl font-bold">7</p>
                    </div>
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                      <Package className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-blue-600">
                    <Plus className="mr-1 h-4 w-4" />
                    <span>2 new since last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Deliveries</p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                    <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                      <Truck className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-amber-600">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>Due this week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Sales Growth</p>
                      <p className="text-2xl font-bold">24%</p>
                    </div>
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-purple-600">
                    <LineChart className="mr-1 h-4 w-4" />
                    <span>Average over 6 months</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities and Analytics */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>Your latest orders and their status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((order) => (
                      <div key={order} className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-muted p-2">
                            <Package className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">Order #{1000 + order}</p>
                            <p className="text-sm text-muted-foreground">
                              {order === 1
                                ? "15 kg Carrots"
                                : order === 2
                                  ? "10 kg Tomatoes"
                                  : order === 3
                                    ? "20 kg Potatoes"
                                    : "5 kg Bell Peppers"}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            Rs. {order === 1 ? "3,750" : order === 2 ? "2,000" : order === 3 ? "4,000" : "2,500"}
                          </p>
                          <p
                            className={`text-sm ${
                              order === 1
                                ? "text-yellow-600"
                                : order === 2
                                  ? "text-green-600"
                                  : order === 3
                                    ? "text-green-600"
                                    : "text-blue-600"
                            }`}
                          >
                            {order === 1
                              ? "In Transit"
                              : order === 2
                                ? "Delivered"
                                : order === 3
                                  ? "Delivered"
                                  : "Processing"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Market Insights</CardTitle>
                  <CardDescription>Trending products and pricing recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-medium">Tomatoes</p>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          High Demand
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Current Price: Rs. 180/kg</p>
                        <p className="font-medium text-green-600">Recommended: Rs. 220/kg</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-medium">Bell Peppers</p>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          Rising Trend
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Current Price: Rs. 450/kg</p>
                        <p className="font-medium text-green-600">Recommended: Rs. 500/kg</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-medium">Potatoes</p>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                          Stable
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Current Price: Rs. 180/kg</p>
                        <p className="font-medium text-yellow-600">Recommended: Rs. 180/kg</p>
                      </div>
                    </div>

                    <div className="rounded-lg border p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="font-medium">Cabbage</p>
                        <Badge variant="outline" className="bg-red-100 text-red-700">
                          Oversupply
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <p className="text-muted-foreground">Current Price: Rs. 140/kg</p>
                        <p className="font-medium text-red-600">Recommended: Rs. 120/kg</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Detailed Insights
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default FarmerDashboardPage
