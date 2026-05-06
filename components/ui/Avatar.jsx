"use client";

import { clsx } from "clsx";

export default function Avatar({ src, name, size = "md" }) {
  const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-10 h-10 text-sm",
    lg: "w-16 h-16 text-xl",
  };

  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={clsx("rounded-full object-cover border border-zinc-800", sizeClasses[size])}
      />
    );
  }

  return (
    <div className={clsx(
      "rounded-full flex items-center justify-center bg-zinc-800 text-zinc-400 font-semibold border border-zinc-700",
      sizeClasses[size]
    )}>
      {initials || "?"}
    </div>
  );
}
