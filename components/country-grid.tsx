import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ScrollReveal from "@/components/scroll-reveal"

const countries = [
  {
    id: 1,
    name: "Singapore",
    image: "https://images.pexels.com/photos/5406959/pexels-photo-5406959.jpeg?height=400&width=600",
    description: "A global education hub with world-class universities and a vibrant multicultural environment.",
    link: "/countries/singapore",
  },
  {
    id: 2,
    name: "Dubai",
    image: "https://images.pexels.com/photos/3763190/pexels-photo-3763190.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Cutting-edge campuses and international degree programs in the heart of the Middle East.",
    link: "/countries/dubai",
  },
  {
    id: 3,
    name: "Mauritius",
    image: "https://images.pexels.com/photos/3703465/pexels-photo-3703465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Quality education in a tropical paradise with strong connections to global institutions.",
    link: "/countries/mauritius",
  },
  {
    id: 4,
    name: "United Kingdom",
    image: "https://images.pexels.com/photos/427679/pexels-photo-427679.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Home to some of the world's oldest and most prestigious universities with rich academic traditions.",
    link: "/countries/uk",
  },
  {
    id: 5,
    name: "Europe",
    image: "https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
    description: "Diverse educational opportunities across France, Germany, Ireland and more European destinations.",
    link: "/countries/europe",
  },
]

export default function CountryGrid() {
  // Display only the first 3 countries on the homepage
  const displayedCountries = countries.slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayedCountries.map((country, index) => (
        <ScrollReveal key={country.id} delay={0.2 * index}>
          <Link
            href={country.link}
            className="group block overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                src={country.image || "/placeholder.svg"}
                alt={country.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white text-shadow">{country.name}</h3>
            </div>
            <div className="p-5">
              <p className="mb-4 text-gray-600">{country.description}</p>
              <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-800">
                Learn More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          </Link>
        </ScrollReveal>
      ))}
    </div>
  )
}
