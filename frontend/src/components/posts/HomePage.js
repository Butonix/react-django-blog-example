import React, { Component } from "react";
import PropTypes from "prop-types";

import PostList from "./PostList";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import NewsLetter from "../../containers/posts/NewsLetterContainer";
import PostArchiveHtmlStyled from "../../components/reusableComponents/PostArchiveHtmlStyled";
import CategoryHtmlStyled from "../../components/reusableComponents/CategoryHtmlStyled";

class HomePage extends Component {
	componentDidMount() {
		return this.props.fetchPosts();
	}

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
								<div
									className="alert alert-danger"
									role="alert"
								>
									<strong>{err.message}</strong>
								</div>
							) : (
								snippets.map(post => (
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

HomePage.propTypes = {
	fetchPosts: PropTypes.func.isRequired,
	posts: PropTypes.shape({
		isFetching: PropTypes.bool.isRequired,
		err: PropTypes.objectOf(PropTypes.string),
		snippets: PropTypes.array.isRequired
	})
};

export default HomePage;
