import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { history } from "./store";

import { store } from "./store";
import HomePage from "./containers/posts/HomePageContainer";
import PostDetail from "./containers/posts/PostDetailContainer";
import CategoryList from "./containers/posts/CategoryListContainer";
import FilterPosts from "./containers/posts/FilterPostsContainer";
import About from "./containers/author/AboutContainer";
import EditProfile from "./containers/userProfile/EditProfileContainer";
import Contact from "./containers/ContactContainer";
import ScrollToTop from "./components/reusableComponents/ScrollToTop";
import Register from "./containers/authentication/RegisterContainer";
import Login from "./containers/authentication/LoginContainer";
import ChangePassword from "./containers/authentication/ChangePasswordContainer";
import NavBar from "./containers/NavBarContainer";
import Http404Page from "./components/reusableComponents/Http404Page";
import {
  PrivateRoute,
  AuthenticatedRoute
} from "./customRoutes/ProtectedRoutes";

//testing purposes
import DogList from "./containers/Secret/DogListContainer.js";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <NavBar />
        <ScrollToTop>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <PrivateRoute exact path="/secret" component={DogList} />
            <Route exact path="/signout" render={() => <Redirect to="/" />} />
            <AuthenticatedRoute exact path="/register" component={Register} />
            <AuthenticatedRoute exact path="/login" component={Login} />
            <PrivateRoute path="/changepassword" component={ChangePassword} />
            <Route
              exact
              path="/category/:category_type"
              component={CategoryList}
            />
            <Route exact path="/profile" component={EditProfile} />
            <Route exact path="/about" component={About} />
            <Route exact path="/contact" component={Contact} />
            <Route path="/posts/*" component={FilterPosts} />
            <Route exact path="/:slug" component={PostDetail} />
            <Route path="*" component={Http404Page} />
          </Switch>
        </ScrollToTop>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
