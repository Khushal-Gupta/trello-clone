import clsx from "clsx";
import { AiOutlineClockCircle, AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import { FiMove } from "react-icons/fi";
import { HiOutlineTemplate } from "react-icons/hi";
import {
  MdLabelOutline,
  MdOutlineAttachment,
  MdOutlineContentCopy,
  MdPeopleOutline,
  MdOutlineChecklistRtl,
} from "react-icons/md";
import classes from "./SideActionsComponent.module.css";

export default function SideActionsComponent() {
  const addToCardActionItems = [
    { icon: <MdPeopleOutline />, label: "Members" },
    { icon: <MdLabelOutline />, label: "Labels" },
    { icon: <MdOutlineChecklistRtl />, label: "Checkist" },
    { icon: <AiOutlineClockCircle />, label: "Dates" },
    { icon: <MdOutlineAttachment />, label: "Attachment" },
  ];
  const actionsItems = [
    { icon: <FiMove />, label: "Move" },
    { icon: <MdOutlineContentCopy />, label: "Copy" },
    { icon: <HiOutlineTemplate />, label: "Template" },
    { icon: <AiOutlineEye />, label: "Watch" },
  ];
  return (
    <div
      style={{
        flex: "1",
        marginLeft: "0.8rem",
      }}
    >
      <div className={classes.heading}>Add to Card</div>
      {addToCardActionItems.map((elem, index) => (
        <CardActionItem
          key={"1st" + index}
          icon={elem.icon}
          label={elem.label}
        />
      ))}
      <div className={classes.heading}>Actions</div>
      {actionsItems.map((elem, index) => (
        <CardActionItem
          key={"2nd" + index}
          icon={elem.icon}
          label={elem.label}
        />
      ))}
    </div>
  );
}

const CardActionItem = ({ icon, label }) => {
  return (
    <button
      className={clsx(classes.cardActionItemWrapper, classes.modalButton)}
    >
      <div
        className={clsx(
          classes.cardActionItemIconWrapper,
          classes.centerInsideContent
        )}
      >
        <IconContext.Provider
          value={{ className: classes.cardActionItemIconStyles }}
        >
          {icon}
        </IconContext.Provider>
      </div>
      <div className={classes.cardActionItemLabel}>{label}</div>
    </button>
  );
};
