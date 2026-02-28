export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold">DevRecruit AI</h1>
        <button className="px-5 py-2 bg-white text-black rounded-lg font-medium">
          Login
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 py-24">
        <h2 className="text-5xl font-bold max-w-3xl leading-tight">
          AI-Powered Developer Hiring Platform
        </h2>

        <p className="text-white/70 mt-6 max-w-xl">
          Upload resumes, match candidates to roles, and rank developers instantly
          using AI skill analysis.
        </p>

        <div className="flex gap-4 mt-10">
          <button className="px-6 py-3 bg-white text-black rounded-xl font-semibold">
            Get Started
          </button>

          <button className="px-6 py-3 border border-white/30 rounded-xl">
            View Demo
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="grid md:grid-cols-3 gap-8 px-10 pb-24">
        <Feature
          title="AI Resume Parsing"
          desc="Extract skills, experience, and tech stack automatically."
        />
        <Feature
          title="Smart Matching"
          desc="Rank candidates against job requirements using AI."
        />
        <Feature
          title="Recruiter Dashboard"
          desc="Track applicants, scores, and hiring insights."
        />
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-6 border border-white/10 rounded-2xl bg-white/5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-white/70 mt-2">{desc}</p>
    </div>
  );
}