"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ArrowUpRight, Move3d } from "lucide-react";
import { useCallback, useState } from "react";

const DigitalMasterplan = dynamic(() => import("@/components/DigitalMasterplan").then(module => module.DigitalMasterplan), { ssr: false });

const zones = [
  {
    title: "Торговый комплекс",
    text: "Фронтальная зона с выставочными корпусами и крупной гостевой парковкой.",
    href: "/trade",
  },
  {
    title: "Тканевый комплекс",
    text: "Центральный торгово-складской кластер с короткими внутренними маршрутами.",
    href: "/textile",
  },
  {
    title: "Промышленный комплекс",
    text: "Производственные корпуса, участки под фабрики и собственная грузовая логистика.",
    href: "/industrial",
  },
  {
    title: "Жилая и социальная среда",
    text: "Жильё, спорт, медицина и сервисная инфраструктура рядом с рабочими местами.",
    href: "/residential",
  },
  {
    title: "Мечеть",
    text: "Мечеть на территории Silk Way. Выберите ракурс «Ближе», чтобы рассмотреть её отдельно.",
    href: "#contact",
  },
];

export function MasterplanExplorer() {
  const [active, setActive] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);
  const onSceneReady = useCallback(() => setSceneReady(true), []);

  return (
    <section className="masterplan-experience section-pad" id="masterplan">
      <div className="container">
        <header className="masterplan-heading" data-reveal>
          <h2>Интерактивный генплан</h2>
        </header>

        <div className="masterplan-stage masterplan-stage-3d">
          <div className={`masterplan-plane ${sceneReady ? "is-ready" : ""}`}>
            <div className="masterplan-poster" role="img" aria-label="Генеральный план Silk Way" />
            <DigitalMasterplan active={active} onSelect={setActive} onSceneReady={onSceneReady} />
            <div className="masterplan-zone-controls" aria-label="Зоны цифрового генплана">
              {zones.map((zone, index) => (
                <button
                  type="button"
                  key={zone.title}
                  className={active === index ? "is-active" : ""}
                  onClick={() => setActive(index)}
                  aria-pressed={active === index}
                >
                  {zone.title}
                </button>
              ))}
            </div>
          </div>

          <aside className="masterplan-card" data-reveal>
            <span className="masterplan-card-icon"><Move3d size={18} aria-hidden="true" /> Пространственная схема</span>
            <h3>{zones[active].title}</h3>
            <p>{zones[active].text}</p>
            <Link href={zones[active].href}>{active === 4 ? "Связаться с нами" : "Подробнее"} <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
