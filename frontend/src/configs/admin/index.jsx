import {
  BarChart2,
  User,
  Layers,
  Briefcase,
  GraduationCap,
  Settings,
  MessageCircle,
  FileText,
  LogOut,
  Star,
  Wrench,
  Globe,
} from "lucide-react";
export const sidebarItem = [
  {
    name: "Overview",
    icon: BarChart2,
    color: "#6366f1",
    href: "/admin/dashboard",
  },
  {
    name: "About Me",
    icon: User,
    color: "#10b981",
    href: "/admin/about",
  },
  {
    name: "Skills",
    icon: Wrench,
    color: "#f59e0b",
    href: "/admin/skills",
  },
  {
    name: "Projects",
    icon: Layers,
    color: "#3b82f6",
    href: "/admin/projects/all",
  },
  {
    name: "Experience",
    icon: Briefcase,
    color: "#8b5cf6",
    href: "/admin/experiences",
  },
  {
    name: "Education",
    icon: GraduationCap,
    color: "#ec4899",
    href: "/admin/educations",
  },
  {
    name: "Services",
    icon: Globe,
    color: "#06b6d4",
    href: "/admin/services",
  },
  {
    name: "Testimonials",
    icon: Star,
    color: "#facc15",
    href: "/admin/testimonials",
  },
  {
    name: "Blog",
    icon: FileText,
    color: "#14b8a6",
    href: "/admin/blogs",
  },
  {
    name: "Messages",
    icon: MessageCircle,
    color: "#f97316",
    href: "/admin/messages",
  },
  {
    name: "Settings",
    icon: Settings,
    color: "#64748b",
    href: "/admin/settings",
  },
  {
    name: "Logout",
    icon: LogOut,
    color: "#ef4444",
    href: "/admin/logout",
  },
];

// dummy project data
export const projects = [
  {
    title: "Cutting-Edge Design",
    status: "Doing",
    author: "Themeforest, Australia",
    description:
      "Responsive Layout: The design is responsive and tablets, and mobile devices",
    action: [
      {
        actionName: "issues",
        countOfAction: 12,
      },
      {
        actionName: "resolved",
        countOfAction: 5,
      },
      {
        actionName: "comments",
        countOfAction: 7,
      },
    ],
    members: [
      "https://t4.ftcdn.net/jpg/06/36/36/01/360_F_636360143_g6f0Pp843joz8EdUVsMnKVujyLS9vZ7f.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/036/498/120/small/ai-generated-3d-cartoon-character-a-confident-male-with-crossed-arms-isolated-on-transparent-background-png.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7gFHNOQzi7Ji7wMmTCtW9ZKutNFwT8_cNy0Z21Yxls6fGf5b2mtHhbry6vGIfH2Bz_g&usqp=CAU",
      "img1.png",
      "img2.jpg",
      "user1.png",
      "user2.png",
      "user3.png",
    ],
    progress: 70,
  },
  {
    title: "E-Commerce Revamp",
    status: "Done",
    author: "Envato, USA",
    description: "Modern UI design for shopping experience across devices.",
    action: [
      {
        actionName: "issues",
        countOfAction: 12,
      },
      {
        actionName: "resolved",
        countOfAction: 5,
      },
      {
        actionName: "comments",
        countOfAction: 7,
      },
    ],
    members: [
      "https://t4.ftcdn.net/jpg/06/36/36/01/360_F_636360143_g6f0Pp843joz8EdUVsMnKVujyLS9vZ7f.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/036/498/120/small/ai-generated-3d-cartoon-character-a-confident-male-with-crossed-arms-isolated-on-transparent-background-png.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7gFHNOQzi7Ji7wMmTCtW9ZKutNFwT8_cNy0Z21Yxls6fGf5b2mtHhbry6vGIfH2Bz_g&usqp=CAU",
      "img1.png",
      "img2.jpg",
    ],
    progress: 55,
  },
  {
    title: "Mobile App Redesign",
    status: "Doing",
    author: "Dribbble, Canada",
    description: "Redesigning existing app layout for better UX and UI.",
    action: [
      {
        actionName: "issues",
        countOfAction: 15,
      },
      {
        actionName: "resolved",
        countOfAction: 5,
      },
      {
        actionName: "comments",
        countOfAction: 12,
      },
    ],
    members: [
      "https://t4.ftcdn.net/jpg/06/36/36/01/360_F_636360143_g6f0Pp843joz8EdUVsMnKVujyLS9vZ7f.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/036/498/120/small/ai-generated-3d-cartoon-character-a-confident-male-with-crossed-arms-isolated-on-transparent-background-png.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7gFHNOQzi7Ji7wMmTCtW9ZKutNFwT8_cNy0Z21Yxls6fGf5b2mtHhbry6vGIfH2Bz_g&usqp=CAU",
      "img1.png",
      "img2.jpg",
      "user7.png",
      "user8.png",
      "user9.png",
      "+7 More",
    ],
    progress: 35,
  },
  {
    title: "Admin Dashboard UI",
    status: "Done",
    author: "Behance, Germany",
    description:
      "Building responsive admin panel with charts and data visualization.",
    action: [
      {
        actionName: "issues",
        countOfAction: 10,
      },
      {
        actionName: "resolved",
        countOfAction: 3,
      },
      {
        actionName: "comments",
        countOfAction: 7,
      },
    ],
    members: [
      "https://t4.ftcdn.net/jpg/06/36/36/01/360_F_636360143_g6f0Pp843joz8EdUVsMnKVujyLS9vZ7f.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/036/498/120/small/ai-generated-3d-cartoon-character-a-confident-male-with-crossed-arms-isolated-on-transparent-background-png.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7gFHNOQzi7Ji7wMmTCtW9ZKutNFwT8_cNy0Z21Yxls6fGf5b2mtHhbry6vGIfH2Bz_g&usqp=CAU",
      "img1.png",
      "img2.jpg",
      "user10.png",
      "user11.png",
      "user12.png",
      "+4 More",
    ],
    progress: 90,
  },
  {
    title: "Personal Portfolio",
    status: "Done",
    author: "Freelancer, India",
    description: "A responsive developer portfolio with animations and blog.",
    action: [
      {
        actionName: "issues",
        countOfAction: 2,
      },
      {
        actionName: "resolved",
        countOfAction: 5,
      },
      {
        actionName: "comments",
        countOfAction: 6,
      },
    ],
    members: [
      "https://t4.ftcdn.net/jpg/06/36/36/01/360_F_636360143_g6f0Pp843joz8EdUVsMnKVujyLS9vZ7f.jpg",
      "https://static.vecteezy.com/system/resources/thumbnails/036/498/120/small/ai-generated-3d-cartoon-character-a-confident-male-with-crossed-arms-isolated-on-transparent-background-png.png",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7gFHNOQzi7Ji7wMmTCtW9ZKutNFwT8_cNy0Z21Yxls6fGf5b2mtHhbry6vGIfH2Bz_g&usqp=CAU",
      "img1.png",
      "img2.jpg",
      "user13.png",
      "user14.png",
      "user15.png",
      "+2 More",
    ],
    progress: 100,
  },
];
