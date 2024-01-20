// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import "./App.css";
import { MenuBox } from "./components/MenuBox";
import { LibraryBox } from "./components/LibraryBox";
import { PlayerBox } from "./components/PlayerBox";
import { HomePanel } from "./components/HomePanel";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
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
          <HomePanel />
        </div>
        <PlayerBox />
      </div>
    </>
  );
}

export default App;
