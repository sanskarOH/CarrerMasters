"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface AnimatedCounterProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export default function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  const countingRef = useRef(false)

  useEffect(() => {
    if (!inView || countingRef.current) return

    countingRef.current = true
    let startTime: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const currentCount = Math.floor(progress * (end - startValue) + startValue)

      setCount(currentCount)

      if (progress < 1) {
        window.requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    window.requestAnimationFrame(step)
  }, [inView, end, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
