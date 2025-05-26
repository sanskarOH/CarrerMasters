import { cn } from "@/lib/utils"

interface DecorativeShapeProps {
  className?: string
  type?: "blob" | "blob-2" | "blob-3" | "circle" | "square" | "triangle" | "dots"
  color?: string
}

export default function DecorativeShape({ className, type = "blob", color = "bg-blue-100" }: DecorativeShapeProps) {
  if (type === "dots") {
    return (
      <div className={cn("relative", className)}>
        <div className="absolute inset-0 grid grid-cols-5 gap-2">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className={cn("h-1.5 w-1.5 rounded-full", color, i % 2 === 0 ? "opacity-60" : "opacity-30")} />
          ))}
        </div>
      </div>
    )
  }

  if (type === "triangle") {
    return (
      <div className={cn("relative", className)}>
        <div
          className={cn("absolute w-full h-full", color, "opacity-70")}
          style={{
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      </div>
    )
  }

  if (type === "square") {
    return <div className={cn("rounded-md rotate-12", color, "opacity-70", className)} />
  }

  if (type === "circle") {
    return <div className={cn("rounded-full", color, "opacity-70", className)} />
  }

  return <div className={cn(type, color, "opacity-70", className)} />
}
