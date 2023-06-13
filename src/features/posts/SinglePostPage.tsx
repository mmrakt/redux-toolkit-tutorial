import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );
  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    );
  }
  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <div>
          <TimeAgo timestamp={post.date ?? ""} />
          <PostAuthor userId={post.user ?? ""} />
        </div>
        <p className="post-content">{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPost/${post.id}`} className="button">
          Edit post
        </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
