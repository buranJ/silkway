"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

// Footprints traced against the 2016 × 1245 preview of ren3.jpg.
// Heights are estimates from ren1/ren2, not architectural survey dimensions.
const UNIT = 84;
export const planPoint = (x: number, z: number, y = 0): [number, number, number] => [(x - 1008) / UNIT, y, (z - 622.5) / UNIT];
export const zoneFocus = [planPoint(340, 630), planPoint(700, 525), planPoint(900, 820), planPoint(1590, 810), planPoint(688, 694)].map(p => new THREE.Vector3(...p));
export const planBoundary = [[63, 55], [248, 65], [535, 145], [1510, 410], [1510, 493], [1120, 412],
  [1290, 548], [1755, 733], [1990, 781], [1990, 1080], [1360, 1100], [1250, 1198], [74, 1120], [65, 425]];

type Hall = { x: number; z: number; w: number; d: number; h: number; zone: number; bays?: number; expo?: boolean; angle?: number };
const halls: Hall[] = [
  { x: 288, z: 529, w: 126, d: 172, h: .43, zone: 0, bays: 4, expo: true },
  { x: 398, z: 529, w: 80, d: 172, h: .43, zone: 0, bays: 4, expo: true },
  { x: 288, z: 751, w: 126, d: 172, h: .43, zone: 0, bays: 4, expo: true },
  { x: 398, z: 751, w: 80, d: 172, h: .43, zone: 0, bays: 4, expo: true },
  { x: 294, z: 637, w: 124, d: 24, h: .14, zone: 0 },
  ...[459, 495, 534, 574, 614, 653].map(z => ({ x: 535, z, w: 42, d: 31, h: .17, zone: 1 })),
  ...[568, 585, 602, 619, 636, 653].flatMap(x => [456, 515, 592, 650].map((z, i) => ({ x, z, w: 12, d: i === 1 || i === 2 ? 66 : 30, h: .14, zone: 1 }))),
  ...[771, 790, 809, 828].flatMap(x => [508, 572, 629].map(z => ({ x, z, w: 14, d: 49, h: .17, zone: 1 }))),
  { x: 550, z: 395, w: 60, d: 80, h: .24, zone: 1 },
  { x: 635, z: 408, w: 105, d: 65, h: .24, zone: 1, bays: 4, angle: -.22 },
  { x: 818, z: 450, w: 112, d: 45, h: .26, zone: 1, bays: 4, angle: -.25 },
  { x: 930, z: 558, w: 68, d: 115, h: .3, zone: 1, bays: 3, angle: -.75 },
  ...[[566, 700, 110, 44], [811, 702, 108, 44], [933, 702, 108, 44],
    [564, 763, 110, 46], [687, 763, 108, 46], [810, 763, 108, 46], [933, 763, 108, 46], [1054, 767, 107, 44],
    [689, 857, 113, 47], [810, 857, 110, 47], [932, 857, 110, 47], [1053, 857, 110, 47], [1175, 857, 102, 47],
    [688, 919, 113, 48], [810, 919, 110, 48], [932, 919, 110, 48], [1053, 919, 110, 48], [1175, 919, 102, 48],
    [542, 814, 52, 24], [593, 814, 44, 24], [807, 814, 111, 24], [1053, 814, 111, 24],
    [534, 879, 44, 28], [581, 879, 42, 28], [532, 920, 39, 34], [586, 920, 43, 34]]
    .map(([x, z, w, d]) => ({ x, z, w, d, h: d < 30 ? .17 : .24, zone: 2 })),
  // Low buildings visible beside the sports grounds.
  ...[711, 738, 762, 793, 942, 968].map(z => ({ x: 1500, z, w: 54, d: 17, h: .14, zone: 3 })),
  { x: 1432, z: 841, w: 40, d: 51, h: .22, zone: 3, angle: .2 },
  { x: 1495, z: 870, w: 45, d: 106, h: .18, zone: 3 },
  { x: 239, z: 915, w: 27, d: 122, h: .19, zone: 4 },
  { x: 336, z: 895, w: 25, d: 23, h: .12, zone: 4 },
  { x: 247, z: 278, w: 19, d: 73, h: .14, zone: 4, angle: .9 },
  { x: 233, z: 132, w: 115, d: 29, h: .2, zone: 4, angle: -.27 },
];

