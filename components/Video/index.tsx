"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SectionTitle from "../Common/SectionTitle";
import ModalVideo from "react-modal-video";
import { useTheme } from "next-themes";

const Video = () => {
  const [isOpen, setOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, systemTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme || systemTheme || "light" : null;

  class ClassicalNoise {
    permutation: number[];
    p: number[];

    constructor() {
      this.permutation = [
        151,160,137,91,90,15,
        131,13,201,95,96,53,194,233,7,225,140,36,103,30,
        69,142,8,99,37,240,21,10,23,
        190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
        35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,
        168, 68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,
        111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
        102,143,54, 65,25,63,161,1,216,80,73,209,76,132,187,208,
        89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,
        186, 3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,
        82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,
        183,170,213,119,248,152, 2,44,154,163,70,221,153,101,155,167,
        43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,
        185, 112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,
        179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,
        199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
        138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,
        215,61,156,180
      ];
      this.p = new Array(512);
      for (let i = 0; i < 512; i++) {
        this.p[i] = this.permutation[i % 256];
      }
    }

    fade(t: number) {
      return t * t * t * (t * (t * 6 - 15) + 10);
    }

    lerp(t: number, a: number, b: number) {
      return a + t * (b - a);
    }

    grad(hash: number, x: number, y: number, z: number) {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }

    noise(x: number, y: number, z: number) {
      const floorX = Math.floor(x);
      const floorY = Math.floor(y);
      const floorZ = Math.floor(z);

      const X = floorX & 255;
      const Y = floorY & 255;
      const Z = floorZ & 255;

      x -= floorX;
      y -= floorY;
      z -= floorZ;

      const u = this.fade(x);
      const v = this.fade(y);
      const w = this.fade(z);

      const A = this.p[X] + Y;
      const AA = this.p[A] + Z;
      const AB = this.p[A + 1] + Z;
      const B = this.p[X + 1] + Y;
      const BA = this.p[B] + Z;
      const BB = this.p[B + 1] + Z;

      return this.lerp(
        w,
        this.lerp(
          v,
          this.lerp(
            u,
            this.grad(this.p[AA], x, y, z),
            this.grad(this.p[BA], x - 1, y, z)
          ),
          this.lerp(
            u,
            this.grad(this.p[AB], x, y - 1, z),
            this.grad(this.p[BB], x - 1, y - 1, z)
          )
        ),
        this.lerp(
          v,
          this.lerp(
            u,
            this.grad(this.p[AA + 1], x, y, z - 1),
            this.grad(this.p[BA + 1], x - 1, y, z - 1)
          ),
          this.lerp(
            u,
            this.grad(this.p[AB + 1], x, y - 1, z - 1),
            this.grad(this.p[BB + 1], x - 1, y - 1, z - 1)
          )
        )
      );
    }
  }

  // Store RGB components separately for each theme
  const waveColorRGB = useRef<[number, number, number]>([0, 0, 255]); // default blue

  useEffect(() => {
    if (!mounted) return;
    if (currentTheme === "dark") {
      waveColorRGB.current = [43, 205, 255]; // bright cyan for dark mode
    } else {
      waveColorRGB.current = [0, 0, 139]; // navy blue for light mode
    }
  }, [currentTheme, mounted]);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const perlin = new ClassicalNoise();
    const variation = 0.0025;
    const amp = 300;
    const variators: number[] = [];
    const max_lines = navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? 25 : 40;

    let canvasWidth = container.clientWidth;
    let canvasHeight = container.clientHeight;
    let start_y = canvasHeight / 2;

    for (let i = 0, u = 0; i < max_lines; i++, u += 0.02) {
      variators[i] = u;
    }

    function resizeCanvas() {
      canvasWidth = container.clientWidth;
      canvasHeight = container.clientHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvasWidth * dpr;
      canvas.height = canvasHeight * dpr;
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      start_y = canvasHeight / 2;
    }

    function draw() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.shadowBlur = 0;

      for (let i = 0; i <= max_lines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, start_y);
        let y = 0;
        for (let x = 0; x <= canvasWidth; x++) {
          y = perlin.noise(x * variation + variators[i], x * variation, 0);
          ctx.lineTo(x, start_y + amp * y);
        }
        const alpha = Math.min(Math.abs(y) + 0.05, 0.05);
        const [r, g, b] = waveColorRGB.current;
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha * 2})`;
        ctx.stroke();
        ctx.closePath();

        variators[i] += 0.005;
      }
    }

    let animationFrameId: number;

    function animate() {
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    animate();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  if (!mounted || !currentTheme) {
    return null; // avoid flash of wrong theme
  }

  return (
    <section
      ref={containerRef}
      className={`relative z-10 py-16 md:py-20 lg:py-28 overflow-hidden ${
        currentTheme === "dark" ? "bg-[#000a1f]" : "bg-white"
      }`}
    >
      <canvas
        id="canvas"
        ref={canvasRef}
        className="absolute top-0 left-0 z-0 pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />

      <div className="container relative z-10">
        <SectionTitle
          title="We are ready to help"
          paragraph="We deliver innovative technology solutions that drive real business results with expert partners."
          center
          mb="80px"
        />

        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp mx-auto max-w-[770px] overflow-hidden rounded-md"
              data-wow-delay=".15s"
            >
              <div className="relative aspect-[77/40] items-center justify-center">
                <Image src="/images/video/video.jpg" alt="video image" fill />
                <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                  <button
                    aria-label="video play button"
                    onClick={() => setOpen(true)}
                    className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                  >
                    <svg
                      width="16"
                      height="18"
                      viewBox="0 0 16 18"
                      className="fill-current"
                    >
                      <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalVideo
        channel="youtube"
        autoplay={true}
        start={true}
        isOpen={isOpen}
        videoId="LMlCN6_vUvs"
        onClose={() => setOpen(false)}
      />
    </section>
  );
};

export default Video;
