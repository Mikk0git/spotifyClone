import "./HomePanelElement.css";
import supabase from "../supabaseClient";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface HomePanelElementProps {
  title: string;
  artist: string;
  id: string | null;
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
    <Link to={`/album/${id}`}>
      <div className="homePanelElement">
        {albumCoverUrl && <img src={albumCoverUrl} alt="" />}
        <span className="normalText homePanelElementNormalText">{title}</span>
        <span className="otherInfoText homePanelElementOtherText">
          {artist}
        </span>
      </div>
    </Link>
  );
}
