import clsx from "clsx";
import { Fragment, useContext, useRef, useState } from "react";
import { VscAdd as AddIcon } from "react-icons/vsc";

import { CardListContext } from "../../context/cardlist-context";
import AutoHeightTextarea from "../autoHeightTextarea/AutoHeightTextarea";
import classes from "./AddCardForm.module.css";

const AddCardForm = ({ showNewCardEditor, setShowNewCardEditor }) => {
  const [newCardTitle, setNewCardTitle] = useState("");
  const textareaRef = useRef(null);

  const { addCard } = useContext(CardListContext);

  const addCardHandler = () => {
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

  return (
    <Fragment>
      <button
        className={clsx(
          classes.addButton,
          showNewCardEditor && classes.hidden
        )}
        onClick={() => {
          setNewCardTitle("");
          setShowNewCardEditor(true);
        }}
      >
        <AddIcon />
        <div className={classes.addCardLabel}>Add Card</div>
      </button>

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
              <AddIcon />
              <div className={classes.addCardLabel}>Add Card</div>
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AddCardForm;
