"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Camera, Upload, Check, Info, Truck, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function ListProducePage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [step, setStep] = useState(1)

  // Mock function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  // Mock steps for the form
  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  return (
    <div className="container mx-auto p-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-agri-dark md:text-4xl">List Your Harvest</h1>
        <p className="mx-auto max-w-[600px] text-muted-foreground">
          Connect directly with buyers and get the best prices for your produce
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="mx-auto flex max-w-md justify-between">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 1
                  ? "bg-agri-primary text-white"
                  : "border border-muted-foreground bg-muted text-muted-foreground"
              }`}
            >
              {step > 1 ? <Check className="h-5 w-5" /> : "1"}
            </div>
            <p className="mt-2 text-sm">Product Details</p>
          </div>

          <div className="relative flex-1">
            <div
              className={`absolute left-0 top-5 h-[2px] w-full ${step > 1 ? "bg-agri-primary" : "bg-muted-foreground"}`}
            ></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 2
                  ? "bg-agri-primary text-white"
                  : "border border-muted-foreground bg-muted text-muted-foreground"
              }`}
            >
              {step > 2 ? <Check className="h-5 w-5" /> : "2"}
            </div>
            <p className="mt-2 text-sm">Pricing & Stock</p>
          </div>

          <div className="relative flex-1">
            <div
              className={`absolute left-0 top-5 h-[2px] w-full ${step > 2 ? "bg-agri-primary" : "bg-muted-foreground"}`}
            ></div>
          </div>

          <div className="flex flex-col items-center">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                step >= 3
                  ? "bg-agri-primary text-white"
                  : "border border-muted-foreground bg-muted text-muted-foreground"
              }`}
            >
              3
            </div>
            <p className="mt-2 text-sm">Review & Publish</p>
          </div>
        </div>
      </div>

      {/* Step 1: Product Details */}
      {step === 1 && (
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>Provide detailed information about your harvest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product Name *</Label>
                  <Input id="product-name" placeholder="e.g. Fresh Carrots" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="grains">Grains & Rice</SelectItem>
                      <SelectItem value="spices">Spices</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Tell buyers about your product. Include details like quality, growing conditions, harvesting date, etc."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>Product Images *</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div
                    className={`relative flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition hover:bg-muted/50 ${
                      previewUrl ? "border-green-500" : "border-muted-foreground"
                    }`}
                  >
                    <input
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {previewUrl ? (
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center space-y-2 p-4 text-center">
                        <Camera className="h-8 w-8 text-muted-foreground" />
                        <p className="text-sm font-medium">Upload main image</p>
                        <p className="text-xs text-muted-foreground">Drag and drop or click to browse</p>
                      </div>
                    )}
                  </div>

                  <div className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground transition hover:bg-muted/50">
                    <input
                      type="file"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      accept="image/*"
                      multiple
                    />
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Add more images</p>
                    <p className="text-xs text-muted-foreground">Up to 5 additional images</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="organic" />
                    <label htmlFor="organic" className="text-sm font-medium">
                      Organic
                    </label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Check if your product is certified organic</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pesticide-free" />
                    <label htmlFor="pesticide-free" className="text-sm font-medium">
                      Pesticide-Free
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="fresh-harvest" />
                    <label htmlFor="fresh-harvest" className="text-sm font-medium">
                      Freshly Harvested (within 24 hours)
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={nextStep} className="bg-agri-primary text-white hover:bg-agri-dark">
                Next: Pricing & Stock
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Step 2: Pricing & Stock */}
      {step === 2 && (
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Stock</CardTitle>
              <CardDescription>Set your pricing and available quantities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center justify-between">
                    Price per Unit *
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent className="flex flex-col space-y-2">
                          <p>AI Recommendation:</p>
                          <p className="text-green-600">Current market rate for carrots: Rs. 170-190/kg</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="flex">
                    <div className="flex h-9 w-9 items-center justify-center rounded-l-md border bg-muted text-sm">
                      Rs.
                    </div>
                    <Input id="price" type="number" min="0" placeholder="0.00" className="rounded-l-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit *</Label>
                  <Select defaultValue="kg">
                    <SelectTrigger id="unit">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="g">Grams (g)</SelectItem>
                      <SelectItem value="item">Items</SelectItem>
                      <SelectItem value="bundle">Bundle</SelectItem>
                      <SelectItem value="box">Box</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Available Quantity *</Label>
                  <Input id="quantity" type="number" min="1" placeholder="Available quantity" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="min-order">Minimum Order Quantity</Label>
                  <Input id="min-order" type="number" min="1" placeholder="e.g. 5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="harvest-date">Harvest Date *</Label>
                <Input id="harvest-date" type="date" />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Delivery Options</h3>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="delivery-available" />
                    <label htmlFor="delivery-available" className="text-sm font-medium">
                      Delivery Available
                    </label>
                  </div>

                  <div className="ml-6 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="delivery-fee">Delivery Fee</Label>
                        <div className="flex">
                          <div className="flex h-9 w-9 items-center justify-center rounded-l-md border bg-muted text-sm">
                            Rs.
                          </div>
                          <Input
                            id="delivery-fee"
                            type="number"
                            min="0"
                            placeholder="0.00"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="free-delivery-min">Free Delivery Minimum</Label>
                        <div className="flex">
                          <div className="flex h-9 w-9 items-center justify-center rounded-l-md border bg-muted text-sm">
                            Rs.
                          </div>
                          <Input
                            id="free-delivery-min"
                            type="number"
                            min="0"
                            placeholder="0.00"
                            className="rounded-l-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="delivery-areas">Delivery Areas</Label>
                      <Input id="delivery-areas" placeholder="e.g. Colombo, Kandy, Galle" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="pickup-available" />
                  <label htmlFor="pickup-available" className="text-sm font-medium">
                    Pickup Available
                  </label>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="bulk-discount" />
                  <label htmlFor="bulk-discount" className="flex items-center text-sm font-medium">
                    Offer Bulk Discounts
                    <Badge className="ml-2 bg-green-100 text-green-700">Recommended</Badge>
                  </label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} className="bg-agri-primary text-white hover:bg-agri-dark">
                Next: Review
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {/* Step 3: Review & Publish */}
      {step === 3 && (
        <div className="mx-auto max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Review & Publish</CardTitle>
              <CardDescription>Verify your listing details before publishing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-lg font-semibold">Product Details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Product Name</p>
                      <p className="font-medium">Fresh Carrots</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Category</p>
                      <p className="font-medium">Vegetables</p>
                    </div>
                    <div className="sm:col-span-2">
                      <p className="text-sm font-medium text-muted-foreground">Description</p>
                      <p className="text-sm">
                        Fresh, organic carrots harvested today from our farm in Nuwara Eliya. Grown using organic
                        farming practices without any chemical pesticides.
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Features</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Organic
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Pesticide-Free
                        </Badge>
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          Freshly Harvested
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-lg font-semibold">Pricing & Stock</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Price</p>
                      <p className="flex items-center font-medium">
                        <DollarSign className="mr-1 h-4 w-4 text-green-600" />
                        Rs. 180 per kg
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Available Quantity</p>
                      <p className="font-medium">50 kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Minimum Order</p>
                      <p className="font-medium">5 kg</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Harvest Date</p>
                      <p className="font-medium">April 20, 2023</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-lg font-semibold">Delivery Options</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <div className="flex items-center">
                        <Truck className="mr-2 h-5 w-5 text-agri-primary" />
                        <p className="font-medium">Delivery Available</p>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">Delivery Areas: Colombo, Kandy, Galle</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Delivery Fee</p>
                      <p className="font-medium">Rs. 300</p>
                      <p className="text-sm text-muted-foreground">Free delivery for orders over Rs. 2,000</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-dashed border-green-500 bg-green-50 p-4">
                  <div className="flex items-start">
                    <div className="mr-3 rounded-full bg-green-500 p-1 text-white">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-green-700">AI Market Analysis</p>
                      <p className="text-sm text-green-600">
                        Your pricing is competitive! Current market average for similar products is Rs. 175-190 per kg.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <div className="flex w-full flex-col space-y-3 sm:w-auto sm:flex-row sm:space-x-3 sm:space-y-0">
                <Button variant="outline">Save as Draft</Button>
                <Button className="bg-agri-primary text-white hover:bg-agri-dark">Publish Listing</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
