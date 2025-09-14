import Header from "./components/Header";

export default function StudentLayout({
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
        <main className="flex-1 overflow-y-auto ">{children}</main>
      </div>
    </div>
  );
}
