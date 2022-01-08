import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Card from "../Card";
import classes from "./CardList.module.css";

export default function CardList({ title, passedClasses }) {
  const [cardList, setCardList] = useState(["First Card"]);
  const [showNewCardEditor, setShowNewCardEditor] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const taskListRef = useRef(null);

  const addCardHandler = (event) => {
    const value = newCardTitle;
    if (value) {
      setCardList((prev) => [...prev, value]);
      setNewCardTitle("");
    }
    setShowNewCardEditor(true);
  };
  const onChangeNewCardTitle = (event) => {
    setNewCardTitle(event.target.value);
  };

  const onCancelEditingNewCard = () => {
    setShowNewCardEditor(false);
    setNewCardTitle("");
  };

  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (taskListRef.current && !taskListRef.current.contains(event.target)) {
        setShowNewCardEditor(false);
        setNewCardTitle("");
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div className={clsx(classes.wrapper, passedClasses)} ref={taskListRef}>
      <h3 className={classes.header}>{title}</h3>
      <ul className={classes.cardList}>
        {cardList.map((elem, index) => (
          <Card cardTitle={elem} key={index} listTitle={title}/>
        ))}
      </ul>
      {showNewCardEditor && (
        <textarea
          value={newCardTitle}
          onChange={onChangeNewCardTitle}
          placeholder="Enter Something...."
          autoFocus
          style={{ width: "100%", border: "none" }}
          rows={3}
        />
      )}
      <div
        className={clsx(
          classes.buttonWrapper,
          showNewCardEditor && classes.hidden
        )}
      >
        <button onClick={addCardHandler}>+ Add Card</button>
      </div>

      {showNewCardEditor && (
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
      )}
    </div>
  );
}
