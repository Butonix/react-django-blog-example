import URLSearchParams from "url-search-params";

export const url = "http://127.0.0.1:8000";

/*These are the django client ID and SECRET
  from the OauthToolkit Application registered in your django admin
*/
export const django_client_id = "zctuBZc5TnBAJE9X1tu4MT3afKOph8ixkdp2gqyk";
export const django_client_secret =
  "Z9l7541YZY6ZpZ4W2XOxQ9WoVuiHWswmIpFOaql4WU6nsV1oC5bkX9kmyBgu6eiVU8kKfLEQlQJNRnm2kvMGDeI17DKb8rwU00SNqO7dhFbiaWkKwWhOIqFuYp6siiGu";

const isAuthenticating = () => ({
  type: "GOOG_IS_AUTHENTICATING"
});

function convertGoogTokenSuccess(json) {
  console.log("CONVERTGGG", json);
  localStorage.setItem("goog_access_token_conv", json.access_token);
  let expiryDate = Math.round(new Date().getTime() / 1000) + json.expires_in;
  localStorage.setItem("goog_access_token_expires_in", expiryDate);
  localStorage.setItem("goog_refresh_token_conv", json.refresh_token);
  return {
    type: "CONVERT_GOOG_TOKEN_SUCCESS",
    goog_token: json
  };
}

function googleLogoutAction() {
  return function(dispatch) {
    localStorage.removeItem("goog_access_token_conv");
    localStorage.removeItem("goog_access_token_expires_in");
    localStorage.removeItem("goog_avatar_url");
    localStorage.removeItem("goog_name");
    localStorage.removeItem("goog_email");
    localStorage.removeItem("goog_refresh_token_conv");
    dispatch({ type: "GOOGLE_LOGOUT" });
    return Promise.resolve();
  };
}

const convertGoogTokenFailure = err => ({
  type: "CONVERT_GOOG_TOKEN_FAILURE",
  err
});

// the API endpoint expects form-urlencoded-data thus search-params
function convertGoogleToken(access_token) {
  return async function(dispatch) {
    dispatch(isAuthenticating());
    const searchParams = new URLSearchParams();
    searchParams.set("grant_type", "convert_token");
    searchParams.set("client_id", django_client_id);
    searchParams.set("client_secret", django_client_secret);
    searchParams.set("backend", "google-oauth2");
    searchParams.set("token", access_token);
    try {
      let response = await fetch(`${url}/sauth/convert-token/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: searchParams
      });
      if (!response.ok) {
        throw new Error("An Error has occured, please try again.");
      }
      let responseJson = await response.json();
      return dispatch(convertGoogTokenSuccess(responseJson));
    } catch (err) {
      return dispatch(convertGoogTokenFailure(err));
    }
  };
}

export {
  convertGoogleToken,
  googleLogoutAction,
  convertGoogTokenSuccess,
  convertGoogTokenFailure
};
