"use client";
import { useEffect, useState } from "react";

type Candidate = {
  id: number;
  fileName: string;
  skills: string[];
  preview: string;
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    fetch("http://localhost:4000/candidates")
      .then((res) => res.json())
      .then(setCandidates);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Candidates</h1>

      <div className="space-y-4">
        {candidates.map((c) => (
          <div
            key={c.id}
            className="p-4 border border-white/10 rounded-xl bg-white/5"
          >
            <div className="font-semibold">{c.fileName}</div>

            <div className="text-sm text-white/60 mt-1">
              Skills: {c.skills.join(", ")}
            </div>

            <p className="text-sm text-white/70 mt-2 line-clamp-3">
              {c.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}