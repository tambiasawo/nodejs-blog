import usePost from "../hooks/usePost";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();

  const { post, } = usePost(id as string);

  return (
    <div>
      <h1>{post?.title}</h1>
      <div>{post?.body} </div>
    </div>
  );
};

export default Post;
