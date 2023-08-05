import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from "@/app/(dashboard)/components/sidebar";
import ProjectContainer from "@/app/(dashboard)/components/projectContainer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Likho Playground :: New Generation of Blogging',
  description: 'Generate your blog site with ease. Play couple of minutes and boom!!!',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Sidebar/>
      <ProjectContainer>
        {children}
      </ProjectContainer>
      </body>
    </html>
  )
}
