import { useState } from "react";
import { Copy, Check, Zap, MessagesSquare, IndianRupee, Wallet, Smartphone, Phone, Bitcoin, ArrowUpRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { SERVER_IP, DISCORD_URL } from "./data";

const PAYMENTS = [
  { icon: IndianRupee, label: "UPI" }, { icon: Wallet, label: "GPay" }, { icon: Smartphone, label: "Paytm" }, { icon: Phone, label: "PhonePe" }, { icon: Bitcoin, label: "Crypto" },
];

export default function FooterSmp() {
  const [copied, setCopied] = useState(false);
  const copy = async () => { try { await navigator.clipboard.writeText(SERVER_IP); } catch {/* */} setCopied(true); setTimeout(() => setCopied(false), 1800); };

  return (
    <footer id="join" className="relative">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="z-glow relative overflow-hidden p-8 text-center md:p-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[var(--zap)]/15 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[var(--volt)]/14 blur-[80px]" />
            <div className="relative">
              <span className="z-pill text-[var(--zap)]"><span className="pulse-ring h-2 w-2 rounded-full bg-[var(--zap)]" /> SERVER ONLINE</span>
              <h2 className="mt-6 font-display text-3xl font-700 tracking-tight text-white md:text-5xl">Join the <span className="zap-grad">lightning</span></h2>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button onClick={copy} className="z-btn text-[15px]">{copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}{copied ? "IP Copied!" : `Copy IP · ${SERVER_IP}`}</button>
                <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="z-btn-ghost text-[15px]"><MessagesSquare className="h-5 w-5" /> discord.gg/4jM9mqvtnZ <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
      <div className="mt-20 border-t border-[var(--border)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-8 lg:grid-cols-[1.3fr_1fr_1.2fr]">
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <span className="bolt-flicker grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[var(--zap)] to-[var(--zap-deep)]"><Zap className="h-4 w-4 text-[var(--bg)]" fill="currentColor" /></span>
              <span className="font-display text-base font-700 text-white">Zap<span className="zap-grad">MC</span></span>
            </a>
            <p className="mt-4 max-w-xs text-sm font-600 leading-relaxed text-[var(--text2)]">The SMP that hits different. Built for speed, built for fun.</p>
          </div>
          <div>
            <p className="font-mono2 text-[10px] font-700 tracking-[0.3em] text-[var(--text2)]">EXPLORE</p>
            <ul className="mt-4 space-y-2.5 text-sm font-700 text-[var(--text2)]">
              <li><a href="#world" className="hover:text-white">Features</a></li>
              <li><a href="#shop" className="hover:text-white">Store</a></li>
              <li><a href={DISCORD_URL} target="_blank" rel="noreferrer" className="hover:text-white">Discord</a></li>
            </ul>
          </div>
          <div>
            <p className="font-mono2 text-[10px] font-700 tracking-[0.3em] text-[var(--text2)]">WE ACCEPT</p>
            <div className="mt-4 flex flex-wrap gap-2">{PAYMENTS.map((p) => (<span key={p.label} className="z-pill text-[11px]"><p.icon className="h-3.5 w-3.5 text-[var(--zap)]" /> {p.label}</span>))}</div>
          </div>
        </div>
        <div className="sep" />
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-6 text-center font-mono2 text-[9px] font-700 tracking-wider text-[var(--text2)] md:flex-row md:px-8 md:text-left">
          <span>© 2025 ZAPMC · CRAFTED BY <span className="credit-name">AKSHAT</span> · DIRECTED BY <span className="credit-name">HUZAIFA</span></span>
          <span>NOT AFFILIATED WITH MOJANG AB OR MICROSOFT</span>
        </div>
      </div>
    </footer>
  );
}
