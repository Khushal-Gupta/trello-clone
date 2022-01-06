import { useState } from "react";
import AddCardListButton from "../components/AddCardListButton";
import CardList from "../components/CardList";
import classes from "./ProjectCardList.module.css";

export default function ProjectCardList() {
  const [listOfCardList, setListOfCardList] = useState([
    'To Do"s',
    "Achievements",
    "Code Reviews",
    "Design",
  ]);
  const onAddCardListHandler = (newCardList) => {
    setListOfCardList((prevlist) => [...prevlist, newCardList]);
  };

  const elems = listOfCardList.map((elem, index) => (
    <CardList key={index} title={elem} passedClasses={classes.childStyles} />
  ));

  elems.push(
    <AddCardListButton
      onAdd={onAddCardListHandler}
      key="addProjectCardButton"
      passedClasses={classes.childStyles}
    />
  );
  return <div className={classes.wrapper}>{elems}</div>;
}
