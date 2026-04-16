"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"

export default function GlobeVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let phi = 0
    const canvas = canvasRef.current
    if (!canvas) return

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 600,
      height: 600,
      phi: 0,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.15, 0.1, 0.05],
      markerColor: [0.98, 0.45, 0.09],
      glowColor: [0.3, 0.15, 0.05],
      markers: [
        { location: [-19.81, -43.87], size: 0.08 },
        { location: [50.64, 5.57], size: 0.06 },
        { location: [48.85, 2.35], size: 0.05 },
        { location: [51.5, -0.12], size: 0.05 },
        { location: [40.71, -74.0], size: 0.04 },
        { location: [35.68, 139.76], size: 0.04 },
      ],
      onRender: (state) => {
        state.phi = phi
        phi += 0.003
      },
    })

    return () => globe.destroy()
  }, [])

  return (
    <div className="relative flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full max-w-[400px] aspect-square"
        style={{ width: "100%", maxWidth: 400, aspectRatio: "1" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent pointer-events-none" />
    </div>
  )
}
