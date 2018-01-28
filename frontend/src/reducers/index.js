import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import authReducer from "./authReducer";
import postListReducer from "./postListReducer";
import postDetailReducer from "./postDetailReducer";
import newsletterReducer from "./newsletterReducer";
import categoryListReducer from "./categoryListReducer";
import profileReducer from "./profileReducer";
import contactFormReducer from "./contactFormReducer";
import postArchiveReducer from "./postArchiveReducer";
import filterPostsReducer from "./filterPostsReducer";
import googleInfoReducer from "./googleAuthReducer";
import fetchCreatecommentReducer from "./fetchCreateCommentReducer";
//Auth testing purposes
import dogReducer from "./dogReducer";

const rootReducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  posts: postListReducer,
  post: postDetailReducer,
  newsletter: newsletterReducer,
  category_posts: categoryListReducer,
  user_profile: profileReducer,
  contact_form: contactFormReducer,
  post_archive: postArchiveReducer,
  posts_filtered: filterPostsReducer,
  goog_auth: googleInfoReducer,
  comments: fetchCreatecommentReducer,
  //testing purposes
  dogs: dogReducer
});

export default rootReducer;
