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
          <div id="menuBoxHome">
            <h4>Home</h4>
          </div>
          <div id="menuBoxSearch">
            <h4>Search</h4>
          </div>
        </div>
        <div id="yourLibraryBox" className="appBox">
          <h4>Your Library</h4>
        </div>
        <div id="mainBox" className="appBox">
          <div id="recentlyPlayed">
            <h4>Recently Played</h4>
            <h4>Made For You</h4>
            <h4>Episodes for you</h4>
          </div>
        </div>
      </div>
      <div id="playerBox">player</div>
    </>
  );
}

export default App;
