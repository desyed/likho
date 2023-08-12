import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {getValidSubdomain} from "@/lib/utils";

// RegExp for public files
const PUBLIC_FILE = /\.(.*)$/; // Files

export async function middleware(req: NextRequest) {

  // retrieve the current response
  const res = NextResponse.next()

  // add the CORS headers to the response
  res.headers.append('Access-Control-Allow-Credentials', "true")
  res.headers.append('Access-Control-Allow-Origin', 'http://localhost:3000, https://www.likho.site, https://likho.site')
  res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
  res.headers.append('Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, x-api-key',
  )


  // Clone the URL
  const url = req.nextUrl.clone();

  // Skip public files
  if (PUBLIC_FILE.test(url.pathname) || url.pathname.includes('_next')) return;

    // Get the subdomain from the host
  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  if (subdomain) {
    // If subdomain is valid, rewrite the URL
    if(url.pathname === "/"){
        return NextResponse.rewrite(new URL(`/d`, req.url));
    }else {
        return NextResponse.rewrite(new URL(`/d/*`, req.url));
    }
  }

  // Otherwise, return the original URL
  return NextResponse.rewrite(url);
}