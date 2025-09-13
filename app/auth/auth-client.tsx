"use client";

import { useState } from "react";
import { signIn, signInSocial, signUp } from "./auth-actions";

const AuthClient = () => {
  const [isSignin, setIsSignin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialAuth = async (provider: "google" | "github") => {
    setIsLoading(true);
    setError("");
    try {
      await signInSocial(provider);
    } catch (err) {
      setError(
        `Error during sign in ${provider}: ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      if (isSignin) {
        const result = await signIn(email, password);
        if (!result.user) {
          setError("Sign in failed");
        }
      } else {
        const result = await signUp(email, password, name);
        if (!result.user) {
          setError("Sign up failed");
        }
      }
    } catch (err) {
      setError(
        `auth error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {isSignin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-600">
          {isSignin
            ? "Sign in to your account to continue"
            : "Sign up to get started with better-auth"}
        </p>
      </div>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
      <div>
        <button onClick={() => handleSocialAuth("google")} disabled={isLoading}>
          Sign in with Google
        </button>
        <button onClick={() => handleSocialAuth("github")} disabled={isLoading}>
          Sign in with GitHub
        </button>
      </div>
      <form onSubmit={handleEmailPasswordAuth}>
        {!isSignin && (
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              autoComplete="name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isSignin}
              placeholder="Your Name"
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            name="email"
            autoComplete="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Your Email"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            name="password"
            autoComplete={isSignin ? "current-password" : "new-password"}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your Password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <div>
              <p>loading</p>
              {isSignin ? "Signing in..." : "Creating account..."}
            </div>
          ) : isSignin ? (
            "Sign In"
          ) : (
            "Create Account"
          )}
        </button>
      </form>
      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsSignin(!isSignin);
            setError(""); // Clear any previous errors
            setName(""); // Clear name when switching modes
          }}
          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium transition-colors"
        >
          {isSignin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AuthClient;
