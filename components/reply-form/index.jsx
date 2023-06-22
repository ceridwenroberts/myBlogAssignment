import styles from "components/reply-form/editor.module.css";
import Editor from "@components/editor/editor";
import { useState } from "react";
import Button from "@components/button";
import Input from "@components/input";
import Label from "@components/label";
import Heading from "@components/heading";
import ImageUpload from "@components/upload-image";
import { useRouter } from "next/router";

export default function ReplyForm({
  content = "",
  src = null,
  title = "",
  commentAuthor="",
  replyAuthor="",
  heading = "",
  onSubmit,
  buttonText = "Submit",
  name = "",
}) {
  const router = useRouter;
  const [editorContent, setEditorJsonContent] = useState(content);
  const [replyAuthorInput, setReplyAuthorInput] = useState(replyAuthor);

  const handleOnChange = (content) => {
    setEditorJsonContent(content);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSubmit({ editorContent, replyAuthorInput });
  };

 
  return (
    <>
      <Heading name={name}>{`Reply to ${name}`}</Heading>
      <form onSubmit={handleOnSubmit} className={styles.container}>
        
        <Label>Author</Label>
        <Input
          replyAuthor={replyAuthor}
          // className={styles.titleInput}
          value={replyAuthorInput}
          onChange={(e) => setReplyAuthorInput(e.target.value)}
        />
        <Editor
          content={content}
          // className={styles.editor}
          onChange={handleOnChange}
        />
        <Button className={styles.uploadButton} type="submit">
          {buttonText}
        </Button>
      </form>
    </>
  );
}
