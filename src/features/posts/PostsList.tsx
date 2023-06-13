import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

export const PostsList = () => {
  const posts = useAppSelector((state) => state.posts);

  const renderedPosts = posts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <div>
        <TimeAgo timestamp={post.date ?? ""} />
        <PostAuthor userId={post.user ?? ""} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View post
      </Link>
    </article>
  ));

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};
