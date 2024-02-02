import { useEffect, useState } from "react";
import "./LibraryBox.css";
import { LibraryListElement } from "./LibraryListElement";
import supabase from "./supabaseClient";

interface SongGroup {
  title: string | null;
  user: string | null;
  created_at: string | undefined;
  type: "album" | "playlist";
  id: string | null | undefined;
}

export function LibraryBox() {
  const [songGroups, setSongGroups] = useState<SongGroup[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data: albumsData, error: albumsError } = await supabase
        .from("liked_albums")
        .select(
          "album_id,albums(title,created_at, users!albums_user_id_fkey(username))"
        )
        .eq("user_id", "2bd7c640-3bc9-4b3d-a3fb-5c3fe74cbac7"); // Replace with the actual user ID

      const { data: playlistsData, error: playlistsError } = await supabase
        .from("liked_playlists")
        .select(
          "playlist_id,playlists!inner(title,created_at,users!playlists_user_id_fkey(username))"
        )
        .eq("user_id", "2bd7c640-3bc9-4b3d-a3fb-5c3fe74cbac7");

      if (albumsError) {
        console.error("Error fetching albums:", albumsError);
        return;
      }

      if (playlistsError) {
        console.error("Error fetching playlists:", playlistsError);
        return;
      }

      // console.log("Fetched Albums in library:", albumsData);
      // console.log("Fetched Playlists in library:", playlistsData);

      const mappedAlbums: SongGroup[] = albumsData.map((albumData) => ({
        title: albumData.albums?.title || "Unknown Title",
        user: albumData.albums?.users?.username || "Unknown Artist",
        id: albumData.album_id,
        type: "album",
        created_at: albumData.albums?.created_at,
      }));

      const mappedPlaylists: SongGroup[] = playlistsData.map(
        (playlistData) => ({
          title: playlistData.playlists?.title || "Unknown Title",
          user: playlistData.playlists?.users?.username || "Unknown Artist",
          id: playlistData.playlist_id,
          type: "playlist",
          created_at: playlistData.playlists?.created_at,
        })
      );

      const combinedSongGroups = mappedPlaylists.concat(mappedAlbums);
      combinedSongGroups.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
        return 0; // Handle the case where created_at is null or undefined
      });

      // console.log("Combined Song Groups:", combinedSongGroups);

      setSongGroups(combinedSongGroups);
    };

    fetchData();
  }, []);

  return (
    <div id="libraryBox" className="appBox">
      <div id="menuBoxYourLibrary" className="menuBoxElement">
        <span className="material-symbols-rounded">menu</span>
        <span className="normalText textMargin">Your Library</span>
      </div>
      {songGroups && (
        <div id="libraryList">
          {songGroups.map((songGroup) => (
            <LibraryListElement
              title={songGroup.title || "Unknown Title"}
              artist={songGroup.user || "Unknown User"}
              type={songGroup.type}
              id={songGroup.id || "undefined"}
            />
          ))}
        </div>
      )}
    </div>
  );
}
