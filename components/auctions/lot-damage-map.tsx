"use client";

import { useId, useMemo, useState } from "react";

type ZoneId = "front" | "side" | "rear" | "roof" | "under";

type Zone = {
  id: ZoneId;
  label: string;
  hint: string;
};

const ZONES: Zone[] = [
  { id: "front", label: "Перед", hint: "Морда, капот, радиатор, фары" },
  { id: "side", label: "Бок", hint: "Двери, пороги, крылья" },
  { id: "rear", label: "Зад", hint: "Багажник, фонари, задняя панель" },
  { id: "roof", label: "Крыша", hint: "Крыша, стойки, панорама" },
  { id: "under", label: "Низ", hint: "Днище, подвеска, рама" },
];

function detectZones(damage: string): ZoneId[] {
  const t = damage.toLowerCase();
  const hit = new Set<ZoneId>();

  if (/front|перед|nose|hood|капот|radiator|bumper|бампер|collision/.test(t)) hit.add("front");
  if (/side|бок|door|двер|fender|крыл|left|right|лев|прав/.test(t)) hit.add("side");
  if (/rear|зад|trunk|багаж|tail/.test(t)) hit.add("rear");
  if (/roof|крыш|hail|град|rollover|переворот/.test(t)) hit.add("roof");
  if (/under|низ|flood|вода|water|frame|рам|suspension|подвес/.test(t)) hit.add("under");
  if (/all|total|burn|пожар|полный/.test(t)) {
    hit.add("front");
    hit.add("side");
    hit.add("rear");
    hit.add("roof");
  }

  if (hit.size === 0) hit.add("front");
  return Array.from(hit);
}

type Props = {
  primaryDamage: string;
  secondaryDamage?: string | null;
};

