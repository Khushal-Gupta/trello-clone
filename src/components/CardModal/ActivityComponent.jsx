import { v4 as uuidv4 } from "uuid";

import classes from "./ActivityComponent.module.css";
import { CgFeed } from "react-icons/cg";
import { IconContext } from "react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { GoMention } from "react-icons/go";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { BsCreditCard2Back } from "react-icons/bs";
import { RiAttachment2 } from "react-icons/ri";

export default function ActivityComponent() {
  const [previousComments, setPreviousComments] = useState([]);
  console.log(previousComments);
  const addCommentHandler = (newComment) => {
    if (newComment) {
      console.log(newComment);
      setPreviousComments((prevState) => [
        { id: uuidv4(), comment: newComment },
        ...prevState,
      ]);
    }
  };
  return (
    <div className={classes.activityWrapper}>
      <div className={classes.activityHeaderWrapper}>
        <div className={classes.iconWrapper}>
          <IconContext.Provider value={{ className: classes.iconStyle }}>
            <CgFeed />
          </IconContext.Provider>
        </div>
        <div className={classes.activityHeader}>Activity</div>
      </div>
      <AddActivityItem key="add" onSave={addCommentHandler} />
      {previousComments.map((elem, index) => (
        <PreviousActivityItem
          key={elem.id}
          comment={elem.comment}
          id={elem.id}
        />
      ))}
    </div>
  );
}

const AddActivityItem = ({ onSave }) => {
  return (
    <div className={classes.activityItemWrapper}>
      <ImagePlaceholder />
      <CommentBox
        isTextareaEnabled={true}
        onSave={onSave}
        type="add"
        id="add"
      />
    </div>
  );
};

const PreviousActivityItem = ({ comment, id }) => {
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const textareaId = "edit" + id;
  return (
    <div className={classes.activityItemWrapper}>
      <ImagePlaceholder />
      <div className={classes.previousActivityMainContentWrapper}>
        <div className={classes.previousActivityMainContentHeader}>
          <span className={classes.previousActivityHeaderName}>
            Khushal Gupta
          </span>{" "}
          an hour ago
        </div>
        <CommentBox
          isTextareaEnabled={isEditingEnabled}
          passedComment={comment}
          onSave={() => {}}
          type="edit"
          onClose={() => {
            setIsEditingEnabled(false);
          }}
          id={textareaId}
        />
        <div className={classes.previousActivityMainContentFooterWrapper}>
          <label
            for={textareaId}
            onClick={() => {
              setIsEditingEnabled(true);
            }}
            className={classes.previousActivityEditButton}
          >
            Edit
          </label>
          <span className={classes.previousActivitySpacer}>-</span>
          <span className={classes.previousActivityDeleteButton}>Delete</span>
        </div>
      </div>
    </div>
  );
};

const CommentBox = ({
  isTextareaEnabled,
  passedComment,
  onSave,
  onClose,
  type,
  id,
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [comment, setComment] = useState(passedComment || "");
  const commentBoxRef = useRef();
  const textareaRef = useRef();
  const commentBoxItems = [
    <RiAttachment2 />,
    <GoMention />,
    <HiOutlineEmojiHappy />,
    <BsCreditCard2Back />,
  ];

  const handleAutoHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [textareaRef]);

  useEffect(() => {
    handleAutoHeight();
  }, [handleAutoHeight]);

  useEffect(() => {
    const outsideClickHandler = (event) => {
      if (
        commentBoxRef.current &&
        commentBoxRef.current !== event.target &&
        commentBoxRef.current.value === ""
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
      <textarea
        id={id}
        ref={textareaRef}
        placeholder="Write a comment...."
        className={classes.commentBoxTextarea}
        rows={1}
        onFocus={() => {
          setIsEditMode(true);
        }}
        onChange={(event) => {
          handleAutoHeight();
          setComment(event.target.value);
        }}
        disabled={!isTextareaEnabled}
        value={comment}
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
                  onSave();
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

const ImagePlaceholder = () => {
  return (
    <div
      className={clsx(
        classes.centerInsideContent,
        classes.activityItemImagePlaceholder
      )}
    >
      KG
    </div>
  );
};
