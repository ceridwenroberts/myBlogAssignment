import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

import BlogEditor from "../../../../components/blog-editor";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import { getPost, postsCacheKey } from "@/api-routes/posts";
import { createSlug } from "../../../../utils/createSlug";
import { editPost } from "../../../../api-routes/posts";

export default function EditBlogPost() {
  const router = useRouter();
  const user = useUser();
  const { slug } = router.query;
  const {
    data: { data: post = {} } = {},
    error,
    isLoading,
  } = useSWR(slug ? `${postsCacheKey}${slug}` : null, () => getPost({ slug }));

  const { trigger: editPostTrigger } = useSWRMutation(
    `${postsCacheKey}${slug}/edit`,
    editPost
  );

const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const updatedSlug = createSlug(titleInput);
    const updatedPost = {
      id: post.id,
      body: editorContent,
      title: titleInput,
      slug: updatedSlug,
      image
    };
    const { data, error } = await editPostTrigger(updatedPost);
  
    if (!error) {
    router.push(`/blog/${updatedSlug}`);
    }
};

  if (isLoading) {
    return "...loading";
  }

  return (
    <BlogEditor
      heading="Edit blog post"
      title={post.title}
      src={post.image}
      alt={post.title}
      content={post.body}
      buttonText="Save changes"
      onSubmit={handleOnSubmit}
    />
  );
}

export const getServerSideProps = async (ctx) => {
  const supabase = createPagesServerClient(ctx);
  const { slug } = ctx.params;
  
  const {
    data: { session }, error
  } = await supabase.auth.getSession();

  
  const { data: { user } } = await supabase.auth.getUser();


  const { data } = await supabase
    .from("posts")
    .select("user_id")
    .single()
    .eq("slug", slug);

  if (!session || !session.user || !session.user.id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

const isAuthor = data.user_id === session.user.id;

  if (!isAuthor) {
    return {
      redirect: {
        destination: `/blog/${slug}`,
        permanent: true,
      }, 
    };
  }
  
  return {
    props: {},
  };
};












// //kod från genomgång row-level-security.mdgå igenom om hitta bug i egna koden nedan


// import { useRouter } from "next/router";
// import BlogEditor from "../../../../components/blog-editor";

// import { postsCacheKey, getPost, editPost } from "@/api-routes/posts";
// import useSWR from "swr";
// import useSWRMutation from "swr/mutation";
// import { useUser } from "@supabase/auth-helpers-react";
// import { createSlug } from "../../../../utils/createSlug";
// import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// export default function EditBlogPost() {
//   const router = useRouter();
//   /* Use this slug to fetch the post from the database */
//   const { slug } = router.query;
//   const user = useUser(); //behövs?
//   // console.log("user edit/index.js", user);
  

//   // const {
//   //   data: { data: post = {} } = {},
//   //   error,
//   //   isLoading,
//   // } = useSWR(slug ? `${postsCacheKey}${slug}` : null, () => getPost({ slug }));

//   const { trigger: editPostTrigger } = useSWRMutation(
//     `${postsCacheKey}${slug}`,
//     editPost
//   );

//   const {
//     data: { data: post = {} } = {},
//     error,
//     isLoading,
//   } = useSWR(slug ? `${postsCacheKey}${slug}` : null, () => getPost({ slug }));

//   const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
//     const updatedSlug = createSlug(titleInput);

//     const updatedPost = {
//       id: post.id,
//       body: editorContent,
//       title: titleInput,
//       slug: updatedSlug,
//     };

//     const { data, error } = await editPostTrigger(updatedPost);
//     console.log({ data, error });
//   };

//   if (isLoading) {
//     return "...loading";
//   }

//   return (
//     <BlogEditor
//       heading="Edit blog post"
//       title={post.title}
//       src={post.image}
//       alt={post.title}
//       content={post.body}
//       buttonText="Save changes"
//       onSubmit={handleOnSubmit}
//     />
//   );

// }

// export const getServerSideProps = async (ctx) => {
//   const supabase = createPagesServerClient(ctx);
//   const { slug } = ctx.params;

//   console.log(supabase);

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   // console.log("session", session);

//   const { data } = await supabase
//     .from("posts")
//     .select()
//     .single()
//     .eq("slug", slug);

//   const isAuthor = data.user_id === session.user.id;

//   if (!isAuthor) {
//     return {
//       redirect: {
//         destination: `/blog/${slug}`,
//         permanent: true,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

// // import { useRouter } from "next/router";
// // import BlogEditor from "../../../../components/blog-editor";

// // import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

// // import useSWR from 'swr';
// // import useSWRMutation from "swr/mutation";
// // import { User } from "@supabase/supabase-js";
// // import { getPost, editPost, postsCacheKey } from "../../../../api-routes/posts";
// // import { createSlug } from "@/utils/createSlug";


// // export default function EditBlogPost() {

// //   const router = useRouter();
// //   const { slug } = router.query;
// //   const user = useUser();

//   // const {
//   //   data: { data: post = {} } = {},
//   //   error,
//   //   isLoading,
//   // } = useSWR(slug ? `${postsCacheKey}${slug}` : null, () => getPost({ slug }));

// //   const { trigger: editPostTrigger } = useSWRMutation(
// //     `${postsCacheKey}${slug}`, 
// //     editPost);

// //   const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
// //     const updatedSlug = createSlug(titleInput);
// //     // console.log("post for update " , post);

// //     const updatedPost = {
// //       id: post.id,
// //       body: editorContent,
// //       title: titleInput,
// //       slug: updatedSlug, //utils folder slug fn
// //     }

// //     const { data, error } = await editPostTrigger(updatedPost);
// //     console.log( "data & error on editPostrigger call", { data, error });

// // if (isLoading) {
// //   return "...loading";
// // }
// //     // router.push(`/blog${slug}`);
// //   };

// //   return (
// //     <BlogEditor
// //       heading="Edit blog post"
// //       title={post.title}
// //       src={post.image}
// //       alt={post.title}
// //       content={post.body}
// //       buttonText="Save changes"
// //       onSubmit={handleOnSubmit}
// //     />
// //   );
// // }

// // export const getServerSideProps = async (ctx) => {
// //   const supabase = createPagesServerClient(ctx);
// //   const { slug } = ctx.params;

// //   const { data: { session } } = await supabase.auth.getSession();

// //   const { data } = await supabase
// //   .from("posts")
// //   .select()
// //   .single()
// //   .eq("slug", slug);


// //   console.log("session", session); //serverside run, look in terminal not browser console

// //   const isAuthor = data.user_id === session.user.id;
// //   console.log("isAuthor?", isAuthor);

// //   if (!isAuthor) {
// //     return {
// //       redirect: {
// //         destination: `blog/${slug}`,
// //         permanent: true, //no "go back" with arrrows
// //       }
// //     }
// //   }
// //   return {
// //     props: {},
// //   }
// // }
