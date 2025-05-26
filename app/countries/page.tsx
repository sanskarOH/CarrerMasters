import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const countries = [
  {
    id: 1,
    name: "Singapore",
    image: "https://images.pexels.com/photos/5406959/pexels-photo-5406959.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "A global education hub with world-class universities and a vibrant multicultural environment.",
    highlights: [
      "Home to top-ranked universities like NUS and NTU",
      "Safe, clean environment with excellent infrastructure",
      "Strong job prospects in tech, finance, and healthcare",
      "English as the primary language of instruction",
    ],
    link: "/countries/singapore",
  },
  {
    id: 2,
    name: "Dubai",
    image: "https://images.pexels.com/photos/3763190/pexels-photo-3763190.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Cutting-edge campuses and international degree programs in the heart of the Middle East.",
    highlights: [
      "International branch campuses of prestigious universities",
      "Tax-free income and high standard of living",
      "Multicultural environment with over 200 nationalities",
      "Growing opportunities in business, tourism, and engineering",
    ],
    link: "/countries/dubai",
  },
  {
    id: 3,
    name: "Mauritius",
    image: "https://images.pexels.com/photos/3703465/pexels-photo-3703465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Quality education in a tropical paradise with strong connections to global institutions.",
    highlights: [
      "Affordable tuition and living costs",
      "Bilingual education (English and French)",
      "Beautiful natural environment and high quality of life",
      "Growing hub for technology and innovation",
    ],
    link: "/countries/mauritius",
  },
  {
    id: 4,
    name: "United Kingdom",
    image: "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Home to some of the world's oldest and most prestigious universities with rich academic traditions.",
    highlights: [
      "World-renowned institutions like Oxford, Cambridge, and LSE",
      "Diverse range of courses and specializations",
      "Rich cultural heritage and student life",
      "Post-study work opportunities with the Graduate Route visa",
    ],
    link: "/countries/uk",
  },
  {
    id: 5,
    name: "Europe",
    image: "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Diverse educational opportunities across France, Germany, Ireland and more European destinations.",
    highlights: [
      "Many programs taught in English",
      "Low or no tuition fees in some countries",
      "Rich cultural experiences and travel opportunities",
      "Strong focus on research and innovation",
    ],
    link: "/countries/europe",
  },
]

export default function CountriesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Study Destinations</h1>
            <p className="text-xl">Explore our featured destinations for international education</p>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-12">
            {countries.map((country) => (
              <div key={country.id} className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:w-2/5 relative h-64 md:h-auto">
                  <Image src={country.image || "/placeholder.svg"} alt={country.name} fill className="object-cover" />
                </div>
                <div className="md:w-3/5 p-6 md:p-8 flex flex-col">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{country.name}</h2>
                  <p className="text-lg text-gray-600 mb-4">{country.description}</p>

                  <h3 className="text-lg font-semibold mb-2 text-gray-900">Key Highlights:</h3>
                  <ul className="mb-6 space-y-2">
                    {country.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-blue-600 mr-2 mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    <Link
                      href={country.link}
                      className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      Learn More About {country.name} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Not Sure Which Destination Is Right For You?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our education consultants can help you find the perfect destination based on your academic goals, budget,
            and preferences.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-blue-700 transition-colors"
          >
            Schedule a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
