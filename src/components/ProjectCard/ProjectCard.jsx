import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import SubCard from "../SubCard/SubCard";
import classes from "./ProjectCard.module.css";

const ProjectCard = ({ title, passedClasses }) => {
  const [cardList, setCardList] = useState(["First Sub Card"]);
  const [showNewSubCardEditor, setShowNewSubCardEditor] = useState(false);
  const [newSubCardTitle, setNewSubCardTitle] = useState("");
  const projectCardRef = useRef(null);

  const addCardHandler = (event) => {
    const value = newSubCardTitle;
    if (value) {
      setCardList((prev) => [...prev, value]);
      setNewSubCardTitle("");
    }
    setShowNewSubCardEditor(true);
  };
  const onChangeNewSubCardTitle = (event) => {
    setNewSubCardTitle(event.target.value);
  };

  const onCancelEditingNewCard = () => {
    setShowNewSubCardEditor(false);
    setNewSubCardTitle("");
  };

  useEffect(() => {
    const outsideClickHandler = (event) => {
      // console.log(title);
      // console.log(event.target);
      // console.log(projectCardRef.current.contains(event.target), title);
      if (
        projectCardRef.current &&
        !projectCardRef.current.contains(event.target)
      ) {
        setShowNewSubCardEditor(false);
        setNewSubCardTitle("");
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div className={clsx(classes.wrapper, passedClasses)} ref={projectCardRef} >
      <h3 className={classes.header}>{title}</h3>
      <ul className={classes.cardList}>
        {cardList.map((elem, index) => (
          <li key={index}>
            <SubCard title={elem} />
          </li>
        ))}
      </ul>
      {showNewSubCardEditor && (
        <textarea
          value={newSubCardTitle}
          onChange={onChangeNewSubCardTitle}
          placeholder="Enter Something...."
          autoFocus
          style={{ width: "100%", border: "none" }}
          rows={3}
        ></textarea>
      )}
      <div
        className={clsx(
          classes.buttonWrapper,
          showNewSubCardEditor && classes.hidden
        )}
      >
        <button onClick={addCardHandler}>+ Add Card</button>
      </div>

      {showNewSubCardEditor && (
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
};

export default ProjectCard;
