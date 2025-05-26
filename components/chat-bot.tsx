"use client"

import type React from "react"

import { useState } from "react"
import { Bot, X, Send, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const botResponses = {
  greetings: [
    "Hello! I'm here to help you with your study abroad journey. What would you like to know?",
    "Hi there! Welcome to CareerMasters. How can I assist you today?",
    "Greetings! I'm your study abroad assistant. What questions do you have?",
  ],
  countries: {
    singapore:
      "Singapore is an excellent choice! It offers world-class education, safety, and great career opportunities. Would you like to know about visa requirements, universities, or living costs?",
    dubai:
      "Dubai provides a unique blend of Eastern and Western education with tax-free living. Are you interested in specific programs, accommodation, or the application process?",
    mauritius:
      "Mauritius offers affordable quality education in a beautiful setting. Would you like information about universities, visa process, or living expenses?",
    uk: "The UK has prestigious universities and the Graduate Route visa for post-study work. What specific information do you need about studying in the UK?",
    europe:
      "Europe offers diverse educational opportunities with many English-taught programs. Which European country interests you most?",
  },
  services: {
    visa: "Our visa assistance service has a 98% success rate. We handle document preparation, application submission, and interview preparation. Would you like to schedule a consultation?",
    university:
      "We help you select the right university based on your academic profile and career goals. Our counselors have partnerships with top institutions worldwide.",
    accommodation:
      "We assist with both on-campus and off-campus housing options. Our team helps you find safe, comfortable, and affordable accommodation.",
    predeparture:
      "Our pre-departure support includes cultural orientation, packing guidance, travel arrangements, and practical tips for your destination country.",
    postarrival:
      "We provide airport pickup, local orientation, bank account setup, mobile connections, and ongoing support during your initial weeks abroad.",
  },
  general: [
    "That's a great question! For detailed information, I'd recommend speaking with one of our education consultants. Would you like to schedule a free consultation?",
    "I'd be happy to help you with that. Our expert team can provide personalized guidance. Shall I connect you with a counselor?",
    "For comprehensive information about that topic, our advisors can give you detailed insights. Would you like to book a consultation?",
  ],
  costs:
    "Study abroad costs vary by destination and program. Singapore and UK tend to be higher, while Mauritius and some European countries are more affordable. Would you like a detailed cost breakdown for a specific country?",
  scholarships:
    "Yes, we help students find and apply for various scholarships including merit-based, need-based, and country-specific scholarships. Each destination has different opportunities available.",
  timeline:
    "The application timeline typically takes 6-12 months. It's best to start planning at least 12 months before your intended start date. Would you like a personalized timeline for your target destination?",
  requirements:
    "Requirements vary by country and program level. Generally, you'll need academic transcripts, English proficiency scores, statement of purpose, and financial documents. Which country are you considering?",
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm the CareerMasters assistant. I can help you with information about studying abroad, our services, visa requirements, and more. What would you like to know?",
      isBot: true,
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Greetings
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)]
    }

    // Countries
    if (message.includes("singapore")) return botResponses.countries.singapore
    if (message.includes("dubai")) return botResponses.countries.dubai
    if (message.includes("mauritius")) return botResponses.countries.mauritius
    if (message.includes("uk") || message.includes("united kingdom") || message.includes("britain"))
      return botResponses.countries.uk
    if (message.includes("europe") || message.includes("germany") || message.includes("france"))
      return botResponses.countries.europe

    // Services
    if (message.includes("visa")) return botResponses.services.visa
    if (message.includes("university") || message.includes("college") || message.includes("admission"))
      return botResponses.services.university
    if (message.includes("accommodation") || message.includes("housing") || message.includes("stay"))
      return botResponses.services.accommodation
    if (message.includes("pre-departure") || message.includes("preparation")) return botResponses.services.predeparture
    if (message.includes("post-arrival") || message.includes("after arrival")) return botResponses.services.postarrival

    // Specific topics
    if (
      message.includes("cost") ||
      message.includes("fee") ||
      message.includes("expensive") ||
      message.includes("cheap")
    )
      return botResponses.costs
    if (message.includes("scholarship") || message.includes("funding") || message.includes("financial aid"))
      return botResponses.scholarships
    if (message.includes("timeline") || message.includes("when") || message.includes("how long"))
      return botResponses.timeline
    if (message.includes("requirement") || message.includes("document") || message.includes("eligibility"))
      return botResponses.requirements

    // IELTS/TOEFL
    if (message.includes("ielts") || message.includes("toefl") || message.includes("english test")) {
      return "Most countries require English proficiency tests. IELTS is widely accepted, with minimum scores typically ranging from 6.0-7.5 depending on the university and program. Would you like specific score requirements for your target destination?"
    }

    // Work opportunities
    if (message.includes("work") || message.includes("job") || message.includes("employment")) {
      return "Work opportunities vary by country. Most destinations allow part-time work during studies (16-20 hours/week) and offer post-study work visas. Which country's work policies interest you?"
    }

    // Application process
    if (message.includes("apply") || message.includes("application") || message.includes("process")) {
      return "Our application process is streamlined: 1) Free consultation 2) University selection 3) Document preparation 4) Application submission 5) Visa assistance 6) Pre-departure support. Would you like to start with a consultation?"
    }

    // Default responses
    return botResponses.general[Math.floor(Math.random() * botResponses.general.length)]
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      isBot: false,
    }

    setMessages([...messages, userMessage])
    const currentMessage = newMessage
    setNewMessage("")

    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(currentMessage)

      const botMessage = {
        id: messages.length + 2,
        text: botResponse,
        isBot: true,
      }

      setMessages((prevMessages) => [...prevMessages, botMessage])
    }, 1000)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 animate-pulse-slow"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-80 sm:w-96 rounded-lg bg-white shadow-xl animate-fade-slide-up">
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-blue-600 px-4 py-3 rounded-t-lg">
            <div className="flex items-center">
              <Bot className="mr-2 h-6 w-6 text-white" />
              <h3 className="text-lg font-medium text-white">CareerMasters Assistant</h3>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-gray-200" aria-label="Close chat">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div key={message.id} className={`mb-4 flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.isBot ? "bg-white text-gray-800 shadow" : "bg-blue-600 text-white"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="px-4 py-2 border-t bg-gray-50">
            <div className="flex flex-wrap gap-2 mb-2">
              <button
                onClick={() => setNewMessage("Tell me about Singapore")}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-200"
              >
                Singapore
              </button>
              <button
                onClick={() => setNewMessage("Visa requirements")}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-200"
              >
                Visa Help
              </button>
              <button
                onClick={() => setNewMessage("Study costs")}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full hover:bg-blue-200"
              >
                Costs
              </button>
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="flex items-center border-t p-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button type="submit" size="icon" className="ml-2 h-9 w-9 rounded-full bg-blue-600">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      )}
    </>
  )
}
