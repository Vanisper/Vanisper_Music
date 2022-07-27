// import "./App.css";
import { useState, useEffect } from "react";
import { Router } from "~/router/Router";
import { AppContextProvider } from "~/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// 创建一个client
const queryClient = new QueryClient();
function App() {
  useEffect(() => {}, []);

  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AppContextProvider>
  );
}

export default App;
