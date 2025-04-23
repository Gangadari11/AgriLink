import Image from "next/image"
import Link from "next/link"
import { PackageOpen, LineChart, Truck, Leaf, ArrowRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import LiveTicker from "@/components/live-ticker"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-agri-primary/10 to-agri-secondary/10 py-16 md:py-24">
        <div className="container grid items-center gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-12">
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter text-agri-dark md:text-5xl lg:text-6xl lg:leading-[1.1]">
              Empowering Farmers.
              <br />
              Fresh for Everyone.
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
              Connecting farms to homes and businesses, directly.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" className="bg-agri-primary text-white hover:bg-agri-dark" asChild>
                <Link href="/list-produce">
                  Start Selling
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/shop">
                  Shop Vegetables
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] w-full overflow-hidden rounded-lg sm:h-[400px] md:h-[500px]">
            <Image
              src="/placeholder.svg?height=500&width=600"
              alt="Farm to table illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Live Ticker */}
      <LiveTicker />

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto mb-12 max-w-[800px] text-center">
            <h2 className="mb-4 text-3xl font-bold text-agri-dark md:text-4xl">Smart Agriculture Made Simple</h2>
            <p className="text-lg text-muted-foreground">
              Discover how AgriLink revolutionizes the farm-to-table journey with cutting-edge technology.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={PackageOpen}
              title="Real-time Inventory"
              description="Track your produce availability and manage inventory with ease."
            />
            <FeatureCard
              icon={LineChart}
              title="Smart Pricing"
              description="AI-powered pricing recommendations based on market demand."
            />
            <FeatureCard
              icon={Truck}
              title="Direct Farm-to-Table"
              description="Cut out middlemen and connect directly with customers."
            />
            <FeatureCard
              icon={Leaf}
              title="Sustainability Tracking"
              description="Monitor and showcase your farm's sustainable practices."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-agri-primary py-16 text-white md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Transform Your Farming Business?</h2>
              <p className="mb-6 text-agri-primary-foreground">
                Join thousands of farmers who have increased their profits and reduced waste through AgriLink.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-agri-primary hover:bg-gray-100" asChild>
                <Link href="/signup">
                  <Zap className="mr-2 h-4 w-4" />
                  Get Started Today
                </Link>
              </Button>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative h-[300px] w-full max-w-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Farmer using AgriLink"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-agri-dark md:text-4xl">What Our Community Says</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <TestimonialCard
              content="AgriLink helped me reach new customers I never had access to before. My produce sells out weekly now!"
              authorName="Kamal Perera"
              authorRole="Vegetable Farmer, Nuwara Eliya"
              authorImage="/placeholder.svg?height=40&width=40"
              rating={5}
            />
            <TestimonialCard
              content="The pricing recommendations have increased my profits by 30%. I wish I had this tool years ago."
              authorName="Lakshmi Devi"
              authorRole="Organic Farmer, Kandy"
              authorImage="/placeholder.svg?height=40&width=40"
              rating={4}
            />
            <TestimonialCard
              content="As a restaurant owner, I love being able to source directly from local farms. The produce is fresher and I know exactly where it comes from."
              authorName="Ahmed Khan"
              authorRole="Restaurant Owner, Colombo"
              authorImage="/placeholder.svg?height=40&width=40"
              rating={5}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
