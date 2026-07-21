"""Algebra, geometry, and advanced maths generators."""
from __future__ import annotations

import math
from generators.base import *


def gen_algebra(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        a, b = 3 + v, 5 + v
        ans = a + b
        q = f"Simplify: ({a}x + {b}) + ({b}x + {a}). Coefficient of x?"
        coef = a + b
        const = a + b
        q = f"If ({a}x + {b}) + ({b}x + {a}) = {coef + const}x + {2 * (a + b)}, coefficient of x?"
        sol = f"Step 1: ({a}+{b})x = {coef}x. Coefficient = {coef}."
        return finalize(order, q, coef, [a, b, a * b], sol, "Combine like terms.")
    if t == 1:
        x = 4 + v
        ans = 2 * x + 3
        q = f"If x = {x}, find 2x + 3."
        sol = f"Step 1: 2×{x}+3 = {ans}."
        return finalize(order, q, ans, [x + 3, 2 * x, x * 3], sol, "Substitute x.")
    if t == 2:
        a, b = 2 + v, 3
        ans = a ** 2 - b ** 2
        q = f"Evaluate (a+b)(a−b) when a={a + 2}, b={b}."
        aa, bb = a + 2, b
        ans = aa ** 2 - bb ** 2
        sol = f"Step 1: {aa}²−{bb}² = {ans}."
        return finalize(order, q, ans, [aa + bb, aa * bb, (aa - bb) ** 2], sol, "Difference of squares.")
    if t == 3:
        ans = (3 + v) ** 2
        q = f"Expand ({3 + v})²."
        n = 3 + v
        sol = f"Step 1: {n}² = {ans}."
        return finalize(order, q, ans, [2 * n, n + 1, n ** 2 + 1], sol, "Perfect square.")
    if t == 4:
        x = 5 + v
        ans = x ** 2 + 2 * x + 1
        q = f"Evaluate x² + 2x + 1 for x = {x}."
        sol = f"Step 1: ({x}+1)² = {ans}."
        return finalize(order, q, ans, [x ** 2, 2 * x, x + 1], sol, "Recognise (x+1)².")
    if t == 5:
        a, b, c = 1, -(5 + v), 6 + v
        # roots 2 and 3+v
        r1, r2 = 2, 3 + v
        ans = r1 * r2
        q = f"Product of roots of x² − {5 + v}x + {6 + v} = 0?"
        sol = f"Step 1: Product = c/a = {ans}."
        return finalize(order, q, ans, [r1 + r2, -ans, r1], sol, "Vieta: product = c/a.")
    if t == 6:
        ans = 2 + v
        q = f"If 3x − {6 + v} = 0, x = ?"
        x = (6 + v) / 3
        x = round(x, 1) if x != int(x) else int(x)
        sol = f"Step 1: 3x = {6 + v}. x = {x}."
        return finalize(order, q, x, [x + 1, x - 1, 3 + v], sol, "Isolate x.")
    # t==7
    a, b = 4 + v, 2
    ans = a // b if a % b == 0 else round(a / b, 1)
    q = f"Simplify: ({a}x)/{b} when x = 1."
    sol = f"Step 1: {a}/{b} = {ans}."
    return finalize(order, q, ans, [a, b, a * b], sol, "Divide coefficients.")


def gen_equations(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        x = 7 + v
        ans = x
        q = f"Solve: x + {5 + v} = {x + 5 + v}."
        sol = f"Step 1: x = {ans}."
        return finalize(order, q, ans, [ans + 1, ans - 1, 5 + v], sol, "Transpose constant.")
    if t == 1:
        ans = 4 + v
        q = f"Solve: 2x = {2 * ans}."
        sol = f"Step 1: x = {ans}."
        return finalize(order, q, ans, [ans * 2, ans + 2, ans // 2], sol, "Divide by 2.")
    if t == 2:
        ans = 3 + v
        a = ans + 2
        q = f"Solve: x − {2} = {ans}."
        sol = f"Step 1: x = {ans + 2} = {a}."
        return finalize(order, q, a, [ans, ans + 1, ans + 3], sol, "Add to both sides.")
    if t == 3:
        ans = 6 + v
        q = f"Solve: x/3 = {ans // 3 if ans % 3 == 0 else ans}."
        rhs = ans if ans % 3 != 0 else ans // 3
        x = ans if ans % 3 != 0 else ans
        x = 3 * rhs if isinstance(rhs, int) and rhs < 20 else ans
        x = 3 * (2 + v)
        sol = f"Step 1: x = 3×{2 + v} = {x}."
        return finalize(order, q, x, [x // 3, x + 3, x - 3], sol, "Multiply by 3.")
    if t == 4:
        x = 5 + v
        ans = 2 * x + 1
        q = f"Solve: 2x + 1 = {ans}."
        sol = f"Step 1: 2x = {ans - 1}. x = {x}."
        return finalize(order, q, x, [x + 1, x - 1, ans], sol, "Linear equation.")
    if t == 5:
        x, y = 3 + v, 4 + v
        ans = x + y
        q = f"x + y = {ans}, x − y = {x - y}. Find x."
        sol = f"Step 1: Add equations: 2x = {2 * x}. x = {x}."
        return finalize(order, q, x, [y, ans, x + y], sol, "Elimination.")
    if t == 6:
        ans = 8 + v
        q = f"Sum of two numbers is {ans + 4}, difference is 4. Larger number?"
        larger = (ans + 4 + 4) // 2
        sol = f"Step 1: (S+D)/2 = {larger}."
        return finalize(order, q, larger, [larger - 4, ans, 4], sol, "Simultaneous linear.")
    # t==7
    a = 2 + v
    b = 10 + v * 3
    x = b // a if b % a == 0 else round(b / a, 1)
    q = f"Solve: {a}x = {b}."
    sol = f"Step 1: x = {b}/{a} = {x}."
    return finalize(order, q, x, [x + 1, b, a], sol, "Divide by coefficient.")


def gen_inequalities(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        ans = 5 + v
        q = f"Solve: x > {ans - 2}. Smallest integer x?"
        sol = f"Step 1: x > {ans - 2}. Smallest integer = {ans - 1}."
        return finalize(order, q, ans - 1, [ans - 2, ans, ans + 1], sol, "Strict inequality.")
    if t == 1:
        ans = 3 + v
        q = f"Solve: 2x < {2 * ans + 1}. Largest integer x?"
        bound = (2 * ans + 1) // 2
        sol = f"Step 1: x < {bound + 0.5}. Largest int = {bound}."
        return finalize(order, q, bound, [bound + 1, ans, bound - 1], sol, "Divide, keep strict.")
    if t == 2:
        lo, hi = 2 + v, 8 + v
        ans = hi - lo - 1
        q = f"How many integers satisfy {lo} < x < {hi}?"
        count = hi - lo - 1
        sol = f"Step 1: Integers {lo + 1} to {hi - 1} → {count} values."
        return finalize(order, q, count, [hi - lo, hi - lo + 1, count + 1], sol, "Count interior integers.")
    if t == 3:
        ans = 7 + v
        q = f"x + 3 ≥ {ans}. Smallest integer x?"
        sol = f"Step 1: x ≥ {ans - 3}. Smallest = {ans - 3}."
        return finalize(order, q, ans - 3, [ans, ans - 4, ans + 3], sol, "Non-strict ≥.")
    if t == 4:
        q = f"Which satisfies both x > 0 and x < {5 + v}?"
        ans = 3 + v % 3
        sol = f"Step 1: 0 < x < {5 + v}. {ans} works."
        return finalize(order, q, ans, [0, 5 + v, -(1 + v)], sol, "Intersection of conditions.")
    if t == 5:
        ans = -(2 + v)
        q = f"Solve: −x > {2 + v}. x?"
        sol = f"Step 1: x < {ans}. Example integer x = {ans - 1}."
        return finalize(order, q, ans - 1, [2 + v, ans, 0], sol, "Flip sign when ×−1.")
    if t == 6:
        a, b = 4 + v, 9 + v
        ans = f"{a} ≤ x ≤ {b}"
        q = f"Solve: x − {a} ≥ 0 and {b} − x ≥ 0 combined?"
        sol = f"Step 1: {a} ≤ x ≤ {b}."
        return finalize(order, q, a, [b, a + b, b - a], sol, "Compound inequality.")
    # t==7
    ans = 6 + v
    q = f"|x − 5| < {ans - 5 if ans > 5 else 2}. If simplified to −2 < x < 8, find width?"
    width = 10
    sol = f"Step 1: Distance from 5 less than half-width → width 10."
    return finalize(order, q, width, [8, 5, 2], sol, "Absolute value as interval.")


def gen_progressions(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        a, d, n = 5 + v, 3, 10
        ans = a + (n - 1) * d
        q = f"AP: first term {a}, common difference {d}. 10th term?"
        sol = f"Step 1: a + 9d = {ans}."
        return finalize(order, q, ans, [a + n * d, a + d, a + (n - 2) * d], sol, "a + (n−1)d.")
    if t == 1:
        a, d, n = 2, 4 + v, 8
        ans = n * (2 * a + (n - 1) * d) // 2
        q = f"Sum of first {n} terms of AP {a}, {a + d}, ...?"
        sol = f"Step 1: S_n = n/2(2a+(n−1)d) = {ans}."
        return finalize(order, q, ans, [a * n, ans + d, ans - n], sol, "AP sum formula.")
    if t == 2:
        a, r, n = 3, 2 + v % 2, 5
        ans = a * r ** (n - 1)
        q = f"GP: a={a}, r={r}. 5th term?"
        sol = f"Step 1: ar^4 = {ans}."
        return finalize(order, q, ans, [a * r ** n, a + r, a * (n - 1)], sol, "ar^(n−1).")
    if t == 3:
        a, r = 2, 3 + v % 2
        ans = a * (r ** 4 - 1) // (r - 1)
        q = f"Sum of GP 2, {2 * r}, ... 5 terms, r={r}?"
        sol = f"Step 1: S = a(r^5−1)/(r−1) = {ans}."
        return finalize(order, q, ans, [2 * 5, ans // 2, a * r ** 5], sol, "GP sum finite.")
    if t == 4:
        n = 20 + v
        ans = n * (n + 1) // 2
        q = f"Sum of first {n} natural numbers?"
        sol = f"Step 1: n(n+1)/2 = {ans}."
        return finalize(order, q, ans, [n ** 2, n * (n - 1), ans + n], sol, "Classic formula.")
    if t == 5:
        a, d = 10 + v, 5
        # which term is 100
        n = (100 - a) // d + 1
        q = f"Which term of AP {a}, {a + d}, ... is {a + (n - 1) * d}?"
        target = a + (n - 1) * d
        sol = f"Step 1: a + (n−1)d = {target}. n = {n}."
        return finalize(order, q, n, [n + 1, n - 1, d], sol, "Solve for n.")
    if t == 6:
        a, r = 81, 1 / 3
        ans = a * r ** 3
        q = f"GP 81, 27, 9, ... 4th term?"
        sol = f"Step 1: 81×(1/3)³ = {ans}."
        return finalize(order, q, int(ans) if ans == int(ans) else ans, [27, 3, 1], sol, "Multiply by r.")
    # t==7
    a, l, n = 3 + v, 21 + v * 3, 7
    d = (l - a) // (n - 1)
    q = f"AP first term {a}, last term {l}, {n} terms. Common difference?"
    sol = f"Step 1: d = ({l}−{a})/{n - 1} = {d}."
    return finalize(order, q, d, [l - a, n, a + d], sol, "From first and last.")


def gen_geometry(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        base, height = 10 + v, 6 + v
        ans = base * height // 2
        q = f"Triangle base {base} cm, height {height} cm. Area?"
        sol = f"Step 1: ½×{base}×{height} = {ans} cm²."
        return finalize(order, q, ans, [base * height, base + height, ans * 2], sol, "A = ½bh.")
    if t == 1:
        side = 8 + v
        ans = 4 * side
        q = f"Square side {side} cm. Perimeter?"
        sol = f"Step 1: 4×{side} = {ans} cm."
        return finalize(order, q, ans, [side ** 2, 2 * side, side], sol, "P = 4a.")
    if t == 2:
        r = 7 + v
        ans = round(math.pi * r ** 2, 1) if False else round(22 / 7 * r ** 2, 1)
        q = f"Circle radius {r} cm. Area (use π = 22/7)?"
        sol = f"Step 1: πr² = 22/7×{r}² = {ans} cm²."
        return finalize(order, q, ans, [2 * 22 / 7 * r, r ** 2, ans / 2], sol, "πr².")
    if t == 3:
        a, b, c = 3 + v, 4 + v, 5 + v
        s = (a + b + c) / 2
        area = round(math.sqrt(s * (s - a) * (s - b) * (s - c)), 1)
        q = f"Triangle sides {a}, {b}, {c} cm. Area (Heron)?"
        sol = f"Step 1: s={s}. Area = √[s(s−a)(s−b)(s−c)] = {area}."
        return finalize(order, q, area, [a * b / 2, s, a + b], sol, "Heron's formula.")
    if t == 4:
        angle = 60 + v * 10
        ans = 180 - angle if angle < 180 else angle
        q = f"Two angles of triangle are {angle}° and 50°. Third angle?"
        third = 180 - angle - 50
        sol = f"Step 1: 180 − {angle} − 50 = {third}°."
        return finalize(order, q, third, [angle, 50, 180], sol, "Sum = 180°.")
    if t == 5:
        l, w = 12 + v, 5 + v
        ans = 2 * (l + w)
        q = f"Rectangle {l}×{w} cm. Perimeter?"
        sol = f"Step 1: 2({l}+{w}) = {ans} cm."
        return finalize(order, q, ans, [l * w, l + w, l], sol, "P = 2(l+w).")
    if t == 6:
        r = 14 + v
        ans = round(2 * 22 / 7 * r, 1)
        q = f"Circle radius {r}. Circumference (π=22/7)?"
        sol = f"Step 1: 2πr = {ans} cm."
        return finalize(order, q, ans, [22 / 7 * r, r ** 2, ans / 2], sol, "C = 2πr.")
    # t==7
    diag1, diag2 = 8 + v, 6 + v
    ans = diag1 * diag2 // 2
    q = f"Rhombus diagonals {diag1} cm and {diag2} cm. Area?"
    sol = f"Step 1: ½×{diag1}×{diag2} = {ans} cm²."
    return finalize(order, q, ans, [diag1 * diag2, diag1 + diag2, diag1 - diag2], sol, "½ d1 d2.")


def gen_coordinate(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        x1, y1, x2, y2 = 1 + v, 2, 4 + v, 6
        ans = round(math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2), 1)
        q = f"Distance between ({x1},{y1}) and ({x2},{y2})?"
        sol = f"Step 1: √(({x2}-{x1})²+({y2}-{y1})²) = {ans}."
        return finalize(order, q, ans, [x2 - x1 + y2 - y1, abs(x2 - x1), abs(y2 - y1)], sol, "Distance formula.")
    if t == 1:
        x1, y1, x2, y2 = 2, 3 + v, 8, 3 + v
        ans = abs(x2 - x1)
        q = f"Distance between ({x1},{y1}) and ({x2},{y2})?"
        sol = f"Step 1: Horizontal → |{x2}-{x1}| = {ans}."
        return finalize(order, q, ans, [y2 - y1, x1 + x2, ans + 2], sol, "Same y → horizontal dist.")
    if t == 2:
        x1, y1, x2, y2 = 1 + v, 1, 5 + v, 7
        mx = (x1 + x2) / 2
        my = (y1 + y2) / 2
        q = f"Midpoint of ({x1},{y1}) and ({x2},{y2})?"
        sol = f"Step 1: (({x1}+{x2})/2, ({y1}+{y2})/2) = ({mx}, {my}). x-coord = {mx}."
        return finalize(order, q, mx, [my, x1 + x2, mx + 1], sol, "Average coordinates.")
    if t == 3:
        m = 2 + v
        ans = m
        q = f"Slope of line through (0,0) and (3,{3 * m})?"
        sol = f"Step 1: m = {3 * m}/3 = {ans}."
        return finalize(order, q, ans, [ans + 1, 3, 3 * m], sol, "rise/run.")
    if t == 4:
        x, y = 3 + v, 4 + v
        ans = x ** 2 + y ** 2
        q = f"Point ({x},{y}) distance from origin squared?"
        d2 = x ** 2 + y ** 2
        sol = f"Step 1: x²+y² = {d2}."
        return finalize(order, q, d2, [x + y, abs(x - y), d2 + 1], sol, "Origin distance².")
    if t == 5:
        ans = 5 + v
        q = f"x-intercept of line x + y = {ans}?"
        sol = f"Step 1: y=0 → x = {ans}."
        return finalize(order, q, ans, [ans - 1, 0, ans // 2], sol, "Set y=0.")
    if t == 6:
        area = 6 + v
        ans = area * 2
        q = f"Triangle with vertices (0,0), ({ans},0), (0,3) has area {area}. Base on x-axis?"
        sol = f"Step 1: ½×base×3 = {area} → base = {ans}."
        return finalize(order, q, ans, [area, 3, ans // 2], sol, "Area from coordinates.")
    # t==7
    x2, y2 = 6 + v, 8 + v
    dist = round(math.sqrt(x2 ** 2 + y2 ** 2))
    q = f"Length of segment from origin to ({x2},{y2})?"
    sol = f"Step 1: √({x2}²+{y2}²) = {dist}."
    return finalize(order, q, dist, [x2 + y2, max(x2, y2), dist + 1], sol, "Pythagoras.")


def gen_mensuration(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        l, w, h = 10 + v, 5 + v, 4
        ans = l * w * h
        q = f"Cuboid {l}×{w}×{h} cm. Volume?"
        sol = f"Step 1: {l}×{w}×{h} = {ans} cm³."
        return finalize(order, q, ans, [2 * (l + w), l + w + h, ans // 2], sol, "V = lwh.")
    if t == 1:
        r, h = 7 + v, 10
        ans = round(22 / 7 * r ** 2 * h, 1)
        q = f"Cylinder r={r} cm, h={h} cm. Volume (π=22/7)?"
        sol = f"Step 1: πr²h = {ans} cm³."
        return finalize(order, q, ans, [2 * 22 / 7 * r * h, r * h, ans / 2], sol, "πr²h.")
    if t == 2:
        side = 6 + v
        ans = side ** 3
        q = f"Cube edge {side} cm. Volume?"
        sol = f"Step 1: {side}³ = {ans} cm³."
        return finalize(order, q, ans, [6 * side ** 2, side ** 2, side * 3], sol, "V = a³.")
    if t == 3:
        r = 3 + v
        ans = round(4 / 3 * 22 / 7 * r ** 3, 1)
        q = f"Sphere radius {r} cm. Volume (π=22/7)?"
        sol = f"Step 1: (4/3)πr³ = {ans} cm³."
        return finalize(order, q, ans, [4 * 22 / 7 * r ** 2, 22 / 7 * r ** 2, ans / 2], sol, "(4/3)πr³.")
    if t == 4:
        r, h = 14, 5 + v
        ans = round(22 / 7 * r * h + 2 * 22 / 7 * r ** 2, 1)
        q = f"Cylinder r={r}, h={h}. Total surface area (π=22/7)?"
        sol = f"Step 1: 2πr(h+r) = {ans} cm²."
        return finalize(order, q, ans, [22 / 7 * r ** 2, 2 * 22 / 7 * r * h, ans / 2], sol, "TSA cylinder.")
    if t == 5:
        a = 12 + v
        ans = 6 * a ** 2
        q = f"Cube surface area if volume is {a ** 3} cm³?"
        sol = f"Step 1: Edge = {a}. SA = 6×{a}² = {ans} cm²."
        return finalize(order, q, ans, [a ** 2, 4 * a ** 2, ans // 6], sol, "6a².")
    if t == 6:
        r = 10 + v
        ans = round(22 / 7 * r ** 2, 1)
        q = f"Cone circular base radius {r}. Base area?"
        sol = f"Step 1: πr² = {ans} cm²."
        return finalize(order, q, ans, [2 * 22 / 7 * r, r, ans * 2], sol, "πr².")
    # t==7
    l, b = 20 + v * 2, 10 + v
    h = 5
    ans = 2 * (l * b + b * h + l * h)
    q = f"Cuboid {l}×{b}×{h}. Total surface area?"
    sol = f"Step 1: 2(lb+bh+lh) = {ans} cm²."
    return finalize(order, q, ans, [l * b * h, l + b + h, ans // 2], sol, "TSA cuboid.")


def gen_logarithms(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        ans = 2 + v
        q = f"If log₂(x) = {ans}, x = ?"
        x = 2 ** ans
        sol = f"Step 1: x = 2^{ans} = {x}."
        return finalize(order, q, x, [ans, 2 * ans, ans ** 2], sol, "Convert to exponential.")
    if t == 1:
        ans = 3 + v
        q = f"log₁₀(1000) + log₁₀(10) = ?"
        val = 3 + 1
        sol = f"Step 1: 3 + 1 = {val}."
        return finalize(order, q, val, [4, 30, 1000], sol, "log10 powers of 10.")
    if t == 2:
        ans = 1
        q = f"log_a(a) = ? (for valid base a > 0, a ≠ 1)"
        sol = f"Step 1: Any log base a of a equals 1."
        return finalize(order, q, ans, [0, 2, -1], sol, "Identity log_a(a)=1.")
    if t == 3:
        ans = 0
        q = f"log₅(1) = ?"
        sol = f"Step 1: log(1) = 0 for any base."
        return finalize(order, q, ans, [1, 5, -1], sol, "log(1)=0.")
    if t == 4:
        ans = 4 + v
        q = f"log₂(16) × log₄(2) = ?"
        val = 4 * 0.5
        sol = f"Step 1: 4 × 0.5 = {val}."
        return finalize(order, q, val, [2, 8, 16], sol, "Evaluate each log.")
    if t == 5:
        ans = 2 + v
        q = f"If log(x) = {ans} (base 10), x = ?"
        x = 10 ** ans
        sol = f"Step 1: x = 10^{ans} = {x}."
        return finalize(order, q, x, [ans, ans * 10, x // 10], sol, "Antilog.")
    if t == 6:
        ans = 5 + v
        q = f"log₂(32) + log₂(2) = ?"
        val = 5 + 1
        sol = f"Step 1: 5 + 1 = {val}."
        return finalize(order, q, val, [6, 32, 10], sol, "log product rule special.")
    # t==7
    ans = 3
    q = f"Solve: log₃(x) = 2. x = ?"
    sol = f"Step 1: x = 3² = 9."
    return finalize(order, q, 9, [6, 3, 27], sol, "Exponential form.")


def gen_perm_comb(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8

    def fact(n):
        r = 1
        for i in range(2, n + 1):
            r *= i
        return r

    def ncr(n, r):
        return fact(n) // (fact(r) * fact(n - r))

    def npr(n, r):
        return fact(n) // fact(n - r)

    if t == 0:
        ans = ncr(5 + v, 2)
        q = f"Combinations: choose 2 from {5 + v}?"
        sol = f"Step 1: C({5 + v},2) = {ans}."
        return finalize(order, q, ans, [npr(5 + v, 2), (5 + v) ** 2, ans + 2], sol, "nCr formula.")
    if t == 1:
        ans = npr(5 + v, 2)
        q = f"Arrangements: 2 from {5 + v} in order?"
        sol = f"Step 1: P({5 + v},2) = {ans}."
        return finalize(order, q, ans, [ncr(5 + v, 2), (5 + v) * 2, ans // 2], sol, "nPr formula.")
    if t == 2:
        ans = fact(4 + v % 3)
        n = 4 + v % 3
        q = f"How many ways to arrange {n} distinct books?"
        sol = f"Step 1: {n}! = {ans}."
        return finalize(order, q, ans, [n ** 2, n * (n - 1), ans // 2], sol, "n! permutations.")
    if t == 3:
        ans = ncr(6 + v, 3)
        q = f"Choose committee of 3 from {6 + v} people?"
        sol = f"Step 1: C({6 + v},3) = {ans}."
        return finalize(order, q, ans, [npr(6 + v, 3), 6 + v, ans + 5], sol, "Combination.")
    if t == 4:
        ans = 2 ** (3 + v % 3)
        q = f"Binary strings of length {3 + v % 3}?"
        sol = f"Step 1: 2^{3 + v % 3} = {ans}."
        return finalize(order, q, ans, [3 + v, fact(3 + v), ans * 2], sol, "2^n binary strings.")
    if t == 5:
        ans = ncr(4 + v, 2) * ncr(3, 2)
        q = f"Team of 2 boys (from {4 + v}) and 2 girls (from 3)?"
        sol = f"Step 1: C({4 + v},2)×C(3,2) = {ans}."
        return finalize(order, q, ans, [ncr(7 + v, 4), 12, ans + 3], sol, "Multiply independent choices.")
    if t == 6:
        n = 5 + v
        ans = ncr(n, 1)
        q = f"Ways to select 1 item from {n}?"
        sol = f"Step 1: C(n,1) = {ans}."
        return finalize(order, q, ans, [n - 1, fact(n), 1], sol, "nC1 = n.")
    # t==7
    ans = ncr(8 + v, 0)
    q = f"Value of C({8 + v}, 0)?"
    sol = f"Step 1: Choosing none = 1 way."
    return finalize(order, q, ans, [0, 8 + v, 1], sol, "nC0 = 1.")


def gen_probability(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        ans = f"1/6"
        q = f"Fair die: P(getting {1 + v % 6})?"
        sol = f"Step 1: One favorable of six → 1/6."
        return finalize(order, q, ans, ["1/3", "1/2", "1/36"], sol, "Single die outcome.")
    if t == 1:
        ans = f"1/2"
        q = f"Fair coin: P(head)?"
        sol = f"Step 1: 1 of 2 outcomes → 1/2."
        return finalize(order, q, ans, ["1/4", "1", "0"], sol, "Equally likely.")
    if t == 2:
        ans = f"2/6"
        q = f"Die: P(even number)?"
        sol = f"Step 1: {2}/6 even outcomes → 1/3."
        return finalize(order, q, "1/3", ["1/6", "2/3", "1/2"], sol, "Count favorable.")
    if t == 3:
        ans = f"1/52"
        q = f"Standard deck: P(picking Ace)?"
        sol = f"Step 1: 4 Aces / 52 cards = 1/13."
        return finalize(order, q, "1/13", ["1/52", "4/52", "1/4"], sol, "4/52 = 1/13.")
    if t == 4:
        ans = f"1/36"
        q = f"Two dice: P(sum = 7)?"
        sol = f"Step 1: 6 ways / 36 total = 1/6."
        return finalize(order, q, "1/6", ["1/36", "7/36", "1/12"], sol, "Count sum-7 pairs.")
    if t == 5:
        red, total = 3 + v, 10 + v
        ans = f"{red}/{total}"
        q = f"Bag: {red} red, {total - red} blue balls. P(red)?"
        sol = f"Step 1: {red}/{total}."
        return finalize(order, q, ans, [f"{total - red}/{total}", "1/2", f"1/{total}"], sol, "Favorable/total.")
    if t == 6:
        ans = 0
        q = f"Impossible event probability?"
        sol = f"Step 1: P(impossible) = 0."
        return finalize(order, q, ans, [1, "1/2", -1], sol, "Empty event.")
    # t==7
    ans = 1
    q = f"Certain event probability?"
    sol = f"Step 1: P(certain) = 1."
    return finalize(order, q, ans, [0, "1/2", 2], sol, "Whole sample space.")


def gen_crypt(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    puzzles = [
        ("SEND + MORE = MONEY", "9567 + 1085 = 10652", "9567"),
        ("BASE + BALL = GAMES", "1998 + 1998 = 3996", "1998"),
        ("CROSS + ROADS = DANGER", "96233 + 96233 = 192466", "96233"),
        ("TWO + TWO = FOUR", "876 + 876 = 1752", "876"),
        ("ONE + ONE = TWO", "567 + 567 = 1134", "567"),
        ("SUN + FUN = SWIM", "958 + 958 = 1916", "958"),
        ("ABC + ABC = CBA", "123 + 123 = 246", "123"),
        ("AA + BB = CC", "11 + 22 = 33", "11"),
    ]
    idx = (t + v) % len(puzzles)
    name, eq, key = puzzles[idx]
    q = f"In {name}, if {name.split('=')[0].strip()} uses distinct digits, which value fits the leading letter pattern? (Answer: numeric value of first word)"
    sol = f"Step 1: Classic puzzle {eq}. First number ≈ {key}."
    ans = key
    return finalize(order, q, ans, [str(int(key) + 100), str(int(key) - 50), str(int(key) // 2)], sol, "Cryptarithmetic trial.")


def gen_stats(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        data = [2 + v, 4 + v, 6 + v, 8 + v, 10 + v]
        ans = sum(data) / len(data)
        q = f"Mean of {data}?"
        sol = f"Step 1: Sum={sum(data)}, n=5. Mean={ans}."
        return finalize(order, q, ans, [data[2], sum(data), ans + 1], sol, "Sum/n.")
    if t == 1:
        data = sorted([3 + v, 7 + v, 5 + v, 9 + v, 1 + v])
        ans = data[2]
        q = f"Median of {data}?"
        sol = f"Step 1: Sorted middle = {ans}."
        return finalize(order, q, ans, [data[0], data[-1], sum(data) // 5], sol, "Middle value.")
    if t == 2:
        data = [2, 2, 3 + v, 5, 5, 5]
        ans = 5
        q = f"Mode of {data}?"
        sol = f"Step 1: 5 appears most → mode = 5."
        return finalize(order, q, ans, [2, 3 + v, 4], sol, "Most frequent.")
    if t == 3:
        mean, n, new = 20 + v, 5, 30 + v
        new_mean = (mean * n + new) / (n + 1)
        q = f"5 numbers mean {mean}. Add {new}. New mean?"
        sol = f"Step 1: ({mean}×5+{new})/6 = {new_mean}."
        return finalize(order, q, round(new_mean, 1), [mean, new, mean + 2], sol, "Update mean.")
    if t == 4:
        data = [10 + v, 12 + v, 14 + v]
        mean = sum(data) / 3
        var = sum((x - mean) ** 2 for x in data) / 3
        q = f"Variance of {data} (population)?"
        sol = f"Step 1: Mean={mean:.1f}. Variance={var:.2f}."
        return finalize(order, q, round(var, 2), [round(mean, 2), round(var + 1, 2), 0], sol, "Avg squared deviation.")
    if t == 5:
        var = 4 + v
        ans = round(math.sqrt(var), 2)
        q = f"If variance = {var}, standard deviation?"
        sol = f"Step 1: SD = √{var} = {ans}."
        return finalize(order, q, ans, [var, var ** 2, ans + 1], sol, "SD = √variance.")
    if t == 6:
        ans = 6 + v
        q = f"Range of data min {2 + v}, max {ans}?"
        sol = f"Step 1: Range = {ans} − {2 + v} = {ans - (2 + v)}."
        return finalize(order, q, ans - (2 + v), [ans, 2 + v, ans + 2 + v], sol, "Max − min.")
    # t==7
    data = [1, 2, 3, 4, 100 + v]
    med = 3
    q = f"Median of {data} (5 values)?"
    sol = f"Step 1: Sorted median = {med}."
    return finalize(order, q, med, [100 + v, 4, 2], sol, "Robust to outlier.")


def gen_variance(order: int) -> dict:
    return gen_stats(order + 1000)  # reuse with offset templates


def gen_data_suff(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    opts = [
        ("Is x > 0? (1) x² = 4 (2) x = 2", "D", "Both needed: x=±2, need sign"),
        ("What is n? (1) 2n = 10 (2) n + 1 = 6", "A", "Statement 1 alone: n=5"),
        ("Is n even? (1) n divisible by 2 (2) n = 4k", "A", "Statement 1 sufficient"),
        ("Area of rectangle? (1) length 5 (2) width 3", "C", "Both needed for area"),
        ("Is a > b? (1) a − b = 1 (2) b − a = −1", "D", "Either alone sufficient"),
        ("Value of x+y? (1) x=3 (2) y=4", "C", "Need both sums"),
        ("Is triangle right? (1) sides 3,4,5 (2) angle 90°", "A", "3-4-5 sufficient"),
        ("Profit percent? (1) CP 100 (2) SP 120", "C", "Need both CP and SP"),
    ]
    idx = (t + v) % len(opts)
    qtext, ans, reason = opts[idx]
    sol = f"Step 1: Test each statement. Step 2: {reason}. Answer: {ans}."
    letters_map = {"A": "Statement 1 alone", "B": "Statement 2 alone", "C": "Both together", "D": "Each alone sufficient", "E": "Neither"}
    q = qtext
    traps = [x for x in "ABCDE" if x != ans][:3]
    return finalize(order, q, ans, traps, sol, "Data sufficiency logic.")


def gen_qty_compare(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    pairs = [
        ("Quantity A: 3/4 of 80", "Quantity B: 60", "Equal", "Both 60"),
        ("Quantity A: √64", "Quantity B: 9", "B", "8 < 9"),
        ("Quantity A: 15% of 200", "Quantity B: 25% of 120", "Equal", "Both 30"),
        ("Quantity A: 2³", "Quantity B: 3²", "B", "8 < 9"),
        ("Quantity A: perimeter of square side 5", "Quantity B: 20", "Equal", "Both 20"),
        ("Quantity A: 1/2 + 1/3", "Quantity B: 5/6", "Equal", "Both 5/6"),
        ("Quantity A: area circle r=1 (π)", "Quantity B: 3", "A", "π > 3"),
        ("Quantity A: 7!", "Quantity B: 5040", "Equal", "7! = 5040"),
    ]
    idx = (t + v) % len(pairs)
    qa, qb, ans, reason = pairs[idx]
    q = f"Compare:\n{qa}\n{qb}"
    sol = f"Step 1: Evaluate A and B. Step 2: {reason}. Answer: {ans}."
    traps = [x for x in ["A", "B", "Equal", "Cannot determine"] if x != ans][:3]
    return finalize(order, q, ans, traps, sol, "Quantity comparison.")


GENERATORS = {
    "algebra": gen_algebra,
    "equations": gen_equations,
    "inequalities": gen_inequalities,
    "progressions": gen_progressions,
    "geometry": gen_geometry,
    "coordinate-geometry": gen_coordinate,
    "mensuration": gen_mensuration,
    "logarithms": gen_logarithms,
    "permutation-combination": gen_perm_comb,
    "probability": gen_probability,
    "cryptarithmetic": gen_crypt,
    "mean-median-mode": gen_stats,
    "variance-standard-deviation": gen_stats,
    "data-sufficiency": gen_data_suff,
    "quantity-comparison": gen_qty_compare,
}
