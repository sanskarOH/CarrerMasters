import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Globe } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-cm-red to-cm-red/90 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="h-12 w-12 relative mr-3 bg-white rounded-full p-1">
                <Image src="/logo.png" alt="Career Masters Global Logo" fill className="object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-cm-gold">CAREER MASTERS</h3>
                <p className="text-xs">YOUR MENTORS OVERSEAS</p>
              </div>
            </div>
            <p className="text-sm mb-4">
              Helping international students navigate their educational journey abroad with expert guidance and support.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white text-cm-red p-2 rounded-full hover:bg-cm-gold hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-white text-cm-red p-2 rounded-full hover:bg-cm-gold hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="bg-white text-cm-red p-2 rounded-full hover:bg-cm-gold hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="bg-white text-cm-red p-2 rounded-full hover:bg-cm-gold hover:text-white transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-cm-gold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cm-gold flex items-center">
                  <span className="mr-2">→</span> Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cm-gold flex items-center">
                  <span className="mr-2">→</span> About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cm-gold flex items-center">
                  <span className="mr-2">→</span> Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cm-gold flex items-center">
                  <span className="mr-2">→</span> FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cm-gold flex items-center">
                  <span className="mr-2">→</span> Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-cm-gold">Study Destinations</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/countries/singapore" className="hover:text-cm-gold flex items-center">
                  <Globe className="mr-2 h-4 w-4" /> Singapore
                </Link>
              </li>
              <li>
                <Link href="/countries/dubai" className="hover:text-cm-gold flex items-center">
                  <Globe className="mr-2 h-4 w-4" /> Dubai
                </Link>
              </li>
              <li>
                <Link href="/countries/mauritius" className="hover:text-cm-gold flex items-center">
                  <Globe className="mr-2 h-4 w-4" /> Mauritius
                </Link>
              </li>
              <li>
                <Link href="/countries/uk" className="hover:text-cm-gold flex items-center">
                  <Globe className="mr-2 h-4 w-4" /> United Kingdom
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 text-cm-gold">Contact Us</h3>
            <address className="not-italic text-sm space-y-3">
              <p className="flex items-start">
                <Mail className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>connect@careermasters.sg</span>
              </p>
              <p className="flex items-start">
                <Phone className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>+91 89102 81714</span>
              </p>
              <p className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>119 Potong pasir , Ave 1, Singapore 350119</span>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Career Masters PTE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

