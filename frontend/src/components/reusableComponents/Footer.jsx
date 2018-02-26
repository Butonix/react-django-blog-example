import React from "react";

const Footer = () => {
  return (
    <span>
      <span style={{ clear: "both" }} />
      <footer
        className="py-3 mb-0 mt-5 bg-inverse"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "60px"
        }}
      >
        <div className="container">
          <p className="m-0 text-center text-white">
            Copyright &copy; Your Website 2018
          </p>
        </div>
      </footer>
    </span>
  );
};

export default Footer;
