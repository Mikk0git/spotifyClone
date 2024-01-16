import "./LibraryListElement.css";

export function LibraryListElement() {
  return (
    <div className="libraryListElement">
      <img src="/bs1.png" alt="" className="libraryListImg" />
      <div className="libraryListElementInfo textMargin">
        <span className="normalText ">Towards the Lonely Wind</span>
        <span className="libraryListElementInfoAuthor ">
          Album • Blissing Stratus
        </span>
      </div>
    </div>
  );
}
