import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const services = [
  "Residential exterior and interior design",
  "Commercial exterior and interior design",
  "Hospital and educational institute design",
  "Property development and plotting design",
];

export default function SiteFooter() {
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr_.9fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              <Image src="/logo-transparent.svg" alt="RAWAL Engineering logo" width={58} height={58} className="object-contain" />
              <span className="display text-sm font-bold leading-tight tracking-[.12em] text-[var(--gold-light)]">RAWAL ENGINEERING<br /><span className="text-[.68em] font-normal tracking-[.2em]">PVT. LTD.</span></span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/65">Architecture, engineering, and delivery thinking in one connected conversation.</p>
            <Link href="/contact" className="btn-primary mt-7">Start a conversation <ArrowUpRight size={17} /></Link>
          </div>

          <div>
            <p className="eyebrow !text-[var(--lime)]">Explore</p>
            <nav className="mt-5 grid gap-3 text-sm text-white/70" aria-label="Footer navigation">
              {navigation.map(link => <Link key={link.href} href={link.href} className="transition hover:text-white">{link.label}</Link>)}
            </nav>
          </div>

          <div>
            <p className="eyebrow !text-[var(--lime)]">Our services</p>
            <ul className="mt-5 grid gap-3 text-sm leading-6 text-white/70">
              {services.map(service => <li key={service}>{service}</li>)}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-5 border-t border-white/15 pt-7 text-sm text-white/65 md:grid-cols-3">
          <div className="flex items-start gap-3"><MapPin size={18} className="mt-1 shrink-0 text-[var(--lime)]" /><span>Hope Hospital opposite, Gali 3,<br />3rd house, Sinamangal, Kathmandu</span></div>
          <a href="mailto:contact@rawalengineering.com.np" className="flex items-center gap-3 transition hover:text-white"><Mail size={18} className="shrink-0 text-[var(--lime)]" />contact@rawalengineering.com.np</a>
          <a href="tel:9860208667" className="flex items-center gap-3 transition hover:text-white"><Phone size={18} className="shrink-0 text-[var(--lime)]" />9860208667</a>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/45 md:flex-row">
          <span>© 2026 RAWAL Engineering</span>
          <span>Built by PulsesoftX Pvt. Ltd.</span>
          <Link href="/careers" className="transition hover:text-white">Join the team <ArrowUpRight size={13} className="inline" /></Link>
        </div>
      </div>
    </footer>
  );
}
