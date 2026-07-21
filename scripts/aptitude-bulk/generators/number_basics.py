"""Number basics topic generators (6 topics)."""
from __future__ import annotations

import math
from generators.base import *


def gen_lcm_hcf(order: int) -> dict:
    r = rng_for("lcm-hcf", order)
    t = (order - 21) % 10
    v = (order - 21) // 10
    if t == 0:
        a, b = 12 + v * 3, 18 + v * 5
        ans = hcf(a, b)
        q = f"Find the HCF of {a} and {b}."
        sol = f"Step 1: Factors of {a} and {b}. Step 2: HCF = {ans}."
        return finalize(order, q, ans, [lcm(a, b), ans + 2, a // 2], sol, "Use prime factorisation or Euclid.")
    if t == 1:
        a, b = 15 + v * 4, 20 + v * 6
        ans = lcm(a, b)
        q = f"Find the LCM of {a} and {b}."
        sol = f"Step 1: HCF = {hcf(a, b)}. Step 2: LCM = ({a}×{b})/HCF = {ans}."
        return finalize(order, q, ans, [a + b, ans // 2, hcf(a, b)], sol, "LCM = ab/HCF.")
    if t == 2:
        a, b, c = 6 + v, 8 + v, 12 + v
        ans = lcm(lcm(a, b), c)
        q = f"Find the LCM of {a}, {b} and {c}."
        sol = f"Step 1: LCM stepwise. Step 2: LCM = {ans}."
        return finalize(order, q, ans, [a * b, ans // 2, hcf(a, c)], sol, "LCM of three numbers.")
    if t == 3:
        a, b = 24 + v * 6, 36 + v * 8
        ans = hcf(a, b)
        q = f"HCF of {a} and {b} is:"
        sol = f"Step 1: HCF({a},{b}) = {ans}."
        return finalize(order, q, ans, [6, 12, ans * 2], sol, "Euclid's algorithm.")
    if t == 4:
        h = 4 + v
        nums = [h * (3 + i) for i in range(3)]
        ans = h
        q = f"Three numbers {nums[0]}, {nums[1]}, {nums[2]} are in ratio 3:4:5. Their HCF is:"
        sol = f"Step 1: Numbers are {h}×3, {h}×4, {h}×5. Step 2: HCF = {ans}."
        return finalize(order, q, ans, [h * 2, 3, 12], sol, "Common multiplier is HCF.")
    if t == 5:
        a, b = 18 + v * 2, 24 + v * 3
        ans = lcm(a, b) // hcf(a, b)
        q = f"If LCM of {a} and {b} is {lcm(a, b)}, find (LCM × HCF) / ({a} + {b})."
        val = (lcm(a, b) * hcf(a, b)) // (a + b)
        ans = val
        sol = f"Step 1: LCM×HCF = {a}×{b} = {a * b}. Step 2: {a * b}/({a + b}) = {ans}."
        return finalize(order, q, ans, [a, b, hcf(a, b)], sol, "LCM×HCF = product.")
    if t == 6:
        n = 60 + v * 30
        bells = [6, 8, 10]
        ans = lcm(lcm(bells[0], bells[1]), bells[2])
        q = f"Three bells ring at intervals of 6, 8 and 10 seconds. After how many seconds do they ring together?"
        sol = f"Step 1: LCM(6,8,10) = {ans}."
        return finalize(order, q, ans, [40, 120, 24], sol, "Simultaneous = LCM of intervals.")
    if t == 7:
        a, b = 45 + v * 5, 60 + v * 5
        ans = hcf(a, b)
        q = f"The greatest number that divides {a} and {b} exactly is:"
        sol = f"Step 1: HCF = {ans}."
        return finalize(order, q, ans, [15, 30, 5], sol, "HCF divides both.")
    if t == 8:
        side = 12 + v * 2
        area = side * side
        ans = lcm(12, 18) if v % 2 == 0 else lcm(16, 24)
        tiles = 12 + v * 2
        side2 = 18 + v * 3
        ans = lcm(tiles, side2)
        q = f"Find the least square tile size (cm) to pave a floor {tiles} cm by {side2} cm without cutting."
        sol = f"Step 1: Need LCM({tiles},{side2}) = {ans} cm tile."
        return finalize(order, q, ans, [tiles, side2, hcf(tiles, side2)], sol, "Square tile = LCM of sides.")
    # t==9
    a, b = 7 + v, 11 + v
    diff = abs(a - b)
    ans = diff
    q = f"The HCF of two numbers is 13 and their LCM is 455. If one number is {13 * a}, the other is {13 * b}. Find |a − b|."
    sol = f"Step 1: Numbers are 13×{a} and 13×{b}. Step 2: Difference of co-prime parts = {ans}."
    return finalize(order, q, ans, [a + b, 13, lcm(a, b)], sol, "Co-prime parts differ.")


def gen_divisibility(order: int) -> dict:
    t = (order - 21) % 10
    v = (order - 21) // 10
    if t == 0:
        n = 12340 + v * 111 + order
        ans = "Yes" if n % 2 == 0 else "No"
        q = f"Is {n} divisible by 2?"
        sol = f"Step 1: Last digit {n % 10}. Step 2: {'Even' if n % 2 == 0 else 'Odd'} → {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Maybe", "Cannot say"], sol, "Check last digit.")
    if t == 1:
        n = 1230 + v * 37 + order * 3
        ans = "Yes" if n % 3 == 0 else "No"
        ds = sum(int(d) for d in str(n))
        q = f"Is {n} divisible by 3?"
        sol = f"Step 1: Digit sum = {ds}. Step 2: {ds} mod 3 = {ds % 3}. Answer: {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Only if even", "Cannot say"], sol, "Digit sum divisible by 3.")
    if t == 2:
        n = 1240 + v * 55 + order
        ans = "Yes" if n % 5 == 0 else "No"
        q = f"Is {n} divisible by 5?"
        sol = f"Step 1: Last digit {n % 10}. Divisible by 5 → {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Maybe", "Cannot say"], sol, "Ends in 0 or 5.")
    if t == 3:
        n = 123456 + v * 1001 + order
        ans = "Yes" if n % 9 == 0 else "No"
        ds = sum(int(d) for d in str(n))
        q = f"Is {n} divisible by 9?"
        sol = f"Step 1: Digit sum = {ds}. Step 2: {ds} mod 9 = {ds % 9}. Answer: {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Maybe", "Cannot say"], sol, "Digit sum mod 9.")
    if t == 4:
        n = 1234 + v * 77 + order
        ans = "Yes" if n % 11 == 0 else "No"
        alt = sum(int(str(n)[i]) * (1 if i % 2 == 0 else -1) for i in range(len(str(n))))
        q = f"Is {n} divisible by 11?"
        sol = f"Step 1: Alternating sum = {alt}. Step 2: {alt} mod 11 = {alt % 11}. Answer: {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Maybe", "Cannot say"], sol, "11-rule: alt sum.")
    if t == 5:
        digits = [2, 4, 6, 8]
        d = digits[v % 4]
        n = 1000 + d * 100 + 30 + order % 10
        ans = "Yes" if n % 4 == 0 else "No"
        q = f"Is {n} divisible by 4?"
        last2 = n % 100
        sol = f"Step 1: Last two digits {last2}. Step 2: {last2} mod 4 = {last2 % 4}. Answer: {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Maybe", "Cannot say"], sol, "Last 2 digits mod 4.")
    if t == 6:
        n = 2000 + v * 250 + order
        ans = "Yes" if n % 8 == 0 else "No"
        last3 = n % 1000
        q = f"Is {n} divisible by 8?"
        sol = f"Step 1: Last three digits {last3}. Step 2: {last3} mod 8 = {last3 % 8}. Answer: {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Maybe", "Cannot say"], sol, "Last 3 digits mod 8.")
    if t == 7:
        smallest = None
        start = 1000 + v * 100
        for x in range(start, start + 500):
            if x % 12 == 0:
                smallest = x
                break
        ans = smallest
        q = f"Find the smallest 4-digit number divisible by 12."
        sol = f"Step 1: 1000 mod 12 = {1000 % 12}. Step 2: Next multiple = {ans}."
        return finalize(order, q, ans, [ans + 12, ans - 12, 996], sol, "Round up to multiple of 12.")
    if t == 8:
        n = 432 + v * 36
        ans = 6 if n % 6 == 0 else n % 6
        q = f"What is the remainder when {n} is divided by 6?"
        sol = f"Step 1: {n} = 6×{n // 6} + {n % 6}. Remainder = {n % 6}."
        return finalize(order, q, n % 6, [0, 1, 5], sol, "Check divisibility by 2 and 3.")
    # t==9
    num = 2 * 3 * 5 * (7 + v)
    ans = count_factors(num)
    q = f"A number has prime factorisation 2×3×5×{7 + v}. How many divisors does it have?"
    sol = f"Step 1: Each prime power is 1. Step 2: (1+1)^4 = {ans} divisors."
    return finalize(order, q, ans, [8, 12, 16], sol, "Product of (exp+1).")


