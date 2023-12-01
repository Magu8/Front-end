import { useContext, useEffect, useState } from "react";
import { useOneArtwork } from "../hooks/useOneArtwork";
import { Link } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import { useRemoveFave } from "../hooks/useRemoveFave";
import "../styles/Profile.scss";

export default function OwnFavoriteArtworks({ favArt }) {
  const { getOneArt, oneArt } = useOneArtwork();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [remove, setRemove] = useState(false);

  useEffect(() => {
    getOneArt(favArt);
  }, [activeUser]);

  const handleRemoveBtn = (artworkId) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `http://localhost:3000/artworks/${activeUser.username}/removeFromFav/${artworkId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setActiveUser((prevUser) => {
          return {
            ...prevUser,
            fav: data,
          };
        });
      });
    setRemove(true);
  };

  return (
    <>
      <div className="faveart-div">
        {oneArt.length == 0 ? (
          <p>No favorites yet</p>
        ) : (
          oneArt.map((art) => (
            <div className="faveart">
              <button onClick={() => handleRemoveBtn(art._id)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="pink"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <Link to={`/${art._id}`}>
                <img className="faveart-image" src={art.image} />
              </Link>

              <h3 className="faveart-title">{art.title}</h3>
            </div>
          ))
        )}
      </div>
      {remove ? <p>Removed from favorites</p> : <></>}
    </>
  );
}
