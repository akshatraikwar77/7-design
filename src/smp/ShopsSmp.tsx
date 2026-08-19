import { useState, type CSSProperties } from "react";
import { Crown, KeyRound, Gem, Coins, Sparkles, Check, ArrowRight, X } from "lucide-react";
import Reveal from "../components/Reveal";
import { RANKS, KEYS, SHARDS, SHARD_SPENDS, RARITY, openSmpOrder } from "./data";

type ShopId = "ranks" | "keys" | "shards";
const META: Record<ShopId, { title: string; icon: typeof Crown; color: string; desc: string }> = {
  ranks: { title: "Rank Shop", icon: Crown, color: "var(--zap)", desc: "Lifetime ranks — pay once, flex forever." },
  keys: { title: "Key Shop", icon: KeyRound, color: "var(--volt)", desc: "Crate keys with printed drop rates." },
  shards: { title: "Shards Shop", icon: Gem, color: "var(--shock)", desc: "Premium currency for cosmetics & upgrades." },
};

function ShopOverlay({ shop, onClose }: { shop: ShopId; onClose: () => void }) {
  const m = META[shop];
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-3 md:items-center md:p-6">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
      <div className="sheet-up relative my-auto w-full max-w-4xl rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_50px_120px_rgba(0,0,0,0.6)] md:p-9">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-[var(--zap)] to-[var(--volt)] text-[var(--bg)]">
              <m.icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-xl font-700 text-white md:text-2xl">{m.title}</h3>
              <p className="text-sm font-600 text-[var(--text2)]">{m.desc}</p>
            </div>
          </div>
          <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text2)] hover:bg-white/5" aria-label="Close"><X className="h-5 w-5" /></button>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shop === "ranks" && RANKS.map((r, i) => (
            <div key={r.id} className="cascade z-card flex flex-col p-5" style={{ ["--cd" as string]: `${i * 80}ms` } as CSSProperties}>
              <span className="z-tag w-fit" style={{ color: r.color, background: `${r.color}15`, border: `1px solid ${r.color}30` }}>TIER 0{i + 1}</span>
              <h4 className="mt-3 font-display text-lg font-700 text-white">{r.name}</h4>
              <p className="mt-1 text-xs italic text-[var(--text2)]">{r.tagline}</p>
              <p className="mt-3 font-display text-2xl font-700 text-white">₹{r.price} <span className="text-sm font-600 text-[var(--text2)]">lifetime</span></p>
              <ul className="mt-4 flex-1 space-y-2 border-t border-[var(--border)] pt-4">
                {r.perks.slice(0, 4).map((p) => (<li key={p} className="flex items-start gap-2 text-[12px] font-600 leading-snug text-[var(--text2)]"><Check className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: r.color }} /> {p}</li>))}
              </ul>
              <button onClick={() => { onClose(); openSmpOrder(r.id); }} className="z-btn mt-4 justify-center !py-2.5 text-[12px]">Buy {r.name}</button>
            </div>
          ))}
          {shop === "keys" && KEYS.map((k, i) => (
            <div key={k.id} className="cascade z-card flex flex-col p-5" style={{ ["--cd" as string]: `${i * 80}ms` } as CSSProperties}>
              <div className="flex items-center justify-between"><KeyRound className="h-5 w-5" style={{ color: k.color }} /><span className="font-display text-lg font-700" style={{ color: k.color }}>₹{k.price}</span></div>
              <h4 className="mt-3 font-display text-base font-700 text-white">{k.name}</h4>
              <p className="mt-1 text-[11px] font-600 text-[var(--text2)]">{k.desc}</p>
              <div className="mt-3 flex-1 space-y-1.5 border-t border-[var(--border)] pt-3">
                {k.loot.slice(0, 4).map((l) => (
                  <div key={l.item} className="flex items-center justify-between text-[10.5px]">
                    <span className="flex min-w-0 items-center gap-1.5 font-600 text-[var(--text2)]"><span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: RARITY[l.rarity].color }} /><span className="truncate">{l.item}</span></span>
                    <span className="font-mono2 text-[9px] font-700" style={{ color: RARITY[l.rarity].color }}>{l.chance}%</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { onClose(); openSmpOrder(`key:${k.id}`); }} className="z-btn mt-4 justify-center !py-2.5 text-[12px]">Buy Key</button>
            </div>
          ))}
          {shop === "shards" && SHARDS.map((s, i) => (
            <div key={s.id} className="cascade z-card flex flex-col p-5" style={{ ["--cd" as string]: `${i * 80}ms` } as CSSProperties}>
              <div className="flex items-center justify-between"><Gem className="h-5 w-5" style={{ color: s.color }} />{s.tag && <span className="z-tag text-[8px]" style={{ color: s.color, background: `${s.color}15`, border: `1px solid ${s.color}30` }}>{s.tag}</span>}</div>
              <h4 className="mt-3 font-display text-base font-700 text-white">{s.name}</h4>
              <p className="mt-2 font-display text-3xl font-700 text-white">{s.amount.toLocaleString("en-IN")}<span className="ml-1 text-sm font-600 text-[var(--text2)]">shards</span></p>
              {s.bonus > 0 && <p className="mt-1 flex items-center gap-1.5 font-mono2 text-[10px] font-700" style={{ color: s.color }}><Sparkles className="h-3 w-3" /> +{s.bonus} bonus</p>}
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="font-display text-lg font-700 text-white">₹{s.price}</span>
                <button onClick={() => { onClose(); openSmpOrder(`shard:${s.id}`); }} className="z-btn !px-4 !py-2 text-[12px]">Buy</button>
              </div>
            </div>
          ))}
        </div>

        {shop === "shards" && (
          <div className="cascade z-card mt-6 p-5" style={{ ["--cd" as string]: "380ms" } as CSSProperties}>
            <p className="flex items-center gap-2 text-sm font-700 text-[var(--text2)]"><Coins className="h-4 w-4 text-[var(--shock)]" /> Spend shards on</p>
            <div className="mt-3 flex flex-wrap gap-2">{SHARD_SPENDS.map((s) => (<span key={s.label} className="z-pill text-[11px]"><Sparkles className="h-3 w-3 text-[var(--volt)]" /> {s.label} · {s.cost}</span>))}</div>
          </div>
        )}
        <p className="mt-6 text-center font-mono2 text-[10px] font-700 tracking-[0.2em] text-[var(--text2)]">CODE <span className="text-[var(--zap)]">ZAPFIRST</span> = 15% OFF · UPI · GPAY · PAYTM · PHONEPE · CRYPTO</p>
      </div>
    </div>
  );
}

