import { Eye } from "lucide-react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <div className="max-w-xl bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
      <div className="w-full">
        <img src={project?.poster.url} alt="" className="w-full" />
      </div>
      <div className="flex flex-col space-y-3 px-2 md:px-4 my-6">
        <h2 className="text-xl md:text-2xl font-semibold">
          {project?.title.slice(0, 15)}...
        </h2>
        <div className="flex flex-wrap space-x-4 text-[12px]">
          <span className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700">
            HTML
          </span>
          <span className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700">
            CSS
          </span>
          <span className="px-4 py-1 rounded bg-gray-200 dark:bg-gray-700">
            JAVASCRIPT
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center">
            <IoStar className="text-yellow-500" />
            <IoStar className="text-yellow-500" />
            <IoStar className="text-yellow-500" />
            <IoStar className="text-yellow-500" />
            <IoStarHalf className="text-yellow-500" />
            <span className="">(4.4)</span>
          </span>
          <span className="flex items-center space-x-2">
            <Eye /> <span className="">92</span>
          </span>
        </div>
        <Link
          to={"/"}
          className="w-full bg-gray-200 dark:bg-gray-700 text-center py-2 rounded"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
