You are now acting as a Senior Product Designer, Senior Frontend Architect, UX Designer, QA Engineer, and Responsive Design Specialist.

Your task is NOT to continue adding features.

Your task is to stop feature development and perform a complete UX, UI, architecture, responsiveness, accessibility, and layout audit of the entire portfolio.

Treat the current implementation as Version 1.

Your responsibility is to evolve it into a polished production-quality portfolio.

====================================================

FIRST

Perform a complete diagnosis.

Inspect the entire codebase.

Identify every issue affecting

• Information Architecture
• UX
• UI
• Responsive Design
• Mobile Experience
• Desktop Experience
• Navigation
• Typography
• Visual Hierarchy
• Spacing
• Grid System
• Accessibility
• Consistency
• Component Reusability
• Animation
• Performance

Do NOT immediately modify code.

First determine every issue.

====================================================

HOMEPAGE

The homepage currently contains too much information.

It feels overloaded.

The homepage should behave like a premium creative studio landing page.

Reduce cognitive load.

The homepage should only contain

• Hero
• Featured Services
• About Preview
• Featured Showreel
• Selected Work Preview
• Final CTA

Move large informational sections to dedicated pages.

====================================================

SITE ARCHITECTURE

Create a cleaner information architecture.

Recommended pages:

/

About

Services

Work

Showreel

Contact

Admin (future)

Education & Career Timeline

====================================================

EDUCATION SECTION

Remove the Education & Career Timeline from the homepage.

Create a dedicated page.

This page should include

• Education
• Timeline
• Experience
• Certifications
• Religious Studies
• Freelance Journey

Maintain the existing design language.

Do not redesign.

Simply reorganize.

====================================================

WORK PAGE

Portfolio categories should live here.

The homepage should only display featured projects.

The Work page should display

• Posters

• Branding

• Motion Graphics

• Photography

• Commercial Campaigns

• Event Coverage

• Showreels

Each category should eventually become dynamically powered from Supabase.

====================================================

NAVIGATION

Redesign the navigation architecture.

The navigation should feel similar to premium creative studios.

Avoid a giant one-page website.

Navigation should guide users naturally through the portfolio.

====================================================

RESPONSIVE DESIGN

This is currently the weakest part of the project.

The mobile experience feels like a compressed desktop layout.

Redesign ONLY the mobile composition.

Do NOT redesign branding.

Maintain

• colors
• typography
• animations
• visual language

while creating layouts that feel intentionally designed for phones.

Increase content width.

Improve spacing.

Improve readability.

Improve hierarchy.

Remove cramped layouts.

Remove inconsistent margins.

Remove awkward wrapping.

Improve CTA placement.

Improve footer spacing.

Every section should feel designed specifically for mobile.

====================================================

LAYOUT SYSTEM

Audit

Containers

Padding

Margins

Gap

Grid

Breakpoints

Overflow

Flex layouts

Alignment

Component sizing

Remove every visual inconsistency.

====================================================

DESIGN CONSISTENCY

Every component should belong to one unified design system.

Spacing

Corner radius

Buttons

Cards

Typography

Hover states

Icons

Badges

Animations

Everything should follow the same system.

====================================================

PERFORMANCE

Remove unnecessary rendering.

Improve lazy loading.

Optimize images.

Optimize layout shifts.

Maintain SEO.

====================================================

FINAL GOAL

Do NOT simply make the website responsive.

Transform Version 1 into a production-ready premium creative portfolio suitable for a creative director.

Think like the design team at Linear, Framer, Apple, Stripe, or Awwwards-winning creative agencies.

The goal is refinement, clarity, simplicity, and intentionality—not adding more features.-- PostgreSQL Database Schema for Thafthaz Dynamic Portfolio & CMS

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Hero Settings Table
CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL DEFAULT 'Thafthaz',
  title TEXT NOT NULL DEFAULT 'Video Editor • Graphic Designer',
  headline TEXT NOT NULL DEFAULT 'Crafting visual stories that leave an impression.',
  description TEXT NOT NULL DEFAULT 'Immersive digital experiences shaped through editorial movement, layout rhythm, and spatial restraint.',
  cta_text TEXT NOT NULL DEFAULT 'Enter Exhibition',
  cta_link TEXT NOT NULL DEFAULT '#project-0',
  profile_image_url TEXT NOT NULL DEFAULT '/assets/profile/profile.jpeg',
  resume_url TEXT DEFAULT '/resume.pdf',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. About & Profile Settings Table
