import SideBar from "@/components/SideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex h-full w-full py-6 px-4 gap-8">
      <div className="bg-[#212121] border-2 border-[#323232] rounded-2xl py-4 min-w-[190px]">
        <SideBar />
      </div>
      {children}
    </section>
  );
}
