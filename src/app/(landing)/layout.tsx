import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Topnav from "@/app/(landing)/components/topnav";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Likho: New Generation of Blogging Platform',
  description: 'Generate your blog site with ease. Play couple of minutes and boom!!!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Topnav />
      {children}</body>
    </html>
  )
}
