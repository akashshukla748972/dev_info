import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHeading from "../../../components/admin_view/PageHeading";
import { Link, NavLink, useParams } from "react-router-dom";
import {
  CircleCheckBig,
  CircleDotDashed,
  Info,
  SquarePlus,
} from "lucide-react";
import ProjectCard from "../../../components/admin_view/ProjectCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProject } from "../../../store/project_slice/projectSlice";

const Projects = () => {
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const { filterBy } = useParams();
  const [filterData, setFilterData] = useState(null);

  const handleGetAllProject = () => {
    dispatch(getAllProject());
  };

  useEffect(() => {
    handleGetAllProject();
  }, []);

  useEffect(() => {
    const normalizedFilter = filterBy?.toLowerCase();
    if (normalizedFilter !== "all") {
      const capitalizedFilter =
        normalizedFilter?.charAt(0).toUpperCase() + normalizedFilter?.slice(1);
      const filtered = projects?.filter(
        (item) => item.status === capitalizedFilter
      );
      setFilterData(filtered);
    } else {
      setFilterData(projects);
    }
  }, [projects, filterBy]);
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
          <NavLink
            to={"/admin/projects/all"}
            className={({ isActive }) =>
              `${
                isActive ? "text-green-500" : "text-[#f1e9e9]"
              } flex items-center gap-3`
            }
          >
            <CircleDotDashed /> All
          </NavLink>
          <NavLink
            to={"/admin/projects/pending"}
            className={({ isActive }) =>
              `${
                isActive ? "text-green-500" : "text-[#f1e9e9]"
              } flex items-center gap-3`
            }
          >
            <Info /> Pending
          </NavLink>
          <NavLink
            to={"/admin/projects/fulfilled"}
            className={({ isActive }) =>
              `${
                isActive ? "text-green-500" : "text-[#f1e9e9]"
              } flex items-center gap-3`
            }
          >
            <CircleCheckBig />
            Fulfilled
          </NavLink>
        </div>
        <Link
          to={"/admin/projects/create"}
          className="flex items-center gap-3 bg-[#308E87] p-2 rounded-md"
        >
          <SquarePlus color="#f1e9e9" /> Create New Project
        </Link>
      </div>

      <div className="p-4  grid grid-cols-3 gap-4">
        {filterData &&
          filterData.map((item) => (
            <ProjectCard key={item.title} data={item} />
          ))}
      </div>
    </motion.div>
  );
};

export default Projects;
