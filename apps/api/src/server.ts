import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import pdf from "pdf-parse";

const app = express();
app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

/* ---------- Skill Extraction ---------- */

const SKILLS = [
  "javascript",
  "typescript",
  "react",
  "next.js",
  "node",
  "express",
  "python",
  "java",
  "c++",
  "sql",
  "mongodb",
  "postgresql",
  "aws",
  "docker",
  "kubernetes",
  "html",
  "css",
  "tailwind",
  "machine learning",
  "deep learning",
];

function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const found = SKILLS.filter((skill) => lower.includes(skill));
  return [...new Set(found)];
}

/* ---------- Candidate Storage ---------- */

type Candidate = {
  id: number;
  fileName: string;
  skills: string[];
  preview: string;
};

let candidates: Candidate[] = [];
let currentId = 1;

/* ---------- Job Storage ---------- */

type Job = {
  id: number;
  title: string;
  skills: string[];
};

let jobs: Job[] = [];
let currentJobId = 1;

/* ---------- Matching ---------- */

function matchScore(candidateSkills: string[], jobSkills: string[]) {
  const overlap = candidateSkills.filter((s) => jobSkills.includes(s));
  return jobSkills.length === 0
    ? 0
    : Math.round((overlap.length / jobSkills.length) * 100);
}

/* ---------- Types ---------- */

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

/* ---------- Routes ---------- */

app.get("/", (req: Request, res: Response) => {
  res.send("DevRecruit API running");
});

/* Upload + Parse Resume */
app.post(
  "/upload",
  upload.single("resume"),
  async (req: MulterRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    try {
      const data = await pdf(req.file.buffer);
      const text = data.text;

      console.log("Extracted text preview:");
      console.log(text.substring(0, 200));

      const skills = extractSkills(text);

      const candidate: Candidate = {
        id: currentId++,
        fileName: req.file.originalname,
        skills,
        preview: text.substring(0, 300),
      };

      candidates.push(candidate);

      res.json({
        message: "Resume parsed successfully",
        candidate,
      });
    } catch (err) {
      console.error("PDF parsing error:", err);
      res.status(500).json({ message: "PDF parsing failed" });
    }
  }
);

/* Get all candidates */
app.get("/candidates", (req: Request, res: Response) => {
  res.json(candidates);
});

/* Create job */
app.post("/jobs", (req: Request, res: Response) => {
  const { title, skills } = req.body;

  const job: Job = {
    id: currentJobId++,
    title,
    skills,
  };

  jobs.push(job);
  res.json(job);
});

/* Get jobs */
app.get("/jobs", (req: Request, res: Response) => {
  res.json(jobs);
});

/* Match candidates to job */
app.get("/match/:jobId", (req: Request, res: Response) => {
  const jobId = Number(req.params.jobId);
  const job = jobs.find((j) => j.id === jobId);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  const ranked = candidates
    .map((c) => ({
      ...c,
      match: matchScore(c.skills, job.skills),
    }))
    .sort((a, b) => b.match - a.match);

  res.json({
    job,
    ranked,
  });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});