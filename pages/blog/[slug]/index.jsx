import { useRouter } from "next/router";
import styles from "../blog.module.css";

const post = {
  id: "1234",
  title: "Why you should use a react framework",
  slug: "why-you-should-use-react-framework",
  createdAt: "2022-02-12",
  body: `
  <p>With the History extension the Editor will keep track of your changes. And if you think you made a mistake, you can redo your changes. Try it out, change the content and hit the undo button!</p>
  <p>And yes, you can also use a keyboard shortcut to undo changes (Control/Cmd Z) or redo changes (Control/Cmd Shift Z).</p>
  <p>Wow, this editor has support for links to the whole <a href="https://en.wikipedia.org/wiki/World_Wide_Web">world wide web</a>. We tested a lot of URLs and I think you can add *every URL* you want. Isn’t that cool? Let’s try <a href="https://statamic.com/">another one!</a> Yep, seems to work.</p>
  <p>By default every link will get a <code>rel="noopener noreferrer nofollow"</code> attribute. It’s configurable though.</p>
  <p><strong>This is bold.</strong></p>
  <p><u>This is underlined though.</u></p>
  <p><em>This is italic.</em></p>
  <p><s>But that’s striked through.</s></p>
  <p><code>This is code.</code></p>
  `,
};

export default function BlogPost() {
  const router = useRouter();

  /* Use this slug to fetch the post from the database */
  const { slug } = router.query;

  return (
    <section>
      <h1 className={styles.heading}>{post.title}</h1>
      <time className={styles.date}>{post.createdAt}</time>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
    </section>
  );
}