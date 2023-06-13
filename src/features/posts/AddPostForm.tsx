import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { postAdded } from "./postsSlice";

export const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");

  const users = useAppSelector((state) => state.users);

  const onTitleChanged = ({ target }: { target: HTMLInputElement }) =>
    setTitle(target.value);
  const onContentChanged = ({ target }: { target: HTMLTextAreaElement }) =>
    setContent(target.value);
  const onAuthorChanged = ({ target }: { target: HTMLSelectElement }) =>
    setUserId(target.value);

  const dispatch = useAppDispatch();

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, userId));
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};
