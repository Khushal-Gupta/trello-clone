import { useState } from "react";
import classes from "./AddProjectCardButton.module.css";

export default function AddProjectCardButton({ onAdd }) {
  const [editingMode, setEditingMode] = useState(false);
  const [newListTitle, setnewListTitle] = useState("");

  const onChangeTitleHandler = (event) => {
    setnewListTitle(event.target.value);
  };

  const onConfirmAddHandler = () => {
    if (newListTitle) {
      onAdd(newListTitle);
      setEditingMode(false);
    }
  };

  const onCancel = () => {
    setEditingMode(false);
  };

  if (!editingMode)
    return (
      <button
        onClick={() => {
          setEditingMode(true);
        }}
        className={classes.notEditingWrapper}
      >
        + Add another list
      </button>
    );

  return (
    <div className={classes.editingModeWrapper}>
      <input type="text" value={newListTitle} onChange={onChangeTitleHandler} />
      <div className={classes.buttonWrapper}>
        <button
          type="button"
          className={classes.addButton}
          onClick={onConfirmAddHandler}
        >
          + Add List
        </button>
        <button
          type="button"
          className={classes.cancelButton}
          onClick={onCancel}
        >
          X
        </button>
      </div>
    </div>
  );
}
