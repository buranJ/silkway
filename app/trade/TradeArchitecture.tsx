"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useRef, useState } from "react";
import styles from "./trade.module.css";

const views = [
  {
    src: "/assets/photo/trade-enhanced.png",
    title: "Фасад торгового комплекса",
    detail: "Главный вход, витражи и парковка перед зданием.",
    position: "center center",
  },
  {
    src: "/assets/photo/hero-1.jpg",
    title: "Входная группа Silk Way",
    detail: "Центральный вход со стороны посетительской парковки.",
    position: "center center",
  },
  {
    src: "/assets/photo/ren2-web.jpg",
    title: "Корпуса и внутренняя территория",
    detail: "Торговые здания, проезды и парковочные площади в общей схеме проекта.",
    position: "center 58%",
  },
];

export function TradeArchitecture() {
  const [activeView, setActiveView] = useState(0);
  const imageDialogRef = useRef<HTMLDialogElement>(null);
  const view = views[activeView];
  const moveView = (direction: number) => setActiveView(current => (current + direction + views.length) % views.length);

  return (
    <section className={styles.architecture} id="gallery">
      <div className="container">
        <div className={styles.architectureHead}>
          <h2>Корпуса Silk Way</h2>
          <p>Проектные виды показывают комплекс и территорию в целом.</p>
        </div>

        <div className={styles.architectureViews}>
            <div className={styles.architectureMainImage}>
              <Image key={view.src} src={view.src} alt={view.title} fill sizes="(max-width: 700px) 100vw, 85vw" style={{ objectPosition: view.position }} />
              <button type="button" className={styles.architectureExpand} onClick={() => imageDialogRef.current?.showModal()} aria-label={`Развернуть изображение: ${view.title}`}>
                <Maximize2 size={18} aria-hidden="true" />
                <span>На весь экран</span>
              </button>
            </div>
            <div className={styles.architectureViewBottom}>
              <div className={styles.architectureViewCaption}>
                <h3>{view.title}</h3>
                <p>{view.detail}</p>
              </div>
              <div className={styles.architectureArrows} aria-label="Переключить ракурс">
                <button type="button" onClick={() => moveView(-1)} aria-label="Предыдущий ракурс"><ArrowLeft size={22} aria-hidden="true" /></button>
                <button type="button" onClick={() => moveView(1)} aria-label="Следующий ракурс"><ArrowRight size={22} aria-hidden="true" /></button>
              </div>
            </div>
            <div className={styles.architectureThumbnails} aria-label="Выбрать ракурс">
              {views.map((item, index) => (
                <button type="button" key={item.src} aria-label={item.title} aria-pressed={activeView === index} onClick={() => setActiveView(index)}>
                  <Image src={item.src} alt="" fill sizes="(max-width: 700px) 27vw, 150px" />
                </button>
              ))}
            </div>
        </div>
      </div>
      <dialog ref={imageDialogRef} className={styles.architectureDialog} aria-label={view.title} onClick={event => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}>
        <button type="button" className={styles.architectureDialogClose} onClick={() => imageDialogRef.current?.close()} aria-label="Закрыть изображение">
          <X size={24} aria-hidden="true" />
        </button>
        <div className={styles.architectureDialogImage}>
          <Image src={view.src} alt={view.title} fill sizes="100vw" style={{ objectFit: "contain" }} />
        </div>
      </dialog>
    </section>
  );
}
