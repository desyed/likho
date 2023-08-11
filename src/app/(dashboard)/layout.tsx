import '../globals.css'
import "../prosemirror.css";
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {getCurrentUser} from "@/lib/session";
import {redirect} from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Likho Playground :: New Generation of Blogging',
  description: 'Generate your blog site with ease. Play couple of minutes and boom!!!',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getCurrentUser();
    if(!session?.user) {
        redirect("/")
    }
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
      {children}
      </body>
    </html>
  )
}
