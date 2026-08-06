import { CMSData, Project, Showreel, Service, Category, HeroSettings, AboutSettings, Skill, Experience, Testimonial, SocialLink } from '@/types/cms';
import { getSupabaseBrowserClient } from '@/lib/supabase/client';


// Initial migrated and extended dataset from original portfolio static files
const posterPath = (fileName: string) => `/assets/posters/${fileName}.jpg`;
const posterSeries = (name: string, count: number) =>
  Array.from({ length: count }, (_, index) => posterPath(`${name}_${index + 1}`));

// Sample high-quality HTML5/Cloudinary video streams for demonstration
const SAMPLE_VIDEOS = {
  showreel: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  motionGraphics: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  portraitReel1: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  portraitReel2: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  advertisement: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoylikes.mp4',
  cinematic: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
};

export const INITIAL_CMS_DATA: CMSData = {
  hero: {
    name: 'Thafthaz',
    title: 'Graphic Designer • Visual Communicator',
    headline: 'Crafting visual identities, brand stories, and spatial layouts.',
    description: 'B.Sc. Visual Communication designer creating brand identities, posters, editorial publications, and event graphics.',
    ctaText: 'Enter Exhibition',
    ctaLink: '#project-0',
    profileImageUrl: '/assets/profile/profile.jpeg',
    resumeUrl: '/resume.pdf',
  },

  about: {
    biography:
      'Graphic Designer with a B.Sc. in Visual Communication from St. Aloysius College, Mangalore. Experienced in creating posters, brochures, event branding, educational content, and social media marketing for agencies, institutions, and freelance clients across Mangalore and Calicut.',
    tagline: "Let's create visual identities people remember.",
    subline: 'Specializing in Adobe Creative Cloud (Photoshop, Illustrator, InDesign, Premiere Pro, Lightroom, Fresco) for branding, publications, and commercial layout design.',
    email: 'thafthaz313@gmail.com',
    phone: '+91 82773 89481',
    location: 'Mangalore, Karnataka / Remote',
    availability: 'Open for Commissions, Branding & Poster Design',
  },

  categories: [
    { id: 'cat-1', name: 'All Work', slug: 'all', displayOrder: 0 },
    { id: 'cat-2', name: 'Video Editing', slug: 'video-editing', description: 'Cinematic showreels, client edits, and commercials', displayOrder: 1 },
    { id: 'cat-3', name: 'Motion Graphics', slug: 'motion-graphics', description: '2D & 3D motion design, typography animations', displayOrder: 2 },
    { id: 'cat-4', name: 'Poster Series', slug: 'poster-series', description: 'Spatial layout studies and typographic artwork', displayOrder: 3 },
    { id: 'cat-5', name: 'Social Reels', slug: 'social-reels', description: '9:16 portrait video edits for high-engagement platforms', displayOrder: 4 },
  ],

  showreels: [
    {
      id: 'sr-1',
      title: 'Thafthaz Director & Editing Master Showreel',
      description: 'A montage of commercial edits, motion typography, and brand films created for agencies and institutions.',
      videoUrl: 'https://drive.google.com/file/d/1kmCw1mdh1pJ2H0Gz2_xkO5XAl_LSDjQk/preview',
      thumbnailUrl: 'https://lh3.googleusercontent.com/d/1kmCw1mdh1pJ2H0Gz2_xkO5XAl_LSDjQk',
      duration: '1:45',
      aspectRatio: '16:9',
      isFeatured: true,
    },
    {
      id: 'sr-2',
      title: 'Commercial Motion & Vertical Reel Showcase',
      description: 'Fast-paced vertical social reels, kinetic title sequences, and graphic overlays.',
      videoUrl: 'https://drive.google.com/file/d/1ZQd0pDzdtA1q3Mujmk4tzHINMus_RoTD/preview',
      thumbnailUrl: 'https://lh3.googleusercontent.com/d/1ZQd0pDzdtA1q3Mujmk4tzHINMus_RoTD',
      duration: '1:15',
      aspectRatio: '9:16',
      isFeatured: false,
    },
  ],

  services: [
    {
      id: 'srv-1',
      title: 'Videography & Video Editing',
      description: 'Cinematic camera direction, commercial video production, narrative pacing, sound design, and color grading.',
      icon: 'Video',
      displayOrder: 1,
      isVisible: true,
    },
    {
      id: 'srv-2',
      title: 'Photography',
      description: 'Commercial product shots, brand portraiture, studio key visuals, and editorial photography.',
      icon: 'Camera',
      displayOrder: 2,
      isVisible: true,
    },
    {
      id: 'srv-3',
      title: 'Graphic Design & Poster Series',
      description: 'Minimalist spatial layout design, typography systems, key visuals, and promotional poster artwork.',
      icon: 'Palette',
      displayOrder: 3,
      isVisible: true,
    },
    {
      id: 'srv-4',
      title: 'Motion Graphics & Title Sequences',
      description: 'Dynamic kinetic typography, animated logos, graphic overlays, and 2D/3D visual effects.',
      icon: 'Sparkles',
      displayOrder: 4,
      isVisible: true,
    },
  ],

  experiences: [
    {
      id: 'exp-1',
      role: 'Lead Video Editor & Designer',
      company: 'Studio Exhibition',
      period: '2023 - Present',
      description: 'Directing video post-production, campaign trailers, and brand identity poster series.',
      displayOrder: 1,
    },
    {
      id: 'exp-2',
      role: 'Motion Graphics Artist',
      company: 'Creative Media House',
      period: '2021 - 2023',
      description: 'Created 2D/3D kinetic title sequences, broadcast graphics, and digital advertisements.',
      displayOrder: 2,
    },
  ],

  skills: [
    { id: 'sk-1', name: 'Adobe Premiere Pro', category: 'Editing', proficiency: 96, displayOrder: 1 },
    { id: 'sk-2', name: 'Adobe After Effects', category: 'Motion Graphics', proficiency: 94, displayOrder: 2 },
    { id: 'sk-3', name: 'DaVinci Resolve', category: 'Color Grading', proficiency: 90, displayOrder: 3 },
    { id: 'sk-4', name: 'Photoshop & Illustrator', category: 'Graphic Design', proficiency: 95, displayOrder: 4 },
    { id: 'sk-5', name: 'Typography & Layout', category: 'Design System', proficiency: 98, displayOrder: 5 },
  ],

  testimonials: [
    {
      id: 't-1',
      clientName: 'Artha Capital Creative Team',
      company: 'Artha Capital',
      role: 'Marketing Director',
      avatarUrl: '/assets/profile/profile.jpeg',
      quote: 'Thafthaz transformed our brand vision into an editorial masterpiece. The pacing of the video campaign was flawless.',
      rating: 5,
      displayOrder: 1,
      isPublished: true,
    },
    {
      id: 't-2',
      clientName: 'Elena Rostova',
      company: 'Nova Media',
      role: 'Art Director',
      avatarUrl: '/assets/profile/profile.jpeg',
      quote: 'The poster designs combined with motion graphics exceeded our expectations. Remarkable eye for detail.',
      rating: 5,
      displayOrder: 2,
      isPublished: true,
    },
  ],

  socialLinks: [
    { id: 'sl-1', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram', displayOrder: 1, isVisible: true },
    { id: 'sl-2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin', displayOrder: 2, isVisible: true },
    { id: 'sl-3', platform: 'Email', url: 'mailto:hello@thafthaz.com', icon: 'Mail', displayOrder: 3, isVisible: true },
  ],

  projects: [
    {
      id: 'proj-1',
      slug: 'artha-capital',
      title: 'Artha Capital',
      category: 'Poster Series',
      description: 'A collection of 6 posters created for Artha Capital accompanied by a cinematic brand showreel.',
      client: 'Artha Capital',
      releaseDate: '2026',
      softwareUsed: ['Photoshop', 'Illustrator', 'Premiere Pro'],
      projectType: 'Poster & Commercial Edit',
      thumbnail: '/assets/featured-projects/Artha_Capital_1.jpg',
      videoUrl: SAMPLE_VIDEOS.showreel,
      posters: posterSeries('Artha_Capital', 6),
      media: [
        {
          id: 'm-ac-v1',
          projectId: 'proj-1',
          mediaType: 'video',
          url: SAMPLE_VIDEOS.showreel,
          thumbnailUrl: '/assets/featured-projects/Artha_Capital_1.jpg',
          aspectRatio: '16:9',
          title: 'Brand Film Commercial Cut',
          duration: '1:15',
          displayOrder: 0,
        },
        ...posterSeries('Artha_Capital', 6).map((img, idx) => ({
          id: `m-ac-img-${idx}`,
          projectId: 'proj-1',
          mediaType: 'image' as const,
          url: img,
          aspectRatio: '3:4' as const,
          title: `Poster Layout #${idx + 1}`,
          displayOrder: idx + 1,
        })),
      ],
      isFeatured: true,
      displayOrder: 1,
      isPublished: true,
      metaTitle: 'Artha Capital Brand Posters & Video | Thafthaz',
      metaDescription: 'A poster series and cinematic brand film for Artha Capital.',
    },
    {
      id: 'proj-2',
      slug: 'neon-horizon-reel',
      title: 'Neon Horizon Campaign',
      category: 'Social Reels',
      description: '9:16 dynamic vertical social reel designed for maximum visual retention, color graded with cybernetic palettes.',
      client: 'Horizon Energy',
      releaseDate: '2026',
      softwareUsed: ['After Effects', 'Premiere Pro', 'DaVinci Resolve'],
      projectType: '9:16 Vertical Reel',
      thumbnail: '/assets/featured-projects/deeNet_1.jpg',
      videoUrl: SAMPLE_VIDEOS.portraitReel1,
      posters: [],
      media: [
        {
          id: 'm-nh-v1',
          projectId: 'proj-2',
          mediaType: 'video',
          url: SAMPLE_VIDEOS.portraitReel1,
          thumbnailUrl: '/assets/featured-projects/deeNet_1.jpg',
          aspectRatio: '9:16',
          title: 'Vertical Campaign Reel (9:16)',
          duration: '0:35',
          displayOrder: 0,
        },
        {
          id: 'm-nh-v2',
          projectId: 'proj-2',
          mediaType: 'video',
          url: SAMPLE_VIDEOS.portraitReel2,
          thumbnailUrl: '/assets/featured-projects/Motivate_1.jpg',
          aspectRatio: '9:16',
          title: 'Behind The Scenes Cut (9:16)',
          duration: '0:28',
          displayOrder: 1,
        },
      ],
      isFeatured: true,
      displayOrder: 2,
      isPublished: true,
      metaTitle: 'Neon Horizon Social Reel | Thafthaz',
      metaDescription: '9:16 vertical motion graphics and video reel for mobile platforms.',
    },
    {
      id: 'proj-3',
      slug: 'deenet',
      title: 'deeNet',
      category: 'Poster Series',
      description: 'A collection of 4 posters created for deeNet highlighting structural geometric layouts.',
      client: 'deeNet Tech',
      releaseDate: '2025',
      softwareUsed: ['Photoshop', 'InDesign'],
      projectType: 'Brand Graphics',
      thumbnail: '/assets/featured-projects/deeNet_1.jpg',
      posters: posterSeries('deeNet', 4),
      media: posterSeries('deeNet', 4).map((img, idx) => ({
        id: `m-dn-img-${idx}`,
        projectId: 'proj-3',
        mediaType: 'image' as const,
        url: img,
        aspectRatio: '3:4' as const,
        title: `deeNet Artwork ${idx + 1}`,
        displayOrder: idx,
      })),
      isFeatured: true,
      displayOrder: 3,
      isPublished: true,
    },
    {
      id: 'proj-4',
      slug: 'highland-hospital',
      title: 'Highland Hospital',
      category: 'Poster Series',
      description: 'A collection of 8 posters created for Highland Hospital focusing on modern healthcare visual identity.',
      client: 'Highland Hospital',
      releaseDate: '2025',
      softwareUsed: ['Illustrator', 'Photoshop'],
      projectType: 'Poster Series',
      thumbnail: '/assets/featured-projects/Highland_Hospita_2.jpg',
      posters: posterSeries('Highland_Hospita', 8),
      media: posterSeries('Highland_Hospita', 8).map((img, idx) => ({
        id: `m-hh-img-${idx}`,
        projectId: 'proj-4',
        mediaType: 'image' as const,
        url: img,
        aspectRatio: '3:4' as const,
        title: `Highland Poster ${idx + 1}`,
        displayOrder: idx,
      })),
      isFeatured: true,
      displayOrder: 4,
      isPublished: true,
    },
    {
      id: 'proj-5',
      slug: 'motion-narratives-commercial',
      title: 'Motion Narratives',
      category: 'Video Editing',
      description: 'High-concept commercial cut featuring dynamic pacing, custom sound design, and 21:9 ultra-wide framing.',
      client: 'Vanguard Studios',
      releaseDate: '2026',
      softwareUsed: ['Premiere Pro', 'DaVinci Resolve', 'Audition'],
      projectType: 'Commercial Film Edit',
      thumbnail: '/assets/featured-projects/LogTech_5.jpg',
      videoUrl: SAMPLE_VIDEOS.cinematic,
      posters: [],
      media: [
        {
          id: 'm-mn-v1',
          projectId: 'proj-5',
          mediaType: 'video',
          url: SAMPLE_VIDEOS.cinematic,
          thumbnailUrl: '/assets/featured-projects/LogTech_5.jpg',
          aspectRatio: '21:9',
          title: '21:9 Ultra-wide Director Cut',
          duration: '2:10',
          displayOrder: 0,
        },
      ],
      isFeatured: true,
      displayOrder: 5,
      isPublished: true,
      metaTitle: 'Motion Narratives Commercial Edit | Thafthaz',
      metaDescription: 'Ultra-wide cinematic video edit and audio sound design showcase.',
    },
    {
      id: 'proj-6',
      slug: 'liga-de-football',
      title: 'Liga de Football',
      category: 'Poster Series',
      description: 'A key visual poster created for Liga de Football highlighting sports action and typography.',
      client: 'Liga Football',
      releaseDate: '2025',
      softwareUsed: ['Photoshop'],
      projectType: 'Key Visual Poster',
      thumbnail: '/assets/featured-projects/Liga_de_Football_1.jpg',
      posters: posterSeries('Liga_de_Football', 1),
      media: [
        {
          id: 'm-lf-img-0',
          projectId: 'proj-6',
          mediaType: 'image',
          url: '/assets/featured-projects/Liga_de_Football_1.jpg',
          aspectRatio: '3:4',
          title: 'Liga Key Visual',
          displayOrder: 0,
        },
      ],
      isFeatured: true,
      displayOrder: 6,
      isPublished: true,
    },
    {
      id: 'proj-7',
      slug: 'logtech',
      title: 'LogTech',
      category: 'Poster Series',
      description: 'A extensive collection of 10 posters created for LogTech logistics software visual branding.',
      client: 'LogTech Inc',
      releaseDate: '2025',
      softwareUsed: ['Illustrator', 'Photoshop'],
      projectType: 'Poster System',
      thumbnail: '/assets/featured-projects/LogTech_5.jpg',
      posters: posterSeries('LogTech', 10),
      media: posterSeries('LogTech', 10).map((img, idx) => ({
        id: `m-lt-img-${idx}`,
        projectId: 'proj-7',
        mediaType: 'image' as const,
        url: img,
        aspectRatio: '3:4' as const,
        title: `LogTech Artwork ${idx + 1}`,
        displayOrder: idx,
      })),
      isFeatured: true,
      displayOrder: 7,
      isPublished: true,
    },
    {
      id: 'proj-8',
      slug: 'master-class',
      title: 'Master Class',
      category: 'Poster Series',
      description: 'A poster created for Master Class educational event series.',
      client: 'Master Class',
      releaseDate: '2024',
      softwareUsed: ['Photoshop'],
      projectType: 'Event Poster',
      thumbnail: posterPath('Master_Class_1'),
      posters: posterSeries('Master_Class', 1),
      media: [
        {
          id: 'm-mc-img-0',
          projectId: 'proj-8',
          mediaType: 'image',
          url: posterPath('Master_Class_1'),
          aspectRatio: '3:4',
          title: 'Master Class Poster',
          displayOrder: 0,
        },
      ],
      isFeatured: false,
      displayOrder: 8,
      isPublished: true,
    },
    {
      id: 'proj-9',
      slug: 'motivate',
      title: 'Motivate',
      category: 'Poster Series',
      description: 'A motivational typography poster created for Motivate brand.',
      client: 'Motivate',
      releaseDate: '2025',
      softwareUsed: ['Illustrator'],
      projectType: 'Typography Design',
      thumbnail: '/assets/featured-projects/Motivate_1.jpg',
      posters: posterSeries('Motivate', 1),
      media: [
        {
          id: 'm-mot-img-0',
          projectId: 'proj-9',
          mediaType: 'image',
          url: '/assets/featured-projects/Motivate_1.jpg',
          aspectRatio: '3:4',
          title: 'Motivate Artwork',
          displayOrder: 0,
        },
      ],
      isFeatured: true,
      displayOrder: 9,
      isPublished: true,
    },
    {
      id: 'proj-10',
      slug: 'nova',
      title: 'Nova',
      category: 'Poster Series',
      description: 'A collection of 2 posters created for Nova creative agency.',
      client: 'Nova',
      releaseDate: '2025',
      softwareUsed: ['Photoshop', 'Cinema 4D'],
      projectType: 'Poster Series',
      thumbnail: '/assets/featured-projects/Nova_1.jpg',
      posters: posterSeries('Nova', 2),
      media: posterSeries('Nova', 2).map((img, idx) => ({
        id: `m-nv-img-${idx}`,
        projectId: 'proj-10',
        mediaType: 'image' as const,
        url: img,
        aspectRatio: '3:4' as const,
        title: `Nova Poster ${idx + 1}`,
        displayOrder: idx,
      })),
      isFeatured: true,
      displayOrder: 10,
      isPublished: true,
    },
    {
      id: 'proj-11',
      slug: 'oes',
      title: 'OES',
      category: 'Poster Series',
      description: 'A collection of 2 posters created for OES engineering solutions.',
      client: 'OES',
      releaseDate: '2024',
      softwareUsed: ['Illustrator'],
      projectType: 'Brand Poster',
      thumbnail: posterPath('OES_1'),
      posters: posterSeries('OES', 2),
      media: posterSeries('OES', 2).map((img, idx) => ({
        id: `m-oes-img-${idx}`,
        projectId: 'proj-11',
        mediaType: 'image' as const,
        url: img,
        aspectRatio: '3:4' as const,
        title: `OES Poster ${idx + 1}`,
        displayOrder: idx,
      })),
      isFeatured: false,
      displayOrder: 11,
      isPublished: true,
    },
    {
      id: 'proj-12',
      slug: 'ovalen',
      title: 'Ovalen',
      category: 'Poster Series',
      description: 'A minimal artwork created for Ovalen cosmetics.',
      client: 'Ovalen',
      releaseDate: '2024',
      softwareUsed: ['Photoshop'],
      projectType: 'Product Poster',
      thumbnail: posterPath('Ovalen_1'),
      posters: posterSeries('Ovalen', 1),
      media: [
        {
          id: 'm-ov-img-0',
          projectId: 'proj-12',
          mediaType: 'image',
          url: posterPath('Ovalen_1'),
          aspectRatio: '3:4',
          title: 'Ovalen Key Visual',
          displayOrder: 0,
        },
      ],
      isFeatured: false,
      displayOrder: 12,
      isPublished: true,
    },
    {
      id: 'proj-13',
      slug: 'shiraz',
      title: 'Shiraz',
      category: 'Poster Series',
      description: 'A poster created for Shiraz luxury dining brand.',
      client: 'Shiraz',
      releaseDate: '2025',
      softwareUsed: ['Photoshop', 'Lightroom'],
      projectType: 'Luxury Artwork',
      thumbnail: '/assets/featured-projects/Shiraz_1.jpg',
      posters: posterSeries('Shiraz', 1),
      media: [
        {
          id: 'm-sh-img-0',
          projectId: 'proj-13',
          mediaType: 'image',
          url: '/assets/featured-projects/Shiraz_1.jpg',
          aspectRatio: '3:4',
          title: 'Shiraz Poster',
          displayOrder: 0,
        },
      ],
      isFeatured: true,
      displayOrder: 13,
      isPublished: true,
    },
    {
      id: 'proj-14',
      slug: 'st-aloysius',
      title: 'St Aloysius',
      category: 'Poster Series',
      description: 'A collection of 3 posters created for St Aloysius institution.',
      client: 'St Aloysius',
      releaseDate: '2025',
      softwareUsed: ['Photoshop', 'Illustrator'],
      projectType: 'Institutional Artwork',
      thumbnail: '/assets/featured-projects/St_Aloysius_2.jpg',
      posters: posterSeries('St_Aloysius', 3),
      media: posterSeries('St_Aloysius', 3).map((img, idx) => ({
        id: `m-sa-img-${idx}`,
        projectId: 'proj-14',
        mediaType: 'image' as const,
        url: img,
        aspectRatio: '3:4' as const,
        title: `St Aloysius Poster ${idx + 1}`,
        displayOrder: idx,
      })),
      isFeatured: true,
      displayOrder: 14,
      isPublished: true,
    },
    {
      id: 'proj-15',
      slug: 'tokyo-bistro',
      title: 'Tokyo Bistro',
      category: 'Poster Series',
      description: 'A poster created for Tokyo Bistro Japanese restaurant key branding.',
      client: 'Tokyo Bistro',
      releaseDate: '2025',
      softwareUsed: ['Photoshop'],
      projectType: 'Culinary Art Poster',
      thumbnail: '/assets/featured-projects/Tokyo_Bistro_1.jpg',
      posters: posterSeries('Tokyo_Bistro', 1),
      media: [
        {
          id: 'm-tb-img-0',
          projectId: 'proj-15',
          mediaType: 'image',
          url: '/assets/featured-projects/Tokyo_Bistro_1.jpg',
          aspectRatio: '3:4',
          title: 'Tokyo Bistro Poster',
          displayOrder: 0,
        },
      ],
      isFeatured: true,
      displayOrder: 15,
      isPublished: true,
    },
    {
      id: 'proj-16',
      slug: 'travel-pack',
      title: 'Travel Pack',
      category: 'Poster Series',
      description: 'An extensive collection of 25 posters created for Travel Pack tourism series.',
      client: 'Travel Pack Co',
      releaseDate: '2025',
      softwareUsed: ['Photoshop', 'Lightroom'],
      projectType: 'Travel Poster Collection',
      thumbnail: '/assets/featured-projects/Travel_Pack_6.jpg',
      posters: posterSeries('Travel_Pack', 25),
      media: posterSeries('Travel_Pack', 25).map((img, idx) => ({
        id: `m-tp-img-${idx}`,
        projectId: 'proj-16',
        mediaType: 'image' as const,
        url: img,
        aspectRatio: '3:4' as const,
        title: `Travel Pack Poster ${idx + 1}`,
        displayOrder: idx,
      })),
      isFeatured: true,
      displayOrder: 16,
      isPublished: true,
    },
  ],
};

// In-memory runtime data cache (allowing admin edits to persist during current dev session)
let memoryStore: CMSData = JSON.parse(JSON.stringify(INITIAL_CMS_DATA));

export class CMSDataService {
  static async getHero(): Promise<HeroSettings> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('hero_settings').select('*').limit(1).single();
        if (data && !error) {
          return {
            name: data.name,
            title: data.title,
            headline: data.headline,
            description: data.description,
            ctaText: data.cta_text,
            ctaLink: data.cta_link,
            profileImageUrl: data.profile_image_url,
            resumeUrl: data.resume_url,
          };
        }
      } catch {}
    }
    return memoryStore.hero;
  }

  static async getAbout(): Promise<AboutSettings> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('about_settings').select('*').limit(1).single();
        if (data && !error) {
          return {
            biography: data.biography,
            tagline: data.tagline,
            subline: data.subline,
            email: data.email,
            phone: data.phone || '',
            location: data.location,
            availability: data.availability,
          };
        }
      } catch {}
    }
    return memoryStore.about;
  }

  static async getCategories(): Promise<Category[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('categories').select('*').order('display_order');
        if (data && data.length > 0 && !error) {
          return data.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            description: c.description || undefined,
            displayOrder: c.display_order,
          }));
        }
      } catch {}
    }
    return memoryStore.categories;
  }

  static async getProjects(categorySlug?: string, featuredOnly?: boolean): Promise<Project[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        let query = supabase.from('projects').select('*').eq('is_published', true).order('display_order');
        if (featuredOnly) query = query.eq('is_featured', true);
        const { data, error } = await query;
        if (data && data.length > 0 && !error) {
          let list: Project[] = data.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            category: p.category_name || 'Visual Work',
            description: p.description,
            client: p.client || '',
            releaseDate: p.release_date || '',
            softwareUsed: p.software_used || [],
            projectType: p.project_type || 'Visual Work',
            thumbnail: p.thumbnail_url,
            videoUrl: p.video_url || undefined,
            posters: p.posters || [p.thumbnail_url],
            media: (p.posters || []).map((img: string, idx: number) => ({
              id: `m-${p.id}-${idx}`,
              projectId: p.id,
              mediaType: 'image' as const,
              url: img,
              aspectRatio: '3:4' as const,
              title: `${p.title} Asset ${idx + 1}`,
              displayOrder: idx,
            })),
            isFeatured: p.is_featured,
            displayOrder: p.display_order,
            isPublished: p.is_published,
          }));

          if (categorySlug && categorySlug !== 'all') {
            list = list.filter(
              (p) =>
                p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug ||
                p.projectType.toLowerCase().replace(/\s+/g, '-') === categorySlug
            );
          }
          return list;
        }
      } catch {}
    }

    let list = memoryStore.projects.filter((p) => p.isPublished);

    if (featuredOnly) {
      list = list.filter((p) => p.isFeatured);
    }

    if (categorySlug && categorySlug !== 'all') {
      list = list.filter(
        (p) =>
          p.category.toLowerCase().replace(/\s+/g, '-') === categorySlug ||
          p.projectType.toLowerCase().replace(/\s+/g, '-') === categorySlug
      );
    }

    return list.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  static async getProjectBySlug(slug: string): Promise<Project | null> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('projects').select('*').eq('slug', slug).single();
        if (data && !error) {
          return {
            id: data.id,
            slug: data.slug,
            title: data.title,
            category: data.category_name || 'Visual Work',
            description: data.description,
            client: data.client || '',
            releaseDate: data.release_date || '',
            softwareUsed: data.software_used || [],
            projectType: data.project_type || 'Visual Work',
            thumbnail: data.thumbnail_url,
            videoUrl: data.video_url || undefined,
            posters: data.posters || [data.thumbnail_url],
            media: (data.posters || []).map((img: string, idx: number) => ({
              id: `m-${data.id}-${idx}`,
              projectId: data.id,
              mediaType: 'image' as const,
              url: img,
              aspectRatio: '3:4' as const,
              title: `${data.title} Asset ${idx + 1}`,
              displayOrder: idx,
            })),
            isFeatured: data.is_featured,
            displayOrder: data.display_order,
            isPublished: data.is_published,
          };
        }
      } catch {}
    }
    const project = memoryStore.projects.find((p) => p.slug === slug);
    return project || null;
  }

  static async getFeaturedShowreel(): Promise<Showreel | null> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('showreels').select('*').eq('is_featured', true).limit(1).single();
        if (data && !error) {
          return {
            id: data.id,
            title: data.title,
            description: data.description,
            videoUrl: data.video_url,
            thumbnailUrl: data.thumbnail_url,
            duration: data.duration || '1:30',
            aspectRatio: (data.aspect_ratio as any) || '16:9',
            isFeatured: data.is_featured,
          };
        }
      } catch {}
    }
    const showreel = memoryStore.showreels.find((sr) => sr.isFeatured);
    return showreel || memoryStore.showreels[0] || null;
  }

  static async getAllShowreels(): Promise<Showreel[]> {
    return memoryStore.showreels;
  }

  static async getServices(): Promise<Service[]> {
    return memoryStore.services.filter((s) => s.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  static async getExperiences(): Promise<Experience[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('experiences').select('*').order('display_order');
        if (data && data.length > 0 && !error) {
          return data.map((exp) => ({
            id: exp.id,
            role: exp.role,
            company: exp.company,
            period: exp.period,
            description: exp.description || undefined,
            displayOrder: exp.display_order,
          }));
        }
      } catch {}
    }
    return memoryStore.experiences.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  static async getSkills(): Promise<Skill[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('skills').select('*').order('display_order');
        if (data && data.length > 0 && !error) {
          return data.map((s) => ({
            id: s.id,
            name: s.name,
            category: s.category,
            proficiency: s.proficiency,
            displayOrder: s.display_order,
          }));
        }
      } catch {}
    }
    return memoryStore.skills.sort((a, b) => a.displayOrder - b.displayOrder);
  }

  static async getTestimonials(): Promise<Testimonial[]> {
    return memoryStore.testimonials.filter((t) => t.isPublished).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  static async getSocialLinks(): Promise<SocialLink[]> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('social_links').select('*').eq('is_visible', true).order('display_order');
        if (data && data.length > 0 && !error) {
          return data.map((s) => ({
            id: s.id,
            platform: s.platform,
            url: s.url,
            icon: s.icon,
            displayOrder: s.display_order,
            isVisible: s.is_visible,
          }));
        }
      } catch {}
    }
    return memoryStore.socialLinks.filter((s) => s.isVisible).sort((a, b) => a.displayOrder - b.displayOrder);
  }

  // Admin Mutation Handlers
  static async updateHero(data: Partial<HeroSettings>): Promise<HeroSettings> {
    memoryStore.hero = { ...memoryStore.hero, ...data };
    return memoryStore.hero;
  }

  static async updateAbout(data: Partial<AboutSettings>): Promise<AboutSettings> {
    memoryStore.about = { ...memoryStore.about, ...data };
    return memoryStore.about;
  }

  static async saveProject(projectData: Partial<Project>): Promise<Project> {
    const supabase = getSupabaseBrowserClient();
    if (supabase) {
      try {
        const payload = {
          title: projectData.title || 'Untitled Project',
          slug: projectData.slug || `project-${Date.now()}`,
          category_name: projectData.category || 'Visual Work',
          description: projectData.description || '',
          client: projectData.client || '',
          release_date: projectData.releaseDate || new Date().getFullYear().toString(),
          software_used: projectData.softwareUsed || ['Photoshop'],
          project_type: projectData.projectType || 'Visual Work',
          thumbnail_url: projectData.thumbnail || '/assets/featured-projects/Artha_Capital_1.jpg',
          video_url: projectData.videoUrl,
          posters: projectData.posters || [],
          is_featured: projectData.isFeatured ?? true,
          is_published: projectData.isPublished ?? true,
        };

        if (projectData.id && !projectData.id.startsWith('proj-')) {
          const { data, error } = await supabase.from('projects').update(payload).eq('id', projectData.id).select().single();
          if (error) {
            console.error('❌ Supabase Project Update Error:', error);
          }
          if (data && !error) {
            return {
              id: data.id,
              slug: data.slug,
              title: data.title,
              category: data.category_name,
              description: data.description,
              client: data.client,
              releaseDate: data.release_date,
              softwareUsed: data.software_used,
              projectType: data.project_type,
              thumbnail: data.thumbnail_url,
              videoUrl: data.video_url,
              posters: data.posters || [],
              media: projectData.media && projectData.media.length > 0 ? projectData.media : (data.posters || []).map((img: string, idx: number) => ({
                id: `m-${data.id}-${idx}`,
                projectId: data.id,
                mediaType: 'image' as const,
                url: img,
                aspectRatio: '3:4' as const,
                title: `${data.title} Asset ${idx + 1}`,
                displayOrder: idx,
              })),
              isFeatured: data.is_featured,
              displayOrder: data.display_order,
              isPublished: data.is_published,
            };
          }
        } else {
          const { data, error } = await supabase.from('projects').insert([payload]).select().single();
          if (error) {
            console.error('❌ Supabase Project Insert Error:', error);
          }
          if (data && !error) {
            return {
              id: data.id,
              slug: data.slug,
              title: data.title,
              category: data.category_name,
              description: data.description,
              client: data.client,
              releaseDate: data.release_date,
              softwareUsed: data.software_used,
              projectType: data.project_type,
              thumbnail: data.thumbnail_url,
              videoUrl: data.video_url,
              posters: data.posters || [],
              media: projectData.media && projectData.media.length > 0 ? projectData.media : (data.posters || []).map((img: string, idx: number) => ({
                id: `m-${data.id}-${idx}`,
                projectId: data.id,
                mediaType: 'image' as const,
                url: img,
                aspectRatio: '3:4' as const,
                title: `${data.title} Asset ${idx + 1}`,
                displayOrder: idx,
              })),
              isFeatured: data.is_featured,
              displayOrder: data.display_order,
              isPublished: data.is_published,
            };
          }
        }
      } catch (err) {
        console.error('❌ Unexpected error in saveProject:', err);
      }
    }

    if (projectData.id) {
      const idx = memoryStore.projects.findIndex((p) => p.id === projectData.id);
      if (idx !== -1) {
        memoryStore.projects[idx] = { ...memoryStore.projects[idx], ...projectData } as Project;
        return memoryStore.projects[idx];
      }
    }

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      slug: projectData.slug || `project-${Date.now()}`,
      title: projectData.title || 'Untitled Project',
      category: projectData.category || 'Visual Work',
      description: projectData.description || '',
      client: projectData.client || '',
      releaseDate: projectData.releaseDate || new Date().getFullYear().toString(),
      softwareUsed: projectData.softwareUsed || ['Photoshop'],
      projectType: projectData.projectType || 'Visual Work',
      thumbnail: projectData.thumbnail || '/assets/featured-projects/Artha_Capital_1.jpg',
      videoUrl: projectData.videoUrl,
      posters: projectData.posters || [],
      media: projectData.media || [],
      isFeatured: projectData.isFeatured ?? true,
      displayOrder: memoryStore.projects.length + 1,
      isPublished: projectData.isPublished ?? true,
    };

    memoryStore.projects.push(newProject);
    return newProject;
  }

  static async deleteProject(id: string): Promise<boolean> {
    const supabase = getSupabaseBrowserClient();
    if (supabase && !id.startsWith('proj-')) {
      try {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (!error) return true;
      } catch {}
    }
    const initialLength = memoryStore.projects.length;
    memoryStore.projects = memoryStore.projects.filter((p) => p.id !== id);
    return memoryStore.projects.length < initialLength;
  }
}

