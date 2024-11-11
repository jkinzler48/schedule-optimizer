import React from "react";
import { Link } from "react-router-dom";

const AuthForm = ({ user, isLogin, onChange, onSubmit, status }) => {

  return (
    <>
        <div className = "module">
            {/* displays status message if one exists */}
            {status && <div className="section" style={{color:'red'}}>{status}</div>}

            <form onSubmit={onSubmit}>
                <div className="section">
                    {/* display "First Name" and "Last Name" input fields if it is not login */}
                    {!isLogin ?
                        <>
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
                        </> : <></>
                    }

                    {/* Username(Email)/Password text fields always displayed */}
                    <label>Username (Email)</label>
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
                        placeholder="Your Password"
                        required
                    />
                    <br />
                    <br />

                    {/* displays "Confirm Password" text field if it is not login */}
                    {!isLogin ? 
                        <>
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
                        </> : <></>}
                    <button type="submit" onSubmit={onSubmit}>
                    Submit
                    </button>
                </div>
            </form>
        </div>

        {/* Display button with link to register page if it is login, otherwise display btton
        with link to login */}
        {isLogin? (
             //* Link to Register page
            <div className="module">
                <p>Don't Have an Account?</p>
                <Link to="/auth/register">
                    <button>Register</button>
                </Link>
            </div>

        ) : (
            <div className="module">
                <p>Already Have an Account?</p>
                <Link to="/auth/login">
                    <button>Login</button>
                </Link>
            </div> 
        )}
       
    </>
  );
};

export default AuthForm;