import { useEffect, useLayoutEffect, useRef, useState } from 'react'

const REDUCE = '(prefers-reduced-motion: reduce)'

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia?.(REDUCE).matches
}

/** True when the visitor asked the system for less motion. Follows changes live. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(prefersReducedMotion)
  useEffect(() => {
    const mq = window.matchMedia(REDUCE)
    const on = () => setReduce(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

/**
 * Adds `.in` to every `[data-reveal]` inside `root` once it scrolls into view (see index.css).
 * One observer for the page; each element is let go after it arrives, so it never animates twice.
 */
export function useReveal(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const els = root.querySelectorAll('[data-reveal]')
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootRef])
}

/** True while (or, with `once`, after) the element is on screen. */
export function useInView(ref, { once = false, threshold = 0.25, rootMargin = '0px' } = {}) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, once, threshold, rootMargin])
  return inView
}

/** Calls `fn` every `ms` while `active`. The latest `fn` is always the one called. */
export function useInterval(fn, ms, active = true) {
  const saved = useRef(fn)
  useEffect(() => {
    saved.current = fn
  })
  useEffect(() => {
    if (!active || ms == null) return
    const id = setInterval(() => saved.current(), ms)
    return () => clearInterval(id)
  }, [ms, active])
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)

/** Counts from 0 to `to` once `start` turns true. Reduced motion shows the number at once. */
export function useCountUp(to, { start = true, duration = 900 } = {}) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    if (prefersReducedMotion()) {
      setValue(to)
      return
    }
    let raf
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      setValue(to * easeOutCubic(p))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [to, start, duration])
  return value
}

/**
 * FLIP for lists: children with `data-key` that move between renders glide to their new place
 * (transform only, never top or height). Keys that are new fade and drop in from above.
 * Pass the list itself as `dep` so the hook runs after each change.
 */
export function useFlip(containerRef, dep) {
  const last = useRef(new Map())
  useLayoutEffect(() => {
    const box = containerRef.current
    if (!box) return
    const reduce = prefersReducedMotion()
    const next = new Map()
    box.querySelectorAll('[data-key]').forEach((el) => {
      const key = el.dataset.key
      const top = el.offsetTop
      next.set(key, top)
      if (reduce) return
      const before = last.current.get(key)
      if (before == null) {
        if (last.current.size) {
          el.animate(
            [
              { opacity: 0, transform: 'translateY(-10px)', filter: 'blur(3px)' },
              { opacity: 1, transform: 'none', filter: 'none' },
            ],
            { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          )
        }
      } else if (before !== top) {
        el.animate([{ transform: `translateY(${before - top}px)` }, { transform: 'none' }], {
          duration: 520,
          easing: getComputedStyle(document.documentElement).getPropertyValue('--spring-soft') || 'ease-out',
        })
      }
    })
    last.current = next
  }, [containerRef, dep])
}
