// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div id="boxContainer">
        <div id="menuBox" className="appBox">
          <ul>
            <li id="menuBoxHome" className="menuBoxElement">
              <span className="material-symbols-outlined">home</span>
              <span className="normalText boxMenuText">Home</span>
            </li>
            <li id="menuBoxSearch" className="menuBoxElement">
              <span className="material-symbols-outlined">search</span>
              <span className="normalText boxMenuText">Search</span>
            </li>
          </ul>
        </div>
        <div id="yourLibraryBox" className="appBox">
          <span className="normalText">Your Library</span>
        </div>
        <div id="mainBox" className="appBox">
          <div id="recentlyPlayed">
            <span className="normalText">Recently Played</span>
            <span className="normalText">Made For You</span>
            <span className="normalText">Episodes for you</span>
          </div>
        </div>
      </div>
      <div id="playerBox">player</div>
    </>
  );
}

export default App;
