import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./components/routes/Router.tsx";
import { AuthProvider, NotesProvider } from "./providers";

import "./assets/styles/reset.css";
import "./assets/styles/global.css";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <NotesProvider>
      <StrictMode>
        <Router />
      </StrictMode>
    </NotesProvider>
  </AuthProvider>
);
