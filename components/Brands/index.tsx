import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";
import Marquee from "@/components/magicui/marquee";

const Brands = () => {
  return (
    <section className="pt-16">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="wow fadeInUp bg-gray-light dark:bg-gray-dark rounded-sm px-8 py-8 sm:px-10 md:px-[50px] md:py-[40px] xl:p-[50px] 2xl:px-[70px] 2xl:py-[60px]"
              data-wow-delay=".1s"
            >
              <Marquee pauseOnHover className="[--duration:20s]">
                {brandsData.map((brand) => (
                  <SingleBrand key={brand.id} brand={brand} />
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, imageLight, name } = brand;

  return (
    <div className="mx-8 flex w-[160px] flex-shrink-0 items-center justify-center py-[15px] sm:mx-10 lg:w-[130px] xl:mx-12 xl:w-[150px] 2xl:mx-16 2xl:w-[160px]">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="flex h-10 w-full items-center justify-center opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image 
          src={image} 
          alt={name} 
          width={120}
          height={40}
          className="max-h-10 w-auto object-contain dark:hidden"
        />
        <Image 
          src={imageLight || image} 
          alt={name} 
          width={120}
          height={40}
          className="max-h-10 w-auto object-contain hidden dark:block"
        />
      </a>
    </div>
  );
};
