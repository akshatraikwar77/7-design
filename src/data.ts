export const WEBHOOK_URL =
  "https://discord.com/api/webhooks/1538170952884686909/oMIlmqcvLWdJlGpNwC5km6dhIGrfEWt_vRGaAvanyFeDprTfunWVaET82shSTyyscfA7";

export const SERVER_IP = "play.zapmc.fun";
export const DISCORD_URL = "https://discord.gg/4jM9mqvtnZ";
export const BRAND = "ZapMC";

/* ---------- rarity ---------- */
export type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary" | "mythic";
export const RARITY: Record<Rarity, { label: string; color: string }> = {
  common: { label: "COMMON", color: "#9ca3af" },
  uncommon: { label: "UNCOMMON", color: "#4ade80" },
  rare: { label: "RARE", color: "#38bdf8" },
  epic: { label: "EPIC", color: "#a855f7" },
  legendary: { label: "LEGENDARY", color: "#ffe03a" },
  mythic: { label: "MYTHIC", color: "#ff6b6b" },
};

/* ---------- ranks ---------- */
export type Rank = { id: string; name: string; price: number; color: string; tagline: string; perks: string[] };
export const RANKS: Rank[] = [
  { id: "spark", name: "SPARK", price: 79, color: "#4ade80", tagline: "A jolt of power", perks: ["/fly in lobby", "Colored chat + [SPARK] prefix", "2 home warps", "1 Vote Key monthly", "Kit Spark weekly"] },
  { id: "surge", name: "SURGE", price: 199, color: "#38bdf8", tagline: "The current grows", perks: ["Everything in SPARK", "/fly everywhere survival", "5 home warps", "3 Rare Keys monthly", "Kit Surge weekly + pet slot"] },
  { id: "storm", name: "STORM", price: 449, color: "#a855f7", tagline: "Unleash the storm", perks: ["Everything in SURGE", "Custom enchant access", "Private vault ×3", "6 Rare Keys monthly", "1 Epic Key monthly"] },
  { id: "thunder", name: "THUNDER", price: 899, color: "#ffe03a", tagline: "The apex predator", perks: ["Everything in STORM", "Custom /command + join full server", "2 Legendary Keys monthly", "Beta worlds first access", "Name in spawn hall of fame"] },
];

/* ---------- keys ---------- */
export type Loot = { item: string; rarity: Rarity; chance: number };
export type CrateKey = { id: string; name: string; price: number; color: string; desc: string; loot: Loot[] };
export const KEYS: CrateKey[] = [
  { id: "vote", name: "VOTE KEY", price: 19, color: "#9ca3af", desc: "The starter roll — earned by voting or grabbed cheap.", loot: [
    { item: "Bread ×64", rarity: "common", chance: 40 }, { item: "Iron ×32", rarity: "common", chance: 22 }, { item: "Emeralds ×16", rarity: "uncommon", chance: 20 },
    { item: "Diamond ×4", rarity: "rare", chance: 12 }, { item: "Sharp III Book", rarity: "epic", chance: 5 }, { item: "Netherite Ingot", rarity: "legendary", chance: 1 },
  ]},
  { id: "rare", name: "RARE KEY", price: 49, color: "#38bdf8", desc: "Armor, spawners & pets — mid-game booster.", loot: [
    { item: "Diamond Armor Piece", rarity: "rare", chance: 34 }, { item: "Zombie Spawner", rarity: "rare", chance: 22 }, { item: "Pet Egg", rarity: "uncommon", chance: 20 },
    { item: "Prot IV Book", rarity: "epic", chance: 15 }, { item: "Elytra", rarity: "legendary", chance: 7 }, { item: "Beacon", rarity: "legendary", chance: 2 },
  ]},
  { id: "epic", name: "EPIC KEY", price: 99, color: "#a855f7", desc: "End-game enchants & cosmetics.", loot: [
    { item: "Mending Book", rarity: "epic", chance: 30 }, { item: "Full Prot IV Set", rarity: "epic", chance: 25 }, { item: "Flame Trail", rarity: "rare", chance: 18 },
    { item: "Netherite Sword Sharp V", rarity: "legendary", chance: 17 }, { item: "Shulker of Diamonds", rarity: "legendary", chance: 8 }, { item: "Mythic Title", rarity: "mythic", chance: 2 },
  ]},
  { id: "legendary", name: "LEGENDARY KEY", price: 199, color: "#ffe03a", desc: "The top shelf — mythic gear & server titles.", loot: [
    { item: "Full Netherite Max", rarity: "legendary", chance: 38 }, { item: "Beacon ×2", rarity: "legendary", chance: 24 }, { item: "Dragon Pet", rarity: "mythic", chance: 16 },
    { item: "Custom Zapblade", rarity: "mythic", chance: 12 }, { item: "Title: ZAP GOD + 1M coins", rarity: "mythic", chance: 7 }, { item: "Spawn Plot 100×100", rarity: "legendary", chance: 3 },
  ]},
];

