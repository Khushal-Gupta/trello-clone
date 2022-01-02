import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import AddProjectCardButton from "../components/AddProjectCardButton/AddProjectCardButton";
import ProjectCard from "../components/ProjectCard/ProjectCard";
import classes from "./ProjectCardList.module.css";

const ProjectCardList = () => {
  const [projectCardList, setprojectCardList] = useState([
    'To Do"s',
    "Achievements",
    "Code Reviews",
    "Design",
  ]);
  const onAddProjectCardHandler = (newProjectCard) => {
    setprojectCardList((prevlist) => [...prevlist, newProjectCard]);
  };

  const elems = projectCardList.map((elem, index) => <ProjectCard key={index} title={elem} />);
  elems.push(<AddProjectCardButton onAdd={onAddProjectCardHandler} key = 'addProjectCardButton' />);
  return (
    <Fragment>
      <div className={classes.wrapper}>{elems}</div>
    </Fragment>
  );
};

export default ProjectCardList;
