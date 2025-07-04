import React from "react";
import SearchComponent from "../../../components/client_view/common/SearchComponent";
import { useSelector } from "react-redux";
import ProjectCard from "../../../components/client_view/home/ProjectCard";

const ProjectUser = () => {
  const { projects } = useSelector((state) => state.projects);
  return (
    <div className="p-4 md:p-6 lg:p-10">
      <SearchComponent />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 my-10">
        {projects ? (
          projects?.map((project) => (
            <ProjectCard key={project?.title} project={project} />
          ))
        ) : (
          <div className="">Project not found</div>
        )}
      </div>
    </div>
  );
};

export default ProjectUser;
