import SideBar from "./components/side-bar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-theme">
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

// import { syncUser } from "@/services/auth/user";

// export default async function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   await syncUser();
//   return (
//     <div className="">
//       {" "}
//       <h1>syncuser</h1> {children}
//     </div>
//   );
// }
