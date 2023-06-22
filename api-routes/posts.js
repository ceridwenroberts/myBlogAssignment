import { supabase } from "../lib/supabaseClient";
import { uploadImage } from "../utils/uploadImage";
export const postsCacheKey = "api/blog";


// to and from Supabase
export const getPosts = async () => {
  const { data, error, status } = await supabase.from("posts").select();

  return { data, error, status };
};

export const getPost = async ({ slug }) => {
  const { data, error, status } = await supabase
    .from("posts")
    .select("*")
    .single()
    .eq("slug", slug);

  return { data, error, status };
};

export const addPost = async (_, { arg: newPost }) => {
  console.log("newPost i posts.js", newPost);
  //Handle add post here


  let image = "";
  if (newPost?.image) {
      //create fn takes uploaded image from client
  //upload to bucket
  //get pub url and return it
    const { publicUrl, error } = await uploadImage(newPost?.image);

    if (!error) {
      image = publicUrl;
    }
  }

  console.log(image);

  const { data, error, status } = await supabase
    .from("posts")
    // .insert({ title, slug, body })
    .insert({ ...newPost, image })
    .single()
    .select();
  // console.log( "post status", { status }, { error } );
  return { data, error, status };
};

export const editPost = async (_, { arg: updatedPost }) => {
  // console.log("arg posts.js/editPost", {arg});
  let image = updatedPost?.image ?? "";

  const isNewImage = typeof image === "object" && image !== null; // vad var dillen med image (url?) som object?

  if (isNewImage) {
    const { publicUrl, error } = await uploadImage(updatedPost.image);

    if (!error) {
      image = publicUrl;
    }
    
  }

  const { data, error, status } = await supabase
    .from("posts")
    .update({ ...updatedPost, image })
    .eq("id", updatedPost.id)
    .select()
    .single();

  console.log(
    "in posts.js/editPost; data:",
    data,
    "status:",
    status,
    "error:",
    error
  );

  return { data, error, status };
};


export const deletePost = async (_, { arg: { slug, id } }) => {
  //Handle delete post here
  const { data, error, status } = await supabase
    .from("posts")
    .delete()
    .select()
    .eq("id", id)
    .single();
  console.log("deletePost", data);
  if (data) {
    console.log("there is data", data);
    return {
      redirect: {
        destination: "/blog",
        permanent: false,
      },
    };
  }
  // return { data, error, status };
};
