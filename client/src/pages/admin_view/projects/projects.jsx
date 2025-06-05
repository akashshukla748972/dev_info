import React from "react";
import { motion } from "framer-motion";
import PageHeading from "../../../components/admin_view/page_heading";
import { Link } from "react-router-dom";
import {
  CircleCheckBig,
  CircleDotDashed,
  Info,
  SquarePlus,
} from "lucide-react";
import { projects } from "../../../configs/admin/index";
import ProjectCard from "../../../components/admin_view/project_card";

const Projects = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className="space-y-8"
    >
      <PageHeading pageTitle="Project List" routes={"/projects"} />

      <div className="bg-gray-800 p-6 flex justify-between rounded-full">
        <div className="flex space-x-6">
          <Link className="flex items-center gap-3">
            <CircleDotDashed color="#f1e9e9" /> All
          </Link>
          <Link className="flex items-center  gap-3">
            <Info /> Doing
          </Link>
          <Link className="flex items-center  gap-3">
            <CircleCheckBig color="#f1e9e9" />
            Done
          </Link>
        </div>
        <Link
          to={"/admin/projects/create"}
          className="flex items-center gap-3 bg-[#308E87] p-2 rounded-md"
        >
          <SquarePlus color="#f1e9e9" /> Create New Project
        </Link>
      </div>

      <div className="p-4  grid grid-cols-3 gap-4">
        {projects.map((item) => (
          <ProjectCard key={item.title} data={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default Projects;
