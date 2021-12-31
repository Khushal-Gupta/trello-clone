import { Fragment, useState } from "react";
import AddCardButton from "./AddCardButton";
import classes from "./ProjectCard.module.css";
import SubCard from "./SubCard";

const ProjectCard = (props) => {
  const cardList = props.object.state.items || [];
  const addCardHandler = () => {
    props.object.addNewCard("This is a new card");
    props.onAddCard();
  };
  return (
    <Fragment>
      <div className={classes.wrapper}>
        <h3 className={classes.header}>{props.state.title}</h3>
        <ul style={{ listStyle: "none", padding: "0rem", margin: "0rem" }}>
          {cardList.map((elem) => (
            <li key={elem.state.id}>
              <SubCard state={elem.state} object={elem} />
            </li>
          ))}
        </ul>
        <AddCardButton onClick={addCardHandler} />
      </div>
    </Fragment>
  );
};

export default ProjectCard;
