import React from "react";
import moment from "moment";

import "./detail-styles.css";
import Form from "./Form";
import EditForm from "./EditForm";
//import CommentReply from "../../containers/Comments/CommentReplyContainer.js";

class CommentDetail extends React.Component {
  constructor(props) {
    super(props);
    this.toggleTextForm = this.toggleTextForm.bind(this);
    this.toggleEditForm = this.toggleEditForm.bind(this);
  }
  state = {
    toggleTextForm: false,
    toggleEditForm: false
  };

  toggleTextForm() {
    return this.setState({ toggleTextForm: !this.state.toggleTextForm });
  }

  toggleEditForm() {
    return this.setState({ toggleEditForm: !this.state.toggleEditForm });
  }

  deleteCommentAndFetch(commentId) {
    this.props.deleteComment(commentId).then(() => this.props.fetchComments());
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-sm-8">
            <div className="panel panel-white post panel-shadow">
              <div className="post-heading">
                <div className="pull-left image">
                  <img
                    src="http://bootdey.com/img/Content/user_1.jpg"
                    className="img-circle avatar"
                    alt="fuck off alt"
                  />
                </div>
                <div className="pull-left meta">
                  <div className="title h5">
                    <span>
                      <b>{this.props.user} </b>
                    </span>
                    made a post.
                  </div>
                  <h6 className="text-muted time">
                    {moment(this.props.posted_on).fromNow()}
                  </h6>
                </div>
              </div>
              <div className="post-description">
                <p>{this.props.text}</p>
              </div>
              <button
                onClick={() =>
                  this.setState({ toggleTextForm: !this.state.toggleTextForm })
                }
              >
                <i className="fa fa-reply" aria-hidden="true" title="Reply" />
              </button>
              <span
                style={{
                  display:
                    this.props.current_user === this.props.user
                      ? "inline-block"
                      : "none"
                }}
              >
                <button
                  onClick={() => this.deleteCommentAndFetch(this.props.id)}
                >
                  <i className="fa fa-trash" aria-hidden="true" />Delete
                </button>
                <button onClick={() => this.toggleEditForm()}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true" />
                  Edit
                </button>
                <span
                  style={{
                    display: this.state.toggleEditForm ? "block" : "none"
                  }}
                >
                  <EditForm
                    prevText={this.props.text}
                    fetchComments={this.props.fetchComments}
                    editComment={this.props.editComment}
                    commentId={this.props.id}
                    toggleEditForm={this.toggleEditForm}
                    editFormState={this.state.toggleEditForm}
                  />
                </span>
              </span>
            </div>
            <span
              style={{ display: this.state.toggleTextForm ? "block" : "none" }}
            >
              <Form
                fetchComments={this.props.fetchComments}
                createCommentReply={this.props.createCommentReply}
                commentId={this.props.id}
                toggleTextForm={this.toggleTextForm}
                isAuthenticatedGoogle={this.props.isAuthenticatedGoogle}
                textFormState={this.state.toggleTextForm}
              />
            </span>
          </div>
        </div>
      </div>
      // {this.props.comment_replies &&
      //   this.props.comment_replies.map(reply => {
      //     return (
      //       <CommentReply
      //         key={reply.id}
      //         {...reply}
      //         commentId={this.props.id}
      //         current_user={this.props.current_user}
      //       />
      //     );
      //   })}
    );
  }
}

export default CommentDetail;