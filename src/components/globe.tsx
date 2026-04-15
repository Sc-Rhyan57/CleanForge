"use client";
import { useRef, useEffect } from "react";
import createGlobe from "cobe";

export default function Globe({
  className,
  speed = 1,
}: {
  className?: string;
  speed?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 500 * 2,
      height: 500 * 2,
      phi: 0,
      theta: 0.2,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.15, 0.15],
      markerColor: [0.97, 0.45, 0.09],
      glowColor: [0.3, 0.15, 0.05],
      markers: [
        { location: [-19.92, -43.94], size: 0.08 },
        { location: [-15.78, -47.93], size: 0.05 },
        { location: [-22.91, -43.17], size: 0.05 },
        { location: [50.85, 5.69], size: 0.06 },
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005 * speed;
      },
    });

    return () => globe.destroy();
  }, [speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 500, height: 500, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
}
