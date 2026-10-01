import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import MarketingHeader from "../components/MarketingHeader";

const serviceOptions = [
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

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--ink)]">
      <MarketingHeader />
      <header className="bg-[var(--lime)] px-5 pb-20 pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow !text-[var(--teal-dark)]">Start a conversation</p>
          <h1 className="display mt-5 max-w-4xl text-6xl leading-[.94] sm:text-8xl">Have a complex thing to <em>solve?</em></h1>
        </div>
      </header>
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="eyebrow">Tell us a little more</p>
            <h2 className="display mt-4 text-5xl leading-none">The first step is a good question.</h2>
            <p className="muted mt-6 max-w-xl leading-7">Tell us what you are building, improving, or imagining. A little context helps us connect you with the right people and shape a useful first conversation.</p>
            <form className="mt-10 max-w-3xl space-y-6 rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-[0_20px_45px_rgba(47,62,78,0.08)] sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="label">Name<input className="input mt-2" type="text" name="name" autoComplete="name" required /></label>
                <label className="label">Email<input className="input mt-2" type="email" name="email" autoComplete="email" required /></label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="label">Phone<input className="input mt-2" type="tel" name="phone" autoComplete="tel" /></label>
                <label className="label">Organization<input className="input mt-2" type="text" name="organization" autoComplete="organization" /></label>
              </div>
              <label className="label">What service do you need?<select className="input mt-2" name="service" defaultValue="" required><option value="" disabled>Select a service</option>{serviceOptions.map(service => <option key={service} value={service}>{service}</option>)}</select></label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="label">Project stage<select className="input mt-2" name="stage" defaultValue=""><option value="">Select stage</option><option>Early idea</option><option>Design development</option><option>Ready for construction</option><option>Existing project improvement</option></select></label>
                <label className="label">Target timeline<select className="input mt-2" name="timeline" defaultValue=""><option value="">Select timeline</option><option>As soon as possible</option><option>Within 1-3 months</option><option>Within 3-6 months</option><option>Exploring options</option></select></label>
              </div>
              <label className="label">What are you working on?<textarea className="input mt-2 min-h-36 resize-y" name="message" placeholder="Share the location, scale, goals, and anything you already know." required /></label>
              <div className="border-t border-[var(--line)] pt-6">
                <p className="text-sm font-bold text-[var(--ink)]">Choose how you would like to continue</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <a href="https://wa.me/9779860208667?text=Hello%20RAWAL%20Engineering,%20I%20would%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer" className="btn-dark"><MessageCircle size={17} /> WhatsApp <ArrowUpRight size={17} /></a>
                  <a href="mailto:contact@rawalengineering.com.np" className="btn-primary"><Mail size={17} /> Email us <ArrowUpRight size={17} /></a>
                </div>
              </div>
            </form>
          </div>
          <aside className="rounded-2xl bg-[var(--cream)] p-8 lg:p-10">
            <p className="eyebrow">Find us</p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--line)] bg-white"><iframe title="RAWAL Engineering location near Hope Hospital, Sinamangal" src="https://www.google.com/maps?q=Hope%20Hospital%20opposite%2C%20Gali%203%2C%20Sinamangal%2C%20Kathmandu&z=17&output=embed" className="h-64 w-full border-0 grayscale contrast-125" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <div className="mt-8 space-y-7">
              <div className="flex gap-4"><MapPin className="shrink-0 text-[var(--teal)]" /><div><strong>Hope Hospital opposite, Gali 3</strong><p className="muted mt-1 leading-6">3rd house, Sinamangal, Kathmandu.</p></div></div>
              <div className="flex gap-4"><Mail className="shrink-0 text-[var(--teal)]" /><div><strong>contact@rawalengineering.com.np</strong><p className="muted mt-1">General enquiries and project conversations.</p></div></div>
              <div className="flex gap-4"><Phone className="shrink-0 text-[var(--teal)]" /><div><strong>9860208667</strong><p className="muted mt-1">Monday to Friday, 9:00 to 17:00.</p></div></div>
            </div>
            <Link href="/careers" className="mt-10 inline-flex items-center gap-2 font-bold text-[var(--teal)]">Join the team <ArrowUpRight size={16} /></Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
