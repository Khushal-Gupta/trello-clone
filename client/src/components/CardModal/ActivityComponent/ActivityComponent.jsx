import { CgFeed } from "react-icons/cg";
import { useContext, useState } from "react";
import clsx from "clsx";

import CommentBox from "../CommentBox";
import classes from "./ActivityComponent.module.css";
import { CardContext } from "../../../context/card-context";
import { userFriendlyTimeFromNow } from "../../../util/dateUtil";

export default function ActivityComponent({ cardId }) {
  const { addCommentToCard, listOfComments } = useContext(CardContext);

  const addCommentHandler = (newComment) => {
    if (newComment) {
      addCommentToCard(newComment, "Khushal Gupta");
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
      {listOfComments.map((elem) => (
        <ActivityItem
          key={elem.id}
          comment={elem.comment}
          id={elem.id}
          cardId={cardId}
          createdAt={elem.createdAt}
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

const ActivityItem = ({ comment, id, cardId, createdAt }) => {
  const { editComment, deleteComment } = useContext(CardContext);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const onSave = (editedComment) => {
    editComment(id, editedComment);
  };

  return (
    <div className={classes.activityItemWrapper}>
      <ImagePlaceholder />
      <div className={classes.previousActivityMainContentWrapper}>
        <div className={classes.previousActivityMainContentHeader}>
          <span className={classes.previousActivityHeaderName}>
            Khushal Gupta
          </span>{" "}
          {userFriendlyTimeFromNow(createdAt)}
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
            <span
              className={classes.previousActivityDeleteButton}
              onClick={() => {
                deleteComment(id);
              }}
            >
              Delete
            </span>
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
