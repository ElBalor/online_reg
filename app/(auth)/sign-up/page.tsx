"use client"; // It seems like a comment, make sure it's valid if you intended to use it as an import

import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [matriculationNo, setMatriculationNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  if (localStorage.getItem("user")) {
    router.push("/");
  }

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
      }

      // Check if matriculation number is already in use
      const { data: existingMatriculationNo } = await supabase
        .from("users")
        .select("id")
        .eq("matriculationNo", matriculationNo)
        .single();

      if (existingMatriculationNo) {
        throw new Error("Matriculation number is already in use.");
      }

      // If both checks pass, proceed with registration
      const { data, error } = await supabase
        .from("users")
        .insert({ username, email, password, matriculationNo })
        .single();

      if (error) {
        toast("An internal server error occurred during registration.");
        throw new Error(
          "An internal server error occurred during registration."
        );
      } else {
        // Registration successful, redirect the user to the login page
        console.log("User registered successfully");

        // Store user data in local storage
        localStorage.setItem("user", JSON.stringify(data));
        // Clear the input fields after successful registration
        router.push("/");
        setUsername("");
        setEmail("");
        setMatriculationNo("");
        setPassword("");
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
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Veritas email"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          value={matriculationNo}
          onChange={(e) => setMatriculationNo(e.currentTarget.value)}
          placeholder="Matriculation no"
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
