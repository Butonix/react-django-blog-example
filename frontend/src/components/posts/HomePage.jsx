import React, { Component } from "react";
import queryString from "query-string";

import PostList from "./PostList";
import NewsLetter from "../../containers/posts/NewsLetterContainer";
import PostArchiveHtmlStyled from "../../components/reusableComponents/PostArchiveHtmlStyled";
import CategoryHtmlStyled from "../../components/reusableComponents/CategoryHtmlStyled";

class HomePage extends Component {
  componentDidMount() {
    window.addEventListener("scroll", this.onScroll, false);
    return this.props.fetchPosts();
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
    return this.props.clearPosts();
  }

  /*
  window.innerHeight = height in pixels of the browser window viewport
  window.scrollY = number of pixels that the document is currently scrolled vertically
  document.body.offsetHeight = the height of the element including padding,borders (largest in Px)
  */
  onScroll = () => {
    let { snippets, isFetching } = this.props.posts;
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      snippets.results.length &&
      !isFetching
    ) {
      if (snippets.next !== null && snippets.results.length <= snippets.count) {
        const indexOfQuery = snippets.next.indexOf("?");
        const queryParsed = queryString.parse(
          snippets.next.substring(indexOfQuery)
        ).page;
        let currentPosition =
          document.documentElement.scrollTop || document.body.scrollTop;
        this.props
          .fetchPosts(queryParsed)
          .then(
            () =>
              (document.documentElement.scrollTop = document.body.scrollTop = currentPosition)
          );
      }
    }
  };

  render() {
    let { isFetching, err, snippets } = this.props.posts;
    let { message } = this.props.auth;
    return (
      <div className="container">
        {message && (
          <div className="alert alert-info mt-4" role="alert">
            <strong>{message}</strong>
          </div>
        )}
        <h1 className="my-4">Recent Posts</h1>
        <hr />
        {isFetching ? (
          <div className="loading" />
        ) : (
          <div className="row">
            <div className="col-12 col-sm-12 col-lg-8">
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
            <div className="col-12 col-sm-12 col-lg-4">
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
