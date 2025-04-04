"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink } from "lucide-react"
import WorldMap from "@/components/WorldMap" // Import the WorldMap component

const countries = [
  {
    id: "singapore",
    name: "Singapore",
    image: "/singapore.jpg?height=400&width=600",
    description: "A global education hub with world-class universities and a multicultural environment.",
    services: ["Forex exchange", "Pre-arrival help", "Study tours", "Guardianship", "Visa assistance"],
  },
  {
    id: "dubai",
    name: "Dubai",
    image: "/dubai.jpg?height=400&width=600",
    description: "An emerging education destination with prestigious international university campuses.",
    services: ["Study tours", "Visa guidance", "Pre-arrival help", "Local assistance"],
  },
  {
    id: "mauritius",
    name: "Mauritius",
    image: "/mauritus.jpg?height=400&width=600",
    description:
      "A beautiful island nation with quality education and a welcoming atmosphere for international students.",
    services: ["University selection", "Pre-arrival help", "Guardianship", "Visa assistance"],
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "/london.jpg?height=400&width=600",
    description: "Home to some of the world's oldest and most prestigious universities with a rich academic tradition.",
    services: ["Pre-arrival help", "Forex exchange", "Study tours", "Guardianship", "Visa assistance"],
  },
]

export default function CountriesPage() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Global Presence</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore our services across Singapore, Dubai, Mauritius, and the United Kingdom
          </p>
        </div>

        {/* Interactive World Map from imported component */}
        <div className="mb-16">
          <WorldMap />
        </div>

        {/* Selected Country Info */}
        {selectedCountry && (
          <div className="mb-16 p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
            {countries
              .filter((country) => country.id === selectedCountry)
              .map((country) => (
                <div key={country.id} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <img
                      src={country.image || "/placeholder.svg"}
                      alt={country.name}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {country.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base">
                      {country.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Services Available:
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                        {country.services.map((service) => (
                          <li key={service} className="flex items-center text-gray-600 dark:text-gray-300">
                            <div className="h-2 w-2 bg-blue-600 rounded-full mr-2"></div>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Button asChild className="flex items-center w-full sm:w-auto">
                      <Link href={`/countries/${country.id}`} target="_blank">
                        View Services <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Country Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {countries.map((country) => (
            <Card key={country.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={country.image || "/placeholder.svg"}
                  alt={country.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-xl font-bold text-white p-4">{country.name}</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{country.description}</p>
                <Button asChild className="w-full">
                  <Link href={`/countries/${country.id}`}>Explore Services</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}