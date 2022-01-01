import { Fragment, useRef, useState } from "react";
import AddSubCardButton from "../AddSubCardButton/AddSubCardButton";
import SubCard from "../SubCard/SubCard";
import classes from "./ProjectCard.module.css";

const ProjectCard = ({ title }) => {
  const [cardList, setCardList] = useState(["First Sub Card"]);
  const [showNewSubCardEditor, setShowNewSubCardEditor] = useState(false);
  const [newSubCardTitle, setNewSubCardTitle] = useState("");
  const textareaRef = useRef();

  const addCardHandler = (newSubCard) => {
    setCardList((prev) => [...prev, newSubCard]);
  };
  const onChangeNewSubCardTitle = (event) => {
    setNewSubCardTitle(event.target.value);
  };
  const onBlurNewSubCardEditing = (event) => {
    // const value = event.target.value;
    // if (value) {
    //   addCardHandler(value);
    // }
    // setShowNewSubCardEditor(false);
    // setNewSubCardTitle("");
  };

  return (
    <Fragment>
      <div className={classes.wrapper}>
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
            ref={textareaRef}
            value={newSubCardTitle}
            onChange={onChangeNewSubCardTitle}
            onBlur={onBlurNewSubCardEditing}
            placeholder="Enter Something...."
            autoFocus
            style={{ width: "100%", border: "none" }}
            rows={3}
          ></textarea>
        )}
        <AddSubCardButton
          onAdd={() => {
            const value = newSubCardTitle;
            if (value) {
              addCardHandler(value);
            }
            setShowNewSubCardEditor(true);
            setNewSubCardTitle("");
          }}
          onCancel={() => {
            setShowNewSubCardEditor(false);
            setNewSubCardTitle("");
          }}
          showCancel={showNewSubCardEditor}
        />
      </div>
    </Fragment>
  );
};

export default ProjectCard;
