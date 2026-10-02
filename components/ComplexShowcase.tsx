import Image from "next/image";
import { ArrowUpRight, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { ComplexViewGallery } from "@/components/ComplexViewGallery";
import { contacts } from "@/content/site";
import styles from "@/app/complexes.module.css";

type Kind = "textile" | "industrial";

const pageContent = {
  textile: {
    name: "Тканевый комплекс",
    hero: "/assets/photo/textile-enhanced.png",
    heroAlt: "Проектный вид корпусов тканевого комплекса Silk Way",
    lead: "Ткани, фурнитура, торговые и складские помещения для предприятий лёгкой промышленности.",
    facts: [
      { value: "150 000 м²", label: "площадь комплекса" },
      { value: "11 500 м²", label: "завершено в первой очереди" },
      { value: "12", label: "готовых складов" },
      { value: "560 м²", label: "площадь одного склада" },
    ],
    gallery: [
      { src: "/assets/photo/textile-enhanced.png", title: "Корпуса тканевого комплекса", detail: "Торговые помещения, склады и подъезды к ним." },
      { src: "/assets/photo/ren1-web.jpg", title: "Территория Silk Way", detail: "Расположение корпусов в общей планировке парка." },
    ],
  },
  industrial: {
    name: "Промышленный комплекс",
    hero: "/assets/photo/industrial-enhanced.png",
    heroAlt: "Проектный вид производственных корпусов Silk Way",
    lead: "Территория для фабрик и заводов: производственные корпуса, автомобильные проезды и парковка.",
    facts: [
      { value: "200 000 м²", label: "территория комплекса" },
      { value: "11 000+ м²", label: "завершённые объекты" },
      { value: "40 000 м²", label: "строящиеся объекты" },
    ],
    gallery: [
      { src: "/assets/photo/industrial-enhanced.png", title: "Производственные корпуса", detail: "Проектный вид промышленной части Silk Way." },
      { src: "/assets/photo/ren1-web.jpg", title: "Парк в целом", detail: "Промышленная территория в общей планировке комплекса." },
    ],
  },
} as const;

export function ComplexShowcase({ kind }: { kind: Kind }) {
  const content = pageContent[kind];

  return (
    <main className={`motion-page ${styles.page}`}>
      <section className={styles.hero} aria-label={content.name}>
        <div className={styles.heroImage} data-parallax>
          <Image src={content.hero} alt={content.heroAlt} fill sizes="100vw" quality={90} preload />
        </div>
        <div className={styles.heroShade} />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy} data-motion-hero>
            <h1>{content.name}<span>Silk Way</span></h1>
            <p>{content.lead}</p>
            <div className={styles.heroActions}>
              <a className="hero-action-primary" href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />Позвонить</a>
              <a className="hero-action-secondary" href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp</a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.facts} aria-label={`${content.name} в цифрах`}>
        <div className={`container ${styles.factGrid}`} data-count={content.facts.length} data-reveal-stagger>
          {content.facts.map(fact => <div key={fact.label}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
        </div>
      </section>

      {kind === "textile" ? <TextileSections /> : <IndustrialSections />}

      <ComplexViewGallery title={kind === "textile" ? "Корпуса и территория" : "Промышленная территория"} views={content.gallery} />

      <section className={styles.contact} id="contact">
        <div className={`container ${styles.contactGrid}`}>
          <div data-reveal>
            <h2>Обсудим <span>размещение</span></h2>
            <p>{kind === "textile" ? "Расскажем о доступных торговых и складских помещениях и актуальных условиях." : "Расскажем о производственных площадях, участках и актуальных условиях размещения."}</p>
            <div className={styles.contactLinks}>
              <a href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" />{contacts.phones[2].label}</a>
              <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={18} aria-hidden="true" />WhatsApp<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.form} data-reveal><ContactForm compact /></div>
        </div>
      </section>
    </main>
  );
}

