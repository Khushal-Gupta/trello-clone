import { createContext } from "react";

export const CardContext = createContext({
  cardId: null,
  cardTitle: "...Loading Title",
  cardDescription: "...Loading Description",
  listTitle: ".....",
  listOfComments: [],
  setCardTitle: (cardId, newTitle) => {},
  setCardDescription: (cardId, newDescription) => {},
  addCommentToCard: (cardId, comment, creatorName, createdAt) => {},
  editComment: (cardId, commentId, newComment, updatedAt) => {},
  deleteComment: (commentId) => {},
});

/*** CardList
    {
        id:"",
        title:"",
        listOfCard:[<Card/>],
    }
 */

/**  Card
    {
        id:"",
        title:"",
        description:"",
        listOfComment:[<Comment/>],
    }
 */

/** Comment
    {
        id, 
        creatorName,
        comment,
        createdAt,
    }    
 */
