import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { contacts } from "@/content/site";
import styles from "./residential.module.css";

export const metadata: Metadata = {
  title: "Жилой комплекс",
  description: "Жилой комплекс Silk Way: прогулочная аллея, спортивные пространства и инфраструктура в пределах территории парка.",
};

const amenities = [
  { title: "Для спорта", text: "В проекте предусмотрены спортивный комплекс, футбольное и волейбольное поля, теннисный корт." },
  { title: "Для семьи", text: "Запланированы детский сад, прогулочная аллея и пространства для отдыха на открытом воздухе." },
  { title: "Для каждого дня", text: "Предусмотрены парковка, гостиница, мечеть с медресе. Поблизости — конечная остановка транспорта." },
];

export default function ResidentialPage() {
  return (
    <main className={`motion-page ${styles.page}`}>
      <section className={styles.hero} aria-labelledby="residential-title">
        <div className={styles.heroImage}>
          <Image src="/assets/photo/residential-courtyard-concept.webp" alt="Иллюстрация озеленённого двора жилого района" fill sizes="100vw" quality={90} preload />
        </div>
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy} data-motion-hero>
            <h1 id="residential-title">Жилой комплекс<br /><span>Silk Way</span></h1>
            <p>В проекте — жильё, прогулочные маршруты и повседневная инфраструктура рядом с рабочими местами.</p>
            <div className={styles.heroActions}>
              <a className="hero-action-primary" href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />Позвонить</a>
              <a className="hero-action-secondary" href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.facts} aria-label="Параметры проекта">
        <div className={`container ${styles.factGrid}`} data-reveal-stagger>
          <div><strong>150 000 м²</strong><span>территория жилого комплекса</span></div>
          <div><strong>600</strong><span>парковочных мест в проекте</span></div>
          <div><strong>до 1 км</strong><span>протяжённость прогулочной аллеи</span></div>
        </div>
      </section>

      <section className={`container ${styles.intro}`}>
        <h2 data-reveal>Жилая часть<br /><span>общего проекта.</span></h2>
        <div data-reveal>
          <p>Жилой комплекс предусмотрен для сотрудников, резидентов и их семей. Он входит в общую планировку Silk Way, где работа, торговля и необходимые сервисы расположены поблизости.</p>
          <p>Здесь запланированы не только жилые здания, но и места для прогулок, занятий спортом и повседневных дел.</p>
        </div>
      </section>

      <section className={styles.plan} aria-labelledby="residential-plan-title">
        <div className={`container ${styles.planGrid}`}>
          <div className={styles.planCopy} data-reveal>
            <h2 id="residential-plan-title">Жилая зона<br /><span>на генплане.</span></h2>
            <p>Жилая и социальная зона предусмотрена в общей планировке парка. На цифровом макете можно увидеть её расположение относительно торговых и производственных корпусов.</p>
          </div>
          <div className={styles.planImage} data-reveal-media>
            <Image src="/assets/photo/ren3-web.jpg" alt="Генплан Silk Way: жилая и социальная зона расположена в правой части территории" fill sizes="(max-width: 900px) 100vw, 62vw" quality={88} />
          </div>
        </div>
      </section>

      <section className={styles.promenade} aria-labelledby="promenade-title">
        <div className={styles.promenadeImage}>
          <Image src="/assets/photo/residential-promenade-concept.webp" alt="Иллюстрация прогулочной аллеи рядом со спортивной площадкой" fill sizes="100vw" quality={88} />
        </div>
        <div className={styles.promenadeShade} />
        <div className={`container ${styles.promenadeCopy}`} data-reveal>
          <h2 id="promenade-title">Прогулочная аллея</h2>
          <p>Пешеходный маршрут длиной до километра предусмотрен как часть будущей жилой среды.</p>
        </div>
      </section>

      <section className={styles.amenities} aria-labelledby="amenities-title">
        <div className={`container ${styles.amenitiesGrid}`}>
          <div data-reveal><h2 id="amenities-title">Что предусмотрено<br /><span>рядом с домом.</span></h2></div>
          <div className={styles.amenitiesRows} data-reveal-stagger>
            {amenities.map(item => (
              <div key={item.title}><h3>{item.title}</h3><p>{item.text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.contact} id="contact">
        <div className={`container ${styles.contactGrid}`}>
          <div data-reveal>
            <h2>Узнать о проекте</h2>
            <p>Уточните планировку, сроки и актуальные условия у отдела продаж.</p>
            <div className={styles.contactLinks}>
              <a href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />{contacts.phones[2].label}</a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.form} data-reveal><ContactForm compact interestValue="Жилой комплекс" /></div>
        </div>
      </section>
    </main>
  );
}
