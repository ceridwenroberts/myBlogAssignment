import { useRouter } from "next/router";
import styles from "./blog-post.module.css";
import Comments from "./partials/comments";
import AddComment from "./partials/add-comment";
import Button from "@components/button";
import Heading from "@components/heading";
import BlogImageBanner from "@components/blog-image-banner";



import { getPost, deletePost, editPost, postsCacheKey } from "../../../api-routes/posts";
import useSWR from 'swr';
import useSWRMutation from "swr/mutation";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";


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
  console.log("postsData:", post);


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
          destination: '/blog',
          permanent: false,
        },
      }
    }
    router.push(`/blog`);
  };

console.log("author", post.author);

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
        {/*set author in supabase*/}
        <span className={styles.author}>Author: {post.author}</span>

      { isAuthor ?  <div className={styles.buttonContainer}>
          <Button onClick={handleDeletePost}>Delete</Button>
          <Button onClick={handleEditPost}>Edit</Button>
        </div> : <p>Login to edit</p> 
        }
      </section>)}

      <Comments postId={post.id} />

      {/* This component should only be displayed if a user is authenticated */}
    
      <AddComment postId={post.id} />
      </>
  );
}



// export const getServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { slug } = ctx.params;

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // Check if the user is authenticated
//   if (!session || !session.user || !session.user.id) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   const { data } = await supabase
//     .from("posts")
//     .select()
//     .single()
//     .eq("slug", slug);

//   const isAuthor = data.user_id === (session.user ? session.user.id : null); // Check if session.user exists before accessing id

//   if (!isAuthor) {
//     return {
//       redirect: {
//         destination: `/blog/${slug}`,
//         permanent: true,
//       },
//     };
//   }

//   return {
//     props: {
//       data,
//       isAuthor,
//     },
//   };
// };


// export const getServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { slug } = ctx.params;

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   const { data } = await supabase
//     .from("posts")
//     .select()
//     .single()
//     .eq("slug", slug);

//   const isAuthor = data.user_id === session.user.id;
  
//   // Check if the user is authenticated
//   if (!session || !session.user || !session.user.id) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

//   if (!isAuthor) {
//     return {
//       redirect: {
//         destination: `/blog/${slug}`,
//         permanent: true,
//       },
//     };
//   }

//   return {
//     props: {
//       data,
//       isAuthor,
//     },
//   };
// };



// export const getServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { slug } = ctx.params;

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();
//   console.log("session", session);

  

//   const { data } = await supabase
//     .from("posts")
//     .select()
//     .single()
//     .eq("slug", slug);


//   const isAuthor = data.user_id === session.user.id;
  
//       // Check if the user is authenticated
//   if (!session || !session.user || !session.user.id) {
//     return {
//       redirect: {
//         destination: "/login",
//         permanent: false,
//       },
//     };
//   }

// console.log("isAuthor", isAuthor);

//   if (!isAuthor) {
//     return {
//       redirect: {
//         destination: `/blog/${slug}`,
//         permanent: true,
//       },
//     };
//   }
//   return {
//     props: {
//       data,
//       isAuthor, 
//     },
//   };

// };


// const { createClient } = require('@supabase/supabase-js')

// const supabase = createClient('https://your-project-url.supabase.co', 'your-anon-key')

// const user = supabase.auth.user()

// if (user) {
//   // Render authenticated content
//   res.send(`
//     <button>Logout</button>
//   `)
// } else {
//   // Render unauthenticated content
//   res.send(`
//     <button>Login</button>
//   `)
// }







// WHYYYY DOESN'T THIS WORKKKKK???

// const { data: { post = [] } = {}, error } = useSWR(slug ? postsCacheKey : null, () => getPost({ slug }));
//   console.log("slugBlog", { post, error });


//   return (
//     <>
//       <section className={styles.container}>
//         <Heading>{post.title}</Heading>
//         {post?.image && <BlogImageBanner src={post.image} alt={post.title} />}
//         <div className={styles.dateContainer}>
//           <time className={styles.date}>{post.createdAt}</time>
//           <div className={styles.border} />
//         </div>
//         <div dangerouslySetInnerHTML={{ __html: post.body }} />
//         <span className={styles.author}>Author: {post.author}</span>

//         {/* The Delete & Edit part should only be showed if you are authenticated and you are the author */}
//         <div className={styles.buttonContainer}>
//           <Button onClick={handleDeletePost}>Delete</Button>
//           <Button onClick={handleEditPost}>Edit</Button>
//         </div>
//       </section>

//       {/* <Comments postId={post.id} /> */}

//       {/* This component should only be displayed if a user is authenticated */}
//       {/* <AddComment postId={post.id} /> */}
//     </>
//   );
// }


// const post = {
//     id: "1234",
//     title: "Dummy title: Why you should use a react framework",
//     author: "John Doe",
//     slug: "why-you-should-use-react-framework",
//     createdAt: "2022-02-12",
//     body: `
//     <p>With the History extension the Editor will keep track of your changes. And if you think you made a mistake, you can redo your changes. Try it out, change the content and hit the undo button!</p>
//     <p>And yes, you can also use a keyboard shortcut to undo changes (Control/Cmd Z) or redo changes (Control/Cmd Shift Z).</p>
//     <p>Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.</p>
//     <p>By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It’s configurable though.</p>
//     <p><strong>This is bold.</strong></p>
//     <p><u>This is underlined though.</u></p>
//     <p><em>This is italic.</em></p>
//     <p><s>But that’s striked through.</s></p>
//     <p><code>This is code.</code></p>
//     `,
//   }; 