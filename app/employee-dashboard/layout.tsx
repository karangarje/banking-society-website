import Sidebar from "@/app/employee-dashboard/Sidebar";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "Employee Dashboard | Babasaheb Kavad",
  description: "Internal banking management portal",
};

export default async function EmployeeDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/employee-login");
  }

  const role = (session.user as any)?.role || "EMPLOYEE";
  const isManagerOrAdmin = role === "MANAGER" || role === "SUPER_ADMIN";

  return (
    <div className="relative min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <Sidebar role={role} isManagerOrAdmin={isManagerOrAdmin} />
      {/* Main Content */}
      <div className="ml-[260px] min-h-screen p-6 overflow-auto">
        {/* Top Bar */}
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-800">Management Console</h1>
          <div className="text-sm text-gray-600">
            Welcome, {session.user?.name || "Employee"} ({role})
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
