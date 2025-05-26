"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

interface FloatingElementProps {
  className?: string
  delay?: number
  children?: React.ReactNode
  animation?: "float" | "pulse" | "spin" | "bounce" | "shimmer" | "fade-up" | "fade-in" | "fade-right"
  threshold?: number
}

export default function FloatingElement({
  className,
  delay = 0,
  children,
  animation = "float",
  threshold = 0.1,
}: FloatingElementProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold,
  })

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, delay * 1000)

      return () => clearTimeout(timer)
    }
  }, [inView, delay])

  const getAnimationClass = () => {
    switch (animation) {
      case "float":
        return "animate-float"
      case "pulse":
        return "animate-pulse-slow"
      case "spin":
        return "animate-spin-slow"
      case "bounce":
        return "animate-bounce-slow"
      case "shimmer":
        return "animate-shimmer"
      case "fade-up":
        return "animate-fade-slide-up"
      case "fade-in":
        return "animate-fade-slide-in"
      case "fade-right":
        return "animate-fade-slide-right"
      default:
        return "animate-float"
    }
  }

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-in-out",
        isVisible ? `opacity-100 ${getAnimationClass()}` : "opacity-0",
        className,
      )}
    >
      {children}
    </div>
  )
}
