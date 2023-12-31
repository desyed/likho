import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Topnav from "@/app/(landing)/components/topnav";
import {headers} from "next/headers";
import {isSubdomain} from "@/lib/utils";
import {redirect} from "next/navigation";
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] })

// TODO: Add Open Graph and Twitter Card meta tags
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
    <Script src="https://www.googletagmanager.com/gtag/js?id=G-P58PZDHF3Q"></Script>
    <Script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            gtag('config', 'G-P58PZDHF3Q');
        `}
    </Script>
      <body className={`${inter.className} bg-cover bg-bottom bg-[url('/bg-post.jpg')] bg-no-repeat`}>
          <Topnav />
          {children}
      </body>
    </html>
  )
}
