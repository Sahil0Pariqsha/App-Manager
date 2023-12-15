import SideBar from "@/components/SideBar";
import TasksContainer from "@/components/TasksContainer";
import { cookies, cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const userId = cookies().get("userId");
  if (!userId) {
    redirect("/authentication");
  }

  return (
    <div className="flex h-full w-full py-6 px-4 gap-8">
      <div className="min-w-[190px] bg-[#212121] border-2 border-[#323232] rounded-2xl overflow-hidden py-4">
        <SideBar />
      </div>
      <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-2xl overflow-hidden py-4">
        <TasksContainer />
      </div>
    </div>
  );
}
