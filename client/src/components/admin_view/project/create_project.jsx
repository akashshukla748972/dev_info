import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { CloudUpload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../../store/project_slice/projectSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [uploadImageName, setUploadImageName] = useState(null);
  const [uploadImageData, setUploadImageData] = useState(null);
  const uploadFileRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.projects);

  const handleCreteProject = (data) => {
    const formData = new FormData();
    formData.append("poster", uploadImageData);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("client_name", data.client_name);
    formData.append("start_date", data.start_date);
    formData.append("end_date", data.end_date);
    formData.append("difficulty_level", data.difficulty_level);

    dispatch(createProject(formData)).then((data) => {
      if (data?.payload?.isError) {
        toast.error(data?.payload?.message);
      } else {
        toast.success(data?.payload?.message);
        navigate(-1);
      }
    });
  };

  const handleSetFileUploadData = (data) => {
    const file = data.target.files[0];
    if (file) {
      setUploadImageData(file);
      setUploadImageName(file.name);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.3 }}
      className="space-y-8"
    >
      <div className="">
        <form
          onSubmit={handleSubmit(handleCreteProject)}
          className="flex flex-col space-y-6"
        >
          <div className="flex flex-col space-y-3">
            <label htmlFor="project_title" className="">
              Project Title
            </label>
            <input
              {...register("title", {
                required: "Project name is required.",
              })}
              type="text"
              className={`border ${
                errors.title ? "border-red-500" : "border-gray-500"
              }  p-2 rounded outline-none`}
              placeholder="Project name"
            />
            {errors.title && (
              <p className="text-red-500">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="client_name" className="">
              Client Name
            </label>
            <input
              {...register("client_name", {
                required: "Client name is required.",
              })}
              type="text"
              className={`border ${
                errors.client_name ? "border-red-500" : "border-gray-500"
              }  p-2 rounded outline-none`}
              placeholder="Project name"
            />
            {errors.client_name && (
              <p className="text-red-500">{errors.client_name.message}</p>
            )}
          </div>
          <div className="grid grid-cols-3 space-x-3 justify-between">
            <div className="flex flex-col space-y-2">
              <label htmlFor="difficulty_level" className="">
                Difficulty Level
              </label>

              <select
                {...register("difficulty_level", {
                  required: "Difficulty Level is required",
                })}
                id="difficulty_level"
                className={`border ${
                  errors.difficulty_level ? "border-red-500" : "border-gray-500"
                }  p-2 rounded outline-none bg-gray-800`}
              >
                <option value="">Select Difficulty Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.difficulty_level && (
                <p className="text-red-500">
                  {errors.difficulty_level.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="">Starting date</label>
              <input
                {...register("start_date", {
                  required: "Start date is required.",
                })}
                type="date"
                className={`border ${
                  errors.start_date ? "border-red-500" : "border-gray-500"
                } p-2 rounded outline-none`}
              />
              {errors.start_date && (
                <p className="text-red-500">{errors.start_date.message}</p>
              )}
            </div>

            <div className="flex flex-col space-y-2">
              <label className="">Ending date</label>
              <input
                {...register("end_date")}
                type="date"
                className="border border-gray-500 p-2 rounded outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <label htmlFor="project_title" className="">
              Enter project description
            </label>
            <textarea
              {...register("description", {
                required: "Project Description is required.",
              })}
              type="text"
              className={`border ${
                errors.description ? "border-red-500" : "border-gray-500"
              }  p-2 rounded outline-none`}
              placeholder="Project details"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-3">
            <label className="">Upload Project Poster</label>

            {/* Hidden Input */}
            <input
              type="file"
              ref={uploadFileRef}
              accept="image/*"
              className="hidden"
              onChange={handleSetFileUploadData}
            />

            {/* Clickable Upload Box */}
            <div
              onClick={() => {
                if (!uploadImageName) uploadFileRef.current.click();
              }}
              className="h-64 bg-gray-800 border-2 border-dashed rounded-2xl flex justify-center items-center cursor-pointer"
            >
              <div className="flex flex-col justify-center items-center">
                <CloudUpload size={50} />
                <span className="mt-2 text-center text-white">
                  {uploadImageName ? (
                    <div className="flex items-center gap-3">
                      <span className="truncate max-w-xs">
                        {uploadImageName}
                      </span>
                      <X
                        onClick={(e) => {
                          e.stopPropagation();
                          setUploadImageName(null);
                          if (uploadFileRef.current) {
                            uploadFileRef.current.value = "";
                          }
                          if (uploadImageData) {
                            setUploadImageData(null);
                          }
                        }}
                        className="w-6 h-6 rounded-full bg-white text-black hover:bg-red-500 hover:text-white p-1"
                      />
                    </div>
                  ) : (
                    "Click to upload project image"
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-10 font-semibold">
            <button
              disabled={!isValid || isLoading}
              className={` ${
                isValid ? "bg-green-500" : "bg-green-300"
              } px-8 py-2 rounded-sm`}
              type="submit"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-gray-600 border-r-gray-200 animate-spin"></div>
              ) : (
                "Add"
              )}
            </button>
            <button
              className="bg-red-500 px-8 py-2 rounded-sm"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateProjectForm;
