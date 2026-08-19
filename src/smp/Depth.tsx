import { useEffect, useRef, useState } from "react";
import { Coins, ShieldCheck, Sparkles, CalendarDays, Users, Skull } from "lucide-react";
import Reveal from "../components/Reveal";
import { FEATURES } from "./data";

const ICONS: Record<string, typeof Coins> = { coins: Coins, shield: ShieldCheck, sparkles: Sparkles, calendar: CalendarDays, users: Users, skull: Skull };
const GRADS = ["from-[var(--zap)] to-amber-400", "from-[var(--volt)] to-fuchsia-400", "from-[var(--shock)] to-cyan-300", "from-emerald-400 to-teal-400", "from-[var(--zap)] to-orange-400", "from-[var(--ember)] to-rose-400"];

function useCountUp(target: number, run: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - t0) / 1800); setV(Math.round(target * (1 - Math.pow(1 - p, 4)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target]);
  return v;
}

export default function Depth() {
  const [run, setRun] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { const el = ref.current; if (!el) return; const io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { setRun(true); io.disconnect(); } }, { threshold: 0.2 }); io.observe(el); return () => io.disconnect(); }, []);

  const players = useCountUp(2400, run);
  const crates = useCountUp(1800, run);
  const blocks = useCountUp(12, run);
  const dragons = useCountUp(23, run);

  return (
    <section id="world" className="relative mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="z-pill text-[var(--zap)]"><Sparkles className="h-3 w-3" fill="currentColor" /> FEATURES</span>
            <h2 className="mt-5 font-display text-3xl font-700 tracking-tight text-white md:text-5xl">
              Built for <span className="zap-grad">dominance</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm font-600 text-[var(--text2)]">Everything that keeps crafters grinding season after season.</p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon] ?? Sparkles;
          return (
            <Reveal key={f.title} delay={i * 70}>
              <div className="z-card group h-full p-6">
                <span className={`z-icon-glow grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${GRADS[i]} text-white`}>
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[15px] font-700 text-white">{f.title}</h3>
                <p className="mt-2 text-[13.5px] font-600 leading-relaxed text-[var(--text2)]">{f.desc}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div ref={ref} className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { v: players.toLocaleString("en-IN"), s: "+", l: "PLAYERS", c: "var(--zap)" },
          { v: String(dragons), s: "", l: "DRAGONS", c: "var(--volt)" },
          { v: crates.toLocaleString("en-IN"), s: "", l: "CRATES", c: "var(--shock)" },
          { v: String(blocks), s: "M", l: "BLOCKS", c: "var(--zap)" },
        ].map((s) => (
          <div key={s.l} className="z-card p-5 text-center">
            <p className="stat-num font-display text-2xl font-700 text-white md:text-3xl">{s.v}<span style={{ color: s.c }}>{s.s}</span></p>
            <p className="mt-1.5 font-mono2 text-[9px] font-700 tracking-[0.2em] text-[var(--text2)]">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
