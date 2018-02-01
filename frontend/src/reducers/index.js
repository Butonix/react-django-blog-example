import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import authReducer from "./authReducer";
import postListReducer from "./postListReducer";
import postDetailReducer from "./postDetailReducer";
import newsletterReducer from "./newsletterReducer";
import profileReducer from "./profileReducer";
import contactFormReducer from "./contactFormReducer";
import postArchiveReducer from "./postArchiveReducer";
import filterPostsReducer from "./filterPostsReducer";
import googleInfoReducer from "./googleAuthReducer";
import commentListReducer from "./commentListReducer";
import changePasswordReducer from "./changePasswordReducer";
//Auth testing purposes
import dogReducer from "./dogReducer";

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  posts: postListReducer,
  post: postDetailReducer,
  newsletter: newsletterReducer,
  user_profile: profileReducer,
  contact_form: contactFormReducer,
  post_archive: postArchiveReducer,
  posts_filtered: filterPostsReducer,
  goog_auth: googleInfoReducer,
  comments: commentListReducer,
  change_password: changePasswordReducer,
  //testing purposes
  dogs: dogReducer
});

export default rootReducer;
