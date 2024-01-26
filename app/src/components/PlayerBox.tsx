import "./PlayerBox.css";
import { useContext, useEffect, useState } from "react";
import { playingSongContext } from "../Context/playingSong";
import supabase from "./supabaseClient";

interface Song {
  title: string | null;
  album_title: string | null | undefined;
  album_id: number | null | undefined;
  artist: string | null | undefined;
}

export function PlayerBox() {
  const [songUrl, setSongUrl] = useState("");
  const [albumCoverUrl, setAlbumCoverUrl] = useState("");
  const [songData, setSongData] = useState<Song>({
    title: null,
    album_title: null,
    album_id: null,
    artist: null,
  });

  const playingSong = useContext(playingSongContext);

  useEffect(() => {
    const fetchData = async () => {
      //fetching the song
      const { data: songData } = await supabase.storage
        .from("songs")
        .getPublicUrl(playingSong.playingSongId + ".mp3");

      setSongUrl(songData?.publicUrl);

      // I dont know why but when i fetch all the data in one query I get an error
      // This code looks awful but it works
      const { data: songs, error: songsError } = await supabase
        .from("songs")
        .select("title, albums(title, id)")
        .eq("id", playingSong.playingSongId);

      if (songsError) {
        console.error(songsError);
      } else {
        if (songs && songs.length > 0) {
          const song = songs[0];

          const { data: albums, error: albumsError } = await supabase
            .from("albums")
            .select("users!albums_user_id_fkey(username)")
            .eq("id", String(song.albums?.id));

          if (albumsError) {
            console.error(albumsError);
          } else {
            if (albums && albums.length > 0) {
              const album = albums[0];

              const mappedSong = {
                title: song.title,
                album_title: song.albums?.title,
                album_id: song.albums?.id,
                artist: album.users?.username,
              };

              setSongData(mappedSong);

              //fetching the album cover
              const { data } = await supabase.storage
                .from("albumCovers")
                .getPublicUrl(song.albums?.id + ".png");

              // console.log("Fetched AlbumCover URL:", data);
              setAlbumCoverUrl(data?.publicUrl);
            }
          }
        }
      }
    };

    fetchData();
  }, [playingSong.playingSongId]);

  return (
    <div id="playerBox">
      <div className="playerSection" id="nowPlayingSong">
        {albumCoverUrl && <img src={albumCoverUrl} alt="" />}
        <div id="songInfo">
          <span className="normalText">{songData.title}</span>
          <span className="otherInfoText">{songData.artist}</span>
        </div>
        <button>
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      <div className="playerSection" id="playerControls">
        {songUrl && <audio src={songUrl} autoPlay controls />}
        <div id="playerControlsButtons">
          <button>
            <span className="material-symbols-outlined">shuffle</span>
          </button>
          <button>
            <span className="material-symbols-outlined">skip_previous</span>
          </button>
          <button>
            <span className="material-symbols-outlined">play_circle</span>
          </button>
          <button>
            <span className="material-symbols-outlined">skip_next</span>
          </button>
          <button>
            <span className="material-symbols-outlined">repeat</span>
          </button>
        </div>
      </div>
      <div className="playerSection" id="playerOtherOptions">
        <button>
          <span className="material-symbols-outlined">slideshow</span>
        </button>
        <button>
          <span className="material-symbols-outlined">queue_music</span>
        </button>
        <div id="volumeControls">
          <span className="material-symbols-outlined">volume_up</span>
        </div>
      </div>
    </div>
  );
}
