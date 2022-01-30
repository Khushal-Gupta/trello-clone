import AddCardListButton from "../components/AddCardListButton";
import CardList from "../components/CardList";
import classes from "./Workspace.module.css";
import { useWorkspaceHook } from "../hooks/workspace-hook";

export default function ProjectCardList() {
  const { isLoading, error, listOfCardList, onAddCardListHandler } =
    useWorkspaceHook();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Some error occured...</div>;

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
