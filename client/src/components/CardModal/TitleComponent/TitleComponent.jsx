import { useContext, useState } from "react";
import clsx from "clsx";
import { MdTitle } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

import classes from "./TitleComponent.module.css";
import { CardContext } from "../../../context/card-context";
import AutoHeightTextarea from "../../TextArea";

export default function TitleComponent({ cardId }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const { setCardTitle, cardlistTitle, cardTitle } = useContext(CardContext);

  const onBlurTitleFieldHandler = (value) => {
    if (value) {
      setCardTitle(cardId, value);
      setIsEditMode(false);
    }
  };

  return (
    <div className={classes.titleWrapper}>
      <div
        className={clsx(classes.centerInsideContent, classes.titleIconWrapper)}
      >
        <MdTitle className={classes.iconStyle} />
      </div>
      <div className={classes.titleDetailsWrapper}>
        <AutoHeightTextarea
          className={clsx(
            isEditMode
              ? classes.titleFieldEditMode
              : classes.titleFieldNotEditMode
          )}
          rows="1"
          onFocus={() => {
            setIsEditMode(true);
          }}
          onBlur={onBlurTitleFieldHandler}
          defaultValue={cardTitle}
        />
        <div
          className={clsx(classes.lightTextClass, classes.listTitleRowWrapper)}
        >
          <div className={classes.listTitleInlineWrapper}>
            {"in list"}
            <span
              className={clsx(classes.lightTextClass, classes.listTitleButton)}
            >
              {cardlistTitle}
            </span>
          </div>

          <AiOutlineEye className={clsx(classes.outlineEyeWrapper)} />
        </div>
      </div>
    </div>
  );
}
