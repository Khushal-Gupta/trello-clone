import { useCallback, useContext, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { MdTitle } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";

import classes from "./TitleComponent.module.css";
import { CardListContext } from "../../context/cardlist-context";

export default function TitleComponent({ cardId }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    setCardTitle,
    title: listTitle,
    listOfCard,
  } = useContext(CardListContext);

  const { title } = listOfCard.find((card) => card.id === cardId);

  const textareaRef = useRef(null);
  const onBlurTitleFieldHandler = (event) => {
    const value = event.target.value;
    if (value) {
      setCardTitle(cardId, value);
      setIsEditMode(false);
    }
  };

  const handleAutoHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [textareaRef]);

  useEffect(() => {
    handleAutoHeight();
  }, [handleAutoHeight]);

  return (
    <div className={classes.titleWrapper}>
      <div
        className={clsx(classes.centerInsideContent, classes.titleIconWrapper)}
      >
        <MdTitle className={classes.iconStyle} />
      </div>
      <div className={classes.titleDetailsWrapper}>
        <textarea
          ref={textareaRef}
          className={clsx(
            isEditMode
              ? classes.titleFieldEditMode
              : classes.titleFieldNotEditMode
          )}
          rows="1"
          onClick={() => {
            setIsEditMode(true);
          }}
          onBlur={onBlurTitleFieldHandler}
          defaultValue={title}
          onChange={handleAutoHeight}
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
