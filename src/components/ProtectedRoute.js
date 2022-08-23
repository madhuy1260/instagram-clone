import Cookies from "js-cookie";
import React from "react";
import { Route } from "react-router-dom";

function ProtectedRoute(props) {
  const token = Cookies.get("JWT_Token");
  return <div>{token && <Route {...props} />}</div>;
}

export default ProtectedRoute;
