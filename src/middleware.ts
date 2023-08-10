import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {getValidSubdomain} from "@/lib/utils";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {
  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);
  if (subdomain) {
    // Subdomain available, rewriting
    // console.log(`>>> Rewriting: ${url.pathname} to /${subdomain}${url.pathname}`);
    // url.pathname = `/${subdomain}${url.pathname}`;
    // url.host = `${subdomain}.${url.host}`;
    // url.hostname = `${subdomain}.${url.hostname}`;
    // console.log('url', url)
    return NextResponse.rewrite(new URL(`/d`, req.url));
  }

  // if(hostname.includes("www") && (hostname !== "www.likho.site")){
  //   return NextResponse.rewrite(new URL(`/d`, req.url));
  // }else if(!hostname.includes("www") && (hostname !== "likho.site")){
  //   return NextResponse.rewrite(new URL(`/subdomain`, req.url));
  // }

  return NextResponse.rewrite(url);
}