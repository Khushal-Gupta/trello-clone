import { useEffect, useState } from "react";

import AddCardListButton from "../components/AddCardListButton";
import CardList from "../components/CardList";
import classes from "./ProjectCardList.module.css";
import { findCardlists, postCardlist } from "../api/cardlist-api";

export default function ProjectCardList() {
  const [listOfCardList, setListOfCardList] = useState([]);
  const onAddCardListHandler = (newCardListTitle) => {
    const newCardListOject = {
      title: newCardListTitle,
      order: listOfCardList.length,
    };
    postCardlist(newCardListOject)
      .then((newCardList) => {
        setListOfCardList((prevlist) => [...prevlist, newCardList]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    findCardlists()
      .then((fetchedListOfCardlist) => setListOfCardList(fetchedListOfCardlist))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={classes.wrapper}>
      {listOfCardList.map((elem) => (
        <CardList
          key={elem.id}
          title={elem.title}
          id={elem.id}
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
