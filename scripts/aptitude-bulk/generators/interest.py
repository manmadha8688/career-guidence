"""Interest and growth topic generators."""
from __future__ import annotations

import math
from generators.base import *


def gen_si(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        p, r, t_y = 5000 + v * 500, 8 + v, 2
        ans = round(p * r * t_y / 100)
        q = f"SI on ₹{p} at {r}% for {t_y} years?"
        sol = f"Step 1: PRT/100 = {ans}."
        return finalize(order, q, ans, [round(p * r / 100), p + ans, ans * 2], sol, "SI = PRT/100.")
    if t == 1:
        si, r, t_y = 1200 + v * 100, 12, 2
        p = round(si * 100 / (r * t_y))
        q = f"SI ₹{si} at {r}% for {t_y} years. Principal?"
        sol = f"Step 1: P = SI×100/(RT) = {p}."
        return finalize(order, q, p, [si, si * 2, round(si / r)], sol, "P = SI×100/RT.")
    if t == 2:
        p, si = 8000 + v * 400, 1600 + v * 80
        r = round(si * 100 / (p * 2))
        q = f"₹{p} yields SI ₹{si} in 2 years. Rate %?"
        sol = f"Step 1: R = SI×100/(PT) = {r}%."
        return finalize(order, q, f"{r}%", [f"{r + 2}%", f"{si}%", "10%"], sol, "R = 100×SI/(PT).")
    if t == 3:
        p, r = 10000 + v * 1000, 10
        ans = round(p * (1 + r / 100 * 3))
        q = f"₹{p} at {r}% SI for 3 years. Amount?"
        si = round(p * r * 3 / 100)
        sol = f"Step 1: SI = {si}. Amount = {ans}."
        return finalize(order, q, ans, [p + r, si, p + si * 2], sol, "Amount = P + SI.")
    if t == 4:
        p1, p2 = 5000, 8000 + v * 500
        r1, r2 = 10, 8
        diff = round(p2 * r2 / 100 - p1 * r1 / 100)
        q = f"Which yields more SI in 1 year: ₹{p1} at {r1}% or ₹{p2} at {r2}%?"
        si1, si2 = round(p1 * r1 / 100), round(p2 * r2 / 100)
        ans = "Second" if si2 > si1 else "First"
        sol = f"Step 1: SI1={si1}, SI2={si2}. {ans} is greater."
        return finalize(order, q, ans, ["First" if ans == "Second" else "Second", "Equal", "Cannot say"], sol, "Compare P×R.")
    if t == 5:
        p, r, t_m = 6000 + v * 200, 12, 6
        ans = round(p * r * t_m / (100 * 12))
        q = f"SI on ₹{p} at {r}% for {t_m} months?"
        sol = f"Step 1: T = {t_m}/12 year. SI = {ans}."
        return finalize(order, q, ans, [round(p * r / 100), ans * 2, p // 12], sol, "Convert months to years.")
    if t == 6:
        ans = 4000 + v * 500
        r, t_y = 5, 4
        p = round(ans * 100 / (r * t_y))
        q = f"SI is ₹{ans} at {r}% for {t_y} years. Principal?"
        sol = f"Step 1: P = {ans}×100/({r}×{t_y}) = {p}."
        return finalize(order, q, p, [ans, ans * 2, ans // 2], sol, "Reverse SI formula.")
    # t==7
    p = 12000 + v * 1000
    r = 15
    half = round(p * r / 200)
    q = f"Find SI on ₹{p} at {r}% for 6 months."
    sol = f"Step 1: 6 mo = 0.5 yr. SI = {half}."
    return finalize(order, q, half, [round(p * r / 100), p // 10, half * 2], sol, "Half year time.")


def gen_ci(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        p, r, n = 10000 + v * 1000, 10, 2
        ans = round(p * (1 + r / 100) ** n)
        q = f"CI on ₹{p} at {r}% for {n} years (annual)?"
        sol = f"Step 1: A = P(1+R/100)^n = {ans}."
        return finalize(order, q, ans, [round(p * (1 + r / 100)), p + round(p * r / 100) * n, ans + 500], sol, "CI formula.")
    if t == 1:
        p, r = 8000 + v * 500, 20
        ci = round(p * (1.2 ** 2 - 1))
        q = f"CI on ₹{p} at {r}% for 2 years?"
        sol = f"Step 1: A = {p}×1.2² = {round(p * 1.44)}. CI = {ci}."
        return finalize(order, q, ci, [round(p * r / 100 * 2), round(p * 0.2), ci + 200], sol, "CI = A − P.")
    if t == 2:
        p, r, n = 5000 + v * 500, 10, 3
        si = round(p * r * n / 100)
        ci = round(p * ((1 + r / 100) ** n - 1))
        q = f"Difference CI − SI on ₹{p} at {r}% for {n} years?"
        diff = ci - si
        sol = f"Step 1: CI={ci}, SI={si}. Diff={diff}."
        return finalize(order, q, diff, [ci, si, 0], sol, "CI > SI for n>1.")
    if t == 3:
        p = 16000 + v * 1000
        r = 25
        half_ci = round(p * (math.sqrt(1.25) - 1))
        q = f"CI on ₹{p} at {r}% for 1 year compounded half-yearly?"
        rate = r / 2
        ans = round(p * (1 + rate / 100) ** 2 - p)
        sol = f"Step 1: Half-yearly rate {rate}%. CI ≈ {ans}."
        return finalize(order, q, ans, [round(p * r / 100), ans + 100, round(p * 0.125)], sol, "Split compounding periods.")
    if t == 4:
        amount = 12100 + v * 500
        r, n = 10, 2
        p = round(amount / (1.1 ** n))
        q = f"Amount ₹{amount} at {r}% CI for {n} years. Principal?"
        sol = f"Step 1: P = {amount}/1.1² = {p}."
        return finalize(order, q, p, [amount - 2100, 10000, amount // 2], sol, "Reverse CI.")
    if t == 5:
        p, r = 1000 + v * 200, 5
        ans = round(p * (1.05 ** 3 - 1))
        q = f"CI on ₹{p} at {r}% for 3 years?"
        sol = f"Step 1: CI = {p}(1.05³−1) = {ans}."
        return finalize(order, q, ans, [round(p * 0.05 * 3), round(p * 0.15), ans + 10], sol, "Use power formula.")
    if t == 6:
        p = 20000 + v * 2000
        r = 8
        ans = round(p * (1.08 ** 2))
        q = f"Population {p} grows {r}% annually. After 2 years?"
        sol = f"Step 1: {p}×1.08² = {ans}."
        return finalize(order, q, ans, [round(p * 1.16), p + 2 * r * p // 100, ans - 500], sol, "CI model for growth.")
    # t==7
    p, r = 6400 + v * 400, 25
    n = 2
    ci = round(p * (1.25 ** n - 1))
    q = f"CI on ₹{p} at {r}% for {n} years?"
    sol = f"Step 1: A = {p}×1.25². CI = {ci}."
    return finalize(order, q, ci, [round(p * r / 100 * n), round(p * 0.5), ci // 2], sol, "Quarter rate 25%.")


def gen_depreciation(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        val, rate, yrs = 50000 + v * 5000, 10, 2
        ans = round(val * (0.9 ** yrs))
        q = f"Machine ₹{val} depreciates {rate}% annually. Value after {yrs} years?"
        sol = f"Step 1: {val}×0.9^{yrs} = {ans}."
        return finalize(order, q, ans, [val - rate * yrs * 100, round(val * 0.8), val - 10000], sol, "Multiply retention factor.")
    if t == 1:
        val, g, yrs = 10000 + v * 1000, 20, 2
        ans = round(val * (1.2 ** yrs))
        q = f"Investment ₹{val} grows {g}% p.a. Value after {yrs} years?"
        sol = f"Step 1: {val}×1.2^{yrs} = {ans}."
        return finalize(order, q, ans, [val + 2 * g * val // 100, round(val * 1.4), val * 2], sol, "Compound growth.")
    if t == 2:
        pop, dec = 80000 + v * 5000, 5
        ans = round(pop * 0.95)
        q = f"Town population {pop} declines {dec}% in a year. New population?"
        sol = f"Step 1: {pop}×0.95 = {ans}."
        return finalize(order, q, ans, [pop - dec, pop - 5000, round(pop * 0.9)], sol, "Depreciation model.")
    if t == 3:
        p, r, n = 20000, 10, 3
        ans = round(p * (1 - r / 100) ** n)
        q = f"Asset ₹{p} depreciates {r}% yearly for {n} years. Value?"
        sol = f"Step 1: {p}×0.9^{n} = {ans}."
        return finalize(order, q, ans, [p - n * r * p // 100, round(p * 0.7), p // 2], sol, "Repeated depreciation.")
    if t == 4:
        v0, g = 1000 + v * 100, 15
        ans = round(v0 * 1.15)
        q = f"Revenue ₹{v0} grows {g}% next quarter. New revenue?"
        sol = f"Step 1: {v0}×1.{g} = {ans}."
        return finalize(order, q, ans, [v0 + g, v0 * 2, v0 + 150], sol, "Single period growth.")
    if t == 5:
        car, dep = 600000 + v * 50000, 15
        ans = round(car * (0.85 ** 2))
        q = f"Car ₹{car} depreciates {dep}% per year. Value after 2 years?"
        sol = f"Step 1: {car}×0.85² = {ans}."
        return finalize(order, q, ans, [car - 2 * dep * car // 100, round(car * 0.7), car // 2], sol, "Two-year depreciation.")
    if t == 6:
        initial, final = 10000 + v * 1000, 12100 + v * 100
        g = round((final / initial - 1) * 100)
        q = f"Value grows from ₹{initial} to ₹{final} in 2 years. Approx annual growth %?"
        r = round((math.sqrt(final / initial) - 1) * 100)
        sol = f"Step 1: (Final/Initial)^(1/2)−1 ≈ {r}%."
        return finalize(order, q, f"{r}%", [f"{g}%", "10%", "20%"], sol, "CAGR formula.")
    # t==7
    salary = 40000 + v * 4000
    inc = 8
    ans = round(salary * (1.08 ** 3))
    q = f"Salary ₹{salary} rises {inc}% annually. After 3 years?"
    sol = f"Step 1: {salary}×1.08³ = {ans}."
    return finalize(order, q, ans, [salary + 3 * inc * salary // 100, round(salary * 1.24), salary * 2], sol, "Compound salary growth.")


GENERATORS = {
    "simple-interest": gen_si,
    "compound-interest": gen_ci,
    "depreciation-growth": gen_depreciation,
}
