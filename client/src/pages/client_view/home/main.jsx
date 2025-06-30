import ProjectCard from "../../../components/client_view/home/project_card";
import SearchComponent from "../../../components/client_view/common/search";
import { motion } from "framer-motion";

const MainSection = () => {
  return (
    <div className="">
      <SearchComponent />

      {/* letest 3 projects or searched project */}
      <section className="my-10">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">
          Letest Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>

      {/* letest 3 projects or searched project */}
      <section className="my-10 bg-gray-100 dark:bg-gray-800 p-4 md:p-6">
        <div className="flex flex-col items-center space-y-3 mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">
            Create Your Custom Website & App
          </h2>
          <p className="text-center">
            Professional web and mobile application development tailored to your
            specific business requirements. <br className="hidden md:block" />{" "}
            Transform your ideas into powerful digital solutions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </section>
    </div>
  );
};

export default MainSection;
