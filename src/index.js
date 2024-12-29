import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppProvider from "./AppProvider";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </AppProvider>
);
