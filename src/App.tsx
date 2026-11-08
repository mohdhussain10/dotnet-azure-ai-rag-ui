import { useState } from "react";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { useAppSelector } from "./store/hooks";
import { HomeScreen } from "./components/HomeScreen";

function App() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  return (
    <div>
      {/* If logged in, show HomeScreen! */}
      {isAuthenticated ? (
        <HomeScreen />
      ) : (
        /* If not logged in, show Login or Signup */
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
          {authMode === "login" ? (
            <Login onSwitchToSignup={() => setAuthMode("signup")} />
          ) : (
            <Signup
              onSwitchToLogin={() => setAuthMode("login")}
              onSignupSuccess={() => setAuthMode("login")}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
