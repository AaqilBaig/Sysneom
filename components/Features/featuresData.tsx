import { Feature } from "@/types/feature";
import Image from "next/image";

const servicesData = [
  {
    id: 1,
    icon: (
      <div className="mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300">
        <Image
          src="/images/gifs/IT.gif"
          alt="IT Consulting"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    ),
    title: "IT Consulting",
    paragraph:
      "Expert advice to help you navigate the complexities of IT infrastructure, strategy, and implementation. Our consultants work closely with your team to identify opportunities, solve challenges, and align technology with your business goals.",
  },
  {
    id: 2,
    icon: (
      <div className="mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300">
        <Image
          src="/images/gifs/Dev.gif"
          alt="Software Development"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    ),
    title: "Software Development",
    paragraph:
      "Custom software solutions tailored to your business needs. From web applications to enterprise systems, our development team uses modern technologies and best practices to deliver robust, scalable solutions that solve your specific business challenges.",
  },
  {
    id: 3,
    icon: (
      <div className="mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300">
        <Image
          src="/images/gifs/Cloud.gif"
          alt="Cloud Services"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    ),
    title: "Cloud Services",
    paragraph:
      "Scalable cloud solutions for your growing business. We help you migrate, manage, and optimize your cloud infrastructure across AWS, Azure, and Google Cloud, ensuring security, performance, and cost-efficiency while enabling your business to scale seamlessly.",
  },
  {
    id: 4,
    icon: (
      <div className="mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300">
        <Image
          src="/images/gifs/Digital.gif"
          alt="Digital Transformation"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    ),
    title: "Digital Transformation",
    paragraph:
      "Transforming your business through digital innovation. We help organizations modernize their operations, enhance customer experiences, and create new revenue streams through strategic digital initiatives that drive real business value.",
  },
  {
    id: 5,
    icon: (
      <div className="mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300">
        <Image
          src="/images/gifs/Data.gif"
          alt="Data Analytics"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    ),
    title: "Data Analytics",
    paragraph:
      "Insights and analytics to drive your business decisions. Our data experts help you collect, analyze, and visualize your data to uncover actionable insights, predict trends, and make data-driven decisions that give you a competitive edge.",
  },
  {
    id: 6,
    icon: (
      <div className="mb-5 flex h-[80px] w-[80px] items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/15 border border-blue-200 dark:border-blue-800/50 text-blue-600 dark:text-blue-300">
        <Image
          src="/images/gifs/ITOP.gif"
          alt="IT Operations & Management"
          width={60}
          height={60}
          className="object-contain"
        />
      </div>
    ),
    title: "IT Operations & Management",
    paragraph:
      "Efficient management of your IT operations. Our managed services ensure your technology infrastructure runs smoothly, with proactive monitoring, maintenance, and support that minimizes downtime and maximizes productivity.",
  },
];

export default servicesData;