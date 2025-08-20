import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ClientRoot } from '../src/components/ClientRoot'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Tazzky - Contrata servicios confiables en minutos',
  description: 'Tazzky es la plataforma que conecta clientes con profesionales confiables. Encuentra cualquier servicio que necesites de forma rápida, segura y sin comisiones durante la beta.',
  keywords: [
    'servicios',
    'profesionales',
    'contratación',
    'freelance',
    'beta',
    'México',
    'plataforma',
    'confiable'
  ],
  authors: [{ name: 'Tazzky Team' }],
  openGraph: {
    title: 'Tazzky - Contrata servicios confiables en minutos',
    description: 'Encuentra cualquier servicio que necesites de forma rápida, segura y sin comisiones durante la beta.',
    type: 'website',
    locale: 'es_MX',
    siteName: 'Tazzky'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tazzky - Contrata servicios confiables en minutos',
    description: 'Encuentra cualquier servicio que necesites de forma rápida, segura y sin comisiones durante la beta.'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#BADB3A'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}
