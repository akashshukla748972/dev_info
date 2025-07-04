import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { use } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  hideForm,
  loginClient,
  registerClient,
  showForm,
  verifyOtp,
} from "../../../store/user_slice/userSlice";
import { toast } from "react-toastify";
import { checkAuth } from "../../../store/auth_slice/authSlice";
import { useNavigate } from "react-router-dom";

const SubscribeUser = ({ isOpenForm }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });
  const [loginForm, setLoginForm] = useState(true);
  const [optForm, setOtpForm] = useState(false);
  const [otpEmail, setOtpEmail] = useState("shuklaakash357@gmail.com");
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleLoginClient = (data) => {
    dispatch(loginClient(data)).then((data) => {
      if (data.payload?.isError) {
        toast.error(data.payload.message);
      } else {
        toast.success(data.payload?.message || "OTP has sent on email.");
        reset();
        setOtpEmail(data.payload?.email);
        setLoginForm(false);
        setOtpForm(true);
      }
    });
  };

  const handleChangeOtp = (e) => {
    const otpDigit = e.target.value;
    if (!isNaN(otpDigit)) {
      setOtp(otpDigit);
    }
  };

  const handleVerifyOtp = (data) => {
    dispatch(verifyOtp(data)).then((data) => {
      if (data.payload?.isError) {
        toast.error(data.payload.message);
      } else {
        toast.success(data.payload?.message || "User loggedin successfully.");
        reset();
        setOtpEmail("");
        setOtp("");
        dispatch(hideForm());
        setLoginForm(true);
        setOtpForm(false);
        setTimeout(() => {
          dispatch(checkAuth());
        }, 1000);
      }
    });
  };

  const handleRegisterClient = (data) => {
    dispatch(registerClient(data)).then((data) => {
      if (data.payload?.isError) {
        toast.error(data.payload.message);
      } else {
        toast.success(
          data.payload?.message || "Client registered successfully."
        );
        reset();
        setLoginForm(true);
      }
    });
  };
  return (
    <>
      <AnimatePresence>
        <div className="h-screen inset-0 z-50 fixed bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className=" absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[95%] sm:w-1/2 md:w-2/3 lg:w-2/6 bg-gray-200/90 dark:bg-gray-800/90 p-6 rounded-md"
          >
            <div className="flex justify-end relative">
              <X
                onClick={() => {
                  setOtpForm(false);
                  setLoginForm(true);
                  dispatch(hideForm());
                  navigate("/user/home");
                }}
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gray-500/60 p-2 text-xl hover:bg-red-500"
              />
            </div>
            <div className="">
              {/* create client */}
              {loginForm ? (
                <form
                  onSubmit={handleSubmit(handleLoginClient)}
                  className="flex flex-col space-y-3 my-2"
                >
                  <h2 className="text-xl font-semibold text-center underline">
                    Login From
                  </h2>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="text"
                      className={`border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-700 dark:border-gray-200"
                      } outline-none p-2 rounded`}
                      id="email"
                      placeholder="Enter email"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type="password"
                      className={`border ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-700 dark:border-gray-200"
                      } outline-none p-2 rounded`}
                      id="password"
                      placeholder="Enter password"
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-gray-600/80 p-2 rounded font-semibold cursor-pointer hover:bg-gray-600 active:scale-95 transition-transform duration-200 mt-2 flex justify-center outline-none">
                    {isLoading ? (
                      <div className="w-6 h-6 border-3 border-gray-300 border-r-gray-800 rounded-full animate-spin"></div>
                    ) : (
                      "Login"
                    )}
                  </button>
                </form>
              ) : optForm ? (
                <form
                  onSubmit={handleSubmit(handleVerifyOtp)}
                  className="flex flex-col space-y-3 my-2"
                >
                  <h2 className="text-xl font-semibold text-center underline">
                    Verify Your OTP
                  </h2>
                  <div className="flex flex-col space-y-2">
                    <input
                      {...register("email")}
                      type="text"
                      className="hidden"
                      id="email"
                      hidden
                      defaultValue={otpEmail}
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="otp">
                      OTP <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("otp", {
                        required: "OTP is required",
                        minLength: {
                          value: 6,
                          message: "Please enter 6 digit OTP",
                        },
                      })}
                      type="text"
                      className={`border ${
                        errors.otp
                          ? "border-red-500"
                          : "border-gray-700 dark:border-gray-200"
                      } outline-none p-2 rounded`}
                      id="password"
                      maxLength="6"
                      onChange={handleChangeOtp}
                      value={otp}
                      placeholder="Enter OTP"
                    />
                    {errors.otp && (
                      <span className="text-red-500">{errors.otp.message}</span>
                    )}
                  </div>

                  <button className="w-full bg-gray-600/80 p-2 rounded font-semibold cursor-pointer hover:bg-gray-600 active:scale-95 transition-transform duration-200 mt-2 flex justify-center outline-none">
                    {isLoading ? (
                      <div className="w-6 h-6 border-3 border-gray-300 border-r-gray-800 rounded-full animate-spin"></div>
                    ) : (
                      "Verify OTP"
                    )}
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={handleSubmit(handleRegisterClient)}
                  className="flex flex-col space-y-3 my-2"
                >
                  <h2 className="text-xl font-semibold text-center underline">
                    Register From
                  </h2>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="name">
                      Client Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("name", {
                        required: "Name is required",
                      })}
                      type="text"
                      className={`border ${
                        errors.name
                          ? "border-red-500"
                          : "border-gray-700 dark:border-gray-200"
                      } outline-none p-2 rounded`}
                      id="name"
                      placeholder="Enter client name"
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Invalid email address",
                        },
                      })}
                      type="text"
                      className={`border ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-700 dark:border-gray-200"
                      } outline-none p-2 rounded`}
                      id="email"
                      placeholder="Enter email"
                    />
                    {errors.email && (
                      <span className="text-red-500">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <input
                      {...register("password", {
                        required: "Password is required",
                      })}
                      type="password"
                      className={`border ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-700 dark:border-gray-200"
                      } outline-none p-2 rounded`}
                      id="password"
                      placeholder="Enter password"
                    />
                    {errors.password && (
                      <span className="text-red-500">
                        {errors.password.message}
                      </span>
                    )}
                  </div>

                  <button className="w-full bg-gray-600/80 p-2 rounded font-semibold cursor-pointer hover:bg-gray-600 active:scale-95 transition-transform duration-200 mt-2 flex justify-center outline-none">
                    {isLoading ? (
                      <div className="w-6 h-6 border-3 border-gray-300 border-r-gray-800 rounded-full animate-spin"></div>
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
              )}

              {loginForm ? (
                <button
                  onClick={() => {
                    reset();
                    setLoginForm(false);
                  }}
                  className="cursor-pointer"
                >
                  Don't have registe?
                  <span className="font-semibold text-orange-500">
                    {" "}
                    Register
                  </span>
                </button>
              ) : optForm ? (
                ""
              ) : (
                <button
                  onClick={() => {
                    reset();
                    setLoginForm(true);
                  }}
                  className="cursor-pointer"
                >
                  Already have an account?
                  <span className="font-semibold text-orange-500"> Login</span>
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default SubscribeUser;
