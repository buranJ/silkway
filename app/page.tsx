import Link from "next/link";
import {
  ArrowUpRight,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { DirectionStory } from "@/components/DirectionStory";
import { HeroJourney } from "@/components/HeroJourney";
import { InfrastructureGallery } from "@/components/InfrastructureGallery";
import { MasterplanExplorer } from "@/components/MasterplanExplorer";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { contacts } from "@/content/site";

const projectFacts = [
  { value: "4", label: "направления комплекса" },
  { value: "3 500+", label: "парковочных мест" },
  { value: "А365 · М39", label: "международные маршруты" },
];

export default function HomePage() {
  return (
      <main className="motion-home motion-page">
        <HeroJourney />

        <section className="project-signal" id="project-intro">
          <div className="container project-signal-layout">
            <div className="project-signal-story" data-reveal>
              <h2>Территория<br />для дела.</h2>
              <p>Первый в Кыргызстане многопрофильный промышленно-торговый комплекс. Производство, торговля и логистика здесь рядом — от выпуска продукта до встречи с покупателем.</p>
              <Link href="/industrial" className="motion-link">
                Промышленный комплекс <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="project-signal-scale">
              <div className="project-signal-area" data-reveal>
                <div><strong>70</strong><span>га</span></div>
                <p>Площадь комплекса</p>
              </div>
              <div className="project-signal-details" aria-label="Ключевые показатели Silk Way">
                {projectFacts.map((fact) => (
                  <div className="project-signal-detail" key={fact.label} data-reveal>
                    <strong>{fact.value}</strong>
                    <span>{fact.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <DirectionStory />

        <MasterplanExplorer />

        <section className="cinematic-infrastructure section-pad">
          <div className="container cinema-heading" data-reveal>
            <h2>Всё необходимое<br />для работы рядом</h2>
          </div>

          <InfrastructureGallery />

          <div className="container cinema-links">
            <Link href="/residential">Жилой комплекс <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link href="/residents">Резиденты <ArrowUpRight size={18} aria-hidden="true" /></Link>
            <Link href="/partners">Партнёры <ArrowUpRight size={18} aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="motion-contact section-pad" id="contact">
          <div className="container motion-contact-grid">
            <div className="motion-contact-copy" data-reveal>
              <p className="motion-label">Связаться с Silk Way</p>
              <h2>Найдём пространство<br />под вашу задачу.</h2>
              <p>Расскажем о свободных площадях, инфраструктуре и возможностях каждого направления.</p>
              <div className="motion-contact-direct">
                <a href={contacts.whatsapp} target="_blank" rel="noreferrer"><WhatsAppIcon size={18} aria-hidden="true" /> WhatsApp</a>
                <a href={contacts.phones[2].href}><Phone size={18} aria-hidden="true" /> {contacts.phones[2].label}</a>
              </div>
            </div>
            <div data-reveal><ContactForm /></div>
          </div>
        </section>
      </main>
  );
}
