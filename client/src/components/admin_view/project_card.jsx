import React from "react";
import { animate, motion, scale } from "framer-motion";

const ProjectCard = ({ data }) => {
  return (
    <motion.div
      initial={{ bottom: -120, opacity: 0 }}
      animate={{ bottom: 0, opacity: 1 }}
      exit={{ bottom: -120, opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className={`border-4 ${
        data.status == "Done" ? "border-[#1e4128]" : "border-[#363434]"
      } p-4 flex flex-col gap-y-3 bg-gray-800 rounded-xl relative`}
    >
      <div className="header flex justify-end items-center">
        <span
          className={`status ${
            data.status == "Fulfilled"
              ? "bg-green-800"
              : data.status == "Pending"
              ? "bg-yellow-800"
              : "bg-red-800"
          }  py-[2px] px-[4px] rounded`}
        >
          {data.status}
        </span>
      </div>

      <div className="">
        <img src={data.poster.url} alt="poster" className="h-32 w-full" />
      </div>

      <div className="flex items-center space-x-2">
        <img
          src="https://t4.ftcdn.net/jpg/06/36/36/01/360_F_636360143_g6f0Pp843joz8EdUVsMnKVujyLS9vZ7f.jpg"
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <h2 className="title">{data.title}</h2>
      </div>
      <p className="">{data.description}</p>

      <button className="bg-gray-700 hover:bg-orange-800 font-semibold transition-colors duration-300 active:bg-orange-700 py-1 rounded">
        Explore More
      </button>

      <div className="flex items-center space-x-4">
        <div className="flex -space-x-3">
          {/* {data.members.slice(0, 3).map((item, index) => (
            <img
              key={item}
              src={item}
              alt=""
              className={`w-8 h-8 rounded-full z-[${index}]`}
            />
          ))} */}
        </div>
        {/* <span className="">+{data.members.length} More..</span> */}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
