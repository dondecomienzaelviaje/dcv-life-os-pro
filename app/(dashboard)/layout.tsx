import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-6 py-8 md:px-11 md:py-9 pb-24 md:pb-9 overflow-x-hidden">
        {children}
      </main>
      <MobileNav />
    </div>
  );
}