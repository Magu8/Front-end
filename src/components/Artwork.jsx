import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import TokenContext from "../contexts/TokenContext";
import "../styles/Artwork.scss";

export default function Artwork() {
  const [artwork, setArtwork] = useState(null);
  const [fave, setFave] = useState(false);
  const [remove, setRemove] = useState(false);
  const { _id } = useParams();
  const { activeUser, setActiveUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [feedback, setFeedback] = useState([]);
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/artworks/${_id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);
      });
  }, []);

  const handleFavBtn = async (artworkId) => {
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
      `http://localhost:3000/artworks/${activeUser.username}/addToFav/${artworkId}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        setActiveUser((prevUser) => {
          return {
            ...prevUser,
            fav: [...prevUser.fav, data],
          };
        });
      });
    setFave(true);
    setRemove(false);
  };
  const handleRemoveBtn = async (artworkId) => {
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
    setFave(false);
  };

  const handleSubmitComment = async (e) => {
    if (!activeUser) {
      navigate("/login");
    }
    e.preventDefault();

    const comment = e.target.yourcomment.value;

    if (comment === "") {
      setError(true);
    } else {
      setError(false);
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: comment }),
      };

      fetch(
        `http://localhost:3000/artworks/${activeUser.username}/addComment/${artwork._id}`,
        requestOptions
      )
        .then((res) => res.json())
        .then((data) => {
          setFeedback((prevData) => {
            return [...prevData, data];
          });
        });
      e.target.yourcomment.value = "";
    }
  };

  return artwork === null ? (
    <p>Loading...</p>
  ) : (
    <div className="artwork-div">
      <div className="artwork">
        <img className="artwork-image" src={artwork.image} />
        <div className="info">
          <div className="info-text">
            <h3>{artwork.title}</h3>
            <Link to={`/profile/${artwork.author}`}>
              <h5>{artwork.author}</h5>
            </Link>
          </div>
          {activeUser && activeUser.username === artwork.author ? (
            <div className="button-section">
              <button className="fav-button" disabled>
                You can't add to Favorites your own art
              </button>
            </div>
          ) : activeUser && activeUser.fav.includes(artwork._id) ? (
            <div className="button-section">
              <button
                className="remove-button"
                onClick={() => handleRemoveBtn(artwork._id)}
              >
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
            </div>
          ) : (
            <div className="button-section">
              <button
                className="fav-button"
                onClick={() => handleFavBtn(artwork._id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
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
              {/* <p>Add to favorites</p> */}
            </div>
          )}

          <p>{artwork.description}</p>
        </div>
      </div>

      <div className="comments-div">
        <div className="border"></div>
        <h4>Comments: {artwork.comments.length + feedback.length}</h4>
        {error ? <p>Must write something in order to comment</p> : <></>}
        <form className="write-comment" onSubmit={handleSubmitComment}>
          <input
            type="text"
            name="yourcomment"
            className="input input-bordered input-info w-full max-w-xs"
            placeholder="Write a comment..."
          />
          <button type="submit">Comment</button>
        </form>
        <div className="comment-box">
          {feedback.length > 0 ? (
            <>
              {feedback.map((com) => (
                <div className="your-comment">
                  <div className="w-10 rounded-full">
                    <Link to={`/profile/${com.u}`}>
                      <img src={com.pic} />
                    </Link>
                  </div>
                  <h5>{com.u}</h5>
                  <p>{com.comment}</p>
                </div>
              ))}
              {artwork.comments.map((comment) => (
                <div className="your-comment">
                  <div className="w-10 rounded-full">
                    <Link to={`/profile/${comment.u}`}>
                      <img className="w-10 rounded-full" src={comment.pic} />
                    </Link>
                  </div>
                  <h5>{comment.u}</h5>
                  <p>{comment.comment}</p>
                </div>
              ))}
            </>
          ) : artwork.comments.length > 0 ? (
            artwork.comments.map((comment) => (
              <div className="your-comment">
                <div className="w-10 rounded-full">
                  <Link to={`/profile/${comment.u}`}>
                    <img className="w-10 rounded-full" src={comment.pic} />
                  </Link>
                </div>
                <h5>{comment.u}</h5>
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <h5>No comments</h5>
          )}
        </div>
      </div>
      {fave ? <p>Added to favorites!</p> : <></>}
    </div>
  );
}
