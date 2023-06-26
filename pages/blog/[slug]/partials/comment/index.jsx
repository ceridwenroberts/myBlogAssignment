import { useUser } from "@supabase/auth-helpers-react";
import useSWRMutation from "swr/mutation";
import Button from "@components/button";
import styles from "./comment.module.css";
import { commentsCacheKey, deleteComment } from "../../../../../api-routes/comments";

export default function Comment({ comments, comment, createdAt, author, id, post_id }) {
  const user = useUser();
  console.log({user});
  console.log(post_id);
  
  const postAuthor = post_id?.user_id;
  const isAuthor = user?.id === postAuthor;
//   console.log({postAuthor});
// console.log("post_id.user_id:", post_id.user_id);

// console.log({user});
// // console.log(post);
// console.log(user_Id);


  const { trigger: deleteCommentTrigger, isMutating } = useSWRMutation(commentsCacheKey, deleteComment, {
    onError: (error) => {
      console.log(error);
    }
  });

  const handleDeleteComment = async () => {
    await deleteCommentTrigger(id);
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
      </div>
    </div>
  );
}
