import { Navigate, useParams } from "react-router-dom";
import "./SongGroupPage.css";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { playingSongContext } from "../../Context/playingSong";

interface Song {
  id: number | null | undefined;
  title: string | undefined;
  order_number: number | undefined;
}

interface SongGroup {
  id: number | null;
  title: string | null | undefined;
  artist: string | null | undefined;
}

export function SongGroupPage() {
  const { type, id } = useParams();
  const [songGroup, setSongGroup] = useState<SongGroup>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { setPlayingSongId } = useContext(playingSongContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.storage
          .from(`${type}Covers`)
          .getPublicUrl(id + ".png");

        setImageUrl(data?.publicUrl || null);

        if (type == "album") {
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

            setSongGroup(mappedAlbum);

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
        } else {
          setSongs([]);
          const { data: playlists, error: playlistsError } = await supabase
            .from("playlists")
            .select("id, title, user: users!playlists_user_id_fkey(username)")
            .eq("id", Number(id));

          if (playlistsError) {
            console.error("Error fetching playlists:", playlistsError);
          } else {
            const playlist = playlists[0];

            const mappedPlaylist = {
              id: playlist.id,
              title: playlist.title,
              artist: playlist.user?.username,
            };

            setSongGroup(mappedPlaylist);

            const { data: songs, error: songsError } = await supabase
              .from("playlists_songs")
              .select("songs(id,title,order_number)")
              .eq("playlist_id", Number(id));

            if (songsError) {
              console.error("Error fetching songs:", songsError);
            } else {
              const mappedSongs: Song[] = songs.map((song) => ({
                id: song.songs?.id,
                title: song.songs?.title || undefined,
                order_number: song.songs?.order_number || undefined,
              }));

              setSongs(mappedSongs);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (type === "album" || type === "playlist") {
      fetchData();
    } else {
      <Navigate to="/" />;
    }
  }, [type, id]);

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
          <span className="normalText ">{type}</span>
          <h1 className="lowerLineHeight">{songGroup?.title}</h1>
          <span className="normalText ">{songGroup?.artist}</span>
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
              <span className=" ">{songGroup?.artist}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
