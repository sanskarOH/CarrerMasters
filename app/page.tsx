"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronRight,
  MapPin,
  Globe,
  Compass,
  GraduationCap,
  Plane,
  Stamp,
  Banknote,
  ChevronLeft
} from "lucide-react"

const countries = [
  { name: "Singapore", video: "/singapore.mp4?height=1080&width=1920", image: "/singapore.jpg" },
  { name: "Dubai", video: "/dubai.mp4?height=1080&width=1920", image: "/dubai.jpg" },
  { name: "Mauritius", video: "/mauritus.mp4?height=1080&width=1920", image: "/mauritus.jpg" },
  { name: "United Kingdom", video: "/uk.mp4?height=1080&width=1920", image: "/london.jpg" }
]

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    country: "Singapore",
    text: "Global Student Services made my transition to studying in Singapore seamless. Their pre-arrival support and guardianship services gave my parents peace of mind.",
    program: "Business Administration",
  },
  {
    id: 2,
    name: "Mohammed Al-Farsi",
    country: "Dubai",
    text: "The study tour organized by Global Student Services was eye-opening. It helped me understand the education system in Dubai before making my decision to study there.",
    program: "Computer Science",
  },
  {
    id: 3,
    name: "Priya Sharma",
    country: "United Kingdom",
    text: "Their visa assistance service was invaluable. I wouldn't have been able to navigate the complex UK visa process without their expert guidance.",
    program: "Medicine",
  },
]

