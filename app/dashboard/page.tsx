import { cookies } from "next/headers";
import Dashboard from "@/components/Page/Dashboard";

export default async function Page() {
  const host = process.env.NEXT_PUBLIC_HOST + "/api/taskslist";
  // const host = "/api/taskslist";

  const res = await fetch(host, {
    cache: "no-store",
    headers: {
      cookie: cookies().toString(),
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();

  return (
    <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-xl md:rounded-2xl max-md:h-[calc(100vh-500px)]">
      <Dashboard taskList={data} />
    </div>
  );
}
