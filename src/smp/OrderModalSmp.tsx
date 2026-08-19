import { useEffect, useMemo, useState } from "react";
import { Loader2, CheckCircle2, AlertTriangle, Crown, KeyRound, Gem, ArrowRight, X, Mail, Hash, User, Tag, MessagesSquare } from "lucide-react";
import { RANKS, KEYS, SHARDS, WEBHOOK_URL, DISCORD_URL, BRAND } from "./data";

type Status = "idle" | "sending" | "sent" | "error";
type BuyType = "rank" | "key" | "shard";

function parseDetail(d: string): { type: BuyType; id: string } {
  if (d.startsWith("key:")) return { type: "key", id: d.slice(4) };
  if (d.startsWith("shard:")) return { type: "shard", id: d.slice(6) };
  return { type: "rank", id: d };
}

export default function OrderModalSmp() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<BuyType>("rank");
  const [rankId, setRankId] = useState("surge");
  const [keyId, setKeyId] = useState("rare");
  const [shardId, setShardId] = useState("shard-m");
  const [mcName, setMcName] = useState("");
  const [discordId, setDiscordId] = useState("");
  const [email, setEmail] = useState("");
  const [coupon, setCoupon] = useState("");
  const [couponOk, setCouponOk] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const handler = (e: Event) => {
      const d = parseDetail((e as CustomEvent<string>).detail || "surge");
      setType(d.type);
      if (d.type === "key") setKeyId(d.id); else if (d.type === "shard") setShardId(d.id); else setRankId(d.id);
      setStatus("idle"); setErrMsg(""); setOpen(true); document.body.style.overflow = "hidden";
    };
    window.addEventListener("flux-smp-order", handler);
    return () => window.removeEventListener("flux-smp-order", handler);
  }, []);

  const item = useMemo(() => {
    if (type === "rank") { const r = RANKS.find((x) => x.id === rankId)!; return { name: `${r.name} Rank`, price: r.price, color: r.color, icon: Crown }; }
    if (type === "key") { const k = KEYS.find((x) => x.id === keyId)!; return { name: k.name, price: k.price, color: k.color, icon: KeyRound }; }
    const s = SHARDS.find((x) => x.id === shardId)!;
    return { name: `${s.amount.toLocaleString("en-IN")} Shards`, price: s.price, color: s.color, icon: Gem };
  }, [type, rankId, keyId, shardId]);

  const finalPrice = couponOk ? Math.round(item.price * 0.85) : item.price;
  const close = () => { setOpen(false); document.body.style.overflow = ""; };

  const submit = async () => {
    if (!mcName.trim() || !discordId.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setErrMsg("Fill your Minecraft name, Discord ID and a valid email."); setStatus("error"); return;
    }
    setStatus("sending"); setErrMsg("");
    try {
      const titles: Record<BuyType, string> = { rank: "👑 Rank Order", key: "🔑 Key Order", shard: "💎 Shards Order" };
      const body = {
        username: `${BRAND} · Orders`,
        embeds: [{
          title: titles[type], description: `**${item.name}**`, color: parseInt(item.color.slice(1), 16),
          fields: [
            { name: "💰 Price", value: couponOk ? `₹${item.price} → **₹${finalPrice}** (ZAPFIRST −15%)` : `₹${item.price}`, inline: true },
            { name: "🏷️ Type", value: type.toUpperCase(), inline: true },
            { name: "🎮 MC Name", value: mcName.trim(), inline: true },
            { name: "💬 Discord", value: discordId.trim(), inline: true },
            { name: "📧 Email", value: email.trim(), inline: true },
            { name: "🎟️ Coupon", value: couponOk ? "ZAPFIRST" : coupon.trim() || "—", inline: true },
          ],
          footer: { text: `${BRAND} · play.zapmc.fun` }, timestamp: new Date().toISOString(),
        }],
      };
      const res = await fetch(WEBHOOK_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error(`${res.status}`);
      setStatus("sent");
    } catch (err) {
      setStatus("error"); setErrMsg(`Webhook error (${err instanceof Error ? err.message : "network"}). DM us on Discord.`);
    }
  };

  if (!open) return null;

  const TYPES: Array<{ id: BuyType; label: string; icon: typeof Crown }> = [
    { id: "rank", label: "Rank", icon: Crown }, { id: "key", label: "Key", icon: KeyRound }, { id: "shard", label: "Shards", icon: Gem },
  ];

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={close} />
      <div className="pop-in relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[0_50px_120px_rgba(0,0,0,0.6)] md:p-8">
        {status === "sent" ? (
          <div className="flex flex-col items-center py-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[var(--zap)] to-[var(--volt)] text-[var(--bg)]">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="mt-5 font-display text-xl font-700 text-white">Order received! ⚡</h3>
            <p className="mt-3 max-w-xs text-sm font-600 leading-relaxed text-[var(--text2)]">
              We'll DM <b className="text-white">{discordId}</b> with payment steps. Your <b style={{ color: item.color }}>{item.name}</b> arrives within minutes.
            </p>
            <div className="mt-6 flex gap-3">
              <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="z-btn !py-3 text-[13px]"><MessagesSquare className="h-4 w-4" /> Discord</a>
              <button onClick={close} className="z-btn-ghost !py-3 text-[13px]">Done</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-700 text-white">Checkout</h3>
              <button onClick={close} className="grid h-9 w-9 place-items-center rounded-xl border border-[var(--border)] text-[var(--text2)] hover:bg-white/5" aria-label="Close"><X className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface2)] p-4">
              <span className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-[var(--zap)] to-[var(--volt)] text-[var(--bg)]"><item.icon className="h-5 w-5" /></span>
                <span className="font-display text-sm font-700 text-white">{item.name}</span>
              </span>
              <span className="flex items-center gap-1.5"><ArrowRight className="h-4 w-4 text-[var(--text2)]" /><span className="font-display text-xl font-700 text-white">₹{finalPrice}</span></span>
            </div>
            {couponOk && <p className="mt-2 text-center font-mono2 text-[10px] font-700 text-[var(--zap)]">ZAPFIRST applied — 15% off ✓</p>}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {TYPES.map((t) => (
                <button key={t.id} onClick={() => setType(t.id)}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 font-mono2 text-[10px] font-700 tracking-[0.15em] transition-all ${
                    type === t.id ? "bg-gradient-to-r from-[var(--zap)] to-[var(--volt)] text-[var(--bg)]" : "border border-[var(--border)] text-[var(--text2)] hover:bg-white/5"
                  }`}><t.icon className="h-3.5 w-3.5" /> {t.label}</button>
              ))}
            </div>
            <select value={type === "rank" ? rankId : type === "key" ? keyId : shardId}
              onChange={(e) => (type === "rank" ? setRankId(e.target.value) : type === "key" ? setKeyId(e.target.value) : setShardId(e.target.value))}
              className="z-field mt-3 appearance-none !pl-4">
              {type === "rank" && RANKS.map((r) => <option key={r.id} value={r.id}>{r.name} — ₹{r.price}</option>)}
              {type === "key" && KEYS.map((k) => <option key={k.id} value={k.id}>{k.name} — ₹{k.price}</option>)}
              {type === "shard" && SHARDS.map((s) => <option key={s.id} value={s.id}>{s.amount.toLocaleString("en-IN")} Shards — ₹{s.price}</option>)}
            </select>
            <div className="mt-3 space-y-2.5">
              {[
                { icon: User, val: mcName, set: setMcName, ph: "Minecraft username" },
                { icon: Hash, val: discordId, set: setDiscordId, ph: "Discord ID" },
                { icon: Mail, val: email, set: setEmail, ph: "Email address" },
              ].map((f) => (
                <div key={f.ph} className="relative"><f.icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text2)]" /><input value={f.val} onChange={(e) => f.set(e.target.value)} placeholder={f.ph} className="z-field" /></div>
              ))}
              <div className="flex gap-2">
                <div className="relative flex-1"><Tag className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text2)]" /><input value={coupon} onChange={(e) => { setCoupon(e.target.value); setCouponOk(false); }} placeholder='Coupon "ZAPFIRST"' className="z-field" /></div>
                <button onClick={() => setCouponOk(coupon.trim().toUpperCase() === "ZAPFIRST")} className="z-btn-ghost !px-5 text-[13px] text-[var(--zap)]">Apply</button>
              </div>
            </div>
            {status === "error" && errMsg && (<div className="mt-3 flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-700 text-red-300"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> {errMsg}</div>)}
            <button onClick={submit} disabled={status === "sending"} className="z-btn mt-5 w-full justify-center text-[14px] disabled:opacity-60">
              {status === "sending" ? (<><Loader2 className="h-5 w-5 animate-spin" /> Sending…</>) : (<>Place order — ₹{finalPrice}</>)}
            </button>
            <p className="mt-3 text-center font-mono2 text-[9px] font-700 tracking-[0.2em] text-[var(--text2)]">UPI · GPAY · PAYTM · PHONEPE · CRYPTO</p>
          </>
        )}
      </div>
    </div>
  );
}
