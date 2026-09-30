import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, Handshake, Truck } from "lucide-react";
import { ContactBand } from "@/components/ContactBand";

export const metadata: Metadata = {
  title: "Технические партнёры",
  description: "Партнёрство с индустриальным парком Silk Way.",
};

export default function PartnersPage() {
  return (
    <main className="motion-page">
      <section className="simple-hero section-pad partners-hero">
        <div className="container simple-hero-grid">
          <div data-motion-hero><span className="eyebrow">Сотрудничество</span><h1>Технические партнёры Silk Way</h1></div>
          <p data-reveal>Парк объединяет производителей, поставщиков и сервисные компании вокруг общей инфраструктуры. Информация о технических партнёрах публикуется после официального подтверждения.</p>
        </div>
      </section>
      <section className="partners-content section-pad">
        <div className="container partners-grid">
          <div className="partners-image" data-reveal-media><Image src="/assets/photo/project1.png" alt="Территория Silk Way" fill sizes="(max-width: 800px) 100vw, 50vw" /></div>
          <div className="partners-copy" data-reveal>
            <h2>Площадка для разных производств</h2>
            <p>Территория площадью 200 000 м² предназначена для заводов и фабрик. Здесь могут размещаться предприятия по выпуску одежды, строительных материалов и других видов продукции.</p>
            <p>Завершено возведение индустриальных объектов общей площадью более 11 тысяч квадратных метров. Строятся фабрики и заводы общей площадью 40 тысяч квадратных метров.</p>
            <div className="partner-principles">
              <div><Factory aria-hidden="true" /><span>Производственная инфраструктура</span></div>
              <div><Truck aria-hidden="true" /><span>Продуманная логистика</span></div>
              <div><Handshake aria-hidden="true" /><span>Долгосрочное сотрудничество</span></div>
            </div>
            <Link className="button button-primary" href="#contact">Обсудить партнёрство<ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
      <ContactBand title="Обсудим формат сотрудничества" text="Расскажите о вашей компании — подберём подходящий сценарий работы с индустриальным парком." />
    </main>
  );
}
