"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const SideBar = () => {
  const [user, setUser] = useState<any>(null);
  const pathName = usePathname();
  const [loadingSignOut, setLoadingSignOut] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>(pathName);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/api/profile`);
        const data = response.data;
        setUser(data);
      } catch (err) {
        console.log(err);
        router.push("/");
      }
    };
    fetchUserData();
  }, [router]);

  const handleSignOut = async () => {
    setLoadingSignOut((prev) => !prev);
    try {
      const response = await axios.get("/api/signout");
      console.log(response.data);
      setLoadingSignOut((prev) => !prev);
      router.push("/");
    } catch (error) {
      setLoadingSignOut((prev) => !prev);
      toast.error("Failed to sign out user");
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center min-w-[190px]">
      <div className="flex items-center gap-2 px-8">
        <div className="h-[50px] w-[50px] shrink-0 relative rounded-[50%] overflow-hidden">
          <Image
            src={"/images/no_user.png"}
            alt="profile"
            height={60}
            width={60}
            className="object-cover"
          />
        </div>
        <h1 className="font-bold text-[20px]">{user?.name}</h1>
      </div>

      <main className="w-full">
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
        </ul>
      </main>

      <button
        className="font-bold text-[18px] relative h-[50px]"
        onClick={handleSignOut}
      >
        {loadingSignOut ? (
          <LoadingSpinner />
        ) : (
          <span>
            <i className="fa-solid fa-arrow-right-from-bracket w-[20px] mr-1"></i>
            Sign Out
          </span>
        )}
      </button>
    </div>
  );
};

export default SideBar;
