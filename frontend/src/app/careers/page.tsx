import Link from "next/link";
import { ArrowUpRight, BriefcaseBusiness, Clock3, MapPin } from "lucide-react";
import { jobs } from "@/lib/data";
import MarketingHeader from "../components/MarketingHeader";

export default function Careers() {
  return (
    <main className="min-h-screen bg-[var(--gold-light)] text-[var(--ink)]">
      <MarketingHeader />
      <header className="relative overflow-hidden bg-[linear-gradient(135deg,#f9e7bb,#e7c978)] px-5 pb-20 pt-20 text-[var(--ink)] lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow !text-[var(--teal-dark)]">Careers at RAWAL</p>
          <h1 className="display mt-4 max-w-3xl text-6xl leading-[.95] sm:text-8xl">Bring your best <em>thinking.</em></h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[var(--ink)]/70">Work with people who care about the outcome, the process, and the place we leave behind.</p>
        </div>
      </header>
      <section className="section-pad bg-[var(--gold-light)]">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <aside>
            <p className="eyebrow">Open roles</p>
            <h2 className="display mt-3 text-4xl">Find your next chapter.</h2>
            <p className="muted mt-5 leading-7">We are a curious, practical team. Our best work happens when different perspectives have room at the table.</p>
            <div className="mt-8 rounded-2xl border border-[var(--gold-strong)]/60 bg-[var(--gold-soft)] p-6 shadow-[0_16px_30px_rgba(121,89,33,0.12)]">
              <div className="flex items-center gap-3"><BriefcaseBusiness className="text-[var(--teal-dark)]" size={22} /><span className="font-bold">{jobs.length} roles available</span></div>
              <p className="muted mt-3 text-sm leading-6">Can&apos;t see the right fit? Send your profile to careers@rawal.engineering.</p>
            </div>
          </aside>
          <div className="space-y-4">
            {jobs.map(job => (
              <article key={job.id} className="group rounded-2xl border border-[var(--gold-strong)]/45 bg-[var(--cream)] p-6 shadow-[0_12px_28px_rgba(121,89,33,0.08)] transition hover:-translate-y-1 hover:border-[var(--gold-strong)] hover:shadow-[0_18px_36px_rgba(121,89,33,0.16)] md:p-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row">
                  <div><p className="eyebrow">{job.department}</p><h3 className="mt-2 text-2xl font-bold">{job.title}</h3><p className="muted mt-2 max-w-xl leading-7">{job.description}</p></div>
                  <Link href={`/careers/apply?job_title=${encodeURIComponent(job.title)}`} className="btn-primary shrink-0 self-start !bg-[var(--gold-strong)] hover:!bg-[var(--lime)]">Apply now <ArrowUpRight size={17} /></Link>
                </div>
                <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 border-t border-[var(--line)] pt-5 text-sm text-[var(--muted)]">
                  <span className="flex items-center gap-2"><MapPin size={16} className="text-[var(--teal-dark)]" />{job.location}</span>
                  <span className="flex items-center gap-2"><Clock3 size={16} className="text-[var(--teal-dark)]" />{job.employmentType}</span>
                  <span>{job.experience}</span>
                  <span className="ml-auto">Posted {job.posted}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
