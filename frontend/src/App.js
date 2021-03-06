import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import HomePage from "./containers/posts/HomePageContainer";
import PostDetail from "./containers/posts/PostDetailContainer";
import FilterPosts from "./containers/posts/FilterPostsContainer";
import AutocompletePost from "./containers/posts/AutocompletePostContainer";
import About from "./components/author/About";
import EditProfile from "./containers/userProfile/EditProfileContainer";
import Contact from "./containers/ContactContainer";
import ScrollToTopRoute from "./components/reusableComponents/ScrollToTopRoute";
import ScrollToTop from "react-scroll-up";
import Register from "./containers/authentication/RegisterContainer";
import VerifyEmail from "./containers/authentication/VerifyEmailContainer";
import RequestPasswordReset from "./containers/authentication/RequestPasswordResetContainer";
import PasswordResetConfirm from "./containers/authentication/PasswordResetConfirmContainer.js";
import Login from "./containers/authentication/LoginContainer";
import ChangePassword from "./containers/authentication/ChangePasswordContainer";
import NavBar from "./containers/NavBarContainer";
import Footer from "./components/reusableComponents/Footer";
import Http404Page from "./components/reusableComponents/Http404Page";
import {
  PrivateRoute,
  AuthenticatedRoute
} from "./customRoutes/ProtectedRoutes";

import UpScroller from "./components/icons/upscroller1.png";

class App extends Component {
  render() {
    const spinner = document.getElementById("spinner");

    if (spinner && !spinner.hasAttribute("hidden")) {
      spinner.setAttribute("hidden", "true");
    }
    return (
      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          overflowY: "auto",
          overflowX: "hidden"
        }}
      >
        <div style={{ paddingBottom: "95px" }}>
          <NavBar />
          <ScrollToTopRoute>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/signout" render={() => <Redirect to="/" />} />
              <AuthenticatedRoute exact path="/register" component={Register} />
              <AuthenticatedRoute exact path="/login" component={Login} />
              <PrivateRoute path="/changepassword" component={ChangePassword} />
              <Route exact path="/reset" component={RequestPasswordReset} />
              <Route
                exact
                path="/reset/:uid/:token"
                component={PasswordResetConfirm}
              />
              <Route exact path="/profile" component={EditProfile} />
              <Route exact path="/about" component={About} />
              <Route exact path="/contact" component={Contact} />
              <Route exact path="/browse" component={AutocompletePost} />
              <Route exact path="/verify-email/:key" component={VerifyEmail} />
              <Route path="/posts/*" component={FilterPosts} />
              <Route exact path="/:slug" component={PostDetail} />
              <Route path="*" component={Http404Page} />
            </Switch>
          </ScrollToTopRoute>
          <ScrollToTop
            showUnder={160}
            style={{
              position: "fixed",
              bottom: 70,
              right: 10,
              cursor: "pointer",
              transitionDuration: "0.7s",
              transitionTimingFunction: "linear",
              transitionDelay: "0s"
            }}
          >
            <span className="upscroller">
              <img src={UpScroller} alt="upscroller-failed-load" />
            </span>
          </ScrollToTop>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
