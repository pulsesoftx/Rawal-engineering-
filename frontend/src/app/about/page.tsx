import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import MarketingHeader from "../components/MarketingHeader";

const principles = ["Listen before we draw", "Make complexity understandable", "Design for the long term", "Leave places stronger"];
const serviceFocus = ["Residential exterior and interior design", "Commercial exterior and interior design", "Hospital and educational institute design", "Park, hotel, and restaurant design", "Property development and plotting design", "Office and corporation design"];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--gold-light)] text-[var(--ink)]">
      <MarketingHeader />
      <header className="bg-[linear-gradient(135deg,#fff3d2,#f3d996)] px-5 pb-24 pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow !text-[var(--teal-dark)]">About RAWAL</p>
          <h1 className="display mt-5 max-w-4xl text-6xl leading-[.94] sm:text-8xl">Engineering with <em>judgment.</em></h1>
          <p className="mt-8 max-w-2xl text-xl leading-8 text-[var(--ink)]/70">We are an independent engineering company helping people build places that are useful, resilient, and made to last.</p>
        </div>
      </header>

      <section className="section-pad bg-[var(--gold-light)]">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="eyebrow">Our point of view</p><h2 className="display mt-4 text-5xl leading-none">Good work is both rigorous and human.</h2></div>
          <div className="space-y-6 text-lg leading-8 text-[var(--muted)]"><p>RAWAL brings architecture, engineering, and delivery thinking into one connected conversation. That means fewer handoffs, clearer decisions, and outcomes that stand up in the real world.</p><p>From a first feasibility study to the final handover, we stay curious about the context and accountable for the detail.</p><Link href="/contact" className="btn-dark">Work with us <ArrowUpRight size={17} /></Link></div>
        </div>
      </section>

      <section className="section-pad bg-[var(--gold-soft)]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow !text-[var(--teal-dark)]">Our services</p><h2 className="display mt-4 max-w-3xl text-5xl leading-none">One team for the <em>whole picture.</em></h2></div><Link href="/services" className="inline-flex items-center gap-2 font-bold text-[var(--teal-dark)]">Explore services <ArrowRightIcon /></Link></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{serviceFocus.map((service, index) => <Link key={service} href="/services" className="group rounded-2xl border border-[var(--gold-strong)]/55 bg-white/60 p-6 shadow-[0_14px_28px_rgba(121,89,33,0.08)] transition duration-300 hover:-translate-y-1 hover:bg-white"><span className="text-sm font-black text-[var(--teal-dark)]">0{index + 1}</span><h3 className="mt-8 text-xl font-bold leading-7">{service}</h3><span className="mt-6 block text-sm font-bold text-[var(--teal)] transition group-hover:text-[var(--teal-dark)]">View full scope <span aria-hidden="true">→</span></span></Link>)}</div>
        </div>
      </section>

      <section className="section-pad bg-[var(--cream)]"><div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2"><div><p className="eyebrow">How we work</p><h2 className="display mt-4 text-5xl">Principles in practice.</h2></div><div className="grid gap-4 sm:grid-cols-2">{principles.map(principle => <div key={principle} className="rounded-2xl border border-[var(--gold-strong)]/45 bg-white p-5 shadow-[0_12px_24px_rgba(121,89,33,0.07)]"><Check size={19} className="text-[var(--teal)]" /><span className="mt-4 block font-bold">{principle}</span></div>)}</div></div></section>
    </main>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}
