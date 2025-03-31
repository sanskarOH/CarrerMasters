import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Compass, Globe, FileText, ExternalLink, GraduationCap, Plane } from "lucide-react"

const services = [
  {
    id: "forex",
    name: "Forex Exchange",
    icon: <CreditCard className="h-6 w-6" />,
    color: "cm-red",
    description: "Hassle-free currency exchange for students studying abroad.",
    details:
      "Our forex exchange service helps students convert their home currency to the currency of their study destination at competitive rates. We handle all the paperwork and ensure that students have access to funds when they arrive in their new country.",
    countries: ["Singapore", "United Kingdom"],
  },
  {
    id: "pre-arrival",
    name: "Pre-arrival Help",
    icon: <Compass className="h-6 w-6" />,
    color: "cm-gold",
    description: "Accommodation, packing checklists, and essential guidance.",
    details:
      "Our pre-arrival support includes assistance with finding suitable accommodation, providing comprehensive packing checklists tailored to your destination, and guidance on what to expect when you arrive. We ensure you're fully prepared for your journey.",
    countries: ["Singapore", "Dubai", "Mauritius", "United Kingdom"],
  },
  {
    id: "study-tours",
    name: "Study Tours",
    icon: <Globe className="h-6 w-6" />,
    color: "cm-orange",
    description: "Educational travel experiences in different countries.",
    details:
      "Our study tours offer students the opportunity to explore educational institutions, cultural landmarks, and industry sites in their destination country. These tours are designed to enhance learning experiences and provide valuable insights into local education systems and cultures.",
    countries: ["Singapore", "Dubai", "United Kingdom"],
    externalLink: true,
  },
  {
    id: "guardianship",
    name: "Guardianship & Assistance",
    icon: <GraduationCap className="h-6 w-6" />,
    color: "cm-green",
    description: "Support system for students living abroad.",
    details:
      "Our guardianship service provides a local point of contact for young students studying abroad. Guardians attend parent-teacher meetings, help with accommodation issues, and provide general welfare support to ensure students' wellbeing throughout their studies.",
    countries: ["Singapore", "Mauritius", "United Kingdom"],
  },
  {
    id: "visa",
    name: "Visa Assistance",
    icon: <FileText className="h-6 w-6" />,
    color: "cm-red",
    description: "Application guidance and documentation help.",
    details:
      "Our visa assistance service helps students navigate the complex visa application process. We provide guidance on required documentation, review applications, and offer support throughout the process to maximize the chances of a successful visa application.",
    countries: ["Singapore", "Dubai", "Mauritius", "United Kingdom"],
  },
  {
    id: "career-counseling",
    name: "Career Counseling",
    icon: <Plane className="h-6 w-6" />,
    color: "cm-gold",
    description: "Expert guidance for your global career path.",
    details:
      "Our career counseling service helps students identify their strengths, interests, and goals to make informed decisions about their education and career paths. We provide personalized advice on course selection, university choices, and future career opportunities.",
    countries: ["Singapore", "Dubai", "Mauritius", "United Kingdom"],
  },
]

export default function ServicesPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="relative h-20 w-20">
              <Image src="/logo.png" alt="Career Masters Global Logo" fill className="object-contain" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-cm-gold">Our</span> <span className="text-cm-red">Services</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-cm-red to-cm-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive support for international students at every stage of their journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <Card
              key={service.id}
              id={service.id}
              className={`overflow-hidden hover:shadow-lg transition-shadow border-t-4 border-t-${service.color}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`bg-${service.color}/10 p-3 rounded-full mr-4`}>
                    <div className={`text-${service.color}`}>{service.icon}</div>
                  </div>
                  <h3 className={`text-xl font-semibold text-${service.color}`}>{service.name}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-gray-600 mb-4">{service.details}</p>
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Available in:</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.countries.map((country) => (
                      <Link
                        key={country}
                        href={`/countries/${country.toLowerCase()}`}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${service.color}/10 text-${service.color}`}
                      >
                        {country}
                      </Link>
                    ))}
                  </div>
                </div>
                {service.externalLink && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <Link
                      href={`/services/${service.id}`}
                      className={`inline-flex items-center text-${service.color} hover:underline`}
                    >
                      Learn more about our study tours <ExternalLink className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services by Country */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16 globe-pattern">
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text inline-block">Services by Country</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cm-red to-cm-gold mx-auto mb-8"></div>
          <Tabs defaultValue="singapore">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger value="singapore">Singapore</TabsTrigger>
              <TabsTrigger value="dubai">Dubai</TabsTrigger>
              <TabsTrigger value="mauritius">Mauritius</TabsTrigger>
              <TabsTrigger value="uk">United Kingdom</TabsTrigger>
            </TabsList>

            {["singapore", "dubai", "mauritius", "uk"].map((country) => (
              <TabsContent key={country} value={country} className="p-4">
                <h3 className="text-2xl font-bold text-cm-red mb-6 capitalize">
                  {country === "uk" ? "United Kingdom" : country}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services
                    .filter((service) =>
                      service.countries.some(
                        (c) => c.toLowerCase() === country || (country === "uk" && c === "United Kingdom"),
                      ),
                    )
                    .map((service) => (
                      <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-2">
                          <div className={`bg-${service.color}/10 p-2 rounded-full mr-3`}>
                            <div className={`text-${service.color}`}>{service.icon}</div>
                          </div>
                          <h4 className={`text-lg font-semibold text-${service.color}`}>{service.name}</h4>
                        </div>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-cm-red to-cm-red/90 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold text-cm-gold mb-4">Ready to Begin Your International Education Journey?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Contact Career Masters Global today to learn more about our comprehensive services for international
            students.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-cm-gold hover:bg-cm-gold/90 text-white font-bold py-3 px-6 rounded-full transition-colors"
          >
            Contact Us Now
          </Link>
        </div>
      </div>
    </div>
  )
}

