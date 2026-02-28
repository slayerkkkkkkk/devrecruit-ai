export default function Home() {
  return (
    <div className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">DevRecruit AI</h1>
      <p className="text-white/70">
        AI recruitment platform that parses resumes and matches candidates to jobs.
      </p>

      <div className="space-x-4">
        <a href="/dashboard/upload" className="underline">
          Upload Resume
        </a>

        <a href="/dashboard/jobs" className="underline">
          Jobs
        </a>

        <a href="/dashboard/candidates" className="underline">
          Candidates
        </a>
      </div>
    </div>
  );
}