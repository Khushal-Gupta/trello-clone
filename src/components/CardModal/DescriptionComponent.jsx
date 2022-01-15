import { useContext, useState } from "react";
import classes from "./DescriptionComponent.module.css";
import { MdOutlineDescription } from "react-icons/md";
import { VscClose } from "react-icons/vsc";
import clsx from "clsx";
import { CardListContext } from "../../context/cardlist-context";

export default function DescriptionComponent({ cardId }) {
  const { listOfCard, setCardDescription } = useContext(CardListContext);
  const { description } = listOfCard.find((elem) => elem.id === cardId);
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
            {description}
          </div>
        )}
        {isEditMode && (
          <div
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <textarea
              className={classes.descriptionTextarea}
              placeholder="Add a more detailed description"
              onBlur={(event) => {
                setDescription(event.target.value);
              }}
              autoFocus
              defaultValue={description}
            />

            <div className={classes.descriptionEditorActionsWrapper}>
              <button
                className={classes.descriptionEditorSaveButton}
                onClick={() => {
                  setIsEditMode(false);
                }}
              >
                Save
              </button>
              <button
                type="button"
                className={classes.descriptionEditorCloseButton}
                onClick={() => {
                  setDescription(description);
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
