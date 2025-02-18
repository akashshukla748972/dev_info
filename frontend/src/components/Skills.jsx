import React from "react";
import siklls from "./data/skills.json";

const Skills = () => {
  return (
    <>
      <div className="container skills" id="skills">
        <h1 className="">Skills</h1>
        <div className="items">
          {siklls.map((data, index) => {
            return (
              <>
                <div
                  className="item"
                  key={data.id}
                  data-aos="flip-left"
                  data-aos-duration="1000"
                >
                  <img src={`/assets/${data.imageSrc}`} alt="" className="" />
                  <h3 className="">{data.title}</h3>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Skills;
