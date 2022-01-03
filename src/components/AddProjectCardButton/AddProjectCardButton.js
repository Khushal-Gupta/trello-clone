import { useState, useRef, useEffect } from "react";
import classes from "./AddProjectCardButton.module.css";

export default function AddProjectCardButton({ onAdd }) {
  const [editingMode, setEditingMode] = useState(false);
  const [newListTitle, setnewListTitle] = useState("");
  const inputFormRef = useRef(null);

  const onChangeTitleHandler = (event) => {
    setnewListTitle(event.target.value);
  };

  const onConfirmAddHandler = () => {
    if (newListTitle) {
      onAdd(newListTitle);
      setEditingMode(false);
      setnewListTitle('');
    }
  };

  const onCancel = () => {
    setEditingMode(false);
  };

  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (
        editingMode &&
        inputFormRef.current &&
        !inputFormRef.current.contains(event.target)
      ) {
        setEditingMode(false);
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, [editingMode]);

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
    <div className={classes.editingModeWrapper} ref={inputFormRef}>
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
