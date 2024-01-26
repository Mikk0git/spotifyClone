import { useEffect, useState } from "react";
import "./HomePanel.css";
import supabase from "../supabaseClient";
import { useContext } from "react";
import { playingSongContext } from "../../Context/playingSong";

interface Song {
  id: number | null;
  title: string;
  album_id: number | undefined;
}

export function HomePanelRandomSongElement({ title, album_id, id }: Song) {
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string | null>(null);
  const { setPlayingSongId } = useContext(playingSongContext);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.storage
        .from("albumCovers")
        .getPublicUrl(album_id + ".png");

      setAlbumCoverUrl(data?.publicUrl || null);
    };

    fetchData();
  }, [album_id]);

  function PlayElement() {
    if (id !== null && id !== undefined) {
      console.log(`Playing Id: ${id}`);
      setPlayingSongId(String(id));
    }
  }

  return (
    <div className="randomSongsBarElement" onClick={PlayElement} data-id={id}>
      {albumCoverUrl && <img src={albumCoverUrl} alt="" />}
      <span className="normalText">{title}</span>
    </div>
  );
}
