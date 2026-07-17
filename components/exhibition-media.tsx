interface ExhibitionMediaProps { imageSrc: string; alt: string; }

export function ExhibitionMedia({ imageSrc, alt }: ExhibitionMediaProps) {
  return (
    <div className="relative flex h-full w-full max-h-[72vh] items-center justify-center md:max-h-[76vh]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageSrc} alt={alt} className="h-auto max-h-full w-auto max-w-full rounded-[1.5rem] border border-white/10 object-contain shadow-2xl" />
    </div>
  );
}