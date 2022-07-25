// import "./App.css";
import { Loading } from "./loading/index";
import { useState, useEffect } from "react";
import { Router } from "~/router/Router";
import { AppContextProvider } from "~/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 创建一个client
const queryClient = new QueryClient();
function App() {
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.onload = () => {
      let temp = setTimeout(() => {
        setIsLoading(false);
        clearTimeout(temp);
      }, 1000);
    };
    if (document.readyState == "complete") {
      setIsLoading(false);
    }
  }, []);

  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </AppContextProvider>
  );
}

export default App;
