"use client";

import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (localStorage.getItem("user")) {
    router.push("/");
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("users")
        .select()
        .eq("username", username)
        .eq("password", password)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/");

        // You may want to redirect the user to another page or update the UI accordingly
      } else {
        throw new Error("Invalid user credentials");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white text-center">Sign In</h3>
      <div className="w-96 mt-5 rounded-box space-y-5 p-3">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          className="input input-bordered w-full"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          className="input input-bordered w-full"
        />
        <button
          onClick={() => handleSubmit()}
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-ring loading-md"></span>
          ) : (
            "Submit"
          )}
        </button>

        <p className="flex space-x-1">
          <span>Don't have an account?</span>
          <Link className="text-primary" href="/sign-up">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
