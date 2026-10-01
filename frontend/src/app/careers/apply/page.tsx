"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, Suspense, useState } from "react";
import { ArrowLeft, CheckCircle2, FileText, Loader2, UploadCloud, X } from "lucide-react";
import { jobs } from "@/lib/data";

function ApplyForm() {
  const params = useSearchParams();
  const requestedTitle = params.get("job_title") || "Intern";
  const selectedJob = jobs.find((job) => job.title.toLowerCase() === requestedTitle.toLowerCase()) || jobs[0];
  const [position, setPosition] = useState(selectedJob.title);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFile = (candidate?: File) => {
    if (!candidate) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(candidate.type) || candidate.size > 5 * 1024 * 1024) {
      setError("Please upload a PDF, DOC, or DOCX file under 5 MB.");
      return;
    }
    setError("");
    setFile(candidate);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    if (!form.get("fullName") || !form.get("email") || !form.get("phone") || !position || !form.get("qualification") || !form.get("coverLetter") || !file) {
      setError("Please complete all required fields and attach your resume.");
      return;
    }
    setStatus("loading");
    try {
      const api = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
      const uploadForm = new FormData();
      uploadForm.append("resume", file);
      const uploadResponse = await fetch(`${api}/api/upload/resume`, { method: "POST", body: uploadForm });
      if (!uploadResponse.ok) throw new Error("Resume upload failed");
      const uploaded = await uploadResponse.json() as { url: string };
      const response = await fetch(`${api}/api/applications`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...Object.fromEntries(form.entries()), jobId: selectedJob.id, resumeUrl: uploaded.url }) });
      if (!response.ok) throw new Error("Application could not be submitted");
      setStatus("success");
    } catch {
      setStatus("idle");
      setError("We could not reach the application service. Please try again when the API is running.");
    }
  };

  if (status === "success") return <div className="card mx-auto max-w-2xl p-10 text-center md:p-16"><CheckCircle2 className="mx-auto text-[var(--teal)]" size={52} /><p className="eyebrow mt-7">Application received</p><h2 className="display mt-3 text-5xl">Thank you for applying.</h2><p className="muted mx-auto mt-5 max-w-md leading-7">We have received your application for {position}. Our team will review it and be in touch if there is a match.</p><Link href="/careers" className="btn-dark mt-8">Explore other roles</Link></div>;

  return <form onSubmit={submit} className="card p-6 md:p-9">
    <div className="flex items-center justify-between border-b border-[var(--line)] pb-6"><div><p className="eyebrow">Your application</p><h2 className="mt-2 text-2xl font-bold">Apply for {selectedJob.title}</h2></div><span className="text-sm text-[var(--muted)]">Step 1 of 1</span></div>
    <fieldset className="mt-8"><legend className="text-lg font-bold">Personal information</legend><div className="mt-5 grid gap-5 md:grid-cols-2"><Field name="fullName" label="Full name" required placeholder="Your full name" /><Field name="email" label="Email address" required type="email" placeholder="you@example.com" /><Field name="phone" label="Phone number" required placeholder="+977-98XXXXXXXX" pattern="^(\\+977[- ]?)?9[678]\\d{8}$" /><Field name="address" label="Address" placeholder="City, country" /><Field name="dateOfBirth" label="Date of birth" type="date" /><label><span className="label">Gender</span><select name="gender" className="input"><option value="">Prefer not to say</option><option>Female</option><option>Male</option><option>Non-binary</option></select></label></div></fieldset>
    <fieldset className="mt-10 border-t border-[var(--line)] pt-8"><legend className="text-lg font-bold">Professional information</legend><div className="mt-5 grid gap-5 md:grid-cols-2"><label><span className="label required">Position applied for</span><select name="position" value={position} onChange={(event) => setPosition(event.target.value)} className="input">{jobs.map((job) => <option key={job.id}>{job.title}</option>)}</select></label><Field name="qualification" label="Highest qualification" required placeholder="e.g. BE Civil Engineering" /><Field name="university" label="University / college" placeholder="Institution name" /><Field name="graduationYear" label="Graduation year" type="number" placeholder="2026" /><Field name="experience" label="Experience" placeholder="Years or a short summary" /><Field name="currentCompany" label="Current company" placeholder="Company name" /><Field name="expectedSalary" label="Expected salary" placeholder="NPR per month" /><Field name="skills" label="Relevant skills" placeholder="Separate skills with commas" /></div></fieldset>
    <fieldset className="mt-10 border-t border-[var(--line)] pt-8"><legend className="text-lg font-bold">Your application</legend><div className="mt-5 grid gap-5"><label><span className="label required">Cover letter</span><textarea name="coverLetter" rows={5} className="input resize-y" placeholder="Tell us what you would bring to RAWAL..." /></label><label><span className="label">Why do you want to join us?</span><textarea name="whyJoin" rows={3} className="input resize-y" placeholder="What draws you to this work?" /></label><div><span className="label required">Resume / CV</span><div onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); handleFile(event.dataTransfer.files[0]); }} className={`rounded-xl border-2 border-dashed p-7 text-center ${dragging ? "border-[var(--teal)] bg-[var(--cream)]" : "border-[var(--line)]"}`}>{file ? <div className="flex items-center justify-center gap-3"><FileText className="text-[var(--teal)]" /><span className="font-bold">{file.name}</span><button type="button" aria-label="Remove resume" onClick={() => setFile(null)}><X size={18} /></button></div> : <><UploadCloud className="mx-auto text-[var(--teal)]" size={30} /><p className="mt-3 font-bold">Drop your resume here</p><p className="muted mt-1 text-sm">PDF, DOC, or DOCX · max 5 MB</p><label className="btn-dark mt-4 cursor-pointer">Browse files<input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(event: ChangeEvent<HTMLInputElement>) => handleFile(event.target.files?.[0])} /></label></>}</div></div><div><span className="label">Additional documents</span><input type="file" multiple className="input" accept=".pdf,.doc,.docx,.jpg,.png" /></div></div></fieldset>
    {error && <p role="alert" className="mt-6 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}<button type="submit" disabled={status === "loading"} className="btn-dark mt-8 w-full disabled:cursor-wait disabled:opacity-60">{status === "loading" ? <><Loader2 className="animate-spin" size={18} /> Sending application...</> : "Submit application"}</button><p className="muted mt-4 text-center text-xs">By submitting, you agree that RAWAL may process your information for recruitment.</p>
  </form>;
}

