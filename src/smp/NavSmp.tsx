import { useEffect, useState } from "react";
import { Zap, Menu, X, MessagesSquare, Sparkles } from "lucide-react";
import { DISCORD_URL } from "./data";

const LINKS = [
  { label: "Features", href: "#world" },
  { label: "Store", href: "#shop" },
  { label: "Join", href: "#join" },
];

export default function NavSmp() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex h-7 items-center justify-center border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
        <div className="flex items-center gap-2 px-3">
          <Sparkles className="h-2.5 w-2.5 text-[var(--zap)]" fill="currentColor" />
          <span className="font-mono2 text-[9px] font-700 tracking-[0.18em] text-[var(--text2)]">
            CRAFTED BY <span className="credit-name">AKSHAT</span>
            <span className="mx-1.5 opacity-30">·</span>
            DIRECTED BY <span className="credit-name">HUZAIFA</span>
          </span>
        </div>
      </div>

      <header className={`fixed inset-x-0 top-7 z-40 transition-all duration-500 ${scrolled ? "bg-[var(--bg)]/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl" : ""}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="bolt-flicker grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--zap)] to-[var(--zap-deep)]">
              <Zap className="h-4.5 w-4.5 text-[var(--bg)]" fill="currentColor" />
            </span>
            <span className="font-display text-base font-700 text-white">
              Zap<span className="zap-grad">MC</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="rounded-xl px-4 py-2 text-[13px] font-700 text-[var(--text2)] transition-colors hover:bg-white/5 hover:text-white">{l.label}</a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="z-btn !px-5 !py-2.5 text-[13px]">
              <MessagesSquare className="h-4 w-4" /> Join Server
            </a>
          </div>

          <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] lg:hidden" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-500 lg:hidden ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="mx-4 mb-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-700 text-[var(--text2)] transition-colors hover:bg-white/5 hover:text-white">{l.label}</a>
            ))}
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="z-btn mt-2 w-full justify-center !py-3 text-[13px]">
              <MessagesSquare className="h-4 w-4" /> Join Server
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
