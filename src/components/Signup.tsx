import React, { useState } from "react";
import { authService } from "../api/authService";
import axios from "axios";
import type { ApiResponse } from "../types/auth";

interface SignupProps {
  onSwitchToLogin: () => void;
  onSignupSuccess?: () => void;
}

export const Signup: React.FC<SignupProps> = ({
  onSwitchToLogin,
  onSignupSuccess,
}) => {
  // 1. Form state to store inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // 2. UI feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Update state whenever user types in any input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Handle submit button click
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload
    setError(null);
    setSuccessMessage(null);

    // Basic client-side check
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      // Call our .NET backend through authService
      const response = await authService.signup(formData);

      if (response.success) {
        setSuccessMessage("Account created successfully! You can now log in.");

        // If backend returned a token on signup, optionally store it:
        const token = response.data?.accessToken || response.data?.token;
        if (token) {
          localStorage.setItem("rag_token", token);
        }

        // Notify parent if callback provided
        if (onSignupSuccess) {
          setTimeout(() => onSignupSuccess(), 1500);
        }
      } else {
        setError(response.errorMessage || response.message || "Signup failed.");
      }
    } catch (err: unknown) {
      let backendMessage = "Unable to connect to server. Please try again.";
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
        Create an Account
      </h2>
      <p className="text-slate-400 text-sm mb-6 text-center">
        Sign up to get started
      </p>

      {/* Error Banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Success Banner */}
      {successMessage && (
        <div className="mb-4 p-3 bg-emerald-900/50 border border-emerald-500 rounded-lg text-emerald-200 text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
              required
            />
          </div>
        </div>

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
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      {/* Switch to Login */}
      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-emerald-400 hover:text-emerald-300 font-medium underline"
        >
          Log In
        </button>
      </p>
    </div>
  );
};
