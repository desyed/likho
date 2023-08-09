import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import {serialize} from "next-mdx-remote/serialize";

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
 return await serialize(content);
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