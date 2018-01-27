import React from "react";
import PropTypes from "prop-types";

const TestTokenRefresh = props => {
	return (
		<div>
			<h1>Refresh here</h1>
			<button onClick={() => props.refreshTokenIfExpiring()}>
				Test Randomly
			</button>
		</div>
	);
};

TestTokenRefresh.propTypes = {
	refreshTokenIfExpiring: PropTypes.func.isRequired
};

export default TestTokenRefresh;
