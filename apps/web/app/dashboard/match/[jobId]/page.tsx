"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Candidate = {
  id: number;
  fileName: string;
  skills: string[];
  preview: string;
  match: number;
};

export default function MatchPage() {
  const params = useParams();
  const jobId = params.jobId as string;

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!jobId) return;

    fetch(`https://devrecruit-ai.onrender.com/match/${jobId}`)
      .then((res) => res.json())
      .then(setData);
  }, [jobId]);

  if (!data) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">
        Matches for {data.job.title}
      </h1>

      <div className="space-y-4">
        {data.ranked.length === 0 && (
          <div className="text-white/50">
            No candidates uploaded yet.
          </div>
        )}

        {data.ranked.map((c: Candidate) => (
          <div
            key={c.id}
            className="p-4 border border-white/10 rounded-xl bg-white/5"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="font-semibold">{c.fileName}</div>

              {/* Match Bar */}
              <div className="w-24 bg-white/10 rounded h-2">
                <div
                  className="bg-green-400 h-2 rounded"
                  style={{ width: `${c.match}%` }}
                />
              </div>
            </div>

            {/* Skills Chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="px-2 py-1 text-xs bg-white/10 rounded"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Preview */}
            <p className="text-sm text-white/70 mt-3">
              {c.preview}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}