/* ---------- shards ---------- */
export type ShardPack = { id: string; name: string; amount: number; bonus: number; price: number; color: string; tag?: string };
export const SHARDS: ShardPack[] = [
  { id: "shard-s", name: "SHARD POUCH", amount: 500, bonus: 0, price: 49, color: "#38bdf8" },
  { id: "shard-m", name: "SHARD CACHE", amount: 1200, bonus: 200, price: 99, color: "#4ade80", tag: "+200 BONUS" },
  { id: "shard-l", name: "SHARD VAULT", amount: 2600, bonus: 600, price: 199, color: "#a855f7", tag: "+600 BONUS" },
  { id: "shard-xl", name: "SHARD TREASURY", amount: 7000, bonus: 2000, price: 499, color: "#ffe03a", tag: "BEST VALUE" },
];

export const SHARD_SPENDS = [
  { label: "Cosmetic Trails", cost: "400" }, { label: "Pet Eggs", cost: "800" }, { label: "Crate Keys", cost: "250+" },
  { label: "Custom Titles", cost: "1,500" }, { label: "Rank Upgrades", cost: "5,000+" }, { label: "Spawn Plots", cost: "3,000" },
];

/* ---------- features ---------- */
export const FEATURES = [
  { icon: "coins", title: "PLAYER ECONOMY", desc: "Earn coins from jobs, auctions & the spawn market. Your grind has real value.", color: "#ffe03a" },
  { icon: "shield", title: "LAND CLAIMS", desc: "Grief-proof your base with one command. What's yours stays yours.", color: "#4ade80" },
  { icon: "sparkles", title: "CUSTOM ENCHANTS", desc: "30+ unique enchants — teleporting bows, lifesteal and more.", color: "#a855f7" },
  { icon: "calendar", title: "WEEKLY EVENTS", desc: "Build battles, drop parties, boss raids & PvP tournaments every week.", color: "#38bdf8" },
  { icon: "users", title: "MCMMO LEVELS", desc: "Level up mining, farming & combat for passive perks.", color: "#4ade80" },
  { icon: "skull", title: "SEASON BOSSES", desc: "Server-wide boss fights with leaderboard rewards and mythic drops.", color: "#ff6b6b" },
];

/* ---------- events ---------- */
export const EVENTS = [
  { who: "LightningLuke", what: "opened a LEGENDARY KEY → Elytra", color: "#ffe03a" },
  { who: "Priya", what: "slayed the Ender Dragon (#23)", color: "#a855f7" },
  { who: "Rohan", what: "claimed 2,000 blocks in the mesa", color: "#4ade80" },
  { who: "Arjun", what: "won the Saturday Build Battle", color: "#38bdf8" },
  { who: "Sana", what: "traded 64 emeralds at spawn market", color: "#4ade80" },
  { who: "Kavya", what: "opened an EPIC KEY → Mending Book", color: "#a855f7" },
  { who: "Dev", what: "hit rank #1 on the playtime leaderboard", color: "#ffe03a" },
];

export function openSmpOrder(itemId?: string) {
  window.dispatchEvent(new CustomEvent("flux-smp-order", { detail: itemId ?? "surge" }));
}
