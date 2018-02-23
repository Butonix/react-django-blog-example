import React, { Component } from "react";

import PostList from "./PostList";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import PostArchiveHtmlStyled from "../../components/reusableComponents/PostArchiveHtmlStyled";
import CategoryHtmlStyled from "../../components/reusableComponents/CategoryHtmlStyled";

import queryString from "query-string";

class FilterPosts extends Component {
  componentDidMount() {
    let { location, history, filterPosts } = this.props;
    if (location.search === "?q=") {
      return history.push("/");
    }
    return filterPosts(queryString.parse(location.search).q);
  }

  componentDidUpdate(prevProps, prevState) {
    let { location, history, filterPosts } = this.props;
    if (prevProps.location.search !== location.search) {
      if (location.search === "?q=") {
        return history.push("/");
      }
      return filterPosts(queryString.parse(location.search).q);
    }
  }

  render() {
    let { isFiltering, err, posts } = this.props.posts_filtered;
    return (
      <div className="container">
        <h1 className="my-4">Filtered Posts</h1>
        <hr />
        {isFiltering ? (
          <LoadingSpinner />
        ) : (
          <div className="row">
            <div className="col-md-8">
              {err ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{err.message}</strong>
                </div>
              ) : null}

              {posts.map(post => <PostList key={post.id} {...post} />)}
            </div>
            <div className="col-md-4">
              <PostArchiveHtmlStyled />
              <CategoryHtmlStyled />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default FilterPosts;
