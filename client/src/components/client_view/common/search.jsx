import { Search } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const SearchComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="flex flex-wrap items-center justify-around space-x-3 space-y-3 lg:space-x-6 lg:space-y-6">
          <NavLink className="px-4 lg:px-10 py-2 lg:py-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 font-semibold">
            All
          </NavLink>
          <NavLink className="px-4 lg:px-10 py-2 lg:py-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 font-semibold">
            Letest
          </NavLink>
          <NavLink className="px-4 lg:px-10 py-2 lg:py-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 font-semibold">
            Popular
          </NavLink>
          <NavLink className="px-4 lg:px-10 py-2 lg:py-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 font-semibold">
            Portfolio
          </NavLink>
          <NavLink className="px-4 lg:px-10 py-2 lg:py-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 font-semibold">
            Business
          </NavLink>
          <NavLink className="px-4 lg:px-10 py-2 lg:py-3 rounded-3xl w-fit bg-gray-100 dark:bg-gray-800 font-semibold">
            E-Commerce
          </NavLink>
        </div>
      </div>
      <div className="">
        <form action="">
          <div className="flex relative justify-between pl-6 pr-2 py-1 items-center rounded-full border space-x-4 max-w-xl md:min-w-3xl lg:min-w-5xl">
            <div className="flex space-x-4 items-center">
              <span className="">
                <Search />
              </span>
              <input
                type="text"
                className="border-none outline-none"
                placeholder="Search project by name"
              />
            </div>
            <button className="px-6 py-3 bg-gray-800 text-gray-200 dark:bg-gray-200 dark:text-gray-800 rounded-full">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchComponent;
