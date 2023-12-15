"use client";
import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

const Page = () => {
  const [loginForm, setLoginForm] = useState<boolean>(false);

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between w-full h-full ">
        <div className="flex-1 h-full bg-[url(/images/form-bg.png)] bg-center bg-no-repeat bg-cover text-center">
          {/* Background Container */}
        </div>
        {loginForm ? (
          <Login setLoginForm={setLoginForm} />
        ) : (
          <Signup setLoginForm={setLoginForm} />
        )}
      </div>
    </div>
  );
};

export default Page;
