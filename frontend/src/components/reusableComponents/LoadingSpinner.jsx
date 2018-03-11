import React from "react";
import LoadingImage from "../icons/LoadingImage.gif";

const LoadingSpinner = () => {
  return (
    <div className="row">
      <div className="col-md-8">
        <img
          src={LoadingImage}
          alt="spinner here"
          className="mx-auto d-block"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
