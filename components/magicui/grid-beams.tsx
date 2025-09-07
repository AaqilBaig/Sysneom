"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface GridBeamsProps {
  className?: string;
  gridSize?: number;
  beamColor?: string;
  beamWidth?: number;
  beamOpacity?: number;
  animationDuration?: number;
}

export default function GridBeams({
  className,
  gridSize = 40,
  beamColor = "rgba(59, 130, 246, 0.3)",
  beamWidth = 1,
  beamOpacity = 0.3,
  animationDuration = 4,
}: GridBeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [beams, setBeams] = useState<Array<{ id: string; type: 'horizontal' | 'vertical'; position: number; delay: number }>>([]);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (dimensions.width === 0 || dimensions.height === 0) return;

    const horizontalLines = Math.ceil(dimensions.height / gridSize);
    const verticalLines = Math.ceil(dimensions.width / gridSize);
    
    const newBeams: Array<{ id: string; type: 'horizontal' | 'vertical'; position: number; delay: number }> = [];

    // Create horizontal beams
    for (let i = 0; i <= horizontalLines; i++) {
      newBeams.push({
        id: `h-${i}`,
        type: 'horizontal',
        position: i * gridSize,
        delay: Math.random() * animationDuration,
      });
    }

    // Create vertical beams
    for (let i = 0; i <= verticalLines; i++) {
      newBeams.push({
        id: `v-${i}`,
        type: 'vertical',
        position: i * gridSize,
        delay: Math.random() * animationDuration,
      });
    }

    setBeams(newBeams);
  }, [dimensions, gridSize, animationDuration]);

  return (
    <div 
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Grid Background */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(90deg, ${beamColor} ${beamWidth}px, transparent ${beamWidth}px),
            linear-gradient(${beamColor} ${beamWidth}px, transparent ${beamWidth}px)
          `,
          backgroundSize: `${gridSize}px ${gridSize}px`,
        }}
      />
      
      {/* Animated Beams */}
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute"
          style={{
            backgroundColor: beamColor,
            opacity: beamOpacity,
            ...(beam.type === 'horizontal' 
              ? {
                  top: beam.position,
                  left: 0,
                  right: 0,
                  height: beamWidth * 2,
                }
              : {
                  left: beam.position,
                  top: 0,
                  bottom: 0,
                  width: beamWidth * 2,
                }
            ),
          }}
          initial={{ 
            opacity: 0,
            scale: beam.type === 'horizontal' ? [1, 0] : [0, 1]
          }}
          animate={{ 
            opacity: [0, beamOpacity * 2, 0],
            scale: 1
          }}
          transition={{
            duration: animationDuration,
            delay: beam.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Intersection Points */}
      {beams
        .filter(beam => beam.type === 'horizontal')
        .slice(0, Math.min(5, beams.filter(b => b.type === 'horizontal').length))
        .map((hBeam) => 
          beams
            .filter(beam => beam.type === 'vertical')
            .slice(0, Math.min(5, beams.filter(b => b.type === 'vertical').length))
            .map((vBeam) => (
              <motion.div
                key={`intersection-${hBeam.id}-${vBeam.id}`}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  backgroundColor: beamColor,
                  left: vBeam.position - 4,
                  top: hBeam.position - 4,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, beamOpacity * 3, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: animationDuration * 1.5,
                  delay: Math.max(hBeam.delay, vBeam.delay),
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))
        )}
    </div>
  );
}
