import AddCardListButton from "../components/AddCardListButton";
import CardList from "../components/CardList";
import classes from "./Workspace.module.css";

import { useWorkspaceHook } from "../hooks/workspace-hook";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function ProjectCardList() {
  const { isLoading, error, listOfCardList, onAddCardListHandler, onDragEnd } =
    useWorkspaceHook();

  if (isLoading) return <div className={classes.wrapper}>Loading...</div>;

  if (error)
    return <div className={classes.wrapper}>Some error occured...</div>;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="workspace" direction="horizontal" type="cardlist">
        {(provided) => (
          <div
            className={classes.wrapper}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {listOfCardList.map((elem, index) => (
              <CardList
                key={elem.id}
                id={elem.id}
                index={index}
                passedClasses={classes.childStyles}
              />
            ))}
            {provided.placeholder}
            <AddCardListButton
              onAdd={onAddCardListHandler}
              key="addProjectCardButton"
              passedClasses={classes.childStyles}
            />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
