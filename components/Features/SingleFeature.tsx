// features/Features/SingleFeature.tsx
import { Feature } from "@/types/feature";
import Link from "next/link";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, path } = feature;

  return (
    <Link 
      href={path}
      className="block bg-white dark:bg-gray-800 rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800/50 h-full text-center group"
    >
      <div className="flex flex-col items-center h-full justify-between">
        <div className="flex-shrink-0 mb-2 transform transition-transform duration-300 group-hover:scale-105">
          {icon}
        </div>
        <h3 className="text-sm font-bold text-blue-950 dark:text-blue-200 leading-tight">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default SingleFeature;
