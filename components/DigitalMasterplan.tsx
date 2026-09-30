"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, type MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SilkWayModel, zoneFocus, planBoundary, planPoint } from "@/components/SilkWayModel";

type View = "overview" | "detail" | "plan";

const planBounds = planBoundary.flatMap(([x, z]) => [0, .8].map(y => new THREE.Vector3(...planPoint(x, z, y))));

// This mounts inside Suspense: textures and geometry are available before
// the second frame confirms that the canvas has actually drawn the scene.
function SceneReady({ onReady }: { onReady: () => void }) {
  const frames = useRef(0);
  useFrame(() => { if (++frames.current === 2) onReady(); });
  return null;
}

function CameraRig({ active, progress, reducedMotion, view }: { active: number; progress?: MutableRefObject<number>; reducedMotion: boolean; view: View }) {
  const target = useRef(new THREE.Vector3(-1.8, 0, .8));
  const desired = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const initialized = useRef(false);
  const fitDirection = useRef(new THREE.Vector3());
  const fitRight = useRef(new THREE.Vector3());
  const fitUp = useRef(new THREE.Vector3());
  useFrame(({ camera, pointer, size }, delta) => {
    const mobile = size.width < 760;
    if (progress) {
      const p = THREE.MathUtils.smoothstep(progress.current, .12, .95);
      if (camera instanceof THREE.PerspectiveCamera) {
        // Use the actual site outline to fit the available screen closely.
        look.current.set(0, 0, 0);
        if (mobile) fitDirection.current.set(THREE.MathUtils.lerp(25, 22, p), 30, THREE.MathUtils.lerp(3, 7, p)).normalize();
        else fitDirection.current.set(THREE.MathUtils.lerp(-16, -12, p), THREE.MathUtils.lerp(18, 23, p), 20).normalize();
        fitRight.current.crossVectors(camera.up, fitDirection.current).normalize();
        fitUp.current.crossVectors(fitDirection.current, fitRight.current).normalize();
        const tanY = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
        const tanX = tanY * size.width / size.height;
        let distance = 0;
        for (const point of planBounds) {
          const depth = point.dot(fitDirection.current);
          distance = Math.max(distance, Math.abs(point.dot(fitRight.current)) / tanX + depth, Math.abs(point.dot(fitUp.current)) / tanY + depth);
        }
        if (mobile) {
          // Reveal the complete plan first, then move in toward each active zone.
          const approach = THREE.MathUtils.smoothstep(progress.current, .46, .68);
          const focus = zoneFocus[Math.max(0, active)];
          look.current.copy(focus).multiplyScalar(approach);
          const closeDistance = active === 4 ? .38 : .55;
          const scale = THREE.MathUtils.lerp(1.025, closeDistance, approach);
          desired.current.copy(fitDirection.current).multiplyScalar(distance * scale).add(look.current);
        } else {
          const approach = THREE.MathUtils.smoothstep(progress.current, .44, .68);
          const focus = zoneFocus[Math.max(0, active)];
          const gentleZoom = THREE.MathUtils.lerp(1, active === 4 ? .95 : .97, approach);
          const framingDistance = distance * 1.015 / (1.25 * 1.12) * gentleZoom;
          look.current.copy(focus).multiplyScalar(approach * .18);
          // Lower the camera's aim in screen space to lift the terrain above the text.
          look.current.addScaledVector(fitUp.current, -framingDistance * tanY * .24);
          desired.current.copy(fitDirection.current).multiplyScalar(framingDistance).add(look.current);
        }
      }
    } else if (view === "detail") {
      look.current.copy(zoneFocus[active]);
      desired.current.copy(look.current).add(new THREE.Vector3(-6, 7.5, 8).multiplyScalar((mobile ? 1.4 : 1) * (active === 4 ? .45 : 1)));
    } else if (view === "plan") {
      look.current.set(0, 0, 0);
      desired.current.set(0, mobile ? 44 : 24, .35);
    } else {
      if (mobile) look.current.set(0, 0, .5);
      else look.current.copy(zoneFocus[active]).multiplyScalar(.38);
      desired.current.copy(look.current).add(new THREE.Vector3(-15, 20, 19).multiplyScalar(mobile ? 2.15 : .82));
    }
    if (!reducedMotion && !mobile && view !== "plan") { desired.current.x += pointer.x * .3; desired.current.y += pointer.y * .16; }
    const damping = reducedMotion || !initialized.current ? 1 : 1 - Math.exp(-Math.min(delta, .1) * 3.5);
    initialized.current = true;
    camera.position.lerp(desired.current, damping);
    target.current.lerp(look.current, damping);
    camera.lookAt(target.current);
  });
  return null;
}

