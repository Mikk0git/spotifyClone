import "./LibraryListElement.css";

interface LibraryListElementProps {
  title: string;
  artist: string;
  type: string;
  imgPath: string;
}

export function LibraryListElement({
  title,
  artist,
  type,
  imgPath,
}: LibraryListElementProps) {
  return (
    <div className="libraryListElement">
      <img src={imgPath} alt="" className="libraryListImg" />
      <div className="libraryListElementInfo textMargin">
        <span className="normalText ">{title}</span>
        <span className="otherInfoText ">
          {type} • {artist}
        </span>
      </div>
    </div>
  );
}
