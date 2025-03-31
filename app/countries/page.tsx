"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, ExternalLink } from "lucide-react"

const countries = [
  {
    id: "singapore",
    name: "Singapore",
    image: "/placeholder.svg?height=400&width=600",
    description: "A global education hub with world-class universities and a multicultural environment.",
    services: ["Forex exchange", "Pre-arrival help", "Study tours", "Guardianship", "Visa assistance"],
  },
  {
    id: "dubai",
    name: "Dubai",
    image: "/placeholder.svg?height=400&width=600",
    description: "An emerging education destination with prestigious international university campuses.",
    services: ["Study tours", "Visa guidance", "Pre-arrival help", "Local assistance"],
  },
  {
    id: "mauritius",
    name: "Mauritius",
    image: "/placeholder.svg?height=400&width=600",
    description:
      "A beautiful island nation with quality education and a welcoming atmosphere for international students.",
    services: ["University selection", "Pre-arrival help", "Guardianship", "Visa assistance"],
  },
  {
    id: "uk",
    name: "United Kingdom",
    image: "/placeholder.svg?height=400&width=600",
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

        {/* Interactive World Map */}
        <div className="mb-16 bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Interactive World Map</h2>
          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=1200"
              alt="World Map"
              className="w-full h-auto rounded-lg"
              useMap="#worldmap"
            />
            <map name="worldmap">
              {countries.map((country) => (
                <area
                  key={country.id}
                  shape="rect"
                  coords={getCountryCoords(country.id)}
                  alt={country.name}
                  onClick={() => setSelectedCountry(country.id)}
                  className="cursor-pointer"
                />
              ))}
            </map>

            {/* Country Markers */}
            {countries.map((country) => (
              <button
                key={country.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getCountryPosition(country.id)} 
                  bg-blue-600 text-white rounded-full p-1 sm:p-2 hover:bg-blue-700 transition-all
                  ${selectedCountry === country.id ? "ring-4 ring-blue-300 dark:ring-blue-500" : ""}`}
                onClick={() => setSelectedCountry(country.id)}
              >
                <MapPin className="h-3 w-3 sm:h-5 sm:w-5" />
                <span className="sr-only">{country.name}</span>
              </button>
            ))}
          </div>

          {/* Selected Country Info */}
          {selectedCountry && (
            <div className="mt-8 p-4 sm:p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
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
        </div>

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

// Helper functions for the interactive map
function getCountryPosition(countryId: string): string {
  const positions = {
    singapore: "top-[45%] left-[70%]",
    dubai: "top-[40%] left-[60%]",
    mauritius: "top-[55%] left-[58%]",
    uk: "top-[30%] left-[45%]",
  }
  return positions[countryId as keyof typeof positions]
}

function getCountryCoords(countryId: string): string {
  const coords = {
    singapore: "700,270,720,290",
    dubai: "600,240,620,260",
    mauritius: "580,330,600,350",
    uk: "450,180,470,200",
  }
  return coords[countryId as keyof typeof coords]
}

