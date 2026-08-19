import { useEffect, useRef, type CSSProperties } from "react";
import { Zap, Sparkles, Layers, Moon, Type, Terminal, Palette, ArrowRight, Star, Check, MessagesSquare, ChevronDown } from "lucide-react";

/* ---- scroll reveal hook ---- */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const els = el.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Rv({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return <div className={`reveal ${className}`} style={{ "--rd": `${delay}ms` } as CSSProperties}>{children}</div>;
}

const DESIGNS = [
  { id: "paper", name: "Paper", icon: Layers, color: "#e74c3c", desc: "Handcrafted, tactile, warm — like opening a real notebook." },
  { id: "glass", name: "Liquid Glass", icon: Sparkles, color: "#8b5cf6", desc: "Frosted surfaces refracting light from the world behind." },
  { id: "neo", name: "Neomorphism", icon: Moon, color: "#6366f1", desc: "Soft-extruded surfaces rising from a monochrome canvas." },
  { id: "aurora", name: "Aurora Dark", icon: Zap, color: "#7c5cff", desc: "Gradient mesh meeting dark surfaces. Premium SaaS energy." },
  { id: "brutal", name: "Brutalist", icon: Type, color: "#000000", desc: "Raw, unapologetic, in-your-face. No decoration, only impact." },
  { id: "term", name: "Retro Terminal", icon: Terminal, color: "#00ff41", desc: "Phosphor green on black. Every keystroke feels intentional." },
  { id: "mesh", name: "Gradient Mesh", icon: Palette, color: "#ff6b6b", desc: "Living color fields blending behind frosted cards." },
];

/* ================================================================ */

export default function App() {
  const appRef = useReveal();

  return (
    <div ref={appRef} className="relative min-h-screen">
      <div className="grain" />

      {/* ================ HERO ================ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
        <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-violet-500/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-40 bottom-20 h-[440px] w-[440px] rounded-full bg-pink-500/12 blur-[110px]" />
        <div className="pointer-events-none absolute left-1/3 top-1/2 h-[300px] w-[300px] rounded-full bg-cyan-400/8 blur-[100px]" />

        <Rv>
          <p className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2 font-mono2 text-[10px] font-700 tracking-[0.2em] text-violet-300">
            <Sparkles className="h-3 w-3" fill="currentColor" /> 7 DESIGN SYSTEMS · 1 SCROLL
          </p>
        </Rv>

        <Rv delay={80}>
          <h1 className="mt-8 font-display text-5xl font-700 leading-[1.04] tracking-tight text-white sm:text-6xl md:text-7xl">
            Every style we
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">can build.</span>
          </h1>
        </Rv>

        <Rv delay={160}>
          <p className="mx-auto mt-6 max-w-xl text-[16px] font-600 leading-relaxed text-white/50">
            Paper, Liquid Glass, Neomorphism, Aurora, Brutalist, Terminal, Gradient Mesh —
            scroll through each one and pick the vibe for your project.
          </p>
        </Rv>

        <Rv delay={240}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {DESIGNS.map((d) => (
              <a key={d.id} href={`#${d.id}`} className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-4 py-2.5 text-[12px] font-700 text-white/60 transition-all hover:bg-white/8 hover:text-white">
                <d.icon className="h-3.5 w-3.5" style={{ color: d.color }} />
                {d.name}
              </a>
            ))}
          </div>
        </Rv>

        <Rv delay={320}>
          <p className="mt-16 font-mono2 text-[10px] font-700 tracking-[0.2em] text-white/25">
            CRAFTED BY <span className="credit-name">AKSHAT</span> · DIRECTED BY <span className="credit-name">HUZAIFA</span>
          </p>
        </Rv>

        <ChevronDown className="absolute bottom-8 h-5 w-5 animate-bounce text-white/25" />
      </section>

      {/* ================ 1. PAPER ================ */}
      <section id="paper" className="paper-bg relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Rv>
            <span className="paper-stamp">01 — PAPER DESIGN</span>
          </Rv>
          <Rv delay={60}>
            <h2 className="mt-8 font-display text-4xl font-700 text-[#2c3e50] md:text-5xl">
              Warm. Tactile. <span className="text-[#e74c3c]">Handcrafted.</span>
            </h2>
            <p className="mt-4 max-w-lg text-[15px] font-600 leading-relaxed text-[#5a6a7a]">
              Notebook ruled lines, masking tape, paper clips and hard offset shadows.
              Everything feels like it was pinned to a corkboard.
            </p>
          </Rv>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { title: "Pricing Card", price: "₹499/mo", color: "#e74c3c" },
              { title: "Pro Plan", price: "₹999/mo", color: "#3498db" },
              { title: "Enterprise", price: "₹2,499/mo", color: "#2ecc71" },
            ].map((c, i) => (
              <Rv key={c.title} delay={i * 90}>
                <div className="paper-card relative p-6">
                  {i === 1 && <div className="paper-tape" />}
                  {i === 0 && <div className="paper-clip" />}
                  <p className="font-mono2 text-[10px] font-700 tracking-[0.2em]" style={{ color: c.color }}>
                    {["STARTER", "POPULAR", "SCALE"][i]}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-700 text-[#2c3e50]">{c.title}</h3>
                  <p className="mt-2 font-display text-3xl font-700" style={{ color: c.color }}>{c.price}</p>
                  <ul className="mt-4 space-y-2 text-[13px] font-600 text-[#5a6a7a]">
                    {["Full access", "Priority support", "Custom domain"].map((f) => (
                      <li key={f} className="flex items-center gap-2"><Check className="h-3.5 w-3.5" style={{ color: c.color }} /> {f}</li>
                    ))}
                  </ul>
                  <button className="paper-btn mt-6 w-full text-center">Choose Plan</button>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ================ 2. LIQUID GLASS ================ */}
      <section id="glass" className="lg-bg relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Rv><p className="font-mono2 text-[10px] font-700 tracking-[0.3em] text-violet-300">02 — LIQUID GLASS</p></Rv>
          <Rv delay={60}>
            <h2 className="mt-4 font-display text-4xl font-700 text-white md:text-5xl">
              Light bends <span className="bg-gradient-to-r from-violet-300 to-pink-300 bg-clip-text text-transparent">around every edge.</span>
            </h2>
          </Rv>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {["Design", "Develop", "Deploy"].map((t, i) => (
              <Rv key={t} delay={i * 90}>
                <div className="lg lg-sheen group p-7 transition-transform duration-500 hover:-translate-y-2">
                  <span className="float inline-grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-400 to-pink-400 text-white" style={{ animationDelay: `${i * 1.2}s` }}>
                    <span className="font-display text-xl font-700">0{i + 1}</span>
                  </span>
                  <h3 className="mt-5 font-display text-lg font-700 text-white">{t}</h3>
                  <p className="mt-2 text-[13px] font-600 text-white/50">
                    Frosted translucent surfaces that catch ambient light, with a specular sheen sweep on hover.
                  </p>
                  <div className="mt-5">
                    <button className="lg-btn text-[13px]">Learn more <ArrowRight className="ml-1 inline h-4 w-4" /></button>
                  </div>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ================ 3. NEOMORPHISM ================ */}
      <section id="neo" className="neo-bg relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Rv><p className="font-mono2 text-[10px] font-700 tracking-[0.3em] text-indigo-500">03 — NEOMORPHISM</p></Rv>
          <Rv delay={60}>
            <h2 className="mt-4 font-display text-4xl font-700 text-[#4a5060] md:text-5xl">
              Soft surfaces. <span className="text-indigo-500">Pressed depth.</span>
            </h2>
          </Rv>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
            <Rv>
              <div className="neo-card flex flex-col items-center gap-5 p-8 text-center">
                <div className="neo-circle grid h-20 w-20 place-items-center bg-[#e0e5ec] text-indigo-500">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg font-700 text-[#4a5060]">Feature Card</h3>
                <p className="max-w-[200px] text-[13px] font-600 text-[#7a8090]">Extruded from the same surface — no borders, only light and shadow.</p>
                <button className="neo-btn text-[13px]">Explore</button>
              </div>
            </Rv>
            <Rv delay={90}>
              <div className="neo-card p-8">
                <p className="font-mono2 text-[10px] font-700 tracking-[0.2em] text-indigo-400">PRESSED FIELD</p>
                <div className="neo-card-in mt-4 px-5 py-4 text-[14px] font-600 text-[#7a8090]">
                  placeholder@email.com
                </div>
                <div className="neo-card-in mt-3 px-5 py-4 text-[14px] font-600 text-[#7a8090]">
                  ••••••••••
                </div>
                <button className="neo-btn mt-5 w-full text-center text-[13px]">Sign In</button>
              </div>
            </Rv>
          </div>
        </div>
      </section>

      {/* ================ 4. AURORA DARK ================ */}
      <section id="aurora" className="aurora-bg relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Rv><p className="font-mono2 text-[10px] font-700 tracking-[0.3em] text-violet-400">04 — AURORA DARK</p></Rv>
          <Rv delay={60}>
            <h2 className="mt-4 font-display text-4xl font-700 text-white md:text-5xl">
              Premium SaaS <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent">energy.</span>
            </h2>
          </Rv>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {["Analytics", "Automation", "Security", "Scale", "Support", "API"].map((t, i) => (
              <Rv key={t} delay={i * 60}>
                <div className="aurora-card group p-6">
                  <span className={`inline-grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-white ${
                    ["from-violet-500 to-indigo-500", "from-pink-500 to-rose-500", "from-emerald-500 to-teal-500",
                     "from-amber-500 to-orange-500", "from-sky-500 to-blue-500", "from-fuchsia-500 to-purple-500"][i]
                  }`}>
                    {[Zap, Sparkles, Moon, Layers, MessagesSquare, Terminal][i] &&
                      (() => { const I = [Zap, Sparkles, Moon, Layers, MessagesSquare, Terminal][i]; return <I className="h-5 w-5" />; })()}
                  </span>
                  <h3 className="mt-4 font-display text-[15px] font-700 text-white">{t}</h3>
                  <p className="mt-2 text-[13px] font-600 text-white/40">Gradient mesh ambient with subtle card lift on hover.</p>
                </div>
              </Rv>
            ))}
          </div>
          <Rv delay={200}>
            <div className="mt-10 flex justify-center">
              <button className="aurora-btn text-[14px]">Get Started <ArrowRight className="ml-1 inline h-4 w-4" /></button>
            </div>
          </Rv>
        </div>
      </section>

      {/* ================ 5. BRUTALIST ================ */}
      <section id="brutal" className="brutal-bg relative py-24 md:py-32">
        <div className="brutal-stripe" />
        <div className="mx-auto max-w-5xl px-5 pt-12 md:px-8">
          <Rv><p className="font-mono2 text-[11px] font-900 tracking-[0.2em] text-black">05 — BRUTALIST</p></Rv>
          <Rv delay={60}>
            <h2 className="mt-4 font-display text-5xl font-700 text-black md:text-6xl">
              NO DECORATION.
              <br />
              <span className="text-[#e74c3c]">ONLY IMPACT.</span>
            </h2>
          </Rv>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {["Who we are", "What we build"].map((t, i) => (
              <Rv key={t} delay={i * 90}>
                <div className="brutal-card p-8">
                  <h3 className="font-display text-2xl font-700 text-black">{t}</h3>
                  <p className="mt-3 text-[14px] font-600 leading-relaxed text-[#333]">
                    Raw typography, hard shadows, zero border-radius. The message is the design — nothing hides behind decoration.
                  </p>
                  <button className="brutal-btn mt-6">READ MORE →</button>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ================ 6. RETRO TERMINAL ================ */}
      <section id="term" className="term-bg relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Rv><p className="font-mono2 text-[11px] font-700 tracking-[0.2em] term-glow">06 — RETRO TERMINAL</p></Rv>
          <Rv delay={60}>
            <h2 className="mt-4 font-mono2 text-3xl font-700 term-glow md:text-5xl">
              &gt; EVERY KEYSTROKE_
              <br />
              &gt; <span className="text-green-300">MATTERS.</span><span className="blink">▋</span>
            </h2>
          </Rv>
          <Rv delay={120}>
            <div className="term-card term-scanline relative mt-14 overflow-hidden p-6 font-mono2 text-[12px] leading-relaxed text-green-400/80">
              <p><span className="text-green-300">akshat@studio</span>:<span className="text-blue-400">~</span>$ design --style terminal</p>
              <p className="mt-1 text-green-400/60">[INFO] Loading phosphor display...</p>
              <p className="mt-1 text-green-400/60">[INFO] Scanline overlay: active</p>
              <p className="mt-1 text-green-400/60">[INFO] CRT vignette: enabled</p>
              <p className="mt-1"><span className="text-green-300">akshat@studio</span>:<span className="text-blue-400">~</span>$ echo "Beautiful in its constraint"</p>
              <p className="mt-1 text-green-200">Beautiful in its constraint</p>
              <p className="mt-1"><span className="text-green-300">akshat@studio</span>:<span className="text-blue-400">~</span>$ <span className="blink">▋</span></p>
            </div>
          </Rv>
          <Rv delay={180}>
            <div className="mt-8 flex gap-3">
              <button className="term-btn">./run_project</button>
              <button className="term-btn">cat README.md</button>
            </div>
          </Rv>
        </div>
      </section>

      {/* ================ 7. GRADIENT MESH ================ */}
      <section id="mesh" className="mesh-bg relative py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Rv><p className="font-mono2 text-[10px] font-700 tracking-[0.3em] text-pink-300">07 — GRADIENT MESH</p></Rv>
          <Rv delay={60}>
            <h2 className="mt-4 font-display text-4xl font-700 text-white md:text-5xl">
              Living color <span className="bg-gradient-to-r from-red-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">fields.</span>
            </h2>
          </Rv>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { from: "from-red-500/20", to: "to-amber-500/20", border: "border-red-400/20", title: "Warm" },
              { from: "from-amber-500/20", to: "to-emerald-500/20", border: "border-amber-400/20", title: "Natural" },
              { from: "from-blue-500/20", to: "to-violet-500/20", border: "border-blue-400/20", title: "Cool" },
            ].map((c, i) => (
              <Rv key={c.title} delay={i * 90}>
                <div className={`mesh-card bg-gradient-to-br ${c.from} ${c.to} ${c.border} p-7 transition-transform duration-500 hover:-translate-y-2`}>
                  <h3 className="font-display text-xl font-700 text-white">{c.title} palette</h3>
                  <p className="mt-3 text-[13px] font-600 text-white/50">Vibrant gradient blobs bleeding through frosted glass — organic, alive, always moving.</p>
                  <div className="mt-5 flex gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className="h-6 w-6 rounded-full" style={{ background: `hsl(${i * 80 + n * 30}, 70%, ${50 + n * 5}%)` }} />
                    ))}
                  </div>
                </div>
              </Rv>
            ))}
          </div>
        </div>
      </section>

      {/* ================ FOOTER CTA ================ */}
      <section className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
          <Rv>
            <h2 className="font-display text-4xl font-700 text-white md:text-5xl">
              Liked a style?
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-amber-400 bg-clip-text text-transparent">Let's build it for you.</span>
            </h2>
          </Rv>
          <Rv delay={80}>
            <p className="mx-auto mt-6 max-w-md text-[15px] font-600 text-white/40">
              DM us on Discord with the style name and your project idea.
              We'll have a working prototype within 24 hours.
            </p>
          </Rv>
          <Rv delay={160}>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="https://discord.gg/4jM9mqvtnZ" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 px-7 py-4 text-[15px] font-700 text-white shadow-[0_16px_44px_rgba(139,92,246,0.35)] transition-all hover:shadow-[0_20px_55px_rgba(139,92,246,0.5)] hover:brightness-110">
                <MessagesSquare className="h-5 w-5" /> Contact on Discord
              </a>
            </div>
          </Rv>
          <Rv delay={240}>
            <p className="mt-16 font-mono2 text-[10px] font-700 tracking-[0.2em] text-white/20">
              © 2025 · CRAFTED BY <span className="credit-name">AKSHAT</span> · DIRECTED BY <span className="credit-name">HUZAIFA</span>
            </p>
          </Rv>
        </div>
      </section>
    </div>
  );
}
