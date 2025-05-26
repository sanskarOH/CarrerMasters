"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; 
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Temporary placeholder components if UI components aren't available
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type, className, disabled }) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    disabled={disabled}
  >
    {children}
  </button>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
    {...props}
  />
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
    {...props}
  />
);

interface SelectProps {
  children: React.ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({ children, value, onValueChange }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
    >
      {children}
    </select>
  </div>
);

const SelectTrigger: React.FC<{ children: React.ReactNode; id?: string }> = ({ children }) => <>{children}</>;
const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => <option value="">{placeholder}</option>;
const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => <option value={value}>{children}</option>;

declare global {
  interface Window {
    hcaptcha: {
      render: (container: string, options: any) => string;
      getResponse: (widgetId: string) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+91",
    country: "",
    studyLevel: "",
    startDate: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hcaptchaLoaded, setHcaptchaLoaded] = useState(false)
  const [hcaptchaWidgetId, setHcaptchaWidgetId] = useState<string>("")

  useEffect(() => {
    // Check if hCaptcha script is already loaded
    if (window.hcaptcha) {
      setHcaptchaLoaded(true)
      renderHCaptcha()
      return
    }

    // Load hCaptcha script
    const script = document.createElement("script")
    script.src = "https://js.hcaptcha.com/1/api.js"
    script.async = true
    script.defer = true
    script.onload = () => {
      setHcaptchaLoaded(true)
      renderHCaptcha()
    }
    script.onerror = () => {
      console.error("Failed to load hCaptcha script")
    }
    
    document.head.appendChild(script)

    return () => {
      // Clean up script if component unmounts
      try {
        if (document.head.contains(script)) {
          document.head.removeChild(script)
        }
      } catch (error) {
        console.error("Error removing hCaptcha script:", error)
      }
    }
  }, [])

  const renderHCaptcha = () => {
    if (window.hcaptcha && process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY) {
      try {
        const widgetId = window.hcaptcha.render("hcaptcha-container", {
          sitekey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY,
          theme: "light",
        })
        setHcaptchaWidgetId(widgetId)
      } catch (error) {
        console.error("Error rendering hCaptcha:", error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (!formState.name || !formState.email || !formState.phone || !formState.message) {
        alert("Please fill in all required fields")
        setIsSubmitting(false)
        return
      }

      // Get hCaptcha response
      let hcaptchaResponse = ""
      if (window.hcaptcha && hcaptchaWidgetId) {
        hcaptchaResponse = window.hcaptcha.getResponse(hcaptchaWidgetId)
        if (!hcaptchaResponse) {
          alert("Please complete the captcha verification")
          setIsSubmitting(false)
          return
        }
      }

      // Validate environment variables
      if (!process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY) {
        throw new Error("Web3Forms access key not configured")
      }

      // Prepare form data for Web3Forms
      const formData = new FormData()
      formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY)
      formData.append("name", formState.name)
      formData.append("email", formState.email)
      formData.append("phone", `${formState.countryCode} ${formState.phone}`)
      formData.append("country", formState.country)
      formData.append("studyLevel", formState.studyLevel)
      formData.append("startDate", formState.startDate)
      formData.append("message", formState.message)
      
      if (hcaptchaResponse) {
        formData.append("h-captcha-response", hcaptchaResponse)
      }

      // Add additional fields
      formData.append("redirect", "false")
      formData.append("from_name", "CareerMasters Contact Form")
      formData.append("subject", "New Contact Form Submission - CareerMasters")
      formData.append("replyto", formState.email)
      formData.append("cc", "sanskardiwedi@gmail.com")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        // Reset form
        setFormState({
          name: "",
          email: "",
          phone: "",
          countryCode: "+91",
          country: "",
          studyLevel: "",
          startDate: "",
          message: "",
        })
        // Reset hCaptcha
        if (window.hcaptcha && hcaptchaWidgetId) {
          window.hcaptcha.reset(hcaptchaWidgetId)
        }
      } else {
        throw new Error(result.message || "Form submission failed")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      alert("There was an error submitting the form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl">Get in touch with our education consultants to start your international journey</p>
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our team of education consultants is ready to answer your questions and help you plan your
                  international education journey.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <MapPin className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">Visit Us</h3>
                      <p className="text-gray-600">123 Education Street</p>
                      <p className="text-gray-600">Global City, 10001</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">Call Us</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">Email Us</h3>
                      <p className="text-gray-600">info@careermasters.com</p>
                      <p className="text-gray-600">We respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">Office Hours</h3>
                      <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-600">Saturday: 10:00 AM - 2:00 PM</p>
                      <p className="text-gray-600">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                      </svg>
                      <span className="sr-only">Facebook</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                      <span className="sr-only">Twitter</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                      href="#"
                      className="rounded-full bg-blue-100 p-3 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                      </svg>
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-gray-900">Thank You!</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      Your message has been received. One of our education consultants will contact you within 24 hours.
                    </p>
                    <Button onClick={() => setSubmitted(false)} className="bg-blue-600 hover:bg-blue-700">
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            required
                            placeholder="Your full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formState.email}
                            onChange={handleChange}
                            required
                            placeholder="Your email address"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                          </label>
                          <div className="flex">
                            <select
                              className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm"
                              value={formState.countryCode}
                              onChange={(e) => handleSelectChange("countryCode", e.target.value)}
                            >
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+91">🇮🇳 +91</option>
                              <option value="+44">🇬🇧 +44</option>
                              <option value="+971">🇦🇪 +971</option>
                              <option value="+65">🇸🇬 +65</option>
                              <option value="+230">🇲🇺 +230</option>
                              <option value="+33">🇫🇷 +33</option>
                              <option value="+49">🇩🇪 +49</option>
                              <option value="+61">🇦🇺 +61</option>
                              <option value="+86">🇨🇳 +86</option>
                            </select>
                            <Input
                              id="phone"
                              name="phone"
                              value={formState.phone}
                              onChange={handleChange}
                              required
                              placeholder="Your phone number"
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                            Destination Country
                          </label>
                          <Select
                            value={formState.country}
                            onValueChange={(value: string) => handleSelectChange("country", value)}
                          >
                            <SelectTrigger id="country">
                              <SelectValue placeholder="Select a country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="singapore">Singapore</SelectItem>
                              <SelectItem value="dubai">Dubai</SelectItem>
                              <SelectItem value="mauritius">Mauritius</SelectItem>
                              <SelectItem value="uk">United Kingdom</SelectItem>
                              <SelectItem value="europe">Europe</SelectItem>
                              <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label htmlFor="studyLevel" className="block text-sm font-medium text-gray-700 mb-1">
                            Study Level
                          </label>
                          <Select
                            value={formState.studyLevel}
                            onValueChange={(value: string) => handleSelectChange("studyLevel", value)}
                          >
                            <SelectTrigger id="studyLevel">
                              <SelectValue placeholder="Select study level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="undergraduate">Undergraduate</SelectItem>
                              <SelectItem value="postgraduate">Postgraduate</SelectItem>
                              <SelectItem value="phd">PhD</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Start Date
                          </label>
                          <Select
                            value={formState.startDate}
                            onValueChange={(value: string) => handleSelectChange("startDate", value)}
                          >
                            <SelectTrigger id="startDate">
                              <SelectValue placeholder="Select start date" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="asap">As Soon As Possible</SelectItem>
                              <SelectItem value="3months">Within 3 Months</SelectItem>
                              <SelectItem value="6months">Within 6 Months</SelectItem>
                              <SelectItem value="nextyear">Next Year</SelectItem>
                              <SelectItem value="exploring">Just Exploring Options</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Your Message *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          required
                          placeholder="Tell us about your education goals and how we can help you"
                          rows={5}
                        />
                      </div>

                      {/* hCaptcha */}
                      <div className="mb-6">
                        <div id="hcaptcha-container"></div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        disabled={isSubmitting || !hcaptchaLoaded}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 text-center">Frequently Asked Questions</h2>

            <div className="space-y-6">
              {[
                {
                  question: "How do I start the process of studying abroad?",
                  answer:
                    "The first step is to schedule a consultation with one of our education advisors. During this meeting, we'll discuss your academic background, career goals, and preferences to help identify the best destinations and programs for you.",
                },
                {
                  question: "How much does it cost to use CareerMasters' services?",
                  answer:
                    "Our initial consultation is completely free. Service fees vary depending on the specific services you require. We offer transparent pricing and will provide a detailed breakdown of costs during your consultation.",
                },
                {
                  question: "How long does the visa application process take?",
                  answer:
                    "Visa processing times vary by country, ranging from 2 weeks to 3 months. We recommend starting the process at least 3-6 months before your intended start date to allow for any unexpected delays.",
                },
                {
                  question: "Can you help me find scholarships or financial aid?",
                  answer:
                    "Yes, we provide guidance on available scholarships, grants, and financial aid options for international students. We'll help you identify opportunities you're eligible for and assist with the application process.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}