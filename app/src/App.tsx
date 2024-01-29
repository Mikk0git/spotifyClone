import "./App.css";
import { useEffect, useState } from "react";
import { MenuBox } from "./components/MenuBox";
import { LibraryBox } from "./components/LibraryBox";
import { PlayerBox } from "./components/PlayerBox";
import { HomePanel } from "./components/homePanel/HomePanel";
import { Login } from "./components/loginOrRegister/Login";
import { Register } from "./components/loginOrRegister/Register";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import supabase from "./components/supabaseClient";
import { playingSongContext } from "./Context/playingSong";
import { SongGroupPage } from "./components/songGroupPage/SongGroupPage";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [playingSongId, setPlayingSongId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsSignedIn(user !== null);
      setPlayingSongId("2");
    };

    fetchData();
  }, []);

  return (
    <Router>
      <playingSongContext.Provider value={{ playingSongId, setPlayingSongId }}>
        <div id="appContainer">
          <MenuBox />

          <LibraryBox />

          <div id="mainBox" className="appBox">
            <div id="mainButtonsBar">
              <div id="mainArrows" className="buttonGroup">
                <div className="mainBoxButton">
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </div>
                <div className="mainBoxButton">
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </div>
              </div>
              <div id="mainOtherButtons" className="buttonGroup">
                <div className="mainBoxButton">
                  <span className="material-symbols-outlined">
                    notifications
                  </span>
                </div>
                {isSignedIn ? (
                  <Link to="/account">
                    <span className="material-symbols-outlined">person</span>
                  </Link>
                ) : (
                  <div id="navbarLoginButtonBox">
                    <Link to="/register">
                      <div className="navbarLoginButton">Register</div>
                    </Link>
                    <Link to="/login">
                      <div className="navbarLoginButton">Log in</div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <Routes>
              <Route path="/" element={<HomePanel />} />
              {/* <Route path="/album/:id" element={<SongGroupPage />} />
              <Route path="/playlist/:id" element={<SongGroupPage />} /> */}
              <Route path="/:type/:id" element={<SongGroupPage />} />
              <Route
                path="/login"
                element={<Login setIsSignedIn={setIsSignedIn} />}
              />
              <Route
                path="/register"
                element={<Register setIsSignedIn={setIsSignedIn} />}
              />
            </Routes>
          </div>
          <PlayerBox />
        </div>
      </playingSongContext.Provider>
    </Router>
  );
}

export default App;
