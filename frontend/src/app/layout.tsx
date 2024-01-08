import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import logo from '../../public/images/logo-quality.png';
import './globals.css';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quality Desafio',
  description: 'Desafio Técnico Quality Entregas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <link rel="icon" href={logo.src} type="image/png" sizes="32x32" />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
