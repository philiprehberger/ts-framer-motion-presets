# @philiprehberger/framer-motion-presets

[![CI](https://github.com/philiprehberger/ts-framer-motion-presets/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-framer-motion-presets/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/framer-motion-presets.svg)](https://www.npmjs.com/package/@philiprehberger/framer-motion-presets)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-framer-motion-presets)](https://github.com/philiprehberger/ts-framer-motion-presets/commits/main)

![@philiprehberger/framer-motion-presets](https://raw.githubusercontent.com/philiprehberger/ts-framer-motion-presets/main/package-card.webp)

Reusable Framer Motion animation presets, variants, and transitions

## Installation

```bash
npm install @philiprehberger/framer-motion-presets framer-motion
```

## Usage

```ts
import { fadeInUp, staggerContainer, staggerItem, transitions } from '@philiprehberger/framer-motion-presets';
import { motion } from 'framer-motion';

function AnimatedList({ items }) {
  return (
    <motion.ul variants={staggerContainer} initial="initial" animate="animate">
      {items.map((item) => (
        <motion.li key={item.id} variants={staggerItem}>
          {item.name}
        </motion.li>
      ))}
    </motion.ul>
  );
}
```

### Reduced Motion

Use `prefersReducedMotion()` to check if the user has enabled "prefers-reduced-motion" in their OS settings:

```ts
import { prefersReducedMotion, fadeInUp } from '@philiprehberger/framer-motion-presets';

<motion.div variants={prefersReducedMotion() ? {} : fadeInUp} />
```

Or wrap any variant with `withReducedMotion()` — it collapses to an instant, transform-free transition when reduced motion is preferred, and returns the variant unchanged otherwise:

```ts
import { withReducedMotion, fadeInUp } from '@philiprehberger/framer-motion-presets';

<motion.div variants={withReducedMotion(fadeInUp)} initial="initial" animate="animate" />
```

### Custom Stagger

Build a stagger container with your own timing via `createStagger()`:

```ts
import { createStagger, staggerItem } from '@philiprehberger/framer-motion-presets';
import { motion } from 'framer-motion';

const container = createStagger({ staggerChildren: 0.15, delayChildren: 0.2, direction: -1 });

<motion.ul variants={container} initial="initial" animate="animate">
  {items.map((item) => (
    <motion.li key={item.id} variants={staggerItem}>{item.name}</motion.li>
  ))}
</motion.ul>
```

## API

### Transitions & Easing

| Export | Description |
|--------|-------------|
| `easing` | Easing curves: `easeIn`, `easeOut`, `easeInOut`, `bounce` |
| `transitions` | Named transitions: `fast`, `base`, `slow`, `bounce`, `spring`, `springBounce` |
| `getTransitionDuration(duration)` | Duration, shortened to near-zero under reduced motion |
| `prefersReducedMotion()` | `true` if the OS "prefers-reduced-motion" setting is on |
| `withReducedMotion(variants)` | Guard a variants object behind the reduced-motion preference |

### Fade / Scale / Slide Variants

All have `initial`, `animate`, and optionally `exit` states:

| Export | Animation |
|--------|-----------|
| `fadeIn` | Opacity 0 → 1 |
| `fadeInUp` / `fadeInDown` / `fadeInLeft` / `fadeInRight` | Fade + directional slide |
| `scaleIn` / `scaleInBounce` | Scale from 0 with optional bounce |
| `slideInUp` / `slideInDown` / `slideInLeft` / `slideInRight` | Slide from edge |
| `pageTransition` / `pageFade` | Full-page transitions |

### Stagger

| Export | Description |
|--------|-------------|
| `staggerContainer` | Parent with `staggerChildren` in `animate.transition` |
| `staggerItem` | Child variant for stagger lists |
| `createStagger(options)` | Factory for a stagger container with custom `staggerChildren` / `delayChildren` / `direction` |
| `gridStagger` / `gridItem` | Grid-aware stagger |
| `waveStagger` / `waveItem` | Wave pattern stagger |

### Component Variants

| Export | Description |
|--------|-------------|
| `modalVariants` / `backdropVariants` | Modal open/close with backdrop |
| `toastVariants` | Toast slide-in and exit |
| `dropdownVariants` | Dropdown expand/collapse |

### Interactions

| Export | Description |
|--------|-------------|
| `hoverScale` / `tapScale` / `hoverLift` | Hover and tap micro-interactions |
| `dragConstraints` / `swipeVariants` / `magnetic` | Drag and gesture presets |

### Advanced

| Export | Description |
|--------|-------------|
| `blurIn` / `rotateIn` | Blur and rotate entrance variants |
| `flipX` / `flipY` | Single-axis 3D flip variants |
| `createParallax(speed, direction)` | Parallax scroll transform factory |
| `flip3D` / `cube3D` / `tilt3D` | 3D transform variants |
| `springBounce` / `springElastic` / `springWobble` | Spring physics presets |
| `createScrollReveal(direction, distance)` | Scroll-triggered reveal factory |
| `morphVariants` | Shape morphing variant |
| `textReveal` | Text reveal animation |
| `createCounterAnimation(from, to, duration)` | Animated number counter transition factory |
| `pulse` / `shimmer` / `skeleton` | Loading state animations |

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-framer-motion-presets)

🐛 [Report issues](https://github.com/philiprehberger/ts-framer-motion-presets/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-framer-motion-presets/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
