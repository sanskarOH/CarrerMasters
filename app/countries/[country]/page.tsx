import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Compass, Globe, BookOpen, FileText, ArrowLeft, Landmark } from "lucide-react";

const countryData = {
  singapore: {
    name: "Singapore",
    image: "/singapore.jpg?height=600&width=1200",
    description:
      "Singapore is a global education hub with world-class universities and a multicultural environment. Its strategic location in Asia, excellent infrastructure, and high-quality education make it an attractive destination for international students.",
    services: [
      { id: "pre-arrival", name: "Pre & Post Arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "study-tours", name: "Study Tours", icon: <Globe className="h-6 w-6" /> },
      { id: "visa", name: "Visa Assistance", icon: <FileText className="h-6 w-6" /> },
      { id: "study-loan", name: "Study Loan", icon: <Landmark className="h-6 w-6" /> },
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
      { id: "pre-arrival", name: "Pre & Post Arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "study-tours", name: "Study Tours", icon: <Globe className="h-6 w-6" /> },
      { id: "visa", name: "Visa Assistance", icon: <FileText className="h-6 w-6" /> },
      { id: "study-loan", name: "Study Loan", icon: <Landmark className="h-6 w-6" /> },
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
      { id: "pre-arrival", name: "Pre & Post Arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "visa", name: "Visa Assistance", icon: <FileText className="h-6 w-6" /> },
      { id: "study-loan", name: "Study Loan", icon: <Landmark className="h-6 w-6" /> },
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
      { id: "pre-arrival", name: "Pre & Post Arrival Help", icon: <Compass className="h-6 w-6" /> },
      { id: "study-tours", name: "Study Tours", icon: <Globe className="h-6 w-6" /> },
      { id: "visa", name: "Visa Assistance", icon: <FileText className="h-6 w-6" /> },
      { id: "study-loan", name: "Study Loan", icon: <Landmark className="h-6 w-6" /> },
    ],
    universities: [
      "University of Oxford",
      "University of Cambridge",
      "Imperial College London",
      "London School of Economics",
      "University of Edinburgh",
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(countryData).map((country) => ({
    country,
  }));
}
type CountryParams = {
  params: {
    country: string;
  };
};

export default async function CountryPage({ params }: CountryParams) {
  const countryKey = (await params).country?.toLowerCase();
  const data = countryData[countryKey as keyof typeof countryData];

  if (!data) notFound();

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button asChild  className="flex items-center bg-cm-white text-cm-red  hover:bg-cm-red/10 hover:text-cm-white">
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
              <p className="text-xl max-w-3xl">Comprehensive student services for international students in {data.name}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">About {data.name}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{data.description}</p>
        </div>

        {/* Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Our Services in {data.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-cm-red/10 p-3 rounded-full mr-4 text-cm-red">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-cm-red">{service.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our {service.name.toLowerCase()} service is tailored for students in {data.name}.
                  </p>
                  <Button asChild variant="link" className="p-0 text-cm-gold">
                    <Link href={`/services#${service.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Universities */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Top Universities in {data.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.universities.map((uni) => (
              <Card key={uni}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{uni}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    We support students applying to {uni}.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-cm-red to-cm-gold/80 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold text-cm-gold mb-4">Ready to Start Your Journey in {data.name}?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Contact us today to learn more about our services in {data.name}.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-cm-gold hover:bg-cm-gold/90">
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button asChild size="lg"  className="bg-cm-red hover:bg-cm-gold/90">
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
