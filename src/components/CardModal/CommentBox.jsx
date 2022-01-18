import classes from "./CommentBox.module.css";
import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { RiAttachment2 } from "react-icons/ri";
import { GoMention } from "react-icons/go";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { BsCreditCard2Back } from "react-icons/bs";
import { IconContext } from "react-icons";
import AutoHeightTextarea from "../autoHeightTextarea/AutoHeightTextarea";

const CommentBox = ({ passedComment, onSave, onClose, type }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [comment, setComment] = useState(passedComment || "");
  const commentBoxRef = useRef(null);
  const textareaRef = useRef(null);
  const commentBoxItems = [
    <RiAttachment2 />,
    <GoMention />,
    <HiOutlineEmojiHappy />,
    <BsCreditCard2Back />,
  ];

  // const handleAutoHeight = useCallback(() => {
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = "auto";
  //     textareaRef.current.style.height =
  //       textareaRef.current.scrollHeight + "px";
  //   }
  // }, [textareaRef]);

  // useEffect(() => {
  //   handleAutoHeight();
  // }, [handleAutoHeight]);

  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (
        !commentBoxRef.current?.contains(event.target) &&
        textareaRef.current?.value === ""
      ) {
        setIsEditMode(false);
      }
    };
    document.addEventListener("click", outsideClickHandler);
    return () => {
      document.removeEventListener("click", outsideClickHandler);
    };
  }, []);

  return (
    <div className={classes.activityItemCommentBoxWrapper} ref={commentBoxRef}>
      <AutoHeightTextarea
        ref={textareaRef}
        placeholder="Write a comment...."
        className={classes.commentBoxTextarea}
        rows={1}
        onFocus={() => {
          setIsEditMode(true);
        }}
        onChange={(value) => {
          setComment(value);
        }}
        value={comment}
        autoFocus={type === "edit"}
      />

      {isEditMode && (
        <div className={classes.commentBoxActionsWrapper}>
          <div>
            <button
              type="button"
              className={classes.commentBoxSaveButton}
              onClick={() => {
                setIsEditMode(false);
                if (type === "add") {
                  onSave(textareaRef.current.value);
                  setComment("");
                }
                if (type === "edit") {
                  onSave(textareaRef.current.value);
                  onClose();
                }
              }}
            >
              Save
            </button>
            <button
              type="button"
              className={classes.commentBoxCloseButton}
              onClick={() => {
                setIsEditMode(false);
                if (type === "add") {
                  setComment("");
                }
                if (type === "edit") {
                  onClose();
                  setComment(passedComment);
                }
              }}
            >
              X
            </button>
          </div>
          <div className={classes.commentBoxItemsWrapper}>
            {commentBoxItems.map((elem, index) => (
              <CommentBoxItems key={index}>{elem}</CommentBoxItems>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const CommentBoxItems = ({ children }) => {
  return (
    <button
      type="button"
      className={clsx(
        classes.centerInsideContent,
        classes.commentBoxItemIconWrapper
      )}
    >
      <IconContext.Provider
        value={{ className: classes.commentBoxItemIconStyle }}
      >
        {children}
      </IconContext.Provider>
    </button>
  );
};

export default CommentBox;