export default function Home() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentTestimonialGroup, setCurrentTestimonialGroup] = useState(0)
  const testimonialsPerSlide = 3
  const totalGroups = Math.ceil(testimonials.length / testimonialsPerSlide)
  const carouselRef = useRef(null)
  const [isAnimating, setIsAnimating] = useState(false)

  // Auto-rotate background videos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % countries.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-slide testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        nextTestimonialGroup()
      }
    }, 8000)
    return () => clearInterval(interval)
  }, [currentTestimonialGroup, isAnimating])

  const nextTestimonialGroup = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    setCurrentTestimonialGroup((prev) => {
      const nextGroup = (prev + 1) % totalGroups
      return nextGroup
    })
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const prevTestimonialGroup = () => {
    if (isAnimating) return
    setIsAnimating(true)
    
    setCurrentTestimonialGroup((prev) => {
      const prevGroup = prev === 0 ? totalGroups - 1 : prev - 1
      return prevGroup
    })
    
    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(-100%);
            opacity: 0;
          }
        }
        
        .carousel-container {
          position: relative;
          overflow: hidden;
          width: 100%;
        }
        
        .carousel-slide {
          display: flex;
          width: 100%;
        }
        
        .slide-in {
          animation: slideIn 0.6s forwards;
        }
        
        .slide-out {
          animation: slideOut 0.6s forwards;
        }
        
        .carousel-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #d1d5db;
          margin: 0 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .carousel-indicator.active {
          width: 24px;
          border-radius: 4px;
          background-image: linear-gradient(to right, #ef4444, #f59e0b);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative h-full w-full">
          {countries.map((country, index) => (
            <div
              key={country.name}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === currentVideoIndex ? "opacity-100" : "opacity-0"
                }`}
            >
              <video
                src={country.video || "/placeholder.svg"}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-5 sm:bottom-10 left-5 sm:left-10 text-white z-20">
                <h2 className="text-xl sm:text-3xl font-bold">{country.name}</h2>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 sm:mb-4">
              <span className="text-cm-gold">CAREER MASTERS</span>{" "}
              <span className="text-white">Global</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-4 sm:mb-8 max-w-3xl mx-auto">
              YOUR MENTORS OVERSEAS
            </p>
            <p className="text-base sm:text-lg mb-6 max-w-2xl mx-auto">
              Supporting international students in Singapore, Dubai, Mauritius, and the UK
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Button asChild size="lg" className="bg-cm-red hover:bg-cm-red/90 text-white">
                <Link href="/services">Our Services</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-cm-gold text-white border-cm-gold hover:bg-cm-gold/90"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50 globe-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text inline-block">Our Key Services</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cm-red to-cm-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Pre & Post Arrival Help */}
            <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-cm-gold">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-cm-gold/10 p-4 rounded-full mb-4 text-cm-gold">
                  <Compass className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cm-gold">Pre & Post Arrival Help</h3>
                <p className="text-gray-600 mb-4">
                  From packing lists to settling in—we're here every step of the way.
                </p>
                <Button asChild variant="link" className="mt-auto text-cm-gold">
                  <Link href="/services#arrival">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Visa Assistance */}
            <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-cm-red">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-cm-red/10 p-4 rounded-full mb-4 text-cm-red">
                  <Stamp className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cm-red">Visa Assistance</h3>
                <p className="text-gray-600 mb-4">
                  Expert guidance on documentation, interview prep, and visa processing.
                </p>
                <Button asChild variant="link" className="mt-auto text-cm-red">
                  <Link href="/services#visa">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Study Loan Assistance */}
            <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-cm-orange">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-cm-orange/10 p-4 rounded-full mb-4 text-cm-orange">
                  <Banknote className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cm-orange">Study Loan Assistance</h3>
                <p className="text-gray-600 mb-4">
                  Connecting students with the right financial aid options and banks.
                </p>
                <Button asChild variant="link" className="mt-auto text-cm-orange">
                  <Link href="/services#loan">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Study Tours */}
            <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-cm-green">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-cm-green/10 p-4 rounded-full mb-4 text-cm-green">
                  <Globe className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-cm-green">Study Tours</h3>
                <p className="text-gray-600 mb-4">
                  Transformative educational travel to explore academics & culture.
                </p>
                <Button asChild variant="link" className="mt-auto text-cm-green">
                  <Link href="/services#study-tours">
                    Learn More <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gradient-to-r from-cm-red to-cm-red/90 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-cm-gold">Why Choose Career Masters Global</h2>
            <div className="h-1 w-20 bg-cm-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-cm-gold text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cm-gold">Expert Mentorship</h3>
              <p className="text-white/90">
                Our team consists of experienced education consultants who provide personalized guidance throughout your
                journey.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-cm-gold text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Globe className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cm-gold">Global Network</h3>
              <p className="text-white/90">
                With partners in multiple countries, we offer unparalleled access to international education
                opportunities.
              </p>
            </div>

            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <div className="bg-cm-gold text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Plane className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cm-gold">End-to-End Support</h3>
              <p className="text-white/90">
                From application to arrival, we handle every aspect of your international education journey.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-cm-gold hover:bg-cm-gold/90 text-white">
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section - Now with Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text inline-block">Student Testimonials</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cm-red to-cm-gold mx-auto"></div>
          </div>

          <div className="carousel-container">
            <div className="absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
              <button 
                onClick={prevTestimonialGroup}
                className="bg-white p-2 rounded-full shadow-lg text-cm-red hover:bg-cm-red hover:text-white transition-colors"
                disabled={isAnimating}
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>
            
            <div className="absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
              <button 
                onClick={nextTestimonialGroup}
                className="bg-white p-2 rounded-full shadow-lg text-cm-red hover:bg-cm-red hover:text-white transition-colors"
                disabled={isAnimating}
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
            
            <div 
              ref={carouselRef}
              className="overflow-hidden"
            >
              {Array.from({ length: totalGroups }).map((_, groupIndex) => (
                <div
                  key={groupIndex}
                  className={`carousel-slide ${
                    groupIndex === currentTestimonialGroup ? "slide-in" : "hidden"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    {testimonials
                      .slice(
                        groupIndex * testimonialsPerSlide,
                        (groupIndex + 1) * testimonialsPerSlide
                      )
                      .map((testimonial) => (
                        <div
                          key={testimonial.id}
                          className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                        >
                          <div
                            className={`h-2 ${
                              testimonial.country === "Singapore"
                                ? "bg-cm-gold"
                                : testimonial.country === "Dubai"
                                  ? "bg-cm-red"
                                  : testimonial.country === "Mauritius"
                                    ? "bg-cm-orange"
                                    : "bg-cm-green"
                            }`}
                          ></div>
                          <div className="p-6">
                            <div className="flex items-center mb-4">
                              <div>
                                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {testimonial.country}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                            <div className="pt-4 border-t border-gray-100 text-sm text-gray-500">
                              <span className="font-medium">Program:</span> {testimonial.program}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-8">
              {Array.from({ length: totalGroups }).map((_, index) => (
                <button
                  key={index}
                  className={`carousel-indicator ${
                    index === currentTestimonialGroup ? "active" : ""
                  }`}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentTestimonialGroup(index);
                      setTimeout(() => setIsAnimating(false), 600);
                    }
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-cm-red hover:bg-cm-red/90 text-white">
              <Link href="/testimonials">View All Testimonials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 gradient-text inline-block">Study Destinations</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-cm-red to-cm-gold mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {countries.map((country) => (
              <Link key={country.name} href={`/countries/${country.name.toLowerCase()}`}>
                <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer shadow-lg">
                  {
                    <Image 
                    src={country.image}
                    alt={`${country.name} study destination`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  }
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-semibold flex items-center">
                        <MapPin className="mr-2 h-5 w-5 text-cm-red" /> {country.name}
                      </h3>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-cm-red text-white px-3 py-1 rounded-full text-sm font-medium">
                    Explore
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-cm-red hover:bg-cm-red/90 text-white">
              <Link href="/countries">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 globe-pattern">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-cm-red">Ready to Start Your Global Education Journey?</h2>
                <p className="text-gray-600 mb-6">
                  Contact Career Masters Global today and take the first step toward your international education and
                  career success.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-cm-red hover:bg-cm-red/90 text-white">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-cm-gold text-cm-gold hover:bg-cm-gold/10">
                    <Link href="/services">Explore Services</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cm-red/60 to-cm-gold/60 mix-blend-multiply"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
                  <GraduationCap className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-xl font-bold">Your Future Awaits</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}