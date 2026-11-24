import { useEffect, useRef, useState } from 'react'
import { useInView } from '../../lib/motion'

/* Loads posted by pick-up state, as on the demo's Dashboard (Redwood Freight LLC's sample day).
 * The shapes (us-atlas, Albers USA, 1010 x 610) load only when the map is about to show. */
export const LOADS = {
  TX: 181, OH: 86, NC: 69, SC: 69, FL: 63, PA: 63, CA: 58, MO: 55, IL: 49, KY: 49,
  GA: 46, AZ: 46, TN: 45, NJ: 43, IN: 37, OK: 32, AL: 29, MI: 26, NY: 23, VA: 23,
  LA: 21, WI: 18, WA: 17, UT: 17, MN: 16, AR: 15, MS: 14, MA: 14, OR: 14, CO: 13,
  ID: 12, KS: 12, IA: 11, NV: 9, NM: 9, MT: 9, WV: 8, NE: 6, SD: 6, MD: 3, CT: 3,
  ND: 3, WY: 2, ME: 2, NH: 1, DE: 1, RI: 1, VT: 0, AK: 0, HI: 0, DC: 0,
}
const MAX = 181
const CALLOUT = { MA: [942, 150], NJ: [942, 228], MD: [942, 280] }
const NO_LABEL = new Set(['VT', 'NH', 'RI', 'CT', 'DE', 'DC', 'HI', 'AK'])

const fill = (n) => (n ? `color-mix(in srgb, var(--brand) ${Math.round(10 + Math.sqrt(n / MAX) * 82)}%, var(--sheet))` : 'var(--sunk2)')

export function StateMap() {
  const box = useRef(null)
  const near = useInView(box, { once: true, rootMargin: '600px 0px' })
  const shown = useInView(box, { once: true, threshold: 0.3 })
  const [geo, setGeo] = useState(null)

  useEffect(() => {
    if (!near || geo) return
    import('../../data/usStates.json').then((m) => setGeo(m.default))
  }, [near, geo])

  /* States fill in by size of market, biggest first, 8 ms apart. */
  const rank = Object.fromEntries(
    Object.entries(LOADS)
      .sort((a, b) => b[1] - a[1])
      .map(([a], i) => [a, i])
  )

  return (
    <div ref={box} className="relative aspect-[1010/610] w-full">
      {geo && (
        <svg viewBox="0 0 1010 610" className="h-full w-full" role="img" aria-label="Map of the United States shaded by loads posted in each state. Texas leads with 181, then Ohio 86, North Carolina and South Carolina 69 each.">
          <g>
            {geo.map((g) => (
              <path
                key={g.a}
                d={g.d}
                stroke="var(--sheet)"
                strokeWidth="1.2"
                style={{
                  fill: shown ? fill(LOADS[g.a] ?? 0) : 'var(--sunk2)',
                  transition: `fill 420ms var(--e-out) ${(rank[g.a] ?? 50) * 8}ms`,
                }}
              />
            ))}
          </g>
          <g
            className="tnum"
            fontSize="15"
            fontWeight="700"
            textAnchor="middle"
            style={{ opacity: shown ? 1 : 0, transition: 'opacity 360ms var(--e-out) 500ms' }}
          >
            {geo.map((g) => {
              const n = LOADS[g.a] ?? 0
              if (NO_LABEL.has(g.a) || !n) return null
              const strong = Math.sqrt(n / MAX) > 0.55
              if (CALLOUT[g.a]) {
                const [x, y] = CALLOUT[g.a]
                return (
                  <g key={g.a}>
                    <line x1={g.c[0]} y1={g.c[1]} x2={x - 26} y2={y} stroke="var(--ink4)" strokeWidth="1" />
                    <text x={x} y={y + 5} fill="var(--ink)" fontSize="13">
                      <tspan fontWeight="500" fill="var(--ink3)">{g.a} </tspan>
                      {n}
                    </text>
                  </g>
                )
              }
              return (
                <text key={g.a} x={g.c[0]} y={g.c[1] + 5} fill={strong ? '#FFFFFF' : 'var(--ink)'}>
                  {n}
                </text>
              )
            })}
          </g>
        </svg>
      )}
    </div>
  )
}
