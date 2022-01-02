import { useEffect, useRef, useState } from "react";

export default function CreateTaskForm({
  showNewSubCardEditor,
  setShowNewSubCardEditor,
  addCardHandler,
}) {
  const newTaskFormRef = useRef(null);
  const [newSubCardTitle, setNewSubCardTitle] = useState("");

  const onChangeNewSubCardTitle = (event) => {
    setNewSubCardTitle(event.target.value);
  };

  useEffect(() => {
    if (showNewSubCardEditor) {
      function handleClickOutside(event) {
        if (
          newTaskFormRef.current &&
          !newTaskFormRef.current.contains(event.target) // Check if the clicked element is inside the form
        ) {
          setShowNewSubCardEditor(false);
        }
      }
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [setShowNewSubCardEditor, showNewSubCardEditor]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addCardHandler(newSubCardTitle);
        setNewSubCardTitle("");
      }}
      ref={newTaskFormRef}
    >
      <textarea
        rows={3}
        autoFocus
        value={newSubCardTitle}
        onChange={onChangeNewSubCardTitle}
        placeholder="Enter Something...."
        style={{ width: "100%", border: "none" }}
      />
      <button
        style={{
          border: "none",
          padding: "0.3rem 0.5rem",
          backgroundColor: "rgb(106, 106, 241)",
          color: "white",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Create Task
      </button>
      <button
        style={{
          border: "none",
          backgroundColor: "transparent",
          cursor: "pointer",
        }}
        type="button"
        onClick={() => {
          setShowNewSubCardEditor(false);
        }}
      >
        X
      </button>
    </form>
  );
}
