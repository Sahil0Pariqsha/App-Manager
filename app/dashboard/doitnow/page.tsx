import { cookies } from "next/headers";
import DoItNow from "@/components/Page/DoItNow";

export default async function Page() {
  const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000/'
  : 'https://app-manager-nextjs.vercel.app/';

  const apiUrl = `${baseUrl}api/taskslist/doitnow`;

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
      <DoItNow taskList={data} />
    </div>
  );
}
