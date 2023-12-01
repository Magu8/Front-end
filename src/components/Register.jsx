import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";

export default function Register() {
  const [registered, setRegistered] = useState(null);
  const [error, setError] = useState(null);
  const { activeUser } = useContext(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    if (activeUser) {
      navigate("/myProfile");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const photo = e.target.photo.value;
    const name = e.target.name.value;
    const username = e.target.username.value;
    const password = e.target.password.value;

    const registeredPerson = { photo, name, username, password };

    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(registeredPerson),
    };

    fetch("http://localhost:3000/users/register", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 400) {
          setError(data);
        } else if (data.status === 409) {
          setError(data);
        } else {
          setRegistered(data);
          setError(null);
        }
      });

    e.target.photo.value = "";
    e.target.name.value = "";
    e.target.username.value = "";
    e.target.password.value = "";
  };

  return (
    <>
      <div className="register-div">
        <div className="register-form">
          <form onSubmit={handleSubmit}>
            <div className="register-title">
              <h2>Sign up</h2>
              <p>Please write the required information below</p>
            </div>
            <div className="register-input">
              <input type="text" name="photo" />
              <label>Insert your profile pic</label>
            </div>
            <div className="register-input">
              <input type="text" name="name" />
              <label>Insert your name</label>
            </div>
            <div className="register-input">
              <input type="text" name="username" />
              <label>Insert a username</label>
            </div>
            <div className="register-input">
              <input type="password" name="password" />
              <label>Insert a password</label>
            </div>
            <button className="submit-button" type="submit">
              Register account
            </button>
            {error && error.status === 409 ? (
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
                <span>Username already exists</span>
              </div>
            ) : error && error.statusCode === 400 ? (
              <div role="alert" class="alert alert-warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="stroke-current shrink-0 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <span>Please fill all the fields</span>
              </div>
            ) : registered ? (
              <div role="alert" className="alert alert-success">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Successfully registered!</span>
              </div>
            ) : (
              <></>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
