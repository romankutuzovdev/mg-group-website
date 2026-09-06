"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_FX,
  fetchFxRateGbpUsd,
  type FxRateInfo,
} from "@/lib/pricing/fx-rate";

export { DEFAULT_FX };

/** Курс с дефолтом сразу — расчёт UK не ждёт fetch */
export function useFxRate(): FxRateInfo {
  const [info, setInfo] = useState<FxRateInfo>(DEFAULT_FX);

  useEffect(() => {
    let cancelled = false;
    fetchFxRateGbpUsd()
      .then((data) => {
        if (!cancelled && data.rate > 0) setInfo(data);
      })
      .catch(() => {
        /* остаётся DEFAULT_FX */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return info;
}

export function parseBidInput(text: string): number {
  const normalized = text.replace(/\s/g, "").replace(",", ".");
  if (!normalized || normalized === ".") return 0;
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : 0;
}
