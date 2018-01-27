import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import postListReducer from "./postListReducer";
import postDetailReducer from "./postDetailReducer";
import newsletterReducer from "./newsletterReducer";
import categoryListReducer from "./categoryListReducer";
import profileReducer from "./profileReducer";
import contactFormReducer from "./contactFormReducer";
import postArchiveReducer from "./postArchiveReducer";
import filterPostsReducer from "./filterPostsReducer";

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	posts: postListReducer,
	post: postDetailReducer,
	newsletter: newsletterReducer,
	category_posts: categoryListReducer,
	user_profile: profileReducer,
	contact_form: contactFormReducer,
	post_archive: postArchiveReducer,
	posts_filtered: filterPostsReducer
});

export default rootReducer;