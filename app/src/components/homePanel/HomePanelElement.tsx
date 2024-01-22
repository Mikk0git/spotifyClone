import "./HomePanelElement.css";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";

interface HomePanelElementProps {
  title: string;
  artist: string;
  id: number;
}

export function HomePanelElement({ title, artist, id }: HomePanelElementProps) {
  const [albumCoverUrl, setAlbumCoverUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.storage
        .from("albumCovers")
        .getPublicUrl(id + ".png");

      // console.log("Fetched AlbumCover URL:", data);
      setAlbumCoverUrl(data?.publicUrl || null);
    };

    fetchData();
  }, [id]);

  return (
    <div className="homePanelElement">
      {albumCoverUrl && <img src={albumCoverUrl} alt="" />}
      <span className="normalText homePanelElementNormalText">{title}</span>
      <span className="otherInfoText homePanelElementOtherText">{artist}</span>
    </div>
  );
}
