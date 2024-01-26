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

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsSignedIn(user !== null);
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div id="appContainer">
        <MenuBox />

        <LibraryBox />

        <div id="mainBox" className="appBox">
          <div id="mainButtonsBar">
            <div id="mainArrows" className="buttonGroup">
              <div className="mainBoxButton">
                <span className="material-symbols-outlined">chevron_left</span>
              </div>
              <div className="mainBoxButton">
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
            <div id="mainOtherButtons" className="buttonGroup">
              <div className="mainBoxButton">
                <span className="material-symbols-outlined">notifications</span>
              </div>
              {isSignedIn ? (
                <Link to="/account">
                  <span className="material-symbols-outlined">person</span>
                </Link>
              ) : (
                <Link to="/login">login</Link>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<HomePanel />} />
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
    </Router>
  );
}

export default App;
