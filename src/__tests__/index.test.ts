import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

const mod = await import('../../dist/index.js');

describe('exports', () => {
  it('exports transition presets', () => {
    assert.equal(typeof mod.transitions, 'object');
    assert.ok(mod.transitions.fast);
    assert.ok(mod.transitions.base);
    assert.ok(mod.transitions.slow);
  });

  it('exports easing presets', () => {
    assert.equal(typeof mod.easing, 'object');
  });
});

describe('fade variants', () => {
  for (const name of ['fadeIn', 'fadeInUp', 'fadeInDown', 'fadeInLeft', 'fadeInRight']) {
    it(`${name} has initial and animate`, () => {
      const variant = mod[name];
      assert.ok(variant, `${name} is exported`);
      assert.ok(variant.initial !== undefined, `${name}.initial exists`);
      assert.ok(variant.animate !== undefined, `${name}.animate exists`);
    });
  }
});

describe('scale variants', () => {
  it('scaleIn has initial and animate', () => {
    assert.ok(mod.scaleIn.initial);
    assert.ok(mod.scaleIn.animate);
  });

  it('scaleInBounce has initial and animate', () => {
    assert.ok(mod.scaleInBounce.initial);
    assert.ok(mod.scaleInBounce.animate);
  });
});

describe('slide variants', () => {
  for (const name of ['slideInUp', 'slideInDown', 'slideInLeft', 'slideInRight']) {
    it(`${name} has initial and animate`, () => {
      assert.ok(mod[name].initial);
      assert.ok(mod[name].animate);
    });
  }
});

describe('stagger', () => {
  it('staggerContainer has animate with staggerChildren', () => {
    assert.ok(mod.staggerContainer.animate);
    assert.ok(mod.staggerContainer.animate.transition);
  });

  it('staggerItem has initial and animate', () => {
    assert.ok(mod.staggerItem.initial);
    assert.ok(mod.staggerItem.animate);
  });
});

describe('component variants', () => {
  it('modalVariants has initial, animate, exit', () => {
    assert.ok(mod.modalVariants.initial);
    assert.ok(mod.modalVariants.animate);
    assert.ok(mod.modalVariants.exit);
  });

  it('toastVariants has initial, animate, exit', () => {
    assert.ok(mod.toastVariants.initial);
    assert.ok(mod.toastVariants.animate);
    assert.ok(mod.toastVariants.exit);
  });

  it('dropdownVariants has initial, animate, exit', () => {
    assert.ok(mod.dropdownVariants.initial);
    assert.ok(mod.dropdownVariants.animate);
    assert.ok(mod.dropdownVariants.exit);
  });
});

describe('interaction presets', () => {
  it('hoverScale is defined', () => assert.ok(mod.hoverScale));
  it('tapScale is defined', () => assert.ok(mod.tapScale));
  it('hoverLift is defined', () => assert.ok(mod.hoverLift));
});

describe('advanced animations', () => {
  it('createParallax is a function', () => assert.equal(typeof mod.createParallax, 'function'));
  it('createScrollReveal is a function', () => assert.equal(typeof mod.createScrollReveal, 'function'));
  it('createSpiralStagger is a function', () => assert.equal(typeof mod.createSpiralStagger, 'function'));
  it('createCounterAnimation is a function', () => assert.equal(typeof mod.createCounterAnimation, 'function'));

  it('spring presets exist', () => {
    assert.ok(mod.springBounce);
    assert.ok(mod.springElastic);
    assert.ok(mod.springWobble);
  });

  it('3D transforms exist', () => {
    assert.ok(mod.flip3D);
    assert.ok(mod.cube3D);
    assert.ok(mod.tilt3D);
  });

  it('loading animations exist', () => {
    assert.ok(mod.pulse);
    assert.ok(mod.shimmer);
    assert.ok(mod.skeleton);
  });
});

describe('accessibility', () => {
  it('prefersReducedMotion is a function', () => {
    assert.equal(typeof mod.prefersReducedMotion, 'function');
  });

  it('withReducedMotion passes variants through when motion is not reduced', () => {
    assert.equal(typeof mod.withReducedMotion, 'function');
    // No `window`/matchMedia in the test runner → preference reads as false.
    const result = mod.withReducedMotion(mod.fadeInUp);
    assert.strictEqual(result, mod.fadeInUp);
  });
});

describe('new entrance variants', () => {
  for (const name of ['blurIn', 'rotateIn', 'flipX', 'flipY']) {
    it(`${name} has initial and animate`, () => {
      assert.ok(mod[name], `${name} is exported`);
      assert.ok(mod[name].initial !== undefined, `${name}.initial exists`);
      assert.ok(mod[name].animate !== undefined, `${name}.animate exists`);
    });
  }
});

describe('createStagger factory', () => {
  it('is a function', () => assert.equal(typeof mod.createStagger, 'function'));

  it('applies default timing', () => {
    const container = mod.createStagger();
    assert.equal(container.animate.transition.staggerChildren, 0.1);
    assert.equal(container.animate.transition.staggerDirection, 1);
  });

  it('honors custom timing and direction', () => {
    const container = mod.createStagger({
      staggerChildren: 0.2,
      delayChildren: 0.5,
      direction: -1,
    });
    assert.equal(container.animate.transition.staggerChildren, 0.2);
    assert.equal(container.animate.transition.delayChildren, 0.5);
    assert.equal(container.animate.transition.staggerDirection, -1);
  });
});
