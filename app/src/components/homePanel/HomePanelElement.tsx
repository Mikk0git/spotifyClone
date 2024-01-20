import "./HomePanelElement.css";

interface HomePanelElementProps {
  title: string;
  otherInfo: string;
  imgPath: string;
}

export function HomePanelElement({
  title,
  otherInfo,
  imgPath,
}: HomePanelElementProps) {
  return (
    <div className="homePanelElement">
      <img src={imgPath} alt="" />
      <span className="normalText homePanelElementNormalText">{title}</span>
      <span className="otherInfoText homePanelElementOtherText">
        {otherInfo}
      </span>
    </div>
  );
}
