import React, { Component } from "react";
import PropTypes from "prop-types";

import LoadingSpinner from "../reusableComponents/LoadingSpinner";
import MyPhoto from "./me.png";

class About extends Component {
	componentDidMount() {
		this.props.fetchProfileData(this.props.match.params.username);
	}
	render() {
		let { isFetching, err, userData } = this.props.user_profile;
		return (
			<div className="site-wrapper">
				<div className="site-wrapper-inner">
					<div className="cover-container">
						<div className="inner cover">
							{isFetching ? (
								<LoadingSpinner />
							) : err ? (
								<h2 className="text-center mt-3">
									{err.message}
								</h2>
							) : (
								<span>
									<span className="row mt-3">
										<span className="col-sm-4 text-center">
											<img
												src={MyPhoto}
												alt="avatar_failed"
												style={{
													height: "75%",
													width: "65%"
												}}
												className="img-thumbnail mt-2"
											/>
										</span>
										<span className="col-sm-8">
											<h1 className="cover-heading">
												{userData.full_name}
											</h1>
											<p className="lead">
												{userData.bio}
											</p>
										</span>
									</span>
								</span>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

About.propTypes = {
	fetchProfileData: PropTypes.func.isRequired,
	user_profile: PropTypes.shape({
		isFetching: PropTypes.bool.isRequired,
		err: PropTypes.objectOf(PropTypes.bool),
		userData: PropTypes.shape({
			avatar: PropTypes.string,
			bio: PropTypes.string,
			full_name: PropTypes.string,
			id: PropTypes.number,
			location: PropTypes.string,
			slug: PropTypes.string
		})
	})
};

export default About;
