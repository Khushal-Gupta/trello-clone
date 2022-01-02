import { useState } from "react";
import CreateTaskForm from "../CreateTaskForm/CreateTaskForm";
import SubCard from "../SubCard/SubCard";
import classes from "./ProjectCard.module.css";

const ProjectCard = ({ title }) => {
  const [cardList, setCardList] = useState(["First Sub Card"]);
  const [showNewSubCardEditor, setShowNewSubCardEditor] = useState(false);

  const addCardHandler = (title) => {
    if (title) {
      setCardList((prev) => [...prev, title]);
    }
  };

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.header}>{title}</h3>
      <ul className={classes.cardList}>
        {cardList.map((elem, index) => (
          <li key={index}>
            <SubCard title={elem} />
          </li>
        ))}
      </ul>
      {showNewSubCardEditor ? (
        <CreateTaskForm
          showNewSubCardEditor={showNewSubCardEditor}
          setShowNewSubCardEditor={setShowNewSubCardEditor}
          addCardHandler={addCardHandler}
        />
      ) : (
        <button
          style={{
            border: "none",
            width: "100%",
            backgroundColor: "#f77f00",
            color: "white",
            padding: "0.5rem 0rem",
            fontSize: "1rem",
            fontWeight: 700,
            borderRadius: "3px",
            cursor: "pointer",
          }}
          onClick={() => setShowNewSubCardEditor(true)}
        >
          + Add New Task
        </button>
      )}
      {/* {showNewSubCardEditor && (
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
        /> */}
    </div>
  );
};

export default ProjectCard;
