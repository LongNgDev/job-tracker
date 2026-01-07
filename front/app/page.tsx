import JobTable from "./components/jobTable";
import NavBar from "./components/navBar";

export default function Home() {
  return (
    <div className="bg-background flex min-h-screen max-w-screen">
      {/* Navbar Section */}
      <NavBar />

      {/* Content Section */}
      <main className="grow">
        <JobTable />
      </main>
    </div>
  );
}
