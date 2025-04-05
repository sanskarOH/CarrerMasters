import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"


const faqs = [
  {
    question: "How do I apply for your services?",
    answer:
      "You can apply for our services by filling out the contact form on our website. One of our representatives will get in touch with you to discuss your needs and guide you through the process.",
    category: "general",
  },
  {
    question: "Do you offer services for all education levels?",
    answer:
      "Yes, we offer services for students at all education levels, including high school, undergraduate, and postgraduate studies.",
    category: "general",
  },
  {
    question: "Can I get assistance with university applications?",
    answer:
      "Yes, we provide guidance and support for university applications in all our operating countries. Our team can help you select suitable universities and programs, and assist with the application process.",
    category: "services",
  },
  {
    question: "Do you provide airport pickup services?",
    answer:
      "Yes, airport pickup is included in our pre-arrival support package. We ensure that students are met at the airport and safely transported to their accommodation.",
    category: "services",
  },
  {
    question: "Do you help with accommodation arrangements?",
    answer:
      "Yes, our pre-arrival help service includes assistance with finding suitable accommodation based on your preferences and budget, whether it's university housing, private rentals, or homestays.",
    category: "services",
  },
  {
    question: "Do you offer services in countries other than Singapore, Dubai, Mauritius, and the UK?",
    answer:
      "Currently, we focus on providing comprehensive services in these four countries where we have established expertise and networks. However, we can offer limited guidance for other destinations.",
    category: "general",
  },
]

export default function FAQPage() {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        {/* FAQ Accordion */}
        <Card>
          <CardContent className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Still Have Questions */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you couldn't find the answer to your question, please feel free to contact us.
          </p>
          <Button asChild size="lg" className="bg-red-500 hover:bg-yellow-700">
            <a href="/contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </div>
  )
}

