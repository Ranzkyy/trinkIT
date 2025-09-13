import LoginForm from "@/components/logincomponent/LoginForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="lg:w-md md:w-sm sm:w-xs bg-transparent border-2 border-white/20 backdrop-blur-xl shadow-lg shadow-black/20 text-white rounded-lg px-10 py-8">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
