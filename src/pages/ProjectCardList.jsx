import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import AddCardListButton from "../components/AddCardListButton";
import CardList from "../components/CardList";
import classes from "./ProjectCardList.module.css";

export default function ProjectCardList() {
  const [listOfCardList, setListOfCardList] = useState([
    { title: 'To Do"s', id: uuidv4() },
    { title: "Achievements", id: uuidv4() },
    { title: "Code Reviews", id: uuidv4() },
    { title: "Design", id: uuidv4() },
  ]);
  const onAddCardListHandler = (newCardList) => {
    setListOfCardList((prevlist) => [
      ...prevlist,
      { id: uuidv4(), title: newCardList },
    ]);
  };

  return (
    <div className={classes.wrapper}>
      {listOfCardList.map((elem) => (
        <CardList
          key={elem.id}
          title={elem.title}
          passedClasses={classes.childStyles}
        />
      ))}
      <AddCardListButton
        onAdd={onAddCardListHandler}
        key="addProjectCardButton"
        passedClasses={classes.childStyles}
      />
    </div>
  );
}
