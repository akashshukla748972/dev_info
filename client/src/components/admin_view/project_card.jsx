import React from "react";

const ProjectCard = ({ data }) => {
  return (
    <div
      className={`border-4 ${
        data.status == "Done" ? "border-[#1e4128]" : "border-[#363434]"
      } p-4 flex flex-col gap-y-3 bg-gray-800 rounded-xl`}
    >
      <div className="header flex justify-between items-center">
        <h2 className="title">{data.title}</h2>
        <span
          className={`status ${
            data.status == "Done" ? "bg-green-800" : "bg-red-800"
          } py-[2px] px-[4px] rounded`}
        >
          {data.status}
        </span>
      </div>

      <div className="author flex space-x-3 items-center">
        <img
          src="https://t4.ftcdn.net/jpg/06/36/36/01/360_F_636360143_g6f0Pp843joz8EdUVsMnKVujyLS9vZ7f.jpg"
          alt=""
          className="w-8 h-8 rounded-full"
        />
        <span className="">{data.author}</span>
      </div>

      <p className="">{data.description}</p>
      <div className="">
        {data.action.map((item, index) => (
          <div key={item.actionName + index} className="grid grid-cols-2">
            <span className="">{item.actionName}</span>
            <span className="">{item.countOfAction}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex -space-x-3">
          {data.members.slice(0, 3).map((item, index) => (
            <img
              key={item}
              src={item}
              alt=""
              className={`w-8 h-8 rounded-full z-[${index}]`}
            />
          ))}
        </div>
        <span className="">+{data.members.length} More..</span>
      </div>
    </div>
  );
};

export default ProjectCard;
