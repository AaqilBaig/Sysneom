import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Who we are?",
    newTab: false,
    submenu: [
      {
        id: 21,
        title: "Our Company",
        path: "/our-company",
        newTab: false,
      },
      {
        id: 22,
        title: "Industries",
        path: "/industries",
        newTab: false,
      },
      {
        id: 23,
        title: "Diversity, Equity & Inclusion",
        path: "/diversity",
        newTab: false,
      },
      {
        id: 24,
        title: "Our Partners",
        path: "/partners",
        newTab: false,
      },
      {
        id: 25,
        title: "Corporate Sustainability",
        path: "/sustainability",
        newTab: false,
      },
      {
        id: 26,
        title: "Awards",
        path: "/awards",
        newTab: false,
      },
      {
        id: 27,
        title: "In the News",
        path: "/news",
        newTab: false,
      },
      {
        id: 28,
        title: "Press Releases",
        path: "/press",
        newTab: false,
      },
      {
        id: 29,
        title: "Events",
        path: "/events",
        newTab: false,
      },
      {
        id: 210,
        title: "Insights",
        path: "/insights",
        newTab: false,
      },
      {
        id: 211,
        title: "Podcasts",
        path: "/podcasts",
        newTab: false,
      },
      {
        id: 212,
        title: "White Papers",
        path: "/whitepapers",
        newTab: false,
      },
      {
        id: 213,
        title: "Latest Press Release: Company Expands AI Capabilities with Strategic Acquisition",
        path: "/press-release",
        newTab: false,
      },
      {
        id: 214,
        title: "Latest In the News: Company's Innovative Approach to Digital Transformation",
        path: "/digital-transformation",
        newTab: false,
      },
      {
        id: 215,
        title: "Language",
        path: "/language",
        newTab: false,
      },
    ],
  },
  {
    id: 3,
    title: "What we Offer?",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Services",
        path: "/services",
        newTab: false,
      },
      {
        id: 32,
        title: "Digital Strategy",
        path: "/digital-strategy",
        newTab: false,
      },
      {
        id: 33,
        title: "Technology Consulting",
        path: "/technology-consulting",
        newTab: false,
      },
      {
        id: 34,
        title: "Cloud Solutions",
        path: "/cloud-solutions",
        newTab: false,
      },
      {
        id: 35,
        title: "AI & Machine Learning",
        path: "/ai-ml",
        newTab: false,
      },
      {
        id: 36,
        title: "Solutions",
        path: "/solutions",
        newTab: false,
      },
      {
        id: 37,
        title: "Enterprise Modernization",
        path: "/enterprise-modernization",
        newTab: false,
      },
      {
        id: 38,
        title: "Data Analytics",
        path: "/data-analytics",
        newTab: false,
      },
      {
        id: 39,
        title: "Cybersecurity",
        path: "/cybersecurity",
        newTab: false,
      },
      {
        id: 310,
        title: "Digital Banking",
        path: "/digital-banking",
        newTab: false,
      },
      {
        id: 311,
        title: "Language",
        path: "/language",
        newTab: false,
      },
    ],
  },
  {
    id: 4,
    title: "Blog",
    path: "/blog",
    newTab: false,
  },
  {
    id: 5,
    title: "Contact",
    path: "/contact",
    newTab: false,
  },
];
export default menuData;