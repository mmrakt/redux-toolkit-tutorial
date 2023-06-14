import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import PostAuthor from "./PostAuthor";
import { TimeAgo } from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { useEffect } from "react";
import { fetchPosts } from "./postsSlice";

export const PostsList = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);

  const postStatus = useAppSelector((state) => state.posts.status);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  const renderedPosts = posts.posts.map((post) => (
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
