"use client";
import { useEffect, useState } from "react";

type Job = {
  id: number;
  title: string;
  skills: string[];
};

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");

  useEffect(() => {
    fetch("https://devrecruit-ai.onrender.com/jobs")
      .then((res) => res.json())
      .then(setJobs);
  }, []);

  const createJob = async () => {
    const res = await fetch("https://devrecruit-ai.onrender.com/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        skills: skills.split(",").map((s) => s.trim().toLowerCase()),
      }),
    });

    const job = await res.json();
    setJobs([...jobs, job]);
    setTitle("");
    setSkills("");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Jobs</h1>

      <div className="mb-8 space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Job title"
          className="px-3 py-2 bg-black border border-white/20 rounded w-full"
        />

        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skills (comma separated)"
          className="px-3 py-2 bg-black border border-white/20 rounded w-full"
        />

        <button
          onClick={createJob}
          className="px-4 py-2 bg-white text-black rounded"
        >
          Create Job
        </button>
      </div>

      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="p-4 border border-white/10 rounded-xl bg-white/5"
          >
            <div className="font-semibold">{job.title}</div>
            <div className="text-sm text-white/60">
              {job.skills.join(", ")}
            </div>

            <a
              href={`/dashboard/match/${job.id}`}
              className="text-blue-400 text-sm mt-2 inline-block"
            >
              View Matches →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}