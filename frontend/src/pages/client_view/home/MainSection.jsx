import ProjectCard from "../../../components/client_view/home/ProjectCard";
import SearchComponent from "../../../components/client_view/common/SearchComponent";
import PosterGallery from "./PosterGallery";
import {
  GraduationCap,
  LaptopMinimal,
  Smartphone,
  Smile,
  Table2,
  User,
} from "lucide-react";
import { IoAmericanFootballOutline, IoLogoReact } from "react-icons/io5";
import { GrNode } from "react-icons/gr";
import { SiNativescript } from "react-icons/si";
import { useSelector } from "react-redux";

const companyWorks = [
  {
    Icon: Smile,
    title: "UI/UX Design",
    para: "User-centered interfaces with intuitive navigation and visually appealing designs that improve conversion rates and user satisfaction.",
    color: "#9333EA",
  },
  {
    Icon: LaptopMinimal,
    title: "Website Development",
    para: "Responsive, fast-loading websites with modern technology stack. Custom solutions that scale with your business needs.",
    color: "#2563EB",
  },
  {
    Icon: Smartphone,
    title: "App Development",
    para: "Native and cross-platform mobile applications that deliver seamless user experiences across iOS and Android devices.",
    color: "#16A34A",
  },
];

const devProcess = [
  "Discovery",
  "Planning",
  "Design",
  "Development",
  "Testing",
  "Launch",
  "Support",
];

const outTechnologies = [
  {
    Icon: IoLogoReact,
    title: "React.js",
    para: "Frontend Development",
    color: "#2563EB",
  },
  {
    Icon: GrNode,
    title: "Node.js",
    para: "Backend Development",
    color: "#16A34A",
  },
  {
    Icon: SiNativescript,
    title: "React Native",
    para: "Mobile App Development",
    color: "#9333EA",
  },
  {
    Icon: IoAmericanFootballOutline,
    title: "Expo",
    para: "Mobile App Development",
    color: "#CA8A04",
  },
];

const ourServices = [
  {
    Ic: Table2,
    title: "Website Development",
    para: "Custom websites with responsive design, SEO optimization, and intuitive user interfaces.",
  },
  {
    Ic: GraduationCap,
    title: "UI/UX Design",
    para: "User-centered design with modern aesthetics for higher engagement and conversion rates.",
  },
  {
    Ic: Smartphone,
    title: "Mobile App Development",
    para: "Native and cross-platform apps for iOS and Android with seamless performance.",
  },
  {
    Ic: User,
    title: "Custom Development",
    para: "Tailored solutions for your specific business needs, from enterprise applications to specialized tools.",
  },
];
const MainSection = () => {
  const { projects, isLoading } = useSelector((state) => state.projects);
  return (
    <div className="">
      <SearchComponent />

      {/* letest 3 projects or searched project */}
      <section className="my-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Letest Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {projects ? (
            projects?.map((project) => (
              <ProjectCard key={project?.title} project={project} />
            ))
          ) : (
            <div className="">Project not found</div>
          )}
        </div>
      </section>

      {/* letest 3 projects or searched project */}
      <section className="my-10 bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
        <div className="flex flex-col items-center space-y-3 mb-6">
          <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold">
            Create Your Custom Website & App
          </h2>
          <p className="text-center">
            Professional web and mobile application development tailored to your
            specific business requirements. <br className="hidden md:block" />{" "}
            Transform your ideas into powerful digital solutions.
          </p>
        </div>

        <div className="">
          <PosterGallery projects={projects} />
        </div>
      </section>

      <section className="my-10 shadow-2xl">
        <div className="flex flex-col shadow p-6 my-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-10">
            {companyWorks.map((item) => (
              <div
                key={item.title}
                className="flex flex-col space-y-4 items-center"
              >
                <span className="">
                  <item.Icon size={32} color={item.color} />
                </span>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  {item.para}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center p-6 space-y-2 bg-gray-100 dark:bg-gray-800 my-10 rounded-xl overflow-hidden">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold ">
              Our Development Process
            </h2>
            <div className="flex flex-wrap gap-6">
              {devProcess.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-1 mt-2 px-4 py-2 rounded-3xl bg-gray-200 dark:bg-gray-700"
                >
                  <span className="">{index + 1}.</span>
                  <span className="">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center ">
            <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold my-6">
              Technologies We Use
            </h2>
            <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {outTechnologies.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center bg-gray-100 dark:bg-gray-800 p-6 md:p-10 rounded-xl space-y-3"
                >
                  <span className="">
                    {<item.Icon size={32} color={item.color} />}
                  </span>
                  <h4 className="text-xl font-semibold">{item.title}</h4>
                  <p className="opacity-60">{item.para}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="my-6 flex flex-col items-center ">
            <h2 className="text-center text-xl md:text-2xl lg:text-3xl font-semibold my-6">
              Services We Offer
            </h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
              {ourServices.map((item) => (
                <div
                  key={item.title}
                  className="px-4 md:px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-md shadow flex gap-2"
                >
                  <span className="">
                    {<item.Ic size={32} color="#FF6900" />}
                  </span>
                  <div className="">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="opacity-60">{item.para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MainSection;
