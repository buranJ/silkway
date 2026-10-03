"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const vertexShader = `
  uniform float uScroll;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    float focus = smoothstep(0.0, 1.0, uv.y) * uScroll * 0.14;
    p.z += focus;
    p.x += uMouse.x * (uv.y - 0.5) * 0.06;
    p.y += uMouse.y * (uv.x - 0.5) * 0.035;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv + uMouse * 0.0025;
    vec4 color = texture2D(uTexture, uv);
    float vignette = smoothstep(0.95, 0.32, distance(vUv, vec2(0.5)));
    color.rgb *= mix(0.72, 1.04, vignette);
    color.rgb = mix(color.rgb, vec3(0.035, 0.09, 0.16), 0.10 + uScroll * 0.08);
    gl_FragColor = color;
  }
`;

export function SpatialHero({ active = true }: { active?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const posterRef = useRef<HTMLImageElement>(null);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Portrait devices use the already loaded poster. The WebGL facade can
    // render an empty frame at this aspect ratio and cover the image.
    if (reducedMotion || window.matchMedia("(max-width: 759px)").matches) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.z = 5;

    const uniforms = {
      uTexture: { value: new THREE.Texture() },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2() },
    };

    const planeGeometry = new THREE.PlaneGeometry(1, 1, 48, 28);
    const planeMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    // Reuse the responsive image that is already on screen. Downloading the
    // original again for WebGL used to compete with the masterplan texture.
    const poster = posterRef.current;
    const updatePosterTexture = () => {
      if (poster?.naturalWidth) {
        const texture = new THREE.Texture(poster);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.anisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8);
        texture.needsUpdate = true;
        uniforms.uTexture.value.dispose();
        uniforms.uTexture.value = texture;
        canvas.classList.add("is-ready");
      }
    };
    if (poster?.complete) updatePosterTexture();
    poster?.addEventListener("load", updatePosterTexture);

    const pointerTarget = new THREE.Vector2();
    const pointerCurrent = new THREE.Vector2();
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let visible = true;

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 760 ? 1.15 : 1.5));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const imageAspect = 16 / 9;
      if (visibleWidth / visibleHeight > imageAspect) {
        plane.scale.set(visibleWidth, visibleWidth / imageAspect, 1);
      } else {
        plane.scale.set(visibleHeight * imageAspect, visibleHeight, 1);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerTarget.set(((event.clientX - rect.left) / rect.width - 0.5) * 2, -((event.clientY - rect.top) / rect.height - 0.5) * 2);
    };

    const onPointerLeave = () => pointerTarget.set(0, 0);
    const onScroll = () => {
      const rect = host.getBoundingClientRect();
      scrollTarget = THREE.MathUtils.clamp(-rect.top / Math.max(window.innerHeight, 1), 0, 1);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(host);

    host.addEventListener("pointermove", onPointerMove, { passive: true });
    host.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    resize();
    onScroll();

    let frame = 0;
    const render = () => {
      frame = requestAnimationFrame(render);
      if (!visible || !activeRef.current || document.hidden) return;

      pointerCurrent.lerp(pointerTarget, 0.045);
      scrollCurrent = THREE.MathUtils.lerp(scrollCurrent, scrollTarget, 0.055);
      uniforms.uMouse.value.copy(pointerCurrent);
      uniforms.uScroll.value = scrollCurrent;

      camera.position.x = pointerCurrent.x * 0.08;
      camera.position.y = pointerCurrent.y * 0.045 - scrollCurrent * 0.08;
      camera.position.z = 5 - scrollCurrent * 0.45;
      renderer.render(scene, camera);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      poster?.removeEventListener("load", updatePosterTexture);
      planeGeometry.dispose();
      planeMaterial.dispose();
      if (uniforms.uTexture.value instanceof THREE.Texture) uniforms.uTexture.value.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="spatial-hero" ref={hostRef} aria-hidden="true">
      {/* A native responsive image lets WebGL reuse the same decoded bitmap. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={posterRef}
        className="spatial-hero-poster"
        src="/assets/optimized/v1/hero-1920.webp"
        srcSet="/assets/optimized/v1/hero-960.webp 960w, /assets/optimized/v1/hero-1920.webp 1920w"
        alt=""
        width={1920}
        height={1080}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        sizes="100vw"
      />
      <canvas ref={canvasRef} className="spatial-hero-canvas" />
    </div>
  );
}
