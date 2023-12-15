"use client";
import React, { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import { handleLogInAction } from "@/lib/actions";
import { useFormState } from "react-dom";

const Login = ({ setLoginForm }: any) => {
  const initialFromErrorsState: FormDataErrors = {
    name: null,
    confirm_password: null,
    email: null,
    userExist: null,
    wrongPassword: null,
    userId: null,
  };

  const [state, fromAction] = useFormState(
    handleLogInAction,
    initialFromErrorsState
  );

  const [passwordType, setPasswordType] = useState<string>("password");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handlePasswordClick = () => {
    setShowPassword((prevState) => !prevState);
    setPasswordType(`${passwordType === "password" ? "text" : "password"}`);
  };

  const handleFromChange = () => {
    setLoginForm((prevState: boolean) => !prevState);
  };

  return (
    <div className="form flex-1">
      <h1 className="font-bold font-Poppins text-[40px] w-fit mx-auto mb-8">
        Log in
      </h1>
      <form
        className="w-[65%] min-w-[300px] mx-auto px-4 flex flex-col gap-6"
        action={fromAction}
      >
        {" "}
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email Address"
          className="w-full min-h-[45px] border-b-[1px] bg-[#2B2B2B] outline-none px-4 rounded-lg"
          required
        />
        <div className="-mt-4 flex justify-between text-[16px]">
          <p className="text-red-400">
            {state.email ? state.email : state.userExist}
          </p>
        </div>
        <div className="w-full relative">
          <input
            type={passwordType}
            name="password"
            id="password"
            placeholder="Password"
            className="w-full min-h-[45px] border-b-[1px] bg-[#2B2B2B] outline-none px-4 rounded-lg"
            required
          />
          <button
            type="button"
            className="absolute right-3 translate-y-2/4 w-6"
            id="password-btn"
            onClick={handlePasswordClick}
          >
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </button>
        </div>
        <div className="-mt-4 flex justify-between text-[16px]">
          <p className="text-red-400">{state.wrongPassword}</p>
        </div>
        <ForgetPassword />
        <button
          type="submit"
          className="font-Poppins min-h-[45px] font-bold rounded-lg w-full bg-white active:bg-gray-200 text-black drop-shadow-md"
        >
          Log in
        </button>
        <div className="-mt-4 flex justify-between text-[16px]">
          <p className="text-green-400">
            {state.userId && "User Login Successful"}
          </p>
        </div>
      </form>
      <div className="w-fit mx-auto text-[#5F5F5F] font-Poppins mt-10">
        Don&apos;t have an account ?
        <button onClick={handleFromChange}>
          <span className="font-Poppins font-bold ml-2 text-white">
            Sign up
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
