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
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./locale/translations.json";

i18n.use(initReactI18next).init({
  resources: translations,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

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
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
