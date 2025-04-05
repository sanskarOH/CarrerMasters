
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, GraduationCap, Globe, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
          </div>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-cm-gold">About</span> <span className="text-cm-red">Career Masters Global</span>
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-cm-red to-cm-gold mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            YOUR MENTORS OVERSEAS - Supporting international students on their educational journey abroad
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1   mb-16">
          <div>
            <h2 className="text-3xl font-bold text-cm-red mb-6">Our Story</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                Career Masters Global was founded with a simple mission: to make international education accessible and
                stress-free for students around the world.
              </p>
              <p className="text-gray-600">
                What began as a small initiative to help students navigate visa applications has grown into a
                comprehensive service provider operating in Singapore, Dubai, Mauritius, and the United Kingdom.
              </p>
              <p className="text-gray-600">
                Our team consists of education experts, former international students, and local specialists who
                understand the challenges of studying abroad and are passionate about helping students succeed.
              </p>
            </div>
          </div>
        </div>

        {/* Our Mission & Values */}
        <div className="bg-gray-50 rounded-xl p-8 mb-16 globe-pattern">
          <h2 className="text-3xl font-bold text-center mb-8">
            <span className="gradient-text">Our Mission & Values</span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-cm-red to-cm-gold mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-t-cm-red">
              <CardContent className="p-6">
                <div className="bg-cm-red/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6 text-cm-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-cm-red">Our Mission</h3>
                <p className="text-gray-600">
                  To empower international students with the resources, support, and guidance they need to thrive
                  academically and personally in a new country.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-cm-gold">
              <CardContent className="p-6">
                <div className="bg-cm-gold/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-cm-gold" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-cm-gold">Our Vision</h3>
                <p className="text-gray-600">
                  To be the leading global provider of comprehensive student services, known for excellence, integrity,
                  and student-centered support.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-t-cm-green">
              <CardContent className="p-6">
                <div className="bg-cm-green/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-cm-green" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-cm-green">Our Values</h3>
                <ul className="space-y-2">
                  {["Integrity", "Excellence", "Empathy", "Innovation", "Diversity"].map((value) => (
                    <li key={value} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cm-green mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-r from-cm-red to-cm-red/90 rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-8 text-cm-gold">Why Choose Career Masters Global</h2>
          <div className="h-1 w-20 bg-cm-gold mx-auto mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Expertise Across Multiple Countries",
                description:
                  "Our team has in-depth knowledge of education systems and student life in Singapore, Dubai, Mauritius, and the UK.",
                icon: <Globe className="h-6 w-6 text-cm-gold" />,
              },
              {
                title: "Comprehensive Support",
                description:
                  "From pre-arrival preparation to on-ground assistance, we provide end-to-end services for international students.",
                icon: <Users className="h-6 w-6 text-cm-gold" />,
              },
              {
                title: "Personalized Approach",
                description:
                  "We understand that each student's needs are unique, and we tailor our services accordingly.",
                icon: <Award className="h-6 w-6 text-cm-gold" />,
              },
              {
                title: "Trusted Network",
                description:
                  "We have established relationships with universities, accommodation providers, and local services in all our operating countries.",
                icon: <GraduationCap className="h-6 w-6 text-cm-gold" />,
              },
            ].map((item, index) => (
              <div key={index} className="flex bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <div className="mr-4 flex-shrink-0 bg-cm-gold/20 p-3 rounded-full">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-cm-gold mb-2">{item.title}</h3>
                  <p className="text-white/90">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

