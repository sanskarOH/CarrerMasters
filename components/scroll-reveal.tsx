"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { cn } from "@/lib/utils"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
}

export default function ScrollReveal({ children, className, threshold = 0.1, delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("is-visible")
            }, delay * 1000)
          }
        })
      },
      { threshold },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, delay])

  return (
    <div ref={ref} className={cn("reveal-on-scroll", className)}>
      {children}
    </div>
  )
}
