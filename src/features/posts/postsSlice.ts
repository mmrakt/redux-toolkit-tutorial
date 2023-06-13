import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";

export type Reactions = {
  thumbsUp: number;
  hooray: number;
  heart: number;
  rocket: number;
  eyes: number;
};

export type ReactionKey = keyof Reactions;

export type Post = {
  id: string;
  title: string;
  content: string;
  date?: string;
  user?: string;
  reactions: Reactions;
};

type ReactionAddedPayload = {
  postId: string;
  reaction: string;
};

const defaultReactions = {
  thumbsUp: 0,
  hooray: 0,
  heart: 0,
  rocket: 0,
  eyes: 0,
};
const initialState: Post[] = [
  {
    id: "1",
    title: "First Post!",
    content: "Hello!",
    user: "0",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: defaultReactions,
  },
  {
    id: "2",
    title: "Second Post",
    content: "More text",
    user: "2",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: defaultReactions,
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded: (state, action: PayloadAction<ReactionAddedPayload>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction as ReactionKey]++;
      }
    },
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.push(action.payload);
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            user: userId,
            reactions: defaultReactions,
          },
        };
      },
    },
    postUpdated(
      state,
      action: PayloadAction<{ id: string; title: string; content: string }>
    ) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
