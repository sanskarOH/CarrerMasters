"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    message: "",
  })


  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, country: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const access_key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!access_key) {
      console.error("Missing Web3Forms access key.");
      alert("Form submission is disabled. Please set the API key.");
      return;
    }


    const formDataToSend = new FormData();
    formDataToSend.append("access_key", access_key || "");
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("country", formData.country);
    formDataToSend.append("message", formData.message);


    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });
  
      const result = await response.json();
  
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", country: "", message: "" });
  
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get in touch with our team for more information about our services
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>

                {isSubmitted ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                    <p className="text-green-800 dark:text-green-200 font-medium">
                      Thank you for your message! We'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Country of Interest
                      </label>
                      <Select value={formData.country} onValueChange={handleSelectChange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="singapore">Singapore</SelectItem>
                          <SelectItem value="dubai">Dubai</SelectItem>
                          <SelectItem value="mauritius">Mauritius</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="w-full min-h-[150px]"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4 flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                          sansakrdiwedi@gmail.com
                        </p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                          sansakrdiwedi@gmail.com
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                        <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Call Us</h3>
                        <p className="text-gray-600 dark:text-gray-300">+1 (123) 456-7890</p>
                        <p className="text-gray-600 dark:text-gray-300">+1 (987) 654-3210</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Offices</h2>
              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    country: "Singapore",
                    address: "123 Orchard Road, #05-01, Singapore 123456",
                    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
                  },
                  {
                    country: "Dubai",
                    address: "456 Sheikh Zayed Road, Dubai, UAE",
                    hours: "Sun-Thu: 8:00 AM - 5:00 PM",
                  },
                  {
                    country: "Mauritius",
                    address: "789 Coastal Road, Port Louis, Mauritius",
                    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
                  },
                  {
                    country: "United Kingdom",
                    address: "10 Oxford Street, London, UK",
                    hours: "Mon-Fri: 9:00 AM - 5:30 PM",
                  },
                ].map((office) => (
                  <Card key={office.country}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                          <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{office.country}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-2">{office.address}</p>
                          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {office.hours}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Find Us on the Map</h2>
          <div className="bg-gray-200 dark:bg-gray-700 h-96 rounded-lg overflow-hidden">
            {/* Placeholder for map */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-300">Interactive map would be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

