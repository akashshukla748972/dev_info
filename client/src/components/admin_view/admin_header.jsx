import { ChevronDown, Search } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchCard, setSearchCard] = useState(false);
  const [isSearchData, setIsSearchData] = useState("");

  const onSearch = (data) => {
    console.log("On Submit", data);
  };

  const handleOnChange = (data) => {
    const searchData = data.target.value;
    setIsSearchData(searchData);
    if (searchData.length > 0) {
      setSearchCard(true);
    } else {
      setSearchCard(false);
    }
  };

  const { admin } = useSelector((state) => state.admin);

  return (
    <div className="flex bg-muted p-4 bg-gray-800 border-b border-gray-700">
      <div className="flex flex-1 justify-between">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-semibold text-gray-200">
            <span className="bg-gray-200 text-gray-800 px-2 font-bold rounded">
              DEV
            </span>
            INFO
          </h2>
          <div className="flex gap-4 items-center relative">
            <form onSubmit={handleSubmit(onSearch)} className="">
              <div className="flex bg-gray-700 opacity-50 p-2 rounded-lg w-82">
                <input
                  {...register("search", { required: true })}
                  type="text"
                  className="bg-transparent flex-1 outline-none mr-2 text-white"
                  placeholder="Search..."
                  onChange={handleOnChange}
                  value={isSearchData}
                />
                <button type="submit">
                  <Search />
                </button>
              </div>
            </form>
            {searchCard && (
              <div className="flex flex-col h-32 top-12 w-full absolute z-20 bg-gray-700 rounded-md text-gray-100 p-2 space-y-2">
                <Link>Web development</Link>
                <Link>App development</Link>
              </div>
            )}
          </div>
        </div>
        <div className=" flex space-x-3">
          <div className="">
            <img
              src={
                admin?.avatar?.url ||
                "https://i.pinimg.com/736x/b8/91/d5/b891d5eda3bfec2997828f410288c4b9.jpg"
              }
              alt="user_logo"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex items-center space-x-2">
            <p className="">{admin?.name}</p>
            <ChevronDown className="opacity-50" />
          </div>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default AdminHeader;
