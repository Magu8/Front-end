import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import "../styles/Login.scss";

export default function Login() {
  const [fetchData, setFetchData] = useState("");

  const { activeUser, setActiveUser } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeUser) {
      navigate("/myProfile");
    }
  }, [activeUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const loggedPerson = { username, password };

    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loggedPerson),
    };

    fetch("http://localhost:3000/auth/login", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setFetchData(data);
        if (data.statusCode !== 401) {
          setActiveUser(data.user);
          setToken(data.access_token);
          navigate("/");
        }
      })
      .catch();
  };

  return (
    <div className="login-div">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <h2>Log in</h2>
          <div className="login-input">
            <input type="text" name="username"></input>
            <label>Username</label>
          </div>
          <div className="login-input">
            <input type="password" name="password"></input>
            <label>Password</label>
          </div>
          <button className="submit-button" type="submit">
            <span>Log into your account</span>
          </button>
          <br />
          {!fetchData ? (
            <></>
          ) : fetchData.statusCode === 401 ? (
            <div role="alert" className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Incorrect username or password</span>
            </div>
          ) : (
            <></>
          )}
          <Link to="/register">
            Not an account yet? Click here in order to register your account
          </Link>
        </form>
      </div>
    </div>
  );
}
