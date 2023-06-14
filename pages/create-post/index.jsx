import BlogEditor from "@/components/blog-editor";
import { createSlug } from "@/utils/createSlug";
import useSWRMutation from "swr/mutation";
import { postsCacheKey, addPost } from "../../api-routes/posts";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

export default function CreatePost() {
  const router = useRouter();
  const user = useUser();

  const { trigger: addPostTrigger } = useSWRMutation(postsCacheKey, addPost);

  const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
    const slug = createSlug(titleInput);

    const newPost = {
      body: editorContent,
      title: titleInput,
      slug,
      user_id: user.id,
      image,
    };
    const { error } = await addPostTrigger(newPost);

    if (!error) {
      router.push(`/blog/${slug}`);
    }
  };

  return (
    <>
{/* <input type="file" onChange={(e) => console.log(e.target.files[0])}  /> */}
    <BlogEditor
      heading="Create post"
      onSubmit={handleOnSubmit}
      buttonText="Upload post"
    />
    </>
  );
}


// //pasted from row-level-security.md
// import BlogEditor from "@/components/blog-editor";
// import { createSlug } from "@/utils/createSlug";
// import useSWRMutation from "swr/mutation";
// import { postsCacheKey, addPost } from "../../api-routes/posts";
// import { useRouter } from "next/router";
// import { useUser } from "@supabase/auth-helpers-react";

// export default function CreatePost() {
//   const router = useRouter();
//   const user = useUser();

//   const { trigger: addPostTrigger } = useSWRMutation(postsCacheKey, addPost);

//   const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
//     const slug = createSlug(titleInput);

//     const newPost = {
//       body: editorContent,
//       title: titleInput,
//       slug,
//       user_id: user.id,
//     };
//     const { error } = await addPostTrigger(newPost);

//     if (!error) {
//       router.push(`/blog/${slug}`);
//     }
//   };

//   return (
//     <BlogEditor
//       heading="Create post"
//       onSubmit={handleOnSubmit}
//       buttonText="Upload post"
//     />
//   );
// }

// import BlogEditor from "@/components/blog-editor";
// import { createSlug } from "@/utils/createSlug";
// import { useRouter } from "next/router";
// import { addPost, postsCacheKey } from "../../api-routes/posts";
// import useSWRMutation from "swr/mutation";
// import { useUser } from "@supabase/auth-helpers-react";

// export default function CreatePost() {
//   const router = useRouter(); //Next.js
//   const user= useUser();
  
//   const { trigger: addPostTrigger } = useSWRMutation(postsCacheKey, addPost); //SWRMutation

//   const handleOnSubmit = async ({ editorContent, titleInput, image }) => {
//     const slug = createSlug(titleInput);
   
//     // await addPostTrigger({
//     //   body: editorContent,
//     //   title: titleInput,
//     //   slug
//     // });

//     console.log("user", user);

//     const newPost = {
//       body: editorContent,
//       title: titleInput,
//       slug,
//       user_id: user.id,
//     }
// //     console.log({ editorContent, titleInput, slug });

// const { error } = await addPostTrigger(newPost); 
   
//  if(!error) {
//   router.push(`/blog/${slug}`);
//  }
   
//   };



//   return (
//     <BlogEditor
//       heading="Create post"
//       onSubmit={handleOnSubmit}
//       buttonText="Upload post"
//     />
//   );
// }
