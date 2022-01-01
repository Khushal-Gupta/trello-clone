import classes from "./AddSubCardButton.module.css";

export default function AddSubCardButton({ onAdd, onCancel, showCancel }) {
  if (!showCancel)
    return (
      <div className={classes.buttonWrapper}>
        <button onClick={onAdd}>+ Add Card</button>
      </div>
    );

  return (
    <div className={classes.editingModeWrapper}>
      <button type="button" className={classes.addButton} onClick={onAdd}>
        + Add Card
      </button>
      <button type="button" className={classes.cancelButton} onClick={onCancel}>
        X
      </button>
    </div>
  );
}
