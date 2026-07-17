import katex from 'katex'

/** Decode the HTML entities that appear inside TeX fragments. */
const decodeTexEntities = (tex: string) =>
  tex.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&')

/** Render one TeX fragment to HTML. Never throws: falls back to the raw source. */
export function renderMath(tex: string, displayMode = false): string {
  try {
    return katex.renderToString(decodeTexEntities(tex), {
      displayMode,
      throwOnError: false,
      strict: false,
    })
  } catch {
    return tex
  }
}

/**
 * The generated content over-marks math: currency spans like `$46M … $415M`
 * and prose with citation tags were wrapped as math. Only typeset a fragment
 * when it is plausibly TeX; everything else is prose.
 */
export function looksLikeMath(tex: string): boolean {
  const t = tex.trim()
  if (!t) return false
  if (t.includes('<')) return false // swallowed markup — never math
  // Explicit TeX markers: commands, sub/superscripts, braces
  if (/\\[a-zA-Z]+/.test(t) || /[_^]\{?/.test(t) || /\{[^{}]+\}/.test(t)) return true
  // Prose signals: consecutive words, currency, years, arrows/pipes/dashes-as-text
  if (/[A-Za-z]{2,}\s+[A-Za-z]{2,}/.test(t)) return false
  if (/\$\d|\d\s?(?:B|M|K)\b|\(\d{4}\)/.test(t)) return false
  if (/[→|—–]/.test(t)) return false
  // Short spaceless expressions ($U$, $J$, $U=0$, $c/ab$) are math; longer
  // marker-less strings are prose.
  return !/\s/.test(t) && t.length <= 12
}

/**
 * Generated chapter HTML (src/content/chapters.ts) marks inline math as
 * `<span class="math">$...$</span>` — but the markup is deeply unreliable:
 * opening tags are displaced past the closing `$`, spans cross paragraphs
 * and swallow citation tags, and currency is wrapped as math. The `$…$`
 * delimiters themselves are consistent, and every <span> in the corpus is a
 * math span, so: strip the span tags entirely and typeset genuine $…$ pairs.
 * A final pass catches raw TeX commands in data-table cells (\lambda, \times).
 */
const TEX_COMMAND = /(\\[a-zA-Z]+(?:\s*[_^]\s*\{[^{}]*\}|\s*[_^]\s*[a-zA-Z0-9])*(?:\{[^{}]*\})*)/g

const INLINE_TAGS = /<\/?(?:em|strong|i|b)>/g

/**
 * Typeset $...$ pairs with a greedy-but-verified scan: each opener pairs with
 * its NEAREST closing $; if the content isn't plausible TeX the opener is a
 * literal (currency) dollar and scanning resumes after it. This survives the
 * corpus's long-distance false pairings ("$3.5 billion … MtCO$_2$/yr") and
 * emphasis tags splitting a pair ("H$<em>3$S and LaH$</em>{10}$").
 */
function typesetDollars(s: string): string {
  let out = ''
  let i = 0
  while (i < s.length) {
    const open = s.indexOf('$', i)
    if (open === -1) {
      out += s.slice(i)
      break
    }
    const close = s.indexOf('$', open + 1)
    if (close === -1) {
      out += s.slice(open)
      break
    }
    out += s.slice(i, open)
    const rawInner = s.slice(open + 1, close)
    const inner = rawInner.replace(INLINE_TAGS, '')
    if (rawInner.length <= 80 && !inner.includes('<') && looksLikeMath(inner)) {
      out += renderMath(inner.trim())
      i = close + 1
    } else {
      out += '$'
      i = open + 1
    }
  }
  return out
}

export function mathifyHtml(html: string): string {
  const stripped = html.replace(/<span class="math">/g, '').replace(/<\/span>/g, '')
  return typesetDollars(stripped).replace(TEX_COMMAND, (m) => renderMath(m))
}

/**
 * Exhibit tables / chain cards mix plain prose with raw TeX tokens
 * (`\lambda`, `\times`, `$...$`, `\mathrm{...}`). Render $...$ spans first,
 * then any remaining standalone \-commands, so cells read as typeset math.
 * `\$` is an escaped literal dollar sign, never a math delimiter.
 */
const ESCAPED_DOLLAR = ' DOLLAR '

export function mathifyText(s: string): string {
  const protected_ = s.replace(/\\\$/g, ESCAPED_DOLLAR)
  const withDollars = protected_.replace(/\$([^$]+)\$/g, (m, tex: string) =>
    looksLikeMath(tex) ? renderMath(tex) : m,
  )
  const withCommands = withDollars.replace(TEX_COMMAND, (m) => renderMath(m))
  return withCommands.replaceAll(ESCAPED_DOLLAR, '$')
}
