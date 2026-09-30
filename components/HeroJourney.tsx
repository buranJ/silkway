"use client";

import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SpatialHero } from "@/components/SpatialHero";
import { contacts } from "@/content/site";

const HeroMasterplan = dynamic(() => import("@/components/DigitalMasterplan").then(module => module.HeroMasterplan), { ssr: false });

const scenes = [
  {
    label: "Торговый комплекс",
    title: "Поток людей, товаров и возможностей.",
    text: "Современная торговая среда формирует главный вход и деловой ритм территории.",
  },
  {
    label: "Тканевый комплекс",
    title: "Короткий путь от материала до продукта.",
    text: "Склады, торговые площади и лёгкая промышленность соединены внутренней логистикой.",
  },
  {
    label: "Промышленный комплекс",
    title: "Место для производства и роста.",
    text: "Фабрики, заводы и свободные участки работают как единая промышленная система.",
  },
  {
    label: "Жилая и социальная среда",
    title: "Работать, развиваться и жить рядом.",
    text: "Жильё, спорт и общественные пространства завершают целостную экосистему Silk Way.",
  },
  {
    label: "Мечеть",
    title: "Мечеть на территории Silk Way.",
    text: "Отдельное пространство для молитвы внутри комплекса.",
  },
];

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number, start: number, end: number) => {
  const x = clamp((value - start) / Math.max(end - start, 0.001));
  return x * x * (3 - 2 * x);
};

export function HeroJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const facadeRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const activeRef = useRef(-1);
  const facadeVisibleRef = useRef(true);
  const planVisibleRef = useRef(false);
  const [active, setActive] = useState(-1);
  const [showFacade, setShowFacade] = useState(true);
  const [showPlan, setShowPlan] = useState(false);
  const [preparePlan, setPreparePlan] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Prepare the scene before the scroll transition, not halfway through it.
    setPreparePlan(true);

    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const distance = Math.max(section.offsetHeight - window.innerHeight, 1);
        const progress = clamp(-rect.top / distance);
        progressRef.current = progress;

        const planReveal = smoothstep(progress, 0.2, 0.42);
        const copyFade = smoothstep(progress, 0.08, 0.2);
        const narrativeReveal = smoothstep(progress, 0.37, 0.52);
        section.style.setProperty("--journey-plan", `${planReveal}`);

        const shouldShowFacade = progress < 0.42;
        const shouldShowPlan = progress > 0.1;
        if (facadeVisibleRef.current !== shouldShowFacade) {
          facadeVisibleRef.current = shouldShowFacade;
          setShowFacade(shouldShowFacade);
        }
        if (planVisibleRef.current !== shouldShowPlan) {
          planVisibleRef.current = shouldShowPlan;
          setShowPlan(shouldShowPlan);
        }

        facadeRef.current?.style.setProperty("visibility", planReveal === 1 ? "hidden" : "visible");
        planRef.current?.style.setProperty("clip-path", `inset(0 0 0 ${(1 - planReveal) * 100}%)`);
        copyRef.current?.style.setProperty("opacity", `${1 - copyFade}`);
        copyRef.current?.style.setProperty("transform", `translate3d(0, ${copyFade * -72}px, 0)`);
        copyRef.current?.style.setProperty("pointer-events", copyFade > 0.82 ? "none" : "auto");
        narrativeRef.current?.style.setProperty("opacity", `${narrativeReveal}`);
        narrativeRef.current?.style.setProperty("transform", `translate3d(0, ${(1 - narrativeReveal) * 42}px, 0)`);
        narrativeRef.current?.style.setProperty("pointer-events", narrativeReveal > 0.8 ? "auto" : "none");

        const next = progress < .42 ? -1 : Math.min(scenes.length - 1, Math.floor((progress - .42) / .58 * scenes.length));

        if (activeRef.current !== next) {
          activeRef.current = next;
          setActive(next);
        }
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scene = scenes[Math.max(active, 0)];

  return (
    <section className="immersive-hero hero-journey" id="home-hero" ref={sectionRef}>
      <span className="hero-journey-anchor" id="hero-territory" aria-hidden="true" />
      <div className="hero-journey-sticky">
        <div className="hero-journey-facade" ref={facadeRef}>
          <SpatialHero active={showFacade} />
        </div>
        <div className="hero-masterplan-layer" ref={planRef}>
          <div className="hero-masterplan-preview" />
          {preparePlan && <HeroMasterplan progress={progressRef} active={active} playing={showPlan} />}
          <div className="hero-masterplan-grid" />
        </div>

        <div className="hero-atmosphere" />
        <div className="hero-technical-grid" />

        <div className="container immersive-hero-inner">
          <div className="immersive-hero-copy" data-motion-hero ref={copyRef}>
            <h1>
              Индустриальный парк
              <span>Silk Way</span>
            </h1>
            <p className="immersive-hero-summary">
              Торговля, производство, логистика и комфортная среда для бизнеса, внутри одной территории Silk Way.
            </p>
            <div className="immersive-hero-actions">
              <a className="hero-action-primary" href="#hero-territory">
                Начать путешествие <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="hero-action-secondary" href={contacts.phones[2].href}>
                <Phone size={17} aria-hidden="true" /> {contacts.phones[2].label}
              </a>
            </div>
          </div>

          <div className={`hero-journey-narrative ${active >= 0 ? "is-visible" : ""}`} ref={narrativeRef} aria-live="polite">
            <p>{scene.label}</p>
            <h2>{scene.title}</h2>
            <span>{scene.text}</span>
            <a href="#masterplan">Открыть интерактивный генплан <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>

          <div className="hero-journey-progress" aria-hidden="true">
            {scenes.map((item, index) => <span key={item.label} className={active === index ? "is-active" : active > index ? "is-past" : ""} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
