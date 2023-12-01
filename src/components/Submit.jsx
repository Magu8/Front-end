import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Submit.scss";

export default function Submit() {
  const [error, setError] = useState(null);
  const [published, setPublished] = useState(false);
  const { activeUser, setActiveUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  let location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!activeUser && location.pathname.includes("/submit")) {
      navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = e.target.image.value;
    const title = e.target.title.value;
    const description = e.target.description.value;

    const submitedArtwork = { image, title, description };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submitedArtwork),
    };

    fetch(
      `http://localhost:3000/artworks/${activeUser.username}/import`,
      requestOptions
    )
      .then((data) => data.json())
      .then((data) => {
        if (data.statusCode === 400) {
          console.log(data);
          setError(data);
        } else {
          setError(null);
          setActiveUser((prevUser) => {
            return {
              ...prevUser,
              own: [...prevUser.own, data],
            };
            //esta lógica crea un objeto nuevo pero con las propiedades del objeto anterior más los cambios que le indicamos
          });
          setPublished(true);
        }
      })
      .catch("Error submiting artwork");

    e.target.image.value = "";
    e.target.title.value = "";
    e.target.description.value = "";
  };

  return (
    <div className="submit-div">
      <div className="submit-form">
        <form onSubmit={handleSubmit}>
          <div className="submit-title">
            <h2>Submit Artwork</h2>
            <p>Please add your submissions information below</p>
          </div>
          <div className="submit-input">
            <input type="text" name="image" />
            <label>image</label>
          </div>
          <div className="submit-input">
            <input type="text" name="title" />
            <label>title</label>
          </div>
          <div className="submit-input">
            <input type="text" name="description" />
            <label>description about your artwork (optional)</label>
          </div>
          <button className="submit-button" type="submit">
            Submit Artwork
          </button>
          {error ? (
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
              <span>The first two fields must be filled at least</span>
            </div>
          ) : !error && published === true ? (
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
              <span>Artwork successfully submited</span>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
}
