import { useParams } from "react-router-dom";
import "./SongGroupPage.css";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { playingSongContext } from "../../Context/playingSong";

interface Song {
  id: number | null | undefined;
  title: string | undefined;
  order_number: number | undefined;
}

interface Album {
  id: number | null;
  title: string | null | undefined;
  artist: string | null | undefined;
}

export function AlbumPage() {
  const { id } = useParams();
  const [album, setAlbum] = useState<Album>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { setPlayingSongId } = useContext(playingSongContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.storage
          .from(`albumCovers`)
          .getPublicUrl(id + ".png");

        setImageUrl(data?.publicUrl || null);

        setSongs([]);

        const { data: albums, error: albumsError } = await supabase
          .from("albums")
          .select("id, title, user: users!albums_user_id_fkey(username)")
          .eq("id", Number(id));

        if (albumsError) {
          console.error("Error fetching albums:", albumsError);
        } else {
          const album = albums[0];

          const mappedAlbum = {
            id: album.id,
            title: album.title,
            artist: album.user?.username,
          };

          setAlbum(mappedAlbum);

          const { data: songs, error: songsError } = await supabase
            .from("songs")
            .select("id, title, order_number")
            .eq("album_id", Number(id));

          if (songsError) {
            console.error("Error fetching songs:", songsError);
          } else {
            const mappedSongs: Song[] = songs.map((song) => ({
              id: song.id,
              title: song.title || undefined,
              order_number: song.order_number || undefined,
            }));

            setSongs(mappedSongs);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  function PlayElement(song_id: number | null | undefined) {
    if (song_id !== null && song_id !== undefined) {
      console.log(`Playing Id: ${song_id}`);
      setPlayingSongId(String(song_id));
    } //todo DRY this
  }

  return (
    <div id="songGroupPage">
      <div id="songGroup" className="">
        {imageUrl && <img src={imageUrl} alt="" className="songGroupImg" />}

        <div id="songGroupInfo">
          <span className="normalText ">Album</span>
          <h1 className="lowerLineHeight">{album?.title}</h1>
          <span className="normalText ">{album?.artist}</span>
        </div>
      </div>
      <div id="songGroupList">
        {songs.map((song) => (
          <div
            key={song.id}
            className="songGroupListElement"
            onClick={() => PlayElement(song.id)}
          >
            <span className="songGroupListElementOrderNumber">
              {song.order_number}
            </span>
            <div className="songGroupListElementInfo">
              <span className=" normalText">{song.title}</span>
              <span className=" ">{album?.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