export default function ShopsSmp() {
  const [open, setOpen] = useState<ShopId | null>(null);
  return (
    <section id="shop" className="relative mx-auto max-w-6xl px-5 pb-28 md:px-8">
      <div className="sep" />
      <div className="pt-24 md:pt-32">
        <Reveal>
          <div className="text-center">
            <span className="z-pill text-[var(--zap)]"><Crown className="h-3 w-3" fill="currentColor" /> THE STORE</span>
            <h2 className="mt-5 font-display text-3xl font-700 tracking-tight text-white md:text-5xl">Power up your <span className="zap-grad">journey</span></h2>
            <p className="mx-auto mt-3 max-w-md text-sm font-600 text-[var(--text2)]">Ranks, crate keys and shards — all delivered in-game within minutes.</p>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {(Object.keys(META) as ShopId[]).map((id, i) => {
            const m = META[id];
            return (
              <Reveal key={id} delay={i * 100}>
                <button onClick={() => setOpen(id)} className="z-glow group flex w-full flex-col items-center gap-5 p-8 text-center transition-transform duration-400 hover:-translate-y-2">
                  <span className="z-icon-glow float grid h-16 w-16 place-items-center rounded-3xl bg-gradient-to-br from-[var(--zap)] to-[var(--volt)] text-[var(--bg)]" style={{ animationDelay: `${i * 1.2}s` }}>
                    <m.icon className="h-7 w-7" />
                  </span>
                  <span className="font-display text-xl font-700 text-white">{m.title}</span>
                  <span className="text-sm font-600 text-[var(--text2)]">{m.desc}</span>
                  <span className="z-btn-ghost !py-2.5 text-[13px]">Open shop <ArrowRight className="h-4 w-4" /></span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
      {open && <ShopOverlay shop={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
