import { useState } from "react";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { logout } from "./store/authSlice";

function App() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      {isAuthenticated && user ? (
        <div className="w-full max-w-md p-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 text-center text-white">
          <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
            ✓
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-slate-300 text-sm mb-6">
            Logged in as{" "}
            <span className="font-semibold text-emerald-400">
              {user.email || user.fullName || "User"}
            </span>
          </p>
          <button
            onClick={handleLogout}
            className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-sm transition"
          >
            Log Out
          </button>
        </div>
      ) : (
        /* If not logged in, show Login or Signup based on authMode */
        <>
          {authMode === "login" ? (
            <Login onSwitchToSignup={() => setAuthMode("signup")} />
          ) : (
            <Signup
              onSwitchToLogin={() => setAuthMode("login")}
              onSignupSuccess={() => setAuthMode("login")}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
