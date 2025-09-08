import { Blog } from "@/types/blog";

const blogData: Blog[] = [
  {
    id: 1,
    title: "The Future of AI in Business",
    paragraph:
      "Explore how artificial intelligence is reshaping industries and driving innovation.",
    image: "/images/blog/ai.jpg",
    author: {
      name: "Samuyl Joshi",
      image: "/images/blog/user.png",
      designation: "",
    },
    tags: ["Artificial Intelligence"],
    publishDate: "2025",
  },
  {
    id: 2,
    title: "Cloud Migration Strategies",
    paragraph:
      "Learn best practices for seamless cloud migration and optimization.",
    image: "/images/blog/cloud.jpg",
    author: {
      name: "Musharof Chy",
      image: "/images/blog/user.png",
      designation: "",
    },
    tags: ["Cloud Computing"],
    publishDate: "2025",
  },
  {
    id: 3,
    title: "Digital Transformation Trends",
    paragraph:
      "Stay ahead of the curve with the latest digital transformation trends and strategies.",
    image: "/images/blog/digital.jpg",
    author: {
      name: "Lethium Deo",
      image: "/images/blog/user.png",
      designation: "",
    },
    tags: ["Digital Strategy"],
    publishDate: "2025",
  },
];
export default blogData;
