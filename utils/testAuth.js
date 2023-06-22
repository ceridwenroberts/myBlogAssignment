import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

export default function testAuth() {
  const getServerSideProps = async (ctx) => {
  
  const supabase = createPagesServerClient(ctx);
  const { slug } = ctx.params;
  
  const {
    data: { session }, error
  } = await supabase.auth.getSession();
  console.log("session attempt");
  

  const { data: { user } } = await supabase.auth.getUser();
  console.log(user);


  const { data } = await supabase
    .from("posts")
    .select()
    .single()
    .eq("slug", slug);

    console.log("session:", session);
    // const { props, session, isAuthor } = getServerSideProps();
  
    const isAuthor = data.user_id === session?.user.id;

      // Check if the user is authenticated
  if (!session || !session.user || !session.user.id) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  
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
}
// export default function testAuth() {
//   const getServerSideProps = async (ctx) => {
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
//       isAuthor: true,
//       redirect: {
//         destination: `/blog/${slug}`,
//         permanent: true,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }
//   }