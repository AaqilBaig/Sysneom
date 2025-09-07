"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  className?: string;
  updateInterval?: number; // New prop to control update frequency
}

export default function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color = "rgb(59, 130, 246)",
  className,
  updateInterval = 150, // Update every 150ms instead of every frame
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const lastUpdateTime = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const updateCanvasSize = () => {
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual size for crisp rendering
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      // Scale for device pixel ratio
      ctx.scale(dpr, dpr);
      
      // Set display size
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
      
      setDimensions({ width: rect.width, height: rect.height });
    };

    const getResponsiveValues = () => {
      const width = dimensions.width;
      
      // Adjust grid properties based on screen size
      if (width < 768) { // Mobile
        return {
          size: Math.max(2, squareSize * 0.7),
          gap: Math.max(4, gridGap * 0.8),
          chance: flickerChance * 0.6 // Even slower on mobile
        };
      } else if (width < 1024) { // Tablet
        return {
          size: Math.max(3, squareSize * 0.85),
          gap: Math.max(5, gridGap * 0.9),
          chance: flickerChance * 0.8
        };
      } else { // Desktop
        return {
          size: squareSize,
          gap: gridGap,
          chance: flickerChance
        };
      }
    };

    const drawGrid = (currentTime: number = 0) => {
      if (!ctx || !canvas || dimensions.width === 0 || dimensions.height === 0) {
        animationId = requestAnimationFrame(drawGrid);
        return;
      }

      // Only update the grid at specified intervals, not every frame
      if (currentTime - lastUpdateTime.current >= updateInterval) {
        ctx.clearRect(0, 0, dimensions.width, dimensions.height);

        const { size, gap, chance } = getResponsiveValues();
        const cols = Math.floor(dimensions.width / (size + gap));
        const rows = Math.floor(dimensions.height / (size + gap));

        // Ensure we don't draw too many squares on large screens
        const maxSquares = 2000;
        const totalSquares = cols * rows;
        const adjustedChance = totalSquares > maxSquares ? chance * (maxSquares / totalSquares) : chance;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            if (Math.random() < adjustedChance) {
              const opacity = Math.random() * 0.6 + 0.3; // Opacity between 0.3 and 0.9
              ctx.fillStyle = color.replace("rgb(", "rgba(").replace(")", `, ${opacity})`);
              ctx.fillRect(
                i * (size + gap),
                j * (size + gap),
                size,
                size
              );
            }
          }
        }

        lastUpdateTime.current = currentTime;
      }

      animationId = requestAnimationFrame(drawGrid);
    };

    // Initial setup
    updateCanvasSize();
    
    // Start animation after dimensions are set
    if (dimensions.width > 0) {
      drawGrid();
    }

    // Handle resize with debouncing
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updateCanvasSize();
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [squareSize, gridGap, flickerChance, color, dimensions, updateInterval]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
    />
  );
}