const palette = {
  wall: "#edece6", red: "#ba1831", roof: "#bccbd0", roofAlt: "#d5dfe0",
  glass: "#415d64", door: "#ced2cb", trim: "#e4e6df", yellow: "#c2b249",
  blue: "#4696bc", leaf: "#43643a", gold: "#a9a74c", dark: "#647270", seam: "#a4b5bd",
};
type MaterialKey = keyof typeof palette;
type Part = { key: MaterialKey; zone: number; geometry: THREE.BufferGeometry };

function makeArchitecture() {
  const parts: Part[] = [];
  const box = (key: MaterialKey, zone: number, x: number, y: number, z: number, w: number, h: number, d: number, transform?: THREE.Matrix4) => {
    const g = new THREE.BoxGeometry(w, h, d);
    g.translate(x, y, z);
    if (transform) g.applyMatrix4(transform);
    parts.push({ key, zone, geometry: g });
  };
  for (const hall of halls) {
    const w = hall.w / UNIT, d = hall.d / UNIT, h = hall.h;
    const transform = new THREE.Matrix4().makeRotationY(hall.angle ?? 0);
    transform.setPosition(...planPoint(hall.x, hall.z));
    const accent: MaterialKey = hall.zone < 2 ? "red" : hall.zone === 2 ? "yellow" : "blue";
    box("wall", hall.zone, 0, h / 2, 0, w, h, d, transform);
    box("dark", hall.zone, 0, .022, 0, w + .01, .044, d + .01, transform);
    for (const side of [-1, 1]) {
      box(accent, hall.zone, side * (w / 2 + .003), h - .034, 0, .018, .073, d + .018, transform);
      const modules = Math.max(2, Math.round(hall.d / (hall.expo ? 48 : 19)));
      for (let i = 0; i < modules; i++) {
        const z = -d / 2 + (i + .5) * d / modules;
        box(hall.expo ? "glass" : "door", hall.zone, side * (w / 2 + .009), h * .4, z, .014, h * .64, d / modules * .66, transform);
        box(accent, hall.zone, side * (w / 2 + .018), h * .47, z - d / modules * .42, .032, h * .95, .045, transform);
        if (hall.expo) {
          box("trim", hall.zone, side * (w / 2 + .055), .035, z, .11, .018, d / modules * .67, transform);
          box("trim", hall.zone, side * (w / 2 + .045), h * .71, z, .085, .016, d / modules * .67, transform);
          for (let mullion = 0; mullion < 5; mullion++) {
            box("trim", hall.zone, side * (w / 2 + .022), h * .4, z + (mullion - 2) * d / modules * .13, .008, h * .64, .008, transform);
          }
        }
      }
    }
    for (const side of [-1, 1]) box(accent, hall.zone, 0, h - .015, side * d / 2, w, .032, .018, transform);
    // Shallow repeated gables follow the EXPO roof profile in the supplied renders.
    const bays = hall.bays ?? 1;
    const positions: number[] = [];
    const push = (...vertices: number[]) => positions.push(...vertices);
    for (let bay = 0; bay < bays; bay++) {
      const z0 = -d / 2 + bay * d / bays, z1 = z0 + d / bays, mid = (z0 + z1) / 2;
      const peak = h + Math.min(.09, d / bays * .13);
      const left = -w / 2 - .018, right = w / 2 + .018;
      push(left, h, z0, right, peak, mid, right, h, z0, left, h, z0, left, peak, mid, right, peak, mid);
      push(left, peak, mid, right, h, z1, right, peak, mid, left, peak, mid, left, h, z1, right, h, z1);
      push(left, h, z0, left, h, z1, left, peak, mid, right, h, z0, right, peak, mid, right, h, z1);
      box("trim", hall.zone, 0, peak + .004, mid, w + .04, .009, .011, transform);
      if (hall.expo) {
        const rise = peak - h, run = (z1 - z0) / 2;
        for (let x = left + .035; x < right; x += .035) for (const slope of [-1, 1]) {
          const seam = new THREE.BoxGeometry(.003, .003, Math.hypot(run, rise));
          seam.rotateX(slope * Math.atan2(rise, run));
          seam.translate(x, (h + peak) / 2 + .003, mid + slope * run / 2);
          seam.applyMatrix4(transform);
          parts.push({ key: "seam", zone: hall.zone, geometry: seam });
        }
      }
    }
    const roof = new THREE.BufferGeometry();
    roof.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    roof.computeVertexNormals(); roof.applyMatrix4(transform);
    parts.push({ key: hall.expo ? "roof" : "roofAlt", zone: hall.zone, geometry: roof });
  }
  const mosque = new THREE.Matrix4().makeRotationY(.16);
  mosque.setPosition(...planPoint(688, 694));
  box("wall", 5, 0, .12, 0, .6, .24, .6, mosque);
  box("leaf", 5, 0, .25, 0, .66, .027, .66, mosque);
  const dome = new THREE.SphereGeometry(.13, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  dome.translate(0, .265, 0); dome.applyMatrix4(mosque);
  parts.push({ key: "gold", zone: 5, geometry: dome });
  for (const x of [-.37, .37]) for (const z of [-.37, .37]) {
    const tower = new THREE.CylinderGeometry(.023, .036, .57, 10);
    tower.translate(x, .285, z); tower.applyMatrix4(mosque);
    parts.push({ key: "wall", zone: 5, geometry: tower });
    const cap = new THREE.ConeGeometry(.035, .12, 10);
    cap.translate(x, .63, z); cap.applyMatrix4(mosque);
    parts.push({ key: "gold", zone: 5, geometry: cap });
  }
  for (let i = 0; i < 24; i++) {
    const [x, , z] = planPoint(190 + i * 8.9, 318);
    box("wall", 4, x, .05, z, .05, .10, .22);
    box("blue", 4, x, .037, z + .135, .052, .072, .056);
  }
  // Batch by material/zone to keep the architectural detail affordable on mobile.
  const merged: Part[] = [];
  for (let zone = 0; zone < 6; zone++) for (const key of Object.keys(palette) as MaterialKey[]) {
    const group = parts.filter(p => p.zone === zone && p.key === key);
    if (!group.length) continue;
    const geometries = group.map(p => {
      const g = p.geometry.index ? p.geometry.toNonIndexed() : p.geometry.clone();
      g.deleteAttribute("uv"); return g;
    });
    const geometry = mergeGeometries(geometries);
    geometries.forEach(g => g.dispose());
    if (geometry) merged.push({ zone, key, geometry });
  }
  parts.forEach(p => p.geometry.dispose());
  return merged;
}

function Architecture({ active, onSelect }: { active: number; onSelect?: (index: number) => void }) {
  const geometry = useMemo(() => makeArchitecture(), []);
  const selectedZone = active === 4 ? 5 : active;
  useEffect(() => () => geometry.forEach(part => part.geometry.dispose()), [geometry]);
  return <group>{geometry.map(part => <mesh key={`${part.zone}-${part.key}`} geometry={part.geometry} castShadow receiveShadow
    onClick={onSelect && part.zone !== 4 ? event => { event.stopPropagation(); onSelect(part.zone === 5 ? 4 : part.zone); } : undefined}
    onPointerOver={onSelect && part.zone !== 4 ? event => { event.stopPropagation(); document.body.style.cursor = "pointer"; } : undefined}
    onPointerOut={onSelect ? () => { document.body.style.cursor = ""; } : undefined}>
    <meshStandardMaterial color={palette[part.key]} roughness={part.key === "glass" ? .28 : .78}
      metalness={part.key === "roof" || part.key === "roofAlt" ? .2 : .03}
      emissive={part.zone === selectedZone ? active === 4 ? "#ffc65b" : "#ff254d" : "#000000"} emissiveIntensity={part.zone === selectedZone ? .38 : 0}
      side={THREE.DoubleSide} />
  </mesh>)}</group>;
}

const treeLines = [
  [120, 190, 110, 1060, 72], [110, 1040, 1270, 1090, 82], [184, 956, 1200, 962, 71],
  [1350, 1060, 1940, 1055, 44], [1950, 820, 1940, 1040, 17],
  [530, 180, 1480, 460, 74], [515, 240, 932, 370, 32],
  [975, 421, 1285, 572, 28], [1290, 590, 1750, 776, 40],
  [985, 450, 1220, 713, 29], [1280, 747, 1370, 916, 15],
  [625, 805, 742, 805, 12], [874, 810, 988, 810, 12],
  [471, 407, 471, 837, 33], [180, 650, 180, 835, 15],
  [1285, 610, 1390, 683, 10], [1565, 667, 1680, 720, 12],
];

function Trees() {
  const crown = useMemo(() => {
    const lobes = [[0, .3, 0, .78], [-.45, -.1, .1, .65], [.42, -.08, .16, .67], [0, -.15, -.4, .7]];
    const pieces = lobes.map(([x, y, z, scale]) => {
      const geometry = new THREE.IcosahedronGeometry(scale, 1);
      geometry.translate(x, y, z); return geometry;
    });
    const geometry = mergeGeometries(pieces)!;
    pieces.forEach(piece => piece.dispose());
    return geometry;
  }, []);
  useEffect(() => () => crown.dispose(), [crown]);
  const trees = useMemo(() => {
    const matrices: THREE.Matrix4[] = [], colors: THREE.Color[] = [];
    const temp = new THREE.Object3D();
    treeLines.forEach(([x1, z1, x2, z2, count], row) => {
      for (let i = 0; i < count; i++) {
        const t = i / Math.max(1, count - 1), seed = Math.sin(i * 37.2 + row * 19.7) * .5 + .5;
        const size = .065 + seed * .037;
        const point = planPoint(x1 + (x2 - x1) * t + Math.sin(i * 5) * 2, z1 + (z2 - z1) * t);
        temp.position.set(point[0], .11 + size * .5, point[2]);
        temp.scale.set(size, size * 1.1, size * .95); temp.rotation.set(seed, i * 1.37, 0);
        temp.updateMatrix(); matrices.push(temp.matrix.clone());
        colors.push(new THREE.Color().setHSL(.22 + seed * .055, .28 + seed * .13, .12 + seed * .065));
      }
    });
    return { matrices, colors };
  }, []);
  const mesh = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    if (!mesh.current) return;
    trees.matrices.forEach((matrix, i) => { mesh.current!.setMatrixAt(i, matrix); mesh.current!.setColorAt(i, trees.colors[i]); });
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    mesh.current.computeBoundingSphere();
  }, [trees]);
  return <instancedMesh ref={mesh} args={[crown, undefined, trees.matrices.length]} castShadow receiveShadow>
    <meshStandardMaterial roughness={1} />
  </instancedMesh>;
}

