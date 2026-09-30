"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const slides = [
  {
    src: "/assets/photo/ren2-web.jpg",
    alt: "Жилая и социальная инфраструктура Silk Way",
    title: "Жилой квартал",
    description: "Дома и общественные пространства рядом с деловой частью",
    sizes: "(max-width: 900px) 88vw, 68vw",
  },
  {
    src: "/assets/photo/park-enhanced.png",
    alt: "Благоустройство территории Silk Way",
    title: "Внутренние маршруты",
    description: "Удобные связи между комплексами",
    sizes: "(max-width: 900px) 82vw, 38vw",
  },
  {
    src: "/assets/photo/ren3-web.jpg",
    alt: "Общественная инфраструктура Silk Way",
    title: "Для спорта и отдыха",
    description: "Образование, спорт и места для встреч",
    sizes: "(max-width: 900px) 82vw, 38vw",
  },
];

export function InfrastructureGallery() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getSlideWidth = () => {
    const gallery = galleryRef.current;
    const first = gallery?.firstElementChild;
    if (!gallery || !first) return 0;
    return first.getBoundingClientRect().width + parseFloat(getComputedStyle(gallery).columnGap || "0");
  };

  const scrollToSlide = (index: number) => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const next = Math.max(0, Math.min(slides.length - 1, index));
    gallery.scrollTo({
      left: next * getSlideWidth(),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
  };

  const updateActiveSlide = () => {
    const gallery = galleryRef.current;
    const width = getSlideWidth();
    if (!gallery || !width) return;
    setActiveIndex(Math.max(0, Math.min(slides.length - 1, Math.round(gallery.scrollLeft / width))));
  };

  return (
    <div className="cinema-gallery-shell">
      <div className="cinema-slider-controls" role="group" aria-label="Листать изображения инфраструктуры">
        <button type="button" onClick={() => scrollToSlide(activeIndex - 1)} disabled={activeIndex === 0} aria-label="Предыдущее изображение">
          <ArrowLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => scrollToSlide(activeIndex + 1)} disabled={activeIndex === slides.length - 1} aria-label="Следующее изображение">
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="cinema-gallery" role="region" aria-label="Инфраструктура Silk Way" data-reveal-stagger ref={galleryRef} onScroll={updateActiveSlide}>
        {slides.map((slide, index) => (
          <article className={`cinema-panel${index === 0 ? " cinema-panel-wide" : ""}`} key={slide.src}>
            <div className="cinema-image">
              <Image src={slide.src} alt={slide.alt} fill sizes={slide.sizes} quality={90} />
            </div>
            <div className="cinema-caption"><span>{slide.title}</span><p>{slide.description}</p></div>
          </article>
        ))}
      </div>
    </div>
  );
}
