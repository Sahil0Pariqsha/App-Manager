"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const pathName = usePathname();
  const [selectedTab, setSelectedTab] = useState<string>(pathName);
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/profile`);
        const data = response.data;
        // console.log("data from fetch user", data);
        setUser(data);
      } catch (err) {
        console.log(err);
        router.push("/");
      }
    };
    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    setSelectedTab("signOut");
    try {
      await axios.get("/api/signout");
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  let currentDate = new Date().toJSON().slice(0, 10);

  return (
    <div className="w-full h-full flex justify-between items-center min-w-[190px] px-6 py-2 relative">
      <div>
        <button onClick={() => setOpenMenu(!openMenu)}>
          <i
            className={`fa-solid ${
              openMenu ? "fa-xmark" : "fa-bars"
            } text-[24px]`}
          ></i>
        </button>
      </div>
      <div
        className={`w-full ${
          openMenu ? "block" : "hidden"
        } bg-[#212121] border-2 border-[#a0a0a0] rounded-2xl drop-shadow-2xl absolute top-0 left-0 translate-y-[30%] z-10 overflow-hidden`}
      >
        <ul className="flex flex-col text-[18px] gap-2 font-bold w-full text-left whitespace-nowrap">
          <Link href={"/dashboard"}>
            <li
              className={`min-h-[30px] pl-6 py-2 text-[#5c5c5c] cursor-pointer bg-[#323232]/0 border-r-4 border-green-500/0 ${
                selectedTab === "/dashboard"
                  ? "bg-[#323232]/100 text-white border-green-500/100"
                  : ""
              } transition-all ease-in-out duration-600`}
              onClick={() => setSelectedTab("/dashboard")}
            >
              <span className="w-[40px] inline-block">
                <i className="fa-solid fa-house w-[15px] mr-1"></i>
              </span>
              All Tasks
            </li>
          </Link>
          <Link href={"/dashboard/important"}>
            <li
              className={`min-h-[30px] pl-6 py-2 text-[#5c5c5c] cursor-pointer bg-[#323232]/0 border-r-4 border-green-500/0 ${
                selectedTab === "/dashboard/important"
                  ? "bg-[#323232]/100 text-white border-green-500/100"
                  : ""
              } transition-all ease-in-out duration-600`}
              onClick={() => setSelectedTab("/dashboard/important")}
            >
              <span className="w-[40px] inline-block">
                <i className="fa-solid fa-list w-[20px] mr-1"></i>
              </span>
              Important
            </li>
          </Link>
          <Link href={"/dashboard/completed"}>
            <li
              className={`min-h-[30px] pl-6 py-2 text-[#5c5c5c] cursor-pointer bg-[#323232]/0 border-r-4 border-green-500/0  ${
                selectedTab === "/dashboard/completed"
                  ? "bg-[#323232]/100 text-white border-green-500/100"
                  : ""
              } transition-all ease-in-out duration-600`}
              onClick={() => setSelectedTab("/dashboard/completed")}
            >
              <span className="w-[40px] inline-block">
                <i className="fa-solid fa-check w-[20px] mr-1"></i>
              </span>
              Completed
            </li>
          </Link>
          <Link href={"/dashboard/doitnow"}>
            <li
              className={`min-h-[30px] pl-6 py-2 text-[#5c5c5c] cursor-pointer bg-[#323232]/0 border-r-4 border-green-500/0  ${
                selectedTab === "/dashboard/doitnow"
                  ? "bg-[#323232]/100 text-white border-green-500/100"
                  : ""
              } transition-all ease-in-out duration-600`}
              onClick={() => setSelectedTab("/dashboard/doitnow")}
            >
              <span className="w-[40px] inline-block">
                <i className="fa-solid fa-clipboard w-[20px] mr-1"></i>
              </span>
              Do it Now
            </li>
          </Link>
          <li
            className={`min-h-[30px] pl-6 py-2 text-[#5c5c5c] cursor-pointer border-r-4 border-green-500/0 active:text-green-500 active:bg-[#323232]/100  transition-all ease-in-out duration-900 ${
              selectedTab === "signOut"
                ? "bg-[#323232]/100 text-white border-green-500/100"
                : ""
            } `}
            onClick={handleSignOut}
          >
            <span className="w-[40px] inline-block">
              <i className="fa-solid fa-arrow-right-from-bracket w-[20px] mr-1"></i>
            </span>
            Sign Out
          </li>
        </ul>
      </div>
      <div className="flex flex-row-reverse items-center gap-2">
        <div className="h-[40px] w-[40px] shrink-0 relative rounded-[10%] overflow-hidden">
          <Image
            src={"/images/no_user.png"}
            alt="profile"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="font-bold text-[20px]">{user?.name}</h1>
          <p className="text-[12px] text-right -mt-1 text-gray-400">
            {currentDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
