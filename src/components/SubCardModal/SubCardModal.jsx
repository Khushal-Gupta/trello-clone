import classes from "./SubCardModal.module.css";
import Modal from "../Modal";
import clsx from "clsx";
import { useState } from "react";

export default function SubCardModal({ show, onClose }) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      showCloseButton={true}
      passedModalClasses={classes.modalWrapperClasses}
    >
      <Title />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: "5",
          }}
        >
          <Description />
          <Activity />
        </div>
        <div
          style={{
            flex: "2",
            marginLeft: "0.8rem",
            // backgroundColor: "lightgreen",
          }}
        >
          <div>Add to Card</div>
          <CardActionItem />
          <CardActionItem />
          <CardActionItem />
          <CardActionItem />
          <CardActionItem />
          <div>Actions</div>
          <CardActionItem />
          <CardActionItem />
        </div>
      </div>
    </Modal>
  );
}

const Title = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState("title");
  let titleFieldStyle;
  if (!isEditMode) {
    titleFieldStyle = {
      resize: "none",
      margin: "0",
      backgroundColor: "transparent",
      outline: "none",
      border: "none",
      fontSize: "1rem",
      flex: "1",
      fontFamily: "inherit",
      position: "relative",
      right: "0.5rem",
      paddingLeft: "0.5rem",
    };
  } else {
    titleFieldStyle = {
      resize: "none",
      margin: "0",
      border: "none",
      fontSize: "1rem",
      marginRight: "2rem",
      flex: "1",
      fontFamily: "inherit",
      position: "relative",
      right: "0.5rem",
      paddingLeft: "0.5rem",
    };
  }
  return (
    <div
      style={{
        display: "flex",
        // backgroundColor: "yellowgreen",
        marginBottom: "1rem",
      }}
    >
      <div style={{ width: "30px", height: "30px", boxSizing: "border-box" }}>
        T
      </div>
      <div style={{ flex: "1", flexDirection: "column", display: "flex" }}>
        <textarea
          style={titleFieldStyle}
          rows="1"
          onFocus={() => {
            setIsEditMode(true);
          }}
          onBlur={() => {
            setIsEditMode(false);
          }}
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        ></textarea>
        <div
          style={{
            fontSize: "0.8rem",
            display: "flex",
          }}
          className={classes.lightTextClass}
        >
          <div>in list LIST_NAME</div>
          <div
            style={{
              width: "30px",
              height: "30px",
              marginLeft: "1rem",
            }}
          >
            EI
          </div>
        </div>
      </div>
    </div>
  );
};

const Description = () => {
  const [description, setDescription] = useState(
    "This is a random description"
  );
  const [editedDescription, setEditedDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "1rem",
        // backgroundColor: "orange",
      }}
    >
      <div style={{ width: "30px", height: "30px" }}>D</div>
      <div
        style={{
          dislay: "flex",
          flexDirection: "column",
          flex: "1",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>Description</div>
          <button
            className={classes.modalButton}
            type="button"
            style={{
              marginLeft: "1rem",
              borderRadius: "3px",
              padding: "0.2rem 0.7rem",
            }}
            onClick={() => {
              setIsEditMode(true);
            }}
          >
            Edit
          </button>
        </div>
        {!isEditMode && (
          <div
            className={classes.lightTextClass}
            style={{ fontSize: "0.8rem", margin: "0.5rem 0rem" }}
          >
            {description}
          </div>
        )}
        {isEditMode && (
          <div
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <textarea
              style={{
                resize: "none",
                width: "100%",
                border: "none",
                padding: "0.5rem 0.5rem",
              }}
              placeholder="Add a more detailed description"
              value={editedDescription}
              onChange={(event) => {
                setEditedDescription(event.target.value);
              }}
            ></textarea>
            <div style={{ display: "flex", margin: "0.5rem 0rem" }}>
              <button
                style={{
                  border: "none",
                  backgroundColor: "#0079bf",
                  color: "white",
                  padding: "0.3rem 0.5rem",
                  borderRadius: "3px",
                }}
                onClick={() => {
                  setDescription(editedDescription);
                  setEditedDescription("");
                  setIsEditMode(false);
                }}
              >
                Save
              </button>
              <button
                type="button"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  marginLeft: "1rem",
                }}
                onClick={() => {
                  setEditedDescription("");
                  setIsEditMode(false);
                }}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Activity = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        // backgroundColor: "lightblue",
        width: "100%",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "30px", height: "30px" }}>A</div>
        <div>Activity</div>
      </div>
      <div style={{ display: "flex", width: "100%", alignItems: "flex-start" }}>
        <div
          className={classes.centerInsideContent}
          style={{
            borderRadius: "50%",
            backgroundColor: "green",
            color: "white",
            height: "30px",
            width: "30px",
            position: "relative",
            right: "0.5rem",
          }}
        >
          KG
        </div>
        <div style={{ flex: "1", flexDirection: "column" }}>
          <textarea
            placeholder="Write a comment...."
            style={{
              resize: "none",
              border: "none",
              padding: "0.2rem 0.5rem",
              width: "100%",
            }}
            rows={2}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

const CardActionItem = () => {
  return (
    <button
      style={{ display: "flex", alignItems: "center" }}
      className={clsx(classes.cardAction, classes.modalButton)}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
        }}
        className={classes.centerInsideContent}
      >
        D
      </div>
      <div>Card Action 1</div>
    </button>
  );
};