def gen_decimal_fractions(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        num, den = 3 + v, 8 + v
        val = round(num / den, 3)
        q = f"Convert {num}/{den} to a decimal (3 decimal places)."
        sol = f"Step 1: {num} ÷ {den} = {num / den:.4f}. Step 2: Rounded = {val}."
        return finalize(order, q, val, [round(val + 0.01, 3), round(val - 0.01, 3), num / (den + 1)], sol, "Divide numerator by denominator.")
    if t == 1:
        a, b = 1.25 + v * 0.1, 0.5 + v * 0.05
        ans = round(a * b, 2)
        q = f"Calculate {a} × {b}."
        sol = f"Step 1: {a} × {b} = {ans}."
        return finalize(order, q, ans, [round(a + b, 2), round(a / b, 2), round(a * b * 10, 2)], sol, "Multiply decimals.")
    if t == 2:
        a, b = 2.4 + v * 0.2, 0.6
        ans = round(a / b, 1)
        q = f"Calculate {a} ÷ {b}."
        sol = f"Step 1: Shift decimal: {a}/{b} = {ans}."
        return finalize(order, q, ans, [round(a * b, 1), round(a + b, 1), round(a - b, 1)], sol, "Divide by making divisor whole.")
    if t == 3:
        vals = [0.75, 0.125, 0.625, 0.875, 0.333, 0.667]
        x = vals[v % len(vals)] + order * 0.001
        q = f"Which is largest: {x:.3f}, {x - 0.05:.3f}, {x + 0.02:.3f}, {x - 0.1:.3f}?"
        opts_vals = sorted([x, x - 0.05, x + 0.02, x - 0.1], reverse=True)
        ans = f"{opts_vals[0]:.3f}"
        sol = f"Step 1: Compare decimals place by place. Largest = {ans}."
        return finalize(order, q, ans, [f"{opts_vals[1]:.3f}", f"{opts_vals[2]:.3f}", f"{opts_vals[3]:.3f}"], sol, "Align decimal points.")
    if t == 4:
        den = 4 + v * 2
        ans = "Terminating" if all(p in (2, 5) for p in prime_factors(den)) else "Non-terminating"
        q = f"Is 1/{den} a terminating decimal?"
        sol = f"Step 1: Factorise {den}. Step 2: Only 2 and 5 → {ans}."
        return finalize(order, q, ans, ["Non-terminating" if ans == "Terminating" else "Terminating", "Cannot say", "Both"], sol, "Denominator primes 2,5 only.")
    if t == 5:
        q = f"Express 0.{str(3 + v % 3) * 1}̅ as a fraction in lowest terms."
        digit = 3 + v % 3
        if digit == 3:
            ans = "1/3"
        elif digit == 4:
            ans = "4/9"
        else:
            ans = "5/9"
        sol = f"Step 1: x = 0.{digit}̅ → 10x - x = {digit} → x = {digit}/9 = {ans}."
        return finalize(order, q, ans, [f"{digit}/10", f"{digit}/90", f"1/{digit}"], sol, "Standard recurring trick.")
    if t == 6:
        expr = round(0.2 * (3 + v) + 0.05 * order, 2)
        ans = expr
        q = f"Simplify: 0.2 × {3 + v} + 0.05 × {order}."
        sol = f"Step 1: 0.2×{3 + v} = {0.2 * (3 + v)}. Step 2: + {0.05 * order} = {ans}."
        return finalize(order, q, ans, [ans + 0.1, ans - 0.1, ans * 2], sol, "BODMAS on decimals.")
    # t==7
    a, b = 1.5 + v * 0.1, 2.5 + v * 0.1
    ans = round((a + b) / 2, 2)
    q = f"Find the average of {a} and {b}."
    sol = f"Step 1: ({a}+{b})/2 = {ans}."
    return finalize(order, q, ans, [round(a + b, 2), round(a * b, 2), round(b - a, 2)], sol, "Average of two decimals.")


def gen_simplification(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        a, b, c = 2 + v, 3, 4
        ans = a + b * c
        q = f"Evaluate: {a} + {b} × {c}."
        sol = f"Step 1: {b}×{c} = {b * c}. Step 2: {a} + {b * c} = {ans}."
        return finalize(order, q, ans, [(a + b) * c, a * b + c, a + b + c], sol, "Multiplication before addition.")
    if t == 1:
        ans = (12 + v * 2) // 3 + 5
        q = f"Evaluate: (12 + {v * 2}) ÷ 3 + 5."
        inner = 12 + v * 2
        sol = f"Step 1: {inner}/3 = {inner // 3}. Step 2: +5 = {ans}."
        return finalize(order, q, ans, [inner // 3, inner + 5, (inner + 5) // 3], sol, "Division before addition.")
    if t == 2:
        pct, base = 20 + v, 150 + order
        ans = round(pct / 100 * base)
        q = f"Find {pct}% of {base}."
        sol = f"Step 1: {pct}/100 × {base} = {ans}."
        return finalize(order, q, ans, [round(base / pct), pct + base, ans + 10], sol, "Percent = fraction × base.")
    if t == 3:
        val = 48 + v * 11
        approx = round(val, -1) if val % 10 >= 5 else round(val, -1)
        ans = round(val / 10) * 10
        q = f"Approximate {val} to the nearest ten."
        sol = f"Step 1: Look at units digit {val % 10}. Step 2: Nearest ten = {ans}."
        return finalize(order, q, ans, [ans + 10, ans - 10, val], sol, "Round units ≥5 up.")
    if t == 4:
        n = 50 + v * 20
        ans = round(math.sqrt(n))
        q = f"√{n} is approximately:"
        sol = f"Step 1: {ans}² = {ans * ans}, {(ans + 1) ** 2} = {(ans + 1) ** 2}. Step 2: √{n} ≈ {ans}."
        return finalize(order, q, ans, [ans + 1, ans - 1, ans + 2], sol, "Nearest perfect square.")
    if t == 5:
        a, b, c = 2 + v, 3, 5
        ans = a * b + c
        q = f"Find x if x − {c} = {a} × {b}."
        sol = f"Step 1: {a}×{b} = {a * b}. Step 2: x = {a * b} + {c} = {ans}."
        return finalize(order, q, ans, [a * b - c, a + b + c, a * b], sol, "Transpose then solve.")
    if t == 6:
        num = 999 + v * 111
        ans = num // 3
        q = f"Estimate: {num} ÷ 3 ≈ ?"
        sol = f"Step 1: {num}/3 = {ans} exactly."
        return finalize(order, q, ans, [ans + 100, ans - 100, num // 4], sol, "Divide by 3.")
    # t==7
    ans = round((1 + 0.5 * v) / 0.25)
    q = f"Evaluate: {1 + 0.5 * v} ÷ 0.25."
    val = (1 + 0.5 * v) / 0.25
    sol = f"Step 1: ÷0.25 = ×4. Step 2: {val} = {int(val) if val == int(val) else val}."
    ans = int(val) if val == int(val) else round(val, 1)
    return finalize(order, q, ans, [ans + 2, ans - 2, ans // 2], sol, "Multiply by reciprocal.")


def gen_surds(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        a, b = 2 + v % 3, 3 + v % 4
        ans = a ** b
        q = f"Simplify: ({a})^{b}."
        sol = f"Step 1: Multiply {a}, {b} times = {ans}."
        return finalize(order, q, ans, [a * b, a + b, a ** (b + 1)], sol, "Apply index law.")
    if t == 1:
        ans = 2 ** (3 + v)
        q = f"Simplify: 2^{3 + v} × 2^{v}."
        exp = (3 + v) + v
        ans = 2 ** exp
        sol = f"Step 1: Add indices: {3 + v} + {v} = {exp}. Step 2: 2^{exp} = {ans}."
        return finalize(order, q, ans, [2 ** (3 + v), 2 ** v, 2 ** (3 + v - v)], sol, "a^m × a^n = a^(m+n).")
    if t == 2:
        n = 50 + v * 10
        ans = round(math.sqrt(n), 2)
        q = f"√{n} to 2 decimal places is:"
        sol = f"Step 1: √{n} ≈ {math.sqrt(n):.4f}. Step 2: Round = {ans}."
        return finalize(order, q, ans, [round(ans + 0.1, 2), round(ans - 0.1, 2), n // 7], sol, "Use calculator value.")
    if t == 3:
        ans = 2 * math.sqrt(3) if v % 2 == 0 else 3 * math.sqrt(2)
        if v % 2 == 0:
            q = "Simplify: √12 + √27."
            val = 2 * math.sqrt(3) + 3 * math.sqrt(3)
            ans = round(5 * math.sqrt(3), 2)
            sol = f"Step 1: √12=2√3, √27=3√3. Step 2: Sum = 5√3 ≈ {ans}."
            return finalize(order, q, f"5√3", ["5√2", "√45", "6√3"], sol, "Combine like surds.")
        q = "Simplify: √18 − √8."
        sol = f"Step 1: 3√2 − 2√2 = √2."
        return finalize(order, q, "√2", ["√10", "5√2", "2√2"], sol, "Like surds subtract.")
    if t == 4:
        q = f"Rationalise: 1/√{5 + v}."
        r = 5 + v
        ans = f"√{r}/{r}"
        sol = f"Step 1: Multiply top and bottom by √{r}. Step 2: √{r}/{r}."
        return finalize(order, q, ans, [f"1/{r}", f"{r}/√{r}", f"√{r}"], sol, "Remove surd from denominator.")
    if t == 5:
        base, exp = 3, 2 * v + 4
        ans = base ** (exp // 2) if exp % 2 == 0 else base ** ((exp - 1) // 2) * math.sqrt(base)
        q = f"Evaluate: {base}^{exp}."
        ans_val = base ** exp
        sol = f"Step 1: {base}^{exp} = {ans_val}."
        return finalize(order, q, ans_val, [base ** (exp - 1), base ** (exp + 1), exp ** base], sol, "Compute power.")
    if t == 6:
        q = "Which is larger: √7 or 2.6?"
        ans = "√7" if math.sqrt(7) > 2.6 else "2.6"
        sol = f"Step 1: √7 ≈ {math.sqrt(7):.3f}. Compare with 2.6 → {ans}."
        return finalize(order, q, ans, ["2.6" if ans == "√7" else "√7", "Equal", "Cannot say"], sol, "Square compare or decimal.")
    # t==7
    q = f"Solve: 2^x = {2 ** (3 + v)}."
    ans = 3 + v
    sol = f"Step 1: 2^x = 2^{3 + v}. Step 2: x = {ans}."
    return finalize(order, q, ans, [ans + 1, ans - 1, 2 * ans], sol, "Equate exponents.")


GENERATORS = {
    "lcm-hcf": gen_lcm_hcf,
    "divisibility-rules": gen_divisibility,
    "decimal-fractions": gen_decimal_fractions,
    "simplification-approximation": gen_simplification,
    "surds-indices": gen_surds,
}
