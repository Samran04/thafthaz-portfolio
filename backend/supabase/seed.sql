-- Seed Data for Thafthaz Dynamic Portfolio & CMS

-- 1. Hero Settings Seed
INSERT INTO hero_settings (name, title, headline, description, cta_text, cta_link, profile_image_url, resume_url)
VALUES (
  'Thafthaz',
  'Video Editor • Graphic Designer',
  'Crafting visual stories that leave an impression.',
  'Immersive digital experiences shaped through editorial movement, layout rhythm, and spatial restraint.',
  'Enter Exhibition',
  '#project-0',
  '/assets/profile/profile.jpeg',
  '/resume.pdf'
) ON CONFLICT DO NOTHING;

-- 2. About Settings Seed
INSERT INTO about_settings (biography, tagline, subline, email, phone, location, availability)
VALUES (
  'With over 5 years of experience crafting visual narratives across video editing, motion design, and brand posters, I blend editorial pacing with stark layout precision. Every frame is curated with intention, rhythm, and typographic hierarchy.',
  'Let''s create something people remember.',
  'Collaborating on visual identities, cinematic editing sequences, and layouts that leave a lasting imprint.',
  'hello@thafthaz.com',
  '+91 98765 43210',
  'Mangalore, Karnataka / Worldwide',
  'Open for Select Commissions & Showreels'
) ON CONFLICT DO NOTHING;

-- 3. Categories Seed
INSERT INTO categories (name, slug, description, display_order) VALUES
('All Work', 'all', 'Complete portfolio index', 0),
('Video Editing', 'video-editing', 'Cinematic showreels, commercial edits, and short films', 1),
('Motion Graphics', 'motion-graphics', '2D & 3D motion typography and visual FX', 2),
('Poster Series', 'poster-series', 'Minimalist typography artwork and spatial layouts', 3),
('Social Reels', 'social-reels', '9:16 portrait video edits engineered for high engagement', 4),
('Photo Editing', 'photo-editing', 'Professional photo editing, color correction, and retouching', 5)
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

-- 4. Showreels Seed
INSERT INTO showreels (title, description, video_url, thumbnail_url, duration, aspect_ratio, is_featured, display_order) VALUES
(
  '2026 Director & Editing Showreel',
  'A montage of commercial edits, motion typography, and brand films created over the past year.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  '/assets/featured-projects/Artha_Capital_1.jpg',
  '1:45',
  '16:9',
  TRUE,
  1
),
(
  'Experimental Motion & Kinetic Type',
  'Explorations in typographic animation, sound-reactive pacing, and spatial layout design.',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  '/assets/posters/Typography_Minimal_1.jpg',
  '1:12',
  '16:9',
  FALSE,
  2
) ON CONFLICT DO NOTHING;

-- 5. Projects Seed
INSERT INTO projects (
  title, slug, category_name, description, client, release_date, software_used, project_type, thumbnail_url, video_url, posters, is_featured, display_order, is_published
) VALUES 
(
  'Institutional Event Branding & Posters',
  'st-aloysius-event-branding',
  'Poster Series',
  'Comprehensive poster series, event branding, brochures, and promotional visual design created for college events, cultural festivals, and academic forums at St. Aloysius College.',
  'St. Aloysius College, Mangalore',
  '2024 - 2026',
  ARRAY['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'],
  'Institutional Branding & Posters',
  'https://drive.google.com/thumbnail?id=11Qz1Zdcikc6Qs0KrqqIJrJN6sEnZ_1ou&sz=w1000',
  'https://drive.google.com/drive/folders/11Qz1Zdcikc6Qs0KrqqIJrJN6sEnZ_1ou',
  ARRAY['https://lh3.googleusercontent.com/d/11Qz1Zdcikc6Qs0KrqqIJrJN6sEnZ_1ou'],
  TRUE,
  1,
  TRUE
),
(
  'Commercial Campaigns & Social Media Creatives',
  'mostly-add-commercial-branding',
  'Poster Series',
  'Commercial advertisements, brand identities, social media campaigns, and marketing collateral designed for clients at Mostly Add agency, Mangalore.',
  'Mostly Add Agency, Mangalore',
  '2023 - 2026',
  ARRAY['Adobe Photoshop', 'Adobe Illustrator', 'Adobe Lightroom'],
  'Commercial Brand Design',
  'https://drive.google.com/thumbnail?id=1GeH6se-oUMNX4Z8lGFG2ySxKP1C3MDXU&sz=w1000',
  'https://drive.google.com/drive/folders/1GeH6se-oUMNX4Z8lGFG2ySxKP1C3MDXU',
  ARRAY['https://lh3.googleusercontent.com/d/1GeH6se-oUMNX4Z8lGFG2ySxKP1C3MDXU'],
  TRUE,
  2,
  TRUE
),
(
  'Markaz Publication & Event Design',
  'markaz-calicut-publications',
  'Poster Series',
  'Official publication covers, event banners, conference materials, and cultural graphics designed for Markaz Saqafathu Sunniyya, Calicut.',
  'Markaz Saqafathu Sunniyya, Calicut',
  '2021 - 2023',
  ARRAY['Adobe InDesign', 'Adobe Photoshop', 'Adobe Fresco'],
  'Publication & Event Design',
  '/assets/posters/Typography_Minimal_1.jpg',
  NULL,
  ARRAY['/assets/posters/Typography_Minimal_1.jpg', '/assets/posters/Typography_Minimal_2.jpg'],
  TRUE,
  3,
  TRUE
),
(
  'Educational Visual Identity & Certificates',
  'thajul-ulama-school-identity',
  'Poster Series',
  'Educational materials, certificates, banners, and promotional campus graphics designed for Thajul Ulama English Medium School.',
  'Thajul Ulama School, Thalakki',
  '2020 - 2022',
  ARRAY['Adobe Illustrator', 'Adobe Photoshop', 'Adobe Fresco'],
  'Educational Design',
  '/assets/posters/Social_Reel_1.jpg',
  NULL,
  ARRAY['/assets/posters/Social_Reel_1.jpg'],
  TRUE,
  4,
  TRUE
),
(
  'Iconn Studios Motion & Reel Series',
  'iconn-studios-motion-reels',
  'Social Reels',
  '9:16 vertical video edits, social media reels, and visual motion sequences crafted under Iconn Studios branding.',
  'Iconn Studios',
  '2025 - 2026',
  ARRAY['Adobe Premiere Pro', 'Adobe Photoshop'],
  'Social Video Edit',
  '/assets/featured-projects/Artha_Capital_1.jpg',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  ARRAY['/assets/featured-projects/Artha_Capital_1.jpg'],
  TRUE,
  5,
  TRUE
) ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description;
