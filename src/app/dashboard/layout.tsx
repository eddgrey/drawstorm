import Navbar from "./_components/navbar";
import OrganizationSidebar from "./_components/organization-sidebar";
import Sidebar from "./_components/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="h-full">
      <Sidebar />
      <div className="pl-16 h-full">
        <div className="flex gap-x-3 h-full">
          <OrganizationSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
