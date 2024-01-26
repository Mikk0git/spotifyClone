import "./PlayerBox.css";
import { useContext, useEffect, useState } from "react";
import { playingSongContext } from "../Context/playingSong";
import supabase from "./supabaseClient";

export function PlayerBox() {
  const [songUrl, setSongUrl] = useState("");
  const playingSong = useContext(playingSongContext);
  // console.log("CONTEXT " + playingSong.playingSongId);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.storage
        .from("songs")
        .getPublicUrl(playingSong.playingSongId + ".mp3");

      setSongUrl(data?.publicUrl);
    };

    fetchData();
  }, [playingSong.playingSongId]);

  return (
    <div id="playerBox">
      <div className="playerSection" id="nowPlayingSong">
        <img src="./bs2.png" alt="" />
        <div id="songInfo">
          <span className="normalText">Towards the Lonely Wind</span>
          <span className="otherInfoText">Towards the Lonely Wind</span>
        </div>
        <button>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <div className="playerSection" id="playerControls">
        {songUrl && <audio src={songUrl} autoPlay controls />}
        <div id="playerControlsButtons">
          <button>
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          <button>
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
          <button>
            <span className="material-symbols-outlined">play_circle</span>
          </button>
          <button>
            <span className="material-symbols-outlined">skip_next</span>
          </button>
          <button>
            <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>
      </div>
      <div className="playerSection" id="playerOtherOptions">
        <button>
          <span className="material-symbols-outlined">slideshow</span>
        </button>
        <button>
          <span className="material-symbols-outlined">queue_music</span>
        </button>
        <div id="volumeControls">
          <span className="material-symbols-outlined">volume_up</span>
        </div>
      </div>
    </div>
  );
}
