import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./AddCardListButton.module.css";

export default function AddCardListButton({ onAdd, passedClasses }) {
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
      setnewListTitle("");
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
        className={clsx(classes.notEditingWrapper, passedClasses)}
      >
        + Add another list
      </button>
    );

  return (
    <div
      className={clsx(classes.editingModeWrapper, passedClasses)}
      ref={inputFormRef}
    >
      <input
        type="text"
        value={newListTitle}
        onChange={onChangeTitleHandler}
        autoFocus
        spellCheck="false"
      />
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
          <AiOutlineClose />
        </button>
      </div>
    </div>
  );
}
