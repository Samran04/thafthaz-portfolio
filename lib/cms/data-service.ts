import { CMSData, Project, Showreel, Service, Category, HeroSettings, AboutSettings, Skill, Experience, Testimonial, SocialLink } from '@/types/cms';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';

export const INITIAL_CMS_DATA: CMSData = {
  hero: {
    name: 'Thafthaz',
    title: 'Video Editor • Graphic Designer',
    headline: 'Crafting visual stories\nthat leave an impression.',
    description: 'Immersive digital experiences shaped through editorial movement, layout rhythm, and spatial restraint.',
    ctaText: 'Enter Exhibition',
    ctaLink: '/work',
    profileImageUrl: '/assets/profile/profile.jpeg',
    resumeUrl: '/resume.pdf',
  },

  about: {
    biography: 'With over 5 years of experience crafting visual narratives across video editing, motion design, and brand posters, I blend editorial pacing with stark layout precision. Every frame is curated with intention, rhythm, and typographic hierarchy. Holding a B.Sc. in Visual Communication from St. Aloysius College, Mangalore.',
    tagline: "Let's create something people remember.",
    subline: 'Collaborating on visual identities, cinematic editing sequences, and layouts that leave a lasting imprint.',
    email: 'thafthaz313@gmail.com',
    phone: '+91 82773 89481',
    location: 'Mangalore, Karnataka / Worldwide',
    availability: 'Open for Select Commissions & Showreels',
  },

  categories: [
    { id: 'cat-1', name: 'Video Editing', slug: 'video-editing', description: 'Cinematic showreels, commercial edits, and short films', displayOrder: 1 },
    { id: 'cat-2', name: 'Motion Graphics', slug: 'motion-graphics', description: '2D & 3D motion typography and visual FX', displayOrder: 2 },
    { id: 'cat-3', name: 'Poster Series', slug: 'poster-series', description: 'Minimalist typography artwork and spatial layouts', displayOrder: 3 },
    { id: 'cat-4', name: 'Social Reels', slug: 'social-reels', description: '9:16 portrait video edits engineered for high engagement', displayOrder: 4 },
    { id: 'cat-5', name: 'Photo Editing', slug: 'photo-editing', description: 'Professional photo editing, color correction, and retouching', displayOrder: 5 },
  ],

  showreels: [
    {
      id: 'showreel-1',
      title: '2026 Director & Editing Showreel',
      description: 'A montage of commercial edits, motion typography, and brand films created over the past year.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: '/assets/featured-projects/Artha_Capital_1.jpg',
      duration: '1:45',
      aspectRatio: '16:9',
      isFeatured: true,
    },
    {
      id: 'showreel-2',
      title: 'Experimental Motion & Kinetic Type',
      description: 'Explorations in typographic animation, sound-reactive pacing, and spatial layout design.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnailUrl: '/assets/posters/Master_Class_1.jpg',
      duration: '1:12',
      aspectRatio: '16:9',
      isFeatured: false,
    },
  ],

  services: [
    {
      id: 'srv-1',
      title: 'Video Editing & Post-Production',
      description: 'Cinematic commercial editing, color grading, pacing, and narrative storytelling for brand campaigns and films.',
      icon: 'Video',
      deliverables: ['Commercial Cut', 'Color Grading', 'Sound Design', 'Export Package'],
      displayOrder: 1,
      isVisible: true,
    },
    {
      id: 'srv-2',
      title: 'Motion Graphics & Visual FX',
      description: 'Kinetic typography, 2D/3D motion graphics, logo reveals, and animated elements that elevate video content.',
      icon: 'Film',
      deliverables: ['Kinetic Type', 'Logo Animation', 'Title Cards', 'VFX Compositing'],
      displayOrder: 2,
      isVisible: true,
    },
    {
      id: 'srv-3',
      title: 'Poster & Spatial Artwork',
      description: 'Striking minimalist poster series, event key visuals, spatial artwork, and print collateral for exhibitions and brands.',
      icon: 'Palette',
      deliverables: ['Event Posters', 'Key Visuals', 'Print Artworks', 'Social Wallpapers'],
      displayOrder: 3,
      isVisible: true,
    },
    {
      id: 'srv-4',
      title: '9:16 Social Reels & Short Form',
      description: 'High-impact vertical video editing customized for Instagram Reels, TikTok, and YouTube Shorts to maximize engagement.',
      icon: 'Sparkles',
      deliverables: ['Vertical Reel Cut', 'Dynamic Subtitles', 'Pacing & Hooks', 'Sound Sync'],
      displayOrder: 4,
      isVisible: true,
    },
  ],

  experiences: [
    {
      id: 'exp-1',
      role: 'B.Sc. in Visual Communication',
      company: 'St. Aloysius College, Mangalore',
      period: '2021 - 2024',
      description: 'Focused on video production, graphic design principles, media aesthetics, typography, and visual branding.',
      displayOrder: 1,
    },
    {
      id: 'exp-2',
      role: 'Commercial Video Editor & Graphic Designer',
      company: 'Mostly Add Agency, Mangalore',
      period: '2023 - Present',
      description: 'Directing commercial ad visuals, editing social media campaigns, and designing brand identity graphics for diverse agency clients.',
      displayOrder: 2,
    },
    {
      id: 'exp-3',
      role: 'Freelance Director & Motion Designer',
      company: 'Thafthaz Exhibition',
      period: '2020 - Present',
      description: 'Crafting poster series, short-form reels, motion typography, and video packages for independent brands and institutions.',
      displayOrder: 3,
    },
  ],

  skills: [
    { id: 'sk-1', name: 'Adobe Premiere Pro', category: 'Video Editing', proficiency: 95, displayOrder: 1 },
    { id: 'sk-2', name: 'Adobe After Effects', category: 'Motion Design', proficiency: 90, displayOrder: 2 },
    { id: 'sk-3', name: 'Adobe Photoshop', category: 'Graphic Design', proficiency: 95, displayOrder: 3 },
    { id: 'sk-4', name: 'Adobe Illustrator', category: 'Vector & Branding', proficiency: 88, displayOrder: 4 },
    { id: 'sk-5', name: 'Adobe InDesign', category: 'Publication & Layout', proficiency: 85, displayOrder: 5 },
    { id: 'sk-6', name: 'Color Grading & Audio Sync', category: 'Post-Production', proficiency: 90, displayOrder: 6 },
  ],

  testimonials: [],
  socialLinks: [
    { id: 'soc-1', platform: 'Instagram', url: 'https://instagram.com/thafthaz', icon: 'Instagram', displayOrder: 1, isVisible: true },
    { id: 'soc-2', platform: 'LinkedIn', url: 'https://linkedin.com/in/thafthaz', icon: 'Linkedin', displayOrder: 2, isVisible: true },
    { id: 'soc-3', platform: 'Email', url: 'mailto:thafthaz313@gmail.com', icon: 'Mail', displayOrder: 3, isVisible: true },
    { id: 'soc-4', platform: 'Phone', url: 'tel:+918277389481', icon: 'Phone', displayOrder: 4, isVisible: true },
  ],

  projects: [
    {
      id: 'proj-1',
      slug: 'st-aloysius-event-branding',
      title: 'Institutional Event Branding & Posters',
      category: 'Poster Series',
      description: 'Comprehensive poster series, event branding, brochures, and promotional visual design created for college events, cultural festivals, and academic forums at St. Aloysius College.',
      client: 'St. Aloysius College, Mangalore',
      releaseDate: '2024 - 2026',
      softwareUsed: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'],
      projectType: 'Institutional Branding & Posters',
      thumbnail: '/assets/posters/St_Aloysius_2.jpg',
      videoUrl: '',
      posters: [
        '/assets/posters/St_Aloysius_1.jpg',
        '/assets/posters/St_Aloysius_2.jpg',
        '/assets/posters/St_Aloysius_3.jpg',
      ],
      media: [],
      isFeatured: true,
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: 'proj-2',
      slug: 'mostly-add-commercial-branding',
      title: 'Commercial Campaigns & Social Media Creatives',
      category: 'Poster Series',
      description: 'Commercial advertisements, brand identities, social media campaigns, and marketing collateral designed for clients at Mostly Add agency, Mangalore.',
      client: 'Mostly Add Agency, Mangalore',
      releaseDate: '2023 - 2026',
      softwareUsed: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Lightroom'],
      projectType: 'Commercial Brand Design',
      thumbnail: '/assets/featured-projects/Artha_Capital_1.jpg',
      videoUrl: '',
      posters: [
        '/assets/posters/Artha_Capital_1.jpg',
        '/assets/posters/Artha_Capital_2.jpg',
        '/assets/posters/Artha_Capital_3.jpg',
        '/assets/posters/Artha_Capital_4.jpg',
      ],
      media: [],
      isFeatured: true,
      displayOrder: 2,
      isPublished: true,
    },
    {
      id: 'proj-3',
      slug: 'iconn-studios-motion-reels',
      title: 'Iconn Studios Motion & Reel Series',
      category: 'Social Reels',
      description: '9:16 vertical video edits, social media reels, and visual motion sequences crafted under Iconn Studios branding.',
      client: 'Iconn Studios',
      releaseDate: '2025 - 2026',
      softwareUsed: ['Adobe Premiere Pro', 'Adobe Photoshop'],
      projectType: 'Social Video Edit',
      thumbnail: '/assets/featured-projects/Highland_Hospita_2.jpg',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      posters: [
        '/assets/posters/Highland_Hospita_1.jpg',
        '/assets/posters/Highland_Hospita_2.jpg',
      ],
      media: [],
      isFeatured: true,
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: 'proj-4',
      slug: 'travel-pack-visual-identity',
      title: 'Travel Pack Campaign & Spatial Posters',
      category: 'Poster Series',
      description: 'Dynamic visual graphics and spatial typography posters designed for global travel and adventure promotions.',
      client: 'Travel Pack Worldwide',
      releaseDate: '2024 - 2025',
      softwareUsed: ['Adobe Photoshop', 'Adobe Illustrator'],
      projectType: 'Poster Series',
      thumbnail: '/assets/featured-projects/Travel_Pack_6.jpg',
      videoUrl: '',
      posters: [
        '/assets/posters/Travel_Pack_1.jpg',
        '/assets/posters/Travel_Pack_2.jpg',
        '/assets/posters/Travel_Pack_6.jpg',
      ],
      media: [],
      isFeatured: false,
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: 'proj-5',
      slug: 'tokyo-bistro-culinary-branding',
      title: 'Tokyo Bistro Brand Identity & Campaign',
      category: 'Poster Series',
      description: 'Culinary branding collateral, menu layout design, and minimalist social media graphics for Tokyo Bistro.',
      client: 'Tokyo Bistro',
      releaseDate: '2024',
      softwareUsed: ['Adobe Illustrator', 'Adobe Photoshop'],
      projectType: 'Commercial Brand Design',
      thumbnail: '/assets/featured-projects/Tokyo_Bistro_1.jpg',
      videoUrl: '',
      posters: [
        '/assets/posters/Tokyo_Bistro_1.jpg',
      ],
      media: [],
      isFeatured: false,
      displayOrder: 5,
      isPublished: true,
    },
    {
      id: 'proj-6',
      slug: 'family-function-photo-editing',
      title: 'Family Function Photo Editing',
      category: 'Photo Editing',
      description: 'High-end professional editing, color grading, and portrait enhancement for family gatherings, events, and functions.',
      client: 'Family & Portrait Commissions',
      releaseDate: '2025 - 2026',
      softwareUsed: ['Adobe Lightroom', 'Adobe Photoshop'],
      projectType: 'Photo Editing',
      thumbnail: '/assets/wedding/wedding_4.jpg',
      videoUrl: '',
      posters: [
        '/assets/wedding/wedding_1.jpg',
        '/assets/wedding/wedding_2.jpg',
        '/assets/wedding/wedding_3.jpg',
        '/assets/wedding/wedding_4.jpg',
        '/assets/wedding/wedding_5.jpg',
        '/assets/wedding/wedding_6.jpg',
        '/assets/wedding/wedding_7.jpg',
        '/assets/wedding/wedding_8.jpg',
        '/assets/wedding/wedding_9.jpg',
      ],
      media: [],
      isFeatured: true,
      displayOrder: 6,
      isPublished: true,
    },
    {
      id: 'proj-7',
      slug: 'wedding-portrait-photo-editing',
      title: 'Marriage & Wedding Photo Editing',
      category: 'Photo Editing',
      description: 'Professional color correction, enhancement, and beauty retouching for wedding ceremonies and bridal portraits. Specially tuned tones, shadow adjustments, and details preservation.',
      client: 'Wedding Commissions',
      releaseDate: '2025 - 2026',
      softwareUsed: ['Adobe Lightroom', 'Adobe Photoshop'],
      projectType: 'Photo Editing',
      thumbnail: '/assets/photo-editing/photo_1.jpg',
      videoUrl: '',
      posters: [
        '/assets/photo-editing/photo_1.jpg',
        '/assets/photo-editing/photo_2.jpg',
        '/assets/photo-editing/photo_3.jpg',
        '/assets/photo-editing/photo_4.jpg',
        '/assets/photo-editing/photo_5.JPG',
        '/assets/photo-editing/photo_6.JPG',
        '/assets/photo-editing/photo_7.JPG',
        '/assets/photo-editing/photo_8.JPG',
        '/assets/photo-editing/photo_9.JPG',
        '/assets/photo-editing/photo_10.jpeg',
        '/assets/photo-editing/photo_11.jpg',
        '/assets/photo-editing/photo_12.jpg',
        '/assets/photo-editing/photo_13.JPG',
        '/assets/photo-editing/photo_14.JPG',
        '/assets/photo-editing/photo_15.JPG',
        '/assets/photo-editing/photo_16.JPG',
        '/assets/photo-editing/photo_17.JPG',
        '/assets/photo-editing/photo_18.JPG',
        '/assets/photo-editing/photo_19.JPG',
        '/assets/photo-editing/photo_20.JPG',
        '/assets/photo-editing/photo_21.JPG',
        '/assets/photo-editing/photo_22.jpg',
        '/assets/photo-editing/photo_23.jpg',
        '/assets/photo-editing/photo_24.JPG',
        '/assets/photo-editing/photo_25.JPG',
        '/assets/photo-editing/photo_26.JPG',
        '/assets/photo-editing/photo_27.JPG',
        '/assets/photo-editing/photo_28.JPG',
        '/assets/photo-editing/photo_29.JPG',
        '/assets/photo-editing/photo_30.JPG',
        '/assets/photo-editing/photo_31.JPG',
        '/assets/photo-editing/photo_32.JPG',
        '/assets/photo-editing/photo_33.JPG',
        '/assets/photo-editing/photo_34.JPG',
        '/assets/photo-editing/photo_35.JPG',
      ],
      media: [],
      isFeatured: true,
      displayOrder: 7,
      isPublished: true,
    },
  ],
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
        name: data.name || INITIAL_CMS_DATA.hero.name,
        title: data.title || INITIAL_CMS_DATA.hero.title,
        headline: data.headline || INITIAL_CMS_DATA.hero.headline,
        description: data.description || INITIAL_CMS_DATA.hero.description,
        ctaText: data.cta_text || INITIAL_CMS_DATA.hero.ctaText,
        ctaLink: data.cta_link || INITIAL_CMS_DATA.hero.ctaLink,
        profileImageUrl: data.profile_image_url || INITIAL_CMS_DATA.hero.profileImageUrl,
        resumeUrl: data.resume_url || INITIAL_CMS_DATA.hero.resumeUrl,
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
        biography: data.biography || INITIAL_CMS_DATA.about.biography,
        tagline: data.tagline || INITIAL_CMS_DATA.about.tagline,
        subline: data.subline || INITIAL_CMS_DATA.about.subline,
        email: data.email || INITIAL_CMS_DATA.about.email,
        phone: data.phone || INITIAL_CMS_DATA.about.phone,
        location: data.location || INITIAL_CMS_DATA.about.location,
        availability: data.availability || INITIAL_CMS_DATA.about.availability,
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
      let projectsList: Project[] = [];

      if (supabase) {
        let query = supabase.from('projects').select('*').order('display_order', { ascending: true });

        if (categorySlug && categorySlug !== 'all') {
          query = query.eq('category', categorySlug);
        }

        if (featuredOnly) {
          query = query.eq('is_featured', true);
        }

        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          projectsList = data.map((item) => ({
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
        }
      }

      if (projectsList.length === 0) {
        projectsList = INITIAL_CMS_DATA.projects;
        if (categorySlug && categorySlug !== 'all') {
          projectsList = projectsList.filter((p) =>
            p.category.toLowerCase().replace(/\s+/g, '-').includes(categorySlug.toLowerCase())
          );
        }
        if (featuredOnly) {
          projectsList = projectsList.filter((p) => p.isFeatured);
        }
      }

      return projectsList;
    } catch {
      return INITIAL_CMS_DATA.projects;
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
      if (!supabase) return INITIAL_CMS_DATA.showreels;

      const { data, error } = await supabase.from('showreels').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) return INITIAL_CMS_DATA.showreels;

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
      return INITIAL_CMS_DATA.showreels;
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
      if (!supabase) return INITIAL_CMS_DATA.services;

      const { data, error } = await supabase.from('services').select('*').order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return INITIAL_CMS_DATA.services;

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
      return INITIAL_CMS_DATA.services;
    }
  }

  // Categories
  static async getCategories(): Promise<Category[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return INITIAL_CMS_DATA.categories;

      const { data, error } = await supabase.from('categories').select('*').order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return INITIAL_CMS_DATA.categories;

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        description: item.description,
        displayOrder: item.display_order || 0,
      }));
    } catch {
      return INITIAL_CMS_DATA.categories;
    }
  }

  // Experiences
  static async getExperiences(): Promise<Experience[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return INITIAL_CMS_DATA.experiences;

      const { data, error } = await supabase.from('experiences').select('*').order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return INITIAL_CMS_DATA.experiences;

      return data.map((item) => ({
        id: item.id,
        role: item.role,
        company: item.company,
        period: item.period,
        description: item.description,
        displayOrder: item.display_order || 0,
      }));
    } catch {
      return INITIAL_CMS_DATA.experiences;
    }
  }

  // Skills
  static async getSkills(): Promise<Skill[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return INITIAL_CMS_DATA.skills;

      const { data, error } = await supabase.from('skills').select('*').order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return INITIAL_CMS_DATA.skills;

      return data.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category,
        proficiency: item.proficiency || 0,
        displayOrder: item.display_order || 0,
      }));
    } catch {
      return INITIAL_CMS_DATA.skills;
    }
  }

  // Social Links
  static async getSocialLinks(): Promise<SocialLink[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return INITIAL_CMS_DATA.socialLinks;

      const { data, error } = await supabase.from('social_links').select('*').order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return INITIAL_CMS_DATA.socialLinks;

      return data.map((item) => ({
        id: item.id,
        platform: item.platform,
        url: item.url,
        icon: item.icon,
        displayOrder: item.display_order || 0,
        isVisible: item.is_visible ?? true,
      }));
    } catch {
      return INITIAL_CMS_DATA.socialLinks;
    }
  }

  // Testimonials
  static async getTestimonials(): Promise<Testimonial[]> {
    try {
      const supabase = await this.getSupabaseClient();
      if (!supabase) return INITIAL_CMS_DATA.testimonials;

      const { data, error } = await supabase.from('testimonials').select('*').order('display_order', { ascending: true });
      if (error || !data || data.length === 0) return INITIAL_CMS_DATA.testimonials;

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
      return INITIAL_CMS_DATA.testimonials;
    }
  }
}


