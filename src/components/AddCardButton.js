import classes from "./AddCardButton.module.css";

const AddCardButton = (props) => {
  return (
    <div className={classes.buttonWrapper}>
      <button onClick={props.onClick}>+ Add Card</button>
    </div>
  );
};

export default AddCardButton;
