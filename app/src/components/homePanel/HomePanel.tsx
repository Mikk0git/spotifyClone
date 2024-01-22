import "./HomePanel.css";
import { HomePanelRow } from "./HomePanelRow";

export function HomePanel() {
  return (
    <div id="homePanel">
      <HomePanelRow rowTitle="All Albums" />
      {/* <HomePanelRow rowTitle="Recently played" />
      <HomePanelRow rowTitle="Recently played" />
      <HomePanelRow rowTitle="Recently played" /> */}
    </div>
  );
}
