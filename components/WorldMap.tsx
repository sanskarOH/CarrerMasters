"use client"

import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"

const countries = [
  {
    id: "singapore",
    name: "Singapore",
    position: "top-[74%] left-[82%]",
  },
  {
    id: "dubai",
    name: "Dubai",
    position: "top-[47%] left-[67%]",
  },
  {
    id: "mauritius",
    name: "Mauritius",
    position: "top-[78%] left-[72%]",
  },
  {
    id: "uk",
    name: "United Kingdom",
    position: "top-[24%] left-[43%]",
  },
];


interface WorldMapProps {
  onSelectCountry?: (countryId: string) => void;
}

const WorldMap = ({ onSelectCountry }: WorldMapProps = {}) => {
  const router = useRouter()
  
  // Handle pin click
  const handlePinClick = (countryId: string) => {
    if (onSelectCountry) {
      // If a callback is provided, call it with the selected country
      onSelectCountry(countryId)
    } else {
      // Default behavior: navigate to country page
      router.push(`/countries/${countryId}`)
    }
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-xl">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Interactive World Map</h2>
      <div className="relative">
        {/* World Map Image */}
        <img 
          src="/world.svg?height=600&width=1200" 
          alt="World Map" 
          className="w-full h-auto rounded-lg"
        />
        
        {/* Country Markers/Pins */}
        {countries.map((country) => (
          <button
            key={country.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${country.position} 
              bg-blue-600 text-white rounded-full p-1 sm:p-2 hover:bg-blue-700 transition-all
              group`}
            onClick={() => handlePinClick(country.id)}
            aria-label={`Go to ${country.name} services page`}
          >
            <MapPin className="h-3 w-3 sm:h-5 sm:w-5" />
            
            {/* Tooltip */}
            <span className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 
              whitespace-nowrap bg-gray-800 text-white text-xs rounded py-1 px-2 
              opacity-0 group-hover:opacity-100 transition-opacity">
              {country.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default WorldMap