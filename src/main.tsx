import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles.css";
import { Provider } from "react-redux";
import { createAppStore } from "./store/store";
import { BrowserRouter } from "react-router";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("The application root element is missing.");

const store = createAppStore();

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
