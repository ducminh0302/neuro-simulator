"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface HemisphereData {
  coords: number[][];
  faces: number[][];
}

interface SurfaceData {
  format: string;
  left: HemisphereData;
  right: HemisphereData;
}

interface PredictionMeta {
  name: string;
  n_segments: number;
  n_vertices: number;
  dtype: string;
  endianness: string;
  min: number;
  max: number;
  mean: number;
  p01: number;
  p99: number;
}

interface PredictionData {
  meta: PredictionMeta;
  perVertex: Float32Array;
  absScale: number;
}

const DEFAULT_PREDICTION_KEY = "text.predictions";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function divergingRGB(v: number): [number, number, number] {
  const x = Math.max(-1, Math.min(1, v));
  const mag = Math.abs(x);

  if (mag < 0.08) return [0.22, 0.22, 0.23];

  if (x < 0) {
    const t = (mag - 0.08) / 0.92;
    const r = lerp(0.22, 0.05, t);
    const g = lerp(0.22, 0.55, t);
    const b = lerp(0.23, 0.95, t);
    return [r, g, b];
  }

  const t = (mag - 0.08) / 0.92;
  if (t < 0.55) {
    const u = t / 0.55;
    return [lerp(0.22, 0.85, u), lerp(0.22, 0.05, u), lerp(0.23, 0.05, u)];
  }
  const u = (t - 0.55) / 0.45;
  return [lerp(0.85, 1.0, u), lerp(0.05, 0.85, u), lerp(0.05, 0.1, u)];
}

interface HemisphereMeshProps {
  data: HemisphereData;
  side: "left" | "right";
  prediction: PredictionData | null;
}

function HemisphereMesh({ data, side, prediction }: HemisphereMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geoRef = useRef<THREE.BufferGeometry | null>(null);

  const baseGeometry = useMemo(() => {
    const { coords, faces } = data;
    const n = coords.length;

    const positions = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      positions[i * 3] = coords[i][0] / 80;
      positions[i * 3 + 1] = coords[i][1] / 80;
      positions[i * 3 + 2] = coords[i][2] / 80;
    }

    const indices = new Uint32Array(faces.length * 3);
    for (let i = 0; i < faces.length; i++) {
      indices[i * 3] = faces[i][0];
      indices[i * 3 + 1] = faces[i][1];
      indices[i * 3 + 2] = faces[i][2];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.computeVertexNormals();
    return geo;
  }, [data]);

  useEffect(() => {
    if (geoRef.current && geoRef.current !== baseGeometry) geoRef.current.dispose();
    geoRef.current = baseGeometry;
    if (meshRef.current) meshRef.current.geometry = baseGeometry;
  }, [baseGeometry]);

  const recolor = useCallback(() => {
    if (!geoRef.current) return;
    const n = data.coords.length;
    const colorAttr = geoRef.current.getAttribute("color") as THREE.BufferAttribute;
    const colors = colorAttr.array as Float32Array;

    if (!prediction) {
      for (let i = 0; i < n; i++) {
        colors[i * 3] = 0.22;
        colors[i * 3 + 1] = 0.22;
        colors[i * 3 + 2] = 0.23;
      }
      colorAttr.needsUpdate = true;
      return;
    }

    const { perVertex, meta, absScale } = prediction;
    const vertsPerHemi = meta.n_vertices / 2;
    const hemiOffset = side === "left" ? 0 : vertsPerHemi;

    for (let i = 0; i < n; i++) {
      const v = perVertex[hemiOffset + i] / absScale;
      const [r, g, b] = divergingRGB(v);
      colors[i * 3] = r;
      colors[i * 3 + 1] = g;
      colors[i * 3 + 2] = b;
    }
    colorAttr.needsUpdate = true;
  }, [data, prediction, side]);

  useEffect(() => {
    recolor();
  }, [recolor]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const s = 1 + Math.sin(t * 1.4) * 0.003;
    meshRef.current.scale.setScalar(s);
  });

  const xOffset = side === "left" ? -0.22 : 0.22;

  return (
    <mesh ref={meshRef} position={[xOffset, 0, 0]} geometry={geoRef.current ?? undefined}>
      <meshPhongMaterial
        vertexColors
        shininess={8}
        specular={new THREE.Color(0x111111)}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

interface SceneProps {
  surface: SurfaceData;
  autoRotate: boolean;
  prediction: PredictionData | null;
  autoRotateSpeed: number;
}

function Scene({ surface, autoRotate, prediction, autoRotateSpeed }: SceneProps) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0.2, 3.2);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[3, 4, 5]} intensity={0.8} />
      <directionalLight position={[-3, 2, -3]} intensity={0.4} />
      <directionalLight position={[0, -4, 2]} intensity={0.2} />

      <HemisphereMesh data={surface.left} side="left" prediction={prediction} />
      <HemisphereMesh data={surface.right} side="right" prediction={prediction} />

      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={1.6}
        maxDistance={6}
        autoRotate={autoRotate}
        autoRotateSpeed={autoRotateSpeed}
        dampingFactor={0.08}
        enableDamping
      />
    </>
  );
}

