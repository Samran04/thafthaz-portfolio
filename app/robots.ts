import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thafthaz.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/admin/*'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended', 'Googlebot', 'Bingbot'],
        allow: '/',
        disallow: ['/admin/', '/admin/*'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

