import { useEffect, useState } from "react";
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
    axiosInstance
      .post("/cardlists", { data: { title: newCardList } })
      .then(({ data: { data } }) => {
        const {
          id,
          attributes: { title },
        } = data;
        setListOfCardList((prevlist) => [
          ...prevlist,
          { id: id, title: title },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
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
          id = {elem.id}
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
