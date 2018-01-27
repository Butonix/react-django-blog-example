import React from "react";

const renderField = ({
	input,
	label,
	type,
	name,
	htmlFor,
	autoF,
	meta: { touched, error, warning }
}) => (
	<div className="form-group">
		<div className="row">
			<div className="col-sm-2">
				<label htmlFor={htmlFor} className="form-check-label">
					{label}
				</label>
			</div>
			<div className="col-sm-6">
				<input
					id={htmlFor}
					{...input}
					type={type}
					name={name}
					className="form-control"
					autoFocus={autoF ? true : false}
				/>
			</div>
			<div className="col-sm-4">
				{touched &&
					((error && (
						<span className="alert alert-danger" role="alert">
							{error}
						</span>
					)) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	</div>
);

const renderTextArea = ({
	input,
	label,
	type,
	name,
	htmlFor,
	meta: { touched, error, warning }
}) => (
	<div className="form-group">
		<div className="row">
			<div className="col-sm-2">
				<label htmlFor={htmlFor} className="form-check-label">
					{label}
				</label>
			</div>
			<div className="col-sm-6">
				<textarea
					id={htmlFor}
					{...input}
					placeholder="Leave your Message Here..."
					rows="8"
					cols="40"
					className="form-control"
				/>
			</div>
			<div className="col-sm-4">
				{touched &&
					((error && (
						<span className="alert alert-danger" role="alert">
							{error}
						</span>
					)) ||
						(warning && <span>{warning}</span>))}
			</div>
		</div>
	</div>
);

export { renderField, renderTextArea };
