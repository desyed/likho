import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Topnav from "@/app/(landing)/components/topnav";
import {headers} from "next/headers";
import {isSubdomain} from "@/lib/utils";
import {redirect} from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Likho: New Generation of Blogging Platform',
  description: 'Generate your blog site with ease. Play couple of minutes and boom!!!',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const headersList = headers();
    const domain = headersList.get("x-forwarded-host") || "";
    if(isSubdomain(domain)){
        redirect('/d')
    }
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
          <Topnav />
          {children}
      </body>
    </html>
  )
}
