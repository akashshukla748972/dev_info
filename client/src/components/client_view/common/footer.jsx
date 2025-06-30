import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../../../public/logo.png";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

const FooterUser = () => {
  return (
    <section className="p-4 md:p-6 lg:p-10 bg-gray-100 dark:bg-gray-800">
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">
          Browse by Category
        </h2>
        <div className="max-w-4xl grid grid-cols-3 md:grid-cols-6 gap-2 ">
          <NavLink className="px-4 lg:px-6 py-2 rounded-xl text-center text-nowrap bg-gray-200 dark:bg-gray-700 font-semibold">
            All
          </NavLink>
          <NavLink className="px-4 lg:px-6 py-2 rounded-xl text-center text-nowrap bg-gray-200 dark:bg-gray-700 font-semibold">
            Letest
          </NavLink>
          <NavLink className="px-4 lg:px-6 py-2 rounded-xl text-center text-nowrap bg-gray-200 dark:bg-gray-700 font-semibold">
            Popular
          </NavLink>
          <NavLink className="px-4 lg:px-6 py-2 rounded-xl text-center text-nowrap bg-gray-200 dark:bg-gray-700 font-semibold">
            Portfolio
          </NavLink>
          <NavLink className="px-4 lg:px-6 py-2 rounded-xl text-center text-nowrap bg-gray-200 dark:bg-gray-700 font-semibold">
            Business
          </NavLink>
          <NavLink className="px-4 lg:px-6 py-2 rounded-xl text-center text-nowrap bg-gray-200 dark:bg-gray-700 font-semibold">
            E-Commerce
          </NavLink>
        </div>
      </div>
      <hr className="h-0.5 opacity-25 my-6 md:my-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 space-y-6">
        <div className="flex flex-col space-y-2">
          <h4 className="font-bold">Company</h4>
          <div className="flex flex-col space-y-1 text-gray-600 dark:text-gray-300">
            <Link className="" to="/">
              About Us
            </Link>
            <Link className="" to="/">
              Contact
            </Link>
            <Link className="" to="/">
              Blog
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="font-bold">Legal</h4>
          <div className="flex flex-col space-y-1 text-gray-600 dark:text-gray-300">
            <Link className="" to="/">
              Privacy Policy
            </Link>
            <Link className="" to="/">
              Terms of Service
            </Link>
            <Link className="" to="/">
              Refund Policy
            </Link>
            <Link className="" to="/">
              Return Policy
            </Link>
            <Link className="" to="/">
              Cookie Policy
            </Link>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="font-bold">Subscribe</h4>
          <div className="flex flex-col text-gray-600 dark:text-gray-300 space-y-4">
            <p className="">
              Get the latest templates and updates in your inbox
            </p>
            <div className="md:max-w-sm flex border border-orange-500 dark:border-none dark:bg-gray-700 rounded-md overflow-hidden">
              <input
                type="text"
                className="w-full bg-transparent px-4 py-2 outline-none"
                placeholder="Your Email"
              />
              <button className=" bg-orange-500 dark:bg-orange-800 text-gray-100 font-semibold px-4 md:px-6 lg:px-10 py-2">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-0.5 opacity-25 my-6 md:my-10" />

      <div className="flex flex-col md:flex-row justify-between items-center space-y-6">
        <div className="flex items-center space-x-2">
          <img src={Logo} className="w-8 h-8 rounded-full" alt="logo" />
          <h2 className="text-xl font-semibold">DEVINFO TECH SOLUTIONS</h2>
        </div>
        <div className="flex items-center space-x-4">
          <Link>
            <Facebook />
          </Link>
          <Link>
            <Twitter />
          </Link>
          <Link>
            <Instagram />
          </Link>
          <Link>
            <Linkedin />
          </Link>
          <Link>
            <Github />
          </Link>
          <Link>
            <Mail />
          </Link>
        </div>
        <p className=" ">© 2025 Devinfo Tech Solutions. All rights reserved.</p>
      </div>
    </section>
  );
};

export default FooterUser;
