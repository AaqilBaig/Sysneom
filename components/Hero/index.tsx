"use client";

import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { heroData, animationConfig } from "./heroData";

const Hero = () => {
  const { theme } = useTheme();
  const { phrases, buttons, introText } = heroData;
  const { 
    textTransitionDuration, 
    textChangeInterval
  } = animationConfig;
  
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTextVisible, setIsTextVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isThreeJsReady, setIsThreeJsReady] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const threeJsInitializedRef = useRef(false);
  const particlesRef = useRef<any[]>([]);

  // Split main title into words for animation
  const titleWords = introText.split(" ");

  useEffect(() => {
    setMounted(true);
    
    // Simulate loading completion - reduced delay for faster perceived loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Text animation - independent of Three.js loading
  useEffect(() => {
    if (!isLoaded) return;
    
    const interval = setInterval(() => {
      setIsTextVisible(false);
      
      setTimeout(() => {
        setCurrentPhraseIndex((prevIndex) => 
          prevIndex === phrases.length - 1 ? 0 : prevIndex + 1
        );
        setIsTextVisible(true);
      }, textTransitionDuration / 2);
    }, textChangeInterval);

    return () => clearInterval(interval);
  }, [phrases.length, textChangeInterval, textTransitionDuration, isLoaded]);

  // Responsive Three.js particle animation
  const initParticleAnimation = useCallback((THREE: any) => {
    if (!canvasRef.current || !containerRef.current || !isLoaded || threeJsInitializedRef.current) return;
    
    threeJsInitializedRef.current = true;

    const SEPARATION = 50;
    // Make particle count responsive to container size
    const container = containerRef.current;
    const AMOUNTX = Math.max(30, Math.min(60, Math.floor(container.clientWidth / 25)));
    const AMOUNTY = Math.max(15, Math.min(30, Math.floor(container.clientHeight / 25)));

    let camera: THREE.PerspectiveCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGLRenderer;
    let count = 0;

    // Set up camera with container aspect ratio
    camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight, 
      1, 
      10000
    );
    camera.position.y = 180;
    camera.position.z = 20;
    camera.rotation.x = 0.35;
    
    // Create scene
    scene = new THREE.Scene();

    // Create circular particle material with proper opacity
    const createCircularMaterial = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64; // Reduced for performance
      canvas.height = 64; // Reduced for performance
      const context = canvas.getContext('2d');
      
      if (!context) return new THREE.SpriteMaterial({ color: 0x4A6CF7 });
      
      // Draw solid circle with theme-aware color
      const color = theme === 'dark' ? 0x63a4ff : 0x4A6CF7;
      const hexColor = `#${color.toString(16).padStart(6, '0')}`;
      
      context.fillStyle = hexColor;
      context.beginPath();
      context.arc(32, 32, 32, 0, Math.PI * 2);
      context.fill();
      
      const texture = new THREE.CanvasTexture(canvas);
      return new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9,
        color: color
      });
    };

    const material = createCircularMaterial();

    // Create particles with proper positioning
    particlesRef.current = [];
    let i = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const particle = new THREE.Sprite(material);
        particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
        particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) - 10);
        // Responsive particle size
        const baseSize = Math.min(8, 6 + (container.clientWidth / 500));
        particle.scale.x = particle.scale.y = baseSize;
        scene.add(particle);
        particlesRef.current.push(particle);
      }
    }

    // Create renderer with performance settings
    renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: false, // Disabled for performance
      powerPreference: "high-performance"
    });
    
    // Set renderer to container size
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 1.5s ease-in-out";
    
    // Clear previous content and append new renderer
    if (canvasRef.current) {
      canvasRef.current.innerHTML = "";
      canvasRef.current.appendChild(renderer.domElement);
    }

    // Enhanced responsive handling for container
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      // Update camera
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      // Update renderer
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    
    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const resizeThrottler = () => {
      if (!resizeTimeout) {
        resizeTimeout = setTimeout(() => {
          resizeTimeout = null;
          handleResize();
        }, 200);
      }
    };
    
    window.addEventListener('resize', resizeThrottler);

    // Use ResizeObserver for container resizing
    const resizeObserver = new ResizeObserver(() => {
      resizeThrottler();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Animation function
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      render();
    };

    // Optimized render function
    const render = () => {
      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = particlesRef.current[i++];
          // Exact same wave algorithm as original code
          particle.position.y = (Math.sin((ix + count) * 0.5) * 15) + (Math.sin((iy + count) * 0.5) * 15);
          // Responsive scaling
          const scaleFactor = (Math.sin((ix + count) * 0.5) + 2) * 3 + (Math.sin((iy + count) * 0.5) + 1) * 3;
          const responsiveScale = scaleFactor * Math.min(1, containerRef.current ? containerRef.current.clientWidth / 1200 : 1);
          particle.scale.x = particle.scale.y = responsiveScale;
        }
      }
      
      renderer.render(scene, camera);
      count += 0.05;
    };

    // Start animation and fade in
    animate();
    
    // Smooth entrance for Three.js canvas
    setTimeout(() => {
      if (renderer.domElement) {
        renderer.domElement.style.opacity = "1";
        setIsThreeJsReady(true);
      }
    }, 300);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeThrottler);
      resizeObserver.disconnect();
      if (resizeTimeout) clearTimeout(resizeTimeout);
      
      // Clean up Three.js objects
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        while(scene.children.length > 0) { 
          scene.remove(scene.children[0]); 
        }
      }
      particlesRef.current = [];
    };
  }, [isLoaded, theme]);

  // Initialize Three.js after component mounts and is loaded
  useEffect(() => {
    if (!isLoaded || threeJsInitializedRef.current) return;
    
    const initThreeJs = async () => {
      try {
        const THREE = await import("three");
        // Small delay to ensure smooth text animation first
        setTimeout(() => {
          initParticleAnimation(THREE);
        }, 500);
      } catch (error) {
        console.error("Failed to load Three.js:", error);
        setIsThreeJsReady(true);
      }
    };
    
    if (canvasRef.current) {
      initThreeJs();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      threeJsInitializedRef.current = false;
    };
  }, [isLoaded, theme, initParticleAnimation]);

  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-blue-50/30 dark:bg-gray-900 pb-16 pt-[120px] md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
        ref={containerRef}
      >
        {/* Three.js Canvas Container */}
        <div ref={canvasRef} className="absolute inset-0 z-0" />
        
        {/* Loading overlay that fades out */}
        <motion.div 
          className="absolute inset-0 z-2 bg-white dark:bg-gray-900"
          initial={{ opacity: 1 }}
          animate={{ opacity: isThreeJsReady ? 0 : 1 }}
          transition={{ duration: 0.8 }}
          style={{ pointerEvents: isThreeJsReady ? 'none' : 'auto' }}
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-blue-100/40 via-blue-50/30 to-white/20 dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40" />
        
        {/* Magic UI Grid Beam Effect */}
        <div className="absolute inset-0 z-1 overflow-hidden">
          {/* Horizontal beams */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`h-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"
              style={{
                top: `${i * 6.66}%`,
                left: '0%',
                width: '100%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isThreeJsReady ? [0.3, 0.7, 0.3] : 0 }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
          
          {/* Vertical beams */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`v-${i}`}
              className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent"
              style={{
                left: `${i * 6.66}%`,
                top: '0%',
                height: '100%',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: isThreeJsReady ? [0.3, 0.7, 0.3] : 0 }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.2,
              }}
            />
          ))}
          
          {/* Moving horizontal lines - only animate when Three.js is ready */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`mh-${i}`}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-blue-500/60 to-transparent"
              style={{
                top: `${15 + i * 10}%`,
                left: `${i % 2 === 0 ? '-100%' : '100%'}`,
                width: '100%',
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                x: isThreeJsReady ? (i % 2 === 0 ? ['-100%', '100%'] : ['100%', '-100%']) : '0%',
                opacity: isThreeJsReady ? [0, 0.6, 0] : 0,
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.5,
              }}
            />
          ))}
          
          {/* Moving vertical lines - only animate when Three.js is ready */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={`mv-${i}`}
              className="absolute w-0.5 bg-gradient-to-b from-transparent via-blue-500/60 to-transparent"
              style={{
                left: `${15 + i * 15}%`,
                top: i % 2 === 0 ? '-100%' : '100%',
                height: '100%',
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                y: isThreeJsReady ? (i % 2 === 0 ? ['-100%', '100%'] : ['100%', '-100%']) : '0%',
                opacity: isThreeJsReady ? [0, 0.6, 0] : 0,
              }}
              transition={{
                duration: 18 + i * 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.7,
              }}
            />
          ))}
        </div>
        
        <div className="container relative z-10">
          <div className="-mx-4 flex flex-wrap items-center">
            {/* Text content */}
            <div className="w-full px-4 lg:w-7/12">
              <motion.div
                className="wow fadeInUp max-w-[800px] text-left"
                data-wow-delay=".2s"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                  {/* Animated main title */}
                  <motion.div
                    className="block"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.08,
                          delayChildren: 0.2,
                        },
                      },
                    }}
                  >
                    {titleWords.map((word, index) => (
                      <motion.span
                        key={index}
                        className="inline-block mr-2"
                        variants={{
                          hidden: { 
                            opacity: 0, 
                            y: 15,
                            filter: "blur(4px)"
                          },
                          visible: { 
                            opacity: 1, 
                            y: 0,
                            filter: "blur(0px)",
                            transition: {
                              duration: 0.5,
                              ease: "easeOut"
                            }
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                  
                  {/* Animated rotating phrases */}
                  <div className="text-blue-800 dark:text-blue-400 mt-2 text-2xl sm:text-3xl md:text-4xl font-bold">
                    <motion.span
                      key={currentPhraseIndex}
                      initial={{ 
                        opacity: 0, 
                        filter: "blur(8px)",
                        y: 10
                      }}
                      animate={{ 
                        opacity: isTextVisible ? 1 : 0, 
                        filter: isTextVisible ? "blur(0px)" : "blur(8px)",
                        y: isTextVisible ? 0 : 10
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      {phrases[currentPhraseIndex]}
                    </motion.span>
                  </div>
                </h1>
                
                {/* Buttons - made secondary button opaque */}
                <motion.div 
                  className="flex flex-col items-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 mt-8"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {buttons.map((button, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ 
                        scale: 1.05,
                        transition: { 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 17,
                          duration: 0.3
                        }
                      }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Link
                        href={button.href}
                        className={`inline-block rounded-lg border-2 px-7 py-3.5 text-base font-semibold transition-all duration-300 ${
                          button.variant === "primary"
                            ? "border-primary bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:border-primary/90 hover:shadow-xl hover:shadow-primary/40"
                            : "border-blue-600 bg-blue-100 text-blue-600 shadow-lg shadow-blue-600/10 hover:bg-blue-600 hover:text-white hover:shadow-xl hover:shadow-blue-600/20 dark:border-blue-400 dark:bg-blue-900/30 dark:text-blue-400 dark:shadow-blue-400/10 dark:hover:bg-blue-400 dark:hover:text-gray-900 dark:hover:shadow-blue-400/20"
                        }`}
                      >
                        {button.text}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            
            {/* Empty space for layout balance */}
            <div className="hidden lg:block lg:w-5/12"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
