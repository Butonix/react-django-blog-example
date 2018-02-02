import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import PostArchiveHtmlStyled from "../../components/reusableComponents/PostArchiveHtmlStyled";
import CategoryHtmlStyled from "../../components/reusableComponents/CategoryHtmlStyled";

// COMMENTS
import CommentList from "../../containers/Comments/CommentListContainer.js";

class PostDetail extends Component {
  componentDidMount() {
    return this.props.fetchPostSlug(this.props.match.params.slug);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.post.snippet.result.slug !== this.props.post.snippet.result.slug
    ) {
      this.props.history.push(`/${this.props.post.snippet.result.slug}`);
    }
  }

  createMarkup = content => ({ __html: content });
  render() {
    let { err, isFetching } = this.props.post;
    let { result, total_post_count } = this.props.post.snippet;

    let updated_date = new Date(result.updated_on);
    let posted_date = new Date(result.posted_on);
    let category_upper_case =
      result.category &&
      result.category.charAt(0).toUpperCase() + result.category.slice(1);
    return (
      <div className="container mt-4">
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <div>
            <h1>{result.title}</h1>

            {result.id >= 2 && (
              <span
                className="pagination-left"
                onClick={() => this.props.fetchPostPk(result.id - 1)}
              >
                <i className="fa fa-chevron-left fa-5x" aria-hidden="true" />
              </span>
            )}

            {result.id <= total_post_count - 1 && (
              <span
                className="pagination-right"
                onClick={() => this.props.fetchPostPk(result.id + 1)}
              >
                <i className="fa fa-chevron-right fa-5x" aria-hidden="true" />
              </span>
            )}

            <hr />
            <div className="row">
              <div className="col-md-12">
                {err ? (
                  <div className="alert alert-danger" role="alert">
                    <strong>{err.message}</strong>
                  </div>
                ) : (
                  <span>
                    <p>
                      {updated_date > posted_date ? (
                        <span>
                          {" "}
                          Last Updated <b>{moment(updated_date).fromNow()} </b>
                        </span>
                      ) : (
                        <span>
                          {" "}
                          Posted <b>{moment(posted_date).fromNow()} </b>
                        </span>
                      )}
                      <span>
                        {" "}
                        in{" "}
                        <Link
                          to={{
                            pathname: "/posts/",
                            search: `?q=${result.category}`
                          }}
                        >
                          {category_upper_case}
                        </Link>{" "}
                        by <Link to={`about`}>{result.author}</Link>
                      </span>
                    </p>

                    <hr />

                    <img
                      className="img-fluid rounded"
                      src={result.image_home_page}
                      alt=""
                    />

                    <hr />
                    {/* CONTENT HERE */}
                    <span
                      dangerouslySetInnerHTML={this.createMarkup(
                        result.content
                      )}
                    />

                    <hr />
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
        {!err && <CommentList postId={result.id} />}
      </div>
    );
  }
}

PostDetail.propTypes = {
  fetchPostSlug: PropTypes.func.isRequired,
  fetchPostPk: PropTypes.func.isRequired,
  post: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    err: PropTypes.objectOf(PropTypes.string),
    snippet: PropTypes.object.isRequired
  }).isRequired
};

export default PostDetail;
