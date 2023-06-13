import { useAppDispatch } from "../../app/hooks";
import { Post, ReactionKey, reactionAdded } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  hooray: "🎉",
  heart: "❤️",
  rocket: "🚀",
  eyes: "👀",
};

const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useAppDispatch();
  return Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reaction: name }));
        }}
      >
        {emoji} {post.reactions[name as ReactionKey]}
      </button>
    );
  });
};

export default ReactionButtons;
