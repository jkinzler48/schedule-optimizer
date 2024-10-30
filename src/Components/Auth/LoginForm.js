import React from "react";

const LoginForm = ({ user, onChange, onSubmit }) => {
  return (
    <div className = "module">
      <form onSubmit={onSubmit}>
        <div>
          <label>Username (Email)</label>
          <br />
          <input
            type="text"
            value={user.username}
            onChange={onChange}
            name="username"
            placeholder="Your Username"
            required
          />
        </div>
        <div>
          <label>Password</label>
          <br />
          <input
            type="text"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="Your Password"
            required
          />
        </div>{" "}
        <div>
          <button type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
