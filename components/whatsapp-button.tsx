"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <a
      href="https://wa.me/+6586864148" // Replace with actual WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all duration-500 hover:bg-green-600 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
      } ${isHovered ? "w-auto px-4" : "w-14 h-14"}`}
      aria-label="Chat on WhatsApp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <MessageCircle className={`h-7 w-7 ${isHovered ? "mr-2" : ""}`} />
      <span
        className={`whitespace-nowrap transition-all duration-300 ${isHovered ? "opacity-100 max-w-40" : "opacity-0 max-w-0 overflow-hidden"}`}
      >
        Chat with us
      </span>
    </a>
  )
}
