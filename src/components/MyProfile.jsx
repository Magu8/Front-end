import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import OwnArtworks from "./OwnArtworks";
import OwnFavoriteArtworks from "./OwnFavoriteArtworks";
import "../styles/Profile.scss";

export default function MyProfile() {
  const { activeUser } = useContext(UserContext);
  const [galleryDis, setGalleryDis] = useState(false);
  const [favoritesDis, setFavoritesDis] = useState(false);
  const [myProfile] = useState(true);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    console.log(activeUser);
    if (!activeUser && location.pathname.includes("/myProfile")) {
      navigate("/");
    }
  }, [activeUser, navigate]);

  if (!activeUser) {
    return <p>Can't access to your profile, redirecting...</p>;
  }

  const displayGallery = () => {
    setGalleryDis(true);
    setFavoritesDis(false);
  };
  const displayFavorites = () => {
    setGalleryDis(false);
    setFavoritesDis(true);
  };

  return (
    <div className="profile-div">
      <div className="profile-card">
        <div className={`profile-name ${myProfile && "my-profile"}`}>
          <span>{activeUser.username}</span> <h2>'s profile</h2>
        </div>
        <div className={`profile-content ${myProfile && "my-profile-content"}`}>
          <div className="profile-data">
            <div className="photo-follow">
              <img
                className="profile-photo"
                src={activeUser.photo}
                alt={activeUser.username}
              />
              <div className="follow-section">
                <p>Stargazers {activeUser.followers.length}</p>
                <p>Stargazing {activeUser.following.length}</p>
              </div>
            </div>
            <div className="profile-bio">
              <p>Real name</p>
              <h3>{activeUser.name}</h3>
              <h5>
                "More details that might be added in the future, like their
                gender, age, nationality..."
              </h5>
              <h4>About me:</h4>
              <h5>{activeUser.bio}</h5>
            </div>
          </div>
        </div>
      </div>
      {!galleryDis && !favoritesDis ? (
        <div className="buttons-div">
          <button onClick={displayGallery}>My Gallery</button>
          <button onClick={displayFavorites}>My Favorites</button>
        </div>
      ) : !favoritesDis ? (
        <>
          {" "}
          <div className="buttons-div">
            <button onClick={displayFavorites}>My Favorites</button>
          </div>
          <h2 className="gallery">My gallery</h2>
          <div className="border"></div>
          <div className="profile-ownArt">
            <OwnArtworks ownArt={activeUser.own} />
          </div>
        </>
      ) : (
        <>
          <div className="buttons-div">
            <button onClick={displayGallery}>My Gallery</button>
          </div>
          <h2 className="favorites">My favorites</h2>
          <div className="border"></div>
          <div className="profile-faveArt">
            <OwnFavoriteArtworks favArt={activeUser.fav} />
          </div>
        </>
      )}
    </div>
  );
}
