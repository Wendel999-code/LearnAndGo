import Header from "./components/header";
import SideBar from "./components/side-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex  flex-col min-h-screen bg-theme">
      {/* Sidebar */}

      <Header />

      {/* Main Section */}
      <div className="flex-1 flex  ">
        {/* Header */}
        <SideBar />

        {/* Page Content */}
        <main className="flex-1 p-2 ">{children}</main>
      </div>
    </div>
  );
}
