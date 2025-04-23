"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  Eye,
  Check,
  X,
  MoreHorizontal,
  Filter,
  Clock,
  AlertTriangle,
  DollarSign,
  LineChart,
  BarChart,
  PieChart,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <TrendingUp className="h-5 w-5 text-agri-primary" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-4 py-2">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">Management</h2>
              <div className="space-y-1">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/users"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Users
                </Link>
                <Link
                  href="/admin/products"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <Package className="mr-2 h-4 w-4" />
                  Products
                </Link>
                <Link
                  href="/admin/orders"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Orders
                </Link>
              </div>
            </div>
            <div className="px-4 py-2">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">System</h2>
              <div className="space-y-1">
                <Link
                  href="/admin/settings"
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
                alt="Admin profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-muted-foreground">System Administrator</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Monitor and manage the AgriLink platform</p>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">2,345</p>
                    </div>
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>12% from last month</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Listings</p>
                      <p className="text-2xl font-bold">876</p>
                    </div>
                    <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                      <Package className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>5% from last week</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Orders Today</p>
                      <p className="text-2xl font-bold">124</p>
                    </div>
                    <div className="rounded-full bg-green-100 p-2 text-green-600">
                      <ShoppingCart className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>8% from yesterday</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                      <p className="text-2xl font-bold">Rs. 1.2M</p>
                    </div>
                    <div className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <DollarSign className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm text-green-600">
                    <TrendingUp className="mr-1 h-4 w-4" />
                    <span>15% from last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="mb-8">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="products">Product Approvals</TabsTrigger>
                <TabsTrigger value="users">User Management</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Latest orders across the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">#AG10045</TableCell>
                            <TableCell>Ahmed Khan</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-amber-100 text-amber-700">
                                In Transit
                              </Badge>
                            </TableCell>
                            <TableCell>Rs. 3,750</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">#AG10044</TableCell>
                            <TableCell>Priya Fernando</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-green-100 text-green-700">
                                Delivered
                              </Badge>
                            </TableCell>
                            <TableCell>Rs. 2,000</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">#AG10043</TableCell>
                            <TableCell>Malik Jayawardena</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-blue-100 text-blue-700">
                                Processing
                              </Badge>
                            </TableCell>
                            <TableCell>Rs. 2,500</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">#AG10042</TableCell>
                            <TableCell>Nisha Perera</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="bg-red-100 text-red-700">
                                Cancelled
                              </Badge>
                            </TableCell>
                            <TableCell>Rs. 1,800</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View All Orders
                      </Button>
                    </CardFooter>
                  </Card>

                  {/* System Status */}
                  <Card>
                    <CardHeader>
                      <CardTitle>System Status</CardTitle>
                      <CardDescription>Current system health and pending approvals</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-3 rounded-full bg-green-500 p-1">
                                <Check className="h-3 w-3 text-white" />
                              </div>
                              <p>System Status</p>
                            </div>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              Operational
                            </Badge>
                          </div>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-3 rounded-full bg-amber-500 p-1">
                                <Clock className="h-3 w-3 text-white" />
                              </div>
                              <p>Pending Product Approvals</p>
                            </div>
                            <Badge variant="outline" className="bg-amber-100 text-amber-700">
                              15
                            </Badge>
                          </div>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-3 rounded-full bg-amber-500 p-1">
                                <Clock className="h-3 w-3 text-white" />
                              </div>
                              <p>Pending User Verifications</p>
                            </div>
                            <Badge variant="outline" className="bg-amber-100 text-amber-700">
                              8
                            </Badge>
                          </div>
                        </div>

                        <div className="rounded-lg border p-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="mr-3 rounded-full bg-red-500 p-1">
                                <AlertTriangle className="h-3 w-3 text-white" />
                              </div>
                              <p>Reported Issues</p>
                            </div>
                            <Badge variant="outline" className="bg-red-100 text-red-700">
                              3
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        View System Details
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="products" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Product Approval Queue</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search products..." className="w-[200px]" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Filter className="h-4 w-4" />
                              <span className="sr-only">Filter</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>All</DropdownMenuItem>
                            <DropdownMenuItem>Pending</DropdownMenuItem>
                            <DropdownMenuItem>Approved</DropdownMenuItem>
                            <DropdownMenuItem>Rejected</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Product</TableHead>
                          <TableHead>Farmer</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Submitted</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Organic Bell Peppers"
                                width={40}
                                height={40}
                                className="rounded-md"
                              />
                              <div>
                                <p className="font-medium">Organic Bell Peppers</p>
                                <p className="text-sm text-muted-foreground">Rs. 450/kg</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>Lakshmi Devi</TableCell>
                          <TableCell>Vegetables</TableCell>
                          <TableCell>2 hours ago</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-100 text-amber-700">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                              <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                                <Check className="mr-1 h-3 w-3" />
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                <X className="mr-1 h-3 w-3" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Fresh Carrots"
                                width={40}
                                height={40}
                                className="rounded-md"
                              />
                              <div>
                                <p className="font-medium">Fresh Carrots</p>
                                <p className="text-sm text-muted-foreground">Rs. 180/kg</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>Kamal Perera</TableCell>
                          <TableCell>Vegetables</TableCell>
                          <TableCell>5 hours ago</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-amber-100 text-amber-700">
                              Pending
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="mr-1 h-3 w-3" />
                                View
                              </Button>
                              <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700">
                                <Check className="mr-1 h-3 w-3" />
                                Approve
                              </Button>
                              <Button variant="destructive" size="sm">
                                <X className="mr-1 h-3 w-3" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm text-muted-foreground">Showing 2 of 15 pending products</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Previous
                        </Button>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="users" className="mt-4">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>User Management</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search users..." className="w-[200px]" />
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <Filter className="h-4 w-4" />
                              <span className="sr-only">Filter</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>All Users</DropdownMenuItem>
                            <DropdownMenuItem>Farmers</DropdownMenuItem>
                            <DropdownMenuItem>Buyers</DropdownMenuItem>
                            <DropdownMenuItem>Administrators</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Kamal Perera"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <p className="font-medium">Kamal Perera</p>
                                <p className="text-sm text-muted-foreground">kamal@example.com</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>Farmer</TableCell>
                          <TableCell>Nuwara Eliya</TableCell>
                          <TableCell>Jan 12, 2023</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt="Ahmed Khan"
                                width={40}
                                height={40}
                                className="rounded-full"
                              />
                              <div>
                                <p className="font-medium">Ahmed Khan</p>
                                <p className="text-sm text-muted-foreground">ahmed@example.com</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>Buyer</TableCell>
                          <TableCell>Colombo</TableCell>
                          <TableCell>Feb 5, 2023</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-green-100 text-green-700">
                              Active
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit Details</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-sm text-muted-foreground">Showing 2 of 2,345 users</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Previous
                        </Button>
                        <Button variant="outline" size="sm">
                          Next
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="mt-4">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Revenue Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Overview</CardTitle>
                      <CardDescription>Monthly revenue trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed p-4">
                        <div className="flex flex-col items-center">
                          <LineChart className="mb-2 h-10 w-10 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Revenue chart visualization</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Growth Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>User Growth</CardTitle>
                      <CardDescription>New user registrations</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed p-4">
                        <div className="flex flex-col items-center">
                          <BarChart className="mb-2 h-10 w-10 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">User growth chart visualization</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Product Categories */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Categories</CardTitle>
                      <CardDescription>Distribution of products by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed p-4">
                        <div className="flex flex-col items-center">
                          <PieChart className="mb-2 h-10 w-10 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">Product categories visualization</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* User Demographics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>User Demographics</CardTitle>
                      <CardDescription>User distribution by location</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed p-4">
                        <div className="flex flex-col items-center">
                          <User className="mb-2 h-10 w-10 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">User demographics visualization</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
