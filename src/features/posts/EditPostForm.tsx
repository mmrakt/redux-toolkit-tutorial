import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState } from "react";
import { postUpdated } from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const post = useAppSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  if (!post) return null;

  const EditPostFormInner = () => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onTitleChanged = ({ target }: { target: HTMLInputElement }) =>
      setTitle(target.value);
    const onContentChanged = ({ target }: { target: HTMLTextAreaElement }) =>
      setContent(target.value);

    const onSavePostClicked = () => {
      if (postId && title && content) {
        dispatch(postUpdated({ id: postId, title, content }));
        navigate(`/posts/${postId}`);
      }
    };

    return (
      <section>
        <h2>Edit Post</h2>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="What's on your mind?"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
        </form>
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </section>
    );
  };

  return <EditPostFormInner />;
};

export default EditPostForm;
