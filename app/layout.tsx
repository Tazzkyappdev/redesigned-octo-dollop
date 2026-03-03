import type { Metadata, Viewport } from 'next'
import './globals.css'
import { ClientRoot } from '../src/components/ClientRoot'

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
  },
  icons: {
    icon: '/favicon-48.png',
    apple: '/apple-icon.png',
    shortcut: '/favicon-48.png'
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
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased font-sf-pro" suppressHydrationWarning>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  )
}
