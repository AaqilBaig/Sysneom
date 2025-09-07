import { Feature } from "@/types/feature";
import { MagicCard } from "@/components/magicui";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { icon, title, paragraph } = feature;

  return (
    <MagicCard 
      className="w-full h-full transition-all duration-300"
      gradientSize={300}
      gradientColor="#3b82f6"
      gradientOpacity={0.15}
    >
      {/* Icon Section */}
      <div className="mb-6 flex justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
      
      {/* Separator */}
      <div className="mx-auto mb-6 h-px w-16 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      {/* Content Section */}
      <div className="text-center">
        <h3 className="mb-4 text-xl font-bold leading-tight text-blue-950 dark:text-blue-200 sm:text-2xl lg:text-xl xl:text-2xl">
          {title}
        </h3>
        <p className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-300">
          {paragraph}
        </p>
      </div>
    </MagicCard>
  );
};

export default SingleFeature;