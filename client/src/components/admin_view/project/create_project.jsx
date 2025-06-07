import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import {  CloudUpload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"

const CreateProjectForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [uploadImageName, setUploadImageName] = useState(null);
  const [uploadImageData, setUploadImageData] = useState(null);
  const [startData, setStartDate] = useState(null);
  const [endData, setEndDate] = useState(null);
  const uploadFileRef = useRef(null);
  const navigate = useNavigate();

  const dispatch = useDispatch()

  const handleCreteProject = (data) => {
    const formData = new FormData();
    formData.append("poster", uploadImageData);
    formData.append("title", data.title);
    formData.append("description", data.description);

  
    
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
              {...register("project_title", {
                required: "Project name is required.",
              })}
              type="text"
              className={`border ${
                errors.project_title ? "border-red-500" : "border-gray-500"
              }  p-2 rounded outline-none`}
              placeholder="Project name"
            />
            {errors.project_title && (
              <p className="text-red-500">{errors.project_title.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-3">
            <label htmlFor="project_title" className="">
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
              <label htmlFor="project_title" className="">
                Project Size
              </label>
              <input
                {...register("project_size", {
                  required: "Project size is required.",
                })}
                type="text"
                className={`border ${
                  errors.project_size ? "border-red-500" : "border-gray-500"
                }  p-2 rounded outline-none`}
                placeholder="Project name"
              />
              {errors.project_size && (
                <p className="text-red-500">{errors.project_size.message}</p>
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <label className="">Starting date</label>
              <input
                {...register("start_date", {
                  required: "Start date is required.",
                })}
                type="date"
                value={startData || ""}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
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
                {...register("end_date", {
                  required: "End date is required.",
                })}
                type="date"
                value={endData || ""}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                className={`border ${
                  errors.end_date ? "border-red-500" : "border-gray-500"
                } p-2 rounded outline-none`}
              />
              {errors.end_date && (
                <p className="text-red-500">{errors.end_date.message}</p>
              )}
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
            <button className="bg-green-500 px-8 py-2 rounded-sm" type="submit">
              Add
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