function ExpoSigns() {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas"); canvas.width = 1024; canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#b81730"; ctx.fillRect(0, 0, 1024, 128);
    ctx.fillStyle = "#ffffff"; ctx.textBaseline = "middle";
    ctx.font = "italic 54px Georgia"; ctx.fillText("Silk Way", 50, 65);
    ctx.font = "500 48px Arial"; ctx.fillText("EXPO", 730, 65);
    const result = new THREE.CanvasTexture(canvas); result.colorSpace = THREE.SRGBColorSpace; return result;
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return <group>{halls.filter(h => h.expo).flatMap((h, index) => [-1, 1].map(side =>
    <mesh key={`${index}-${side}`} position={planPoint(h.x + side * (h.w / 2 + 1.9), h.z, h.h - .035)} rotation={[0, side * Math.PI / 2, 0]}>
      <planeGeometry args={[h.d / UNIT * .78, .071]} /><meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>))}</group>;
}

function Traffic({ moving }: { moving: boolean }) {
  const vehicles = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!moving || !vehicles.current) return;
    vehicles.current.children.forEach((vehicle, i) => {
      const t = (clock.elapsedTime * .018 + i / 6) % 1;
      vehicle.position.set(...planPoint(i < 3 ? 460 : 449, 360 + (i < 3 ? t : 1 - t) * 565, .035));
    });
  });
  return <group ref={vehicles}>{Array.from({ length: 6 }, (_, i) => <group key={i} position={planPoint(i < 3 ? 460 : 449, 400 + i * 75, .035)}>
    <mesh castShadow><boxGeometry args={[.045, .043, .105]} /><meshStandardMaterial color={i % 3 === 0 ? "#bd243d" : "#e5e5dc"} roughness={.5} /></mesh>
    <mesh position={[0, .031, -.005]}><boxGeometry args={[.037, .025, .055]} /><meshStandardMaterial color="#43545a" roughness={.3} /></mesh>
  </group>)}</group>;
}

