// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import "./App.css";
import { LibraryListElement } from "./components/LibraryListElement";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div id="appContainer">
        {/* <div id="sidePanelBox"> */}
        <div id="menuBox" className="appBox">
          <ul>
            <li id="menuBoxHome" className="menuBoxElement">
              <span className="material-symbols-outlined">home</span>
              <span className="normalText textMargin">Home</span>
            </li>
            <li id="menuBoxSearch" className="menuBoxElement">
              <span className="material-symbols-outlined">search</span>
              <span className="normalText textMargin">Search</span>
            </li>
          </ul>
        </div>
        <div id="yourLibraryBox" className="appBox">
          <div id="menuBoxYourLibrary" className="menuBoxElement">
            <span className="material-symbols-rounded">menu</span>
            <span className="normalText textMargin">Your Library</span>
          </div>
          <div id="libraryList">
            <LibraryListElement
              title="Towards the Lonely Wind"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs1.png"
            />
            <LibraryListElement
              title="Echoes of the Azure Sky"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs2.png"
            />
            <LibraryListElement
              title="Towards the Lonely Wind"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs1.png"
            />
            <LibraryListElement
              title="Echoes of the Azure Sky"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs2.png"
            />{" "}
            <LibraryListElement
              title="Towards the Lonely Wind"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs1.png"
            />
            <LibraryListElement
              title="Echoes of the Azure Sky"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs2.png"
            />{" "}
            <LibraryListElement
              title="Towards the Lonely Wind"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs1.png"
            />
            <LibraryListElement
              title="Echoes of the Azure Sky"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs2.png"
            />{" "}
            <LibraryListElement
              title="Towards the Lonely Wind"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs1.png"
            />
            <LibraryListElement
              title="Echoes of the Azure Sky"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs2.png"
            />{" "}
            <LibraryListElement
              title="Towards the Lonely Wind"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs1.png"
            />
            <LibraryListElement
              title="Echoes of the Azure Sky"
              artist="Blissing Stratus"
              type="Album"
              imgPath="/bs2.png"
            />
          </div>
        </div>
        <div id="mainBox" className="appBox">
          <div id="recentlyPlayed">
            <span className="normalText">Recently Played</span>
          </div>
          <div id="madeForYou">
            <span className="normalText">Made For You</span>
          </div>
          <div id="episodesForYou">
            <span className="normalText">Episodes for you</span>
          </div>
        </div>
        <div id="playerBox">player</div>
      </div>
    </>
  );
}

export default App;
