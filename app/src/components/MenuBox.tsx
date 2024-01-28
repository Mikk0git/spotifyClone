import { Link } from "react-router-dom";
import "./MenuBox.css";

export function MenuBox() {
  return (
    <div id="menuBox" className="appBox">
      <ul className="menuBoxList">
        <li id="menuBoxHome" className="menuBoxElement">
          <Link to={"/"}>
            <span className="material-symbols-outlined">home</span>
            <span className="normalText textMargin">Home</span>
          </Link>
        </li>

        <li id="menuBoxSearch" className="menuBoxElement">
          <Link to={"/search"}>
            <span className="material-symbols-outlined">search</span>
            <span className="normalText textMargin">Search</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
