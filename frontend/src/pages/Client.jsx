import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
import Navbar from "../components/client/Navbar";
import Home from "../components/client/Home";
import Skills from "../components/client/Skills";
import Projects from "../components/client/Projects";
import Contact from "../components/client/Contact";

function Client() {
  document.title = "Portfolio | Client";
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <Navbar />
      <div className="container">
        <Home />
        {/* <Experience /> */}
        <Skills />
        <Projects />
        <Contact />
      </div>
    </>
  );
}

export default Client;
