import React, { useState } from "react";
import { authService } from "../api/authService";
import axios from "axios";
import type { ApiResponse } from "../types/auth";
import { useAppDispatch } from "../store/hooks";
import { setCredentials } from "../store/authSlice";

interface LoginProps {
  onSwitchToSignup: () => void;
}

export const Login: React.FC<LoginProps> = ({ onSwitchToSignup }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Please provide both email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(formData);
      if (response.success && response.data) {
        const token = response.data.accessToken || response.data.token;

        if (token) {
          dispatch(
            setCredentials({
              user: response.data,
              token: token,
            }),
          );
        } else {
          setError(
            response.errorMessage || response.message || "Invalid credentials.",
          );
        }
      }
    } catch (err: unknown) {
      let backendMessage =
        "Unable to log in. Please check your credentials and server.";
      if (axios.isAxiosError<ApiResponse>(err)) {
        backendMessage =
          err.response?.data?.errorMessage ||
          err.response?.data?.message ||
          backendMessage;
      } else if (err instanceof Error) {
        // Handles generic JavaScript errors (e.g., TypeError, ReferenceError)
        backendMessage = err.message;
      }
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-slate-800 rounded-2xl shadow-xl border border-slate-700 text-left">
      <h2 className="text-2xl font-bold text-white mb-2 text-center">
        Welcome Back
      </h2>
      <p className="text-slate-400 text-sm mb-6 text-center">
        Log in to your account
      </p>
      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            required
          />
        </div>
        {/* Password */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            required
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition duration-150 ease-in-out text-sm"
        >
          {loading ? "Logging in..." : "Sign In"}
        </button>
      </form>
      {/* Switch to Signup */}
      <p className="mt-6 text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToSignup}
          className="text-emerald-400 hover:text-emerald-300 font-medium underline"
        >
          Create one
        </button>
      </p>
    </div>
  );
};
