import { Transition, Variants } from 'framer-motion';

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get transition duration based on user preference
 */
export const getTransitionDuration = (duration: number): number => {
  return prefersReducedMotion() ? 0.01 : duration;
};

/**
 * Collapse a variants object to an instant, transform-free transition when the
 * user prefers reduced motion. When reduced motion is off, the variants are
 * returned unchanged.
 *
 * @param variants - The variants to guard behind the reduced-motion preference
 */
export const withReducedMotion = (variants: Variants): Variants => {
  if (!prefersReducedMotion()) return variants;

  const reduced: Variants = {};
  for (const [state, value] of Object.entries(variants)) {
    const opacity =
      typeof value === 'object' && value !== null && 'opacity' in value
        ? ((value as { opacity?: number }).opacity ?? 1)
        : 1;
    reduced[state] = { opacity, transition: { duration: 0 } };
  }
  return reduced;
};

// =============================================================================
// EASING FUNCTIONS
// =============================================================================

export const easing = {
  easeIn: [0.4, 0, 1, 1],
  easeOut: [0, 0, 0.2, 1],
  easeInOut: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// =============================================================================
// TRANSITION PRESETS
// =============================================================================

export const transitions = {
  fast: {
    duration: 0.15,
    ease: easing.easeInOut,
  },
  base: {
    duration: 0.2,
    ease: easing.easeInOut,
  },
  slow: {
    duration: 0.3,
    ease: easing.easeInOut,
  },
  bounce: {
    duration: 0.4,
    ease: easing.bounce,
  },
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
  },
  springBounce: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 20,
  },
} satisfies Record<string, Transition>;

// =============================================================================
// FADE ANIMATIONS
// =============================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// =============================================================================
// SCALE ANIMATIONS
// =============================================================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

export const scaleInBounce: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: transitions.springBounce,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: transitions.fast,
  },
};

// =============================================================================
// SLIDE ANIMATIONS
// =============================================================================

export const slideInUp: Variants = {
  initial: { y: '100%' },
  animate: { y: 0 },
  exit: { y: '100%' },
};

export const slideInDown: Variants = {
  initial: { y: '-100%' },
  animate: { y: 0 },
  exit: { y: '-100%' },
};

export const slideInLeft: Variants = {
  initial: { x: '-100%' },
  animate: { x: 0 },
  exit: { x: '-100%' },
};

export const slideInRight: Variants = {
  initial: { x: '100%' },
  animate: { x: 0 },
  exit: { x: '100%' },
};

// =============================================================================
// PAGE TRANSITION ANIMATIONS
// =============================================================================

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getTransitionDuration(0.3),
      ease: easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: getTransitionDuration(0.2),
      ease: easing.easeIn,
    },
  },
};

export const pageFade: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: getTransitionDuration(0.2),
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: getTransitionDuration(0.15),
    },
  },
};

// =============================================================================
// STAGGER ANIMATIONS
// =============================================================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: getTransitionDuration(0.3),
    },
  },
};

/**
 * Build a stagger container with custom timing.
 *
 * @param options.staggerChildren - Delay between each child (default `0.1`)
 * @param options.delayChildren - Delay before the first child starts (default `0`)
 * @param options.direction - Order children animate in: `1` forward, `-1` reverse (default `1`)
 */
export const createStagger = (
  options: {
    staggerChildren?: number;
    delayChildren?: number;
    direction?: 1 | -1;
  } = {},
): Variants => {
  const { staggerChildren = 0.1, delayChildren = 0, direction = 1 } = options;
  return {
    initial: {},
    animate: {
      transition: {
        staggerChildren,
        delayChildren,
        staggerDirection: direction,
      },
    },
  };
};

// =============================================================================
// HOVER/TAP ANIMATIONS
// =============================================================================

export const hoverScale = {
  scale: 1.05,
  transition: transitions.fast,
};

export const tapScale = {
  scale: 0.95,
  transition: transitions.fast,
};

export const hoverLift = {
  y: -4,
  transition: transitions.base,
};

// =============================================================================
// COMPONENT-SPECIFIC ANIMATIONS
// =============================================================================

export const modalVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: getTransitionDuration(0.2),
      ease: easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: getTransitionDuration(0.15),
      ease: easing.easeIn,
    },
  },
};

export const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: getTransitionDuration(0.2),
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: getTransitionDuration(0.15),
    },
  },
};

export const toastVariants: Variants = {
  initial: { opacity: 0, y: -50, scale: 0.8 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: getTransitionDuration(0.2),
      ease: easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    x: 300,
    transition: {
      duration: getTransitionDuration(0.15),
      ease: easing.easeIn,
    },
  },
};

export const dropdownVariants: Variants = {
  initial: { opacity: 0, scale: 0.95, y: -10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: getTransitionDuration(0.15),
      ease: easing.easeOut,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -10,
    transition: {
      duration: getTransitionDuration(0.1),
      ease: easing.easeIn,
    },
  },
};
