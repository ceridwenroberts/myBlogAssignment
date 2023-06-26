import { supabase } from "../lib/supabaseClient";

export const commentsCacheKey = "api/comments";

export const getComments = async (postId) => {
  const { data, error, status } = await supabase
    .from("comments")
    .select("*, post_id (*)")
    .eq("post_id", postId);

  if (error) {
    console.error(error);
    return [];
  }

  return { data, error, status };
};

export const addComment = async (_, { arg: newComment }) => {
  const { data, error, status } = await supabase
    .from("comments")
    .insert(newComment)
    .select()
    .single()
    .eq("post_id", newComment.postId);

  return { data, error, status };
};

export const deleteComment = async (_, { arg: id }) => {
  const { data, error, status } = await supabase
    .from("comments")
    .delete()
    .single()
    .eq("id", id);
};
