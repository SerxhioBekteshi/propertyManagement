import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense>
      <App />
    </Suspense>
  </BrowserRouter>,
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
}
