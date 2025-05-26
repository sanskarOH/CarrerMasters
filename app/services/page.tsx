import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plane, FileCheck, Home, GraduationCap, Globe, ShieldCheck, HeartHandshake, CreditCard } from "lucide-react"
import FloatingElement from "@/components/floating-element"

const services = [
  {
    id: "study-tours",
    title: "Study Tours",
    description:
      "Experience campus life firsthand with guided tours to top universities in your destination of choice.",
    longDescription:
      "Our study tours provide a comprehensive preview of academic life at leading institutions. Visit multiple universities, meet faculty and current students, tour campus facilities, and get a feel for the local culture and environment. These tours are designed to help you make informed decisions about your educational future.",
    icon: Plane,
    image: "https://images.pexels.com/photos/2881370/pexels-photo-2881370.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    id: "visa",
    title: "Visa Assistance",
    description: "Expert guidance through the visa application process with high success rates.",
    longDescription:
      "Our visa specialists have extensive experience with student visa applications for all our destination countries. We provide document verification, application review, interview preparation, and follow-up support to ensure the highest chance of approval. Our detailed knowledge of country-specific requirements helps streamline this critical process.",
    icon: FileCheck,
    image: "https://images.pexels.com/photos/346798/pexels-photo-346798.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    id: "accommodation",
    title: "Accommodation Support",
    description: "Find the perfect on-campus or off-campus housing with our comprehensive accommodation service.",
    longDescription:
      "Securing comfortable, convenient, and affordable accommodation is essential for a successful study abroad experience. We help you navigate on-campus housing applications, off-campus rental markets, homestay options, and temporary accommodation upon arrival. Our local knowledge ensures you find housing that meets your needs and budget.",
    icon: Home,
    image: "https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    id: "university-placement",
    title: "University Placement",
    description:
      "Personalized guidance for selecting and applying to universities that match your academic profile and career goals.",
    longDescription:
      "Our university placement service provides end-to-end support for your application journey. We help you identify institutions and programs aligned with your academic background, career aspirations, and personal preferences. Our team assists with application preparation, personal statement development, and communication with admissions offices to maximize your chances of acceptance.",
    icon: GraduationCap,
    image: "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    id: "guardianship",
    title: "Guardianship Services",
    description:
      "Legal guardianship arrangements for underage students studying abroad, providing peace of mind for parents.",
    longDescription:
      "For students under 18, we arrange qualified local guardians who provide support, attend parent-teacher meetings, assist with accommodation during holidays, and serve as emergency contacts. Our guardians are carefully selected, experienced professionals who ensure the safety and well-being of younger students while they adjust to life abroad.",
    icon: ShieldCheck,
    image: "https://images.pexels.com/photos/928199/pexels-photo-928199.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    id: "pre-departure",
    title: "Pre-Departure Support",
    description:
      "Comprehensive preparation for your journey abroad, including cultural orientation and practical advice.",
    longDescription:
      "Our pre-departure support ensures you're fully prepared for your international education experience. We provide cultural orientation sessions, packing guidance, travel arrangements assistance, health and safety information, and practical advice on adapting to your new environment. This service helps minimize culture shock and facilitates a smooth transition to life abroad.",
    icon: Globe,
    image: "https://images.pexels.com/photos/32213244/pexels-photo-32213244.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    id: "post-arrival",
    title: "Post-Arrival Assistance",
    description:
      "Ongoing support after you arrive at your destination, helping you settle into your new academic home.",
    longDescription:
      "Our support continues after you arrive at your destination. We assist with airport pickup, initial accommodation, local transportation orientation, mobile phone setup, bank account opening, and other essential settling-in tasks. Our local representatives provide guidance during your first weeks to ensure a comfortable adjustment to your new environment.",
    icon: HeartHandshake,
    image: "https://images.pexels.com/photos/1719490/pexels-photo-1719490.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
  {
    id: "study-loan",
    title: "Study Loan Assistance",
    description: "Navigate the financial aspects of studying abroad with our specialized loan assistance services.",
    longDescription:
      "Our study loan assistance helps you secure funding for your international education. We work with leading financial institutions to find the best education loan options, assist with documentation, guide you through the application process, and provide ongoing support until loan disbursement. Our expertise ensures you get competitive interest rates and favorable terms.",
    icon: CreditCard,
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600&h=400",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl">Comprehensive support for your international education journey</p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute -right-20 top-20 w-32 h-32 bg-blue-100 rounded-full opacity-50" />
        <FloatingElement
          className="hidden lg:block absolute left-10 bottom-10 w-20 h-20 bg-blue-200 rounded-full opacity-40"
          delay={1}
        />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How We Support You</h2>
            <p className="text-lg text-gray-600">
              From initial consultation to post-arrival support, CareerMasters provides end-to-end services for
              international students
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {services.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="rounded-full bg-blue-100 p-3 w-14 h-14 flex items-center justify-center mb-4">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  href={`/services#${service.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          {/* Detailed Service Sections */}
          {services.map((service, index) => (
            <div id={service.id} key={service.id} className="py-16 overflow-hidden relative">
              <FloatingElement
                className={`hidden lg:block absolute ${index % 2 === 0 ? "right-10 top-10" : "left-10 bottom-10"} w-24 h-24 bg-blue-100 rounded-full opacity-30`}
                delay={index * 0.5}
              />

              <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="lg:w-1/2 order-2 lg:order-1">
                    <div className="flex items-center mb-4">
                      <div className="rounded-full bg-blue-100 p-3 mr-4">
                        <service.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{service.title}</h2>
                    </div>
                    <p className="text-lg text-gray-600 mb-6">{service.longDescription}</p>
                  </div>
                  <div className="lg:w-1/2 order-1 lg:order-2">
                    <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105">
                      <Image
                        src={service.image || "/placeholder.svg"}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Single CTA at the end */}
          <div className="text-center mt-16">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full" asChild>
              <Link href="/contact">Inquire About Our Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-blue-50 overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-20 bottom-40 w-24 h-24 bg-blue-300 rounded-full opacity-30" />
        <FloatingElement
          className="hidden lg:block absolute -left-10 top-20 w-16 h-16 bg-blue-400 rounded-full opacity-20"
          delay={1.5}
        />

        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Service Process</h2>
            <p className="text-lg text-gray-600">
              We follow a structured approach to ensure you receive comprehensive support at every stage
            </p>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-[21px] top-0 h-full w-1 bg-blue-200 hidden md:block"></div>

              {/* Steps */}
              <div className="space-y-12">
                {[
                  {
                    number: 1,
                    title: "Initial Consultation",
                    description:
                      "We begin with a detailed discussion about your academic background, career goals, and preferences to understand your needs.",
                  },
                  {
                    number: 2,
                    title: "Destination & Program Selection",
                    description:
                      "Based on your profile, we recommend suitable countries, universities, and programs that align with your objectives.",
                  },
                  {
                    number: 3,
                    title: "Application Preparation",
                    description:
                      "We assist with preparing and submitting applications, including personal statements, recommendation letters, and other required documents.",
                  },
                  {
                    number: 4,
                    title: "Visa Processing",
                    description:
                      "Once accepted, we guide you through the visa application process, ensuring all requirements are met for a successful outcome.",
                  },
                  {
                    number: 5,
                    title: "Pre-Departure Support",
                    description:
                      "We provide comprehensive preparation for your journey, including accommodation arrangements, travel guidance, and cultural orientation.",
                  },
                  {
                    number: 6,
                    title: "Post-Arrival Assistance",
                    description:
                      "Our support continues after you arrive, helping you settle into your new environment and begin your academic journey with confidence.",
                  },
                ].map((step) => (
                  <div key={step.number} className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg z-10">
                      {step.number}
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your International Education Journey?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today to schedule a consultation with our education experts and take the first step toward your
            global future.
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
            <Link href="/contact">Schedule a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
