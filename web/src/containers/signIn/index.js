import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { useHistory } from "react-router";

import { signIn } from "../../utils/service";
import "../../styles/signIn.css";
import Navbar from "../navbar";

function SignIn() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { push } = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginInfo = { email: email, password: password };
    dispatch(signIn(loginInfo, push));
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={(e) => handleSubmit(e)}>
              <h3>Sign In</h3>
              <div className="form-group mb-4">
                <label>Email address</label>
                <Field
                  name="email"
                  component={renderField}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <Field
                  name="password"
                  component={renderField}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block mt-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) => (
  <div>
    <div className="control">
      <input
        className="input form-control"
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = (val) => {
  const errors = {};
  if (!val.email) {
    errors.email = "Required";
  } else if (!/^.+@.+$/i.test(val.email)) {
    errors.email = "Invalid email address";
  }
  if (!val.password) {
    errors.password = "Required";
  } else if (val.password < 6) {
    errors.password = "Password must be greater than 6 characters";
  }
  return errors;
};

SignIn = reduxForm({
  form: "signIn",
  validate,
})(SignIn);

export default SignIn;
