import React from "react";
import GoogleLogin from "react-google-login";

const GoogleAuth = () => {
  const responseGoogle = (response) => {
    console.log(response);
    console.log(response.profileObj);
  };

  return (
    <GoogleLogin
      // Replace clientId with your own Google OAuth client ID
      clientId="YOUR_CLIENT_ID"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuth;
