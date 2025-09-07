import { ReactNode } from "react";

interface SectionTitleProps {
  title: ReactNode;
  paragraph: ReactNode;
  center?: boolean;
  mb?: string;
}

const SectionTitle = ({ title, paragraph, center, mb }: SectionTitleProps) => {
  return (
    <>
      <div
        className={`wow fadeInUp mx-auto mb-12 max-w-[510px] text-center ${
          center ? "mx-auto text-center" : ""
        } ${mb || "mb-12"}`}
        data-wow-delay=".2s"
      >
        <h2 className="mb-3 text-2xl font-bold leading-tight text-blue-950 dark:text-blue-200 sm:text-3xl sm:leading-tight md:text-4xl md:leading-tight">
          {title}
        </h2>
        <p className="text-base font-medium leading-relaxed text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-relaxed">
          {paragraph}
        </p>
      </div>
    </>
  );
};

export default SectionTitle;