import Link from "next/link";
import useSWR from 'swr';

import styles from "./blog.module.css";
import Heading from "@components/heading";

import { getPosts, postsCacheKey } from "../../api-routes/posts";


export default function Blog() {
  const { data: { data: posts = [] } = {}, error } = useSWR(postsCacheKey, getPosts);
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