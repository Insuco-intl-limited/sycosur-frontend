"use client";
import React from "react";
import Link from "next/link";

export interface ActionItem {
  url?: string; // Lien absolu ou relatif
  label?: string; // Texte du bouton
  icon?: React.ReactNode; // Élément React pour l’icône
  title?: string; // Titre/tooltip pour l’accessibilité
  className?: string; // Classes additionnelles
  onClick?: () => void; // Gestionnaire local si pas d’URL
  disabled?: boolean; // État désactivé
}

interface ActionButtonsProps {
  actions: ActionItem[];
  className?: string;
  size?: "sm" | "md";
}

export function ActionButtons({ actions, className = "", size = "md" }: ActionButtonsProps) {
  const base = size === "sm" ? "h-8 px-2 text-xs" : "h-9 px-3 text-sm";
  const btnBase = `inline-flex items-center justify-center gap-1 rounded-md border transition-colors ${base}`;
  const defaultBtn = `border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100`;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {actions.map((a, idx) => {
        const title = a.title ?? a.label;
        const finalCls = `${btnBase} ${defaultBtn} ${a.className ?? ""} ${a.disabled ? "opacity-60 pointer-events-none" : ""}`;
        const content = (
          <>
            {a.icon ? <span className="shrink-0">{a.icon}</span> : null}
            <span className="truncate">{a.label}</span>
          </>
        );

        return a.url ? (
          <Link
            key={`${a.label}-${idx}`}
            href={a.url}
            title={title}
            aria-label={title}
            className={finalCls}
          >
            {content}
          </Link>
        ) : (
          <button
            key={`${a.label}-${idx}`}
            type="button"
            onClick={a.onClick}
            title={title}
            aria-label={title}
            className={finalCls}
            disabled={a.disabled}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
