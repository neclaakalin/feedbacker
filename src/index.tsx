import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import "./index.css";
import GiveFeedback from "./pages/GiveFeedback/GiveFeedback";
import ShowFeedbacks from "./pages/ShowFeedbacks/ShowFeedbacks";
import reportWebVitals from "./reportWebVitals";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Navigate to="/give-feedback" replace />} />
      <Route path="give-feedback" element={<GiveFeedback />} />
      <Route path="show-feedbacks" element={<ShowFeedbacks />} />
      <Route path="*" element={<Navigate to="/give-feedback" replace />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
