import Link from "next/link";

function NavBar() {
  return (
    <div className="bg-primary text-primary-foreground min-h-screen">
      <main className="flex h-full w-56 flex-col items-center justify-between px-4">
        <div className="flex w-full grow flex-col gap-4">
          {/* Title */}

          <h1 className="py-4 text-center text-2xl font-bold">Job Tracker</h1>

          {/* Navigations */}
          <nav className="w-full">
            <ul className="flex flex-col gap-1 font-semibold">
              <li>
                <Link
                  href={"#"}
                  className="hover:bg-secondary block rounded-sm p-1"
                >
                  Quick Create
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:bg-secondary block rounded-sm p-1"
                >
                  Job Ads
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:bg-secondary block rounded-sm p-1"
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:bg-secondary block rounded-sm p-1"
                >
                  Recruiters
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:bg-secondary block rounded-sm p-1"
                >
                  Resumes & CVs
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:bg-secondary block rounded-sm p-1"
                >
                  Networks
                </Link>
              </li>
              <li>
                <Link
                  href={"#"}
                  className="hover:bg-secondary block rounded-sm p-1"
                >
                  Events
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Setting */}
        <div>Profile</div>
      </main>
    </div>
  );
}

export default NavBar;
