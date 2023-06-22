import Link from "next/link";
import styles from "./blog.module.css";
import Heading from "@components/heading";

import useSWR from 'swr';
import { getPosts, postsCacheKey } from "../../api-routes/posts";


export default function Blog() {
  const { data: { data: posts = [] } = {}, error } = useSWR(postsCacheKey, getPosts);
  // console.log("[slug]/index.js (single)Blog", { posts });
  return (
    <section>
      <Heading>Blog</Heading>
      {posts?.map((post) => (
        <Link
          key={post.slug}
          className={styles.link}
          href={`/blog/${post.slug}`}
        >
          <div className="w-full flex flex-col">
            <p>{post.title}</p>
            <time className={styles.date}>{post.created_at}</time>
          </div>
        </Link>
      ))}
    </section>
  );
};



// const mockData = [
//   {
//     id: "123",
//     title: "Community-Messaging Fit",
//     slug: "community-messaging-fit",
//     createdAt: "2022-02-15",
//     body: "<p>This is a good community fit!</p>",
//   },
//   {
//     id: "1234",
//     title: "Why you should use a react framework",
//     slug: "why-you-should-use-react-framework",
//     createdAt: "2022-02-12",
//     body: "<p>This is a good community fit!</p>",
//   },
// ];
