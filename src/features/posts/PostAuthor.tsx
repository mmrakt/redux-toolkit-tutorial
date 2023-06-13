import { useAppSelector } from "../../app/hooks";

const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useAppSelector((state) =>
    state.users.find((user) => user.id === userId)
  );

  return <span>by {author ? author.name : "Unknown author"}</span>;
};

export default PostAuthor;
