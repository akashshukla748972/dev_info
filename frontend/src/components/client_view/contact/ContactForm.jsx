import React from "react";

const ContactForm = ({
  register,
  handleSubmit,
  errors,
  isValid,
  handleContactForm,
}) => {
  return (
    <form
      onSubmit={handleSubmit(handleContactForm)}
      className="space-y-4 text-gray-800 dark:text-gray-200"
    >
      {/* Contact Information Section */}
      <div className="flex flex-col space-y-2">
        <h2 className="font-semibold text-xl">Contact Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              className={`px-4 py-3 rounded  ${
                errors.name
                  ? "border border-red-500"
                  : "bg-gray-300 dark:bg-gray-700"
              } outline-none`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <span className="text-red-500 text-xs mt-1">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="text"
              className={`px-4 py-3 rounded  ${
                errors.email
                  ? "border border-red-500"
                  : "bg-gray-300 dark:bg-gray-700"
              } outline-none`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Phone Number</label>
            <input
              {...register("phone")}
              type="number"
              className="px-4 py-3 rounded bg-gray-300 dark:bg-gray-700 outline-none"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="text-sm font-medium">Company/Organization</label>
            <input
              {...register("organization")}
              type="text"
              className="px-4 py-3 rounded bg-gray-300 dark:bg-gray-700 outline-none"
              placeholder="Company name"
            />
          </div>
        </div>
      </div>

      {/* Website Type Section */}
      <div className="flex flex-col space-y-2">
        <h2 className="font-semibold text-xl">Website Requirements</h2>

        <label className="text-sm font-medium">
          Website Type <span className="text-red-500">*</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            "Business Website",
            "E-commerce Store",
            "Portfolio",
            "Blog",
            "Landing Page",
            "Other",
          ].map((type) => (
            <div
              key={type}
              className="flex items-center space-x-2 border px-4 py-3 rounded"
            >
              <input
                {...register("websiteType", {
                  required: "Website type is required",
                })}
                type="radio"
                value={type}
              />
              <span>{type}</span>
            </div>
          ))}
        </div>

        {errors.websiteType && (
          <span className="text-red-500 text-xs mt-1 border px-4 py-3 rounded">
            {errors.websiteType.message}
          </span>
        )}
      </div>

      {/* Budget Section */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">
          Budget Range <span className="text-red-500">*</span>
        </label>
        <select
          {...register("budget", { required: "Budget is required" })}
          className="px-4 py-3 rounded bg-gray-300 dark:bg-gray-700 outline-none"
        >
          <option value="">Select Budget Range</option>
          <option value="2000-5000">2000 - 5000</option>
          <option value="5000-10000">5000 - 10000</option>
          <option value="10000-15000">10000 - 15000</option>
          <option value="15000-20000">15000 - 20000</option>
          <option value="20000-50000">20000 - 50000</option>
        </select>
        {errors.budget && (
          <span className="text-red-500 text-xs mt-1">
            {errors.budget.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex justify-end mt-10 mb-4">
        <button
          className={`flex-1 justify-end bg-orange-500 px-10 py-2 rounded text-white hover:bg-orange-600 transition ${
            !isValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={!isValid}
        >
          Submit Website Request
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
