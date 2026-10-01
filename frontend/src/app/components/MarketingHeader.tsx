import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export default function MarketingHeader() {
  return (
    <nav className="border-b border-[#435365] bg-[#2f3e4e] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 lg:px-8">
        <Link href="/" className="focus-ring flex items-center gap-[.2rem]">
          <Image src="/logo-transparent.svg" alt="RAWAL Engineering logo" width={64} height={64} priority className="object-contain p-[.2rem]" />
          <span className="display text-sm font-bold leading-tight tracking-[.12em] sm:text-base">
            RAWAL ENGINEERING<br />
            <span className="text-[.68em] font-normal tracking-[.2em]">PVT. LTD.</span>
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm lg:gap-8">
          {links.map(link => <Link key={link.href} href={link.href} className="hidden text-white/75 transition hover:text-white sm:block">{link.label}</Link>)}
        </div>
      </div>
    </nav>
  );
}
