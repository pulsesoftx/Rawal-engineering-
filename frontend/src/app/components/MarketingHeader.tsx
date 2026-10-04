import { Camera, Mail, MessageCircle, Music2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
      <path d="M13.5 21v-8h2.5l.5-3h-3V7.2c0-.8.4-1.2 1.3-1.2H16V3.2c-.5-.1-1.7-.2-2.8-.2-2.8 0-4.7 1.7-4.7 4.9V10H6v3h3.5v8h4Z" />
    </svg>
  );
}

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.facebook.com/rawalengineering", label: "Facebook", icon: FacebookIcon, color: "bg-[#1877F2]" },
  { href: "https://www.instagram.com/rawalengineering/", label: "Instagram", icon: Camera, color: "bg-[linear-gradient(135deg,#feda75,#fa7e1e,#d62976,#962fbf,#4f5bd5)]" },
  { href: "https://www.tiktok.com/@rawalengineering", label: "TikTok", icon: Music2, color: "bg-[#000000]" },
];

const contactLinks = [
  { href: "https://wa.me/9779716436755?text=Hello%20RAWAL%20Engineering,%20I%20would%20like%20to%20discuss%20a%20project.", label: "WhatsApp", icon: MessageCircle, color: "bg-[#25D366]" },
  { href: "mailto:contact@rawalengineering.com.np", label: "Gmail", icon: Mail, color: "bg-[#EA4335]" },
];

export default function MarketingHeader() {
  return (
    <header className="relative overflow-hidden border-b border-[#435365]/70 bg-[linear-gradient(135deg,#182b39,#2c3d4d,#203446)] text-white shadow-[0_14px_32px_rgba(17,28,35,0.2)]">
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at top left, rgba(240,210,128,0.18), transparent 28%), radial-gradient(circle at bottom right, rgba(255,255,255,0.08), transparent 30%)",
        }}
      />

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link href="/" aria-label="RAWAL Engineering, rawalengineering.com.np" className="focus-ring group flex shrink-0 items-center gap-2 rounded-lg px-2 py-1 text-left transition hover:bg-white/5 sm:gap-3">
          <Image src="/logo-transparent.svg" alt="" width={48} height={48} priority className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12" />
          <span className="flex flex-col">
            <span className="display text-[1.15rem] font-bold leading-none tracking-[0.08em] text-[var(--lime)] sm:text-[1.35rem] lg:text-[1.55rem]">
              RAWAL
            </span>
            <span className="mt-1 whitespace-nowrap text-[0.56rem] font-semibold leading-none tracking-[0.04em] text-white/85 sm:text-[0.64rem] lg:text-[0.72rem]">
              engineering<span className="text-[var(--lime)]">.com.np</span>
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white/75 lg:flex lg:gap-7">
          {links.map(link => <Link key={link.href} href={link.href} className="transition hover:text-white">{link.label}</Link>)}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {socialLinks.map(({ href, label, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className={`z-10 grid h-11 w-11 place-items-center rounded-full border border-white/50 ${color} text-white shadow-[0_0_0_3px_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.22)] transition hover:scale-105 hover:brightness-110`}
            >
              <Icon size={18} strokeWidth={2.4} />
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          {contactLinks.map(({ href, label, icon: Icon, color }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className={`z-10 grid h-11 w-11 place-items-center rounded-full border border-white/50 ${color} text-white shadow-[0_0_0_3px_rgba(255,255,255,0.12),0_10px_22px_rgba(0,0,0,0.22)] transition hover:scale-105 hover:brightness-110`}
            >
              <Icon size={18} strokeWidth={2.4} />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
