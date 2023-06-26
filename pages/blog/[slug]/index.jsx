import { useRouter } from "next/router";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";

import { getPost, deletePost, postsCacheKey } from "../../../api-routes/posts";
import useSWR from 'swr';
import useSWRMutation from "swr/mutation";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";


export default function BlogPost() {

  const router = useRouter();
  const { slug } = router.query;
  const user = useUser();

  const { trigger: deletePostTrigger } = useSWRMutation(postsCacheKey, deletePost);

    const {
      data: { data: post = {} } = {},
      error
    } = useSWR(slug ? `${postsCacheKey}${slug}` : null, () => getPost({ slug }));
  // console.log("slugBlog", { data, error });
  // console.log({ slug });
  // console.log("postsData:", post);


    const isAuthor = post?.user_id === user?.id;
      if (isAuthor) console.log("isAuthor true");
  
  const handleEditPost = () => {
    console.log("slug", slug);
    router.push(`/blog/${slug}/edit`);
  };


  const handleDeletePost = async () => {
    await deletePostTrigger({
      id: post.id,
    })
    console.log("handleDeletePost (in [slug]/index)", { id: post.id, slug });

    if (!post) {
      console.log("there is no post", post);
      return {
        redirect: {
          destination: "/blog",
          permanent: false,
        },
      }
    }
    router.push(`/blog`);
  };

  return (
    <>
     {post && ( <section className={styles.container}>
        <Heading>{post.title}</Heading>
        {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
        <div className={styles.dateContainer}>
          <time className={styles.date}>{post.createdAt}</time>
          <div className={styles.border} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        {/* <span className={styles.author}>Author: {post.author}</span> */}

      { isAuthor &&  <div className={styles.buttonContainer}>
          <Button onClick={handleDeletePost}>Delete</Button>
          <Button onClick={handleEditPost}>Edit</Button>
        </div> 
        }
      </section>)}
      <Comments postId={post.id} />    
      <AddComment postId={post.id} />
      </>
  );
}