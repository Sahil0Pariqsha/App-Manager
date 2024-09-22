import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://app-manager-nextjs.vercel.app/';

  const apiUrl = `${baseUrl}/api/profile`;
  
  console.log(process.env.NODE_ENV,apiUrl);

  const res = await fetch(apiUrl, {
    cache: "no-store",
    headers: {
      cookie: cookies().toString(),
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
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
