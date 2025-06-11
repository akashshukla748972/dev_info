import {
  User,
  Layers,
  Briefcase,
  FileText,
  Star,
  Globe,
  Home,
} from "lucide-react";

export const topNavbarItem = [
  {
    name: "Home",
    icon: Home,
    color: "#6366f1",
    href: "/user/home",
  },
  {
    name: "About Me",
    icon: User,
    color: "#10b981",
    href: "/user/about",
  },
  {
    name: "Projects",
    icon: Layers,
    color: "#3b82f6",
    href: "/user/projects",
  },
  {
    name: "Experience",
    icon: Briefcase,
    color: "#8b5cf6",
    href: "/user/experiences",
  },
  {
    name: "Services",
    icon: Globe,
    color: "#06b6d4",
    href: "/user/services",
  },
  {
    name: "Testimonials",
    icon: Star,
    color: "#facc15",
    href: "/user/testimonials",
  },
  {
    name: "Blogs",
    icon: FileText,
    color: "#14b8a6",
    href: "/user/blogs",
  },
];
