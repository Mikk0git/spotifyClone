import { useEffect, useState } from "react";
import "./LibraryListElement.css";
import supabase from "./supabaseClient";
import { Link } from "react-router-dom";
interface LibraryListElementProps {
  title: string;
  artist: string;
  type: string;
  id: number;
}

export function LibraryListElement({
  title,
  artist,
  type,
  id,
}: LibraryListElementProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.storage
        .from(`${type}Covers`)
        .getPublicUrl(id + ".png");

      setImageUrl(data?.publicUrl || null);
    };

    fetchData();
  }, [id]);

  return (
    <Link to={`/${type}/${id}`}>
      <div className="libraryListElement">
        {imageUrl && <img src={imageUrl} alt="" className="libraryListImg" />}
        <div className="libraryListElementInfo textMargin">
          <span className="normalText ">{title}</span>
          <span className="otherInfoText ">
            {type} • {artist}
          </span>
        </div>
      </div>
    </Link>
  );
}
