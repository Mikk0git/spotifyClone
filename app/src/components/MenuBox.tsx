import "./MenuBox.css";

export function MenuBox() {
  return (
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
  );
}
