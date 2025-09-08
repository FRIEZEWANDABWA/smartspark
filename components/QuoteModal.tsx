import { useState } from 'react'
import { X } from 'lucide-react'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  service?: string
}

export default function QuoteModal({ isOpen, onClose, service = '' }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: service,
    budget: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', service: '', budget: '', message: '' })
        setTimeout(() => onClose(), 2000)
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Get a Quote</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
            className="w-full p-3 border rounded-lg"
          />
          <select
            value={formData.service}
            onChange={(e) => setFormData({...formData, service: e.target.value})}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Select Service</option>
            <option value="Web Development">Web Development</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="AI Automation">AI Automation</option>
            <option value="Video Editing">Video Editing</option>
            <option value="Virtual Assistant">Virtual Assistant</option>
            <option value="Writing">Writing & Content</option>
          </select>
          <select
            value={formData.budget}
            onChange={(e) => setFormData({...formData, budget: e.target.value})}
            required
            className="w-full p-3 border rounded-lg"
          >
            <option value="">Budget Range</option>
            <option value="$100-500">$100 - $500</option>
            <option value="$500-1000">$500 - $1,000</option>
            <option value="$1000-2500">$1,000 - $2,500</option>
            <option value="$2500+">$2,500+</option>
          </select>
          <textarea
            placeholder="Project Details"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={3}
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-500 text-white py-3 rounded-lg hover:bg-accent-600 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Get Quote'}
          </button>
          
          {submitStatus === 'success' && (
            <p className="text-green-600 text-center">Quote request sent successfully!</p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-600 text-center">Failed to send request. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  )
}