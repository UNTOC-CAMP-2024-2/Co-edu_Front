import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/AppRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <AppRouter />
  </QueryClientProvider>
);
