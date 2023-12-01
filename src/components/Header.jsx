import { useContext } from "react";
import "../styles/Header.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function Header() {
  const { activeUser, setActiveUser } = useContext(UserContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    setActiveUser(null);
    navigate("/");
  };

  let location = useLocation();

  return (
    <div>
      {!activeUser ? (
        <div className="navbar bg-black">
          <div className="flex-1">
            <Link className="logo" to="/">
              {/* <img src="../logo.png" alt="Logo" /> */}
              <h1>Galaxlery</h1>
            </Link>
          </div>
          <div className="menu-bar">
            {location.pathname.includes("login") ? (
              <></>
            ) : location.pathname.includes("register") ? (
              <Link className="btn btn-outline btn-primary" to="/login">
                <h4>Log in</h4>
              </Link>
            ) : (
              <>
                <Link className="btn btn-outline btn-init" to="/register">
                  <h4>Sign up</h4>
                </Link>
                <Link className="btn btn-outline btn-init" to="/login">
                  <h4>Log in</h4>
                </Link>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="navbar bg-black">
          <div className="flex-1">
            <Link className="logo" to="/">
              {/* <img src="../logo.png" alt="Logo" /> */}
              <h1>Galaxlery</h1>{" "}
            </Link>
          </div>
          <div className="dropdown dropdown-end">
            {location.pathname.includes("myProfile") ? (
              <div className="menu-bar">
                <Link className="btn btn-outline btn-secondary" to="/submit">
                  <h4>Submit artwork</h4>
                </Link>
                <button
                  className="btn btn-outline btn-secondary"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            ) : location.pathname.includes("submit") ? (
              <div className="menu-bar">
                <Link className="btn btn-outline btn-accent" to="/myProfile">
                  <h4>My profile</h4>
                </Link>
                <button
                  className="btn btn-outline btn-accent"
                  onClick={handleLogout}
                >
                  Log out
                </button>
              </div>
            ) : (
              <>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img src={activeUser.photo} />
                  </div>
                </div>
                <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-black rounded-box w-52 border-white text-white">
                  <li>
                    <Link to="/myProfile">
                      <h4>My profile</h4>
                    </Link>
                  </li>
                  <li>
                    <Link to="/submit">
                      <h4>Submit artwork</h4>
                    </Link>
                  </li>
                  <li>
                    <button className="logout" onClick={handleLogout}>
                      Log out
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
