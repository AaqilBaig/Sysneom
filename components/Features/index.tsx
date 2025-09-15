"use client";
import Image from "next/image";
import Link from "next/link";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";
import { useEffect, useRef } from "react";

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn");
            
            // Animate service boxes with staggered effect
            const serviceBoxes = entry.target.querySelectorAll('.service-box');
            serviceBoxes.forEach((box: Element, index: number) => {
              setTimeout(() => {
                (box as HTMLElement).style.opacity = '1';
                (box as HTMLElement).style.transform = 'translateY(0)';
              }, 100 + index * 60);
            });
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        id="features" 
        className="py-16 md:py-20 lg:py-28 relative overflow-hidden opacity-0"
      >
        {/* Background Image - full section background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[80%]">
            <Image
              src="/images/service-dark.png"
              alt="Technology Solutions"
              fill
              className="object-contain"
              priority
              quality={100}
            />
          </div>
        </div>
        
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-6">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 order-1 mt-8 lg:mt-0">
              <h2 className="text-4xl md:text-5xl font-bold text-blue-950 dark:text-blue-200 mb-2 leading-tight">
                Driving Innovation
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold text-blue-950 dark:text-blue-200 mb-6 leading-tight">
                Accelerating Business Transformation
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                We collaborate with enterprises worldwide to deliver bespoke, end-to-end solutions in Artificial Intelligence, Strategic Consulting, Data Analytics, Digital Transformation, Cloud Infrastructure, DevOps, and Software Engineering, empowering organizations to unlock value and achieve sustainable growth.
              </p>
              
              <div className="mb-10">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-base font-semibold text-white duration-300 ease-in-out hover:bg-primary/90"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
          </div>
          
          {/* Responsive Grid Layout - All boxes in one line */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {featuresData.map((feature) => (
              <div 
                key={feature.id} 
                className="service-box opacity-0 transform translate-y-4 transition-all duration-400 ease-out"
              >
                <SingleFeature feature={feature} />
              </div>
            ))}
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.7s ease forwards;
          }
          
          /* Ensure smooth performance */
          .service-box {
            will-change: transform, opacity;
          }
          
          /* Adjust box size on different screens */
          @media (max-width: 640px) {
            #features .grid {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }
          
          @media (min-width: 640px) and (max-width: 768px) {
            #features .grid {
              grid-template-columns: repeat(3, minmax(0, 1fr));
            }
          }
          
          @media (min-width: 768px) {
            #features .grid {
              grid-template-columns: repeat(6, minmax(0, 1fr));
            }
          }
        `}</style>
      </section>
    </>
  );
};

export default Features;
