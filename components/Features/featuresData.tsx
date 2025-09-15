// features/Features/featuresData.ts
import { Feature } from "@/types/feature";
import Image from "next/image";

const featuresData = [
  {
    id: 1,
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300 mx-auto">
        <Image
          src="/images/gifs/IT.gif"
          alt="IT Consulting"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    ),
    title: "IT Consulting",
    path: "/services/it-consulting",
  },
  {
    id: 2,
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300 mx-auto">
        <Image
          src="/images/gifs/Dev.gif"
          alt="Software Development"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    ),
    title: "Software Development",
    path: "/services/software-development",
  },
  {
    id: 3,
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300 mx-auto">
        <Image
          src="/images/gifs/Cloud.gif"
          alt="Cloud Services"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    ),
    title: "Cloud Services",
    path: "/services/cloud-services",
  },
  {
    id: 4,
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300 mx-auto">
        <Image
          src="/images/gifs/Digital.gif"
          alt="Digital Transformation"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    ),
    title: "Digital Transformation",
    path: "/services/digital-transformation",
  },
  {
    id: 5,
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300 mx-auto">
        <Image
          src="/images/gifs/Data.gif"
          alt="Data Analytics"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    ),
    title: "Data Analytics",
    path: "/services/data-analytics",
  },
  {
    id: 6,
    icon: (
      <div className="flex h-16 w-16 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300 mx-auto">
        <Image
          src="/images/gifs/ITOP.gif"
          alt="IT Operations & Management"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
    ),
    title: "IT Operations & Management",
    path: "/services/it-operations",
  },
];

export default featuresData;
