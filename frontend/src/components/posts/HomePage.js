import React, { Component } from "react";
import queryString from "query-string";

import PostList from "./PostList";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import NewsLetter from "../../containers/posts/NewsLetterContainer";
import PostArchiveHtmlStyled from "../../components/reusableComponents/PostArchiveHtmlStyled";
import CategoryHtmlStyled from "../../components/reusableComponents/CategoryHtmlStyled";

import throttle from "lodash.throttle";

class HomePage extends Component {
  componentDidMount() {
    window.addEventListener("scroll", throttle(this.onScroll, 16), false);
    return this.props.fetchPosts();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      this.props.posts.snippets.results.length &&
      !this.props.posts.isFetching
    ) {
      if (this.props.posts.snippets.next !== null) {
        const indexOfQuery = this.props.posts.snippets.next.indexOf("?");
        const queryParsed = queryString.parse(
          this.props.posts.snippets.next.substring(indexOfQuery)
        ).page;
        this.props.fetchPosts(queryParsed);
      }
    }
  };
  // loadMorePosts = () => {
  //   if (this.props.posts.snippets.next !== null) {
  //     const indexOfQuery = this.props.posts.snippets.next.indexOf("?");
  //     const queryParsed = queryString.parse(
  //       this.props.posts.snippets.next.substring(indexOfQuery)
  //     ).page;
  //     this.props.fetchPosts(queryParsed);
  //   }
  // };

  render() {
    let { isFetching, err, snippets } = this.props.posts;

    return (
      <div className="container">
        <h1 className="my-4">Recent Posts</h1>
        <hr />
        {isFetching ? (
          <LoadingSpinner />
        ) : (
          <div className="row">
            <div className="col-md-8">
              {err ? (
                <div className="alert alert-danger" role="alert">
                  <strong>{err.message}</strong>
                </div>
              ) : (
                snippets.results.map(post => (
                  <PostList key={post.id} {...post} />
                ))
              )}
            </div>
            <div className="col-md-4">
              <NewsLetter />
              <PostArchiveHtmlStyled />
              <CategoryHtmlStyled />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default HomePage;
