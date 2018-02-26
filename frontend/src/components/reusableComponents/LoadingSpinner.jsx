import React from "react";

const LoadingSpinner = () => {
	return (
		<div className="row">
			<div className="col-md-8">
				<img
					src="https://loading.io/spinners/stripe/index.svg"
					alt="spinner here"
					className="mx-auto d-block"
				/>
			</div>
		</div>
	);
};

export default LoadingSpinner;
