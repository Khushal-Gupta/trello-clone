import { useCallback, useContext, useEffect, useRef, useState } from "react";
import classes from "./TitleComponent.module.css";
import { MdTitle } from "react-icons/md";
import clsx from "clsx";
import { AiOutlineEye } from "react-icons/ai";
import { IconContext } from "react-icons";
import { CardListContext } from "../../context/cardlist-context";

export default function TitleComponent({ cardId }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const cardListContext = useContext(CardListContext);
  const { setCardTitle, title: listTitle } = cardListContext;
  const { title } = cardListContext.listOfCard.find(
    (elem) => elem.id === cardId
  );

  const textareaRef = useRef(null);
  const onBlurTitleFieldHandler = (event) => {
    const value = event.target.value;
    console.log(value);
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
          defaultValue={title}
          onChange={(event) => {
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
