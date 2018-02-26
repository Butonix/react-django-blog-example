import React from "react";
import { Link } from "react-router-dom";

const CategoryHtmlStyled = () => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Categories</h5>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6 py-3">
            <ul className="list-unstyled mb-0">
              <li className="text-center">
                <Link
                  to={{
                    pathname: "/posts/",
                    search: `?q=python`
                  }}
                >
                  Python
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-6 py-3">
            <ul className="list-unstyled mb-0">
              <li className="text-center">
                <Link
                  to={{
                    pathname: "/posts/",
                    search: `?q=javascript`
                  }}
                >
                  Javascript
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHtmlStyled;
