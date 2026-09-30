"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contacts, navigation } from "@/content/site";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const isHome = pathname === "/";
  const isTrade = pathname === "/trade";
  const overHero = (isTrade || isHome) && !isPastHero;

  function closeMenu(returnFocus = true) {
    setIsOpen(false);
    if (returnFocus) requestAnimationFrame(() => menuButtonRef.current?.focus());
  }

  useEffect(() => {
    const onNavigationStart = () => setIsOpen(false);
    window.addEventListener("silkway:navigation-start", onNavigationStart);
    return () => window.removeEventListener("silkway:navigation-start", onNavigationStart);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };
    if (isOpen) requestAnimationFrame(() => closeButtonRef.current?.focus());
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isHome && !isTrade) return;

    const updateHeader = () => {
      const hero = document.getElementById(isTrade ? "trade-hero" : "home-hero");
      setIsPastHero(hero ? hero.getBoundingClientRect().bottom <= 90 : window.scrollY > window.innerHeight * 0.72);
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, [isHome, isTrade]);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
        progressRef.current?.style.setProperty("--scroll-progress", progress.toString());
      });
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [pathname]);

  return (
    <>
      <header className={`site-header ${isHome || isTrade ? "site-header-home" : ""} ${overHero ? "is-over-hero" : ""} ${isTrade && isPastHero ? "site-header-trade-scrolled" : ""}`}>
        <div className="container header-inner">
          <Link href="/" className="brand" aria-label="Silk Way — на главную">
            <Image
              src={overHero ? "/logo-white.png" : "/logo.png"}
              width={overHero ? 139 : 132}
              height={overHero ? 44 : 37}
              alt="Silk Way"
              priority
              unoptimized
            />
          </Link>

          <nav className="desktop-nav" aria-label="Основная навигация">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""} aria-current={pathname === item.href ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a className="header-contact" href={contacts.phones[2].href} aria-label={`Позвонить: ${contacts.phones[2].label}`}>Связаться</a>
            <button ref={menuButtonRef} className="menu-button" type="button" onClick={() => setIsOpen(true)} aria-label="Открыть меню" aria-expanded={isOpen}>
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>
        <span className="header-progress" ref={progressRef} aria-hidden="true" />
      </header>

      <div className={`menu-overlay ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen} onClick={() => closeMenu()} />
      <aside className={`mobile-menu ${isOpen ? "is-open" : ""}`} aria-label="Мобильное меню" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="mobile-menu-head">
          <Link href="/" aria-label="Silk Way — на главную">
            <Image src="/logo.png" width={132} height={37} alt="Silk Way" unoptimized />
          </Link>
          <button ref={closeButtonRef} type="button" onClick={() => closeMenu()} aria-label="Закрыть меню">
            <X size={25} aria-hidden="true" />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Мобильная навигация">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className={pathname === item.href ? "is-active" : ""} aria-current={pathname === item.href ? "page" : undefined} onClick={() => closeMenu(false)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-location">
            <span className="menu-label">Адрес</span>
            <p>{contacts.address}</p>
            <a className="mobile-menu-map" href={contacts.map2gis} target="_blank" rel="noopener noreferrer">
              Открыть в 2ГИС <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="mobile-menu-actions" aria-label="Соцсети и контакты">
            <a href={contacts.instagram} target="_blank" rel="noopener noreferrer">
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span>Instagram</span>
            </a>
            <a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppIcon size={21} aria-hidden="true" /><span>WhatsApp</span></a>
            <a href={contacts.phones[2].href} aria-label={`Позвонить: ${contacts.phones[2].label}`}><Phone size={21} aria-hidden="true" /><span>Позвонить</span></a>
          </div>
        </div>
      </aside>
    </>
  );
}
