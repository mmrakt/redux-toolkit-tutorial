import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  nanoid,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

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

type Status = "idle" | "loading" | "succeeded" | "failed";

const initialState: {
  posts: Post[];
  status: Status;
  error: string | null;
} = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await client.get("/fakeApi/posts");
  return response.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionAdded: (state, action: PayloadAction<ReactionAddedPayload>) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction as ReactionKey]++;
      }
    },
    postAdded: {
      reducer: (state, action: PayloadAction<Post>) => {
        state.posts.push(action.payload);
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
      const existingPost = state.posts.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
  },
});

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
