import { useContext, useEffect, useState } from "react";
import { useOneArtwork } from "../hooks/useOneArtwork";
import UserContext from "../contexts/UserContext";
import { Link } from "react-router-dom";
import "../styles/Profile.scss"
export default function OwnArtworks({ ownArt }) {
  const { getOneArt, oneArt } = useOneArtwork();
  const { activeUser } = useContext(UserContext);

  useEffect(() => {
    console.log(ownArt);
    getOneArt(ownArt);
  }, [activeUser]);

  return (
    <div className="ownart-div">
      {oneArt.length == 0 ? (
        <p>No art yet</p>
      ) : (
        oneArt.map((art) => (
          <div className="ownart">
            <Link to={`/${art._id}`}>
              <img className="ownart-image" src={art.image} />
            </Link>
            <h3 className="ownart-title">{art.title}</h3>
          </div>
        ))
      )}
    </div>
  );
}
