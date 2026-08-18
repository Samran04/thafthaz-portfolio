import { CMSData, Project, Showreel, Service, Category, HeroSettings, AboutSettings, Skill, Experience, Testimonial, SocialLink } from '@/types/cms';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export const INITIAL_CMS_DATA: CMSData = {
  hero: {
    name: '',
    title: '',
    headline: '',
    description: '',
    ctaText: 'Enter Exhibition',
    ctaLink: '/work',
    profileImageUrl: '',
    resumeUrl: '',
  },

  about: {
    biography: '',
    tagline: '',
    subline: '',
    email: '',
    phone: '',
    location: '',
    availability: '',
  },

  categories: [],
  showreels: [],
  services: [],
  experiences: [],
  skills: [],
  testimonials: [],
  socialLinks: [],
  projects: [],
};

export class CMSDataService {
  private static async getSupabaseClient() {
    return getSupabaseBrowserClient();
  }

  // Hero Section
  static async getHero(): Promise<HeroSettings> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return INITIAL_CMS_DATA.hero;

      const { data, error } = await supabase.from('hero_settings').select('*').single();
      if (error || !data) return INITIAL_CMS_DATA.hero;

      return {
        name: data.name || '',
        title: data.title || '',
        headline: data.headline || '',
        description: data.description || '',
        ctaText: data.cta_text || 'Enter Exhibition',
        ctaLink: data.cta_link || '/work',
        profileImageUrl: data.profile_image_url || '',
        resumeUrl: data.resume_url || '',
      };
    } catch {
      return INITIAL_CMS_DATA.hero;
    }
  }

  // About Section
  static async getAbout(): Promise<AboutSettings> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return INITIAL_CMS_DATA.about;

      const { data, error } = await supabase.from('about_settings').select('*').single();
      if (error || !data) return INITIAL_CMS_DATA.about;

      return {
        biography: data.biography || '',
        tagline: data.tagline || '',
        subline: data.subline || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        availability: data.availability || '',
      };
    } catch {
      return INITIAL_CMS_DATA.about;
    }
  }

  static async updateHero(hero: Partial<HeroSettings>): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return;
      await supabase.from('hero_settings').upsert([
        {
          id: '1',
          name: hero.name,
          title: hero.title,
          headline: hero.headline,
          description: hero.description,
          cta_text: hero.ctaText,
          cta_link: hero.ctaLink,
          profile_image_url: hero.profileImageUrl,
          resume_url: hero.resumeUrl,
        },
      ]);
    } catch (err) {
      console.error('Failed to update hero', err);
    }
  }

  static async updateAbout(about: Partial<AboutSettings>): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return;
      await supabase.from('about_settings').upsert([
        {
          id: '1',
          biography: about.biography,
          tagline: about.tagline,
          subline: about.subline,
          email: about.email,
          phone: about.phone,
          location: about.location,
          availability: about.availability,
        },
      ]);
    } catch (err) {
      console.error('Failed to update about', err);
    }
  }

  // Projects CRUD
  static async getProjects(categorySlug?: string, featuredOnly?: boolean): Promise<Project[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      let query = supabase.from('projects').select('*').order('display_order', { ascending: true });

      if (categorySlug && categorySlug !== 'all') {
        query = query.eq('category', categorySlug);
      }

      if (featuredOnly) {
        query = query.eq('is_featured', true);
      }

      const { data, error } = await query;
      if (error || !data || data.length === 0) return [];

      return data.map((item) => ({
        id: item.id,
        slug: item.slug,
        title: item.title,
        category: item.category,
        description: item.description,
        client: item.client,
        releaseDate: item.release_date,
        softwareUsed: item.software_used || [],
        projectType: item.project_type,
        thumbnail: item.thumbnail_url,
        videoUrl: item.video_url,
        posters: item.posters || [],
        media: item.media || [],
        isFeatured: item.is_featured,
        displayOrder: item.display_order,
        isPublished: item.is_published,
        metaTitle: item.meta_title,
        metaDescription: item.meta_description,
      }));
    } catch {
      return [];
    }
  }

  static async getProjectBySlug(slug: string): Promise<Project | null> {
    const projects = await this.getProjects();
    return projects.find((p) => p.slug === slug) || null;
  }

  static async saveProject(project: Partial<Project>): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return;

      const payload = {
        title: project.title,
        slug: project.slug,
        category: project.category,
        description: project.description,
        client: project.client,
        release_date: project.releaseDate,
        software_used: project.softwareUsed,
        project_type: project.projectType,
        thumbnail_url: project.thumbnail,
        video_url: project.videoUrl,
        posters: project.posters,
        media: project.media,
        is_featured: project.isFeatured ?? true,
        is_published: project.isPublished ?? true,
      };

      if (project.id) {
        await supabase.from('projects').update(payload).eq('id', project.id);
      } else {
        await supabase.from('projects').insert([payload]);
      }
    } catch (err) {
      console.error('Failed to save project', err);
    }
  }

  static async deleteProject(id: string): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return;
      await supabase.from('projects').delete().eq('id', id);
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  }

  // Showreels CRUD
  static async getShowreels(): Promise<Showreel[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      const { data, error } = await supabase.from('showreels').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return [];

      return data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        videoUrl: item.video_url,
        thumbnailUrl: item.thumbnail_url,
        duration: item.duration,
        aspectRatio: item.aspect_ratio,
        isFeatured: item.is_featured,
      }));
    } catch {
      return [];
    }
  }

  static async getAllShowreels(): Promise<Showreel[]> {
    return this.getShowreels();
  }

  static async saveShowreel(showreel: Partial<Showreel>): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return;

      const payload = {
        title: showreel.title,
        description: showreel.description,
        video_url: showreel.videoUrl,
        thumbnail_url: showreel.thumbnailUrl,
        duration: showreel.duration || '1:00',
        aspect_ratio: showreel.aspectRatio || '16:9',
        is_featured: showreel.isFeatured ?? true,
      };

      if (showreel.id) {
        await supabase.from('showreels').update(payload).eq('id', showreel.id);
      } else {
        await supabase.from('showreels').insert([payload]);
      }
    } catch (err) {
      console.error('Failed to save showreel', err);
    }
  }

  static async deleteShowreel(id: string): Promise<void> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return;
      await supabase.from('showreels').delete().eq('id', id);
    } catch (err) {
      console.error('Failed to delete showreel', err);
    }
  }

  static async getFeaturedShowreel(): Promise<Showreel | null> {
    const showreels = await this.getShowreels();
    return showreels.find((s) => s.isFeatured) || showreels[0] || null;
  }

  // Services
  static async getServices(): Promise<Service[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (error || !data) return [];

      return data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        icon: item.icon || 'Video',
        deliverables: item.deliverables || [],
        displayOrder: item.display_order || 0,
        isVisible: item.is_visible ?? true,
      }));
    } catch {
      return [];
    }
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
      if (error || !data) return [];

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        displayOrder: item.display_order || 0,
      }));
    } catch {
      return [];
    }
  }

  // Experiences
  static async getExperiences(): Promise<Experience[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      const { data, error } = await supabase.from('experiences').select('*').order('display_order', { ascending: true });
      if (error || !data) return [];

      return data.map((item) => ({
        id: item.id,
        role: item.role,
        company: item.company,
        period: item.period,
        description: item.description,
        displayOrder: item.display_order || 0,
      }));
    } catch {
      return [];
    }
  }

  // Skills
  static async getSkills(): Promise<Skill[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
      if (error || !data) return [];

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        proficiency: item.proficiency || 0,
        displayOrder: item.display_order || 0,
      }));
    } catch {
      return [];
    }
  }

  // Social Links
  static async getSocialLinks(): Promise<SocialLink[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      const { data, error } = await supabase.from('social_links').select('*').order('display_order', { ascending: true });
      if (error || !data) return [];

      return data.map((item) => ({
        id: item.id,
        platform: item.platform,
        url: item.url,
        icon: item.icon,
        displayOrder: item.display_order || 0,
        isVisible: item.is_visible ?? true,
      }));
    } catch {
      return [];
    }
  }

  // Testimonials
  static async getTestimonials(): Promise<Testimonial[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return [];

      const { data, error } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
      if (error || !data) return [];

      return data.map((item) => ({
        id: item.id,
        clientName: item.client_name,
        company: item.company,
        role: item.role,
        avatarUrl: item.avatar_url,
        quote: item.quote,
        rating: item.rating || 5,
        displayOrder: item.display_order || 0,
        isPublished: item.is_published ?? true,
      }));
    } catch {
      return [];
    }
  }
}

