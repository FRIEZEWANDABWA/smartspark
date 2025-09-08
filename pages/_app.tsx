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
      </Head>
      <ErrorBoundary>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  )
}