CREATE TABLE IF NOT EXISTS about_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  biography TEXT NOT NULL,
  tagline TEXT NOT NULL DEFAULT 'Let''s create something people remember.',
  subline TEXT NOT NULL DEFAULT 'Collaborating on visual identities, cinematic editing sequences, and layouts that leave a lasting imprint.',
  email TEXT NOT NULL DEFAULT 'hello@thafthaz.com',
  phone TEXT DEFAULT '+91 98765 43210',
  location TEXT DEFAULT 'Global / Remote',
  availability TEXT DEFAULT 'Available for Select Projects',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_name TEXT NOT NULL, -- Cached category name for fast rendering
  description TEXT NOT NULL,
  client TEXT,
  release_date TEXT,
  software_used TEXT[] DEFAULT '{}',
  project_type TEXT NOT NULL DEFAULT 'Visual Work', -- e.g. Video Edit, Motion Graphics, Poster Series
  thumbnail_url TEXT NOT NULL,
  video_url TEXT, -- Primary feature video if applicable
  is_featured BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  meta_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Project Media Table (Supports Gallery Images and Multiple Videos)
CREATE TABLE IF NOT EXISTS project_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video')),
  url TEXT NOT NULL, -- Supabase Storage URL for images, Cloudinary URL for videos
  thumbnail_url TEXT, -- Custom thumbnail for videos
  aspect_ratio TEXT DEFAULT '16:9' CHECK (aspect_ratio IN ('16:9', '9:16', '21:9', '1:1', '3:4', '4:3')),
  title TEXT,
  duration TEXT, -- Display duration e.g. "0:45"
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Featured Showreels Table
CREATE TABLE IF NOT EXISTS showreels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL DEFAULT 'Main Showreel',
  description TEXT,
  video_url TEXT NOT NULL, -- Cloudinary streaming URL
  thumbnail_url TEXT NOT NULL,
  duration TEXT DEFAULT '1:30',
  aspect_ratio TEXT DEFAULT '16:9',
  is_featured BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Video',
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Experiences & Timeline Table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  period TEXT NOT NULL, -- e.g. "2023 - Present"
  description TEXT,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Editing & Design',
  proficiency INT DEFAULT 90, -- 1-100
  display_order INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name TEXT NOT NULL,
  company TEXT,
  role TEXT,
  avatar_url TEXT,
  quote TEXT NOT NULL,
  rating INT DEFAULT 5,
  display_order INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Social Links Table
CREATE TABLE IF NOT EXISTS social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  platform TEXT NOT NULL, -- e.g. Instagram, LinkedIn, YouTube, Twitter
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  display_order INT DEFAULT 0,
  is_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE hero_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE showreels ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- Public Read Access Policies
CREATE POLICY "Allow public read hero_settings" ON hero_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read about_settings" ON about_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read published projects" ON projects FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read project_media" ON project_media FOR SELECT USING (true);
CREATE POLICY "Allow public read showreels" ON showreels FOR SELECT USING (true);
CREATE POLICY "Allow public read visible services" ON services FOR SELECT USING (is_visible = true);
CREATE POLICY "Allow public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Allow public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read published testimonials" ON testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read visible social_links" ON social_links FOR SELECT USING (is_visible = true);

-- Authenticated Admin Read/Write Access Policies
CREATE POLICY "Allow authenticated full access hero_settings" ON hero_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access about_settings" ON about_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access projects" ON projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access project_media" ON project_media FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access showreels" ON showreels FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access experiences" ON experiences FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access skills" ON skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access social_links" ON social_links FOR ALL USING (auth.role() = 'authenticated');
