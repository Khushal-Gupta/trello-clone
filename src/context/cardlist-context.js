import react from "react";

export const CardListContext = react.createContext({
  id: null,
  title: null,
  listOfCard: [],
  setTitle: (newTitle) => {},
  addCard:(newTitle)=>{},
  setCardTitle: (cardId, newTitle) => {},
  setCardDescription: (cardId, newDescription) => {},
  addCommentToCard: (cardId, comment, creatorName, createdAt) => {},
  editComment: (cardId, commentId, newComment, updatedAt) => {},
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