function ZoneHighlight({ active, moving }: { active: number; moving: boolean }) {
  const halo = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const pulse = moving ? Math.sin(clock.elapsedTime * 2.4) : 0;
    if (halo.current) halo.current.opacity = .13 + pulse * .025;
  });
  if (active < 0 || active >= zoneFocus.length) return null;
  const sizes = [[1.9, 3.1], [3.1, 2.2], [4.2, 1.9], [3.2, 2.2], [.75, .75]];
  const [width, depth] = sizes[active];
  const color = active === 4 ? "#ffc65b" : "#ff3659";
  return <group position={zoneFocus[active]}>
    <group rotation={[-Math.PI / 2, 0, 0]} position={[0, .035, 0]} scale={[width, depth, 1]}>
      <mesh>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial ref={halo} color={color} transparent opacity={.13} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, .005]}>
        <ringGeometry args={[.98, 1.025, 64]} />
        <meshBasicMaterial color={color} transparent opacity={.95} depthWrite={false} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  </group>;
}

export function SilkWayModel({ active, onSelect, moving = true }: { active: number; onSelect?: (index: number) => void; moving?: boolean }) {
  const maxTextureSize = useThree(state => state.gl.capabilities.maxTextureSize);
  // Keep the texture stable on rotation/resizing: replacing it suspends the scene.
  const [texturePath] = useState(() => window.innerWidth < 760 || maxTextureSize < 4096
    ? "/assets/photo/masterplan-2048.webp" : "/assets/photo/masterplan-4096.webp");
  const source = useLoader(THREE.TextureLoader, texturePath);
  const texture = useMemo(() => {
    const map = source.clone();
    map.colorSpace = THREE.SRGBColorSpace; map.anisotropy = 8; map.needsUpdate = true;
    return map;
  }, [source]);
  useEffect(() => () => texture.dispose(), [texture]);
  const ground = useMemo(() => {
    const shape = new THREE.Shape(planBoundary.map(([x, z]) => new THREE.Vector2((x - 1008) / UNIT, (622.5 - z) / UNIT)));
    const geometry = new THREE.ShapeGeometry(shape);
    const positions = geometry.getAttribute("position");
    const uv = geometry.getAttribute("uv");
    for (let i = 0; i < positions.count; i++) uv.setXY(i, (positions.getX(i) * UNIT + 1008) / 2016, (positions.getY(i) * UNIT + 622.5) / 1245);
    return geometry;
  }, []);
  useEffect(() => () => ground.dispose(), [ground]);
  useEffect(() => () => { document.body.style.cursor = ""; }, []);
  return <group>
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -.008, 0]} geometry={ground}>
      <meshStandardMaterial map={texture} roughness={1} metalness={0} />
    </mesh>
    <Architecture active={active} onSelect={onSelect} /><ExpoSigns /><Trees /><Traffic moving={moving} />
    <ZoneHighlight active={active} moving={moving} />
  </group>;
}
