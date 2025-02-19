import React from "react";
import project from "../data/projects.json";
const Projects = () => {
  return (
    <>
      <div className="container projects my-3" id="project">
        <h1 className="">Projects</h1>
        <div className="row d-flex justify-content-center align-center">
          {project.map((data, index) => {
            return (
              <>
                <div
                  key={data.id}
                  className="my-3 col-md-4 col-lg-3 col-sm-6 mx-3"
                  data-aos="flip-right"
                  data-aos-duration="1000"
                >
                  <div
                    className="pr card bg-dark text-light my-5"
                    style={{ width: "18rem", border: "1px solid yellow" }}
                  >
                    <div className="img d-flex justify-content-center align-center p-3">
                      <img
                        src={`${data.imageSrc}`}
                        className="card-img-top"
                        style={{
                          width: "250px",
                          height: "200px",
                          border: "1px solid yellow",
                          borderRadius: "10px",
                        }}
                        alt="..."
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{data.title}</h5>
                      <p className="card-text">{data.description}</p>
                      <a href={data.demo} className="btn btn-primary mx-3">
                        Demo
                      </a>
                      <a href={data.source} className="btn btn-warning">
                        Code
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Projects;
