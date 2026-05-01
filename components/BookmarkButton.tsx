"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "devverse-bookmarks";

export default function BookmarkButton({ slug }: { slug: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const bookmarks: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]"
      );
      setSaved(bookmarks.includes(slug));
    } catch {
      // localStorage unavailable (private browsing, SSR guard)
    }
  }, [slug]);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const bookmarks: string[] = JSON.parse(
        localStorage.getItem(STORAGE_KEY) ?? "[]"
      );
      const next = saved
        ? bookmarks.filter((s) => s !== slug)
        : [...bookmarks, slug];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSaved(!saved);
    } catch {
      // localStorage unavailable
    }
  };

  return (
    <button
      onClick={toggle}
      className={cn("bookmark-btn", saved && "bookmark-btn--saved")}
      aria-label={saved ? "Remove bookmark" : "Save event"}
    >
      <Bookmark
        size={14}
        strokeWidth={2}
        fill={saved ? "currentColor" : "none"}
      />
    </button>
  );
}
