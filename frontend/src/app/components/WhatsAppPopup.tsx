"use client";

import { ArrowUpRight, MessageCircle, X } from "lucide-react";
import { useState } from "react";

const whatsappHref =
  "https://wa.me/9779716436755?text=Hello%20RAWAL%20Engineering,%20I%20would%20like%20to%20discuss%20a%20project.";

export default function WhatsAppPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <div
        className={[
          "w-[290px] overflow-hidden rounded-[22px] border border-[#dfe9e4] bg-white/95 shadow-[0_22px_60px_rgba(10,30,28,0.18)] backdrop-blur-md transition-all duration-300",
          isOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        ].join(" ")}
      >
        <div className="bg-[var(--teal-dark)] px-4 py-3 text-white">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#2e8c7d]">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">WhatsApp</p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/75">Chat now</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close WhatsApp chat"
              onClick={() => setIsOpen(false)}
              className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/15"
            >
              <X size={14} />
            </button>
          </div>
        </div>

        <div className="space-y-4 p-4">
          <p className="text-sm leading-6 text-[var(--ink)]">
            Need help with a project, design brief, or engineering consultation?
          </p>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-bold text-[#0d231d] transition hover:brightness-105"
          >
            <MessageCircle size={17} />
            Start chat
            <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      <button
        type="button"
        aria-label="Open WhatsApp chat"
        onClick={() => setIsOpen((open) => !open)}
        className="grid h-16 w-16 place-items-center rounded-full bg-[#25D366] text-[#0d231d] shadow-[0_18px_40px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:shadow-[0_18px_45px_rgba(37,211,102,0.6)]"
      >
        {isOpen ? <X size={26} /> : <MessageCircle size={30} />}
      </button>
    </div>
  );
}
