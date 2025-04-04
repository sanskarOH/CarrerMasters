"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
 
    window.open("https://wa.me/+918910281714", "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg p-4 h-14 w-14 flex items-center justify-center"
    >
      <MessageCircle size={24} />
      <span className="sr-only">Chat on WhatsApp</span>
    </Button>
  )
}

export default WhatsAppButton

