import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Info, Phone } from "lucide-react";
import type { ComplexPageData } from "@/content/site";
import { contacts, directionCards } from "@/content/site";
import { ContactBand } from "@/components/ContactBand";

export function ComplexPage({ data }: { data: ComplexPageData }) {
  return (
    <main className="motion-page">
      <section className="inner-hero section-pad">
        <div className="container">
          <Link className="back-link" href="/"><ArrowLeft size={17} aria-hidden="true" />Все направления</Link>
          <div className="inner-hero-grid">
            <div className="inner-hero-copy" data-motion-hero>
              <span className="eyebrow">Silk Way</span>
              <h1>{data.title}</h1>
              <p>{data.lead}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#contact">Обсудить проект<ArrowRight size={18} aria-hidden="true" /></a>
                <a className="button button-secondary" href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />Позвонить</a>
              </div>
            </div>
            <div className="inner-hero-image" data-reveal-media>
              <Image src={data.heroImage} alt={data.title} fill sizes="(max-width: 900px) 100vw, 52vw" quality={90} preload />
            </div>
          </div>
        </div>
      </section>

      <section className="facts-section">
        <div className="container facts-grid" data-reveal-stagger>
          {data.facts.map((fact) => (
            <div className="fact" key={`${fact.value}-${fact.label}`}>
              <strong>{fact.value}</strong>
              <span>{fact.label}</span>
            </div>
          ))}
        </div>
      </section>

      <nav className="page-jump-nav" aria-label={`Навигация по странице «${data.shortTitle}»`}>
        <div className="container page-jump-nav-inner">
          <a href="#details">О комплексе</a>
          <a href="#gallery">Архитектура</a>
          <a href="#contact">Связаться</a>
        </div>
      </nav>

      <div className="content-sections" id="details">
        {data.sections.map((section, index) => (
          <section className={`content-section section-pad ${index % 2 ? "is-reverse" : ""}`} key={section.title}>
            <div className={`container content-grid ${!section.image ? "text-only" : ""}`}>
              <div className="content-copy" data-reveal>
                <span className="eyebrow">{data.shortTitle}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              {section.image && (
                <div className="content-image" data-reveal-media>
                  <Image src={section.image} alt={section.title} fill sizes="(max-width: 800px) 100vw, 48vw" quality={85} />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {data.note && <div className="container"><p className="data-note"><Info size={18} aria-hidden="true" /><span>{data.note}</span></p></div>}

      <section className="gallery-section section-pad" id="gallery">
        <div className="container">
          <div className="section-heading" data-reveal>
            <span className="eyebrow">Проект</span>
            <h2>Архитектура и территория</h2>
          </div>
          <div className="image-rail" data-reveal-stagger>
            {data.gallery.map((image, index) => (
              <div className="rail-image" key={`${image}-${index}`}>
                <Image src={image} alt={`${data.shortTitle}: изображение ${index + 1}`} fill sizes="(max-width: 700px) 84vw, 38vw" quality={85} />
              </div>
            ))}
          </div>
          <div className="related-directions" data-reveal>
            <span>Другие направления</span>
            <nav aria-label="Другие направления Silk Way">
              {directionCards.filter((item) => item.slug !== data.slug).map((item) => (
                <Link href={`/${item.slug}`} key={item.slug}>{item.shortTitle}<ArrowRight size={15} aria-hidden="true" /></Link>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
