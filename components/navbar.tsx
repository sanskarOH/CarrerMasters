"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-10 h-10 mr-3">
              <Image src="/logo.png" alt="CareerMasters Logo" fill className="object-contain" priority />
            </div>
            <span className={cn("text-2xl font-bold transition-colors", scrolled ? "text-blue-600" : "text-white")}>
              CareerMasters
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50",
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-600",
              )}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50",
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-600",
              )}
            >
              About Us
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50 flex items-center",
                    scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-600",
                  )}
                >
                  Countries <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/countries/singapore" className="w-full">
                    Singapore
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/countries/dubai" className="w-full">
                    Dubai
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/countries/mauritius" className="w-full">
                    Mauritius
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/countries/uk" className="w-full">
                    UK
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/countries/europe" className="w-full">
                    Europe
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/countries" className="w-full">
                    View All
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/services"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50",
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-600",
              )}
            >
              Services
            </Link>

            <Link
              href="/testimonials"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-50",
                scrolled ? "text-gray-700 hover:text-blue-600" : "text-white hover:text-blue-600",
              )}
            >
              Testimonials
            </Link>
          </nav>

          {/* Contact Button */}
          <div className="hidden md:block">
            <Button
              className={cn(
                "transition-colors",
                scrolled ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white hover:bg-gray-100 text-blue-600",
              )}
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn("p-2 rounded-md", scrolled ? "text-gray-700" : "text-white")}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-2 py-3 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col px-4 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <div className="relative">
                <button className="w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between">
                  Countries
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="pl-4 mt-1 space-y-1">
                  <Link
                    href="/countries/singapore"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Singapore
                  </Link>
                  <Link
                    href="/countries/dubai"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Dubai
                  </Link>
                  <Link
                    href="/countries/mauritius"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Mauritius
                  </Link>
                  <Link
                    href="/countries/uk"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    UK
                  </Link>
                  <Link
                    href="/countries/europe"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => setIsOpen(false)}
                  >
                    Europe
                  </Link>
                </div>
              </div>
              <Link
                href="/services"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/testimonials"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
