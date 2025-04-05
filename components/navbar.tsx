"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Countries", href: "/countries" },
    { name: "Services", href: "/services" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-40 w-40 relative mr-3">
                <Image src="/logo.png" alt="Career Masters Global Logo" fill className="object-contain" />
              </div>
              <div>
                <span className="text-cm-gold font-bold text-xl block">CAREER MASTERS</span>
                <span className="text-cm-red text-sm block">YOUR MENTORS OVERSEAS</span>
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === link.href ? "text-cm-red font-semibold" : "text-gray-700 hover:text-cm-red"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="ml-4 flex items-center">
              <Button className="bg-cm-red hover:bg-cm-red/90 text-white">
                <a href="/contact">Apply Now</a><Plane className="mr-2 h-4 w-4"/>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href ? "text-cm-red font-semibold" : "text-gray-700 hover:text-cm-red"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="mt-4 px-3">
              <Button className="w-full bg-cm-red hover:bg-cm-red/90 text-white">
                <Plane className="mr-2 h-4 w-4" /> Apply Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

