import Image from "next/image"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  content: string
  authorName: string
  authorRole: string
  authorImage: string
  rating?: number
}

const TestimonialCard = ({ content, authorName, authorRole, authorImage, rating = 5 }: TestimonialCardProps) => {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <div className="mb-4 flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{content}</p>
      <div className="flex items-center">
        <Image
          src={authorImage || "/placeholder.svg"}
          alt={authorName}
          width={40}
          height={40}
          className="mr-4 rounded-full"
        />
        <div>
          <h4 className="font-medium">{authorName}</h4>
          <p className="text-xs text-muted-foreground">{authorRole}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard
