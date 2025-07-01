import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import PageHeading from "../../../components/admin_view/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { CloudUpload, X } from "lucide-react";
import {
  getLoggedAdminData,
  updateProfileDetails,
  updateProfileImage,
} from "../../../store/about_slice/adminSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const { admin, isLoading } = useSelector((state) => state.admin);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [uploadImageName, setUploadImageName] = useState(null);
  const [uploadImageData, setUploadImageData] = useState(null);
  const [updateDetailsLoading, setUpdateDetailsLoading] = useState(false);
  const selectImageRef = useRef(null);

  const handleSetFileUploadData = (data) => {
    const file = data.target.files[0];
    if (file) {
      setUploadImageData(file);
      setUploadImageName(file.name);
    }
  };

  const handleUploadProfileImage = () => {
    const formData = new FormData();
    formData.append("avatar", uploadImageData);
    dispatch(updateProfileImage(formData)).then((data) => {
      if (data?.payload?.isError) {
        toast.error(data.payload.message);
      } else {
        toast.success(data.payload.message);
        dispatch(getLoggedAdminData());
        setUploadImageData(null);
        setUploadImageName(null);
        selectImageRef.current.value = "";
      }
    });
  };

  const handleEditProfile = (data) => {
    setUpdateDetailsLoading(true);
    dispatch(updateProfileDetails(data)).then((data) => {
      if (data?.payload?.isError) {
        toast.error(data.payload.message);
      } else {
        dispatch(getLoggedAdminData());
        toast.success(data.payload.message);
        setUpdateDetailsLoading(false);
        reset();
        navigate(-1);
      }
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className="space-y-8"
    >
      <PageHeading pageTitle="Edit Profile" routes={"/about/edit-profile"} />

      <main className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <section className="col-span-2 bg-gray-800 p-6">
          <h2 className="text-xl font-semibold">My Profile Image</h2>
          <div className="flex flex-col items-center justify-center my-6 space-y-4">
            <img
              src={
                admin?.avatar?.url
                  ? admin?.avatar?.url
                  : "https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4195.jpg?semt=ais_hybrid&w=740"
              }
              alt="profile"
              className="h-32 w-32 rounded-full"
            />
            <div className="text-center">
              <h2 className="text-[17px] font-semibold">{admin.name}</h2>
              <h2 className="text-gray-500 font-semibold">{admin.email}</h2>
            </div>
          </div>

          <div
            onClick={() => {
              if (!uploadImageName) selectImageRef.current.click();
            }}
            className="w-full h-52 border-1 border-dashed rounded-2xl flex justify-center items-center"
          >
            <div className="flex flex-col justify-center items-center">
              <CloudUpload size={32} />
              <p className="">
                {uploadImageName ? (
                  <div className="flex items-center gap-3">
                    <span className="truncate max-w-xs">{uploadImageName}</span>
                    <X
                      onClick={(e) => {
                        e.stopPropagation();
                        setUploadImageName(null);
                        if (selectImageRef.current) {
                          selectImageRef.current.value = "";
                        }
                        if (uploadImageData) {
                          setUploadImageData(null);
                        }
                      }}
                      className="w-6 h-6 rounded-full bg-white text-black hover:bg-red-500 hover:text-white p-1"
                    />
                  </div>
                ) : (
                  "Click to upload profile image"
                )}
              </p>
            </div>
            <input
              ref={selectImageRef}
              onChange={handleSetFileUploadData}
              type="file"
              className="hidden"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleUploadProfileImage}
              disabled={!uploadImageName}
              className={`${
                !uploadImageName ? "bg-gray-700 " : "bg-gray-500"
              } w-full p-2 rounded flex justify-center`}
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-gray-600 border-r-gray-200 animate-spin"></div>
              ) : (
                "Upload Image"
              )}
            </button>
          </div>
        </section>
        <section className="col-span-3 bg-gray-800 p-6">
          <h2 className="text-xl font-semibold">Edit Profile Details</h2>
          <hr className="mt-2 mb-6" />
          <form
            onSubmit={handleSubmit(handleEditProfile)}
            action=""
            className="flex flex-col space-y-4 text-gray-300"
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col space-y-2">
                <label htmlFor="name" className="">
                  User Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  defaultValue={admin.name}
                  type="text"
                  id="name"
                  className={`border ${
                    errors.name ? "border-red-500" : "border-gray-500"
                  } p-2 rounded outline-none`}
                  placeholder="Enter your name"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="">
                  Email
                </label>
                <input
                  {...register("email", { required: "Email is required" })}
                  defaultValue={admin.email}
                  type="text"
                  id="email"
                  className={`border ${
                    errors.email ? "border-red-500" : "border-gray-500"
                  } p-2 rounded outline-none`}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="phone" className="">
                Phone Number
              </label>
              <input
                {...register("phone", { required: "Phone number is required" })}
                defaultValue={admin?.phone}
                type="text"
                id="phone"
                className={`border ${
                  errors.phone ? "border-red-500" : "border-gray-500"
                } p-2 rounded outline-none`}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="bio" className="">
                Bio
              </label>
              <textarea
                {...register("bio", { required: "Bio number is required" })}
                defaultValue={admin?.bio}
                type="text"
                id="bio"
                className={`border ${
                  errors.bio ? "border-red-500" : "border-gray-500"
                } p-2 rounded outline-none`}
                placeholder="Enter your bio"
              ></textarea>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="address" className="">
                Address
              </label>
              <textarea
                {...register("address", {
                  required: "Address number is required",
                })}
                defaultValue={admin?.address}
                type="text"
                id="address"
                className={`border ${
                  errors.address ? "border-red-500" : "border-gray-500"
                } p-2 rounded outline-none`}
                placeholder="Enter your address number"
              ></textarea>
            </div>

            <div className="flex justify-end my-6">
              <button
                disabled={!isValid || updateDetailsLoading}
                type="submit"
                className={`${
                  isValid
                    ? "w-52 flex justify-center bg-gray-500"
                    : "bg-gray-700"
                } py-2 px-10 rounded-full`}
              >
                {updateDetailsLoading ? (
                  <div className="w-6 h-6 rounded-full border-2 border-gray-600 border-r-gray-200 animate-spin"></div>
                ) : (
                  "Update Details"
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </motion.div>
  );
};

export default EditProfile;
