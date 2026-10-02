import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { residentExamples } from "@/content/showcase";
import { contacts } from "@/content/site";
import styles from "../community.module.css";

export const metadata: Metadata = {
  title: "Резиденты",
  description: "Компании, бренды и направления на территории Silk Way.",
};

const residentSpaces = [
  {
    title: "Торговый комплекс",
    description: "Оптовая и розничная торговля",
    image: "/assets/photo/trade-enhanced.png",
    href: "/trade",
  },
  {
    title: "Тканевый комплекс",
    description: "Материалы, фурнитура и лёгкая промышленность",
    image: "/assets/photo/textile-enhanced.png",
    href: "/textile",
  },
  {
    title: "Промышленный комплекс",
    description: "Производственные и складские площади",
    image: "/assets/photo/industrial-enhanced.png",
    href: "/industrial",
  },
];

export default function ResidentsPage() {
  return (
    <main className={`motion-page ${styles.page}`}>
      <section className={styles.residentsHero} aria-labelledby="residents-title">
        <div className={styles.residentsHeroImage}>
          <Image src="/assets/photo/park-enhanced.png" alt="Проектный вид корпусов и территории Silk Way" fill sizes="100vw" quality={88} preload />
        </div>
        <div className={styles.residentsHeroShade} aria-hidden="true" />
        <div className={`container ${styles.residentsHeroGrid}`}>
          <div className={styles.residentsHeroCopy} data-motion-hero>
            <span className={styles.residentsHeroLabel}>Резиденты Silk Way</span>
            <h1 id="residents-title">Компании<br />Silk Way</h1>
            <p>Производители, торговые марки и сервисы, которые формируют деловую среду комплекса.</p>
          </div>
          <div className={styles.residentsHeroBottom} aria-hidden="true"><span>Торговля</span><span>Материалы</span><span>Производство</span></div>
        </div>
      </section>

      <section className={styles.residentDirectory} aria-labelledby="resident-directory-title">
        <div className="container">
          <div className={styles.residentDirectoryIntro}>
            <div data-reveal>
              <h2 id="resident-directory-title">Компании и направления</h2>
            </div>
          </div>
          <div className={styles.residentFeatured}>
            <div className={styles.residentFeaturedImage} data-reveal-media>
              <Image src={residentExamples[0].logo} alt={residentExamples[0].logoAlt} width={residentExamples[0].logoWidth} height={residentExamples[0].logoHeight} className={styles.residentLogo} />
            </div>
            <article className={styles.residentFeaturedCopy} data-reveal>
              <span className={styles.companyCategory}>{residentExamples[0].category}</span>
              <h3>{residentExamples[0].name}</h3>
              <p>{residentExamples[0].description}</p>
              <a href={residentExamples[0].website} target="_blank" rel="noopener noreferrer">Сайт компании <ArrowUpRight size={20} aria-hidden="true" /></a>
            </article>
          </div>
          <div className={styles.residentCardGrid}>
            {residentExamples.slice(1).map((company) => (
              <article className={styles.residentCard} key={company.name} data-reveal>
                <div className={styles.residentCardImage} data-brand={company.brand}><Image src={company.logo} alt={company.logoAlt} width={company.logoWidth} height={company.logoHeight} className={styles.residentLogo} /></div>
                <div className={styles.residentCardBody}>
                  <span className={styles.companyCategory}>{company.category}</span>
                  <h3>{company.name}</h3>
                  <p>{company.description}</p>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">{company.websiteLabel} <ArrowUpRight size={18} aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.residentSpaces} aria-labelledby="resident-spaces-title">
        <div className="container">
          <div className={styles.residentSpacesIntro}>
            <h2 id="resident-spaces-title">Комплексы Silk Way</h2>
          </div>
          <div className={styles.residentSpacesGrid}>
            {residentSpaces.map((space) => (
              <Link className={styles.residentSpaceCard} href={space.href} key={space.href}>
                <Image src={space.image} alt="" fill sizes="(max-width: 680px) 100vw, (max-width: 900px) 50vw, 55vw" quality={85} />
                <span className={styles.residentSpaceContent}>
                  <span className={styles.residentSpaceDescription}>{space.description}</span>
                  <span className={styles.residentSpaceTitle}>{space.title}<ArrowUpRight aria-hidden="true" size={25} /></span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={`container ${styles.contactGrid}`}>
          <div data-reveal>
            <h2>Ваше место<br /><span>в Silk Way</span></h2>
            <p>Расскажите о своей компании. Обсудим подходящий комплекс, площади и условия размещения.</p>
            <div className={styles.contactLinks}>
              <a href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />{contacts.phones[2].label}</a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.form} data-reveal><ContactForm compact interestValue="Резиденты" /></div>
        </div>
      </section>
    </main>
  );
}
