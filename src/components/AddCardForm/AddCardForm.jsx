import clsx from "clsx";
import { Fragment, useContext, useRef, useState } from "react";
import { CardListContext } from "../../context/cardlist-context";
import AutoHeightTextarea from "../autoHeightTextarea/AutoHeightTextarea";
import classes from "./AddCardForm.module.css";

const AddCardForm = (props) => {
  const { showNewCardEditor, setShowNewCardEditor } = props;
  const [newCardTitle, setNewCardTitle] = useState("");
  const textareaRef = useRef(null);

  const { addCard } = useContext(CardListContext);

  const addCardHandler = (event) => {
    const value = newCardTitle;
    if (value) {
      addCard(value);
    }
    setNewCardTitle("");
    setShowNewCardEditor(true);
  };
  const onChangeNewCardTitle = (value) => {
    setNewCardTitle(value);
  };

  const onCancelEditingNewCard = () => {
    setShowNewCardEditor(false);
    setNewCardTitle("");
  };
  return (
    <Fragment>
      <div
        className={clsx(
          classes.buttonWrapper,
          showNewCardEditor && classes.hidden
        )}
      >
        <button
          onClick={() => {
            setNewCardTitle("");
            setShowNewCardEditor(true);
          }}
        >
          + Add Card
        </button>
      </div>
      {showNewCardEditor && (
        <div>
          <AutoHeightTextarea
            ref={textareaRef}
            placeholder="Enter a title for this card.."
            className={classes.addNewCardTextarea}
            onChange={onChangeNewCardTitle}
            value={newCardTitle}
            autoFocus
          />

          <div className={classes.editingModeWrapper}>
            <button
              type="button"
              className={classes.addButton}
              onClick={addCardHandler}
            >
              + Add Card
            </button>
            <button
              type="button"
              className={classes.cancelButton}
              onClick={onCancelEditingNewCard}
            >
              x
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AddCardForm;
