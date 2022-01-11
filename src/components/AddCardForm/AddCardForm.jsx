import clsx from "clsx";
import { Fragment, useContext, useState } from "react";
import { CardListContext } from "../../context/cardlist-context";
import classes from "./AddCardForm.module.css";

const AddCardForm = (props) => {
  const { showNewCardEditor, setShowNewCardEditor } = props;
  const [newCardTitle, setNewCardTitle] = useState("");

  const { addCard } = useContext(CardListContext);

  const addCardHandler = (event) => {
    const value = newCardTitle;
    if (value) {
      addCard(value);
    }
    setNewCardTitle("");
    setShowNewCardEditor(true);
  };
  const onChangeNewCardTitle = (event) => {
    setNewCardTitle(event.target.value);
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
          <textarea
            className={classes.addNewCardTextarea}
            value={newCardTitle}
            onChange={onChangeNewCardTitle}
            placeholder="Enter a title for this card.."
            autoFocus
            style={{ width: "100%", border: "none" }}
            rows={3}
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
