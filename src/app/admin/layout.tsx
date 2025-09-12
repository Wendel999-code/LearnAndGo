import Header from "./components/header";
import SideBar from "./components/side-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-theme">
      {/* Header */}
      <Header />

      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}
