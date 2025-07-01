import {
  User,
  Layers,
  Briefcase,
  FileText,
  Star,
  Globe,
  Home,
  Images,
  Mail,
} from "lucide-react";

export const topNavbarItem = [
  {
    name: "Home",
    icon: Home,
    color: "#6366f1",
    href: "/user/home",
  },
  {
    name: "Projects",
    icon: Layers,
    color: "#3b82f6",
    href: "/user/projects",
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
  {
    name: "About",
    icon: User,
    color: "#10b981",
    href: "/user/about-me",
  },
  {
    name: "Contact Us",
    icon: Briefcase,
    color: "#8b5cf6",
    href: "/user/contact",
  },
];

export const sidebarItemClientView = [
  {
    name: "Home",
    icon: Home,
    color: "#6366f1",
    href: "/admin/dashboard",
  },
  {
    name: "About",
    icon: User,
    color: "#10b981",
    href: "/admin/about",
  },
  {
    name: "Resume",
    icon: FileText,
    color: "#f59e0b",
    href: "/admin/skills",
  },
  {
    name: "Portfolio",
    icon: Images,
    color: "#3b82f6",
    href: "/admin/projects/all",
  },

  {
    name: "Services",
    icon: Globe,
    color: "#06b6d4",
    href: "/admin/services",
  },

  {
    name: "Contact",
    icon: Mail,
    color: "#ef4444",
    href: "/admin/logout",
  },
];
