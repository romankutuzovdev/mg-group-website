import generated from "@/lib/auctions/generated-lots.json";
import type { AuctionLot } from "@/lib/auctions/types";
import { isRealLotPhotoUrl, resolveLotImageUrl } from "@/lib/auctions/lot-image-url";

type GeneratedPayload = {
  lots?: AuctionLot[];
};

/** Only lots with a real photo (Bid.cars CDN or local /auctions/lots/). */
function withRealPhoto(lot: AuctionLot): boolean {
  return isRealLotPhotoUrl(lot.imageUrl);
}

function loadGeneratedCatalog(): AuctionLot[] {
  const raw = generated as GeneratedPayload;
  const lots = Array.isArray(raw.lots) ? raw.lots : [];
  return lots
    .filter(withRealPhoto)
    .map((lot) => ({
      ...lot,
      imageUrl: resolveLotImageUrl(lot.imageUrl, lot.make),
    }));
}

const GENERATED_LOTS = loadGeneratedCatalog();

/** Drop undefined fields so Next.js getStaticProps can serialize props. */
export function serializeLot<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Catalog from imported auction export only — no mock/Unsplash lots. */
export function getCatalogLots(): AuctionLot[] {
  return serializeLot(GENERATED_LOTS);
}

const LIVE_WINDOW_MS = 12 * 60 * 60 * 1000;

function pickLiveLots(lots: AuctionLot[], limit: number): AuctionLot[] {
  const now = Date.now();
  const ranked = [...lots].sort((a, b) => {
    const ta = new Date(a.auctionDate).getTime();
    const tb = new Date(b.auctionDate).getTime();
    const aLive = Number.isFinite(ta) && ta >= now - LIVE_WINDOW_MS;
    const bLive = Number.isFinite(tb) && tb >= now - LIVE_WINDOW_MS;
    if (aLive !== bLive) return aLive ? -1 : 1;
    return Math.abs(ta - now) - Math.abs(tb - now);
  });
  return ranked.slice(0, limit);
}

export function getFeaturedLiveLots(limit = 4): AuctionLot[] {
  return pickLiveLots(getCatalogLots(), limit);
}

export function getLotBySlug(slug: string): AuctionLot | undefined {
  const fromGenerated = GENERATED_LOTS.find((l) => l.slug === slug);
  if (!fromGenerated) return undefined;
  return serializeLot({
    ...fromGenerated,
    imageUrl: resolveLotImageUrl(fromGenerated.imageUrl, fromGenerated.make),
  });
}

export function getAllSlugs(): string[] {
  return getCatalogLots().map((l) => l.slug);
}

export function hasGeneratedCatalog(): boolean {
  return GENERATED_LOTS.length > 0;
}
