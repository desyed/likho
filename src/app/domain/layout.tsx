import "highlight.js/styles/github.css";
import '../globals.css'
import "../prosemirror.css";
import { Inter } from 'next/font/google'
import { ReactNode } from "react";
import { Metadata } from "next";
import {notFound} from "next/navigation";
const inter = Inter({ subsets: ['latin'] })


export async function generateMetadata({
  params,
}: {
  params: { domain: string };
}): Promise<Metadata | null> {


  return {
    title: 'asdfasd',
    description: 'asdfadsf',
    metadataBase: new URL(`https://${params.domain}`),
  };
}
// TODO: generate Static Params
// export async function generateStaticParams() {
//
//
//   const allPaths = [
//     // ...subdomains.map(({ subdomain }) => subdomain),
//     // ...customDomains.map(({ customDomain }) => customDomain),
//   ].filter((path) => path) as Array<string>;
//
//   return allPaths.map((domain) => ({
//     params: {
//       domain,
//     },
//   }));
// }

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
