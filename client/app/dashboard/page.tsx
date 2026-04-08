"use client";

import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConnectRepoModal from "@/components/ConnectRepoModal";

export default function Dashboard() {
  const router = useRouter();

  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("github_token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchRepos(token);
  }, []);

  const fetchRepos = async (token: string) => {
    try {
      const res = await fetch("https://api.github.com/user/repos", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setRepos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white">
      <Navbar />

      <div className="pt-20 flex">

        {/* SIDEBAR */}
        <aside className="w-64 border-r border-white/5 bg-[#0B0F14]/70 backdrop-blur-xl p-6 hidden md:flex flex-col">
          <nav className="flex flex-col gap-5 text-sm">
            <span className="text-cyan-400">Dashboard</span>
            <span className="text-gray-400 hover:text-white cursor-pointer">Repositories</span>
            <span className="text-gray-400 hover:text-white cursor-pointer">Security Insights</span>
            <span className="text-gray-400 hover:text-white cursor-pointer">DevOps Generator</span>
            <span className="text-gray-400 hover:text-white cursor-pointer">Notifications</span>
            <span className="text-gray-400 hover:text-white cursor-pointer">Settings</span>
          </nav>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-8 space-y-10">

          {/* 🔥 EXECUTIVE SUMMARY */}
          <section>
            <h2 className="text-xl mb-4">System Overview</h2>

            <div className="grid md:grid-cols-5 gap-4">
              {[
                { label: "Secrets Detected", value: "12", color: "text-red-400" },
                { label: "Secrets Fixed", value: "9", color: "text-green-400" },
                { label: "PRs Created", value: "5", color: "text-blue-400" },
                { label: "Active Risks", value: "3", color: "text-yellow-400" },
                { label: "Repositories", value: repos.length, color: "text-cyan-400" },
              ].map((item, i) => (
                <div key={i} className="bg-[#0B0F14] p-5 rounded-xl border border-white/5">
                  <p className="text-xs text-gray-400">{item.label}</p>
                  <h3 className={`text-2xl mt-2 font-semibold ${item.color}`}>
                    {item.value}
                  </h3>
                  <p className="text-[10px] text-gray-500 mt-1">Last 24h</p>
                </div>
              ))}
            </div>
          </section>

          {/* 🔗 CONNECT REPO PANEL */}
          <section className="bg-[#0B0F14] p-6 rounded-xl border border-white/5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg">Repository Integration</h2>
                <p className="text-xs text-gray-400">
                  Manage GitHub connections & automation
                </p>
              </div>

              <button
  onClick={() => setOpenModal(true)}
  className="bg-cyan-500 text-black px-4 py-2 rounded-lg"
>
  Connect Repository
</button>
            </div>

            <div className="mt-4 text-sm text-gray-400">
              Connected Repositories: {repos.length} • Webhook: Active
            </div>
          </section>

          {/* ⚠️ ALERTS */}
          <section className="bg-[#0B0F14] p-6 rounded-xl border border-white/5">
            <h2 className="text-lg mb-4">Active Risks</h2>

            <div className="space-y-3 text-sm">
              <div className="p-3 border border-red-500/20 rounded-lg">
                <p className="text-red-400">High • API Key Exposed</p>
                <p className="text-gray-400 text-xs">repo-1 • 2 mins ago</p>
              </div>

              <div className="p-3 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-400">Medium • Token Leak</p>
                <p className="text-gray-400 text-xs">repo-2 • 10 mins ago</p>
              </div>
            </div>
          </section>

          {/* 📦 REPO TABLE */}
          <section className="bg-[#0B0F14] p-6 rounded-xl border border-white/5">
            <h2 className="text-lg mb-4">Repository Health</h2>

            {loading ? (
              <p className="text-gray-400">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-gray-400 text-xs">
                    <tr>
                      <th className="text-left py-2">Repository</th>
                      <th>Status</th>
                      <th>Secrets</th>
                      <th>Last Scan</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {repos.slice(0, 8).map((repo) => (
                      <tr
                        key={repo.id}
                        className="border-t border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-3">{repo.name}</td>

                        <td>
                          <span className="text-green-400 text-xs">
                            Clean
                          </span>
                        </td>

                        <td>0</td>

                        <td className="text-gray-400 text-xs">
                          Just now
                        </td>

                        <td>
                          <button className="text-cyan-400 text-xs">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* 🔄 ACTIVITY STREAM */}
          <section className="bg-[#0B0F14] p-6 rounded-xl border border-white/5">
            <h2 className="text-lg mb-4">Activity</h2>

            <div className="space-y-2 font-mono text-xs text-gray-400 max-h-40 overflow-y-auto">
              <p>✔ Scan started → repo-1</p>
              <p>⚠ Secret detected → config.js</p>
              <p>✔ Fix applied</p>
              <p>🚀 PR created</p>
            </div>
          </section>

          {/* 🚀 PR SECTION */}
          <section className="bg-[#0B0F14] p-6 rounded-xl border border-white/5">
            <h2 className="text-lg mb-4">Recent Pull Requests</h2>

            <div className="space-y-3 text-sm">
              <div className="p-3 border border-green-500/20 rounded-lg">
                <p className="text-green-400">Fix API Key</p>
                <p className="text-gray-400 text-xs">
                  repo-1 • Merged
                </p>
              </div>

              <div className="p-3 border border-blue-500/20 rounded-lg">
                <p className="text-blue-400">Add Docker Config</p>
                <p className="text-gray-400 text-xs">
                  repo-2 • Open
                </p>
              </div>
            </div>
          </section>

        </main>
      </div>
      <ConnectRepoModal
  isOpen={openModal}
  onClose={() => setOpenModal(false)}
/>
    </div>
  );
}