"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Quote } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  program: string
  university: string
  country: string
  image: string
  quote: string
}

interface VerticalTestimonialCarouselProps {
  testimonials: Testimonial[]
}

export default function VerticalTestimonialCarousel({ testimonials }: VerticalTestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [animating, setAnimating] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const rotateTestimonials = () => {
    if (animating) return

    setAnimating(true)
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)

    setTimeout(() => {
      setAnimating(false)
    }, 1000)
  }

  useEffect(() => {
    intervalRef.current = setInterval(rotateTestimonials, 5000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [testimonials.length, animating])

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const handleMouseLeave = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(rotateTestimonials, 5000)
    }
  }

  const handleDotClick = (index: number) => {
    if (animating || index === activeIndex) return
    setAnimating(true)
    setActiveIndex(index)
    setTimeout(() => {
      setAnimating(false)
    }, 1000)
  }

  return (
    <div
      className="relative h-[400px] overflow-hidden bg-white rounded-xl shadow-lg"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-20 h-20 rounded-full bg-blue-50 opacity-50"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-blue-50 opacity-50"></div>
      <div className="absolute top-1/4 right-8 w-8 h-8 rounded-full bg-blue-100 opacity-30 animate-pulse-slow"></div>

      {testimonials.map((testimonial, index) => {
        const isActive = index === activeIndex
        const isPrev = index === (activeIndex - 1 + testimonials.length) % testimonials.length
        const isNext = index === (activeIndex + 1) % testimonials.length

        let positionClass = "translate-y-full opacity-0"
        if (isActive) positionClass = "translate-y-0 opacity-100 z-20"
        else if (isPrev) positionClass = "-translate-y-full opacity-0 z-10"
        else if (isNext) positionClass = "translate-y-full opacity-0 z-10"

        return (
          <div
            key={testimonial.id}
            className={`absolute inset-0 p-6 transition-all duration-1000 ease-in-out ${positionClass}`}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-start mb-4">
                <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden flex-shrink-0 border-2 border-blue-100">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-blue-600 font-medium">{testimonial.program}</p>
                  <p className="text-gray-500 text-sm">{testimonial.university}</p>
                </div>
              </div>

              <div className="flex-grow">
                <Quote className="h-8 w-8 text-blue-600 mb-2 opacity-50" />
                <p className="text-gray-600 italic">{testimonial.quote}</p>
              </div>

              <div className="mt-auto pt-4">
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">Studying in</span>
                  <span className="ml-1 text-sm font-medium text-gray-700">{testimonial.country}</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      {/* Indicators */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? "bg-blue-600 w-6" : "bg-gray-300 w-2 hover:bg-gray-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
