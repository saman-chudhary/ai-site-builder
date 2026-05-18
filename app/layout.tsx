import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Siteforge — AI Website Builder for Small Businesses',
  description: 'Enter your business type. Get a complete, SEO-ready website in under 60 seconds. Powered by AI.',
  keywords: 'AI website builder, small business website, automatic website generator, SEO website builder',
  openGraph: {
    title: 'Siteforge — AI Website Builder',
    description: 'Complete business websites generated in 60 seconds.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ink text-paper antialiased">
        {children}
      </body>
    </html>
  )
}
