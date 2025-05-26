import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CareerMasters</h3>
            <p className="mb-4 text-gray-300">
              Your gateway to studying abroad. We connect students to global opportunities, offering comprehensive
              services for your educational journey.
            </p>
            <div className="flex space-x-4">
              {/* <Link href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link> */}
              <Link href="https://www.linkedin.com/company/career-master-global-pte-ltd" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/countries" className="text-gray-300 hover:text-white">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-300 hover:text-white">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-xl font-bold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/countries/singapore" className="text-gray-300 hover:text-white">
                  Singapore
                </Link>
              </li>
              <li>
                <Link href="/countries/dubai" className="text-gray-300 hover:text-white">
                  Dubai
                </Link>
              </li>
              <li>
                <Link href="/countries/mauritius" className="text-gray-300 hover:text-white">
                  Mauritius
                </Link>
              </li>
              <li>
                <Link href="/countries/uk" className="text-gray-300 hover:text-white">
                  United Kingdom
                </Link>
              </li>
              <li>
                <Link href="/countries/europe" className="text-gray-300 hover:text-white">
                  Europe
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <span className="text-gray-300">119 Potong pasir, Ave 1, Singapore 350119</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-blue-400" />
                <span className="text-gray-300">6E Elgin Road, Near Bhawanipur College,  Kolkata, West Bengal-700020, India </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-300">+91 89102 81714</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-gray-300">connect@careermasters.sg</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} CareerMasters. All rights reserved.</p>
          {/* <div className="mt-2">
            <Link href="/privacy-policy" className="hover:text-white mr-4">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="hover:text-white">
              Terms of Service
            </Link>
          </div> */}
        </div>
      </div>
    </footer>
  )
}
