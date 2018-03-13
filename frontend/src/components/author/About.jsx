import React from "react";

import MyPhoto from "./me.png";

const About = () => {
  return (
    <div className="container" style={{ marginTop: "2em" }}>
      <div className="row">
        <div className="col-md-4 text-center">
          <img
            src={MyPhoto}
            alt="avatar_failed"
            style={{
              height: "75%",
              width: "65%"
            }}
            className="mt-2 img-fluid"
          />
        </div>
        <div className="col-md-8">
          <h1 className="cover-heading">Borislav Hadzhiev</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
