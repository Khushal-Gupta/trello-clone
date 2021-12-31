import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { DUMMY_PROJECT_CARDS } from "../models/ProjectCardModel";
import classes from "./ProjectCardList.module.css";

const ProjectCardList = () => {
  const [state, setState] = useState("");
  const addCardHandler = () => {
    console.log("updating state");
    console.log(DUMMY_PROJECT_CARDS);

    setState();
  };
  return (
    <div className={classes.wrapper}>
      {DUMMY_PROJECT_CARDS.map((elem) => (
        <ProjectCard
          state={elem.state}
          object={elem}
          onAddCard={addCardHandler}
        />
      ))}
    </div>
  );
};

export default ProjectCardList;
