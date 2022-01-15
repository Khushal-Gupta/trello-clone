import { useContext, useRef, useState } from "react";
import clsx from "clsx";
import { MdTitle } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

import classes from "./TitleComponent.module.css";
import { CardListContext } from "../../context/cardlist-context";
import AutoHeightTextarea from "../autoHeightTextarea";

export default function TitleComponent({ cardId }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    setCardTitle,
    title: listTitle,
    listOfCard,
  } = useContext(CardListContext);

  const { title } = listOfCard.find((card) => card.id === cardId);

  const textareaRef = useRef(null);
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
          ref={textareaRef}
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
          defaultValue={title}
        />
        <div
          className={clsx(classes.lightTextClass, classes.listTitleRowWrapper)}
        >
          <div>
            {"in list "}
            <span
              className={clsx(classes.lightTextClass, classes.listTitleButton)}
            >
              {listTitle}
            </span>
          </div>
          <div
            className={clsx(
              classes.outlineEyeWrapper,
              classes.centerInsideContent
            )}
          >
            <AiOutlineEye />
          </div>
        </div>
      </div>
    </div>
  );
}
