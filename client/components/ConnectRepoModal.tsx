"use client";

import { useEffect, useState } from "react";

export default function ConnectRepoModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [repos, setRepos] = useState<any[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const fetchRepos = async () => {
      const token = localStorage.getItem("github_token");

      const res = await fetch("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRepos(data);
    };

    fetchRepos();
  }, [isOpen]);

  const toggleRepo = (name: string) => {
    setSelected((prev) =>
      prev.includes(name)
        ? prev.filter((r) => r !== name)
        : [...prev, name]
    );
  };

  const handleConnect = () => {
    localStorage.setItem("connected_repos", JSON.stringify(selected));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#0B0F14] w-[500px] max-h-[80vh] p-6 rounded-2xl border border-white/10">

        <h2 className="text-lg mb-4">Select Repositories</h2>

        <div className="space-y-2 overflow-y-auto max-h-[300px]">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="flex items-center justify-between p-3 bg-[#05070A] rounded-lg border border-white/5"
            >
              <span>{repo.name}</span>

              <input
                type="checkbox"
                checked={selected.includes(repo.full_name)}
                onChange={() => toggleRepo(repo.full_name)}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="text-gray-400">
            Cancel
          </button>

          <button
            onClick={handleConnect}
            className="bg-cyan-500 text-black px-4 py-2 rounded-lg"
          >
            Connect
          </button>
        </div>
      </div>
    </div>
  );
}