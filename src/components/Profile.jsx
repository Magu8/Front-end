import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useProfile } from "../hooks/useProfile";
import OwnArtworks from "./OwnArtworks";
import TokenContext from "../contexts/TokenContext";
import "../styles/Profile.scss";

export default function Profile() {
  const { getProfile, profile } = useProfile();
  const { username } = useParams();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [follow, setFollow] = useState(false);
  const [unfollow, setUnfollow] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    getProfile(username);
  }, []);

  useEffect(() => {
    if (activeUser && activeUser.username === profile.username) {
      navigate("/myProfile");
    }
    console.log(profile.own);
  }, [profile]);

  const handleFollowBtn = async (profileUsername) => {
    if (!activeUser) {
      navigate("/login");
    }
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(
      `http://localhost:3000/users/follow/${activeUser.username}/${profileUsername}`,
      requestOptions
    ).then((data) => {
      setActiveUser((prevUser) => {
        return {
          ...prevUser,
          following: [...prevUser.following, data],
        };
      });
    });

    profile.followers.push(activeUser.username);
    setFollow(true);
    setUnfollow(false);
  };

  const handleUnfollowBtn = async (profileUsername) => {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      `http://localhost:3000/users/unfollow/${activeUser.username}/${profileUsername}`,
      requestOptions
    ).then((data) => {
      setActiveUser((prevUser) => {
        return {
          ...prevUser,
          following: [data],
        };
      });
    });

    profile.followers.pop();
    setFollow(false);
    setUnfollow(true);
  };

  return profile.own !== undefined ? (
    <div className="profile-div">
      <div className="profile-name">
        <span>{profile.username}</span> <h2>'s profile</h2>
      </div>
      <div className="profile-card">
        <div className="profile-content">
          <div className="profile-data">
            <div classname="photo-follow">
              <img
                className="profile-photo"
                src={profile.photo}
                alt={profile.username}
              />
              <div className="follow-section">
                <p>Stargazers {profile.followers.length}</p>
                <p>Stargazing {profile.following.length}</p>
              </div>
            </div>
            <div className="profile-bio">
              <p>Real name</p>
              <h3>{profile.name}</h3>
              <h5>
                "More details that might be added in the future, like their
                gender, age, nationality..."
              </h5>
              <h4>About me:</h4>
              <h5>{profile.bio}</h5>
              <div className="follow-buttons">
                {activeUser &&
                profile.followers.includes(activeUser.username) ? (
                  <button
                    className="stargaze-button"
                    onClick={() => handleUnfollowBtn(profile.username)}
                  >
                    Stop stargazing at {profile.username}
                  </button>
                ) : (
                  <button
                    className="stargaze-button"
                    onClick={() => handleFollowBtn(profile.username)}
                  >
                    Stargaze {profile.username}
                  </button>
                )}
              </div>
              {follow === true ? (
                <p className="followthis">
                  You are stargazing {profile.username} now!
                </p>
              ) : unfollow === true ? (
                <p className="followthis">
                  Not stargazing at {profile.username}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      {profile === null ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2 className="gallery">{profile.username}'s gallery</h2>
          <div className="border"></div>
          <div className="profile-ownArt">
            <OwnArtworks ownArt={profile.own} />
          </div>
        </>
      )}
    </div>
  ) : (
    <p>Loading...</p>
  );
}
