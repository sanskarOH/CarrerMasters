"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Globe, GraduationCap, BookOpen, Sparkles, HeartHandshake, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import CountryGrid from "@/components/country-grid";
import WhatsAppButton from "@/components/whatsapp-button";
import VerticalTestimonialCarousel from "@/components/vertical-testimonial-carousel";
import FloatingElement from "@/components/floating-element";
import DecorativeShape from "@/components/decorative-shape";
import AnimatedCounter from "@/components/animated-counter";
import ScrollReveal from "@/components/scroll-reveal";

// Video Carousel Component
interface Country {
  name: string;
  video: string;
  image: string;
}

interface VideoCarouselProps {
  countries: Country[];
}

function VideoCarousel({ countries }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [videosReady, setVideosReady] = useState<boolean[]>(new Array(countries.length).fill(false));

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
    }, 5000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [countries.length, mounted]);

  const handleVideoLoad = (index: number) => {
    setVideosReady(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleVideoError = (index: number, countryName: string, error: any) => {
    console.error(`Video failed to load for ${countryName}:`, error);
    console.error(`Video URL: ${countries[index].video}`);
    setVideosReady(prev => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };

  // Show static background during SSR
  if (!mounted) {
    return (
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${countries[0].image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {countries.map((country, index) => (
        <div
          key={country.name}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image - Always present */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${country.image})` }}
          />
          
          {/* Video Background - Only show if video is ready */}
          {videosReady[index] && (
            <video
              className="absolute inset-0 w-full h-full object-cover z-10"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onCanPlay={() => handleVideoLoad(index)}
              onError={(e) => handleVideoError(index, country.name, e)}
              onLoadedData={() => handleVideoLoad(index)}
            >
              <source src={country.video} type="video/mp4" />
            </video>
          )}
          
          {/* Video element for preloading (hidden) */}
          {!videosReady[index] && (
            <video
              className="absolute inset-0 w-full h-full object-cover opacity-0 pointer-events-none"
              muted
              preload="auto"
              onCanPlay={() => handleVideoLoad(index)}
              onError={(e) => handleVideoError(index, country.name, e)}
              onLoadedData={() => handleVideoLoad(index)}
            >
              <source src={country.video} type="video/mp4" />
            </video>
          )}
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-20" />
        </div>
      ))}
    </div>
  );
}

const countries = [
  { 
    name: "Singapore", 
    video: "https://videos.pexels.com/video-files/4865448/4865448-hd_1920_1080_30fps.mp4", // Singapore cityscape
    image: "https://images.pexels.com/photos/5406959/pexels-photo-5406959.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
  },
  { 
    name: "Dubai", 
    video: "https://videos.pexels.com/video-files/4410402/4410402-hd_1920_1080_30fps.mp4", // Dubai cityscape
    image: "https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
  },
  { 
    name: "Mauritius", 
    video: "https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4", // Beach/Ocean
    image: "https://images.pexels.com/photos/32256720/pexels-photo-32256720.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
  },
  { 
    name: "UnitedKingdom", 
    video: "https://videos.pexels.com/video-files/3206893/3206893-hd_1920_1080_30fps.mp4", // European city
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
  },
  { 
    name: "Europe", 
    video: "https://videos.pexels.com/video-files/4979711/4979711-hd_1920_1080_30fps.mp4", // European city
    image: "https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080" 
  }
];

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    program: "Master's in Data Science",
    country: "Singapore",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    quote:
      "CareerMasters made my dream of studying in Singapore a reality. Their guidance through the visa process and pre-arrival support was invaluable. I'm now pursuing my Master's with a scholarship!",
  },
  {
    id: 2,
    name: "Arjun Patel",
    program: "Bachelor's in Business Administration",
    country: "Dubai",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    quote:
      "The team at CareerMasters provided exceptional support throughout my application process. Their knowledge of Dubai's education system and visa requirements made everything smooth. I'm enjoying my studies and the amazing lifestyle here!",
  },
  {
    id: 3,
    name: "Kavya Reddy",
    program: "MBA",
    country: "Mauritius",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    quote:
      "Studying in Mauritius has been a life-changing experience. CareerMasters helped me find the perfect program and guided me through every step. Their post-arrival support made settling in so much easier.",
  },
  {
    id: 4,
    name: "Rohit Kumar",
    program: "PhD in Computer Science",
    country: "United Kingdom",
    image: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    quote:
      "CareerMasters' expertise in UK university applications was crucial for my PhD admission. They helped me secure funding and navigate the complex visa process. Their personalized approach sets them apart from other consultancies.",
  },
  {
    id: 5,
    name: "Ananya Singh",
    program: "Master's in Engineering",
    country: "Germany",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    quote:
      "I was hesitant about studying in Germany due to the language barrier, but CareerMasters found me an English-taught program and provided language resources. Their comprehensive support made my transition to studying in Europe seamless.",
  },
  {
    id: 6,
    name: "Vikram Gupta",
    program: "Bachelor's in Hospitality Management",
    country: "Dubai",
    image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300",
    quote:
      "From the first consultation to helping me find accommodation in Dubai, CareerMasters was with me every step of the way. Their industry connections even helped me secure an internship at a luxury hotel!",
  },
];

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsVisible(true);
  }, []);

  // Sync currentIndex with VideoCarousel
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % countries.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
        {/* Static hero section for SSR */}
        <section className="relative h-screen w-full overflow-hidden bg-gray-900">
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                Welcome to <span className="text-blue-300">CareerMasters</span>
              </h1>
              <h2 className="text-xl md:text-2xl text-white mb-8">Your Mentors Overseas</h2>
              <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
                Explore top destinations for education, services, and career-building opportunities.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section with Video Carousel */}
      <section className="relative h-screen w-full overflow-hidden">
        <VideoCarousel countries={countries} />

        {/* Text Overlay - Always visible */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-30">
          <div
            className={`max-w-4xl mx-auto text-center px-4 transition-all duration-1000 ease-in-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 text-shadow-lg">
              Welcome to <span className="text-blue-300">CareerMasters</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-white mb-8">Your Mentors Overseas</h2>
            <p className="text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto">
              Explore top destinations for education, services, and career-building opportunities.
            </p>
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full" asChild>
              <Link href="/countries" className="group">
                Discover Your Destination{" "}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Country names overlay with highlighting */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-40">
          <div className="text-white text-center">
            <p className="text-sm opacity-80 mb-2">Currently featuring</p>
            <div className="flex space-x-4 text-sm font-medium">
              {countries.map((country, index) => (
                <span 
                  key={country.name} 
                  className={`px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-400/60 text-white scale-110 shadow-lg' 
                      : 'bg-white/20 text-white/80'
                  }`}
                >
                  {country.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <FloatingElement className="hidden lg:block absolute left-10 bottom-20 w-32 h-32 z-10" animation="float" delay={0.5}>
          <DecorativeShape type="blob" color="bg-blue-400/30" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement
          className="hidden lg:block absolute right-20 bottom-40 w-24 h-24 z-10"
          animation="pulse"
          delay={0.8}
        >
          <DecorativeShape type="blob-2" color="bg-blue-300/30" className="w-full h-full" />
        </FloatingElement>
      </section>

      {/* Why Study Abroad Section */}
      <section className="py-20 bg-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute -right-20 top-20 w-32 h-32" animation="float">
          <DecorativeShape type="blob" color="bg-blue-100" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute left-10 bottom-10 w-20 h-20" animation="pulse" delay={1}>
          <DecorativeShape type="circle" color="bg-blue-200" className="w-full h-full" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why <span className="gradient-text">Study Abroad</span>
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollReveal delay={0.2}>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Global Exposure</h3>
                <p className="text-gray-600">
                  Immerse yourself in diverse cultures, perspectives, and educational systems that broaden your
                  horizons.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <GraduationCap className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Quality Education</h3>
                <p className="text-gray-600">
                  Access world-class education systems with internationally recognized degrees and cutting-edge research
                  opportunities.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Career Advancement</h3>
                <p className="text-gray-600">
                  Enhance your employability with international experience, language skills, and a global professional
                  network.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-10 top-10 w-16 h-16" animation="spin">
          <DecorativeShape type="square" color="bg-white" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement
          className="hidden lg:block absolute left-20 bottom-10 w-24 h-24"
          animation="bounce"
          delay={0.5}
        >
          <DecorativeShape type="triangle" color="bg-blue-300" className="w-full h-full" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <AnimatedCounter end={5000} suffix="+" className="text-4xl font-bold" />
              </div>
              <p className="text-blue-100">Students Placed</p>
            </div>

            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <AnimatedCounter end={98} suffix="%" className="text-4xl font-bold" />
              </div>
              <p className="text-blue-100">Visa Success Rate</p>
            </div>

            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <AnimatedCounter end={50} suffix="+" className="text-4xl font-bold" />
              </div>
              <p className="text-blue-100">University Partners</p>
            </div>

            <div className="p-4">
              <div className="text-4xl font-bold mb-2 flex justify-center">
                <AnimatedCounter end={12} suffix="+" className="text-4xl font-bold" />
              </div>
              <p className="text-blue-100">Years of Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50 overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-20 bottom-40 w-24 h-24" animation="float">
          <DecorativeShape type="blob-3" color="bg-blue-300" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute -left-10 top-20 w-16 h-16" animation="pulse" delay={1.5}>
          <DecorativeShape type="circle" color="bg-blue-400" className="w-full h-full" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured <span className="gradient-text">Destinations</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore our top educational destinations with world-class universities and vibrant cultures
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>
          </ScrollReveal>

          <CountryGrid />

          <div className="text-center mt-12">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-full group transition-all duration-300 hover:pr-10"
              asChild
            >
              <Link href="/countries">
                View All Destinations{" "}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute -right-10 top-40 w-28 h-28" animation="float">
          <DecorativeShape type="blob-2" color="bg-blue-100" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute left-20 bottom-20 w-20 h-20" animation="pulse" delay={2}>
          <DecorativeShape type="dots" color="bg-blue-200" className="w-full h-full" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Student <span className="gradient-text">Success Stories</span>
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
          </ScrollReveal>

          <div className="max-w-4xl mx-auto">
            <VerticalTestimonialCarousel testimonials={testimonials} />
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full group transition-all duration-300 hover:pr-10"
              asChild
            >
              <Link href="/testimonials">
                Read More Stories{" "}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50 overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-10 top-10 w-32 h-32" animation="float">
          <DecorativeShape type="blob" color="bg-blue-100" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute -left-20 bottom-40 w-24 h-24" animation="pulse" delay={1}>
          <DecorativeShape type="blob-3" color="bg-blue-200" className="w-full h-full" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="gradient-text">Services</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive support for your international education journey
              </p>
              <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
            </div>
          </ScrollReveal>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 gap-12 mb-12">
              <ScrollReveal delay={0.3}>
                <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="lg:w-1/2 order-2 lg:order-1 p-8 flex flex-col justify-center">
                    <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                      <Globe className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Pre-Departure Support</h3>
                    <p className="text-gray-600 mb-6">
                      Comprehensive preparation for your journey abroad, including cultural orientation, packing
                      guidance, and practical advice to ensure you're fully prepared for your international education
                      experience.
                    </p>
                    <Link
                      href="/services#pre-departure"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-auto group"
                    >
                      Learn More{" "}
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div className="lg:w-1/2 order-1 lg:order-2 relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/32213244/pexels-photo-32213244.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                      alt="Pre-Departure Support"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="lg:w-1/2 order-2 lg:order-1 p-8 flex flex-col justify-center">
                    <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                      <HeartHandshake className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Post-Arrival Assistance</h3>
                    <p className="text-gray-600 mb-6">
                      Ongoing support after you arrive at your destination, helping you settle into your new academic
                      home with airport pickup, accommodation setup, and local orientation services.
                    </p>
                    <Link
                      href="/services#post-arrival"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-auto group"
                    >
                      Learn More{" "}
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div className="lg:w-1/2 order-1 lg:order-2 relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/1719490/pexels-photo-1719490.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                      alt="Post-Arrival Assistance"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.9}>
                <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="lg:w-1/2 order-2 lg:order-1 p-8 flex flex-col justify-center">
                    <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                      <CreditCard className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">Study Loan Assistance</h3>
                    <p className="text-gray-600 mb-6">
                      Navigate the financial aspects of studying abroad with our specialized loan assistance. We help
                      you find the best education loan options, assist with documentation, and guide you through the
                      application process to secure funding for your international education.
                    </p>
                    <Link
                      href="/services#study-loan"
                      className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center mt-auto group"
                    >
                      Learn More{" "}
                      <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                  <div className="lg:w-1/2 order-1 lg:order-2 relative h-64 lg:h-auto overflow-hidden">
                    <Image
                      src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                      alt="Study Loan Assistance"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full group transition-all duration-300 hover:pr-10"
              asChild
            >
              <Link href="/services">
                View All Services{" "}
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-20 top-20 w-24 h-24" animation="float">
          <DecorativeShape type="blob-2" color="bg-white" className="w-full h-full opacity-10" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute left-10 bottom-10 w-32 h-32" animation="pulse" delay={0.5}>
          <DecorativeShape type="blob" color="bg-white" className="w-full h-full opacity-10" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute right-1/4 bottom-1/4 w-8 h-8" animation="bounce" delay={1}>
          <Sparkles className="text-yellow-300 opacity-70" />
        </FloatingElement>

        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-shadow">
              Ready to Begin Your International Education Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let CareerMasters guide you through every step of the process, from choosing the right destination to
              settling into your new academic home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-full group transition-all duration-300 hover:pr-10"
                asChild
              >
                <Link href="/contact">
                  Contact Us Today{" "}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-full group transition-all duration-300 hover:pr-10"
                asChild
              >
                <Link href="/countries">
                  Explore Destinations{" "}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}