"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import { useRef, useState } from "react";
import styles from "@/app/complexes.module.css";

type View = Readonly<{ src: string; title: string; detail: string }>;

export function ComplexViewGallery({ title, views }: { title: string; views: readonly View[] }) {
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const view = views[active];
  const move = (direction: number) => setActive(current => (current + direction + views.length) % views.length);

  return (
    <section className={styles.gallery} id="gallery">
      <div className="container">
        <div className={styles.galleryHead} data-reveal>
          <h2>{title}</h2>
        </div>
        <div className={styles.galleryMain}>
          <Image key={view.src} src={view.src} alt={view.title} fill sizes="(max-width: 700px) 100vw, 90vw" quality={90} />
          <button type="button" className={styles.expand} onClick={() => dialogRef.current?.showModal()} aria-label={`Развернуть изображение: ${view.title}`}><Maximize2 size={18} aria-hidden="true" />На весь экран</button>
        </div>
        <div className={styles.galleryBelow}>
          <div><h3>{view.title}</h3><p>{view.detail}</p></div>
          <div className={styles.galleryArrows} aria-label="Переключить ракурс">
            <button type="button" onClick={() => move(-1)} aria-label="Предыдущий ракурс"><ArrowLeft size={21} aria-hidden="true" /></button>
            <button type="button" onClick={() => move(1)} aria-label="Следующий ракурс"><ArrowRight size={21} aria-hidden="true" /></button>
          </div>
        </div>
        <div className={styles.galleryThumbs} aria-label="Выбрать ракурс">
          {views.map((item, index) => <button type="button" key={item.src} aria-label={item.title} aria-pressed={active === index} onClick={() => setActive(index)}><Image src={item.src} alt="" fill sizes="(max-width: 700px) 29vw, 130px" /></button>)}
        </div>
      </div>
      <dialog ref={dialogRef} className={styles.imageDialog} aria-label={view.title}>
        <button type="button" className={styles.dialogClose} onClick={() => dialogRef.current?.close()} aria-label="Закрыть изображение"><X size={24} aria-hidden="true" /></button>
        <div className={styles.dialogImage}><Image src={view.src} alt={view.title} fill sizes="100vw" quality={90} style={{ objectFit: "contain" }} /></div>
      </dialog>
    </section>
  );
}
