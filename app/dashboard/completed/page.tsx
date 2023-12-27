import { cookies } from "next/headers";
import Completed from "@/components/Page/Completed";

export default async function Page() {
  const res = await fetch("http://localhost:3000/api/taskslist/completed", {
    cache: "no-store",
    headers: {
      cookie: cookies().toString(),
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();

  return (
    <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-2xl">
      <Completed taskList={data} />
    </div>
  );
}
