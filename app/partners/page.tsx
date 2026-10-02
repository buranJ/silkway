import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { partnerExamples } from "@/content/showcase";
import { contacts } from "@/content/site";
import styles from "../community.module.css";

export const metadata: Metadata = {
  title: "Партнёры",
  description: "Партнёры, сервисы и направления сотрудничества Silk Way.",
};

export default function PartnersPage() {
  return (
    <main className={`motion-page ${styles.page}`}>
      <section className={styles.partnersHero} aria-labelledby="partners-title">
        <div className={styles.partnersHeroImage} data-parallax>
          <Image src="/assets/photo/industrial-enhanced.png" alt="Проектный вид территории Silk Way" fill sizes="100vw" quality={90} preload />
        </div>
        <div className={styles.partnersHeroShade} aria-hidden="true" />
        <div className={`container ${styles.partnersHeroInner}`}>
          <div className={styles.partnersHeroCopy} data-motion-hero>
            <h1 id="partners-title">Партнёры<span>Silk Way</span></h1>
            <p>Большой комплекс работает лучше, когда повседневные задачи решаются на месте: оплата, связь, доставка и другие сервисы.</p>
            <div className={styles.partnersHeroActions}>
              <a className="hero-action-primary" href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />Позвонить</a>
              <a className="hero-action-secondary" href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partnerProfiles} aria-labelledby="partner-profiles-title">
        <div className="container">
          <div className={styles.partnerProfilesIntro}>
            <div data-reveal>
              <h2 id="partner-profiles-title">Компании и сервисы<br /><span>Silk Way</span></h2>
            </div>
          </div>
          <div className={styles.partnerStoryList}>
            {partnerExamples.map((company) => (
              <article className={styles.partnerStory} key={company.name} data-reveal>
                <div className={styles.partnerStoryImage} data-reveal-media>
                  <Image src={company.image} alt={company.imageAlt} fill sizes="(max-width: 680px) 100vw, 52vw" quality={86} />
                </div>
                <div className={styles.partnerStoryCopy}>
                  <div className={styles.partnerStoryTop}><span className={styles.companyCategory}>{company.category}</span><strong>{company.name}</strong></div>
                  <h3>{company.headline}</h3>
                  <p>{company.description}</p>
                  <a href={company.website} target="_blank" rel="noopener noreferrer">{company.websiteLabel} <ArrowUpRight size={19} aria-hidden="true" /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.partnerAreas} aria-labelledby="partner-areas-title">
        <div className="container">
          <div className={styles.partnerAreasIntro}>
            <h2 id="partner-areas-title">Направления<br /><span>сотрудничества</span></h2>
          </div>
          <div className={styles.partnerAreaRows}>
            <div><h3>Инфраструктура</h3><p>Инженерные системы, связь и техническое обслуживание корпусов.</p></div>
            <div><h3>Движение товаров</h3><p>Доставка, хранение, упаковка и организация поставок.</p></div>
            <div><h3>Сервисы для людей</h3><p>Оплата, обслуживание бизнеса и услуги для посетителей территории.</p></div>
          </div>
        </div>
      </section>

      <section className={`${styles.contact} ${styles.partnersContact}`} id="contact">
        <div className={`container ${styles.contactGrid}`}>
          <div data-reveal>
            <h2>Предложите<br /><span>своё решение</span></h2>
            <p>Напишите, чем занимается ваша компания и какую задачу вы можете решить для Silk Way. Мы свяжемся с вами.</p>
            <div className={styles.contactLinks}>
              <a href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />{contacts.phones[2].label}</a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={`${styles.form} ${styles.partnersForm}`} data-reveal><ContactForm compact interestValue="Партнёрство" showDetails submitLabel="Отправить предложение" /></div>
        </div>
      </section>
    </main>
  );
}
