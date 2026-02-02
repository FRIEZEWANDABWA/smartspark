import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-primary-900 dark:bg-primary-900 light:bg-secondary-200 text-text-dark dark:text-text-dark light:text-text-light py-8 md:py-12">
      {/* Desktop background images */}
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute left-0 top-0 w-1/4 h-full" style={{ backgroundImage: 'url(/images/contact-bg.webp)', backgroundSize: 'contain', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat', opacity: 0.3 }}></div>
        <div className="absolute left-1/4 top-0 w-1/2 h-full" style={{ backgroundImage: 'url(/images/footer-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 }}></div>
        <div className="absolute right-0 top-0 w-1/4 h-full" style={{ backgroundImage: 'url(/images/logo.webp)', backgroundSize: 'contain', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat', opacity: 0.1 }}></div>
      </div>
      {/* Mobile background - simplified */}
      <div className="absolute inset-0 md:hidden" style={{ backgroundImage: 'url(/images/footer-bg.webp)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }}></div>
      <div className="absolute inset-0 bg-primary-900/90 dark:bg-primary-900/90"></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img src="/images/logo.webp" alt="SmartSpark Services" className="w-16 h-16 md:w-24 md:h-24 object-contain mr-3 md:mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-lg md:text-xl font-bold text-accent-500">SmartSpark Services</h3>
                <p className="text-xs md:text-sm text-secondary-200">Where AI and Creativity Ignite</p>
              </div>
            </div>
            <p className="text-sm md:text-base text-secondary-200 mb-4">
              Empowering businesses worldwide with global talent and cutting-edge AI innovation from our US headquarters.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-accent-500 mb-3 md:mb-4">Contact Info</h4>
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center text-secondary-200">
                <Mail className="mr-2 md:mr-3 text-accent-500 flex-shrink-0" size={14} />
                <span className="text-xs md:text-sm break-all">info@smartsparkservices.com</span>
              </div>
              <div className="flex items-center text-secondary-200">
                <Phone className="mr-2 md:mr-3 text-accent-500 flex-shrink-0" size={14} />
                <span className="text-xs md:text-sm">+1 (602) 851-1680</span>
              </div>
              <div className="flex items-start text-secondary-200">
                <MapPin className="mr-2 md:mr-3 text-accent-500 mt-1 flex-shrink-0" size={14} />
                <div className="text-xs md:text-sm">
                  <div>Litchfield Park, AZ 85340</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-base md:text-lg font-bold text-accent-500 mb-3 md:mb-4">Follow Us</h4>
            <div className="flex space-x-3 md:space-x-4">
              <a href="https://www.facebook.com/share/1H5CdxwEwe/" target="_blank" rel="noopener noreferrer" className="bg-primary-700 dark:bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-50">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a href="https://www.instagram.com/smartspark_services/" target="_blank" rel="noopener noreferrer" className="bg-primary-700 dark:bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-50">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="https://www.linkedin.com/groups/15404006/" target="_blank" rel="noopener noreferrer" className="bg-primary-700 dark:bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-50">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://x.com/Smartspark2025" target="_blank" rel="noopener noreferrer" className="bg-primary-700 dark:bg-primary-800 p-2 rounded-full hover:bg-accent-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-50">
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm text-secondary-300">
            &copy; 2024 SmartSpark Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}