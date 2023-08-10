import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
// import {serialize} from "next-mdx-remote/serialize";

export function cn(...inputs: ClassValue[]) {
 return twMerge(clsx(inputs));
}
export type { VariantProps } from "class-variance-authority";

export const   convertBase64 = (file: File): Promise<string | null | ArrayBuffer> => {
 return new Promise((resolve, reject) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file)
  fileReader.onload = () => {
   resolve(fileReader.result);
  }
  fileReader.onerror = (error) => {
   reject(error);
  }
 })
}

export const slugify = (str: string) => str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

export const isValidUrl = (urlString: string): boolean => {
 const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
     '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
 return !!urlPattern.test(urlString);
}

export async function getMdxSource(postContents: string) {
 // transforms links like <link> to [link](link) as MDX doesn't support <link> syntax
 // https://mdxjs.com/docs/what-is-mdx/#markdown
 const content =
     postContents?.replaceAll(/<(https?:\/\/\S+)>/g, "[$1]($1)") ?? "";
 // Serialize the content string into MDX
 // return await serialize(content);
}

const cleanUrl = (url: string) => {
    // Remove "http://" or "https://"
    const cleanUrl = url.replace(/^(http:\/\/|https:\/\/)/i, '');

    // Remove "www."
    return cleanUrl.replace(/^www\./i, '');
}

export const isSubdomain = (url: string) => {
 // check url validity
 const isValid = isValidUrl(url);
 if(!isValid) return false;

 const newUrl = cleanUrl(url);

 // Split the URL into parts using dots as separators
 const urlParts = newUrl.split('.');

 // Check if there are more than two parts (subdomain.domain.tld)
 return urlParts.length > 2;
}
export const getValidSubdomain = (host?: string | null) => {
 let subdomain: string | null = null;
 if (!host && typeof window !== 'undefined') {
  // On client side, get the host from window
  host = window.location.host;
 }
 if (isSubdomain(host || '')) {
  const candidate = host ? host.split('.')[0] : null;
  if (candidate && !candidate.includes('localhost')) {
   // Valid candidate
   subdomain = candidate;
  }
 }
 return subdomain;
};

export const getSubdomain = (url: string) => {
 // check url validity
 const isValid = isValidUrl(url);
 if(!isValid) return false;

 const newUrl = cleanUrl(url);

 // Split the URL into parts using dots as separators
 const urlParts = newUrl.split('.');

 // Check if there are more than two parts (subdomain.domain.tld)
 if(urlParts.length > 2) {
  // Return the subdomain (the first part of the URL)
  return urlParts[0];
 }

 return false;
}

export const getHost = () => {
 const IS_SERVER = typeof window === "undefined";
 return  IS_SERVER ? "" : window.location.host;
}

export const getBlurDataURL = async (url: string | null) => {
 if (!url) {
  return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
 }
 try {
  const response = await fetch(
      `https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`,
  );
  const buffer = await response.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  return `data:image/png;base64,${base64}`;
 } catch (error) {
  return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
 }
};

export const placeholderBlurhash =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==";

export const toDateString = (date: Date) => {
 return new Date(date).toLocaleDateString("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
 });
};