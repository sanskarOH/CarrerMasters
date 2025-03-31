import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Compass, Globe, BookOpen, FileText, ArrowLeft } from "lucide-react"

const countryData = {
  singapore: {
    name: "Singapore",
    image: "/singapore.jpg?height=600&width=1200",
    description:
      "Singapore is a global education hub with world-class universities and a multicultural environment. Its strategic location in Asia, excellent infrastructure, and high-quality education make it an attractive destination for international students.",
    services: [
      { id: "forex", name: "Forex Exchange", icon: <CreditCard className="h-6 w-6" /> },
      { id: "pre-arrival", name: "Pre-arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "study-tours", name: "Study Tours", icon: <Globe className="h-6 w-6" /> },
      { id: "guardianship", name: "Guardianship", icon: <BookOpen className="h-6 w-6" /> },
      { id: "visa", name: "Visa Assistance", icon: <FileText className="h-6 w-6" /> },
    ],
    universities: [
      "National University of Singapore (NUS)",
      "Nanyang Technological University (NTU)",
      "Singapore Management University (SMU)",
      "Singapore University of Technology and Design (SUTD)",
    ],
  },
  dubai: {
    name: "Dubai",
    image: "/dubai.jpg?height=600&width=1200",
    description:
      "Dubai is an emerging education destination with prestigious international university campuses. Its modern infrastructure, multicultural environment, and strategic location between East and West make it an exciting place for international students.",
    services: [
      { id: "study-tours", name: "Study Tours", icon: <Globe className="h-6 w-6" /> },
      { id: "visa", name: "Visa Guidance", icon: <FileText className="h-6 w-6" /> },
      { id: "pre-arrival", name: "Pre-arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "local-assistance", name: "Local Assistance", icon: <BookOpen className="h-6 w-6" /> },
    ],
    universities: [
      "University of Dubai",
      "American University in Dubai",
      "Heriot-Watt University Dubai",
      "Middlesex University Dubai",
    ],
  },
  mauritius: {
    name: "Mauritius",
    image: "/mauritus.jpg?height=600&width=1200",
    description:
      "Mauritius is a beautiful island nation with quality education and a welcoming atmosphere for international students. Its peaceful environment, growing education sector, and affordable living costs make it an attractive study destination.",
    services: [
      { id: "university-selection", name: "University Selection", icon: <BookOpen className="h-6 w-6" /> },
      { id: "pre-arrival", name: "Pre-arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "guardianship", name: "Guardianship", icon: <BookOpen className="h-6 w-6" /> },
      { id: "visa", name: "Visa Assistance", icon: <FileText className="h-6 w-6" /> },
    ],
    universities: [
      "University of Mauritius",
      "Middlesex University Mauritius",
      "Curtin University Mauritius",
      "African Leadership University",
    ],
  },
  uk: {
    name: "United Kingdom",
    image: "/london.jpg?height=600&width=1200",
    description:
      "The United Kingdom is home to some of the world's oldest and most prestigious universities with a rich academic tradition. Its high-quality education, diverse culture, and extensive research opportunities attract students from around the globe.",
    services: [
      { id: "pre-arrival", name: "Pre-arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "forex", name: "Forex Exchange", icon: <CreditCard className="h-6 w-6" /> },
      { id: "study-tours", name: "Study Tours", icon: <Globe className="h-6 w-6" /> },
      { id: "guardianship", name: "Guardianship", icon: <BookOpen className="h-6 w-6" /> },
      { id: "visa", name: "Visa Assistance", icon: <FileText className="h-6 w-6" /> },
    ],
    universities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "London School of Economics",
      "University of Edinburgh",
    ],
  },
}

type CountryParams = {
  params: {
    country: string
  }
}

export default function CountryPage({ params }: CountryParams) {
  const { country } = params

  // Check if country exists in our data
  if (!countryData[country as keyof typeof countryData]) {
    notFound()
  }

  const data = countryData[country as keyof typeof countryData]

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Button asChild variant="outline" className="flex items-center">
            <Link href="/countries">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Countries
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-16 h-[400px]">
          <img src={data.image || "/placeholder.svg"} alt={data.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-8 text-white">
              <h1 className="text-4xl font-bold mb-4">Study in {data.name}</h1>
              <p className="text-xl max-w-3xl">
                Comprehensive student services for international students in {data.name}
              </p>
            </div>
          </div>
        </div>

        {/* Country Description */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">About {data.name}</h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300">{data.description}</p>
          </div>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Services in {data.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our {service.name.toLowerCase()} service is tailored specifically for students in {data.name}.
                  </p>
                  <Button asChild variant="link" className="p-0">
                    <Link href={`/services#${service.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Universities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Top Universities in {data.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.universities.map((university) => (
              <Card key={university}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{university}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We provide comprehensive support for students applying to and studying at {university}.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Student Life */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Student Life in {data.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Accommodation",
                description: `We help students find suitable accommodation in ${data.name}, whether it's university housing, private rentals, or homestays.`,
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Culture & Lifestyle",
                description: `${data.name} offers a rich cultural experience with diverse food, festivals, and activities for international students.`,
                image: "/placeholder.svg?height=300&width=400",
              },
              {
                title: "Transportation",
                description: `We provide guidance on navigating ${data.name}'s transportation system, from public transit to getting a driver's license.`,
                image: "/placeholder.svg?height=300&width=400",
              },
            ].map((item) => (
              <Card key={item.title} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Journey in {data.name}?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Contact us today to learn more about our services for international students in {data.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

