"use client";

import { useRouter } from "next/navigation";
import { githubLogin } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await githubLogin();
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#05070A] text-white">
      <div className="bg-[#0B0F14] p-10 rounded-2xl border border-cyan-500/20 w-[380px]">

        <h1 className="text-2xl font-semibold mb-3">
          Welcome to WrathOps
        </h1>

        <p className="text-gray-400 mb-6">
          Connect your GitHub to scan and secure your repositories.
        </p>

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-3 rounded-xl"
        >
          Continue with GitHub
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Requires repo access for scanning and fixes
        </p>
      </div>
    </div>
  );
}