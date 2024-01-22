import { useEffect, useState } from "react";
import "./HomePanelRow.css";
import { HomePanelElement } from "./HomePanelElement";
import supabase from "../supabaseClient";

interface Album {
  title: string | null;
  artist: string | null;
  id: number | null;
  // created_at: string;
  // release_date: string | null;
  // user_id: number | null;
}

interface HomePanelRowProps {
  rowTitle: string;
}

export function HomePanelRow({ rowTitle }: HomePanelRowProps) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("albums")
        .select("id,title, users(username)");

      if (error) {
        console.error("Error fetching albums:", error.message);
        setFetchError(error.message);
      } else {
        // console.log("Fetched Albums:", data);

        const mappedAlbums: Album[] = data.map((albumData) => ({
          title: albumData.title || "Unknown Title",
          artist: albumData.users?.username || "Unknown Artist",
          id: albumData.id,
          // created_at: albumData.created_at,
          // release_date: albumData.release_date,
          // user_id: albumData.user_id || 0,
        }));

        setAlbums(mappedAlbums);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="recentlyPlayed" className="homePanelRow">
      <h2>{rowTitle}</h2>

      {fetchError && <p>{fetchError}</p>}
      {albums && (
        <div className="homePanelList">
          {albums.map((album) => (
            <HomePanelElement
              title={album.title || "Unknown Title"}
              artist={album.artist || "Unknown Artist"}
              id={album.id || 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
