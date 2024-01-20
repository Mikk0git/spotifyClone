import "./LibraryBox.css";
import { LibraryListElement } from "./LibraryListElement";

export function LibraryBox() {
  return (
    <div id="libraryBox" className="appBox">
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
  );
}
