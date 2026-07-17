import katex from 'katex'

/** Render one TeX fragment to HTML. Never throws: falls back to the raw source. */
export function renderMath(tex: string, displayMode = false): string {
  try {
    return katex.renderToString(tex, { displayMode, throwOnError: false, strict: false })
  } catch {
    return tex
  }
}

/**
 * Generated chapter HTML (src/content/chapters.ts) marks inline math as
 * `<span class="math">$...$</span>`. Replace each with rendered KaTeX.
 */
export function mathifyHtml(html: string): string {
  return html.replace(/<span class="math">(.*?)<\/span>/gs, (_m, tex: string) =>
    renderMath(tex.replace(/^\$+|\$+$/g, '').trim()),
  )
}

/**
 * Exhibit tables / chain cards mix plain prose with raw TeX tokens
 * (`\lambda`, `\times`, `$...$`, `\mathrm{...}`). Render $...$ spans first,
 * then any remaining standalone \-commands, so cells read as typeset math.
 */
const TEX_COMMAND = /(\\[a-zA-Z]+(?:\s*[_^]\s*\{[^{}]*\}|\s*[_^]\s*[a-zA-Z0-9])*(?:\{[^{}]*\})*)/g

export function mathifyText(s: string): string {
  const withDollars = s.replace(/\$([^$]+)\$/g, (_m, tex: string) => renderMath(tex))
  return withDollars.replace(TEX_COMMAND, (m) => renderMath(m))
}
