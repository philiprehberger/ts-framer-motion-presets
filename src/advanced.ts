import { Variants, Transition } from 'framer-motion';
import { easing, transitions } from './transitions';

// =============================================================================
// PARALLAX ANIMATIONS
// =============================================================================

/**
 * Create a parallax scroll effect
 *
 * @param speed - Speed multiplier (1 = normal, 0.5 = slower, 2 = faster)
 * @param direction - Direction of parallax ('up' | 'down' | 'left' | 'right')
 */
export function createParallax(speed: number = 0.5, direction: 'up' | 'down' | 'left' | 'right' = 'up') {
  const transform = {
    up: (progress: number) => `translateY(${progress * speed * -100}px)`,
    down: (progress: number) => `translateY(${progress * speed * 100}px)`,
    left: (progress: number) => `translateX(${progress * speed * -100}px)`,
    right: (progress: number) => `translateX(${progress * speed * 100}px)`,
  };

  return transform[direction];
}

/**
 * Parallax variants for different layers
 */
export const parallaxVariants = {
  background: {
    initial: { y: -50, opacity: 0 },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, delay: custom * 0.1 },
    }),
  },
  foreground: {
    initial: { y: 50, opacity: 0 },
    animate: (custom: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, delay: custom * 0.1 },
    }),
  },
};

// =============================================================================
// ADVANCED STAGGER PATTERNS
// =============================================================================

export const gridStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const gridItem: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easing.easeOut,
    },
  },
};

export const waveStagger: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      staggerDirection: 1,
    },
  },
};

export const waveItem: Variants = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 30,
    },
  },
};

export function createSpiralStagger() {
  return {
    initial: {},
    animate: {
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.05,
      },
    },
  };
}

// =============================================================================
// BLUR / ROTATE ENTRANCE ANIMATIONS
// =============================================================================

export const blurIn: Variants = {
  initial: { opacity: 0, filter: 'blur(10px)' },
  animate: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    filter: 'blur(10px)',
    transition: { duration: 0.3, ease: easing.easeIn },
  },
};

export const rotateIn: Variants = {
  initial: { opacity: 0, rotate: -180, scale: 0.5 },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: easing.easeOut },
  },
  exit: {
    opacity: 0,
    rotate: 180,
    scale: 0.5,
    transition: { duration: 0.4, ease: easing.easeIn },
  },
};

// =============================================================================
// 3D TRANSFORM ANIMATIONS
// =============================================================================

export const flipX: Variants = {
  initial: { rotateX: -90, opacity: 0 },
  animate: {
    rotateX: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easing.easeOut },
  },
  exit: {
    rotateX: 90,
    opacity: 0,
    transition: { duration: 0.4, ease: easing.easeIn },
  },
};

export const flipY: Variants = {
  initial: { rotateY: -90, opacity: 0 },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: easing.easeOut },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    transition: { duration: 0.4, ease: easing.easeIn },
  },
};

export const flip3D: Variants = {
  initial: { rotateY: -90, opacity: 0 },
  animate: {
    rotateY: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing.easeOut,
    },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: easing.easeIn,
    },
  },
};

export const cube3D: Variants = {
  initial: { rotateX: -45, rotateY: -45, opacity: 0, scale: 0.8 },
  animate: {
    rotateX: 0,
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easing.easeOut,
    },
  },
};

export const tilt3D = {
  initial: { rotateX: 0, rotateY: 0 },
  animate: (coords: { x: number; y: number }) => ({
    rotateX: coords.y * 0.1,
    rotateY: coords.x * 0.1,
    transition: transitions.fast,
  }),
};

// =============================================================================
// SPRING PHYSICS ANIMATIONS
// =============================================================================

export const springBounce: Variants = {
  initial: { scale: 0, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 500,
      damping: 15,
      mass: 1,
    },
  },
};

export const springElastic: Variants = {
  initial: { scale: 0, rotate: -180 },
  animate: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
      mass: 0.8,
    },
  },
};

export const springWobble: Variants = {
  initial: { x: -100, opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 8,
      mass: 1.5,
    },
  },
};

// =============================================================================
// GESTURE ANIMATIONS
// =============================================================================

export const dragConstraints = {
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export const swipeVariants: Variants = {
  initial: { x: 0 },
  swipeLeft: {
    x: -300,
    opacity: 0,
    transition: { duration: 0.3 },
  },
  swipeRight: {
    x: 300,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

export const magnetic = {
  rest: { x: 0, y: 0 },
  hover: (coords: { x: number; y: number }) => ({
    x: coords.x * 0.3,
    y: coords.y * 0.3,
    transition: transitions.fast,
  }),
};

// =============================================================================
// SCROLL-LINKED ANIMATIONS
// =============================================================================

export function createScrollReveal(direction: 'up' | 'down' | 'left' | 'right' = 'up', distance: number = 50): Variants {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return {
    initial: {
      ...directions[direction],
      opacity: 0,
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: easing.easeOut,
      },
    },
  };
}

export const scaleReveal: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: easing.easeOut,
    },
  },
};

export const rotateReveal: Variants = {
  initial: { rotate: -10, scale: 0.95, opacity: 0 },
  animate: {
    rotate: 0,
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing.easeOut,
    },
  },
};

// =============================================================================
// MORPHING ANIMATIONS
// =============================================================================

export const morphVariants: Variants = {
  circle: {
    borderRadius: '50%',
    transition: transitions.base,
  },
  square: {
    borderRadius: '0%',
    transition: transitions.base,
  },
  rounded: {
    borderRadius: '20%',
    transition: transitions.base,
  },
};

export const textReveal: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
    },
  }),
};

export function createCounterAnimation(from: number, to: number, duration: number = 2): Transition {
  return {
    duration,
    ease: 'easeOut',
  };
}

// =============================================================================
// LOADING ANIMATIONS
// =============================================================================

export const pulse: Variants = {
  initial: { scale: 1, opacity: 1 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const shimmer: Variants = {
  initial: { x: '-100%' },
  animate: {
    x: '100%',
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const skeleton: Variants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