function Scene({ active, onSelect, progress, reducedMotion, view = "overview" }: { active: number; onSelect?: (index: number) => void; progress?: MutableRefObject<number>; reducedMotion: boolean; view?: View }) {
  const shadowSize = useThree(state => state.size.width < 760 ? 1024 : 2048);
  return <>
    <color attach="background" args={["#122b38"]} />
    <ambientLight intensity={.45} />
    <hemisphereLight args={["#e8f1fa", "#707354", .9]} />
    <directionalLight position={[-12, 20, -9]} intensity={2.1} color="#fff4df" castShadow
      shadow-mapSize-width={shadowSize} shadow-mapSize-height={shadowSize}
      shadow-camera-left={-17} shadow-camera-right={17} shadow-camera-top={13} shadow-camera-bottom={-13}
      shadow-camera-near={.5} shadow-camera-far={60} shadow-normalBias={.025} shadow-bias={-.0001} />
    <CameraRig active={active} progress={progress} reducedMotion={reducedMotion} view={view} />
    <SilkWayModel active={active} onSelect={onSelect} moving={!reducedMotion} />
  </>;
}

function useCanvasActivity(eager = false) {
  const host = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(eager);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update(); media.addEventListener("change", update);
    let intersecting = false;
    const visibility = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      if (intersecting) setMounted(true);
      visibility();
    }, { rootMargin: "120px" });
    observer.observe(element);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); media.removeEventListener("change", update); document.removeEventListener("visibilitychange", visibility); };
  }, []);
  return { host, visible, mounted, reducedMotion };
}

export function HeroMasterplan({ progress, active, playing = true }: { progress: MutableRefObject<number>; active: number; playing?: boolean }) {
  const { host, visible, mounted, reducedMotion } = useCanvasActivity(true);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  return <div className={`hero-masterplan-canvas ${ready ? "is-ready" : ""}`} aria-hidden="true" ref={host}>
    {mounted && <Canvas shadows="basic" dpr={[1, 1.5]} camera={{ position: [-20, 20, 24], fov: 40, near: .1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} frameloop={!ready ? "always" : visible ? (playing && !reducedMotion) ? "always" : "demand" : "never"}
      fallback={<div className="digital-masterplan-fallback" />}>
      <Suspense fallback={null}><Scene active={active} progress={progress} reducedMotion={reducedMotion} /><SceneReady onReady={onReady} /></Suspense>
    </Canvas>}
  </div>;
}

export function DigitalMasterplan({ active, onSelect, onSceneReady }: { active: number; onSelect: (index: number) => void; onSceneReady?: () => void }) {
  const { host, visible, mounted, reducedMotion } = useCanvasActivity();
  const [view, setView] = useState<View>("detail");
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => { setReady(true); onSceneReady?.(); }, [onSceneReady]);
  return <div className={`digital-masterplan ${ready ? "is-ready" : ""}`} ref={host}>
    {mounted && <Canvas shadows="basic" dpr={[1, 1.5]} camera={{ position: [-20, 24, 25], fov: 38, near: .1, far: 100 }}
      style={{ opacity: ready ? 1 : 0, transition: "opacity 240ms ease" }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }} frameloop={!ready ? "always" : visible ? reducedMotion ? "demand" : "always" : "never"}
      fallback={null}>
      <Suspense fallback={null}><Scene active={active} onSelect={onSelect} reducedMotion={reducedMotion} view={view} /><SceneReady onReady={onReady} /></Suspense>
    </Canvas>}
    <div className="digital-masterplan-vignette" />
    <div className="masterplan-view-controls" role="group" aria-label="Ракурс генплана">
      {([ ["overview", "Весь комплекс"], ["detail", "Ближе"], ["plan", "Вид сверху"] ] as const).map(([value, label]) =>
        <button type="button" key={value} aria-pressed={view === value} onClick={() => setView(value)}>{label}</button>)}
    </div>
  </div>;
}
