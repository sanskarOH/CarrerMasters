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

  useEffect(() => {
    // Define callback for when hCaptcha loads
    window.onHcaptchaLoad = () => {
      setHcaptchaLoaded(true);
      renderHCaptcha();
    };

    // Check if hCaptcha script is already loaded
    if (window.hcaptcha) {
      setHcaptchaLoaded(true);
      renderHCaptcha();
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
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      } catch (error) {
        console.error("Error removing hCaptcha script:", error);
      }
      delete window.onHcaptchaLoad;
    };
  }, []);

  const renderHCaptcha = () => {
    // Use a test site key - replace with your actual site key
    const siteKey = "10000000-ffff-ffff-ffff-000000000001"; // This is hCaptcha's test key
    
    if (window.hcaptcha && siteKey) {
      try {
        const container = document.getElementById("hcaptcha-container");
        if (container && !hcaptchaWidgetId) {
          const widgetId = window.hcaptcha.render(container, {
            sitekey: siteKey,
            theme: "light",
            size: "normal",
          });
          setHcaptchaWidgetId(widgetId);
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

      // Get hCaptcha response
      let hcaptchaResponse = "";
      if (window.hcaptcha) {
        hcaptchaResponse = window.hcaptcha.getResponse(hcaptchaWidgetId);
        if (!hcaptchaResponse) {
          alert("Please complete the captcha verification");
          setIsSubmitting(false);
          return;
        }
      }

      // For demo purposes, we'll just simulate success
      // Replace this with your actual form submission logic
      setTimeout(() => {
        setSubmitted(true);
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
        });
        // Reset hCaptcha
        if (window.hcaptcha && hcaptchaWidgetId) {
          window.hcaptcha.reset(hcaptchaWidgetId);
        }
        setIsSubmitting(false);
      }, 2000);

    } catch (error) {
      console.error("Form submission error:", error);
      alert("There was an error submitting the form. Please try again.");
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
                    <div onSubmit={handleSubmit}>
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

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 min-w-[80px]">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 ">
                            Phone Number *
                          </label>
                          <div className="flex">
                            <select
                              className="rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[90px]"
                              value={formState.countryCode}
                              onChange={(e) => handleSelectChange("countryCode", e.target.value)}
                            >
                              <option value="+355">🇦🇱 Albania +355</option>
            <option value="+213">+213 🇩🇿 Algeria</option>
<option value="+1684">+1684 🇦🇸 American Samoa</option>
<option value="+376">+376 🇦🇩 Andorra</option>
<option value="+244">+244 🇦🇴 Angola</option>
<option value="+1264">+1264 🇦🇮 Anguilla</option>
<option value="+672">+672 🇦🇶 Antarctica</option>
<option value="+1268">+1268 🇦🇬 Antigua and Barbuda</option>
<option value="+54">+54 🇦🇷 Argentina</option>
<option value="+374">+374 🇦🇲 Armenia</option>
<option value="+297">+297 🇦🇼 Aruba</option>
<option value="+61">+61 🇦🇺 Australia</option>
<option value="+43">+43 🇦🇹 Austria</option>
<option value="+994">+994 🇦🇿 Azerbaijan</option>
<option value="+1242">+1242 🇧🇸 Bahamas</option>
<option value="+973">+973 🇧🇭 Bahrain</option>
<option value="+880">+880 🇧🇩 Bangladesh</option>
<option value="+1246">+1246 🇧🇧 Barbados</option>
<option value="+375">+375 🇧🇾 Belarus</option>
<option value="+32">+32 🇧🇪 Belgium</option>
<option value="+501">+501 🇧🇿 Belize</option>
<option value="+229">+229 🇧🇯 Benin</option>
<option value="+1441">+1441 🇧🇲 Bermuda</option>
<option value="+975">+975 🇧🇹 Bhutan</option>
<option value="+591">+591 🇧🇴 Bolivia</option>
<option value="+387">+387 🇧🇦 Bosnia and Herzegovina</option>
<option value="+267">+267 🇧🇼 Botswana</option>
<option value="+55">+55 🇧🇷 Brazil</option>
<option value="+246">+246 🇮🇴 British Indian Ocean Territory</option>
<option value="+673">+673 🇧🇳 Brunei</option>
<option value="+359">+359 🇧🇬 Bulgaria</option>
<option value="+226">+226 🇧🇫 Burkina Faso</option>
<option value="+257">+257 🇧🇮 Burundi</option>
<option value="+855">+855 🇰🇭 Cambodia</option>
<option value="+237">+237 🇨🇲 Cameroon</option>
<option value="+1">+1 🇨🇦 Canada</option>
<option value="+238">+238 🇨🇻 Cape Verde</option>
<option value="+1345">+1345 🇰🇾 Cayman Islands</option>
<option value="+236">+236 🇨🇫 Central African Republic</option>
<option value="+235">+235 🇹🇩 Chad</option>
<option value="+56">+56 🇨🇱 Chile</option>
<option value="+86">+86 🇨🇳 China</option>
<option value="+61">+61 🇨🇽 Christmas Island</option>
<option value="+61">+61 🇨🇨 Cocos Islands</option>
<option value="+57">+57 🇨🇴 Colombia</option>
<option value="+269">+269 🇰🇲 Comoros</option>
<option value="+242">+242 🇨🇬 Congo</option>
<option value="+243">+243 🇨🇩 Congo (DRC)</option>
<option value="+682">+682 🇨🇰 Cook Islands</option>
<option value="+506">+506 🇨🇷 Costa Rica</option>
<option value="+225">+225 🇨🇮 Côte d'Ivoire</option>
<option value="+385">+385 🇭🇷 Croatia</option>
<option value="+53">+53 🇨🇺 Cuba</option>
<option value="+599">+599 🇨🇼 Curaçao</option>
<option value="+357">+357 🇨🇾 Cyprus</option>
<option value="+420">+420 🇨🇿 Czech Republic</option>
<option value="+45">+45 🇩🇰 Denmark</option>
<option value="+253">+253 🇩🇯 Djibouti</option>
<option value="+1767">+1767 🇩🇲 Dominica</option>
<option value="+1809">+1809 🇩🇴 Dominican Republic</option>
<option value="+593">+593 🇪🇨 Ecuador</option>
<option value="+20">+20 🇪🇬 Egypt</option>
<option value="+503">+503 🇸🇻 El Salvador</option>
<option value="+240">+240 🇬🇶 Equatorial Guinea</option>
<option value="+291">+291 🇪🇷 Eritrea</option>
<option value="+372">+372 🇪🇪 Estonia</option>
<option value="+268">+268 🇸🇿 Eswatini</option>
<option value="+251">+251 🇪🇹 Ethiopia</option>
<option value="+500">+500 🇫🇰 Falkland Islands</option>
<option value="+298">+298 🇫🇴 Faroe Islands</option>
<option value="+679">+679 🇫🇯 Fiji</option>
<option value="+358">+358 🇫🇮 Finland</option>
<option value="+33">+33 🇫🇷 France</option>
<option value="+594">+594 🇬🇫 French Guiana</option>
<option value="+689">+689 🇵🇫 French Polynesia</option>
<option value="+241">+241 🇬🇦 Gabon</option>
<option value="+220">+220 🇬🇲 Gambia</option>
<option value="+995">+995 🇬🇪 Georgia</option>
<option value="+49">+49 🇩🇪 Germany</option>
<option value="+233">+233 🇬🇭 Ghana</option>
<option value="+350">+350 🇬🇮 Gibraltar</option>
<option value="+30">+30 🇬🇷 Greece</option>
<option value="+299">+299 🇬🇱 Greenland</option>
<option value="+1473">+1473 🇬🇩 Grenada</option>
<option value="+590">+590 🇬🇵 Guadeloupe</option>
<option value="+1671">+1671 🇬🇺 Guam</option>
<option value="+502">+502 🇬🇹 Guatemala</option>
<option value="+44">+44 🇬🇬 Guernsey</option>
<option value="+224">+224 🇬🇳 Guinea</option>
<option value="+245">+245 🇬🇼 Guinea-Bissau</option>
<option value="+592">+592 🇬🇾 Guyana</option>
<option value="+509">+509 🇭🇹 Haiti</option>
<option value="+504">+504 🇭🇳 Honduras</option>
<option value="+852">+852 🇭🇰 Hong Kong</option>
<option value="+36">+36 🇭🇺 Hungary</option>
<option value="+354">+354 🇮🇸 Iceland</option>
<option value="+91">+91 🇮🇳 India</option>
<option value="+62">+62 🇮🇩 Indonesia</option>
<option value="+98">+98 🇮🇷 Iran</option>
<option value="+964">+964 🇮🇶 Iraq</option>
<option value="+353">+353 🇮🇪 Ireland</option>
<option value="+44">+44 🇮🇲 Isle of Man</option>
<option value="+972">+972 🇮🇱 Israel</option>
<option value="+39">+39 🇮🇹 Italy</option>
<option value="+1876">+1876 🇯🇲 Jamaica</option>
<option value="+81">+81 🇯🇵 Japan</option>
<option value="+44">+44 🇯🇪 Jersey</option>
<option value="+962">+962 🇯🇴 Jordan</option>
<option value="+7">+7 🇰🇿 Kazakhstan</option>
<option value="+254">+254 🇰🇪 Kenya</option>
<option value="+686">+686 🇰🇮 Kiribati</option>
<option value="+850">+850 🇰🇵 North Korea</option>
<option value="+82">+82 🇰🇷 South Korea</option>
<option value="+965">+965 🇰🇼 Kuwait</option>
<option value="+996">+996 🇰🇬 Kyrgyzstan</option>
<option value="+856">+856 🇱🇦 Laos</option>
<option value="+371">+371 🇱🇻 Latvia</option>
<option value="+961">+961 🇱🇧 Lebanon</option>
<option value="+266">+266 🇱🇸 Lesotho</option>
<option value="+231">+231 🇱🇷 Liberia</option>
<option value="+218">+218 🇱🇾 Libya</option>
<option value="+423">+423 🇱🇮 Liechtenstein</option>
<option value="+370">+370 🇱🇹 Lithuania</option>
<option value="+352">+352 🇱🇺 Luxembourg</option>
<option value="+853">+853 🇲🇴 Macao</option>
<option value="+389">+389 🇲🇰 North Macedonia</option>
<option value="+261">+261 🇲🇬 Madagascar</option>
<option value="+265">+265 🇲🇼 Malawi</option>
<option value="+60">+60 🇲🇾 Malaysia</option>
<option value="+960">+960 🇲🇻 Maldives</option>
<option value="+223">+223 🇲🇱 Mali</option>
<option value="+356">+356 🇲🇹 Malta</option>
<option value="+692">+692 🇲🇭 Marshall Islands</option>
<option value="+596">+596 🇲🇶 Martinique</option>
<option value="+222">+222 🇲🇷 Mauritania</option>
<option value="+230">+230 🇲🇺 Mauritius</option>
<option value="+262">+262 🇾🇹 Mayotte</option>
<option value="+52">+52 🇲🇽 Mexico</option>
<option value="+691">+691 🇫🇲 Micronesia</option>
<option value="+373">+373 🇲🇩 Moldova</option>
<option value="+377">+377 🇲🇨 Monaco</option>
<option value="+976">+976 🇲🇳 Mongolia</option>
<option value="+382">+382 🇲🇪 Montenegro</option>
<option value="+1664">+1664 🇲🇸 Montserrat</option>
<option value="+212">+212 🇲🇦 Morocco</option>
<option value="+258">+258 🇲🇿 Mozambique</option>
<option value="+95">+95 🇲🇲 Myanmar</option>
<option value="+264">+264 🇳🇦 Namibia</option>
<option value="+674">+674 🇳🇷 Nauru</option>
<option value="+977">+977 🇳🇵 Nepal</option>
<option value="+31">+31 🇳🇱 Netherlands</option>
<option value="+687">+687 🇳🇨 New Caledonia</option>
<option value="+64">+64 🇳🇿 New Zealand</option>
<option value="+505">+505 🇳🇮 Nicaragua</option>
<option value="+227">+227 🇳🇪 Niger</option>
<option value="+234">+234 🇳🇬 Nigeria</option>
<option value="+683">+683 🇳🇺 Niue</option>
<option value="+672">+672 🇳🇫 Norfolk Island</option>
<option value="+1670">+1670 🇲🇵 Northern Mariana Islands</option>
<option value="+47">+47 🇳🇴 Norway</option>
<option value="+968">+968 🇴🇲 Oman</option>
<option value="+92">+92 🇵🇰 Pakistan</option>
<option value="+680">+680 🇵🇼 Palau</option>
<option value="+970">+970 🇵🇸 Palestine</option>
<option value="+507">+507 🇵🇦 Panama</option>
<option value="+675">+675 🇵🇬 Papua New Guinea</option>
<option value="+595">+595 🇵🇾 Paraguay</option>
<option value="+51">+51 🇵🇪 Peru</option>
<option value="+63">+63 🇵🇭 Philippines</option>
<option value="+48">+48 🇵🇱 Poland</option>
<option value="+351">+351 🇵🇹 Portugal</option>
<option value="+1787">+1787 🇵🇷 Puerto Rico</option>
<option value="+974">+974 🇶🇦 Qatar</option>
<option value="+262">+262 🇷🇪 Réunion</option>
<option value="+40">+40 🇷🇴 Romania</option>
<option value="+7">+7 🇷🇺 Russia</option>
<option value="+250">+250 🇷🇼 Rwanda</option>
<option value="+590">+590 🇧🇱 Saint Barthélemy</option>
<option value="+290">+290 🇸🇭 Saint Helena</option>
<option value="+1869">+1869 🇰🇳 Saint Kitts and Nevis</option>
<option value="+1758">+1758 🇱🇨 Saint Lucia</option>
<option value="+590">+590 🇲🇫 Saint Martin</option>
<option value="+508">+508 🇵🇲 Saint Pierre and Miquelon</option>
<option value="+1784">+1784 🇻🇨 Saint Vincent and the Grenadines</option>
<option value="+685">+685 🇼🇸 Samoa</option>
<option value="+378">+378 🇸🇲 San Marino</option>
<option value="+239">+239 🇸🇹 São Tomé and Príncipe</option>
<option value="+966">+966 🇸🇦 Saudi Arabia</option>
<option value="+221">+221 🇸🇳 Senegal</option>
<option value="+381">+381 🇷🇸 Serbia</option>
<option value="+248">+248 🇸🇨 Seychelles</option>
<option value="+232">+232 🇸🇱 Sierra Leone</option>
<option value="+65">+65 🇸🇬 Singapore</option>
<option value="+1721">+1721 🇸🇽 Sint Maarten</option>
<option value="+421">+421 🇸🇰 Slovakia</option>
<option value="+386">+386 🇸🇮 Slovenia</option>
<option value="+677">+677 🇸🇧 Solomon Islands</option>
<option value="+252">+252 🇸🇴 Somalia</option>
<option value="+27">+27 🇿🇦 South Africa</option>
<option value="+500">+500 🇬🇸 South Georgia and South Sandwich Islands</option>
<option value="+211">+211 🇸🇸 South Sudan</option>
<option value="+34">+34 🇪🇸 Spain</option>
<option value="+94">+94 🇱🇰 Sri Lanka</option>
<option value="+249">+249 🇸🇩 Sudan</option>
<option value="+597">+597 🇸🇷 Suriname</option>
<option value="+47">+47 🇸🇯 Svalbard and Jan Mayen</option>
<option value="+46">+46 🇸🇪 Sweden</option>
<option value="+41">+41 🇨🇭 Switzerland</option>
<option value="+963">+963 🇸🇾 Syria</option>
<option value="+886">+886 🇹🇼 Taiwan</option>
<option value="+992">+992 🇹🇯 Tajikistan</option>
<option value="+255">+255 🇹🇿 Tanzania</option>
<option value="+66">+66 🇹🇭 Thailand</option>
<option value="+670">+670 🇹🇱 Timor-Leste</option>
<option value="+228">+228 🇹🇬 Togo</option>
<option value="+690">+690 🇹🇰 Tokelau</option>
<option value="+676">+676 🇹🇴 Tonga</option>
<option value="+1868">+1868 🇹🇹 Trinidad and Tobago</option>
<option value="+216">+216 🇹🇳 Tunisia</option>
<option value="+90">+90 🇹🇷 Turkey</option>
<option value="+993">+993 🇹🇲 Turkmenistan</option>
<option value="+1649">+1649 🇹🇨 Turks and Caicos Islands</option>
<option value="+688">+688 🇹🇻 Tuvalu</option>
<option value="+256">+256 🇺🇬 Uganda</option>
<option value="+380">+380 🇺🇦 Ukraine</option>
<option value="+971">+971 🇦🇪 United Arab Emirates</option>
<option value="+44">+44 🇬🇧 United Kingdom</option>
<option value="+1">+1 🇺🇸 United States</option>
<option value="+598">+598 🇺🇾 Uruguay</option>
<option value="+998">+998 🇺🇿 Uzbekistan</option>
<option value="+678">+678 🇻🇺 Vanuatu</option>
<option value="+39">+39 🇻🇦 Vatican City</option>
<option value="+58">+58 🇻🇪 Venezuela</option>
<option value="+84">+84 🇻🇳 Vietnam</option>
<option value="+1284">+1284 🇻🇬 British Virgin Islands</option>
<option value="+1340">+1340 🇻🇮 U.S. Virgin Islands</option>
<option value="+681">+681 🇼🇫 Wallis and Futuna</option>
<option value="+212">+212 🇪🇭 Western Sahara</option>
<option value="+967">+967 🇾🇪 Yemen</option>
<option value="+260">+260 🇿🇲 Zambia</option>
<option value="+263">+263 🇿🇼 Zimbabwe</option>
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
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md transition-colors"
                        disabled={isSubmitting || !hcaptchaLoaded}
                      >
                        {isSubmitting ? "Sending..." : "Book a Free Consultation"}
                      </Button>
                    </div>
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