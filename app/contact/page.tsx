"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";

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
  className?: string;
}

const Select: React.FC<SelectProps> = ({ children, value, onValueChange, className }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white ${className || ''}`}
    >
      {children}
    </select>
  </div>
);

const SelectTrigger: React.FC<{ children: React.ReactNode; id?: string }> = ({ children }) => <>{children}</>;
const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => <option value="">{placeholder}</option>;
const SelectContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;
const SelectItem: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => <option value={value}>{children}</option>;

// Global hCaptcha interface
declare global {
  interface Window {
    hcaptcha: {
      render: (container: string | HTMLElement, options: any) => string;
      getResponse: (widgetId?: string) => string;
      reset: (widgetId?: string) => void;
      execute: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onHcaptchaLoad: () => void;
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
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hcaptchaLoaded, setHcaptchaLoaded] = useState(false);
  const [hcaptchaWidgetId, setHcaptchaWidgetId] = useState<string>("");
  const [hcaptchaRendered, setHcaptchaRendered] = useState(false);

  useEffect(() => {
    // Define callback for when hCaptcha loads
    window.onHcaptchaLoad = () => {
      setHcaptchaLoaded(true);
    };

    // Check if hCaptcha script is already loaded
    if (window.hcaptcha) {
      setHcaptchaLoaded(true);
      return;
    }

    // Load hCaptcha script
    const script = document.createElement("script");
    script.src = "https://js.hcaptcha.com/1/api.js?onload=onHcaptchaLoad&render=explicit";
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      console.error("Failed to load hCaptcha script");
    };
    
    document.head.appendChild(script);

    return () => {
      // Clean up
      try {
        if (hcaptchaWidgetId && window.hcaptcha) {
          window.hcaptcha.remove(hcaptchaWidgetId);
        }
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      } catch (error) {
        console.error("Error cleaning up hCaptcha:", error);
      }
      delete window.onHcaptchaLoad;
    };
  }, []);

  // Separate effect for rendering hCaptcha to avoid multiple renders
  useEffect(() => {
    if (hcaptchaLoaded && !hcaptchaRendered) {
      renderHCaptcha();
    }
  }, [hcaptchaLoaded, hcaptchaRendered]);

  const renderHCaptcha = () => {
    // Use Web3Forms' hCaptcha site key for free plans
    const siteKey = "50b2fe65-b00b-4b9e-ad62-3ba471098be2";
    
    if (window.hcaptcha && siteKey) {
      try {
        const container = document.getElementById("hcaptcha-container");
        if (container && !hcaptchaRendered) {
          // Clear any existing content
          container.innerHTML = '';
          
          const widgetId = window.hcaptcha.render(container, {
            sitekey: siteKey,
            theme: "light",
            size: "normal",
            callback: (token: string) => {
              console.log("hCaptcha completed:", token);
            },
            "error-callback": (error: any) => {
              console.error("hCaptcha error:", error);
            }
          });
          
          setHcaptchaWidgetId(widgetId);
          setHcaptchaRendered(true);
        }
      } catch (error) {
        console.error("Error rendering hCaptcha:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormState({
      name: "",
      email: "",
      phone: "",
      countryCode: "+91",
      country: "",
      studyLevel: "",
      startDate: "",
      message: "",
    });
    
    // Reset hCaptcha
    if (window.hcaptcha && hcaptchaWidgetId) {
      try {
        window.hcaptcha.reset(hcaptchaWidgetId);
      } catch (error) {
        console.error("Error resetting hCaptcha:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formState.name || !formState.email || !formState.phone || !formState.message) {
        alert("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Get hCaptcha response (but don't require it for first submission)
      let hcaptchaResponse = "";
      if (window.hcaptcha && hcaptchaWidgetId) {
        try {
          hcaptchaResponse = window.hcaptcha.getResponse(hcaptchaWidgetId);
          console.log("hCaptcha response:", hcaptchaResponse);
        } catch (error) {
          console.error("Error getting hCaptcha response:", error);
        }
        
        // Only require hCaptcha if we have a response, otherwise let it pass for activation
        if (hcaptchaRendered && !hcaptchaResponse) {
          // For now, let's make hCaptcha optional to allow activation
          console.log("hCaptcha not completed, but proceeding for potential activation");
        }
      }

      // Prepare form data for Web3Forms with proper hCaptcha integration
      const formData = new FormData();
      formData.append('access_key', process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '');
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('phone', `${formState.countryCode} ${formState.phone}`);
      formData.append('country', formState.country || 'Not specified');
      formData.append('study_level', formState.studyLevel || 'Not specified');
      formData.append('start_date', formState.startDate || 'Not specified');
      formData.append('message', formState.message);
      
      // Add hCaptcha response only if available (optional for now)
      if (hcaptchaResponse) {
        formData.append('h-captcha-response', hcaptchaResponse);
        console.log('Including hCaptcha response in submission');
      } else {
        console.log('No hCaptcha response - submitting without it');
      }
      
      // Add additional info
      formData.append('subject', 'New Contact Form Submission - CareerMasters');
      formData.append('from_name', 'CareerMasters Contact Form');
      
      // Important: Don't add redirect=false as it might interfere with hCaptcha validation

      console.log('Submitting form...');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('Web3Forms response:', result);

      if (result.success) {
        setSubmitted(true);
        resetForm();
      } else {
        console.error('Web3Forms error:', result);
        
        // Handle specific hCaptcha errors
        if (result.message && result.message.includes('hCaptcha')) {
          // If it's the first submission, hCaptcha might not be activated yet
          if (result.message.includes('validate')) {
            alert("hCaptcha is being activated for your form. Please try submitting again.");
          } else {
            alert("Captcha validation failed. Please complete the captcha and try again.");
          }
          
          // Reset hCaptcha
          if (window.hcaptcha && hcaptchaWidgetId) {
            try {
              window.hcaptcha.reset(hcaptchaWidgetId);
            } catch (error) {
              console.error("Error resetting hCaptcha:", error);
            }
          }
        } else {
          throw new Error(result.message || 'Form submission failed');
        }
      }

    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
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
      <section className="py-16 bg-gray-50">
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
                      <p className="text-gray-600">119 Potong pasir, Ave 1, Singapore 350119</p>
                      <p className="text-gray-600">6E Elgin Road, Near Bhawanipur College, Kolkata, West Bengal-700020, India</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">Call Us</h3>
                      <p className="text-gray-600">Harry: +91 89102 81714</p>
                      <p className="text-gray-600">Mohit: +65 8686 4148</p>
                      <p className="text-gray-600">Gaurav: +65 9181 5275</p>
                      <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="rounded-full bg-blue-100 p-3 mr-4">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 text-gray-900">Email Us</h3>
                      <p className="text-gray-600">connect@careermasters.sg</p>
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
                    <a
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
                    </a>
                    <a
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
                    </a>
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
                    <Button onClick={() => setSubmitted(false)} className="bg-blue-600 hover:bg-blue-700 text-white">
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
                              className="rounded-l-md border-l border-t border-b border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[90px]"
                              value={formState.countryCode}
                              onChange={(e) => handleSelectChange("countryCode", e.target.value)}
                            >
                              <option value="+355">🇦🇱 +355</option>
                              <option value="+213">🇩🇿 +213</option>
                              <option value="+1684">🇦🇸 +1684</option>
                              <option value="+376">🇦🇩 +376</option>
                              <option value="+244">🇦🇴 +244</option>
                              <option value="+1264">🇦🇮 +1264</option>
                              <option value="+672">🇦🇶 +672</option>
                              <option value="+1268">🇦🇬 +1268</option>
                              <option value="+54">🇦🇷 +54</option>
                              <option value="+374">🇦🇲 +374</option>
                              <option value="+297">🇦🇼 +297</option>
                              <option value="+61">🇦🇺 +61</option>
                              <option value="+43">🇦🇹 +43</option>
                              <option value="+994">🇦🇿 +994</option>
                              <option value="+1242">🇧🇸 +1242</option>
                              <option value="+973">🇧🇭 +973</option>
                              <option value="+880">🇧🇩 +880</option>
                              <option value="+1246">🇧🇧 +1246</option>
                              <option value="+375">🇧🇾 +375</option>
                              <option value="+32">🇧🇪 +32</option>
                              <option value="+501">🇧🇿 +501</option>
                              <option value="+229">🇧🇯 +229</option>
                              <option value="+1441">🇧🇲 +1441</option>
                              <option value="+975">🇧🇹 +975</option>
                              <option value="+591">🇧🇴 +591</option>
                              <option value="+387">🇧🇦 +387</option>
                              <option value="+267">🇧🇼 +267</option>
                              <option value="+55">🇧🇷 +55</option>
                              <option value="+246">🇮🇴 +246</option>
                              <option value="+673">🇧🇳 +673</option>
                              <option value="+359">🇧🇬 +359</option>
                              <option value="+226">🇧🇫 +226</option>
                              <option value="+257">🇧🇮 +257</option>
                              <option value="+855">🇰🇭 +855</option>
                              <option value="+237">🇨🇲 +237</option>
                              <option value="+1">🇨🇦 +1</option>
                              <option value="+238">🇨🇻 +238</option>
                              <option value="+1345">🇰🇾 +1345</option>
                              <option value="+236">🇨🇫 +236</option>
                              <option value="+235">🇹🇩 +235</option>
                              <option value="+56">🇨🇱 +56</option>
                              <option value="+86">🇨🇳 +86</option>
                              <option value="+61">🇨🇽 +61</option>
                              <option value="+61">🇨🇨 +61</option>
                              <option value="+57">🇨🇴 +57</option>
                              <option value="+269">🇰🇲 +269</option>
                              <option value="+242">🇨🇬 +242</option>
                              <option value="+243">🇨🇩 +243</option>
                              <option value="+682">🇨🇰 +682</option>
                              <option value="+506">🇨🇷 +506</option>
                              <option value="+225">🇨🇮 +225</option>
                              <option value="+385">🇭🇷 +385</option>
                              <option value="+53">🇨🇺 +53</option>
                              <option value="+599">🇨🇼 +599</option>
                              <option value="+357">🇨🇾 +357</option>
                              <option value="+420">🇨🇿 +420</option>
                              <option value="+45">🇩🇰 +45</option>
                              <option value="+253">🇩🇯 +253</option>
                              <option value="+1767">🇩🇲 +1767</option>
                              <option value="+1809">🇩🇴 +1809</option>
                              <option value="+593">🇪🇨 +593</option>
                              <option value="+20">🇪🇬 +20</option>
                              <option value="+503">🇸🇻 +503</option>
                              <option value="+240">🇬🇶 +240</option>
                              <option value="+291">🇪🇷 +291</option>
                              <option value="+372">🇪🇪 +372</option>
                              <option value="+268">🇸🇿 +268</option>
                              <option value="+251">🇪🇹 +251</option>
                              <option value="+500">🇫🇰 +500</option>
                              <option value="+298">🇫🇴 +298</option>
                              <option value="+679">🇫🇯 +679</option>
                              <option value="+358">🇫🇮 +358</option>
                              <option value="+33">🇫🇷 +33</option>
                              <option value="+594">🇬🇫 +594</option>
                              <option value="+689">🇵🇫 +689</option>
                              <option value="+241">🇬🇦 +241</option>
                              <option value="+220">🇬🇲 +220</option>
                              <option value="+995">🇬🇪 +995</option>
                              <option value="+49">🇩🇪 +49</option>
                              <option value="+233">🇬🇭 +233</option>
                              <option value="+350">🇬🇮 +350</option>
                              <option value="+30">🇬🇷 +30</option>
                              <option value="+299">🇬🇱 +299</option>
                              <option value="+1473">🇬🇩 +1473</option>
                              <option value="+590">🇬🇵 +590</option>
                              <option value="+1671">🇬🇺 +1671</option>
                              <option value="+502">🇬🇹 +502</option>
                              <option value="+44">🇬🇬 +44</option>
                              <option value="+224">🇬🇳 +224</option>
                              <option value="+245">🇬🇼 +245</option>
                              <option value="+592">🇬🇾 +592</option>
                              <option value="+509">🇭🇹 +509</option>
                              <option value="+504">🇭🇳 +504</option>
                              <option value="+852">🇭🇰 +852</option>
                              <option value="+36">🇭🇺 +36</option>
                              <option value="+354">🇮🇸 +354</option>
                              <option value="+91">🇮🇳 +91</option>
                              <option value="+62">🇮🇩 +62</option>
                              <option value="+98">🇮🇷 +98</option>
                              <option value="+964">🇮🇶 +964</option>
                              <option value="+353">🇮🇪 +353</option>
                              <option value="+44">🇮🇲 +44</option>
                              <option value="+972">🇮🇱 +972</option>
                              <option value="+39">🇮🇹 +39</option>
                              <option value="+1876">🇯🇲 +1876</option>
                              <option value="+81">🇯🇵 +81</option>
                              <option value="+44">🇯🇪 +44</option>
                              <option value="+962">🇯🇴 +962</option>
                              <option value="+7">🇰🇿 +7</option>
                              <option value="+254">🇰🇪 +254</option>
                              <option value="+686">🇰🇮 +686</option>
                              <option value="+850">🇰🇵 +850</option>
                              <option value="+82">🇰🇷 +82</option>
                              <option value="+965">🇰🇼 +965</option>
                              <option value="+996">🇰🇬 +996</option>
                              <option value="+856">🇱🇦 +856</option>
                              <option value="+371">🇱🇻 +371</option>
                              <option value="+961">🇱🇧 +961</option>
                              <option value="+266">🇱🇸 +266</option>
                              <option value="+231">🇱🇷 +231</option>
                              <option value="+218">🇱🇾 +218</option>
                              <option value="+423">🇱🇮 +423</option>
                              <option value="+370">🇱🇹 +370</option>
                              <option value="+352">🇱🇺 +352</option>
                              <option value="+853">🇲🇴 +853</option>
                              <option value="+389">🇲🇰 +389</option>
                              <option value="+261">🇲🇬 +261</option>
                              <option value="+265">🇲🇼 +265</option>
                              <option value="+60">🇲🇾 +60</option>
                              <option value="+960">🇲🇻 +960</option>
                              <option value="+223">🇲🇱 +223</option>
                              <option value="+356">🇲🇹 +356</option>
                              <option value="+692">🇲🇭 +692</option>
                              <option value="+596">🇲🇶 +596</option>
                              <option value="+222">🇲🇷 +222</option>
                              <option value="+230">🇲🇺 +230</option>
                              <option value="+262">🇾🇹 +262</option>
                              <option value="+52">🇲🇽 +52</option>
                              <option value="+691">🇫🇲 +691</option>
                              <option value="+373">🇲🇩 +373</option>
                              <option value="+377">🇲🇨 +377</option>
                              <option value="+976">🇲🇳 +976</option>
                              <option value="+382">🇲🇪 +382</option>
                              <option value="+1664">🇲🇸 +1664</option>
                              <option value="+212">🇲🇦 +212</option>
                              <option value="+258">🇲🇿 +258</option>
                              <option value="+95">🇲🇲 +95</option>
                              <option value="+264">🇳🇦 +264</option>
                              <option value="+674">🇳🇷 +674</option>
                              <option value="+977">🇳🇵 +977</option>
                              <option value="+31">🇳🇱 +31</option>
                              <option value="+687">🇳🇨 +687</option>
                              <option value="+64">🇳🇿 +64</option>
                              <option value="+505">🇳🇮 +505</option>
                              <option value="+227">🇳🇪 +227</option>
                              <option value="+234">🇳🇬 +234</option>
                              <option value="+683">🇳🇺 +683</option>
                              <option value="+672">🇳🇫 +672</option>
                              <option value="+1670">🇲🇵 +1670</option>
                              <option value="+47">🇳🇴 +47</option>
                              <option value="+968">🇴🇲 +968</option>
                              <option value="+92">🇵🇰 +92</option>
                              <option value="+680">🇵🇼 +680</option>
                              <option value="+970">🇵🇸 +970</option>
                              <option value="+507">🇵🇦 +507</option>
                              <option value="+675">🇵🇬 +675</option>
                              <option value="+595">🇵🇾 +595</option>
                              <option value="+51">🇵🇪 +51</option>
                              <option value="+63">🇵🇭 +63</option>
                              <option value="+48">🇵🇱 +48</option>
                              <option value="+351">🇵🇹 +351</option>
                              <option value="+1787">🇵🇷 +1787</option>
                              <option value="+974">🇶🇦 +974</option>
                              <option value="+262">🇷🇪 +262</option>
                              <option value="+40">🇷🇴 +40</option>
                              <option value="+7">🇷🇺 +7</option>
                              <option value="+250">🇷🇼 +250</option>
                              <option value="+590">🇧🇱 +590</option>
                              <option value="+290">🇸🇭 +290</option>
                              <option value="+1869">🇰🇳 +1869</option>
                              <option value="+1758">🇱🇨 +1758</option>
                              <option value="+590">🇲🇫 +590</option>
                              <option value="+508">🇵🇲 +508</option>
                              <option value="+1784">🇻🇨 +1784</option>
                              <option value="+685">🇼🇸 +685</option>
                              <option value="+378">🇸🇲 +378</option>
                              <option value="+239">🇸🇹 +239</option>
                              <option value="+966">🇸🇦 +966</option>
                              <option value="+221">🇸🇳 +221</option>
                              <option value="+381">🇷🇸 +381</option>
                              <option value="+248">🇸🇨 +248</option>
                              <option value="+232">🇸🇱 +232</option>
                              <option value="+65">🇸🇬 +65</option>
                              <option value="+1721">🇸🇽 +1721</option>
                              <option value="+421">🇸🇰 +421</option>
                              <option value="+386">🇸🇮 +386</option>
                              <option value="+677">🇸🇧 +677</option>
                              <option value="+252">🇸🇴 +252</option>
                              <option value="+27">🇿🇦 +27</option>
                              <option value="+500">🇬🇸 +500</option>
                              <option value="+211">🇸🇸 +211</option>
                              <option value="+34">🇪🇸 +34</option>
                              <option value="+94">🇱🇰 +94</option>
                              <option value="+249">🇸🇩 +249</option>
                              <option value="+597">🇸🇷 +597</option>
                              <option value="+47">🇸🇯 +47</option>
                              <option value="+46">🇸🇪 +46</option>
                              <option value="+41">🇨🇭 +41</option>
                              <option value="+963">🇸🇾 +963</option>
                              <option value="+886">🇹🇼 +886</option>
                              <option value="+992">🇹🇯 +992</option>
                              <option value="+255">🇹🇿 +255</option>
                              <option value="+66">🇹🇭 +66</option>
                              <option value="+670">🇹🇱 +670</option>
                              <option value="+228">🇹🇬 +228</option>
                              <option value="+690">🇹🇰 +690</option>
                              <option value="+676">🇹🇴 +676</option>
                              <option value="+1868">🇹🇹 +1868</option>
                              <option value="+216">🇹🇳 +216</option>
                              <option value="+90">🇹🇷 +90</option>
                              <option value="+993">🇹🇲 +993</option>
                              <option value="+1649">🇹🇨 +1649</option>
                              <option value="+688">🇹🇻 +688</option>
                              <option value="+256">🇺🇬 +256</option>
                              <option value="+380">🇺🇦 +380</option>
                              <option value="+971">🇦🇪 +971</option>
                              <option value="+44">🇬🇧 +44</option>
                              <option value="+1">🇺🇸 +1</option>
                              <option value="+598">🇺🇾 +598</option>
                              <option value="+998">🇺🇿 +998</option>
                              <option value="+678">🇻🇺 +678</option>
                              <option value="+39">🇻🇦 +39</option>
                              <option value="+58">🇻🇪 +58</option>
                              <option value="+84">🇻🇳 +84</option>
                              <option value="+1284">🇻🇬 +1284</option>
                              <option value="+1340">🇻🇮 +1340</option>
                              <option value="+681">🇼🇫 +681</option>
                              <option value="+212">🇪🇭 +212</option>
                              <option value="+967">🇾🇪 +967</option>
                              <option value="+260">🇿🇲 +260</option>
                              <option value="+263">🇿🇼 +263</option>
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
                            <SelectValue placeholder="Select a country" />
                            <SelectItem value="singapore">Singapore</SelectItem>
                            <SelectItem value="dubai">Dubai</SelectItem>
                            <SelectItem value="mauritius">Mauritius</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="europe">Europe</SelectItem>
                            <SelectItem value="not-sure">Not Sure Yet</SelectItem>
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
                            <SelectValue placeholder="Select study level" />
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="postgraduate">Postgraduate</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
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
                            <SelectValue placeholder="Select start date" />
                            <SelectItem value="asap">As Soon As Possible</SelectItem>
                            <SelectItem value="3months">Within 3 Months</SelectItem>
                            <SelectItem value="6months">Within 6 Months</SelectItem>
                            <SelectItem value="nextyear">Next Year</SelectItem>
                            <SelectItem value="exploring">Just Exploring Options</SelectItem>
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
                        <div id="hcaptcha-container" className="flex justify-center"></div>
                        {!hcaptchaLoaded && (
                          <div className="text-center text-gray-500 text-sm">Loading captcha...</div>
                        )}
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                        disabled={isSubmitting || !hcaptchaLoaded}
                      >
                        {isSubmitting ? "Sending..." : "Book a Free Consultation"}
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
  );
}