"use client";

import { useId, useState } from "react";
import { isHexColor } from "@/lib/engine";

export function ControlGroup({ title, children, aside }: { title: string; children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border px-4 py-4 first:border-t-0 sm:px-5">
      <div className="mb-3 flex items-center justify-between">
        <legend className="text-xs font-bold uppercase tracking-[0.12em] text-subtle">{title}</legend>
        {aside}
      </div>
      <div className="space-y-3.5">{children}</div>
    </fieldset>
  );
}

export function ColorField({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  const id = useId();
  const [text, setText] = useState(value);
  // Keep the text box in sync when the color changes elsewhere (picker, undo, shuffle).
  const [synced, setSynced] = useState(value);
  if (synced !== value) {
    setSynced(value);
    setText(value);
  }
  // Native color inputs only accept #rrggbb.
  const six = value.length === 4 ? "#" + value.slice(1).split("").map((c) => c + c).join("") : value.slice(0, 7);
  return (
    <div className={`flex items-center gap-3 ${disabled ? "opacity-50" : ""}`}>
      <input
        id={id}
        type="color"
        className="cl-color shrink-0"
        value={six}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-label={`${label} color picker`}
      />
      <label htmlFor={`${id}-hex`} className="min-w-0 flex-1 truncate text-sm font-medium">
        {label}
      </label>
      <input
        id={`${id}-hex`}
        value={text}
        disabled={disabled}
        spellCheck={false}
        maxLength={9}
        onChange={(e) => {
          const v = e.target.value.trim();
          setText(v);
          const norm = v.startsWith("#") ? v : `#${v}`;
          if (isHexColor(norm)) onChange(norm.toLowerCase());
        }}
        onBlur={() => setText(value)}
        className="h-9 w-[5.6rem] rounded-lg border border-border bg-surface-2 px-2 text-center font-mono text-[13px] uppercase outline-none focus:border-brand"
        aria-label={`${label} hex value`}
      />
    </div>
  );
}

export function SliderField({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  unit,
  numeric = true,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format?: (v: number) => string;
  unit?: string;
  numeric?: boolean;
}) {
  const id = useId();
  const fill = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {numeric ? (
          <span className="flex items-center gap-1">
            <input
              type="number"
              value={value}
              min={min}
              max={max}
              step={step}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (Number.isFinite(v)) onChange(Math.min(max, Math.max(min, v)));
              }}
              className="h-8 w-[4.4rem] rounded-lg border border-border bg-surface-2 px-2 text-right font-mono text-[13px] outline-none focus:border-brand"
              aria-label={`${label} value`}
            />
            {unit && <span className="text-xs text-subtle">{unit}</span>}
          </span>
        ) : (
          <span className="font-mono text-[13px] text-muted">{format ? format(value) : value}</span>
        )}
      </div>
      <input
        id={id}
        type="range"
        className="cl-range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
        aria-valuetext={format ? format(value) : `${value}${unit ?? ""}`}
      />
    </div>
  );
}

export function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium">
          {label}
        </label>
        {description && <p className="text-xs text-subtle">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${checked ? "bg-brand" : "bg-surface-3"}`}
      >
        <span
          aria-hidden="true"
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
  size = "md",
}: {
  label: string;
  value: T;
  options: { value: T; label: string; icon?: React.ReactNode }[];
  onChange: (v: T) => void;
  size?: "sm" | "md";
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-xl border border-border bg-surface-2 p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          title={o.label}
          className={`inline-flex items-center gap-1.5 rounded-[0.6rem] font-semibold transition ${
            size === "sm" ? "h-7 px-2 text-xs" : "h-8 px-3 text-[13px]"
          } ${value === o.value ? "bg-surface text-text shadow-soft" : "text-muted hover:text-text"}`}
        >
          {o.icon}
          <span className={o.icon ? "sr-only sm:not-sr-only" : ""}>{o.label}</span>
        </button>
      ))}
    </div>
  );
}

export function IconButton({
  label,
  onClick,
  disabled,
  children,
  active,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={`grid h-9 w-9 place-items-center rounded-xl border transition disabled:cursor-not-allowed disabled:opacity-40 ${
        active ? "border-brand bg-brand-soft text-brand-strong" : "border-border bg-surface text-muted hover:bg-surface-2 hover:text-text"
      }`}
    >
      {children}
    </button>
  );
}