function TextileSections() {
  return (
    <>
      <section className={`container ${styles.editorial}`} id="about">
        <div data-reveal><h2>Ткани и фурнитура<br /><span>для производителей.</span></h2></div>
        <div className={styles.editorialCopy} data-reveal>
          <p>Тканевый комплекс рассчитан на предприятия лёгкой промышленности: здесь предусмотрены площади для продажи материалов и фурнитуры, а также их хранения.</p>
          <p>Отдельные линии для загрузки и выгрузки товаров помогают разделить движение поставок и посетителей. В зданиях предусмотрены санузлы, кондиционирование и системы пожаротушения.</p>
        </div>
      </section>

      <section className={styles.textilePremises}>
        <div className={`container ${styles.premisesGrid}`}>
          <div className={styles.premisesCopy} data-reveal>
            <h2>Магазин внизу.<br />Склад наверху.</h2>
            <p>Во второй очереди предусмотрены двухуровневые помещения площадью 80 м². На первом уровне размещаются магазин и небольшой офис, на втором — склад.</p>
            <span>Проект второй очереди — 36 000 м²</span>
          </div>
          <div className={styles.premisesImage} data-reveal>
            <Image
              src="/assets/photo/textile-two-level-concept.webp"
              alt="Двухуровневое помещение: магазин тканей и офис внизу, склад наверху"
              fill
              sizes="(max-width: 600px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 64px), 55vw"
              quality={85}
            />
          </div>
        </div>
      </section>

      <section className={styles.stages}>
        <div className={`container ${styles.stagesGrid}`}>
          <div data-reveal><h2>Строительство<br /><span>по очередям</span></h2></div>
          <div className={styles.stageList} data-reveal>
            <div><span>Готово</span><h3>Первая очередь</h3><p>11 500 м² завершённых площадей и 12 складов по 560 м².</p></div>
            <div><span>Проект</span><h3>Вторая очередь</h3><p>36 000 м² двухуровневых торгово-складских помещений.</p></div>
            <div><span>Следующий этап</span><h3>Расширение</h3><p>Предусмотрены пять зданий по 4 000 м², два из них — под склады.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

function IndustrialSections() {
  return (
    <>
      <section className={`container ${styles.editorial}`} id="about">
        <div data-reveal><h2>Площадка для<br /><span>разных производств.</span></h2></div>
        <div className={styles.editorialCopy} data-reveal>
          <p>Промышленный комплекс рассчитан на фабрики и заводы разного профиля — от швейного производства до выпуска строительных материалов.</p>
          <p>Предприятия размещаются в пределах одной территории. Это сокращает внутренние маршруты между производством, поставщиками и логистическими службами.</p>
        </div>
      </section>

      <section className={styles.industrialFeature}>
        <div className={styles.industrialFeatureImage}><Image src="/assets/photo/ren1-web.jpg" alt="Общая планировка корпусов и проездов Silk Way" fill sizes="(max-width: 900px) 100vw, 60vw" quality={90} /></div>
        <div className={styles.industrialFeatureCopy} data-reveal>
          <h2>Корпуса<br />и проезды.</h2>
          <p>В проекте предусмотрены отдельные производственные здания, автомобильные проезды и парковка. Комплекс развивается поэтапно: часть объектов завершена, новые корпуса строятся.</p>
        </div>
      </section>

      <section className={styles.industrialDetails}>
        <div className={`container ${styles.industrialDetailsGrid}`}>
          <div data-reveal><h2>Что предусмотрено<br /><span>для предприятий</span></h2></div>
          <div className={styles.industrialRows} data-reveal>
            <div><h3>Разные профили производства</h3><p>Площадка не ограничена одной отраслью: в проекте рассматриваются швейные фабрики и производства строительных материалов.</p></div>
            <div><h3>Подготовка специалистов</h3><p>В планах — профессиональные курсы для работников лёгкой промышленности.</p></div>
            <div><h3>Участки и условия</h3><p>Условия передачи участков и наличие свободных площадей уточняются у отдела продаж.</p></div>
          </div>
        </div>
      </section>
    </>
  );
}
