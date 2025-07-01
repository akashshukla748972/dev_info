import { Home } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const PageHeading = ({ pageTitle, routes }) => {
  return (
    <div className="flex justify-between">
      <h2 className="text-2xl font-semibold">{pageTitle}</h2>
      <p className="flex items-center space-x-2">
        <Link to="/admin/dashboard" className="flex items-center">
          <Home size={16} />
        </Link>
        <Link>{routes}</Link>
      </p>
    </div>
  );
};

export default PageHeading;
