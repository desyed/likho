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

    // Get the subdomain from the host
  const host = req.headers.get('host');
  const subdomain = getValidSubdomain(host);

  if (subdomain) {
    // If subdomain is valid, rewrite the URL
    if(url.pathname === "/"){
        return NextResponse.rewrite(new URL(`/domain`, req.url));
    }else {
        return NextResponse.rewrite(new URL(`/domain/*`, req.url));
    }
  }

  // Otherwise, return the original URL
  return NextResponse.rewrite(url);
}