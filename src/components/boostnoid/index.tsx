"use client";

import dynamic from "next/dynamic";

export const Boostnoid = dynamic(
  () => import("./component").then((mod) => mod.Boostnoid),
  {
    ssr: false,
    loading: () => (
      <div className="h-150 w-200 ring-1 ring-border" aria-hidden />
    ),
  }
);