function Field({ name, label, required, type = "text", placeholder, pattern }: { name: string; label: string; required?: boolean; type?: string; placeholder?: string; pattern?: string }) { return <label><span className={`label ${required ? "required" : ""}`}>{label}</span><input name={name} type={type} className="input" placeholder={placeholder} pattern={pattern} /></label>; }

export default function ApplyPage() { return <main className="min-h-screen bg-[var(--background)]"><header className="bg-[var(--teal-dark)] px-5 py-7 text-white lg:px-8"><div className="mx-auto max-w-7xl"><Link href="/careers" className="flex items-center gap-2 text-sm text-white/75 hover:text-white"><ArrowLeft size={16} /> Back to careers</Link></div></header><section className="section-pad"><div className="mx-auto mb-12 max-w-7xl"><p className="eyebrow">Join the team</p><h1 className="display mt-3 text-6xl leading-none">Apply for your <em>next chapter.</em></h1></div><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.7fr_1.3fr]"><aside className="card h-fit bg-[var(--cream)] p-7 lg:sticky lg:top-8"><p className="eyebrow">Role snapshot</p><h2 className="mt-3 text-3xl font-bold">Bring your best <span className="text-[var(--teal)]">work.</span></h2><p className="muted mt-4 leading-7">We read every application carefully. Share enough of your story for us to understand how you think and what you want to build.</p><div className="mt-8 space-y-5 border-t border-[var(--line)] pt-6 text-sm"><div><p className="muted">Our promise</p><p className="mt-1 font-bold">A thoughtful response, either way.</p></div><div><p className="muted">Hiring team</p><p className="mt-1 font-bold">People & Culture, RAWAL Engineering</p></div></div></aside><Suspense fallback={<div className="card p-10">Loading application...</div>}><ApplyForm /></Suspense></div></section></main>; }
