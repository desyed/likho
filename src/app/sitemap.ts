import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: 'https://www.likho.site',
            lastModified: new Date(),
        }
    ]
}