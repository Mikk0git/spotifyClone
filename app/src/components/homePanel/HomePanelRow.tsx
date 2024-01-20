import "./HomePanelRow.css";
import { HomePanelElement } from "./HomePanelElement";

interface HomePanelRowProps {
  rowTitle: string;
}

export function HomePanelRow({ rowTitle }: HomePanelRowProps) {
  return (
    <div id="recentlyPlayed" className="homePanelRow">
      <h2>{rowTitle}</h2>
      <div className="homePanelList">
        <HomePanelElement
          title="Towards the Lodd dsf nely Wind"
          otherInfo="Blissing Stratus"
          imgPath="/bs1.png"
        />
        <HomePanelElement
          title="Echoes of the Azure Sky"
          otherInfo="Blissing Stratus"
          imgPath="/bs2.png"
        />
      </div>
    </div>
  );
}
