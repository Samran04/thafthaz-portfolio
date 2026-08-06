export type Project = {
  slug: string;
  title: string;
  category: string;
  image: string;
  posters: string[];
  description: string;
  isFeatured?: boolean;
};

const posterPath = (fileName: string) => `/assets/posters/${fileName}.jpg`;
const posterSeries = (name: string, count: number) => Array.from({ length: count }, (_, index) => posterPath(`${name}_${index + 1}`));

export const projects: Project[] = [
  { slug: 'artha-capital', title: 'Artha Capital', category: 'Poster Series', image: '/assets/featured-projects/Artha_Capital_1.jpg', posters: posterSeries('Artha_Capital', 6), description: 'A collection of 6 posters created for Artha Capital.', isFeatured: true },
  { slug: 'deenet', title: 'deeNet', category: 'Poster Series', image: '/assets/featured-projects/deeNet_1.jpg', posters: posterSeries('deeNet', 4), description: 'A collection of 4 posters created for deeNet.', isFeatured: true },
  { slug: 'highland-hospital', title: 'Highland Hospital', category: 'Poster Series', image: '/assets/featured-projects/Highland_Hospita_2.jpg', posters: posterSeries('Highland_Hospita', 8), description: 'A collection of 8 posters created for Highland Hospital.', isFeatured: true },
  { slug: 'liga-de-football', title: 'Liga de Football', category: 'Poster Series', image: '/assets/featured-projects/Liga_de_Football_1.jpg', posters: posterSeries('Liga_de_Football', 1), description: 'A poster created for Liga de Football.', isFeatured: true },
  { slug: 'logtech', title: 'LogTech', category: 'Poster Series', image: '/assets/featured-projects/LogTech_5.jpg', posters: posterSeries('LogTech', 10), description: 'A collection of 10 posters created for LogTech.', isFeatured: true },
  { slug: 'master-class', title: 'Master Class', category: 'Poster Series', image: posterPath('Master_Class_1'), posters: posterSeries('Master_Class', 1), description: 'A poster created for Master Class.' },
  { slug: 'motivate', title: 'Motivate', category: 'Poster Series', image: '/assets/featured-projects/Motivate_1.jpg', posters: posterSeries('Motivate', 1), description: 'A poster created for Motivate.', isFeatured: true },
  { slug: 'nova', title: 'Nova', category: 'Poster Series', image: '/assets/featured-projects/Nova_1.jpg', posters: posterSeries('Nova', 2), description: 'A collection of 2 posters created for Nova.', isFeatured: true },
  { slug: 'oes', title: 'OES', category: 'Poster Series', image: posterPath('OES_1'), posters: posterSeries('OES', 2), description: 'A collection of 2 posters created for OES.' },
  { slug: 'ovalen', title: 'Ovalen', category: 'Poster Series', image: posterPath('Ovalen_1'), posters: posterSeries('Ovalen', 1), description: 'A poster created for Ovalen.' },
  { slug: 'shiraz', title: 'Shiraz', category: 'Poster Series', image: '/assets/featured-projects/Shiraz_1.jpg', posters: posterSeries('Shiraz', 1), description: 'A poster created for Shiraz.', isFeatured: true },
  { slug: 'st-aloysius', title: 'St Aloysius', category: 'Poster Series', image: '/assets/featured-projects/St_Aloysius_2.jpg', posters: posterSeries('St_Aloysius', 3), description: 'A collection of 3 posters created for St Aloysius.', isFeatured: true },
  { slug: 'tokyo-bistro', title: 'Tokyo Bistro', category: 'Poster Series', image: '/assets/featured-projects/Tokyo_Bistro_1.jpg', posters: posterSeries('Tokyo_Bistro', 1), description: 'A poster created for Tokyo Bistro.', isFeatured: true },
  { slug: 'travel-pack', title: 'Travel Pack', category: 'Poster Series', image: '/assets/featured-projects/Travel_Pack_6.jpg', posters: posterSeries('Travel_Pack', 25), description: 'A collection of 25 posters created for Travel Pack.', isFeatured: true },
];