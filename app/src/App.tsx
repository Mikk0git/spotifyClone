import "./App.css";
import { MenuBox } from "./components/MenuBox";
import { LibraryBox } from "./components/LibraryBox";
import { PlayerBox } from "./components/PlayerBox";
import { HomePanel } from "./components/homePanel/HomePanel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
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
              <div className="mainBoxButton">
                <span className="material-symbols-outlined">person</span>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/" element={<HomePanel />} />
          </Routes>
        </div>
        <PlayerBox />
      </div>
    </Router>
  );
}

export default App;
