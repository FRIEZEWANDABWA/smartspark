import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Calendar, Globe, Upload, CheckCircle, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // Step 1: Basic Contact Info
    fullName: '',
    email: '',
    phone: '',
    countryCode: '+1',
    
    // Step 2: Project Details
    serviceType: '',
    projectDescription: '',
    budgetRange: '',
    timeline: '',
    urgency: '',
    
    // Step 3: Additional Info
    company: '',
    location: '',
    hasWorkedBefore: '',
    fileUpload: null as File | null,
    additionalNotes: ''
  })

  const [showAdvancedFields, setShowAdvancedFields] = useState(false)

  // Auto-save form data to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('contactFormData')
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('contactFormData', JSON.stringify(formData))
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        fileUpload: e.target.files[0]
      })
    }
  }

  const nextStep = () => {
    // Validate required fields for each step
    if (currentStep === 1) {
      if (!formData.fullName || !formData.email) {
        alert('Please fill in all required fields (Name and Email)')
        return
      }
    }
    if (currentStep === 2) {
      if (!formData.serviceType || !formData.projectDescription) {
        alert('Please fill in all required fields (Service Type and Project Description)')
        return
      }
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare the message with all details
      const detailedMessage = [
        `Phone: ${formData.countryCode}${formData.phone}`,
        `Project: ${formData.projectDescription}`,
        `Timeline: ${formData.timeline}`,
        `Urgency: ${formData.urgency}`,
        `Company: ${formData.company}`,
        `Location: ${formData.location}`,
        `Experience: ${formData.hasWorkedBefore}`,
        `Notes: ${formData.additionalNotes}`,
        `File: ${formData.fileUpload ? formData.fileUpload.name : 'None'}`,
        `Timestamp: ${new Date().toISOString()}`
      ].filter(line => !line.endsWith(': ') && !line.endsWith(': None')).join('\n')

      // Submit to our API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: `Service: ${formData.serviceType || 'General Inquiry'}\nBudget: ${formData.budgetRange || 'Not specified'}\n\n${detailedMessage}`
        })
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Form submitted successfully:', result)
        setSubmitted(true)
        // Clear form data from localStorage
        localStorage.removeItem('contactFormData')
        // Reset form data
        const resetData = {
          fullName: '', email: '', phone: '', countryCode: '+1',
          serviceType: '', projectDescription: '', budgetRange: '', timeline: '', urgency: '',
          company: '', location: '', hasWorkedBefore: '', fileUpload: null, additionalNotes: ''
        }
        setFormData(resetData)
      } else {
        const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
        console.error('Server error:', response.status, errorData)
        throw new Error(`Server error: ${response.status} - ${errorData.message}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    "Virtual Assistance",
    "Content Writing & Copywriting",
    "Graphic Design & Branding",
    "Video Production & Editing",
    "Web Development & Design",
    "AI & Automation Solutions",
    "Data Services",
    "Digital Marketing",
    "Project Management",
    "Other"
  ]

  const budgetRanges = [
    "Under $500",
    "$500 - $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000 - $10,000",
    "Over $10,000",
    "Not sure yet"
  ]

  const timelines = [
    "ASAP (Rush Job)",
    "Within 1 week",
    "Within 2 weeks",
    "Within 1 month",
    "1-3 months",
    "3+ months",
    "Flexible"
  ]

  const urgencyLevels = [
    "Low - No rush",
    "Medium - Standard timeline",
    "High - Need it soon",
    "Critical - ASAP"
  ]

  const countryCodes = [
    { code: '+1', country: 'US/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+254', country: 'Kenya' },
    { code: '+234', country: 'Nigeria' },
    { code: '+27', country: 'South Africa' },
    { code: '+91', country: 'India' },
    { code: '+86', country: 'China' },
    { code: '+81', country: 'Japan' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+61', country: 'Australia' },
    { code: '+55', country: 'Brazil' }
  ]

  if (submitted) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300">
        <Header />
        <div className="pt-24 pb-16 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto px-4"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600 dark:text-green-400" size={40} />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Thank You!</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Your quote request has been submitted successfully. We'll review your project details and get back to you within 24 hours with a detailed proposal.
            </p>
            <div className="space-y-4">
              <p className="text-gray-500 dark:text-gray-400">
                <strong>What happens next?</strong>
              </p>
              <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2 max-w-md mx-auto">
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  We'll review your requirements within 2-4 hours
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  You'll receive a detailed quote within 24 hours
                </li>
                <li className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  We'll schedule a free consultation call
                </li>
              </ul>
            </div>
            <div className="mt-8 space-x-4">
              <button
                onClick={() => setSubmitted(false)}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
              >
                Submit Another Request
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="border border-primary-600 text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Get Your <span className="text-accent-200">Custom Quote</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Tell us about your project and we'll provide a detailed proposal within 24 hours
            </p>
            
            {/* Progress Steps */}
            <div className="flex justify-center items-center space-x-4 mb-8">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step <= currentStep 
                      ? 'bg-accent-200 text-primary-700' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-accent-200' : 'bg-white/20'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
            
            <p className="text-lg opacity-90">
              Step {currentStep} of 3: {
                currentStep === 1 ? 'Contact Information' :
                currentStep === 2 ? 'Project Details' : 'Additional Information'
              }
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50 dark:bg-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed sm:bg-scroll" style={{ backgroundImage: 'url(/images/backgrounds/10.jpg)' }}></div>
        </div>
        <div className="absolute inset-0 bg-gray-50/75 dark:bg-primary-800/80"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Contact Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Let us know how to reach you</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Country Code
                      </label>
                      <select
                        name="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white"
                      >
                        {countryCodes.map(({ code, country }) => (
                          <option key={code} value={code}>{code} {country}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Details</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Tell us about your project requirements</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Service Type *
                    </label>
                    <select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Describe your project, goals, and specific requirements..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Budget Range
                      </label>
                      <select
                        name="budgetRange"
                        value={formData.budgetRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white"
                      >
                        <option value="">Select budget range</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Timeline
                      </label>
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Urgency Level
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white"
                    >
                      <option value="">Select urgency level</option>
                      {urgencyLevels.map((level) => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Additional Information */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Additional Information</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">Help us provide a more accurate quote</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Have you worked with a similar service before?
                    </label>
                    <select
                      name="hasWorkedBefore"
                      value={formData.hasWorkedBefore}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white"
                    >
                      <option value="">Select an option</option>
                      <option value="yes">Yes, I have experience</option>
                      <option value="no">No, this is my first time</option>
                      <option value="somewhat">Somewhat, but limited experience</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      File Upload (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
                      <input
                        type="file"
                        name="fileUpload"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                        className="hidden"
                        id="fileUpload"
                      />
                      <label htmlFor="fileUpload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-300 mb-2">
                          <span className="font-medium text-primary-600">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          PDF, DOC, images, or ZIP files (max 10MB)
                        </p>
                        {formData.fileUpload && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                            ✓ {formData.fileUpload.name}
                          </p>
                        )}
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Any other information that might help us understand your project better..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200 dark:border-gray-600">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-primary-600 transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                <div className="ml-auto">
                  {currentStep < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center"
                    >
                      Next Step
                      <ArrowRight className="ml-2" size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Get My Quote
                          <Send className="ml-2" size={16} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Other Ways to Connect</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Prefer a different approach? We're here to help
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-gray-50 dark:bg-primary-800 p-8 rounded-xl"
            >
              <MessageCircle className="mx-auto h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">WhatsApp Chat</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Get instant responses and quick answers to your questions
              </p>
              <button 
                onClick={() => window.open('https://wa.me/14147918762', '_blank', 'noopener,noreferrer')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Chat
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-gray-50 dark:bg-primary-800 p-8 rounded-xl"
            >
              <Calendar className="mx-auto h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Free Consultation</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Schedule a 30-minute call to discuss your project in detail
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Book Call
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-gray-50 dark:bg-primary-800 p-8 rounded-xl"
            >
              <Mail className="mx-auto h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Send us a detailed email with your project requirements
              </p>
              <a 
                href="mailto:info@smartspark.com"
                className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Send Email
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}