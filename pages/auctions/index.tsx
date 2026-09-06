"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";

/** Аукционы = доноры для машинокомплектов — единый раздел. */
export default function AuctionsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/mashinokomplekt/#lots");
  }, [router]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center pt-16 text-sm text-muted-foreground">
      Переход к машинокомплектам и лотам…
    </div>
  );
}
