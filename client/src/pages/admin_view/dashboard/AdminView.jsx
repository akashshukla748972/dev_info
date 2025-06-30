import React from "react";
import { motion } from "framer-motion";
import PageHeading from "../../../components/admin_view/PageHeading";
import StateCard from "../../../components/admin_view/dashboard/StateCard";
import MessageCard from "../../../components/admin_view/dashboard/MessageCard";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const AdminView = () => {
  return (
    <div className="flex-1 overflow-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.2, delay: 0.3 }}
        className="space-y-8"
      >
        <PageHeading pageTitle="Admin Dashboard" routes={"/dashboard"} />

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 1 }}
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <StateCard name={"Total Projects"} value={16} />
            <StateCard name={"Complete Projects"} value={6} />
            <StateCard name={"Pending Projects"} value={8} />
            <StateCard name={"Rejected Projects"} value={2} />
          </div>

          <div className="w-full grid grid-cols-1 sm:grid-cols-2 ">
            <section className="p-4 md:p-6 space-y-6">
              <h2 className="text-xl font-medium">Recent Messages</h2>
              <div className="flex flex-col space-y-4">
                <MessageCard
                  name={"Aysuh"}
                  message={"it is a fantastic website"}
                />
                <MessageCard
                  name={"Aysuh"}
                  message={"it is a fantastic website"}
                />
                <MessageCard
                  name={"Aysuh"}
                  message={"it is a fantastic website"}
                />
              </div>
            </section>
            <section className="p-4 md:p-6 space-y-6">
              <h2 className="text-xl font-medium">Quick Action</h2>
              <div className="flex flex-col space-y-4">
                <Link
                  className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                  to={"/admin/projects/create"}
                >
                  <Plus /> Add New Project
                </Link>
                <Link
                  className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                  to={"/admin/skills"}
                >
                  <Plus /> Manage Skills
                </Link>
                <Link
                  className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                  to={"/admin/about/edit"}
                >
                  <Plus /> Update Profile
                </Link>
                <Link
                  className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-md cursor-pointer"
                  to={"/admin/about"}
                >
                  <Plus /> View Profile
                </Link>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminView;
