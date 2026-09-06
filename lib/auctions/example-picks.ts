import type { AuctionLot } from "@/lib/auctions/types";
import { getCatalogLots } from "@/lib/auctions/repository";
import { estimateLotTurnkey } from "@/lib/auctions/lot-quote";

const PRIORITY_MAKES = [
  "Bmw",
  "Audi",
  "Mercedes Benz",
  "Volkswagen",
  "Toyota",
  "Ford",
  "Porsche",
  "Nissan",
  "Hyundai",
  "Kia",
  "Peugeot",
  "Vauxhall",
  "Seat",
  "Renault",
];

export function hashSeed(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Разнообразные лоты из каталога США/UK (по одной марке), стабильный порядок. */
export function pickDiverseAuctionLots(limit = 9): AuctionLot[] {
  const lots = getCatalogLots().filter(
    (l) => (l.region === "usa" || l.region === "uk") && l.imageUrl && l.currentBid > 0,
  );
  if (!lots.length) return [];

  const ranked = [...lots].sort((a, b) => (b.currentBid || 0) - (a.currentBid || 0));
  const byMake = new Map<string, AuctionLot>();

  for (const make of PRIORITY_MAKES) {
    const hit = ranked.find((l) => l.make.toLowerCase() === make.toLowerCase());
    if (hit) byMake.set(hit.make.toLowerCase(), hit);
  }
  for (const lot of ranked) {
    if (byMake.size >= limit) break;
    const key = lot.make.toLowerCase();
    if (!byMake.has(key)) byMake.set(key, lot);
  }

  const picked = Array.from(byMake.values()).slice(0, limit);
  picked.sort((a, b) => hashSeed(a.id) - hashSeed(b.id));
  return picked;
}

export function safeTurnkey(lot: AuctionLot) {
  try {
    return estimateLotTurnkey(lot);
  } catch {
    return null;
  }
}
