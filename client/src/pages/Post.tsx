import usePost from "../hooks/usePost";
import { useParams } from "react-router-dom";
import "../post.css";
import React from "react";

const makeParagraphs = (text: string, wordsPerPara = 100) => {
  const words = text?.split(" ");
  const paras = [];
  for (let i = 0; i < words.length; i += wordsPerPara) {
    paras.push(words.slice(i, i + wordsPerPara).join(" "));
  }
  return paras;
};

const Post = () => {
  const { id } = useParams();

  const { post } = usePost(id as string);
  const [paras, setParas] = React.useState<string[]>([]);

  /*  React.useEffect(() => {
    if (post?.body) setParas(makeParagraphs(post.body as string, 80));
  }, [post]);
   */
  return (
    <div>
      <h3>{post?.title}</h3>
      <article
        className="readable"
        dangerouslySetInnerHTML={{ __html: post?.body || "" }}
      ></article>
    </div>
  );
};

export default Post;
