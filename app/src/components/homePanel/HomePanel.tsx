import { useEffect, useState } from "react";
import "./HomePanel.css";
import { HomePanelRow } from "./HomePanelRow";
import { HomePanelRandomSongElement } from "./HomePanelRandomSongElement";
import supabase from "../supabaseClient";

interface Song {
  id: string | null;
  title: string;
  album_id: string;
}

export function HomePanel() {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: songData, error: songError } = await supabase
        .from("random_songs")
        .select("id,title, albums(id)")
        .range(0, 5);

      if (songError) {
        console.error("Error fetching songs:", songError);
      } else {
        const mappedSongs: Song[] = songData.map((songData) => ({
          id: songData.id,
          title: songData.title || "Unknown Title",
          album_id: songData.albums?.id || "Unknown Album ID",
        }));

        setSongs(mappedSongs);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="homePanel">
      <div id="homeTopBar">
        <h1 className="lowerLineHeight">Good evening</h1>
        {songs && (
          <div id="randomSongsBar">
            {songs.map((song) => (
              <HomePanelRandomSongElement
                id={song.id}
                title={song.title}
                album_id={song.album_id}
              />
            ))}
          </div>
        )}
      </div>
      <HomePanelRow rowTitle="All Albums" />
      {/* <HomePanelRow rowTitle="Recently played" />
      <HomePanelRow rowTitle="Recently played" />
      <HomePanelRow rowTitle="Recently played" /> */}
    </div>
  );
}
