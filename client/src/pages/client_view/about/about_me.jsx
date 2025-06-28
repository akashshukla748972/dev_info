import React from "react";
import SideNav from "../../../components/client_view/about/side_nav";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import SeekBar from "../../../components/client_view/about/seek_var";

const AboutUser = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="min-h-screen flex text-gray-700 dark:text-gray-200"
    >
      <div className="min-h-screen flex flex-col p-4 md:p-6 space-y-20">
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col space-y-3">
            <h2 className="text-2xl font-semibold  text-gray-900 dark:text-gray-100">
              About
            </h2>
            <p className="text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              impedit ullam similique expedita dolor animi cum, quam, quae harum
              reiciendis dignissimos aperiam nesciunt molestias quo distinctio
              sed accusantium tempore autem beatae id repudiandae corporis
              deleniti aut nulla? Cum blanditiis fugit inventore sed beatae
              tempora corrupti iusto rerum delectus. Facere quo, dolore tempore
              asperiores error ut dolorum, voluptate porro explicabo quibusdam
              officiis, nostrum quae esse eos et eius saepe molestias dolorem
              laudantium earum harum nam reiciendis. Ea voluptas nulla
              praesentium non, eligendi explicabo labore consequuntur fugiat
              minima quia. Recusandae molestiae consectetur sunt. Eligendi minus
              saepe illum accusamus tenetur, odio nemo deleniti?
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZXzwlOFW_1p8zKm-KfsSeuWjZL08MoPXaQ&s"
                alt=""
                className="h-full"
              />
            </div>
            <div className="md:col-span-2 text-base space-y-8">
              <h2 className="text-2xl font-medium  text-gray-900 dark:text-gray-100">
                UI/UX Designer & Web Developer.
              </h2>
              <p className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Tenetur ea ab quisquam pariatur blanditiis possimus cum,
                molestiae minus doloribus magnam ut nisi? Tempora ullam dicta
                itaque tenetur recusandae veniam placeat!
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <h3 className="font-semibold">Birthday:</h3>
                  <span>01/02/2003</span>
                </div>
                <div className="flex gap-3">
                  <h3 className="font-semibold">Age:</h3>
                  <span>24</span>
                </div>
                <div className="flex gap-3">
                  <h3 className="font-semibold">Degree:</h3>
                  <span>Master</span>
                </div>
                <div className="flex gap-3">
                  <h3 className="font-semibold">City:</h3>
                  <span className="">New York, USA</span>
                </div>
                <div className="flex gap-3">
                  <h3 className="font-semibold">Phone:</h3>
                  <span>7000981620</span>
                </div>
                <div className="flex gap-3">
                  <h3 className="font-semibold">Email:</h3>
                  <span>shukla@example.com</span>
                </div>
                <div className="flex gap-3">
                  <h3 className="font-semibold">Freelance:</h3>
                  <span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section className="bg-[#f1f7fa] dark:bg-gray-800 space-y-6 px-6 py-10 my-6">
          <div className="">
            <h2 className="text-xl font-semibold">Skills</h2>
          </div>

          <div className="">
            <p className="">
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>

          <div className=" p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <SeekBar name={"HTML"} percent={"100"} />
            <SeekBar name={"JAVA"} percent={"80"} />
            <SeekBar name={"JAVA SCRIPT"} percent={"95"} />
            <SeekBar name={"REACT JS"} percent={"88"} />
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default AboutUser;
