"""Number system question generator."""
from __future__ import annotations

import math
from generators.base import *
from generators.base import lcm_list


def gen_number_system(order: int) -> dict:
    r = rng_for("number-system", order)
    t = (order - 21) % 16
    v = (order - 21) // 16
    if t == 0:
        base, exp = r.choice([2, 3, 7, 8, 9]), 20 + v * 11 + order
        ans = unit_digit(base, exp)
        q = f"What is the unit digit of {base}^{exp}?"
        sol = f"Step 1: Find the cycle of unit digits for {base}. Step 2: Compute {exp} mod cycle length. Step 3: The unit digit is {ans}."
        return finalize(order, q, ans, [ans + 2, (ans + 5) % 10, (ans + 7) % 10], sol, f"Use cyclicity of {base}.")
    if t == 1:
        n, d = 40 + v * 17 + order, 7 + (v % 5)
        rem = n % d
        q = f"What is the remainder when {n} is divided by {d}?"
        sol = f"Step 1: {d} × {n // d} = {d * (n // d)}. Step 2: {n} − {d * (n // d)} = {rem}."
        return finalize(order, q, rem, [rem + 1, rem - 1 if rem else d - 1, d], sol, f"{n} mod {d} = {rem}.")
    if t == 2:
        nums = [72, 84, 90, 120, 144, 180, 210, 240, 360, 420, 504, 540, 600, 720, 840, 900]
        n = nums[v % len(nums)] + (order % 7) * 11
        ans = count_factors(n)
        pf = prime_factors(n)
        q = f"How many factors does {n} have?"
        sol = f"Step 1: {n} = " + " × ".join(f"{p}^{e}" for p, e in pf.items()) + f". Step 2: Multiply (power+1) values → {ans}."
        return finalize(order, q, ans, [ans - 1, ans + 2, ans + 4], sol, "Factors = product of (exponent+1).")
    if t == 3:
        n = 30 + v * 15 + order
        ans = trailing_zeros(n)
        q = f"How many trailing zeros are in {n}!?"
        sol = f"Step 1: ⌊{n}/5⌋ = {n // 5}. Step 2: ⌊{n}/25⌋ = {n // 25}. Step 3: Total = {ans}."
        traps = [n // 5, ans + 1, ans + 2] if n // 5 != ans else [ans + 1, ans + 2, ans - 1]
        return finalize(order, q, ans, traps, sol, "Count powers of 5 in n!.")
    if t == 4:
        limit, k = 80 + v * 20, 4 + (v % 6)
        ans = limit // k
        q = f"How many numbers from 1 to {limit} are divisible by {k}?"
        sol = f"Step 1: Multiples of {k} up to {limit} = ⌊{limit}/{k}⌋ = {ans}."
        return finalize(order, q, ans, [ans - 1, ans + 1, k], sol, f"⌊{limit}/{k}⌋.")
    if t == 5:
        nums = [48, 60, 72, 80, 96, 108, 120, 144, 168, 192, 216, 240, 280, 300, 360, 400]
        n = nums[v % len(nums)] + order % 13
        ans = sum_of_factors(n)
        q = f"What is the sum of all factors of {n}?"
        sol = f"Step 1: Prime factorise {n}. Step 2: Apply sum-of-factors formula. Step 3: Sum = {ans}."
        return finalize(order, q, ans, [ans - n, ans + 12, ans // 2], sol, "Use σ(n) from prime powers.")
    if t == 6:
        div, quot, rem = 8 + v, 5 + v, 2 + (v % 4)
        ans = div * quot + rem
        q = f"A number divided by {div} gives quotient {quot} and remainder {rem}. Find the number."
        sol = f"Step 1: Number = {div} × {quot} + {rem} = {ans}."
        return finalize(order, q, ans, [div * quot, ans + 1, ans - rem], sol, "N = dq + r.")
    if t == 7:
        a, b, c = 11 + v, 12 + v, 13 + v
        m = 5 + (v % 4)
        ans = (a * b * c) % m
        q = f"Find the remainder when {a} × {b} × {c} is divided by {m}."
        sol = f"Step 1: Reduce: {a % m}×{b % m}×{c % m} = {(a % m) * (b % m) * (c % m)}. Step 2: {((a % m) * (b % m) * (c % m))} mod {m} = {ans}."
        return finalize(order, q, ans, [(a + b + c) % m, ans + 1, m - 1], sol, "Reduce each factor mod m first.")
    if t == 8:
        limit = 100 + v * 25
        a, b = 3, 5
        ans = limit // a + limit // b - limit // (a * b)
        q = f"How many integers from 1 to {limit} are divisible by {a} or {b}?"
        sol = f"Step 1: By {a}: {limit // a}. By {b}: {limit // b}. Both: {limit // 15}. Step 2: {limit // a}+{limit // b}−{limit // 15} = {ans}."
        return finalize(order, q, ans, [limit // a + limit // b, ans - 2, ans + 3], sol, "Inclusion–exclusion.")
    if t == 9:
        n = 1000 + v * 111 + order
        ans = sum(int(d) for d in str(n))
        q = f"What is the sum of digits of {n}?"
        sol = f"Step 1: Add digits of {n}. Step 2: Sum = {ans}."
        return finalize(order, q, ans, [ans + 1, ans - 1, ans + 3], sol, "Add each digit.")
    if t == 10:
        base, exp, mod = 2 + (v % 3), 30 + v * 7, 7
        ans = pow(base, exp, mod)
        q = f"What is the remainder when {base}^{exp} is divided by {mod}?"
        sol = f"Step 1: Use Fermat/Euler or cycle of {base} mod {mod}. Step 2: Remainder = {ans}."
        return finalize(order, q, ans, [ans + 1, mod - 1, 0], sol, f"{base}^k mod {mod} cycles.")
    if t == 11:
        n = 20 + v * 8
        ans = sum(n // (2 ** i) for i in range(1, 20) if 2 ** i <= n)
        q = f"What is the largest power of 2 dividing {n}!? (Answer as exponent k where 2^k || {n}!)"
        # actually count factors of 2 in n!
        ans = sum(n // (2 ** i) for i in range(1, 30))
        q = f"How many times does 2 appear as a factor in {n}!?"
        sol = f"Step 1: ⌊{n}/2⌋+⌊{n}/4⌋+⌊{n}/8⌋+... = {ans}."
        return finalize(order, q, ans, [n // 2, ans + 2, ans - 1], sol, "Legendre's formula for prime 2.")
    if t == 12:
        n = 12 + v * 3
        ans = sum(1 for x in range(1, n) if hcf(x, n) == 1)
        q = f"How many numbers less than {n} are coprime to {n}?"
        sol = f"Step 1: Use φ({n}) by listing or formula. Step 2: Count = {ans}."
        return finalize(order, q, ans, [ans - 1, n - 2, ans + 2], sol, f"Euler totient φ({n}).")
    if t == 13:
        k = 6 + v
        ans = lcm_list(range(1, k + 1))
        q = f"What is the LCM of all integers from 1 to {k}?"
        sol = f"Step 1: LCM(1..{k}) = {ans}."
        return finalize(order, q, ans, [ans // 2, ans + k, k * (k + 1)], sol, "LCM of 1..k.")
    if t == 14:
        n = (10 + v) ** 2 + order % 7
        root = int(math.isqrt(n))
        is_sq = root * root == n
        ans = "Yes" if is_sq else "No"
        q = f"Is {n} a perfect square?"
        sol = f"Step 1: √{n} ≈ {math.isqrt(n)}. Step 2: {root}² = {root * root}. Answer: {ans}."
        return finalize(order, q, ans, ["Yes" if ans == "No" else "No", "Cannot say", "Both"], sol, "Check if sqrt is integer.")
    # t == 15
    n = 90 + v * 15 + order
    odd = 1
    pf = prime_factors(n)
    for p, e in pf.items():
        if p != 2:
            odd *= (e + 1)
    ans = odd
    q = f"How many odd factors does {n} have?"
    sol = f"Step 1: Remove all factors of 2 from {n}. Step 2: Count odd factors = {ans}."
    return finalize(order, q, ans, [count_factors(n), ans + 2, ans - 1], sol, "Ignore powers of 2.")

