"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    program: "Master's in Data Science",
    country: "Singapore",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "CareerMasters made my dream of studying in Singapore a reality. Their guidance through the visa process and pre-arrival support was invaluable. I'm now pursuing my Master's with a scholarship!",
  },
  {
    id: 2,
    name: "Arjun Patel",
    program: "Bachelor's in Business Administration",
    country: "Dubai",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "The team at CareerMasters provided exceptional support throughout my application process. Their knowledge of Dubai's education system and visa requirements made everything smooth. I'm enjoying my studies and the amazing lifestyle here!",
  },
  {
    id: 3,
    name: "Kavya Reddy",
    program: "MBA",
    country: "Mauritius",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "Studying in Mauritius has been a life-changing experience. CareerMasters helped me find the perfect program and guided me through every step. Their post-arrival support made settling in so much easier.",
  },
  {
    id: 4,
    name: "Rohit Kumar",
    program: "PhD in Computer Science",
    country: "United Kingdom",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "CareerMasters' expertise in UK university applications was crucial for my PhD admission. They helped me secure funding and navigate the complex visa process. Their personalized approach sets them apart from other consultancies.",
  },
  {
    id: 5,
    name: "Ananya Singh",
    program: "Master's in Engineering",
    country: "Germany",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "I was hesitant about studying in Germany due to the language barrier, but CareerMasters found me an English-taught program and provided language resources. Their comprehensive support made my transition to studying in Europe seamless.",
  },
  {
    id: 6,
    name: "Vikram Gupta",
    program: "Bachelor's in Hospitality Management",
    country: "Dubai",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "From the first consultation to helping me find accommodation in Dubai, CareerMasters was with me every step of the way. Their industry connections even helped me secure an internship at a luxury hotel!",
  },
  {
    id: 7,
    name: "Sneha Agarwal",
    program: "Master's in International Business",
    country: "Singapore",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "The study loan assistance from CareerMasters was a game-changer for me. They helped me secure funding and made my dream of studying in Singapore affordable. Their financial guidance was exceptional!",
  },
  {
    id: 8,
    name: "Karan Mehta",
    program: "Bachelor's in Computer Science",
    country: "United Kingdom",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "CareerMasters not only helped me get admission but also guided me through the entire process from visa to accommodation. Their post-arrival support made settling in the UK so much easier.",
  },
  {
    id: 9,
    name: "Ishita Joshi",
    program: "Master's in Digital Marketing",
    country: "Mauritius",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "The personalized attention I received from CareerMasters was outstanding. They understood my goals and helped me find the perfect program in Mauritius that aligned with my career aspirations.",
  },
  {
    id: 10,
    name: "Aditya Verma",
    program: "MBA in Finance",
    country: "Dubai",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "From university selection to visa approval, CareerMasters handled everything professionally. Their expertise in Dubai's education system made my transition smooth and stress-free.",
  },
  {
    id: 11,
    name: "Meera Nair",
    program: "Master's in Psychology",
    country: "United Kingdom",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "CareerMasters helped me navigate the complex UK application process with ease. Their guidance on scholarship opportunities saved me thousands of pounds. I'm grateful for their dedicated support!",
  },
  {
    id: 12,
    name: "Rajesh Khanna",
    program: "Bachelor's in Engineering",
    country: "Germany",
    image: "/placeholder.svg?height=300&width=300",
    quote:
      "The team at CareerMasters made studying in Germany accessible for me. They helped with language preparation and found me an excellent English-taught program. Their support was invaluable throughout my journey.",
  },
]

export default function TestimonialsPage() {
  const [currentStartIndex, setCurrentStartIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<typeof testimonials>([])
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    // Initialize with the first 3 testimonials
    setVisibleTestimonials(testimonials.slice(0, 3))
  }, [])

  const handleNext = () => {
    if (animating) return

    setAnimating(true)

    // Calculate the next set of testimonials (move by 3)
    const nextStartIndex = (currentStartIndex + 3) % testimonials.length
    setCurrentStartIndex(nextStartIndex)

    // Update visible testimonials with animation
    setTimeout(() => {
      const endIndex = nextStartIndex + 3
      if (endIndex <= testimonials.length) {
        setVisibleTestimonials(testimonials.slice(nextStartIndex, endIndex))
      } else {
        // Handle wrap around
        const firstPart = testimonials.slice(nextStartIndex)
        const secondPart = testimonials.slice(0, endIndex - testimonials.length)
        setVisibleTestimonials([...firstPart, ...secondPart])
      }
      setAnimating(false)
    }, 300)
  }

  const handlePrev = () => {
    if (animating) return

    setAnimating(true)

    // Calculate the previous set of testimonials (move by 3)
    const prevStartIndex = (currentStartIndex - 3 + testimonials.length) % testimonials.length
    setCurrentStartIndex(prevStartIndex)

    // Update visible testimonials with animation
    setTimeout(() => {
      const endIndex = prevStartIndex + 3
      if (endIndex <= testimonials.length) {
        setVisibleTestimonials(testimonials.slice(prevStartIndex, endIndex))
      } else {
        // Handle wrap around
        const firstPart = testimonials.slice(prevStartIndex)
        const secondPart = testimonials.slice(0, endIndex - testimonials.length)
        setVisibleTestimonials([...firstPart, ...secondPart])
      }
      setAnimating(false)
    }, 300)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Student Success Stories</h1>
            <p className="text-xl">
              Hear from students who achieved their international education dreams with CareerMasters
            </p>
          </div>
        </div>
      </section>

      {/* Featured Testimonials Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="relative">
              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-opacity duration-300 ${animating ? "opacity-0" : "opacity-100"}`}
              >
                {visibleTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* <div className="relative h-64 w-full">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div> */}
                    <div className="p-6">
                      <div className="mb-4">
                        <Quote className="h-8 w-8 text-blue-600" />
                      </div>
                      <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                        <p className="text-blue-600">{testimonial.program}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-sm text-gray-500">Studying in</span>
                          <span className="ml-1 text-sm font-medium text-gray-700">{testimonial.country}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none hidden md:block"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none hidden md:block"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <div className="flex justify-center mt-8 md:hidden">
              <button
                onClick={handlePrev}
                className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none mr-4"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="h-6 w-6 text-gray-600" />
              </button>
              <button
                onClick={handleNext}
                className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none"
                aria-label="Next testimonials"
              >
                <ChevronRight className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Success in Numbers</h2>
              <p className="text-xl max-w-2xl mx-auto">
                We take pride in our track record of helping students achieve their international education goals
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-lg">Visa Success Rate</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">5,000+</div>
                <div className="text-lg">Students Placed</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-lg">University Partners</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 text-center backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">12+</div>
                <div className="text-lg">Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
