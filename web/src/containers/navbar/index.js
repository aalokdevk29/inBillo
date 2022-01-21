import React from "react";
import { Button, Link } from "@material-ui/core";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function Navbar() {
  const history = useHistory();
  const userDetails = useSelector((state) => state.login.userDetails);

  const token = localStorage.getItem("inBillo-session-token");

  const logout = () => {
    localStorage.removeItem("inBillo-session-token");
    Swal.fire({
      icon: "success",
      title: "Logout Successul.",
      type: "Success",
      text: `Logout. Now you can login`,
    });
    history.push("/sign-in");
  };

  const logIn = () => history.push("/sign-in");

  const signUp = () => history.push("/sign-up");

  const transaction = () => history.push("/transactions");

  const dashboard = () => history.push("/");

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center col-md-12">
          <div className="d-flex">
            <Link className="navbar-brand" onClick={dashboard} to={"/"}>
              InBillo
            </Link>
            {token && (
              <Link
                className="nav-link color-black"
                onClick={transaction}
                to={"/transactions"}
              >
                Your today's transactions log
              </Link>
            )}
          </div>
          <div
            className="collapse navbar-collapse flex-grow-0"
            id="navbarTogglerDemo02"
          >
            <ul className="navbar-nav ml-auto align-items-center">
              {token ? (
                <>
                  <p className="m-1 font-weight-bold">
                    {userDetails && userDetails.firstName}{" "}
                    {userDetails && userDetails.lastName}
                  </p>
                  <Button onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link className="nav-link" onClick={logIn} to={"/sign-in"}>
                    Login
                  </Link>
                  <Link className="nav-link" onClick={signUp} to={"/sign-up"}>
                    Sign up
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
