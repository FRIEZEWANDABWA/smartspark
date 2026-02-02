import type { AppProps } from 'next/app'
import '../styles/globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'
import ErrorBoundary from '../components/ErrorBoundary'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4F9CFF" />
        
        {/* SEO Meta Tags */}
        <title>SmartSpark Services - AI & Creative Solutions | Web Development, Design & Marketing</title>
        <meta name="description" content="SmartSpark Services combines AI technology with creative expertise. We offer web development, graphic design, digital marketing, and AI automation solutions for businesses worldwide." />
        <meta name="keywords" content="AI solutions, web development, graphic design, digital marketing, automation, creative services, SmartSpark" />
        <meta name="author" content="SmartSpark Services" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://smartsparkservices.com/" />
        <meta property="og:title" content="SmartSpark Services - Where AI and Creativity Ignite" />
        <meta property="og:description" content="Empowering businesses worldwide with global talent and cutting-edge AI innovation. Professional web development, design, and marketing services." />
        <meta property="og:image" content="https://smartsparkservices.com/images/logo.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="SmartSpark Services" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://smartsparkservices.com/" />
        <meta property="twitter:title" content="SmartSpark Services - Where AI and Creativity Ignite" />
        <meta property="twitter:description" content="Empowering businesses worldwide with global talent and cutting-edge AI innovation. Professional web development, design, and marketing services." />
        <meta property="twitter:image" content="https://smartsparkservices.com/images/logo.webp" />
        <meta property="twitter:site" content="@Smartspark2025" />
        
        {/* Favicon */}
        <link rel="icon" href="/images/logo.webp" />
        <link rel="apple-touch-icon" href="/images/logo.webp" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SmartSpark Services",
              "url": "https://smartsparkservices.com",
              "logo": "https://smartsparkservices.com/images/logo.webp",
              "description": "AI-powered creative services combining technology with human creativity for web development, design, and digital marketing.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Litchfield Park",
                "addressRegion": "AZ",
                "postalCode": "85340",
                "addressCountry": "US"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-602-851-1680",
                "contactType": "customer service",
                "email": "info@smartsparkservices.com"
              },
              "sameAs": [
                "https://www.facebook.com/share/1H5CdxwEwe/",
                "https://www.instagram.com/smartspark_services/",
                "https://www.linkedin.com/groups/15404006/",
                "https://x.com/Smartspark2025"
              ]
            })
          }}
        />
      </Head>
      <ErrorBoundary>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}