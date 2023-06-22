import Button from "@components/button";
import styles from "./comment.module.css";
import { commentsCacheKey, deleteComment } from "../../../../../api-routes/comments";
import useSWRMutation from "swr/mutation";

export default function Comment({ comment, createdAt, author, id }) {

  const { trigger: deleteCommentTrigger, isMutating } = useSWRMutation(commentsCacheKey, deleteComment, {
    onError: (error) => {
    console.log(error);
  }
  });

  const handleDeleteComment = async () => { 
    console.log({ id });
    await deleteCommentTrigger(id);
  };
  return (
    <div className={styles.container}>
      <p>{comment}</p>
      <p className={styles.author}>{author}</p>
      <time className={styles.date}>{createdAt}</time>

      {/* The Delete part should only be showed if you are authenticated and you are the author */}
      <div className={styles.buttonContainer}>
        <Button onClick={handleDeleteComment}>Delete</Button>
      </div>
    </div>
  );
}
