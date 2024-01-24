import { useEffect, useState } from "react";
import "./HomePanel.css";
import supabase from "../supabaseClient";

interface Song {
  id: number | null;
  title: string;
  album_id: number | undefined;
}

export function HomePanelRandomSongElement({ title, album_id }: Song) {
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.storage
        .from("albumCovers")
        .getPublicUrl(album_id + ".png");

      // console.log("Fetched AlbumCover URL:", data);
      setAlbumCoverUrl(data?.publicUrl || null);
    };

    fetchData();
  }, [album_id]);

  return (
    <div className="randomSongsBarElement">
      {albumCoverUrl && <img src={albumCoverUrl} alt="" />}
      <span className="normalText">{title}</span>
    </div>
  );
}
