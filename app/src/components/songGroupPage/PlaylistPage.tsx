import { Link, useParams } from "react-router-dom";
import "./SongGroupPage.css";
import { useContext, useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { playingSongContext } from "../../Context/playingSong";

interface Song {
  id: number | null | undefined;
  title: string | undefined;
  order_number: number | undefined;
  album_title: string | undefined;
  album_id: number | null | undefined;
  album_cover_url: string | undefined;
  artist: string | undefined;
  artist_id: number | null | undefined;
}

interface Playlist {
  id: number | null;
  title: string | null | undefined;
  artist: string | null | undefined;
}

export function PlaylistPage() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState<Playlist>();
  const [songs, setSongs] = useState<Song[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { setPlayingSongId } = useContext(playingSongContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await supabase.storage
          .from(`playlistCovers`)
          .getPublicUrl(id + ".png");

        setImageUrl(data?.publicUrl || null);

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

          setPlaylist(mappedPlaylist);

          const { data: songs, error: songsError } = await supabase
            .from("playlists_songs")
            .select(
              "songs(id,title,order_number,albums(title,id,users!albums_user_id_fkey(username,id)))"
            ) //todo change order number
            .eq("playlist_id", Number(id));

          if (songsError) {
            console.error("Error fetching songs:", songsError);
          } else {
            const mappedSongs: Song[] = await Promise.all(
              songs.map(async (song) => {
                const album_id = song.songs?.albums?.id;
                const data = await supabase.storage
                  .from(`albumCovers`)
                  .getPublicUrl(`${album_id}.png`);

                return {
                  id: song.songs?.id,
                  title: song.songs?.title || undefined,
                  order_number: song.songs?.order_number || undefined,
                  album_title: song.songs?.albums?.title || undefined,
                  album_id,
                  album_cover_url: data?.data.publicUrl || undefined,
                  artist: song.songs?.albums?.users?.username || undefined,
                  artist_id: song.songs?.albums?.users?.id || undefined,
                };
              })
            );

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
          <span className="normalText ">Playlist</span>
          <h1 className="lowerLineHeight">{playlist?.title}</h1>
          <span className="normalText ">{playlist?.artist}</span>
        </div>
      </div>
      <div id="songGroupList">
        {songs.map((song) => (
          <div key={song.id} className="songGroupListElement">
            <span
              className="songGroupListElementOrderNumber"
              onClick={() => PlayElement(song.id)}
            >
              {song.order_number}
            </span>
            {song.album_cover_url && (
              <img
                src={song.album_cover_url}
                alt=""
                className="playlistImg"
                onClick={() => PlayElement(song.id)}
              />
            )}

            <div className="songGroupListElementInfo">
              <span
                className=" normalText"
                onClick={() => PlayElement(song.id)}
              >
                {song.title}
              </span>
              <Link to={`/user/${song.artist_id}`}>
                <span className="">{song?.artist}</span>
              </Link>
            </div>

            <div className="songGroupListElementAlbumTitle">
              <Link to={`/album/${song.album_id}`}>
                <span className="">{song.album_title}</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
