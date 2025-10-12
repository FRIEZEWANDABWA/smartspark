import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-primary-900 dark:bg-primary-900 light:bg-secondary-200 text-text-dark dark:text-text-dark light:text-text-light py-12">
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 w-1/3 h-full" style={{ backgroundImage: 'url(/images/contact-bg.webp)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
        <div className="absolute left-1/4 top-0 w-1/2 h-full" style={{ backgroundImage: 'url(/images/footer-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="absolute right-0 top-0 w-1/3 h-full" style={{ backgroundImage: 'url(/images/logo.webp)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}></div>
      </div>
      <div className="absolute inset-0 bg-primary-900/80 dark:bg-primary-900/80"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/images/logo.webp" alt="SmartSpark Services" className="w-36 h-36 object-contain mr-6" />
              <div>
                <h3 className="text-xl font-bold text-accent-500">SmartSpark Services</h3>
                <p className="text-sm text-secondary-200">Where AI and Creativity Ignite</p>
              </div>
            </div>
            <p className="text-secondary-200 mb-4">
              Empowering businesses worldwide with global talent and cutting-edge AI innovation from our US headquarters.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-accent-500 mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center text-secondary-200">
                <Mail className="mr-3 text-accent-500" size={16} />
                <span className="text-sm">contact@smartsparkservices.com</span>
              </div>
              <div className="flex items-center text-secondary-200">
                <Phone className="mr-3 text-accent-500" size={16} />
                <span className="text-sm">+1(602)886-3530</span>
              </div>
              <div className="flex items-start text-secondary-200">
                <MapPin className="mr-3 text-accent-500 mt-1" size={16} />
                <div className="text-sm">
                  <div>18829 West Medlock Drive</div>
                  <div>Litchfield Park, AZ 85340</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold text-accent-500 mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-primary-700 dark:bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-50">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-primary-700 dark:bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-50">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-primary-700 dark:bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-50">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 pt-8 text-center">
          <p className="text-sm text-secondary-300">
            &copy; 2024 SmartSpark Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}