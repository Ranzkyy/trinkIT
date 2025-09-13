'use client";';
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <form action="/" method="post">
      <h1 className="text-3xl text-center mb-6 font-semibold">Login</h1>
      <div className="relative w-full h-[50px] mb-6">
        <input
          type="text"
          placeholder="Username"
          required
          className="w-full h-full bg-transparent border-2 border-white/20 rounded-full text-white text-base px-5 pr-12 outline-none placeholder-white"
        />
        <i className="bx bxs-user absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white"></i>
      </div>
      <div className="relative w-full h-[50px] mb-6">
        <input
          type="Password"
          placeholder="Password"
          required
          className="w-full h-full bg-transparent border-2 border-white/20 rounded-full text-white text-base px-5 pr-12 outline-none placeholder-white"
        />
        <i className="bx bxs-lock-alt absolute right-5 top-1/2 -translate-y-1/2 text-xl text-white"></i>
      </div>
      <div className="text-center text-sm mb-6">
        <Link href="#" className="text-white hover:underline">
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        className="w-full h-11 bg-white rounded-full shadow-md cursor-pointer text-base text-gray-800 font-semibold hover:bg-gray-200 transition"
      >
        Login
      </button>
      <div className="text-sm text-center mt-5">
        <Link href="#" className="text-white hover:underline">
          Don't have account? Create
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
