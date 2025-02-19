import React from "react";
import experience from "../data/experience.json";

const Experience = () => {
  return (
    <>
      <div className="container exp" id="experience">
        <h1 className="">Experience</h1>
        {experience.map((data, index) => {
          return (
            <>
              <div
                key={data.id}
                className="container exp-items text-center my-5"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                <div className="left">
                  <img src={`/assets/${data.imageSrc}`} alt="" />
                </div>
                <div className="right">
                  <h2 className="">{data.role}</h2>
                  <h4 className="">
                    <span className="" style={{ color: "yellowgreen" }}>
                      {data.startDate} {data.endDate}
                    </span>
                    <span className="" style={{ color: "yellow" }}>
                      {" "}
                      {data.location}
                    </span>
                  </h4>
                  <h5 style={{ color: "yellow" }} className="">
                    {data.experiences[0]}
                  </h5>
                  <h5 style={{ color: "yellow" }} className="">
                    {data.experiences[1]}
                  </h5>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default Experience;
