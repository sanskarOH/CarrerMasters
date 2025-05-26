"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const videos = [
  {
    id: 1,
    location: "Singapore",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 2,
    location: "Dubai",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 3,
    location: "Mauritius",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 4,
    location: "United Kingdom",
    image: "/placeholder.svg?height=1080&width=1920",
  },
]

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
    }, 5000) // Switch every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-full">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={video.image || "/placeholder.svg"}
            alt={`${video.location} background`}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-black/50 text-white px-4 py-2 rounded-md">
            <p className="text-lg font-medium">{video.location}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
