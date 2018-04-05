import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";

const PostList = ({
  author,
  content_home_page,
  posted_on,
  slug,
  title,
  updated_on,
  category,
  image_home_page
}) => {
  let posted_date = new Date(posted_on);
  let updated_date = new Date(updated_on);
  let category_upper_case =
    category.charAt(0).toUpperCase() + category.slice(1);
  const createMarkup = content => ({ __html: content });
  return (
    <Paper elevation={5}>
      <div className="card mb-4">
        <img
          className="card-img-top img-fluid"
          src={image_home_page}
          alt="home page avatar"
        />
        <div className="card-body px-3 py-3 text-justify">
          <h2 className="card-title">{title}</h2>
          <p
            className="card-text"
            dangerouslySetInnerHTML={createMarkup(content_home_page)}
          />
          <Link to={`/${slug}`} style={{ textDecoration: "none" }}>
            <Button raised color="primary">
              <b>Read More &rarr;</b>
            </Button>
          </Link>
        </div>
        <div className="card-footer text-muted">
          {updated_date > posted_date ? (
            <span>
              Last Updated <b>{moment(updated_date).fromNow()} </b>
            </span>
          ) : (
            <span>
              Posted <b>{moment(posted_date).fromNow()} </b>
            </span>
          )}
          <span>
            in{" "}
            <Link
              to={{
                pathname: "/posts/",
                search: `?q=${category}`
              }}
            >
              {category_upper_case}
            </Link>{" "}
            by <Link to={`/about/`}>{author}</Link>
          </span>
        </div>
      </div>
    </Paper>
  );
};

export default PostList;
