import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Edit,
  Facebook,
  Github,
  Instagram,
  Mail,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageHeading from "../../../components/admin_view/PageHeading";
import { checkAuth } from "../../../store/auth_slice/authSlice";

const About = () => {
  const { admin } = useSelector((state) => state.admin);

  return (
    <div className="flex-1 overflow-auto relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, delay: 0.3 }}
        className="space-y-8"
      >
        <PageHeading pageTitle="User Profile" routes={"/about"} />

        {/* banner */}
        <motion.section className="">
          <div className="relative">
            {/* poster */}
            <img
              src="https://ichef.bbci.co.uk/images/ic/1920xn/p0hpljtw.jpg"
              alt=""
              className="w-full h-[500px]"
            />
            {/* profile */}
            <div className="absolute -bottom-22 left-[50%] -translate-x-[50%] space-y-2 ">
              <div className="relative flex flex-col justify-center items-center w-fit">
                <img
                  src={
                    admin.avatar?.url ||
                    "https://img.freepik.com/free-photo/fun-3d-cartoon-teenage-boy_183364-81073.jpg?ga=GA1.1.153015461.1743153162&semt=ais_items_boosted&w=740"
                  }
                  alt=""
                  className="w-32 h-32 rounded-full"
                />
                <Link
                  to={"/admin/about/edit"}
                  className="absolute right-0 top-20 w-10 h-10 rounded-full bg-gray-100 flex justify-center items-center"
                >
                  <Edit className="text-gray-800 cursor-pointer" />
                </Link>
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold">
                  {admin?.name.slice(0, 12) || "Not added"}..
                </h2>
                <p className="">Designer</p>
              </div>
            </div>
          </div>

          <div className="p-6 flex justify-between">
            <div className="flex space-x-6">
              <div className="">
                <div className="flex">
                  <Mail />
                  <span className="">Email</span>
                </div>
                <div className="">{admin?.email || "Not added"}</div>
              </div>
              <div className="">
                <div className="flex">
                  <Calendar />
                  <span className="">DOB</span>
                </div>
                <div className="">{admin?.dob || "Not added"}</div>
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="">
                <div className="flex">
                  <Mail />
                  <span className="">Contact Us</span>
                </div>
                <div className="">{admin?.phone || "Not added"}</div>
              </div>
              <div className="">
                <div className="flex">
                  <Calendar />
                  <span className="">Loaction</span>
                </div>
                <div className="">{admin?.address || "Not added"}</div>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          {/* social links */}
          <div className="flex justify-center items-center text-center">
            <div className="flex space-x-10">
              <Link className=" hover:text-green-500 flex justify-center items-center transition-colors duration-300">
                <Facebook size={24} />
              </Link>
              <Link className=" hover:text-green-500 flex justify-center items-center transition-colors duration-300">
                <Twitter size={24} />
              </Link>
              <Link className=" hover:text-green-500 flex justify-center items-center transition-colors duration-300">
                <Instagram size={24} />
              </Link>
              <Link className=" hover:text-green-500 flex justify-center items-center transition-colors duration-300">
                <Github size={24} />
              </Link>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About;