export function LotDamageMap({ primaryDamage, secondaryDamage }: Props) {
  const uid = useId().replace(/:/g, "");
  const active = useMemo(
    () => detectZones([primaryDamage, secondaryDamage].filter(Boolean).join(" ")),
    [primaryDamage, secondaryDamage],
  );
  const [focus, setFocus] = useState<ZoneId | null>(active[0] ?? null);
  const current = ZONES.find((z) => z.id === focus) ?? ZONES[0];

  return (
    <div className="card-premium rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="lux-kicker">Осмотр повреждений</p>
          <h2 className="mt-2 font-display text-lg font-semibold">Карта зон кузова</h2>
          <p className="mt-1 text-sm text-text-secondary">
            Подсветка по описанию лота: {primaryDamage}
            {secondaryDamage ? ` · ${secondaryDamage}` : ""}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[1fr_200px]">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-[linear-gradient(180deg,#f8f8f9_0%,#ececee_55%,#e4e4e7_100%)] p-4 sm:p-6">
          <div
            className="pointer-events-none absolute inset-x-10 bottom-5 h-5 rounded-[100%] bg-black/[0.08] blur-md"
            aria-hidden
          />
          <svg
            viewBox="0 0 560 240"
            className="relative mx-auto h-auto w-full max-w-xl"
            role="img"
            aria-label="Схема седана с зонами повреждений"
          >
            <defs>
              <linearGradient id={`${uid}-paint`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fafafa" />
                <stop offset="28%" stopColor="#e4e4e7" />
                <stop offset="72%" stopColor="#a1a1aa" />
                <stop offset="100%" stopColor="#71717a" />
              </linearGradient>
              <linearGradient id={`${uid}-paint-side`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#d4d4d8" stopOpacity="0.35" />
                <stop offset="45%" stopColor="#fafafa" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#52525b" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0.2" y2="1">
                <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.92" />
                <stop offset="45%" stopColor="#64748b" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.82" />
              </linearGradient>
              <linearGradient id={`${uid}-chrome`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a1a1aa" />
                <stop offset="40%" stopColor="#f4f4f5" />
                <stop offset="100%" stopColor="#71717a" />
              </linearGradient>
              <radialGradient id={`${uid}-rim`} cx="38%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#52525b" />
                <stop offset="55%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#09090b" />
              </radialGradient>
              <linearGradient id={`${uid}-hl`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fefce8" />
                <stop offset="55%" stopColor="#fde68a" />
                <stop offset="100%" stopColor="#d4d4d8" />
              </linearGradient>
              <linearGradient id={`${uid}-tl`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7f1d1d" />
                <stop offset="40%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#450a0a" />
              </linearGradient>
              <filter id={`${uid}-soft`} x="-15%" y="-15%" width="130%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#000" floodOpacity="0.16" />
              </filter>
            </defs>

            <ellipse cx="280" cy="208" rx="210" ry="7" fill="rgba(24,24,27,0.07)" />

            <g filter={`url(#${uid}-soft)`}>
              {/* sedan silhouette — long hood, short deck, tight greenhouse */}
              <path
                d="M72 156
                   C74 142 82 130 98 122
                   L138 108
                   C152 102 164 92 178 78
                   C192 64 214 56 248 54
                   L318 56
                   C348 58 372 66 392 80
                   L418 104
                   C428 114 440 122 452 132
                   C464 142 470 150 468 160
                   C466 170 456 176 440 178
                   L104 178
                   C86 178 72 170 72 156 Z"
                fill={`url(#${uid}-paint)`}
                stroke="#52525b"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />

              {/* side specular */}
              <path
                d="M108 150
                   C140 132 200 124 280 126
                   C360 128 420 140 448 156
                   L448 164
                   C420 150 360 138 280 136
                   C200 134 140 142 112 158 Z"
                fill={`url(#${uid}-paint-side)`}
                opacity="0.55"
              />

              {/* belt line */}
              <path
                d="M140 118 C180 112 240 110 300 112 C350 114 400 122 430 134"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.1"
                strokeLinecap="round"
              />

              {/* rocker */}
              <path
                d="M108 174 H432"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M108 176 H432"
                stroke="rgba(24,24,27,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* windshield */}
              <path
                d="M182 86
                   C198 70 220 62 248 60
                   L292 62
                   L286 112
                   L196 116
                   C188 104 184 96 182 86 Z"
                fill={`url(#${uid}-glass)`}
                stroke="rgba(255,255,255,0.28)"
                strokeWidth="0.7"
              />

              {/* rear window */}
              <path
                d="M300 62
                   L338 64
                   C358 70 372 82 382 96
                   L376 114
                   L294 112
                   Z"
                fill={`url(#${uid}-glass)`}
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="0.7"
              />

              {/* glass reflection */}
              <path
                d="M200 78 L248 68 L252 90 L206 98 Z"
                fill="rgba(255,255,255,0.18)"
              />

              {/* A / B / C pillars */}
              <path
                d="M196 116 L182 86"
                stroke="rgba(39,39,42,0.45)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M286 112 L292 62"
                stroke="rgba(39,39,42,0.4)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M376 114 L382 96"
                stroke="rgba(39,39,42,0.4)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />

              {/* hood crease */}
              <path
                d="M108 124 C128 116 150 110 178 100"
                fill="none"
                stroke="rgba(255,255,255,0.38)"
                strokeWidth="1"
                strokeLinecap="round"
              />
              <path
                d="M112 138 C136 128 158 120 182 114"
                fill="none"
                stroke="rgba(63,63,70,0.2)"
                strokeWidth="1"
                strokeLinecap="round"
              />

              {/* front bumper */}
              <path
                d="M74 156 C70 162 74 172 92 176 L118 176"
                fill="none"
                stroke={`url(#${uid}-chrome)`}
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              {/* grille hint */}
              <path
                d="M82 148 L96 142 L98 156 L84 158 Z"
                fill="#27272a"
                opacity="0.75"
              />

              {/* rear bumper */}
              <path
                d="M430 176 C450 174 466 168 464 158"
                fill="none"
                stroke={`url(#${uid}-chrome)`}
                strokeWidth="2.6"
                strokeLinecap="round"
              />

              {/* headlight — slim LED strip */}
              <path
                d="M96 132
                   C104 126 118 124 128 126
                   L126 138
                   C116 138 104 140 98 144
                   Z"
                fill={`url(#${uid}-hl)`}
                stroke="rgba(250,250,250,0.5)"
                strokeWidth="0.6"
              />

              {/* taillight — slim wrap */}
              <path
                d="M430 128
                   L456 138
                   L454 150
                   L428 142
                   Z"
                fill={`url(#${uid}-tl)`}
                opacity="0.92"
              />

              {/* door shut lines */}
              <path
                d="M248 66 L248 170"
                stroke="rgba(39,39,42,0.22)"
                strokeWidth="1.1"
              />
              <path
                d="M318 64 L318 170"
                stroke="rgba(39,39,42,0.18)"
                strokeWidth="1"
              />
              {/* door handles */}
              <rect x="232" y="132" width="10" height="2.5" rx="1.2" fill="#52525b" opacity="0.7" />
              <rect x="302" y="132" width="10" height="2.5" rx="1.2" fill="#52525b" opacity="0.7" />

              {/* mirror */}
              <path
                d="M190 108 L204 104 L206 112 L194 116 Z"
                fill="#71717a"
                stroke="#3f3f46"
                strokeWidth="0.6"
              />

              <Wheel cx={156} cy={178} rimId={`${uid}-rim`} />
              <Wheel cx={400} cy={178} rimId={`${uid}-rim`} />
            </g>

            <ZoneShape
              id="front"
              d="M72 156 C74 142 82 130 98 122 L138 108 C152 102 164 92 178 86 L196 116 L118 176 L92 176 C74 172 70 162 72 156 Z"
              active={active.includes("front")}
              focused={focus === "front"}
              onFocus={() => setFocus("front")}
            />
            <ZoneShape
              id="side"
              d="M196 116 L286 112 L286 170 L196 172 Z"
              active={active.includes("side")}
              focused={focus === "side"}
              onFocus={() => setFocus("side")}
            />
            <ZoneShape
              id="rear"
              d="M376 114 L418 104 C428 114 440 122 452 132 C464 142 470 150 468 160 C466 170 456 176 440 178 L376 172 Z"
              active={active.includes("rear")}
              focused={focus === "rear"}
              onFocus={() => setFocus("rear")}
            />
            <ZoneShape
              id="roof"
              d="M182 86 C198 70 220 62 248 60 L318 56 C348 58 372 66 382 96 L376 114 L196 116 C188 104 184 96 182 86 Z"
              active={active.includes("roof")}
              focused={focus === "roof"}
              onFocus={() => setFocus("roof")}
            />
            <ZoneShape
              id="under"
              d="M118 168 H432 L432 186 H118 Z"
              active={active.includes("under")}
              focused={focus === "under"}
              onFocus={() => setFocus("under")}
            />
          </svg>
        </div>

        <div className="space-y-2">
          {ZONES.map((zone) => {
            const on = active.includes(zone.id);
            const selected = focus === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setFocus(zone.id)}
                className={`flex w-full items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                  selected
                    ? "border-accent/40 bg-accent/10"
                    : "border-border hover:border-accent/25"
                }`}
              >
                <span
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    on ? "bg-accent shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-zinc-300"
                  }`}
                />
                <span>
                  <span className="font-medium">{zone.label}</span>
                  <span className="mt-0.5 block text-xs text-text-muted">{zone.hint}</span>
                </span>
              </button>
            );
          })}
          <p className="pt-2 text-xs text-text-muted">
            Зона: <span className="font-medium text-text-primary">{current.label}</span> —{" "}
            {current.hint}
          </p>
        </div>
      </div>
    </div>
  );
}

function Wheel({ cx, cy, rimId }: { cx: number; cy: number; rimId: string }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="28" fill="#09090b" />
      <circle cx={cx} cy={cy} r="22" fill={`url(#${rimId})`} stroke="#3f3f46" strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r="18" fill="none" stroke="#52525b" strokeWidth="1" opacity="0.5" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <path
          key={deg}
          d={`M ${cx} ${cy - 6} L ${cx - 2.2} ${cy - 17} L ${cx + 2.2} ${cy - 17} Z`}
          fill="#a1a1aa"
          opacity="0.55"
          transform={`rotate(${deg} ${cx} ${cy})`}
        />
      ))}
      <circle cx={cx} cy={cy} r="5.5" fill="#18181b" stroke="#71717a" strokeWidth="1" />
      <circle cx={cx} cy={cy} r="2" fill="#52525b" />
    </g>
  );
}

function ZoneShape({
  id,
  d,
  active,
  focused,
  onFocus,
}: {
  id: ZoneId;
  d: string;
  active: boolean;
  focused: boolean;
  onFocus: () => void;
}) {
  return (
    <path
      d={d}
      role="button"
      tabIndex={0}
      aria-label={id}
      onClick={onFocus}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFocus();
        }
      }}
      className="cursor-pointer outline-none transition-[fill,stroke,opacity] duration-300"
      fill={
        active
          ? focused
            ? "rgba(34,197,94,0.42)"
            : "rgba(34,197,94,0.2)"
          : focused
            ? "rgba(113,113,122,0.18)"
            : "rgba(113,113,122,0.04)"
      }
      stroke={focused ? "rgba(22,163,74,0.95)" : active ? "rgba(34,197,94,0.35)" : "transparent"}
      strokeWidth={focused ? 2.2 : 1}
    />
  );
}
