import Button from "@components/button";
import styles from "./comment.module.css";
import { commentsCacheKey, deleteComment } from "../../../../../api-routes/comments";
import useSWRMutation from "swr/mutation";
import { useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
import ReplyForm from "../../../../../components/reply-form";

export default function Comment({ comments, comment, createdAt, author, id, post_id }) {
  const user = useUser();

  const postAuthor = post_id.user_id;
  const isAuthor = user?.id === postAuthor;
  const [replyOf, setReplyOf] = useState(false);
  console.log({ comments });


  console.log({ user, postAuthor, isAuthor });

  const { trigger: deleteCommentTrigger, isMutating } = useSWRMutation(commentsCacheKey, deleteComment, {
    onError: (error) => {
      console.log(error);
    }
  });

  const handleDeleteComment = async () => {
    console.log({ comment });
    await deleteCommentTrigger(id);
  };

  const handleReplyComment = () => {
    console.log("reply clicked");
    setReplyOf(true);
  }


  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    // const slug = createSlug(titleInput);

    const newReply = {
      body: editorContent,
      // author: replyAuthor
    };
    const { error } = await addReplyTrigger(newReply);

    // if (!error) {
    //   router.push(`/blog/${slug}`);
    // }
  };



  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>


      <div className={styles.buttonContainer}>
        {isAuthor &&
          <Button onClick={handleDeleteComment}>Delete</Button>
        }
        <Button onClick={handleReplyComment}>{`Reply`}</Button>
        {replyOf && <>
          <p>`reply to ${author}`</p>
          <ReplyForm commentAuthor={author} heading="Create post"
            onSubmit={handleOnSubmit}
            buttonText="Upload post"
            name={author} />
        </>}
      </div>

    </div>
  );
}
