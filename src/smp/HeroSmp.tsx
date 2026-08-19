import { useEffect, useState } from "react";
import { Copy, Check, Users, Activity, Zap, ArrowRight, ChevronDown } from "lucide-react";
import { SERVER_IP, EVENTS } from "./data";

export default function HeroSmp() {
  const [copied, setCopied] = useState(false);
  const [online, setOnline] = useState(87);

  const copy = async () => {
    try { await navigator.clipboard.writeText(SERVER_IP); } catch {/* */}
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  useEffect(() => {
    const t = setInterval(() => setOnline((o) => Math.max(50, Math.min(140, o + Math.round((Math.random() - 0.45) * 5)))), 2800);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pb-0 pt-40 md:pt-48">
      <div className="pointer-events-none absolute -left-32 top-20 h-[500px] w-[500px] rounded-full bg-[var(--zap)]/15 blur-[130px]" />
      <div className="pointer-events-none absolute -right-32 top-32 h-[440px] w-[440px] rounded-full bg-[var(--volt)]/14 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="z-pill text-[var(--zap)]">
            <span className="pulse-ring h-2 w-2 rounded-full bg-[var(--zap)]" />
            SERVER ONLINE · JAVA + BEDROCK
          </span>

          <h1 className="mt-8 font-display text-5xl font-700 leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl">
            Lightning strikes
            <br />
            <span className="zap-grad">every block.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-[16px] font-600 leading-relaxed text-[var(--text2)]">
            ZapMC — the SMP that hits different. Player economy, custom enchants,
            weekly events and crate loot delivered at the speed of ⚡
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Users, label: `${online} online`, color: "var(--zap)" },
              { icon: Activity, label: "20 TPS", color: "var(--volt)" },
              { icon: Zap, label: "Low ping", color: "var(--shock)" },
            ].map((s) => (
              <span key={s.label} className="z-pill">
                <s.icon className="h-3.5 w-3.5" style={{ color: s.color }} />
                <span className="font-700 text-[var(--text)]">{s.label}</span>
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button onClick={copy} className="z-btn text-[15px]">
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              {copied ? "IP Copied!" : SERVER_IP}
            </button>
            <a href="#shop" className="z-btn-ghost text-[15px]">
              Visit Store <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-16">
          <div className="z-glow overflow-hidden rounded-3xl">
            <img src="./img/minecraft-world.jpg" alt="ZapMC world" className="h-[240px] w-full object-cover sm:h-[320px] md:h-[400px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 md:bottom-6 md:left-6">
              {[
                { label: "Custom enchants active", color: "var(--volt)" },
                { label: "Land claims enabled", color: "var(--zap)" },
                { label: "Weekly events", color: "var(--shock)" },
              ].map((s) => (
                <span key={s.label} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[11px] font-700 text-white backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                  {s.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 border-y border-[var(--border)] bg-[var(--surface)]/60 py-3.5 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-[var(--bg)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-[var(--bg)] to-transparent" />
        <div className="flex w-max marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="flex shrink-0 items-center gap-3 pr-3">
              {EVENTS.map((e, i) => (
                <span key={i} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-[11px] font-700 text-[var(--text2)]">
                  <span className="h-2 w-2 rounded-full" style={{ background: e.color }} />
                  <span className="text-white">{e.who}</span> {e.what}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center pb-6 pt-8">
        <ChevronDown className="h-5 w-5 animate-bounce text-[var(--text2)]" />
      </div>
    </section>
  );
}
