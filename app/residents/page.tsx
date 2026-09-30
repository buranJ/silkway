import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Store, Wrench } from "lucide-react";
import { ContactBand } from "@/components/ContactBand";

export const metadata: Metadata = {
  title: "Резиденты индустриального парка",
  description: "Компании и бренды, работающие на территории индустриального парка Silk Way.",
};

export default function ResidentsPage() {
  return (
    <main className="motion-page">
      <section className="simple-hero section-pad">
        <div className="container simple-hero-grid">
          <div data-motion-hero>
            <span className="eyebrow">Экосистема Silk Way</span>
            <h1>Резиденты индустриального парка</h1>
          </div>
          <p data-reveal>На одной территории объединяются производственные, торговые и сервисные компании. Информация о резидентах публикуется после официального подтверждения.</p>
        </div>
      </section>
      <section className="residents-page section-pad">
        <div className="container residents-content-grid">
          <div className="residents-image" data-reveal-media>
            <Image src="/assets/photo/ren3.jpg" alt="Генеральный план территории Silk Way" fill sizes="(max-width: 900px) 100vw, 55vw" quality={90} />
          </div>
          <div className="residents-copy" data-reveal>
            <span className="eyebrow">Развитие экосистемы</span>
            <h2>Компании на одной территории</h2>
            <p>Парк рассчитан на взаимодействие производственных, торговых и сервисных компаний. Подтверждённый список резидентов уточняется — мы не публикуем неподтверждённые названия и бренды.</p>
            <div className="resident-directions">
              <div><Factory aria-hidden="true" /><span>Производственные компании</span></div>
              <div><Store aria-hidden="true" /><span>Торговые операторы</span></div>
              <div><Wrench aria-hidden="true" /><span>Сервисные и технические партнёры</span></div>
            </div>
            <Link className="button button-primary" href="#contact">Запросить информацию<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
      <ContactBand title="Уточнить информацию о резидентах" text="Расскажем об экосистеме парка и актуальных возможностях для размещения бизнеса." />
    </main>
  );
}
