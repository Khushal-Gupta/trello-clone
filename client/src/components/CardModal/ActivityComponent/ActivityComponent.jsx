import { CgFeed } from "react-icons/cg";
import { useContext, useState } from "react";
import clsx from "clsx";

import CommentBox from "../CommentBox";
import classes from "./ActivityComponent.module.css";
import { CardListContext } from "../../../context/cardlist-context";

export default function ActivityComponent({ cardId }) {
  const { addCommentToCard, listOfCard } = useContext(CardListContext);
  const { listOfComment: previousComments } = listOfCard.find(
    (elem) => elem.id === cardId
  );
  const addCommentHandler = (newComment) => {
    if (newComment) {
      addCommentToCard(
        cardId,
        newComment,
        "Khushal Gupta",
        Date.now().toString()
      );
    }
  };
  return (
    <div className={classes.activityWrapper}>
      <div className={classes.activityHeaderWrapper}>
        <div className={classes.iconWrapper}>
          <CgFeed className={classes.iconStyle} />
        </div>
        <div className={classes.activityHeader}>Activity</div>
      </div>
      <AddActivityItem key="add" onSave={addCommentHandler} />
      {previousComments.map((elem) => (
        <PreviousActivityItem
          key={elem.id}
          comment={elem.comment}
          id={elem.id}
          cardId={cardId}
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

const PreviousActivityItem = ({ comment, id, cardId }) => {
  const { editComment } = useContext(CardListContext);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const onSave = (editedComment) => {
    editComment(cardId, id, editedComment, Date.now().toString());
  };
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
        {isEditingEnabled ? (
          <CommentBox
            isTextareaEnabled={isEditingEnabled}
            passedComment={comment}
            onSave={onSave}
            type="edit"
            onClose={() => {
              setIsEditingEnabled(false);
            }}
          />
        ) : (
          <div className={classes.commentBox}>{comment}</div>
        )}
        {!isEditingEnabled ? (
          <div className={classes.previousActivityMainContentFooterWrapper}>
            <span
              className={classes.previousActivityEditButton}
              onClick={() => {
                setIsEditingEnabled(true);
              }}
            >
              Edit
            </span>
            <span className={classes.previousActivitySpacer}>-</span>
            <span className={classes.previousActivityDeleteButton}>Delete</span>
          </div>
        ) : null}
      </div>
    </div>
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
