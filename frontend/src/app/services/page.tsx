"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Compass, Leaf } from "lucide-react";
import { useState } from "react";
import MarketingHeader from "../components/MarketingHeader";

const services = [
  { icon: Compass, number: "01", title: "Design & Advisory", text: "Strategy, architecture, engineering, and design that responds to its context." },
  { icon: Building2, number: "02", title: "Project Delivery", text: "Disciplined coordination that turns complexity into dependable progress." },
  { icon: Leaf, number: "03", title: "Future Systems", text: "Digital tools and resilient infrastructure for a changing world." },
];

const serviceStats = [
  { number: "10+", label: "capability streams" },
  { number: "360°", label: "design and delivery" },
  { number: "End-to-end", label: "from concept to handover" },
];

const serviceRange = [
  "Residential exterior and interior design",
  "Commercial exterior and interior design",
  "Hospital design",
  "Park design",
  "Educational institute design",
  "Hotel and restaurant design",
  "Property development",
  "Plotting design",
  "Cafe and restaurant interior design",
  "Office and corporation design",
];

const processSteps = [
  { title: "Discover", text: "We clarify the brief, context, and outcomes before design starts." },
  { title: "Shape", text: "We turn complexity into a clear, buildable vision with measurable intent." },
  { title: "Deliver", text: "We coordinate quality, schedule, and communication through completion." },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(serviceRange[0]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[var(--gold-light)] text-[var(--ink)]">
      <MarketingHeader />

      <header className="relative overflow-hidden bg-[linear-gradient(135deg,#fff3d2,#f3d996)] px-5 pb-16 pt-20 lg:px-8">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(255,255,255,0.75), transparent 30%), radial-gradient(circle at bottom right, rgba(212,175,90,0.24), transparent 28%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow">What we do</p>

          <div className="mt-6 flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
            <h1 className="display max-w-4xl text-6xl leading-[.94] sm:text-8xl">
              Practical expertise. <em>Ambitious outcomes.</em>
            </h1>

            <div className="grid gap-3 sm:grid-cols-3 xl:w-[28rem] xl:grid-cols-1">
              {serviceStats.map(stat => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[var(--gold-strong)]/45 bg-white/65 p-4 shadow-[0_16px_40px_rgba(121,89,33,0.10)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/85"
                >
                  <div className="text-2xl font-black text-[var(--teal-dark)]">{stat.number}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-[.14em] text-[var(--muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-xl leading-8 text-[var(--muted)]">
            One connected team from first sketch to final handover, with the experience to make difficult work feel clear.
          </p>

          <div className="mt-12 rounded-[28px] border border-[var(--gold-strong)]/45 bg-white/70 p-6 shadow-[0_20px_40px_rgba(121,89,33,0.12)] backdrop-blur-sm sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
              <div>
                <p className="eyebrow !mb-0">Service range</p>
              </div>
              <span className="text-xs font-bold uppercase tracking-[.16em] text-[var(--muted)]">Full scope</span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {serviceRange.map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveService(item)}
                  aria-pressed={activeService === item}
                  className={`group flex items-center rounded-full border px-4 py-3 text-left text-sm font-semibold leading-6 text-[var(--ink)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--gold-strong)] hover:bg-white ${activeService === item ? "border-[var(--gold-strong)] bg-[var(--gold-soft)]" : "border-[var(--line)] bg-[var(--cream)]"}`}
                >
                  <span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--gold-strong)] transition duration-300 group-hover:scale-125" aria-hidden="true" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-[var(--gold-strong)]/35 bg-[var(--gold-light)]/75 p-5 transition-all duration-300" aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-[.15em] text-[var(--teal-dark)]">Selected capability</p>
              <p className="mt-2 text-lg font-bold">{activeService}</p>
              <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[var(--teal-dark)]">Discuss this service <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </header>

      <section className="section-pad bg-[var(--gold-light)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Core offerings</p>
            </div>
            <Link href="/contact" className="hidden items-center gap-2 text-sm font-bold uppercase tracking-[.14em] text-[var(--teal)] md:inline-flex">
              Talk to our team <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl bg-[var(--line)] md:grid-cols-3">
            {services.map(service => {
              const Icon = service.icon;
              return (
                <article
                  key={service.number}
                  className="group bg-white/85 p-8 transition duration-300 hover:-translate-y-1 hover:bg-[var(--gold-light)] md:p-10"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-4xl font-light text-[var(--teal)]">{service.number}</span>
                    <div className="rounded-full bg-[var(--cream)] p-2 text-[var(--teal)] transition duration-300 group-hover:bg-[var(--lime)]">
                      <Icon size={22} />
                    </div>
                  </div>
                  <h2 className="mt-8 text-2xl font-bold">{service.title}</h2>
                  <p className="muted mt-4 leading-7">{service.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--gold-soft)] text-[var(--ink)]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow !text-[var(--teal-dark)]">How we work</p>
              <h2 className="display mt-4 max-w-2xl text-5xl leading-none">Clear process. Thoughtful delivery.</h2>
            </div>
            <Link href="/contact" className="btn-dark">
              Start a conversation <ArrowUpRight size={17} />
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-[22px] border border-[var(--gold-strong)]/50 bg-white/55 p-6 shadow-[0_12px_26px_rgba(121,89,33,0.10)] transition duration-300 hover:-translate-y-1 hover:bg-white/80"
              >
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[var(--gold-strong)] text-sm font-black text-[var(--ink)]">
                  0{index + 1}
                </div>
                <h3 className="text-2xl font-bold">{step.title}</h3>
                <p className="mt-4 text-base leading-7 text-[var(--ink)]/70">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-[var(--gold-light)]">
        <div className="mx-auto max-w-6xl rounded-[32px] border border-[var(--line)] bg-[linear-gradient(135deg,#f9e7bb,#f5d688)] p-8 shadow-[0_24px_60px_rgba(47,62,78,0.12)] md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow !mb-0 !text-[var(--teal-dark)]">Need a partner?</p>
              <h2 className="display mt-4 text-5xl leading-none sm:text-6xl">Bring us the complex thing.</h2>
            </div>
            <Link href="/contact" className="btn-dark">
              Start a conversation <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
