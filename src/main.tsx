import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PostsList } from "./features/posts/PostsList.tsx";
import { AddPostForm } from "./features/posts/AddPostForm.tsx";
import SinglePostPage from "./features/posts/SinglePostPage.tsx";
import EditPostForm from "./features/posts/EditPostForm.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <AddPostForm />
        <PostsList />
      </>
    ),
  },
  {
    path: "/posts/:postId",
    element: <SinglePostPage />,
  },
  {
    path: "/editPost/:postId",
    element: <EditPostForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
