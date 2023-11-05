"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user") as string);

  if (!user) {
    router.push("/sign-in");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/sign-in");
  };

  return (
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 bg-gradient-to-tr from-slate-500 to-gray-800">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          </div>
          <a className="btn btn-ghost normal-case text-xl">OnlineReg</a>
        </div>
        <div className="navbar-end">
          <details className="dropdown">
            <summary className="m-1 btn rounded-full normal-case">
              {user?.email}
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <button onClick={() => handleLogout()}>Logout</button>
              </li>
            </ul>
          </details>
          {/* <a className="btn rounded-full normal-case">{user?.email}</a> */}
        </div>
      </div>
      <div className="items-center justify-center h-[calc(100vh-72px)] w-full flex flex-col text-center bg-gradient-to-br from-gray-800 to-slate-600">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold">Hello, {user?.username}</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
