import React from "react";
import ContactForm from "../../../components/client_view/contact/ContactForm";
import { useForm } from "react-hook-form";
import { IoMail } from "react-icons/io5";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";

const ContactUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const handleContactForm = (data) => {
    console.log("Contact Form", data);
  };
  return (
    <div className=" my-6">
      <div className="flex flex-col justify-center items-center space-y-4 mb-6 md:mb-10">
        <h1 className="text-3xl font-bold text-gray-500">
          Request a Custom Website
        </h1>
        <p className="text-center text-gray-500">
          Let us build the perfect website for your business. Fill out the form
          below with your requirements, <br /> and we'll get back to you with a
          proposal.
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
          <div className="p-4 sm:p-6 bg-gray-500 dark:bg-gray-500 text-gray-800 dark:text-gray-200">
            <h3 className="text-xl md:text-2xl font-semibold">
              Website Request Form
            </h3>
            <p>Fill out the details below to get started</p>
          </div>
          <div className="p-6">
            <ContactForm
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              isValid={isValid}
              handleContactForm={handleContactForm}
            />

            <p className="text-center">
              We'll get back to you within 24-48 hours with an initial proposal.
            </p>
          </div>
        </div>
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-1/2 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden my-6 md:my-10 p-6">
          <h2 className="text-center font-semibold text-xl md:text-2xl my-4 md:my-6">
            Other Ways to Reach Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col space-y-2 justify-center items-center">
              <span className="text-xl md:text-2xl lg:text-3xl">
                <IoMail />
              </span>
              <span>Email</span>
              <span>shukla65782@gmail.com</span>
            </div>
            <div className="flex flex-col space-y-2 justify-center items-center">
              <span className="text-xl md:text-2xl lg:text-3xl">
                <FaPhone />
              </span>
              <span>Phone</span>
              <span>+31 7445859414</span>
            </div>
            <div className="flex flex-col space-y-2 justify-center items-center">
              <span className="text-xl md:text-2xl lg:text-3xl">
                <FaMapMarkerAlt />
              </span>
              <span>Address</span>
              <span className="text-center">
                Varanasi City, Uttar Pradesh India, 221204
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUser;
