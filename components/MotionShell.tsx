"use client";

import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname, useRouter } from "next/navigation";
import { type ReactNode, useEffect, useLayoutEffect, useRef } from "react";

const transitionDuration = 0.46;

function canTransition(event: MouseEvent, link: HTMLAnchorElement, pathname: string) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (link.target === "_blank" || link.hasAttribute("download")) return false;

  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("javascript:")) return false;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return false;
  if (url.pathname === pathname && url.search === window.location.search) return false;
  return true;
}

export function MotionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);
  const firstRender = useRef(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.88,
      touchMultiplier: 1.05,
    });

    let frame = 0;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      if (!(link instanceof HTMLAnchorElement) || !canTransition(event, link, pathname) || isTransitioning.current) return;

      const overlay = overlayRef.current;
      if (!overlay || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      event.stopPropagation();
      isTransitioning.current = true;
      document.body.dataset.routeTransition = "leaving";
      window.dispatchEvent(new CustomEvent("silkway:navigation-start"));

      const destination = `${link.pathname}${link.search}${link.hash}`;
      gsap.fromTo(
        overlay,
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: transitionDuration,
          ease: "power4.inOut",
          onComplete: () => router.push(destination),
        },
      );
    };

    document.addEventListener("click", onDocumentClick, true);
    return () => document.removeEventListener("click", onDocumentClick, true);
  }, [pathname, router]);

  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (firstRender.current) {
      firstRender.current = false;
      gsap.set(overlay, { clipPath: "inset(0 0 100% 0)" });
      return;
    }

    window.scrollTo(0, 0);
    gsap.fromTo(
      overlay,
      { clipPath: "inset(0% 0 0 0)" },
      {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.62,
        ease: "power4.inOut",
        delay: 0.05,
        onComplete: () => {
          isTransitioning.current = false;
          delete document.body.dataset.routeTransition;
        },
      },
    );
  }, [pathname]);

  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const mobile = window.matchMedia("(max-width: 680px)").matches;
    const distance = mobile ? 24 : 42;
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-motion-hero]").forEach((element) => {
        const items = element.querySelectorAll(":scope > *:not([data-motion-static])");
        gsap.fromTo(
          items,
          { y: distance, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.82, stagger: 0.075, ease: "power3.out", delay: 0.12, clearProps: "transform,opacity" },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: distance, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.88,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((element) => {
        gsap.fromTo(
          element.children,
          { y: distance * 0.75, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.72,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 86%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-media]").forEach((element) => {
        const image = element.querySelector("img");
        const timeline = gsap.timeline({ scrollTrigger: { trigger: element, start: "top 88%", once: true } });
        timeline.fromTo(
          element,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 1.05, ease: "power4.inOut", clearProps: "clipPath" },
        );
        if (image) timeline.fromTo(image, { scale: 1.08 }, { scale: 1, duration: 1.25, ease: "power3.out", clearProps: "transform" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-line]").forEach((element) => {
        gsap.fromTo(
          element,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.inOut",
            transformOrigin: "left center",
            scrollTrigger: { trigger: element, start: "top 90%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: element.parentElement ?? element, start: "top bottom", end: "bottom top", scrub: 0.5 },
          },
        );
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 180);
    return () => {
      window.clearTimeout(refresh);
      context.revert();
    };
  }, [pathname]);

  return (
    <>
      {children}
      <div className="route-transition" ref={overlayRef} aria-hidden="true">
        <span className="route-transition-mark">Silk Way</span>
        <span className="route-transition-line" />
      </div>
    </>
  );
}
