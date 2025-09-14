'use client'

import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section className="pt-16 pb-16 md:pb-20 lg:pb-24">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp bg-gray-50 dark:bg-gray-800/40 backdrop-blur-sm rounded-sm border border-gray-200 dark:border-gray-700 px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
              data-wow-delay=".1s"
            >
              {/* Container for scrolling animation */}
              <div className="overflow-hidden">
                {/* Animated track */}
                <div className="flex animate-scroll">
                  {/* First set of brands */}
                  {brandsData.map((brand) => (
                    <SingleBrand key={`${brand.id}-1`} brand={brand} />
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {brandsData.map((brand) => (
                    <SingleBrand key={`${brand.id}-2`} brand={brand} />
                  ))}
                </div>
              </div>
              
              {/* CSS animation */}
              <style jsx>{`
                @keyframes scroll {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                
                .animate-scroll {
                  animation: scroll 30s linear infinite;
                  min-width: 200%;
                }
                
                .animate-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="mx-4 flex w-[180px] flex-shrink-0 items-center justify-center py-[20px] sm:mx-6 lg:w-[160px] xl:mx-8 xl:w-[180px] 2xl:mx-10 2xl:w-[200px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-16 w-full opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image 
          src={image} 
          alt={name} 
          fill 
          className="object-contain"
          sizes="(max-width: 768px) 180px, (max-width: 1024px) 160px, (max-width: 1280px) 180px, 200px"
        />
      </a>
    </div>
  );
};
