import React, { Component } from "react";
import PropTypes from "prop-types";

import PostList from "./PostList";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import PostArchiveHtmlStyled from "../../components/reusableComponents/PostArchiveHtmlStyled";
import CategoryHtmlStyled from "../../components/reusableComponents/CategoryHtmlStyled";

class PostArchive extends Component {
	componentDidMount() {
		return this.props.fetchPostsForArchive(
			this.props.match.params.archive_date
		);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.url !== this.props.match.url) {
			return this.props.fetchPostsForArchive(
				this.props.match.params.archive_date
			);
		}
	}

	render() {
		let { isFetching, err, posts } = this.props.post_archive;

		return (
			<div className="container">
				<h1 className="my-4">
					Archive {this.props.match.params.archive_date}
				</h1>
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
								posts.map(post => (
									<PostList key={post.id} {...post} />
								))
							)}
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

PostArchive.propTypes = {
	fetchPostsForArchive: PropTypes.func.isRequired,
	post_archive: PropTypes.shape({
		isFetching: PropTypes.bool.isRequired,
		err: PropTypes.objectOf(PropTypes.string),
		posts: PropTypes.array.isRequired
	}).isRequired,
	match: PropTypes.shape({
		params: PropTypes.objectOf(PropTypes.string.isRequired)
	}).isRequired
};

export default PostArchive;
