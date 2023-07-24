import { useEffect, useState } from "react";
import MainPage from "./pages/mainpage/MainPage";
import LoginPage from "./pages/loginpage/LoginPage";
import { useAuthStore } from "./state/AppState";

function App() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return (
    <div className="flex w-full h-screen">
      {isLoggedIn ? <MainPage /> : <LoginPage />}
    </div>
  );
}

export default App;
