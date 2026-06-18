# AURORA OS — a cinematic frontend showcase

> *“The operating system for the next dimension.”*

A fictional premium spatial-computing product, built for one reason: to
demonstrate the most impressive frontend motion experience possible. There is
no business logic, no funnel, no SEO play. **Motion is the protagonist.**

Inspired by the craft of Apple Vision Pro, Stripe Sessions, Linear, Framer,
Vercel, Arc and Nothing.

---

## Stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS** with a custom cinematic dark theme
- **Framer Motion** — the entire animation system
- **shadcn/ui** conventions (Radix Slot + `cva` + `cn`)
- **Higgsfield** — every render in `/public/visuals` was generated for this page
- Authored with the `ui-ux-pro-max` design-intelligence skill

## The eight movements

| # | Section | What it shows |
|---|---------|---------------|
| 1 | **Cinematic Hero** | Layered entrance — scale, blur, parallax, masked text rise, scroll-driven recede |
| 2 | **Scroll Storytelling** | Pinned section; the device rotates/zooms/translates in faux-3D as chapters crossfade |
| 3 | **3D Product Reveal** | Pointer-tracked perspective tilt, levitation, layered light & shadow, moving sheen |
| 4 | **Scroll Transformation** | One object morphs through four stages, fully driven by scroll position |
| 5 | **Floating Ecosystem** | Multiple objects at independent depths, speeds and motion patterns |
| 6 | **Motion Showcase** | A live catalogue of **24** interruptible animation primitives |
| 7 | **Higgsfield Visuals** | Generated hero renders, product mockups and abstract objects |
| 8 | **Finale** | Scroll-scaled wordmark, expanding light core, maximal wow |

## The motion library

Reusable, typed primitives live in `src/components/motion/primitives.tsx`:
`Reveal`, `Stagger`, `TextReveal`, `Magnetic`, `Tilt`, `Float`, `Parallax`,
`Spotlight` — plus 24 standalone demos in the Motion Showcase covering reveal,
stagger, rotate, scale, morph, parallax, scroll-linked draw, magnetic hover,
spotlight, perspective flip, floating, particles, text reveal, card stacking,
depth, path draw, count-up, gradient shift, blur-in, spring drag, marquee,
ripple, waveform and glitch.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Notes on craft

- Fully responsive; respects `prefers-reduced-motion`.
- Animations favour `transform`/`opacity` for GPU-friendly performance.
- Dark-mode-first with an aurora gradient signature (cyan → violet → magenta).
- A custom cursor halo activates only on fine-pointer, motion-OK devices.
