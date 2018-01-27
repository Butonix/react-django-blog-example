import React, { Component } from "react";
import PropTypes from "prop-types";

import PostList from "./PostList";
import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import PostArchiveHtmlStyled from "../../components/reusableComponents/PostArchiveHtmlStyled";
import CategoryHtmlStyled from "../../components/reusableComponents/CategoryHtmlStyled";

class CategoryList extends Component {
	componentDidMount() {
		return this.props.fetchPostsForCategory(
			this.props.match.params.category_type
		);
	}
	componentDidUpdate(prevProps, prevState) {
		// if the previous Url of this component is not equal to the current url
		// meaning the user requested a different instance of the same model
		// fetch the data
		if (prevProps.match.url !== this.props.match.url) {
			return this.props.fetchPostsForCategory(
				this.props.match.params.category_type
			);
		}
	}

	render() {
		let { isFetching, err, posts } = this.props.category_posts;
		let { category_type } = this.props.match.params;
		let category_upper_case =
			category_type.charAt(0).toUpperCase() + category_type.slice(1);

		return (
			<div className="container">
				<h1 className="my-4">Category {category_upper_case}</h1>
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

CategoryList.propTypes = {
	fetchPostsForCategory: PropTypes.func.isRequired,
	category_posts: PropTypes.shape({
		isFetching: PropTypes.bool.isRequired,
		err: PropTypes.objectOf(PropTypes.string),
		posts: PropTypes.array.isRequired
	}),
	match: PropTypes.shape({
		params: PropTypes.objectOf(PropTypes.string.isRequired)
	}).isRequired
};

export default CategoryList;
