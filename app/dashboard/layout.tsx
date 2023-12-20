import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex max-md:flex-col h-full w-full py-6 px-4 gap-8">
      <div className="bg-[#212121] border-2 border-[#323232] rounded-2xl md:hidden sticky top-0 z-10 drop-shadow-2xl">
        <Navbar />
      </div>
      <div className="bg-[#212121] border-2 border-[#323232] rounded-2xl py-4 max-md:hidden">
        <SideBar />
      </div>
      {children}
    </section>
  );
}
