// Small builders to keep track data files readable.

// Single-approach solution (most beginner problems have exactly one).
export const solo = (logic, code, tc = 'O(1)', sc = 'O(1)') => ({
  normal: { logic, timeComplexity: tc, spaceComplexity: sc, code },
})

// Three-approach solution (brute / normal / optimized) for harder tracks.
export const trio = (brute, normal, optimized) => ({ brute, normal, optimized })

export const variant = (logic, tc, sc, code) => ({
  logic, timeComplexity: tc, spaceComplexity: sc, code,
})

// One worked example.
export const ex = (input, output, explanation) => ({ input, output, explanation })
