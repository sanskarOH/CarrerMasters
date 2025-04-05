"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone as PhoneIcon, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+65", // Default to Singapore
    phoneNumber: "",
    country: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Validate form before submission
    if (!formData.name || !formData.email || !formData.phoneNumber) {
      alert("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    const access_key = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
    if (!access_key) {
      console.error("Missing Web3Forms access key.");
      alert("Form submission is disabled. Please set the API key.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Using fetch with JSON body
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: access_key,
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phoneNumber}`,
          country: formData.country,
          message: formData.message,
        })
      });
  
      const result = await response.json();
      console.log("Form submission result:", result);
  
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ 
          name: "", 
          email: "", 
          countryCode: "+65", 
          phoneNumber: "", 
          country: "", 
          message: "" 
        });
  
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.error("Form submission failed:", result);
        alert(result.message || "Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit the form. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const countryCodes = [
    { code: "+93", country: "Afghanistan" },
    { code: "+355", country: "Albania" },
    { code: "+213", country: "Algeria" },
    { code: "+376", country: "Andorra" },
    { code: "+244", country: "Angola" },
    { code: "+1-268", country: "Antigua and Barbuda" },
    { code: "+54", country: "Argentina" },
    { code: "+374", country: "Armenia" },
    { code: "+61", country: "Australia" },
    { code: "+43", country: "Austria" },
    { code: "+994", country: "Azerbaijan" },
    { code: "+1-242", country: "Bahamas" },
    { code: "+973", country: "Bahrain" },
    { code: "+880", country: "Bangladesh" },
    { code: "+1-246", country: "Barbados" },
    { code: "+375", country: "Belarus" },
    { code: "+32", country: "Belgium" },
    { code: "+501", country: "Belize" },
    { code: "+229", country: "Benin" },
    { code: "+975", country: "Bhutan" },
    { code: "+591", country: "Bolivia" },
    { code: "+387", country: "Bosnia and Herzegovina" },
    { code: "+267", country: "Botswana" },
    { code: "+55", country: "Brazil" },
    { code: "+673", country: "Brunei" },
    { code: "+359", country: "Bulgaria" },
    { code: "+226", country: "Burkina Faso" },
    { code: "+257", country: "Burundi" },
    { code: "+855", country: "Cambodia" },
    { code: "+237", country: "Cameroon" },
    { code: "+1", country: "Canada" },
    { code: "+238", country: "Cape Verde" },
    { code: "+236", country: "Central African Republic" },
    { code: "+235", country: "Chad" },
    { code: "+56", country: "Chile" },
    { code: "+86", country: "China" },
    { code: "+57", country: "Colombia" },
    { code: "+269", country: "Comoros" },
    { code: "+243", country: "Congo, Democratic Republic of the" },
    { code: "+242", country: "Congo, Republic of the" },
    { code: "+506", country: "Costa Rica" },
    { code: "+225", country: "Cote d'Ivoire" },
    { code: "+385", country: "Croatia" },
    { code: "+53", country: "Cuba" },
    { code: "+357", country: "Cyprus" },
    { code: "+420", country: "Czech Republic" },
    { code: "+45", country: "Denmark" },
    { code: "+253", country: "Djibouti" },
    { code: "+1-767", country: "Dominica" },
    { code: "+1-809", country: "Dominican Republic" },
    { code: "+670", country: "East Timor" },
    { code: "+593", country: "Ecuador" },
    { code: "+20", country: "Egypt" },
    { code: "+503", country: "El Salvador" },
    { code: "+240", country: "Equatorial Guinea" },
    { code: "+291", country: "Eritrea" },
    { code: "+372", country: "Estonia" },
    { code: "+251", country: "Ethiopia" },
    { code: "+679", country: "Fiji" },
    { code: "+358", country: "Finland" },
    { code: "+33", country: "France" },
    { code: "+241", country: "Gabon" },
    { code: "+220", country: "Gambia" },
    { code: "+995", country: "Georgia" },
    { code: "+49", country: "Germany" },
    { code: "+233", country: "Ghana" },
    { code: "+30", country: "Greece" },
    { code: "+1-473", country: "Grenada" },
    { code: "+502", country: "Guatemala" },
    { code: "+224", country: "Guinea" },
    { code: "+245", country: "Guinea-Bissau" },
    { code: "+592", country: "Guyana" },
    { code: "+509", country: "Haiti" },
    { code: "+504", country: "Honduras" },
    { code: "+36", country: "Hungary" },
    { code: "+354", country: "Iceland" },
    { code: "+91", country: "India" },
    { code: "+62", country: "Indonesia" },
    { code: "+98", country: "Iran" },
    { code: "+964", country: "Iraq" },
    { code: "+353", country: "Ireland" },
    { code: "+972", country: "Israel" },
    { code: "+39", country: "Italy" },
    { code: "+1-876", country: "Jamaica" },
    { code: "+81", country: "Japan" },
    { code: "+962", country: "Jordan" },
    { code: "+7-7", country: "Kazakhstan" },
    { code: "+254", country: "Kenya" },
    { code: "+686", country: "Kiribati" },
    { code: "+850", country: "Korea, North" },
    { code: "+82", country: "Korea, South" },
    { code: "+965", country: "Kuwait" },
    { code: "+996", country: "Kyrgyzstan" },
    { code: "+856", country: "Laos" },
    { code: "+371", country: "Latvia" },
    { code: "+961", country: "Lebanon" },
    { code: "+266", country: "Lesotho" },
    { code: "+231", country: "Liberia" },
    { code: "+218", country: "Libya" },
    { code: "+423", country: "Liechtenstein" },
    { code: "+370", country: "Lithuania" },
    { code: "+352", country: "Luxembourg" },
    { code: "+389", country: "Macedonia" },
    { code: "+261", country: "Madagascar" },
    { code: "+265", country: "Malawi" },
    { code: "+60", country: "Malaysia" },
    { code: "+960", country: "Maldives" },
    { code: "+223", country: "Mali" },
    { code: "+356", country: "Malta" },
    { code: "+692", country: "Marshall Islands" },
    { code: "+222", country: "Mauritania" },
    { code: "+230", country: "Mauritius" },
    { code: "+52", country: "Mexico" },
    { code: "+691", country: "Micronesia" },
    { code: "+373", country: "Moldova" },
    { code: "+377", country: "Monaco" },
    { code: "+976", country: "Mongolia" },
    { code: "+382", country: "Montenegro" },
    { code: "+212", country: "Morocco" },
    { code: "+258", country: "Mozambique" },
    { code: "+95", country: "Myanmar" },
    { code: "+264", country: "Namibia" },
    { code: "+674", country: "Nauru" },
    { code: "+977", country: "Nepal" },
    { code: "+31", country: "Netherlands" },
    { code: "+64", country: "New Zealand" },
    { code: "+505", country: "Nicaragua" },
    { code: "+227", country: "Niger" },
    { code: "+234", country: "Nigeria" },
    { code: "+47", country: "Norway" },
    { code: "+968", country: "Oman" },
    { code: "+92", country: "Pakistan" },
    { code: "+680", country: "Palau" },
    { code: "+507", country: "Panama" },
    { code: "+675", country: "Papua New Guinea" },
    { code: "+595", country: "Paraguay" },
    { code: "+51", country: "Peru" },
    { code: "+63", country: "Philippines" },
    { code: "+48", country: "Poland" },
    { code: "+351", country: "Portugal" },
    { code: "+974", country: "Qatar" },
    { code: "+40", country: "Romania" },
    { code: "+7", country: "Russia" },
    { code: "+250", country: "Rwanda" },
    { code: "+1-869", country: "Saint Kitts and Nevis" },
    { code: "+1-758", country: "Saint Lucia" },
    { code: "+1-784", country: "Saint Vincent and the Grenadines" },
    { code: "+685", country: "Samoa" },
    { code: "+378", country: "San Marino" },
    { code: "+239", country: "Sao Tome and Principe" },
    { code: "+966", country: "Saudi Arabia" },
    { code: "+221", country: "Senegal" },
    { code: "+381", country: "Serbia" },
    { code: "+248", country: "Seychelles" },
    { code: "+232", country: "Sierra Leone" },
    { code: "+65", country: "Singapore" },
    { code: "+421", country: "Slovakia" },
    { code: "+386", country: "Slovenia" },
    { code: "+677", country: "Solomon Islands" },
    { code: "+252", country: "Somalia" },
    { code: "+27", country: "South Africa" },
    { code: "+211", country: "South Sudan" },
    { code: "+34", country: "Spain" },
    { code: "+94", country: "Sri Lanka" },
    { code: "+249", country: "Sudan" },
    { code: "+597", country: "Suriname" },
    { code: "+268", country: "Swaziland" },
    { code: "+46", country: "Sweden" },
    { code: "+41", country: "Switzerland" },
    { code: "+963", country: "Syria" },
    { code: "+886", country: "Taiwan" },
    { code: "+992", country: "Tajikistan" },
    { code: "+255", country: "Tanzania" },
    { code: "+66", country: "Thailand" },
    { code: "+228", country: "Togo" },
    { code: "+676", country: "Tonga" },
    { code: "+1-868", country: "Trinidad and Tobago" },
    { code: "+216", country: "Tunisia" },
    { code: "+90", country: "Turkey" },
    { code: "+993", country: "Turkmenistan" },
    { code: "+688", country: "Tuvalu" },
    { code: "+256", country: "Uganda" },
    { code: "+380", country: "Ukraine" },
    { code: "+971", country: "United Arab Emirates" },
    { code: "+44", country: "United Kingdom" },
    { code: "+1", country: "United States" },
    { code: "+598", country: "Uruguay" },
    { code: "+998", country: "Uzbekistan" },
    { code: "+678", country: "Vanuatu" },
    { code: "+379", country: "Vatican City" },
    { code: "+58", country: "Venezuela" },
    { code: "+84", country: "Vietnam" },
    { code: "+967", country: "Yemen" },
    { code: "+260", country: "Zambia" },
    { code: "+263", country: "Zimbabwe" }
  ];
  
  // List of all countries for the country dropdown
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
    "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
    "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon",
    "Canada", "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", 
    "Congo, Democratic Republic of the", "Congo, Republic of the", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea",
    "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
    "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
    "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Madagascar", "Malawi", "Malaysia",
    "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
    "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay",
    "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
    "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia",
    "Zimbabwe"
  ];

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
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="flex space-x-2">
                        <div className="w-1/3">
                          <Select 
                            value={formData.countryCode} 
                            onValueChange={(value) => handleSelectChange("countryCode", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Code" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[300px]">
                              {countryCodes.map(({ code, country }) => (
                                <SelectItem key={`${code}-${country}`} value={`${code}-${country}`}>
                                {code} ({country})
                              </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-2/3">
                          <Input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Phone number"
                            required
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Country of Interest
                      </label>
                      <Select 
                        value={formData.country} 
                        onValueChange={(value) => handleSelectChange("country", value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a country" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          {countries.map((country) => (
                            <SelectItem key={country} value={country.toLowerCase()}>
                              {country}
                            </SelectItem>
                          ))}
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
                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isSubmitting}>
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
                  <CardContent className="p-5">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 dark:bg-blue-red p-1 rounded-full mr-4 flex-shrink-0">
                        <Mail className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Email Us</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm truncate">
                          connect@careermasters.sg
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-start">
                      <div className="bg-yellow-100 dark:bg-red-900 p-3 rounded-full mr-4">
                        <PhoneIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">Call Us</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">+91 89102 81714</p>
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
                    address: "119 Potong pasir , Ave 1, Singapore 350119",
                    hours: "Mon-Fri: 9:00 AM - 6:00 PM",
                  },
                  {
                    country: "India",
                    address: "6E Elgin Road, Near Bhawanipur College, Kolkata, West Bengal - 700020",
                    hours: "Mon-Fri: 09:00 AM - 6:00 PM"
                  }
                  
                ].map((office) => (
                  <Card key={office.country}>
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="bg-yellow-100 dark:bg-red-900 p-3 rounded-full mr-4">
                          <MapPin className="h-6 w-6 text-red-600 dark:text-yellow-400" />
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
      </div>
    </div>
  )
}