import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import CommentList from "../../containers/Comments/CommentListContainer.js";

import AngleLeft from "../icons/arrow-left.png";
import AngleRight from "../icons/arrow-right.png";

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
          <div className="loading" />
        ) : (
          <div>
            <h1 className="text-center">{result.title}</h1>

            {result.id >= 2 && (
              <span
                className="pagination-left"
                onClick={() => this.props.fetchPostPk(result.id - 1)}
              >
                <img src={AngleLeft} alt="left-arr-failed" />
              </span>
            )}

            {result.id <= total_post_count - 1 && (
              <span
                className="pagination-right"
                onClick={() => this.props.fetchPostPk(result.id + 1)}
              >
                <img src={AngleRight} alt="right-arr-failed" />
              </span>
            )}

            <hr />
            <div className="row">
              <div className="col-md-10">
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

                    {/* Image here */}

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
        {!err && !isFetching && <CommentList postId={result.id} />}
      </div>
    );
  }
}

export default PostDetail;
