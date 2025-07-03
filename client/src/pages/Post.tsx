import usePost from "../hooks/usePost";
import { useParams } from "react-router-dom";
import "../post.css";

const makeParagraphs = (text: string, wordsPerPara = 100) => {
  const words = text.split(" ");
  const paras = [];
  for (let i = 0; i < words.length; i += wordsPerPara) {
    paras.push(words.slice(i, i + wordsPerPara).join(" "));
  }
  return paras;
};

const Post = () => {
  const { id } = useParams();

  const { post } = usePost(id as string);
  const paras = makeParagraphs(post?.body as string, 80);

  return (
    <div>
      <h3>{post?.title}</h3>
      <article className="readable">
        {paras.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>{" "}
    </div>
  );
};

export default Post;
