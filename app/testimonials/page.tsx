import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    country: "Singapore",
    image: "/placeholder.svg?height=100&width=100",
    text: "Global Student Services made my transition to studying in Singapore seamless. Their pre-arrival support and guardianship services gave my parents peace of mind.",
    program: "Business Administration",
  },
  {
    id: 2,
    name: "Mohammed Al-Farsi",
    country: "Dubai",
    image: "/placeholder.svg?height=100&width=100",
    text: "The study tour organized by Global Student Services was eye-opening. It helped me understand the education system in Dubai before making my decision to study there.",
    program: "Computer Science",
  },
  {
    id: 3,
    name: "Priya Sharma",
    country: "United Kingdom",
    image: "/placeholder.svg?height=100&width=100",
    text: "Their visa assistance service was invaluable. I wouldn't have been able to navigate the complex UK visa process without their expert guidance.",
    program: "Medicine",
  },
  {
    id: 4,
    name: "Jean-Paul Dupont",
    country: "Mauritius",
    image: "/placeholder.svg?height=100&width=100",
    text: "The team at Global Student Services helped me find the perfect university in Mauritius that matched my academic goals and budget. Highly recommended!",
    program: "Marine Biology",
  },
  {
    id: 5,
    name: "Li Wei",
    country: "Singapore",
    image: "/placeholder.svg?height=100&width=100",
    text: "Their forex exchange service saved me a lot of money and hassle. The rates were better than what I could get at banks or currency exchange offices.",
    program: "Finance",
  },
  {
    id: 6,
    name: "Aisha Mahmood",
    country: "United Kingdom",
    image: "/placeholder.svg?height=100&width=100",
    text: "As a parent, I appreciate the guardianship services they provide. Knowing there's someone looking after my daughter in the UK gives me great comfort.",
    program: "Parent of Law Student",
  },
  {
    id: 7,
    name: "Daniel Okafor",
    country: "Dubai",
    image: "/placeholder.svg?height=100&width=100",
    text: "The pre-arrival checklist they provided was incredibly detailed and helpful. I felt fully prepared when I arrived in Dubai to start my studies.",
    program: "Architecture",
  },
  {
    id: 8,
    name: "Emma Thompson",
    country: "Mauritius",
    image: "/placeholder.svg?height=100&width=100",
    text: "Global Student Services went above and beyond to help me settle in Mauritius. Their local knowledge and connections made everything easier.",
    program: "Tourism Management",
  },
]

export default function TestimonialsPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Student Testimonials</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Hear from students who have benefited from our services around the world
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4 flex-shrink-0">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{testimonial.country}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.program}</p>
                  </div>
                </div>
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-blue-200 dark:text-blue-800" />
                  <p className="text-gray-600 dark:text-gray-300 text-sm pl-4">{testimonial.text}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Success Stories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "From Singapore to Global Career",
                image: "/placeholder.svg?height=300&width=500",
                story:
                  "After completing her studies in Singapore with our support, Sarah landed a job at a multinational company and now travels the world as part of her career.",
              },
              {
                title: "Research Breakthrough in the UK",
                image: "/placeholder.svg?height=300&width=500",
                story:
                  "With our guardianship services supporting him throughout his PhD, Mohammed was able to focus on his research, leading to a breakthrough in renewable energy technology.",
              },
              {
                title: "Entrepreneurial Success in Dubai",
                image: "/placeholder.svg?height=300&width=500",
                story:
                  "Priya's education in Dubai, facilitated by our services, gave her the knowledge and connections to launch her own successful tech startup in the region.",
              },
            ].map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{story.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{story.story}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

