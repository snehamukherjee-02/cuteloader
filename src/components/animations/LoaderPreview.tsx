import type { AnimationSource } from "@/types/animation";
import { buildCss, buildSvg, defaultConfig } from "@/lib/engine";

/**
 * Static, server-rendered loader preview with the default configuration.
 * The CSS is hoisted and de-duplicated by React (href + precedence), so a loader
 * shown several times on one page ships its styles once. The markup comes from
 * our own registry (trusted), never from user input.
 */
export function LoaderPreview({
  def,
  size = 96,
  label,
  className = "",
}: {
  def: AnimationSource;
  size?: number;
  label?: string;
  className?: string;
}) {
  const cfg = defaultConfig(def);
  const css = buildCss(def, cfg);
  const svg = buildSvg(def, { ...cfg, size }, { label });
  return (
    <span data-cl-preview="" className={`inline-grid place-items-center ${className}`}>
      <style href={`cl-${def.slug}`} precedence="cl">
        {css}
      </style>
      <span className="contents" dangerouslySetInnerHTML={{ __html: svg }} />
    </span>
  );
}
