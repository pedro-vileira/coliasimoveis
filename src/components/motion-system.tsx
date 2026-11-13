'use client';

import { useEffect } from 'react';

/** Adds viewport reveals to editorial landmarks without hiding content from assistive technology. */
export function MotionSystem() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    const selectors = [
      '.intro-copy', '.section-heading', '.featured-grid', '.statement h2',
      '.approach-grid', '.contact-cta h2', '.page-intro', '.catalog-tools',
      '.filter-panel', '.detail-heading', '.detail-gallery', '.detail-columns',
      '.detail-contact', '.about-image', '.about-copy', '.contact-layout',
      '.footer-top', '.footer-bottom', '.property-card', '.related-properties'
    ].join(',');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

    const observe = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(selectors).forEach((element) => {
        if (element.dataset.motionObserved) return;
        element.dataset.motionObserved = 'true';
        element.classList.add('motion-reveal');
        observer.observe(element);
      });
    };

    observe();
    const mutation = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          if (node.matches(selectors)) observe(node.parentNode ?? document);
          observe(node);
        }
      }));
    });
    mutation.observe(document.body, { childList: true, subtree: true });

    return () => { observer.disconnect(); mutation.disconnect(); };
  }, []);

  return null;
}
