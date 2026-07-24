import { redirect } from 'next/navigation';

export default async function PortfolioAliasPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/work/${slug}`);
}
