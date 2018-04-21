import React from "react";
import { Link } from "react-router-dom";
import Paper from "material-ui/Paper";

const PostArchiveHtmlStyled = () => {
  return (
    <Paper elevation={5} style={{ boxShadow: "5px 5px 5px lightgray" }}>
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
                    <b>November 2017</b>
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
                    <b>December 2017</b>
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
                    <b>January 2018</b>
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
                    <b>Febuary 2018</b>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default PostArchiveHtmlStyled;
