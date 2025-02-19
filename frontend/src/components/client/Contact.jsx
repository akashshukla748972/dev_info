import React from "react";
import { CiFacebook, CiLinkedin } from "react-icons/ci";
import {
  FaFacebook,
  FaGithubSquare,
  FaInstagram,
  FaInstagramSquare,
} from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const Contact = () => {
  return (
    <>
      <div className="container contact my-5" id="contact">
        <h1 className="">CONTACT ME</h1>
        <div
          className="contact-icons"
          data-aos="zoom-in-up"
          data-aos-duration="1000"
        >
          <a
            href="https://www.instagram.com/iamakashshukla92/"
            target="_blank"
            className="items"
          >
            <FaInstagram className="icons" />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100022302574814"
            target="_blank"
            className="items"
          >
            <CiFacebook className="icons" />
          </a>
          <a
            href="https://www.linkedin.com/in/akash-shukla-962895328/"
            target="_blank"
            className="items"
          >
            <CiLinkedin className="icons" />
          </a>
          <a
            href="https://x.com/AkashShukl56981"
            target="_blank"
            className="items"
          >
            <FaSquareXTwitter className="icons" />
          </a>
          <a
            href="https://github.com/akashshukla748972"
            target="_blank"
            className="items"
          >
            <FaGithubSquare className="icons" />
          </a>
          <a
            href="mailto:shuklaakash748972@gmail.com"
            target=""
            className="items"
          >
            <SiGmail className="icons" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
