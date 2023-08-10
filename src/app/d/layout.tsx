import "highlight.js/styles/github.css";
import '../globals.css'
import "../prosemirror.css";
import { Inter } from 'next/font/google'
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
// import { getSiteData } from "@/lib/fetchers";
import { Metadata } from "next";
import Link from "next/link";
const inter = Inter({ subsets: ['latin'] })


export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {
  // const data = await getSiteData(params.domain);
  // if (!data) {
  //   return null;
  // }
  // const {
  //   name: title,
  //   description,
  //   image,
  //   logo,
  // } = data as {
  //   name: string;
  //   description: string;
  //   image: string;
  //   logo: string;
  // };

  return {
    title: 'asdfasd',
    description: 'asdfadsf',
    // openGraph: {
    //   title,
    //   description,
    //   images: [image],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [image],
    //   creator: "@vercel",
    // },
    // icons: [logo],
    metadataBase: new URL(`https://${params.domain}`),
  };
}

export async function generateStaticParams() {
  // const [subdomains, customDomains] = await Promise.all([
  //     new Promise(()=>{}), new Promise(()=>{})
    // prisma.site.findMany({
    //   select: {
    //     subdomain: true,
    //   },
    // }),
    // prisma.site.findMany({
    //   where: {
    //     NOT: {
    //       customDomain: null,
    //     },
    //   },
    //   select: {
    //     customDomain: true,
    //   },
    // }),
  // ]);

  const allPaths = [
    // ...subdomains.map(({ subdomain }) => subdomain),
    // ...customDomains.map(({ customDomain }) => customDomain),
  ].filter((path) => path) as Array<string>;

  return allPaths.map((domain) => ({
    params: {
      domain,
    },
  }));
}

export default async function SiteLayout({
  params,
  children,
}: {
  params: { domain: string };
  children: ReactNode;
}) {
  const { domain } = params;
  // const data = await getSiteData(domain);
  //
  // if (!data) {
  //   notFound();
  // }


  return (
      <html lang="en">
      <body className={`${inter.className} `}>
        <div>{children}</div>
      </body>
      </html>
  );
}
