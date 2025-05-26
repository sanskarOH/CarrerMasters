import Image from "next/image"
import { CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About CareerMasters</h1>
            <p className="text-xl">Connecting students to global opportunities since 2010</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                At CareerMasters, we connect students to global opportunities, offering comprehensive services from
                study tours to visa assistance, and helping students navigate their educational journey with ease.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Founded by a team of education consultants with firsthand international study experience, we understand
                the challenges and opportunities that come with studying abroad. Our mission is to simplify this journey
                for students from all backgrounds.
              </p>
              <p className="text-lg text-gray-600">
                Over the years, we've helped thousands of students achieve their dreams of international education
                across Singapore, Dubai, Mauritius, the UK, and various European destinations.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="CareerMasters Team"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Mission & Vision</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To simplify the international education journey by providing personalized guidance, comprehensive
                support services, and creating pathways for students to access quality education worldwide.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <span className="text-gray-600">Make quality education accessible to all</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <span className="text-gray-600">Provide end-to-end support for international students</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <span className="text-gray-600">Ensure seamless transitions to new educational environments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h3>
              <p className="text-gray-600 mb-6">
                To be the leading global education consultancy, recognized for excellence in student support, innovative
                services, and creating transformative educational experiences.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <span className="text-gray-600">
                    Expand our reach to serve students from all corners of the world
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <span className="text-gray-600">Build strong partnerships with top educational institutions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-1" />
                  <span className="text-gray-600">
                    Continuously innovate our services to meet evolving student needs
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Integrity</h3>
              <p className="text-gray-600">
                We operate with honesty and transparency, providing accurate information and ethical guidance to all
                students.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Student-Centered</h3>
              <p className="text-gray-600">
                We put students' needs and aspirations at the center of everything we do, tailoring our services to
                individual goals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="rounded-full bg-blue-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in all our services, continuously improving to provide the best support for
                international students.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
