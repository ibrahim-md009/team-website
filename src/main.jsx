import { createRoot } from "react-dom/client";
import { Router } from "./router.jsx";
import { AppProvider } from "./context.jsx";
import App from "./App.jsx";
import "./styles/styles.css";

createRoot(document.getElementById("root")).render(
  <Router>
    <AppProvider>
      <App />
    </AppProvider>
  </Router>
);
