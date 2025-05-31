import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  CheckCircle,
  GraduationCap,
  Building,
  Shield,
  Sparkles,
  ChevronRight,
  Globe,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react"
import FloatingElement from "@/components/floating-element"
import DecorativeShape from "@/components/decorative-shape"
import ScrollReveal from "@/components/scroll-reveal"

// This would typically come from a database or API
const countryData = {
  singapore: {
    name: "Singapore",
    hero: "https://images.pexels.com/photos/777059/pexels-photo-777059.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800",
    about: {
      title: "Welcome to Singapore",
      description:
        "Where tradition meets tech, and education fuels ambition. A city that's not just a place on the map, but a blueprint for the future.\n\nFrom sky-kissing architecture to spotless streets, Singapore is a cultural kaleidoscope with a brain wired for innovation. Think of it as Asia's Silicon Valley wrapped in luxury, order, and opportunity.\n\nHere, you're not just studying abroad—you're stepping into a world that runs like clockwork, dreams like a startup, and delivers like a Fortune 500.",
      image: "https://images.pexels.com/photos/290597/pexels-photo-290597.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    whyChoose: {
      title: "Why Singapore as a Study Destination",
      description: "",
      points: [
        {
          title: "Global Degrees, Asian Advantage",
          description: "Get internationally respected degrees from top-ranked universities.",
        },
        {
          title: "English-taught Programs",
          description: "No language barriers, just career bridges.",
        },
        {
          title: "Hyper-Safe & Ultra-Clean",
          description: "Ranked among the safest countries globally—parents sleep well, students thrive.",
        },
        {
          title: "Cultural Mashup",
          description: "Chinese, Malay, Indian, Western—live in a real-world case study of global harmony.",
        },
        {
          title: "Fast, Forward, Flexible",
          description: "Accelerated programs and intakes that fit your timeline, not the other way around.",
        },
      ],
      footer: "Singapore doesn't just educate. It accelerates.",
      image: "https://images.pexels.com/photos/2582932/pexels-photo-2582932.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    benefits: {
      title: "Benefits & Opportunities in Singapore",
      description: "Studying in Singapore is more than a degree—it's a passport to the future.",
      points: [
        "Gateway to Asia's Job Market: Home to giants like Google, Facebook, Grab, DBS, and 37,000+ MNCs.",
        "PR Possibility: Singapore loves talent. Perform, and you stay. Simple.",
        "Global Exposure: Strategic location = Easy access to Asia-Pacific hubs.",
        "Life that Works: World-class healthcare, efficient public transport, and food that deserves a Netflix series.",
      ],
      image: "https://images.pexels.com/photos/1036936/pexels-photo-1036936.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    services: [
      {
        title: "Visa Assistance",
        description:
          "Our expert team guides you through the Student's Pass application process with a high success rate.",
        icon: "Shield",
      },
      {
        title: "University Placement",
        description:
          "We help you select and apply to the best universities and programs based on your academic profile and career goals.",
        icon: "GraduationCap",
      },
      {
        title: "Accommodation Support",
        description: "Find the perfect on-campus or off-campus housing with our comprehensive accommodation service.",
        icon: "Building",
      },
      {
        title: "Career Guidance",
        description:
          "Receive guidance on internship opportunities and post-graduation employment prospects in Singapore.",
        icon: "Briefcase",
      },
    ],
  },
  dubai: {
    name: "Dubai",
    hero: "https://images.pexels.com/photos/3787839/pexels-photo-3787839.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800",
    about: {
      title: "Welcome to Dubai",
      description:
        "Where ambition wears skyscrapers, and opportunity is built on golden sand.\n\nA city where Lamborghinis wait at red lights, the future lives in the present, and students dream in high definition. Dubai isn't just rich in oil—it's rich in vision, innovation, and education that matches global benchmarks.\n\nWith a skyline that competes with imagination and a lifestyle straight out of a luxury magazine, Dubai redefines what it means to study abroad.",
      image: "https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    whyChoose: {
      title: "Why Dubai as a Study Destination",
      description: "",
      points: [
        {
          title: "World-Class Education in English",
          description: "Global universities and international branch campuses call this place home.",
        },
        {
          title: "Tax-Free Living",
          description: "Earn more, save more—yes, even as a student.",
        },
        {
          title: "East Meets West",
          description: "Global curriculum, local warmth—an experience unlike any other.",
        },
        {
          title: "Diverse & Dynamic",
          description: "85% expat population = global friendships, global mindset.",
        },
        {
          title: "Flexible & Fast-Track Options",
          description: "Finish faster, start sooner, win quicker.",
        },
      ],
      footer: "Dubai is more than a city—it's a launchpad for bold futures.",
      image: "https://images.pexels.com/photos/1470405/pexels-photo-1470405.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    benefits: {
      title: "Benefits & Opportunities in Dubai",
      description: "Studying in Dubai is like shaking hands with the future—early.",
      points: [
        "Part-Time Work Opportunities: Work during your course in free zones and universities with built-in internships.",
        "Career in a Tax-Free Hub: MNCs, startups, and mega-events like Expo 2020 turned Dubai into a career hotspot.",
        "Pathway to UAE Residency: Long-term visas available for high-performing graduates.",
        "Lifestyle Goals: Safety, nightlife, beaches, culture, luxury—all in one weekend.",
        "Global Networking: Build contacts in one of the world's busiest business centers.",
      ],
      image: "https://images.pexels.com/photos/2089696/pexels-photo-2089696.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    services: [
      {
        title: "Visa Processing",
        description:
          "Streamlined student visa application with high approval rates for Dubai's educational institutions.",
        icon: "Shield",
      },
      {
        title: "University Selection",
        description:
          "Expert guidance on choosing the right institution and program in Dubai's diverse education landscape.",
        icon: "GraduationCap",
      },
      {
        title: "Housing Assistance",
        description: "Find comfortable and convenient accommodation options in Dubai's various neighborhoods.",
        icon: "Building",
      },
      {
        title: "Internship Placement",
        description:
          "Connect with opportunities in Dubai's thriving sectors including tourism, finance, and technology.",
        icon: "Briefcase",
      },
    ],
  },
  mauritius: {
    name: "Mauritius",
    hero: "https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800",
    about: {
      title: "Welcome to Mauritius",
      description:
        "An island where textbooks meet turquoise, and education happens between lectures and lagoons.\n\nOften mistaken for just a honeymoon spot, Mauritius is secretly one of the most peaceful, affordable, and fast-growing education hubs in the Indian Ocean. French charm, British academics, and African warmth—it's a rare mix that students fall in love with.\n\nThis isn't just an island escape. It's a quiet revolution in international education.",
      image: "https://images.pexels.com/photos/1591375/pexels-photo-1591375.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    whyChoose: {
      title: "Why Mauritius as a Study Destination",
      description: "",
      points: [
        {
          title: "Affordable Excellence",
          description: "Quality education at a fraction of Western costs—both tuition and living expenses.",
        },
        {
          title: "Bilingual Advantage",
          description: "Study in English, pick up French—double your employability.",
        },
        {
          title: "Safe & Serene",
          description: "One of Africa's most stable economies and peaceful societies.",
        },
        {
          title: "International Recognition",
          description: "Degrees from global institutions with local campuses.",
        },
        {
          title: "Work-Life Balance",
          description: "Study hard, then surf, hike, or explore—all within minutes of campus.",
        },
      ],
      footer: "Mauritius: Where your education comes with a view.",
      image: "https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    benefits: {
      title: "Benefits & Opportunities in Mauritius",
      description: "Mauritius offers more than just a degree—it's a lifestyle upgrade with career benefits.",
      points: [
        "Work Permissions: Students can work part-time with proper authorization.",
        "Growing Tech Hub: Africa's emerging Silicon Valley with opportunities in fintech and IT.",
        "Gateway to Africa: Strategic location between Africa, Asia, and Australia.",
        "Quality of Life: Affordable luxury living that would cost 3x more elsewhere.",
        "Post-Study Options: Opportunities to stay and work after graduation in key sectors.",
      ],
      image: "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    services: [
      {
        title: "Visa Guidance",
        description: "Complete assistance with student visa applications and residence permits for Mauritius.",
        icon: "Shield",
      },
      {
        title: "Program Selection",
        description: "Help choosing the right university and program from Mauritius' growing educational offerings.",
        icon: "GraduationCap",
      },
      {
        title: "Accommodation Arrangements",
        description: "Support finding suitable and affordable housing options on the island.",
        icon: "Building",
      },
      {
        title: "Cultural Orientation",
        description: "Comprehensive pre-departure and post-arrival orientation to help you adapt to life in Mauritius.",
        icon: "Briefcase",
      },
    ],
  },
  uk: {
    name: "United Kingdom",
    hero: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800",
    about: {
      title: "Welcome to the United Kingdom",
      description:
        "Step into the United Kingdom—where history lectures are held in castles and coffee breaks happen in cities older than some countries.\n\nFrom the cobbled lanes of Oxford to the innovation hubs of London, the UK blends academic prestige with modern global energy. This isn't just the land of Shakespeare and The Beatles—it's where minds are molded into global leaders.\n\nIn the UK, you're not just earning a degree. You're wearing a legacy.",
      image: "https://images.pexels.com/photos/220769/pexels-photo-220769.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    whyChoose: {
      title: "Why UK as a Study Destination",
      description: "",
      points: [
        {
          title: "Globally Recognized Degrees",
          description: "From Oxford to Glasgow, the UK sets the gold standard in education.",
        },
        {
          title: "1-Year Master's Advantage",
          description: "Save time, money, and hit the job market faster.",
        },
        {
          title: "Cultural Powerhouse",
          description: "Art, business, AI, medicine—every dream has a campus here.",
        },
        {
          title: "Diverse & Inclusive",
          description: "With students from 180+ countries, you'll never feel alone.",
        },
        {
          title: "Innovation Meets Tradition",
          description: "Study cutting-edge tech in buildings older than your great-grandparents.",
        },
      ],
      footer: "In the UK, your education doesn't just shape your career—it shapes your story.",
      image: "https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    benefits: {
      title: "Benefits & Opportunities in the UK",
      description: "A UK education unlocks more than knowledge—it opens doors across continents.",
      points: [
        "Post-Study Work Visa (PSW): Stay 2 years after graduation to work, explore, or build your career.",
        "Part-Time Flexibility: Work up to 20 hrs/week during term and full-time during breaks.",
        "Scholarships Galore: Chevening, Commonwealth, GREAT—opportunities await.",
        "Global Job Access: UK degrees are your passport to careers worldwide.",
        "Live the British Life: Pubs, parks, poetry slams, Premier League—culture lives on every corner.",
      ],
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    services: [
      {
        title: "UK Visa Application",
        description: "Expert guidance through the UK student visa process with high success rates.",
        icon: "Shield",
      },
      {
        title: "University Placement",
        description: "Personalized university selection and application support for UK institutions.",
        icon: "GraduationCap",
      },
      {
        title: "Accommodation Search",
        description: "Help finding suitable university halls or private accommodation across the UK.",
        icon: "Building",
      },
      {
        title: "Graduate Route Guidance",
        description: "Information and support for the post-study work visa (Graduate Route) opportunities.",
        icon: "Briefcase",
      },
    ],
  },
  europe: {
    name: "Europe",
    hero: "https://images.pexels.com/photos/30427221/pexels-photo-30427221.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800",
    about: {
      title: "Welcome to Europe",
      description:
        "Step into Europe—a continent where education was perfected centuries ago and is reinvented every day.\n\nFrom the innovation hubs of Germany to the artistic streets of France, Europe offers a mosaic of educational experiences. This is where tradition meets innovation, where history and future collide in the most beautiful way.\n\nIn Europe, education isn't just about what you learn—it's about who you become.",
      image: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    whyChoose: {
      title: "Why Europe as a Study Destination",
      description: "",
      points: [
        {
          title: "Affordable Excellence",
          description:
            "Many European countries offer low or no tuition fees, especially in Germany, France, and the Nordic countries.",
        },
        {
          title: "English-Taught Programs",
          description:
            "Thousands of degree programs taught entirely in English, eliminating language barriers for international students.",
        },
        {
          title: "Cultural Diversity",
          description:
            "Experience diverse cultures, languages, and traditions while gaining a truly international perspective.",
        },
        {
          title: "Travel Opportunities",
          description:
            "Explore multiple countries easily with Europe's excellent transportation network and open borders within the Schengen Area.",
        },
        {
          title: "Research Excellence",
          description: "Access to cutting-edge research facilities and opportunities to work with leading academics.",
        },
      ],
      footer: "Europe doesn't just educate you. It transforms you.",
      image: "https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    benefits: {
      title: "Benefits & Opportunities in Europe",
      description: "Studying in Europe offers advantages that extend far beyond the classroom.",
      points: [
        "Work Opportunities: Many European countries allow students to work part-time during studies and offer post-study work options.",
        "Research and Innovation: Europe is home to leading research institutions and innovation hubs, particularly in science and technology.",
        "Quality of Life: Enjoy high standards of living, excellent public transportation, healthcare, and social security systems.",
        "Historical and Cultural Richness: Study surrounded by centuries of history, art, architecture, and cultural heritage.",
        "International Networks: Build connections across multiple countries and cultures in a truly global environment.",
      ],
      image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
    },
    services: [
      {
        title: "Country-Specific Visa Guidance",
        description: "Specialized assistance for visa applications to different European countries.",
        icon: "Shield",
      },
      {
        title: "Program and Country Selection",
        description:
          "Help choosing the right European country and institution based on your academic goals and preferences.",
        icon: "GraduationCap",
      },
      {
        title: "Housing Support",
        description: "Assistance finding student accommodation options across European cities.",
        icon: "Building",
      },
      {
        title: "Language Preparation",
        description: "Resources and courses for learning basic local languages to enhance your European experience.",
        icon: "Briefcase",
      },
    ],
  },
}

export default function CountryPage({ params }: { params: { country: string } }) {
  const country = countryData[params.country as keyof typeof countryData]

  if (!country) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={country.hero || "/placeholder.svg"}
          alt={`${country.name} Education`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-lg">
                Study in <span className="text-blue-300">{country.name}</span>
              </h1>
              <p className="text-xl text-white">Your gateway to international education</p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <FloatingElement className="hidden lg:block absolute right-10 bottom-10 w-32 h-32" animation="float">
          <DecorativeShape type="blob" color="bg-white" className="w-full h-full opacity-20" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute left-20 top-20 w-16 h-16" animation="pulse" delay={0.5}>
          <DecorativeShape type="circle" color="bg-blue-300" className="w-full h-full opacity-30" />
        </FloatingElement>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute -right-20 top-20 w-32 h-32" animation="float">
          <DecorativeShape type="blob" color="bg-blue-100" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute left-10 bottom-10 w-20 h-20" animation="pulse" delay={1}>
          <DecorativeShape type="blob-2" color="bg-blue-200" className="w-full h-full" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">{country.about.title}</h2>
                  <div className="text-lg text-gray-600 space-y-4">
                    {country.about.description.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </ScrollReveal>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <ScrollReveal delay={0.3}>
                  <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 group">
                    <Image
                      src={country.about.image || "/placeholder.svg"}
                      alt={`About ${country.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50 overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-20 bottom-40 w-24 h-24" animation="float">
          <DecorativeShape type="blob-3" color="bg-blue-300" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute -left-10 top-20 w-16 h-16" animation="pulse" delay={1.5}>
          <DecorativeShape type="square" color="bg-blue-400" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute right-1/4 bottom-1/4 w-8 h-8" animation="bounce" delay={2}>
          <Sparkles className="text-blue-400 opacity-70" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2">
                <ScrollReveal>
                  <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 group">
                    <Image
                      src={country.whyChoose.image || "/placeholder.svg"}
                      alt={`Why Choose ${country.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </ScrollReveal>
              </div>
              <div className="lg:w-1/2">
                <ScrollReveal delay={0.3}>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">{country.whyChoose.title}</h2>

                  <div className="space-y-6">
                    {country.whyChoose.points.map((point, index) => (
                      <div key={index} className="flex group">
                        <div className="flex-shrink-0 mt-1">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors duration-300">
                            <span className="text-blue-600 font-bold">{index + 1}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl font-bold text-gray-900">{point.title}</h3>
                          <p className="text-gray-600">{point.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {country.whyChoose.footer && (
                    <p className="mt-6 text-xl font-bold gradient-text">{country.whyChoose.footer}</p>
                  )}
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-40 top-10 w-28 h-28" animation="float">
          <DecorativeShape type="blob" color="bg-blue-100" className="w-full h-full" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute left-20 bottom-20 w-20 h-20" animation="pulse" delay={2}>
          <DecorativeShape type="dots" color="bg-blue-200" className="w-full h-full" />
        </FloatingElement>

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 order-2 lg:order-1">
                <ScrollReveal>
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">{country.benefits.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{country.benefits.description}</p>

                  <ul className="space-y-4">
                    {country.benefits.points.map((benefit, index) => (
                      <li key={index} className="flex items-start group">
                        <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0 group-hover:text-green-600 transition-colors duration-300" />
                        <span className="text-gray-600">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </ScrollReveal>
              </div>
              <div className="lg:w-1/2 order-1 lg:order-2">
                <ScrollReveal delay={0.3}>
                  <div className="relative h-80 md:h-96 w-full rounded-xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:scale-105 group">
                    <Image
                      src={country.benefits.image || "/placeholder.svg"}
                      alt={`Benefits of Studying in ${country.name}`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
                Our Services in <span className="gradient-text">{country.name}</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 text-center">
                CareerMasters offers comprehensive support services to make your educational journey to {country.name}{" "}
                smooth and successful.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* All services for every country */}
              <ScrollReveal delay={0.1}>
                <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <Shield className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Visa Assistance</h3>
                      <p className="text-gray-600">
                        Expert guidance through the visa application process with high success rates.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <GraduationCap className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">University Placement</h3>
                      <p className="text-gray-600">
                        Personalized guidance for selecting and applying to universities that match your profile.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Accommodation Support</h3>
                      <p className="text-gray-600">
                        Find the perfect on-campus or off-campus housing with our comprehensive service.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <Globe className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Pre-Departure Support</h3>
                      <p className="text-gray-600">
                        Comprehensive preparation including cultural orientation and practical advice.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.5}>
                <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <HeartHandshake className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Post-Arrival Assistance</h3>
                      <p className="text-gray-600">
                        Ongoing support after arrival to help you settle into your new environment.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.6}>
                <div className="bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4 group-hover:bg-blue-200 transition-colors duration-300">
                      <ShieldCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-900">Guardianship Services</h3>
                      <p className="text-gray-600">
                        Legal guardianship arrangements for underage students studying abroad.
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white overflow-hidden relative">
        <FloatingElement className="hidden lg:block absolute right-20 top-20 w-24 h-24" animation="float">
          <DecorativeShape type="blob-2" color="bg-white" className="w-full h-full opacity-10" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute left-10 bottom-10 w-32 h-32" animation="pulse" delay={0.5}>
          <DecorativeShape type="blob" color="bg-white" className="w-full h-full opacity-10" />
        </FloatingElement>

        <FloatingElement className="hidden lg:block absolute right-1/4 bottom-1/4 w-8 h-8" animation="bounce" delay={1}>
          <Sparkles className="text-yellow-300 opacity-70" />
        </FloatingElement>

        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl font-bold mb-6 text-shadow">Ready to Begin Your Journey to {country.name}?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let our experts guide you through every step of the process, from application to arrival.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-full group transition-all duration-300 hover:pr-10"
                asChild
              >
                <Link href="/contact">
                  Schedule a Consultation{" "}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 rounded-full group transition-all duration-300 hover:pr-10"
                asChild
              >
                <Link href="/services">
                  Explore Our Services{" "}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
