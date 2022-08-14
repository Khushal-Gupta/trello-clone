import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api/comments/",
});

export const mapFetchedComment = ({ id, attributes }) => {
  return { id, ...attributes };
};

export const putComment = async (commentId, patchObject) => {
  let {
    data: { data: patchedComment },
  } = await axiosInstance.put(`/${commentId}`, {
    data: patchObject,
  });
  patchedComment = mapFetchedComment(patchedComment);
  return patchedComment;
};

export const postComment = async (newCommentObject) => {
  let {
    data: { data: newComment },
  } = await axiosInstance.post("/", { data: newCommentObject });
  newComment = mapFetchedComment(newComment);
  return newComment;
};

export const deleteComment = async (commentId) => {
  let {
    data: { data: deletedComment },
  } = await axiosInstance.delete(`/${commentId}`);
  deletedComment = mapFetchedComment(deletedComment);
  return deletedComment;
};
