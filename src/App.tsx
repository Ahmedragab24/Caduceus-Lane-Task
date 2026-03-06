import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Header from "./components/Layout/Header";
import ReduxToastHandler from "./components/ui/ReduxToastHandler";
import GlobalLoader from "./components/ui/GlobalLoader";

function App() {
  const theme = useSelector((state: RootState) => state.app.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Toaster position="bottom-right" reverseOrder={false} />
      <ReduxToastHandler />
      <GlobalLoader />
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
