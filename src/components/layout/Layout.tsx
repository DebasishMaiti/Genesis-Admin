import type { ReactNode } from "react";
import { UserSidebar } from "./UserSidebar";
import { AdminSidebar } from "./AdminSidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const UserRole: string = "Admin";

  return (
    <div className="flex h-screen bg-gray-100">
      {UserRole === "Admin" ? <AdminSidebar /> : <UserSidebar />}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
