import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";

// COMMENTS
import CommentList from "../../containers/Comments/CommentListContainer.js";

class PostDetail extends Component {
  componentDidMount() {
    let { match, fetchPostSlug } = this.props;
    return fetchPostSlug(match.params.slug);
  }

  componentDidUpdate(prevProps, prevState) {
    let { post, history } = this.props;
    if (prevProps.post.snippet.result.slug !== post.snippet.result.slug) {
      history.push(`/${post.snippet.result.slug}`);
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
                <i className="fas fa-angle-left fa-5x" aria-hidden="true" />
              </span>
            )}

            {result.id <= total_post_count - 1 && (
              <span
                className="pagination-right"
                onClick={() => this.props.fetchPostPk(result.id + 1)}
              >
                <i className="fas fa-angle-right fa-5x" aria-hidden="true" />
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
                      style={{ width: "100%" }}
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
