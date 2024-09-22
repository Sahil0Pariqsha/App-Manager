import { cookies } from "next/headers";
import Important from "@/components/Page/Important";

export default async function Page() {  
  const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000'
  : 'https://app-manager-nextjs.vercel.app/';

  
  const apiUrl = `${baseUrl}/api/taskslist/important`;

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
    <div className="flex-1 bg-[#212121] border-2 border-[#323232] rounded-xl md:rounded-2xl">
      <Important taskList={data} />
    </div>
  );
}
