import { useContext, useRef, useState } from "react";
import { MdOutlineDescription } from "react-icons/md";
import { VscClose } from "react-icons/vsc";
import clsx from "clsx";

import { CardContext } from "../../../context/card-context";
import AutoHeightTextarea from "../../TextArea";
import classes from "./DescriptionComponent.module.css";

export default function DescriptionComponent({ cardId }) {
  const textareaRef = useRef(null);
  const { cardDescription, setCardDescription } = useContext(CardContext);
  const setDescription = (value) => {
    setCardDescription(cardId, value);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <div className={classes.descriptionWrapper}>
      <div className={classes.descriptionHeaderWrapper}>
        <div
          className={clsx(
            classes.centerInsideContent,
            classes.descriptionIconWrapper
          )}
        >
          <MdOutlineDescription className={classes.iconStyle} />
        </div>

        <div className={classes.descriptionHeader}>Description</div>
        <button
          className={clsx(classes.modalButton, classes.descriptionEditButton)}
          type="button"
          onClick={() => {
            setIsEditMode(true);
          }}
        >
          Edit
        </button>
      </div>
      <div className={classes.descriptionFooterWrapper}>
        <div className={classes.descriptionFooterWrapperPrefix} />
        {!isEditMode && (
          <div
            className={clsx(classes.lightTextClass, classes.actualDescription)}
          >
            {cardDescription}
          </div>
        )}
        {isEditMode && (
          <div className={classes.descriptionEditModeWrapper}>
            <AutoHeightTextarea
              ref={textareaRef}
              className={classes.descriptionTextarea}
              placeholder="Add a more detailed description"
              autoFocus
              defaultValue={cardDescription}
            />

            <div className={classes.descriptionEditorActionsWrapper}>
              <button
                className={classes.descriptionEditorSaveButton}
                onClick={() => {
                  let newDescription = textareaRef.current?.value ?? "";
                  setDescription(newDescription);
                  setIsEditMode(false);
                }}
              >
                Save
              </button>
              <button
                type="button"
                className={classes.descriptionEditorCloseButton}
                onClick={() => {
                  setIsEditMode(false);
                }}
              >
                <VscClose className={classes.iconStyle} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
