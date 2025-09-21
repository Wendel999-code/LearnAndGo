import Feed from "./Feed";

function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3  min-h-screen ">
      <div className="hidden md:block">left</div>

      <Feed />

      <div className="hidden md:block">right</div>
    </div>
  );
}

export default Home;
