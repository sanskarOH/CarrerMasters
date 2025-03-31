import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg" className="flex items-center">
        <Link href="/">
          <Home className="mr-2 h-5 w-5" /> Back to Home
        </Link>
      </Button>
    </div>
  )
}

