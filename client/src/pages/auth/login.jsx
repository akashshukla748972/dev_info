import { User } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginUser = (data) => {
    console.log(data);
  };
  return (
    <main className="p-6 shadow shadow-gray-500 w-1/3 rounded-xl">
      <div className="flex flex-col justify-center items-center mb-4">
        {/* <User size={32} /> */}
        <h2 className="text-center text-xl font-semibold">Admin Login</h2>
      </div>
      <form
        onSubmit={handleSubmit(handleLoginUser)}
        className="flex flex-col space-y-4"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="">Email</label>
          <input
            {...register("email", { required: "Email is required." })}
            type="text"
            className={`p-2 outline-none border rounded ${
              errors.email ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="Enter email here..."
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="">Password</label>
          <input
            {...register("password", { required: "Password is required." })}
            type="text"
            className={`p-2 outline-none border rounded ${
              errors.password ? "border-red-500" : "border-gray-500"
            }`}
            placeholder="Enter password here..."
          />
        </div>

        <div className="flex flex-col space-y-1">
          <button
            className="bg-gray-500 w-full p-2 font-semibold rounded"
            type="submit"
          >
            Log In
          </button>

          <Link to={"/auth/register"} className="text-center">
            {" "}
            Don't have account?{" "}
            <span className="font-semibold hover:underline hover:text-blue-500">
              {" "}
              Register
            </span>
          </Link>
        </div>
      </form>
    </main>
  );
};

export default Login;
