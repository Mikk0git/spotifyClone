// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div id="menuBox">
        <h3>Home</h3>
        <h3>Search</h3>
      </div>
      <div id="yourLibraryBox">
        <h3>Your Library</h3>
      </div>
      <div id="mainBox">
        <div id="recentlyPlayed">
          <h3>Recently Played</h3>
          <h3>Made For You</h3>
          <h3>Episodes for you</h3>
        </div>
      </div>
      <div id="playerBox">player</div>
    </>
  );
}

export default App;
