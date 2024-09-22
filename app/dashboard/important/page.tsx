import { cookies } from "next/headers";
import Important from "@/components/Page/Important";

export default async function Page() {
  const host = process.env.NEXT_PUBLIC_HOST
  ? `${process.env.NEXT_PUBLIC_HOST}/api/taskslist/important`  // For local development
  : "/api/taskslist/important";  // For production (relative URL)
  
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
    <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-xl md:rounded-2xl">
      <Important taskList={data} />
    </div>
  );
}
