import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Phone, Plus } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { complexPages } from "@/content/site";
import { contacts } from "@/content/site";
import { TradeArchitecture } from "./TradeArchitecture";
import styles from "./trade.module.css";

export const metadata: Metadata = { title: "Торговый комплекс", description: complexPages.trade.lead };

const trade = complexPages.trade;
const blocks = ["Второй блок", "Третий блок", "Четвёртый блок"];

export default function Page() {
  return (
    <main className={`motion-page ${styles.page}`}>
      <section className={styles.hero} id="trade-hero">
        <div className={styles.heroImage} data-parallax>
          <Image src="/assets/photo/trade-enhanced.png" alt="Архитектурная визуализация торгового комплекса Silk Way EXPO" fill sizes="100vw" quality={90} preload />
        </div>
        <div className={styles.shade} />
        <div className={styles.grid} aria-hidden="true" />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy} data-motion-hero>
            <h1>Торговый комплекс<span>Silk Way</span></h1>
            <p className={styles.lead}>{trade.lead}</p>
            <div className={styles.actions}>
              <a className="hero-action-primary" href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" /> Позвонить</a>
              <a className="hero-action-secondary" href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" /> WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.facts} aria-label="Торговый комплекс в цифрах">
        <div className={`container ${styles.factGrid}`} data-reveal-stagger>
          {trade.facts.map(fact => <div key={fact.value}><strong>{fact.value}</strong><span>{fact.value === "12" ? "входов во втором блоке" : fact.label}</span></div>)}
        </div>
      </section>
      <section className={`container ${styles.section} ${styles.intro}`} id="about">
        <div data-reveal><h2>Оптом и в розницу<br /><span>под одной крышей.</span></h2></div>
        <div className={styles.copy} data-reveal>{trade.sections[0].paragraphs.map(p => <p key={p}>{p}</p>)}</div>
      </section>

      <section className={styles.panorama} aria-label="Проектный вид территории">
        <div className={styles.panoramaImage} data-parallax><Image src="/assets/photo/ren2-web.jpg" alt="Проектный вид корпусов, парковки и проездов Silk Way" fill sizes="100vw" quality={90} /></div>
        <div className={styles.panoramaShade} />
        <div className={`container ${styles.panoramaCaption}`}><h2 data-reveal>Торговые корпуса<br />на одной территории</h2></div>
      </section>

      <section className={`container ${styles.section} ${styles.details}`}>
        <div data-reveal><h2>Как устроен<br /><span>первый блок</span></h2><div className={styles.detailNumbers}><div><strong>5</strong><span>грузовых лифтов</span></div><div><strong>4</strong><span>эскалатора</span></div></div></div>
        <div className={styles.copy} data-reveal>{trade.sections[1].paragraphs.map(p => <p key={p}>{p}</p>)}</div>
      </section>

      <section className={styles.buildings} id="buildings">
        <div className={`container ${styles.buildingGrid}`}>
          <div className={styles.buildingIntro} data-reveal><h2>Планировка<br /><span>четырёх корпусов</span></h2><p>В проекте предусмотрены торговые и складские помещения, площадки для мероприятий и сервисы.</p></div>
          <div className={styles.buildingList} data-reveal>
            <details open><summary><span>Первый блок<small>Торговая среда</small></span><Plus size={22} aria-hidden="true" /></summary><div className={styles.buildingBody}><div className={styles.blockFacts}><span><b>36 000 м²</b>общая площадь</span><span><b>2 этажа</b>по 350 бутиков</span></div><p>{trade.sections[1].paragraphs[0]}</p></div></details>
            {trade.sections[2].paragraphs.map((p, i) => <details key={p}><summary><span>{blocks[i]}<small>{["Торговля и хранение", "Торговля и события", "Торговля и сервисы"][i]}</small></span><Plus size={22} aria-hidden="true" /></summary><div className={styles.buildingBody}><p>{p}</p></div></details>)}
            <p className={styles.note}>{trade.note}</p>
          </div>
        </div>
      </section>

      <TradeArchitecture />

      <section className={styles.contact} id="contact"><div className={`container ${styles.contactGrid}`}><div data-reveal><h2>Обсудим<br /><span>размещение</span></h2><p>Оставьте номер телефона — расскажем о свободных площадях и актуальных условиях.</p><div className={styles.contactLinks}><a href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />{contacts.phones[2].label}</a><a href={contacts.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp <ArrowUpRight size={16} aria-hidden="true" /></a></div></div><div className={styles.form} data-reveal><ContactForm compact /></div></div></section>
    </main>
  );
}
