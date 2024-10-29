import React from "react";

const AuthForm = ({ user, onChange, onSubmit }) => {
  return (
    <div className = "module">
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
        </div>
        <div>
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
        </div>{" "}
        <div>
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
        </div>{" "}
        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            value={user.password}
            onChange={onChange}
            name="password"
            placeholder="Your (Unique) Password"
            min="0"
            required
          />
        </div>
        <div>
          <button type="submit" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
