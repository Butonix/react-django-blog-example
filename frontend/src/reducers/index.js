import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import authReducer from "./authReducer";
import postListReducer from "./postListReducer";
import postDetailReducer from "./postDetailReducer";
import newsletterReducer from "./newsletterReducer";
import profileReducer from "./profileReducer";
import contactFormReducer from "./contactFormReducer";
import filterPostsReducer from "./filterPostsReducer";
import googleInfoReducer from "./googleAuthReducer";
import commentListReducer from "./commentListReducer";
import changePasswordReducer from "./changePasswordReducer";

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  posts: postListReducer,
  post: postDetailReducer,
  newsletter: newsletterReducer,
  user_profile: profileReducer,
  contact_form: contactFormReducer,
  posts_filtered: filterPostsReducer,
  goog_auth: googleInfoReducer,
  comments: commentListReducer,
  change_password: changePasswordReducer
});

export default rootReducer;
