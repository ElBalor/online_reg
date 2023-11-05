"use client";

import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("user")) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("username", username)
        .single();

      if (existingUser) {
        throw new Error("Username is already in use.");
      } else {
        // Username is not taken, proceed with registration
        const { data, error } = await supabase
          .from("users")
          .insert({ username, email, password })
          .select()
          .single();

        if (error) {
          // Handle errors appropriately
          console.error(error);
        } else {
          if (typeof window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(data));
          }
          router.push("/");
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white text-center">Sign Up</h3>

      <div className="w-96 mt-5 rounded-box space-y-5 p-3">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          placeholder="Username"
          className="input input-bordered w-full"
        />

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Matric No"
          className="input input-bordered w-full"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="Password"
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
          <span>Already have an account?</span>
          <Link className="text-primary" href="/sign-in">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
