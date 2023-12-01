import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import NotFound from "./NotFound";
import { useState } from "react";
import UserContext from "./contexts/UserContext";
import TokenContext from "./contexts/TokenContext";
import MyProfile from "./components/MyProfile";
import Profile from "./components/Profile";
import Artwork from "./components/Artwork";
import Submit from "./components/Submit";
import Footer from "./components/Footer";
import Main from "./components/Main";

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
    <UserContext.Provider value={{ activeUser, setActiveUser }}>
      <TokenContext.Provider value={{ token, setToken }}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/:_id" element={<Artwork />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/myProfile" element={<MyProfile />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </TokenContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
