import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({ user, onChange, onSubmit, status}) => {
  return (
    <>
      <div className = "module">
        {/* displays error message if one exists */}
        {status && <div style={{color:'red'}}>{status}</div>}
        <form onSubmit={onSubmit}>
          <div>
            <label>First Name</label>
            <br />
            <input
              type="text"
              value={user.firstName}
              onChange={onChange}
              name="firstName"
              placeholder="Your First Name"
              required
            />
            <br />
            <br />
            <label>Last Name</label>
            <br />
            <input
              type="text"
              value={user.lastName}
              onChange={onChange}
              name="lastName"
              placeholder="Your Last Name"
              required
            />
            <br />
            <br />
            <label>Email</label>
            <br />
            <input
              type="email"
              value={user.email}
              onChange={onChange}
              name="email"
              placeholder="Your Email"
              required
            />
            <br />
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="Your (Unique) Password"
              required
            />
            <br />
            <br />
            <label>Confirm Password</label>
            <br />
            <input
              type="password"
              value={user.confirmPassword}
              onChange={onChange}
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
            <br />
            <br />
            <button type="submit" onSubmit={onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Link to login page */}
      <div className="module">
          <p>Already Have an Account?</p>
          <Link to="/login">
              <button>Login</button>
          </Link>
      </div>
    </>
  );
};

export default RegisterForm;
