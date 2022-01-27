import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import AddCardListButton from "../components/AddCardListButton";
import CardList from "../components/CardList";
import classes from "./ProjectCardList.module.css";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/",
});

export default function ProjectCardList() {
  const [listOfCardList, setListOfCardList] = useState([]);
  const onAddCardListHandler = (newCardList) => {
    setListOfCardList((prevlist) => [
      ...prevlist,
      { id: uuidv4(), title: newCardList },
    ]);
  };

  useEffect(() => {
    const fetchCardlists = async () => {
      return axiosInstance.get("/cardlists");
    };
    fetchCardlists()
      .then(({ data: { data } }) => {
        const newListOfCardlist = data.map(({ id, attributes }) => {
          return { id: id, title: attributes.title };
        });
        setListOfCardList(newListOfCardlist);
      })
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
