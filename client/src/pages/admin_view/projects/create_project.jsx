import React from "react";
import { motion } from "framer-motion";
import PageHeading from "../../../components/admin_view/page_heading";
import CreateProjectForm from "../../../components/admin_view/project/create_project";

const CreateProject = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className="space-y-8"
    >
      <PageHeading pageTitle="Project Create" routes={"/projects/create"} />

      <div className="bg-gray-800 p-6 rounded-2xl">
        <CreateProjectForm />
      </div>
    </motion.div>
  );
};

export default CreateProject;
