import {MetadataRoute} from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/playground/',
        },
        sitemap: 'https://www.likho.site/sitemap.xml',
    }
}