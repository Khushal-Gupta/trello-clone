import { useCallback, useEffect, useRef, useState } from "react";
import classes from "./TitleComponent.module.css";
import { MdTitle } from "react-icons/md";
import clsx from "clsx";
import { AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";

export default function TitleComponent({
  cardTitle: passedCardTitle,
  listTitle,
  cardTitleChangeHandler,
}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(passedCardTitle);
  const textareaRef = useRef(null);
  const onBlurTitleFieldHandler = (event) => {
    const value = event.target.value;
    if (value) {
      cardTitleChangeHandler(value);
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
        <IconContext.Provider value={{ className: classes.iconStyle }}>
          <MdTitle />
        </IconContext.Provider>
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
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
            handleAutoHeight();
          }}
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
