export type AuctionRegion = "usa" | "uk";

export type AuctionSource = "copart" | "iaai" | "copart_uk";

export type TitleType = "clean" | "salvage" | "rebuilt" | "parts_only";

export type AuctionLot = {
  id: string;
  slug: string;
  region: AuctionRegion;
  source: AuctionSource;
  lotNumber: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  titleType: TitleType;
  titleLabel: string;
  primaryDamage: string;
  secondaryDamage?: string;
  odometer: number;
  odometerUnit: "mi" | "km";
  currentBid: number;
  buyNowPrice?: number;
  currency: "USD" | "GBP";
  location: string;
  auctionDate: string;
  imageUrl: string;
  transmission: string;
  fuel: string;
  drive: string;
  exteriorColor: string;
  hasKeys: boolean;
  runsDrives: boolean;
  estimatedRetail?: number;
  /** e.g. "3.0L V6 Twin Turbo" */
  engine?: string;
  bodyStyle?: string;
  /** Copart UK category: A, B, S, N */
  category?: string;
  vatOnSale?: boolean;
  /** USA inland miles to port (Bid.cars) */
  inlandMiles?: number;
  weightKg?: number;
  /** External auction / aggregator URL */
  lotUrl?: string;
  imageUrls?: string[];
};

export type CatalogQuickTab = "all" | "passable" | "open" | "buy-now";

export type CatalogFilters = {
  q?: string;
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  auctions: AuctionSource[];
  priceMin?: number;
  priceMax?: number;
  /** Body style substring match */
  body?: string;
  /** Primary damage substring match */
  damage?: string;
  drive?: string;
  trans?: string;
  fuel?: string;
  /** Max odometer in miles */
  mileageMax?: number;
  /** Engine volume liters */
  engMin?: number;
  engMax?: number;
  run: boolean;
  buynow: boolean;
  arch: boolean;
  tab: CatalogQuickTab;
};

export const FUEL_OPTIONS = ["Gasoline", "Diesel", "Hybrid", "Electric", "Gas"] as const;
export const TRANS_OPTIONS = ["Automatic", "Manual", "CVT"] as const;
export const DRIVE_OPTIONS = ["FWD", "RWD", "AWD", "4x4"] as const;
export const MILEAGE_PRESETS = [
  { label: "До 50 000 mi", value: 50_000 },
  { label: "До 100 000 mi", value: 100_000 },
  { label: "До 150 000 mi", value: 150_000 },
  { label: "До 200 000 mi", value: 200_000 },
] as const;

export const SOURCE_LABELS: Record<AuctionSource, string> = {
  copart: "Copart",
  iaai: "IAAI",
  copart_uk: "Copart UK",
};

export const REGION_LABELS: Record<AuctionRegion, string> = {
  usa: "США",
  uk: "Англия",
};

export const TITLE_LABELS: Record<TitleType, string> = {
  clean: "Clean Title",
  salvage: "Salvage",
  rebuilt: "Rebuilt",
  parts_only: "Parts Only",
};

export const DAMAGE_OPTIONS = [
  "All Over",
  "Front End",
  "Rear End",
  "Side",
  "Minor Dent/Scratches",
  "Hail",
  "Flood",
  "Burn",
  "Mechanical",
  "Normal Wear",
] as const;

export const MAKE_OPTIONS = [
  "Acura",
  "Audi",
  "BMW",
  "Chevrolet",
  "Ford",
  "Honda",
  "Hyundai",
  "Jeep",
  "Kia",
  "Land Rover",
  "Lexus",
  "Mercedes-Benz",
  "Nissan",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Vauxhall",
] as const;
