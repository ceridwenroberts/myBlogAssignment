import { supabase } from "../lib/supabaseClient";
import { getPost } from "./posts";
import { useRouter } from "next/router";

export const commentsCacheKey = "api/comments";

export const getComments = async (postId) => {
  const { data, error, status } = await supabase
    .from('comments')
    .select()
    .eq('post_id', postId);
  // if(data) {
  //   console.log("commentsdata:", data);
  // }
  // if (error) {
  //   console.error(error);
  //   return [];
  // }
  return { data, error, status };
}

  //Handle get all comments


export const addComment = async ( _, { arg: newComment }) => {
  const { data, error, status } = await supabase
  .from("comments")
  .insert(newComment)
  .select()
  .single()
  .eq("post_id", newComment.postId)

  return { data, error, status }
};

export const deleteComment = async (_, { arg: id }) => {
  const { data, error, status } = await supabase
  .from("comments")
  .delete()
  .single()
  .eq("id", id)
  //Handle delete comment here
};
