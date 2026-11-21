import Link from "next/link";

/** The CuteLoader mark: a soft squircle holding a smiling face inside a spinner arc. */
export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" className={`cl-logo ${className}`}>
      <defs>
        <linearGradient id="cl-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8b6cff" />
          <stop offset="1" stopColor="#ff6fb1" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="10" fill="url(#cl-logo-grad)" />
      <g className="cl-logo-arc" style={{ transformOrigin: "16px 16px" }}>
        <path d="M16 6.5a9.5 9.5 0 1 1-9.1 6.8" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <circle cx="12.6" cy="15" r="1.5" fill="#fff" />
      <circle cx="19.4" cy="15" r="1.5" fill="#fff" />
      <path d="M13.2 18.6q2.8 2.4 5.6 0" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-2.5 rounded-xl" aria-label="CuteLoader home">
      <LogoMark />
      <span className="text-[17px] font-extrabold tracking-tight">
        Cute<span className="bg-gradient-to-r from-brand to-pink bg-clip-text text-transparent">Loader</span>
      </span>
      <style>{`.group:hover .cl-logo-arc{animation:cl-logo-spin 1.1s cubic-bezier(.6,.1,.3,.9)}@keyframes cl-logo-spin{to{transform:rotate(360deg)}}@media (prefers-reduced-motion:reduce){.group:hover .cl-logo-arc{animation:none}}`}</style>
    </Link>
  );
}
