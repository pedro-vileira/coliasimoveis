'use client';

import { useEffect, useState } from 'react';

export function PropertyGallery({ images, code }: { images: string[]; code: string }) {
  const [active, setActive] = useState<number | null>(null);
  const validImages = images.filter(Boolean);
  const close = () => setActive(null);
  const previous = () => setActive((current) => current === null ? null : (current - 1 + validImages.length) % validImages.length);
  const next = () => setActive((current) => current === null ? null : (current + 1) % validImages.length);

  useEffect(() => {
    if (active === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') previous();
      if (event.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [active, validImages.length]);

  if (!validImages.length) return <div className="gallery-caption">IMAGENS NÃO DISPONÍVEIS</div>;
  return <>
    <div className="detail-gallery">
      <button type="button" className="detail-main-image gallery-trigger" style={{ backgroundImage: `url('${validImages[0]}')` }} onClick={() => setActive(0)} aria-label={`Ampliar imagem 1 do imóvel ${code}`}><span>AMPLIAR IMAGEM ↗</span></button>
      <div className="detail-gallery-side">
        {validImages.slice(1, 3).map((src, i) => <button type="button" key={src} className="detail-side-image gallery-trigger" style={{ backgroundImage: `url('${src}')` }} onClick={() => setActive(i + 1)} aria-label={`Ampliar imagem ${i + 2} do imóvel ${code}`} />)}
        {validImages.length < 2 && <div className="gallery-caption">IMAGENS DEMONSTRATIVAS</div>}
      </div>
    </div>
    {active !== null && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Galeria do imóvel ${code}`} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <button className="gallery-close" type="button" onClick={close} aria-label="Fechar galeria">×</button>
      <button className="gallery-nav gallery-prev" type="button" onClick={previous} aria-label="Imagem anterior">←</button>
      <div className="gallery-lightbox-image" style={{ backgroundImage: `url('${validImages[active]}')` }} />
      <button className="gallery-nav gallery-next" type="button" onClick={next} aria-label="Próxima imagem">→</button>
      <div className="gallery-count">{String(active + 1).padStart(2, '0')} / {String(validImages.length).padStart(2, '0')} <span>·</span> {code}</div>
    </div>}
  </>;
}
