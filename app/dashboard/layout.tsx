import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const host = process.env.NEXT_PUBLIC_HOST + "/api/profile";
  const res = await fetch(host, {
    cache: "no-store",
    headers: {
      cookie: cookies().toString(),
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  console.log("Layout Host ------ ", process.env.NEXT_PUBLIC_HOST);
  const data = await res.json();

  return (
    <section className="flex max-md:flex-col h-[calc(100vh-70px)] md:h-full w-full py-6 px-2 md:px-4 gap-8">
      <div className="bg-[#1b1b1b] -my-6  md:hidden sticky top-0 z-10 shadow-md backdrop-blur-md rounded-b-2xl">
        <Navbar user={data} />
      </div>
      <div className="bg-[#212121] border-2 border-[#323232] rounded-2xl py-4 max-md:hidden">
        <SideBar user={data} />
      </div>
      {children}
    </section>
  );
}
