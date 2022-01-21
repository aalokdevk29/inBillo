import { connect } from "react-redux";
import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

import { signup } from "../../utils/service";
import Navbar from "../navbar";

function SignUpForm({ handleSubmit }) {
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={handleSubmit}>
              <h3>Sign Up</h3>

              <div className="form-group mb-4">
                <label>First name</label>
                <Field name="firstName" component={renderField} type="text" />
              </div>

              <div className="form-group mb-4">
                <label>Last name</label>
                <Field name="lastName" component={renderField} type="text" />
              </div>

              <div className="form-group mb-4">
                <label>Email address</label>
                <Field name="email" component={renderField} type="email" />
              </div>

              <div className="form-group mb-4">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  component={renderField}
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
              <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

const validate = (val) => {
  const errors = {};

  if (!val.firstName) errors.firstName = "Required";

  if (!val.lastName) errors.lastName = "Required";

  if (!val.email) errors.email = "Required";
  else if (!/^.+@.+$/i.test(val.email)) errors.email = "Invalid email address";

  if (!val.password) errors.password = "Required";
  else if (val.password < 6)
    errors.password = "Password must be greater than 6 characters";

  return errors;
};

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

SignUpForm = reduxForm({
  form: "signup",
  validate,
})(SignUpForm);

class SignUp extends Component {
  handleSignUp = (values) => this.props.signup(values);

  render() {
    return <SignUpForm onSubmit={this.handleSignUp} />;
  }
}

const mapDispatchToProps = {
  signup: signup,
};

export default connect(null, mapDispatchToProps)(SignUp);
