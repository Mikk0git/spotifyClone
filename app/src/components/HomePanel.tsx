import "./HomePanel.css";

export function HomePanel() {
  return (
    <div id="homePanel">
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
  );
}
