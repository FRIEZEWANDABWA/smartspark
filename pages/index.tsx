import { motion } from 'framer-motion'
import { Zap, Globe, Users, Brain, Pen, Monitor, Video, Database, Star, ArrowRight, Phone, Mail, MapPin, CheckCircle, TrendingUp, Award, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import ChatBox from '../components/ChatBox'
import Footer from '../components/Footer'
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'



// Define types for our components
type PortfolioItem = {
  type: string;
  title: string;
  description: string;
  image: string;
  feedback: string;
};

type Service = {
  icon: any; // Using any for Lucide icon components
  title: string;
  description: string;
  features: string[];
};

// Portfolio Carousel Component
function PortfolioCarousel({ items }: { items: PortfolioItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex + visibleItems >= items.length ? 0 : prevIndex + 1
    );
  }, [visibleItems, items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, items.length - visibleItems) : prevIndex - 1
    );
  }, [visibleItems, items.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={carouselRef}>
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`w-full shrink-0 px-3`}
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-shadow group hover:-translate-y-1 duration-300">
                <div className="h-48 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center" style={{ 
                    backgroundImage: `url(/images/portfolio/${item.title.toLowerCase().replace(/\s+/g, '-')}.jpg)`
                  }}></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-900/70 to-primary-800/70 flex items-center justify-center">
                    <span className="text-accent-200 text-5xl">
                      {item.type === 'Writing' && '✍️'}
                      {item.type === 'Design' && '🎨'}
                      {item.type === 'Video' && '🎬'}
                      {item.type === 'AI' && '🤖'}
                      {item.type === 'Web Development' && '💻'}
                      {item.type === 'Marketing' && '📊'}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-accent-500 font-semibold text-sm mb-2">{item.type}</div>
                  <h3 className="font-bold text-lg mb-2 text-primary-800">{item.title}</h3>
                  <p className="text-primary-700 text-sm mb-4">{item.description}</p>
                  <div className="bg-primary-100 p-3 rounded-lg italic text-sm text-primary-700 border-l-4 border-accent-500">
                    "{item.feedback}"
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <button 
        onClick={prevSlide} 
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-accent-500 shadow-lg rounded-full p-3 z-10 hover:bg-accent-600 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} className="text-primary-100" />
      </button>
      <button 
        onClick={nextSlide} 
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-accent-500 shadow-lg rounded-full p-3 z-10 hover:bg-accent-600 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight size={24} className="text-primary-100" />
      </button>
      
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(items.length / visibleItems) }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index * visibleItems)}
            className={`w-2.5 h-2.5 rounded-full ${currentIndex >= index * visibleItems && currentIndex < (index + 1) * visibleItems ? 'bg-accent-500' : 'bg-primary-300'}`}
            aria-label={`Go to slide group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showError, setShowError] = useState(false);
  const totalSlides = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowError(false);
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setShowError(true);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save to database
      const response = await fetch('/api/simple-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        // Also create WhatsApp message
        const message = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
        const whatsappUrl = `https://wa.me/14147918762?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setShowError(false);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    {
      icon: Monitor,
      title: 'Web & App Design',
      description: 'Professional website and mobile app design solutions for your business.',
      link: '/services#technical-services'
    },
    {
      icon: Brain,
      title: 'AI Automation',
      description: 'Cutting-edge AI solutions and automation to streamline your processes.',
      link: '/services#technical-services'
    },
    {
      icon: Database,
      title: 'Data Services',
      description: 'Data entry, analysis, and management services for your business needs.',
      link: '/services#technical-services'
    },
    {
      icon: Video,
      title: 'Graphic Design & Video Editing',
      description: 'Creative design and professional video editing for your brand.',
      link: '/services#creative-services'
    }
  ]

  const portfolioItems = [
    { 
      type: 'Writing', 
      title: 'Tech Blog Series', 
      description: 'Comprehensive AI and automation blog series for SaaS company',
      image: '/images/portfolio/blog-series.jpg',
      feedback: 'The blog series increased our organic traffic by 45% in just two months!'
    },
    { 
      type: 'Design', 
      title: 'Brand Identity', 
      description: 'Complete rebrand for African fintech startup',
      image: '/images/portfolio/brand-identity.jpg',
      feedback: 'Our new brand identity perfectly captures our vision and values.'
    },
    { 
      type: 'Video', 
      title: 'Product Demo', 
      description: 'Engaging product demonstration video for mobile app',
      image: '/images/portfolio/product-demo.jpg',
      feedback: 'The demo video helped us increase conversion rates by 32%.'
    },
    { 
      type: 'AI', 
      title: 'Chatbot Integration', 
      description: 'Custom ChatGPT integration for customer support',
      image: '/images/portfolio/chatbot.jpg',
      feedback: 'Our support team is now 3x more efficient thanks to the AI integration.'
    },
    { 
      type: 'Web Development', 
      title: 'E-commerce Platform', 
      description: 'Custom e-commerce solution for a boutique fashion brand',
      image: '/images/portfolio/ecommerce.jpg',
      feedback: 'Sales increased by 78% within the first quarter after launch!'
    },
    { 
      type: 'Marketing', 
      title: 'Digital Campaign', 
      description: 'Integrated digital marketing campaign for product launch',
      image: '/images/portfolio/marketing.jpg',
      feedback: 'The campaign exceeded our expectations with 2.5x ROI.'
    }
  ]

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'TechStart Inc.',
      text: 'SmartSpark Services transformed our content strategy. Their AI-driven approach combined with creative writing delivered exceptional results.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Global Ventures',
      text: 'The team\'s expertise in both technology and creativity is unmatched. They delivered our project ahead of schedule with outstanding quality.',
      rating: 5
    },
    {
      name: 'Amara Okafor',
      company: 'Innovation Hub',
      text: 'Working with SmartSpark was a game-changer. Their African talent pool brought fresh perspectives to our global campaigns.',
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Header />
      <ChatBox />
      
      {/* Hero Section with Photo Slideshow */}
      <section id="home" className="pt-16 relative overflow-hidden min-h-screen flex items-center bg-white dark:bg-primary-900">
        {/* Photo Slideshow */}
        {[1, 2, 3].map((num, index) => (
          <div
            key={num}
            className={`absolute inset-0 transition-opacity duration-300 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: currentSlide === index ? `url(/images/backgrounds/${num}.jpg)` : 'none',
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}
        <div className="absolute inset-0 bg-primary-900/70"></div>
        
        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-gray-900 dark:text-white w-full z-10">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight animate-fade-in">
              Where AI and <span className="text-accent-500">Creativity</span> Ignite
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-4xl mx-auto opacity-90 px-2 animate-fade-in-delay">
              We combine human creativity with cutting-edge technology to help businesses run smarter, faster, and more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 animate-fade-in-delay-2">
              <Link href="/contact" className="bg-accent-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-accent-600 transition-all duration-200 inline-flex items-center justify-center shadow-lg w-full sm:w-auto hover:scale-105">
                Get a Quote
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link href="/about" className="border-2 border-accent-500 text-accent-500 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-accent-500 hover:text-white transition-all duration-200 w-full sm:w-auto text-center hover:scale-105">
                Learn More
              </Link>
            </div>
          </div>
          

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-secondary-100 dark:bg-secondary-800 relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/backgrounds/about-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-6">About SmartSpark Services</h2>
            <p className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto">
              We're a US-based remote freelancing company connecting global talent with worldwide opportunities, powered by cutting-edge AI innovation.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center bg-secondary-50 dark:bg-secondary-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: 'url(/images/services/alex-knight-2EJCSULRwC8-unsplash.jpg)' }}></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center">
                  <Globe className="text-secondary-50" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Global Reach</h3>
                <p className="text-secondary-700 dark:text-secondary-300">
                  Serving clients worldwide with 24/7 support and seamless communication across time zones.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center bg-secondary-50 dark:bg-secondary-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: 'url(/images/services/pexels-thisisengineering-3861958.jpg)' }}></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-accent-500 to-primary-600 flex items-center justify-center">
                  <Users className="text-secondary-50" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Global Talent</h3>
                <p className="text-secondary-700 dark:text-secondary-300">
                  Leveraging the creativity, innovation, and diverse perspectives of skilled professionals worldwide.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center bg-secondary-50 dark:bg-secondary-700 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-5 bg-cover bg-center" style={{ backgroundImage: 'url(/images/services/adi-goldstein-EUsVwEOsblE-unsplash.jpg)' }}></div>
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center">
                  <Brain className="text-accent-500" size={48} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">AI Integration</h3>
                <p className="text-secondary-700 dark:text-secondary-300">
                  Combining human creativity with artificial intelligence to deliver superior results efficiently.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Services Section with Slider */}
      <section id="services" className="py-20 bg-primary-700 dark:bg-primary-700 light:bg-white text-text-dark dark:text-text-dark light:text-text-light relative">
        <div className="absolute inset-0 opacity-3 bg-cover bg-center" style={{ backgroundImage: 'url(/images/backgrounds/violet-8474790_1920.jpg)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-accent-500 mb-6">Our Services</h2>
            <p className="text-xl text-secondary-50 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored for entrepreneurs, startups, and businesses worldwide.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Link href={service.link} key={service.title}>
                <div className="bg-primary-600 dark:bg-primary-600 light:bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 cursor-pointer">
                  <service.icon className="text-accent-500 mb-4" size={40} />
                  <h3 className="text-lg font-bold mb-3 text-white dark:text-white light:text-text-light">{service.title}</h3>
                  <p className="text-white/90 dark:text-white/90 light:text-text-light/80 text-sm">{service.description}</p>
                  <div className="mt-4">
                    <div className="inline-block bg-accent-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-accent-600 transition-colors">
                      Learn More
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Carousel */}
      <section id="portfolio" className="py-20 bg-primary-800 dark:bg-primary-800 light:bg-secondary-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 dark:opacity-10">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/backgrounds/pexels-energepic-com-27411-313690.jpg)' }}></div>
        </div>
        <div className="absolute inset-0 bg-primary-800/80 dark:bg-primary-800/85"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-6">Our Portfolio</h2>
            <p className="text-xl text-secondary-700 dark:text-secondary-300 max-w-3xl mx-auto">
              Showcasing our best work across writing, design, video, and AI services.
            </p>
          </div>
          
          <PortfolioCarousel items={portfolioItems} />
        </div>
      </section>



      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary-800 dark:bg-primary-800 light:bg-secondary-100 text-text-dark dark:text-text-dark light:text-text-light relative">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url(/images/backgrounds/network-bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-600 dark:text-primary-400">Let's Work Together</h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Ready to transform your business with AI-powered creativity? Get in touch for a free consultation.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-primary-600 dark:text-primary-400">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Mail className="mr-4 text-accent-500" size={24} />
                  <span className="text-secondary-800 dark:text-secondary-200">info@smartspark.com</span>
                </div>
                <div className="flex items-center p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Phone className="mr-4 text-accent-500" size={24} />
                  <span className="text-secondary-800 dark:text-secondary-200">+1(414)791-8762</span>
                </div>
                <div className="flex items-center p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <MapPin className="mr-4 text-accent-500" size={24} />
                  <div className="text-secondary-800 dark:text-secondary-200">
                    <div>18829 West Medlock Drive</div>
                    <div>Litchfield Park, AZ 85340</div>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-secondary-50 dark:bg-secondary-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Globe className="mr-4 text-accent-500" size={24} />
                  <span className="text-secondary-800 dark:text-secondary-200">Available Worldwide - 24/7 Support</span>
                </div>
              </div>
            </div>
            
            <div className="bg-primary-600 dark:bg-primary-900 p-8 rounded-xl shadow-lg text-secondary-50">
              <h3 className="text-2xl font-bold mb-6 text-accent-500">Quick Contact</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  className="w-full p-3 rounded-lg bg-primary-700 dark:bg-primary-800 border border-primary-500 dark:border-primary-700 placeholder-secondary-300 text-secondary-50 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  className="w-full p-3 rounded-lg bg-primary-700 dark:bg-primary-800 border border-primary-500 dark:border-primary-700 placeholder-secondary-300 text-secondary-50 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none"
                />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project"
                  rows={4}
                  className="w-full p-3 rounded-lg bg-primary-700 dark:bg-primary-800 border border-primary-500 dark:border-primary-700 placeholder-secondary-300 text-secondary-50 focus:border-accent-500 focus:ring-1 focus:ring-accent-500 outline-none resize-none"
                ></textarea>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-accent-500 text-secondary-50 py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center">Message sent successfully!</p>
                )}
                {showError && (
                  <p className="text-red-400 text-sm text-center">Please fill in all fields.</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}