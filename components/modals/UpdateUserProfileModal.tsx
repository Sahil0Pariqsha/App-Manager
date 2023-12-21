"use client";
import user from "@/models/user";
import Image from "next/image";
import React, { useState } from "react";

const UpdateUserProfileModal = ({
  Name,
  setShowUpdateUserProfileModal,
}: any) => {
  const [userName, setUserName] = useState<string>(Name);
  const [image, setImage] = useState<string | ArrayBuffer | null>("");

  const convertToBase64 = (e: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (err) => {
      console.log("Error Upload Image", err);
    };
  };

  return (
    <div className="bg-[#181818] rounded-xl border-2 border-[#323232] absolute top-2/4 left-2/4 -translate-x-1/4 -translate-y-2/4 z-10">
      <form className="p-6 min-w-[300px] mx-auto flex flex-col gap-6">
        <div className="flex gap-4">
          <Image
            src={"/images/no_user.png"}
            alt="user profile"
            height={85}
            width={85}
            className="rounded-lg"
          />
          <p className="text-[24px] font-bold">{Name}</p>
          <button
            className="flex items-center justify-center h-[40px] w-[40px] rounded-full border-2 border-[#323232] text-[#5c5c5c] hover:text-[#b3b3b3] hover:border-[#9a9a9a] absolute right-2 top-2"
            onClick={() => setShowUpdateUserProfileModal((prev: any) => !prev)}
          >
            <i className="fa-solid fa-xmark text-[24px]"></i>
          </button>
        </div>
        <div className="w-full">
          <label htmlFor="user_image" className="">
            Change Photo :
          </label>
          <input
            type="file"
            accept="image/*"
            id="user_image"
            name="user_image"
            onChange={convertToBase64}
            className="block w-full h-[45px] file:h-[35px] py-1 file:rounded-r-full file:px-4 file:bg-gradient-to-br file:from-[#343434] file:to-[#222222] file:outline-none file:border-none file:text-white file:text-[16px] text-md border-b-[3px] rounded-lg file:cursor-pointer text-green-400 outline-none bg-[#2B2B2B] border-[#3f3f3f] placeholder-gray-400"
          />
        </div>
        <div className="w-full">
          <label htmlFor="user_name" className="">
            Update Name :
          </label>
          <input
            type="text"
            id="user_name"
            name="user_name"
            className="w-full min-h-[45px] border-b-[3px] border-[#3f3f3f] bg-[#2B2B2B] outline-none px-4 rounded-lg"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="font-Poppins min-h-[45px] font-bold rounded-lg w-full bg-white active:bg-gray-200 text-black drop-shadow-md hover:bg-white/70 transition-all duration-200 hover:text-white/70"
        >
          {<p>Update Profile</p>}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserProfileModal;
