"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { directionCards } from "@/content/site";

const directionScenes = [
  {
    image: "/assets/photo/trade-enhanced.png",
    summary: "Оптовая и розничная торговля в современных зданиях с продуманной клиентской логистикой.",
  },
  {
    image: "/assets/photo/textile-enhanced.png",
    summary: "Материалы, фурнитура, склады и торговые площади внутри единого кластера лёгкой промышленности.",
  },
  {
    image: "/assets/photo/industrial-enhanced.png",
    summary: "Территория для фабрик, заводов, промышленной кооперации и выхода производителей на новые рынки.",
  },
  {
    image: "/assets/photo/ren3-web.jpg",
    summary: "Жильё, спорт и социальная инфраструктура рядом с рабочими местами и деловой частью парка.",
  },
];

export function DirectionStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    if (!section || reducedMotion || mobile) return;

    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const next = Math.min(directionCards.length - 1, Math.floor(self.progress * directionCards.length));
        setActive((current) => (current === next ? current : next));
      },
    });

    return () => trigger.kill();
  }, []);

  const card = directionCards[active];
  const scene = directionScenes[active];

  return (
    <section className="direction-story" id="directions" ref={sectionRef}>
      <div className="direction-story-stage">
        <div className="container direction-story-grid">
          <header className="direction-story-heading">
            <h2>Что входит в Silk Way?</h2>
          </header>
          <div className="direction-story-copy">
            <div className="direction-story-main" aria-live="polite">
              <h3>{card.shortTitle}</h3>
              <p>{scene.summary}</p>
              <div className="direction-story-fact">
                <strong>{card.facts[0].value}</strong>
                <span>{card.facts[0].label}</span>
              </div>
              <Link href={`/${card.slug}`} className="motion-link">
                Подробнее о комплексе <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>

            <div className="direction-story-tabs" role="group" aria-label="Направления комплекса">
              {directionCards.map((item, index) => (
                <button
                  type="button"
                  key={item.slug}
                  className={index === active ? "is-active" : ""}
                  onClick={() => setActive(index)}
                  aria-pressed={index === active}
                >
                  {item.shortTitle}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>

          <div className="direction-story-visual">
            <div className="direction-story-frame">
              {directionCards.map((item, index) => (
                <figure className={`direction-story-image ${index === active ? "is-active" : ""}`} key={item.slug} aria-hidden={index !== active}>
                  <Image
                    src={directionScenes[index].image}
                    alt={`Визуализация ${item.shortTitle.toLowerCase()} Silk Way`}
                    fill
                    sizes="(max-width: 1400px) 55vw, 58vw"
                    quality={95}
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="direction-mobile-list">
            {directionCards.map((item, index) => (
              <Link href={`/${item.slug}`} className="direction-mobile-card" key={item.slug}>
                <div className="direction-mobile-image">
                  <Image src={directionScenes[index].image} alt={`Визуализация ${item.shortTitle.toLowerCase()} Silk Way`} fill sizes="100vw" quality={95} />
                </div>
                <div className="direction-mobile-content">
                  <h3>{item.shortTitle}</h3>
                  <p>{directionScenes[index].summary}</p>
                  <div className="direction-mobile-meta">
                    <span>{item.facts[0].value} · {item.facts[0].label}</span>
                    <span className="direction-mobile-open">Подробнее <ArrowUpRight size={19} aria-hidden="true" /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