function ActivityLegend({ absScale }: { absScale: number }) {
  return (
    <div className="absolute right-4 top-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/70">
      <span className="text-white/50">-{absScale.toFixed(2)}</span>
      <div
        className="h-2 w-28 rounded-full"
        style={{
          background: "linear-gradient(to right, #0c8cf2, #3a3a3a, #d20000, #ffdd00)",
        }}
      />
      <span className="text-white/50">+{absScale.toFixed(2)}</span>
      <span className="ml-1 text-white/40">Activation</span>
    </div>
  );
}

async function loadPrediction(key: string, segmentIndex?: number): Promise<PredictionData> {
  const [metaRes, binRes] = await Promise.all([
    fetch(`/brain-3d/${key}.meta.json`),
    fetch(`/brain-3d/${key}.bin`),
  ]);
  if (!metaRes.ok || !binRes.ok) throw new Error(`Failed to load ${key}`);

  const meta = (await metaRes.json()) as PredictionMeta;
  const buf = await binRes.arrayBuffer();
  const expected = meta.n_segments * meta.n_vertices * 4;
  if (buf.byteLength !== expected) {
    throw new Error(`${key}: expected ${expected} bytes, got ${buf.byteLength}`);
  }
  const values = new Float32Array(buf);

  const perVertex = new Float32Array(meta.n_vertices);

  if (typeof segmentIndex === "number") {
    const s = ((segmentIndex % meta.n_segments) + meta.n_segments) % meta.n_segments;
    const offset = s * meta.n_vertices;
    for (let v = 0; v < meta.n_vertices; v++) {
      perVertex[v] = values[offset + v];
    }
  } else {
    for (let s = 0; s < meta.n_segments; s++) {
      const offset = s * meta.n_vertices;
      for (let v = 0; v < meta.n_vertices; v++) {
        perVertex[v] += values[offset + v];
      }
    }
    for (let v = 0; v < meta.n_vertices; v++) {
      perVertex[v] /= meta.n_segments;
    }
  }

  let maxAbs = 0;
  for (let v = 0; v < meta.n_vertices; v++) {
    const a = Math.abs(perVertex[v]);
    if (a > maxAbs) maxAbs = a;
  }
  const absScale = maxAbs || Math.max(Math.abs(meta.p01), Math.abs(meta.p99)) || 1;

  return { meta, perVertex, absScale };
}

export interface BrainViewer3DProps {
  predictionKey?: string;
  segmentIndex?: number;
  autoRotateSpeed?: number;
}

export function BrainViewer3D({
  predictionKey = DEFAULT_PREDICTION_KEY,
  segmentIndex,
  autoRotateSpeed = 0.25,
}: BrainViewer3DProps = {}) {
  const [surface, setSurface] = useState<SurfaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [autoRotate, setAuto] = useState(true);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);

  useEffect(() => {
    fetch("/brain-3d/surface_fsaverage5.json")
      .then((r) => {
        if (!r.ok) throw new Error("Network error");
        return r.json() as Promise<SurfaceData>;
      })
      .then((d) => {
        setSurface(d);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadPrediction(predictionKey, segmentIndex)
      .then((p) => {
        if (!cancelled) setPrediction(p);
      })
      .catch(() => {
        if (!cancelled) setPrediction(null);
      });
    return () => {
      cancelled = true;
    };
  }, [predictionKey, segmentIndex]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.6rem] bg-[#080808]">
      {surface && (
        <Canvas
          gl={{ antialias: true, alpha: false }}
          camera={{ fov: 45, near: 0.1, far: 100 }}
          onPointerDown={() => setAuto(false)}
          onPointerUp={() => setAuto(true)}
          className="h-full w-full"
        >
          <color attach="background" args={["#080808"]} />
          <Scene
            surface={surface}
            autoRotate={autoRotate}
            prediction={prediction}
            autoRotateSpeed={autoRotateSpeed}
          />
        </Canvas>
      )}

      {loading && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="space-y-3 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
            <p className="text-xs uppercase tracking-[0.2em] text-white/40">Loading neural mesh…</p>
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 grid place-items-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40">Brain mesh unavailable</p>
        </div>
      )}

      {surface && prediction && <ActivityLegend absScale={prediction.absScale} />}
    </div>
  );
}
