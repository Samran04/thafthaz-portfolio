import { MetadataRoute } from 'next';
import { CMSDataService } from '@/lib/cms/data-service';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thafthaz.com';

  const projects = await CMSDataService.getProjects();

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticPages = [
    '',
    '/about',
    '/work',
    '/services',
    '/showreel',
    '/contact',
    '/timeline',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  return [...staticPages, ...projectUrls];
}

