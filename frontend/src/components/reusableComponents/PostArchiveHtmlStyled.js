import React from "react";
import { Link } from "react-router-dom";

const PostArchiveHtmlStyled = () => {
  return (
    <div className="card my-4">
      <h5 className="card-header">Archives</h5>
      <div className="card-body">
        <div className="row">
          <div className="col-lg-6 py-3">
            <ul className="list-unstyled mb-0">
              <li className="text-center">
                <Link
                  to={{
                    pathname: "/posts/",
                    search: `?q=2017-11`
                  }}
                >
                  November 2017
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
                    search: `?q=2017-12`
                  }}
                >
                  December 2017
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 py-3">
            <ul className="list-unstyled mb-0">
              <li className="text-center">
                <Link
                  to={{
                    pathname: "/posts/",
                    search: `?q=2018-01`
                  }}
                >
                  January 2018
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
                    search: `?q=2018-02`
                  }}
                >
                  Febuary 2018
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostArchiveHtmlStyled;
