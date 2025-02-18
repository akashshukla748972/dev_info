import React, { useEffect, useRef } from "react";
import pdf from "../pdf/resume_akash_shukla.pdf";
import hero from "./data/hero.json";
import Typed from "typed.js";

const Home = () => {
  const typedRef = useRef();
  useEffect(() => {
    const options = {
      strings: [
        "Welcom to my frofile",
        "My Name Akash Shukla",
        "i'm full stack develover",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <div className="container home" id="home">
        <div className="left" data-aos="fade-up-right" data-aos-duration="1000">
          <h1 className="" ref={typedRef}></h1>
          <a
            href={pdf}
            download={"Resume.pdf"}
            className="btn btn-outline-warning"
          >
            Download Resume
          </a>
        </div>
        <div className="right" data-aos="fade-up-left" data-aos-duration="1000">
          <div className="img">
            <img src={`/assets/${hero.imgSrc}`} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
