"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { CategoryFlow } from "./components/CategoryFlow";
import { OrbitalSection } from "./components/OrbitalSection";

const workflowSteps = [
  { number: "01", title: "Discover", label: "Brief and direction", description: "We listen carefully, understand the context, and turn your idea into a clear direction.", image: "/1.svg" },
  { number: "02", title: "Develop", label: "Design and coordination", description: "We shape the details, coordinate the disciplines, and make the solution ready to move forward.", image: "/2.svg" },
  { number: "03", title: "Deliver", label: "Buildable outcomes", description: "We carry the thinking through to practical delivery, with clarity at every important step.", image: "/3.svg" },
];

const serviceHighlights = [
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

export default function Home() {
  return <main>
    <nav aria-label="Primary navigation" className="fixed inset-x-0 top-0 z-30 border-b border-[#435365] bg-[#2f3e4e] text-white">
      <div className="flex items-center justify-between gap-5 overflow-x-auto px-5 py-2 lg:px-8">
        <Link href="/" className="focus-ring flex shrink-0 items-center gap-2">
          <Image src="/logo-transparent.svg" alt="RAWAL Engineering logo" width={48} height={48} priority className="object-contain" />
          <span className="display text-xs font-bold leading-tight tracking-[.1em] text-[var(--lime)] sm:text-sm">RAWAL ENGINEERING<br /><span className="text-[.68em] font-normal tracking-[.16em]">PVT. LTD.</span></span>
        </Link>
        <div className="flex shrink-0 items-center gap-4 text-sm lg:gap-7">
          <Link href="/about" className="whitespace-nowrap text-white/75 transition hover:text-white">About</Link>
          <Link href="/services" className="whitespace-nowrap text-white/75 transition hover:text-white">Services</Link>
          <Link href="/projects" className="whitespace-nowrap text-white/75 transition hover:text-white">Projects</Link>
          <Link href="/careers" className="whitespace-nowrap text-white/75 transition hover:text-white">Careers</Link>
          <Link href="/contact" className="whitespace-nowrap text-white/75 transition hover:text-white">Contact</Link>
        </div>
      </div>
    </nav>
    <div className="pt-[4.5rem]">
      <div className="orbital-background-wrap">
        <OrbitalSection />
      </div>
    <section id="about" className="section-pad bg-[var(--cream)]"><div className="mx-auto max-w-7xl"><div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center"><div className="contact-image-slot" aria-label="Property image"><Image src="/clon.svg" alt="Property design" fill className="object-cover" /></div><div><p className="eyebrow">WHO WE ARE</p><h2 className="display mt-4 text-5xl leading-none sm:text-6xl">THE DETAIL IS WHERE <em>TRUST</em> LIVES.</h2><p className="mt-7 text-xl leading-8 text-[var(--muted)]">RAWAL IS AN INDEPENDENT ENGINEERING COMPANY WORKING ACROSS THE BUILT ENVIRONMENT. WE BRING SHARP THINKING, LOCAL KNOWLEDGE, AND A GENUINE RESPECT FOR THE COMMUNITIES OUR WORK SERVES.</p></div></div><CategoryFlow /></div></section>
    <section className="section-pad bg-[var(--cream)]"><div className="mx-auto max-w-6xl rounded-[32px] border border-[var(--line)] bg-[linear-gradient(135deg,#f9e7bb,#f5d688)] p-8 shadow-[0_24px_60px_rgba(47,62,78,0.12)] md:p-12"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div className="max-w-2xl"><p className="eyebrow !mb-0 !text-[var(--teal-dark)]">Need a partner?</p><h2 className="display mt-4 text-5xl leading-none sm:text-6xl">Bring us the complex thing.</h2></div><Link href="mailto:contact@rawalengineering.com.np" className="btn-dark">Start a conversation <ArrowUpRight size={18} /></Link></div></div></section>
    <section id="services" className="section-pad grid-lines"><div className="mx-auto max-w-7xl"><p className="eyebrow">What we do</p><div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="display max-w-xl text-5xl leading-none sm:text-6xl">Practical expertise. <em>Ambitious outcomes.</em></h2><p className="max-w-sm text-[var(--muted)]">One connected team from first sketch to final handover, with the experience to make difficult work feel clear.</p></div><div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-[var(--line)] md:grid-cols-3"><div className="bg-white p-8"><span className="text-4xl font-light text-[var(--teal)]">01</span><h3 className="mt-16 text-2xl font-bold">Design & Advisory</h3><p className="muted mt-3 leading-7">Strategy, architecture, engineering, and design that responds to its context.</p></div><div className="bg-white p-8"><span className="text-4xl font-light text-[var(--teal)]">02</span><h3 className="mt-16 text-2xl font-bold">Project Delivery</h3><p className="muted mt-3 leading-7">Disciplined coordination that turns complexity into dependable progress.</p></div><div className="bg-[linear-gradient(180deg,#f9e7bb,#e7c978)] p-8 text-[var(--ink)]"><span className="text-4xl font-light text-[var(--teal-dark)]">03</span><h3 className="mt-16 text-2xl font-bold">Future Systems</h3><p className="mt-3 leading-7 text-[var(--ink)]/80">Digital tools and resilient infrastructure for a changing world.</p></div></div><div className="mt-12 rounded-[28px] border border-[#2f3e4e]/10 bg-white/60 p-6 shadow-[0_20px_40px_rgba(47,62,78,0.08)] backdrop-blur-sm sm:p-8">
          <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-5">
            <p className="eyebrow !mb-0">Service range</p>
            <span className="text-xs font-bold uppercase tracking-[.16em] text-[var(--muted)]">Full scope</span>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {serviceHighlights.map(item => (
              <div key={item} className="flex items-center rounded-full border border-[var(--line)] bg-[var(--cream)] px-4 py-3 text-sm font-semibold leading-6 text-[var(--ink)] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.4)] transition duration-200 hover:-translate-y-0.5 hover:border-[var(--teal)]">
                <span className="mr-3 inline-flex h-2.5 w-2.5 rounded-full bg-[var(--gold-strong)]" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </div></div></section>
    <section id="projects" className="section-pad bg-[var(--ink)] text-white"><div className="mx-auto max-w-7xl"><div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow !text-[var(--lime)]">Our working flow</p><h2 className="display mt-4 max-w-3xl text-5xl leading-none sm:text-6xl">From first idea to <em>final detail.</em></h2><p className="mt-4 max-w-2xl text-base leading-7 text-white/75">A connected process that keeps the brief, the design, and the delivery moving in the same direction.</p></div><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[.15em] text-[var(--lime)] transition hover:text-white">Start a project <ArrowUpRight size={16} /></Link></div><div className="mt-12 grid gap-5 md:grid-cols-3">{workflowSteps.map((step, index) => <article key={step.number} className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5"><div className="relative aspect-[4/3] overflow-hidden bg-[var(--gold-light)]"><Image src={step.image} alt={`${step.title}: ${step.label}`} fill className="object-contain p-6 transition-transform duration-500 group-hover:scale-105" /></div><div className="p-6"><div className="flex items-center justify-between gap-4"><span className="text-4xl font-light text-[var(--gold-strong)]">{step.number}</span><span className="text-xs font-bold uppercase tracking-[.14em] text-[var(--lime)]">{step.label}</span></div><h3 className="mt-5 text-2xl font-bold text-white">{step.title}</h3><p className="mt-3 text-sm leading-6 text-white/70">{step.description}</p></div>{index < workflowSteps.length - 1 && <span className="absolute -right-3 top-1/2 z-10 hidden h-6 w-6 rotate-45 border-r border-t border-[var(--gold-strong)] bg-[var(--ink)] md:block" aria-hidden="true" />}</article>)}</div></div></section>
    <section id="contact" className="section-pad bg-[var(--lime)]"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="eyebrow !text-[var(--teal-dark)]">Start a conversation</p><h2 className="display mt-4 max-w-2xl text-6xl leading-[.95]">Have a complex thing to solve?</h2></div><Link href="mailto:contact@rawalengineering.com.np" className="btn-dark">contact@rawalengineering.com.np <ArrowUpRight size={18}/></Link></div><div className="mt-12 overflow-hidden rounded-[28px] border border-[#2f3e4e]/10 bg-[var(--cream)] shadow-[0_24px_60px_rgba(47,62,78,0.12)]"><div className="grid md:grid-cols-[1.2fr_0.8fr]"><div className="h-[280px] md:h-[360px]"><iframe title="RAWAL Engineering location near Hope Hospital, Sinamangal" src="https://www.google.com/maps?q=Hope%20Hospital%20opposite%2C%20Gali%203%2C%20Sinamangal%2C%20Kathmandu&z=17&output=embed" className="h-full w-full border-0 grayscale contrast-125" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="flex flex-col justify-center p-8 md:p-10"><p className="eyebrow !text-[var(--teal-dark)]">Find us</p><div className="mt-6 flex items-start gap-3"><MapPin className="mt-1 shrink-0 text-[var(--teal)]" size={22} /><div><p className="text-xl font-bold text-[var(--ink)]">RAWAL Engineering</p><p className="mt-2 max-w-xs text-[var(--muted)]">Hope Hospital opposite, Gali 3, 3rd house, Sinamangal, Kathmandu.</p><p className="mt-2 max-w-xs text-[var(--muted)]">Working across the places that need thoughtful infrastructure.</p></div></div><div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--ink)]"><span className="inline-flex h-2.5 w-2.5 rounded-full bg-[var(--teal)]" /><span>Available for early-stage conversations</span></div></div></div></div></div></section>
    </div>
  </main>;
}
