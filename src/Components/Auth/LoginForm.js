import React from "react";

const LoginForm = ({ user, onChange, onSubmit, status }) => {
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
          <br />
          <br />
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
          <br />
          <br />
          <button type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </form>
      {status && <div>{status}</div>}
    </div>
  );
};

export default LoginForm;
