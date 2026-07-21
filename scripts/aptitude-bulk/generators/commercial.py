"""Commercial maths topic generators."""
from __future__ import annotations

import math
from generators.base import *


def _pct(order: int, topic: str) -> dict:
    t = (order - 21) % 10
    v = (order - 21) // 10
    if t == 0:
        pct, base = 15 + v, 200 + order * 2
        ans = round(pct / 100 * base)
        q = f"What is {pct}% of {base}?"
        sol = f"Step 1: {pct}/100 × {base} = {ans}."
        return finalize(order, q, ans, [round(base / pct), pct + base, ans + 5], sol, f"{pct}% = {pct}/100.")
    if t == 1:
        old, new = 400 + v * 50, 460 + v * 50
        ans = round((new - old) / old * 100)
        q = f"A value increases from {old} to {new}. Find the percentage increase."
        sol = f"Step 1: Increase = {new - old}. Step 2: ({new - old}/{old})×100 = {ans}%."
        return finalize(order, q, f"{ans}%", [f"{ans + 5}%", f"{ans - 5}%", f"{new - old}%"], sol, "Inc% = change/original×100.")
    if t == 2:
        val, dec = 800 + v * 100, 20 + v
        ans = round(val * (1 - dec / 100))
        q = f"Decrease {val} by {dec}%. What is the result?"
        sol = f"Step 1: {dec}% of {val} = {round(val * dec / 100)}. Step 2: {val} − ... = {ans}."
        return finalize(order, q, ans, [val - dec, val + dec, round(val * dec / 100)], sol, "New = old × (1 − p/100).")
    if t == 3:
        a, b = 25 + v, 75 - v
        ans = round(a / (a + b) * 100)
        q = f"In a class, {a} students passed and {b} failed. What percent passed?"
        sol = f"Step 1: Total = {a + b}. Step 2: {a}/{a + b}×100 = {ans}%."
        return finalize(order, q, f"{ans}%", [f"{100 - ans}%", f"{a}%", f"{b}%"], sol, "Part/whole × 100.")
    if t == 4:
        x = 100 + v * 20
        ans = round(x / 0.8)
        q = f"After 20% discount, price is ₹{x}. Find original price."
        sol = f"Step 1: x = 80% of original. Step 2: Original = {x}/0.8 = {ans}."
        return finalize(order, q, ans, [round(x * 1.2), x + 20, round(x / 0.2)], sol, "Divide by (1 − discount%).")
    if t == 5:
        pop, growth = 5000 + v * 1000, 10 + v
        ans = round(pop * (1 + growth / 100))
        q = f"Population {pop} grows {growth}% in a year. New population?"
        sol = f"Step 1: {pop} × (1 + {growth}/100) = {ans}."
        return finalize(order, q, ans, [pop + growth, round(pop * growth / 100), ans + 100], sol, "Growth: multiply by (1+p/100).")
    if t == 6:
        num = 240 + v * 30
        ans = round(num / 1.2)
        q = f"Price after 20% increase is ₹{num}. Find original."
        sol = f"Step 1: Original × 1.2 = {num}. Step 2: Original = {ans}."
        return finalize(order, q, ans, [round(num * 0.8), num - 20, ans + 50], sol, "Divide by (1 + inc%).")
    if t == 7:
        a, b = 30 + v, 40 + v
        ans = round((b - a) / a * 100, 1)
        q = f"A salary rises from ₹{a}000 to ₹{b}000. Percent increase?"
        sol = f"Step 1: ({b}−{a})/{a}×100 = {ans}%."
        return finalize(order, q, f"{ans}%", [f"{b - a}%", f"{round(b / a * 100, 1)}%", f"{a}%"], sol, "Change/original.")
    if t == 8:
        p, r, t = 1000 + v * 500, 8 + v, 2
        ans = round(p * r * t / 100)
        q = f"Simple interest on ₹{p} at {r}% for {t} years?"
        sol = f"Step 1: SI = PRT/100 = {ans}."
        return finalize(order, q, ans, [round(p * r / 100), ans * 2, p + ans], sol, "SI = PRT/100.")
    # t==9 fraction to percent
    num, den = 3 + v % 4, 4 + v % 3
    ans = round(num / den * 100, 1)
    q = f"Express {num}/{den} as a percentage."
    sol = f"Step 1: {num}/{den} × 100 = {ans}%."
    return finalize(order, q, f"{ans}%", [f"{num}%", f"{den}%", f"{num + den}%"], sol, "Fraction × 100.")


def gen_percentages(order: int) -> dict:
    return _pct(order, "percentages")


def gen_profit_loss(order: int) -> dict:
    t = (order - 21) % 10
    v = (order - 21) // 10
    if t == 0:
        cp, sp = 400 + v * 50, 480 + v * 50
        ans = round((sp - cp) / cp * 100)
        q = f"CP=₹{cp}, SP=₹{sp}. Profit %?"
        sol = f"Step 1: Profit = {sp - cp}. Step 2: {sp - cp}/{cp}×100 = {ans}%."
        return finalize(order, q, f"{ans}%", [f"{sp - cp}%", f"{100 - ans}%", f"{round(sp / cp * 100)}%"], sol, "Profit% = profit/CP×100.")
    if t == 1:
        cp, loss = 500 + v * 40, 10 + v
        sp = round(cp * (1 - loss / 100))
        q = f"CP ₹{cp}, loss {loss}%. Find SP."
        sol = f"Step 1: SP = {cp}×(1−{loss}/100) = {sp}."
        return finalize(order, q, sp, [cp - loss, cp + loss, round(cp * loss / 100)], sol, "SP = CP(1 − loss%).")
    if t == 2:
        sp, profit = 660 + v * 20, 10
        cp = round(sp / 1.1)
        q = f"SP ₹{sp} at {profit}% profit. Find CP."
        sol = f"Step 1: CP = {sp}/1.{profit} = {cp}."
        return finalize(order, q, cp, [sp - profit, round(sp * 0.9), sp + 60], sol, "CP = SP/(1+profit%).")
    if t == 3:
        mp, disc = 1000 + v * 100, 15 + v
        sp = round(mp * (1 - disc / 100))
        q = f"MP ₹{mp}, discount {disc}%. SP?"
        sol = f"Step 1: SP = {mp}×(1−{disc}/100) = {sp}."
        return finalize(order, q, sp, [mp - disc, round(mp * disc / 100), mp + sp], sol, "SP = MP(1 − d%).")
    if t == 4:
        cp = 800 + v * 50
        ans = round(cp * 1.25)
        q = f"CP ₹{cp}. Sold at 25% profit. SP?"
        sol = f"Step 1: SP = {cp}×1.25 = {ans}."
        return finalize(order, q, ans, [cp + 25, round(cp * 0.25), cp + 125], sol, "SP = CP(1+25%).")
    if t == 5:
        a, b = 20 + v, 25 + v
        total_cp = 100
        ans = round((a + b) / 2, 1)
        q = f"Shopkeeper mixes two items with CP ratio {a}:{b}. Average CP per unit if equal quantities?"
        sol = f"Step 1: Equal qty → avg CP = ({a}+{b})/2 = {ans} per ratio unit."
        return finalize(order, q, ans, [a + b, a * b, b - a], sol, "Equal weights → arithmetic mean.")
    if t == 6:
        cp, sp = 240, 300 + v * 10
        ans = round((sp - cp) / cp * 100)
        q = f"Bought at ₹{cp}, sold at ₹{sp}. Profit %?"
        sol = f"Step 1: Profit {sp - cp}. Step 2: {ans}%."
        return finalize(order, q, f"{ans}%", [f"{sp - cp}%", f"{round(sp / cp * 100)}%", f"{cp}%"], sol, "Profit on CP.")
    if t == 7:
        cp = 450 + v * 30
        sp = round(cp * 0.9)
        q = f"Sold at 10% loss. CP ₹{cp}. SP?"
        sol = f"Step 1: SP = {cp}×0.9 = {sp}."
        return finalize(order, q, sp, [cp - 10, cp + 10, round(cp / 10)], sol, "Loss 10% → ×0.9.")
    if t == 8:
        cp1, cp2, sp = 100, 150 + v * 10, 140
        total_cp = cp1 + cp2
        ans = round((sp - total_cp) / total_cp * 100, 1)
        q = f"Two articles CP ₹{cp1} and ₹{cp2} sold together for ₹{sp}. Overall profit/loss %?"
        sol = f"Step 1: Total CP={total_cp}, SP={sp}. Step 2: {ans}%."
        return finalize(order, q, f"{ans}%", [f"{sp - total_cp}%", "0%", f"{round(sp / total_cp * 100)}%"], sol, "Combined P/L on total CP.")
    # t==9
    cp = 360 + v * 20
    false_wt, gain = 10, 20
    ans = round((cp * (1 + gain / 100) * (100 + false_wt) / 100 - cp) / cp * 100, 1)
    q = f"Uses false weight {false_wt}% more, claims {gain}% profit. Actual profit %?"
    effective = (1 + gain / 100) * (100 + false_wt) / 100
    actual = round((effective - 1) * 100, 1)
    sol = f"Step 1: Effective gain factor = {effective:.3f}. Step 2: Actual profit ≈ {actual}%."
    return finalize(order, q, f"{actual}%", [f"{gain}%", f"{gain + false_wt}%", f"{actual + 5}%"], sol, "False weight inflates SP.")


def gen_discount(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        mp, d = 1200 + v * 100, 10 + v
        sp = round(mp * (1 - d / 100))
        q = f"Marked price ₹{mp}, discount {d}%. Selling price?"
        sol = f"Step 1: SP = {mp}×(1−{d}/100) = {sp}."
        return finalize(order, q, sp, [mp - d, round(mp * d / 100), mp + sp], sol, "SP = MP(1−d%).")
    if t == 1:
        sp, d = 810 + v * 20, 10
        mp = round(sp / (1 - d / 100))
        q = f"After {d}% discount, SP is ₹{sp}. Marked price?"
        sol = f"Step 1: MP = {sp}/0.{100 - d} = {mp}."
        return finalize(order, q, mp, [sp + d, round(sp * 1.1), sp + 90], sol, "MP = SP/(1−d%).")
    if t == 2:
        mp, sp = 2000 + v * 50, 1700 + v * 40
        ans = round((mp - sp) / mp * 100)
        q = f"MP ₹{mp}, SP ₹{sp}. Discount %?"
        sol = f"Step 1: Discount = {mp - sp}. Step 2: {ans}%."
        return finalize(order, q, f"{ans}%", [f"{mp - sp}%", f"{round(sp / mp * 100)}%", f"{ans + 5}%"], sol, "d% = (MP−SP)/MP×100.")
    if t == 3:
        mp, d1, d2 = 1000 + v * 100, 10, 5
        sp = round(mp * 0.9 * 0.95)
        q = f"Successive discounts {d1}% and {d2}% on ₹{mp}?"
        sol = f"Step 1: {mp}×0.9×0.95 = {sp}."
        return finalize(order, q, sp, [round(mp * 0.85), mp - 150, round(mp * 0.95)], sol, "Multiply discount factors.")
    if t == 4:
        cp, mp = 800 + v * 50, 1000 + v * 50
        d = round((mp - cp) / mp * 100, 1)
        q = f"CP ₹{cp}, MP ₹{mp}. Discount % if sold at CP?"
        sol = f"Step 1: Need SP=CP. Discount on MP = ({mp}-{cp})/{mp}×100 = {d}%."
        return finalize(order, q, f"{d}%", [f"{round((mp - cp) / cp * 100)}%", "0%", f"{d + 5}%"], sol, "Discount from MP to CP.")
    if t == 5:
        mp = 1500 + v * 100
        sp = round(mp * 0.88)
        q = f"Laptop marked ₹{mp}, sold at 12% off. SP?"
        sol = f"Step 1: SP = {mp}×0.88 = {sp}."
        return finalize(order, q, sp, [mp - 12, round(mp * 0.12), mp - 120], sol, "12% off → ×0.88.")
    if t == 6:
        mp, profit = 500 + v * 50, 25
        cp = round(mp / 1.25)
        q = f"MP gives {profit}% profit on CP. MP ₹{mp}. CP?"
        sol = f"Step 1: CP = {mp}/1.{profit} = {cp}."
        return finalize(order, q, cp, [mp - profit, round(mp * 0.75), cp + 50], sol, "CP = MP/(1+profit%).")
    # t==7
    list_price = 2400 + v * 200
    trade = 20
    cash = 5
    sp = round(list_price * (1 - trade / 100) * (1 - cash / 100))
    q = f"List ₹{list_price}, trade discount {trade}%, cash discount {cash}% on balance. Final price?"
    sol = f"Step 1: After trade: {list_price}×0.8. After cash: ×0.95 = {sp}."
    return finalize(order, q, sp, [round(list_price * 0.75), list_price - 500, round(list_price * 0.85)], sol, "Successive on list.")


def gen_successive_pct(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        val, inc, dec = 1000 + v * 100, 20, 10
        ans = round(val * 1.2 * 0.9)
        q = f"₹{val} increases {inc}%, then decreases {dec}%. Final value?"
        sol = f"Step 1: {val}×1.2 = {val * 1.2}. Step 2: ×0.9 = {ans}."
        return finalize(order, q, ans, [val, val + inc - dec, round(val * 1.1)], sol, "Apply sequentially, not net 10%.")
    if t == 1:
        val, d1, d2 = 800 + v * 50, 10, 20
        ans = round(val * 0.9 * 0.8)
        q = f"Two successive discounts {d1}% and {d2}% on ₹{val}?"
        eq = round((1 - (1 - d1 / 100) * (1 - d2 / 100)) * 100)
        sol = f"Step 1: {val}×0.9×0.8 = {ans}. Equivalent single discount ≈ {eq}%."
        return finalize(order, q, ans, [val - d1 - d2, round(val * 0.7), val - 30], sol, "Multiply factors.")
    if t == 2:
        pop, g1, g2 = 10000 + v * 1000, 10, 10
        ans = round(pop * 1.1 * 1.1)
        q = f"Population {pop} grows {g1}% then {g2}% next year. After 2 years?"
        sol = f"Step 1: {pop}×1.1² = {ans}."
        return finalize(order, q, ans, [pop + 2 * g1 * 100, round(pop * 1.2), pop + 2000], sol, "Compound growth.")
    if t == 3:
        ans_equiv = round((1.2 * 0.9 - 1) * 100)
        q = "Net effect of +20% then −10%?"
        sol = f"Step 1: 1.2×0.9 = 1.08. Net = +{ans_equiv}%."
        return finalize(order, q, f"{ans_equiv}%", ["10%", "30%", "8%"], sol, "Product of factors − 1.")
    if t == 4:
        salary = 50000 + v * 5000
        ans = round(salary * 1.1 * 0.95)
        q = f"Salary ₹{salary}: 10% hike then 5% cut. New salary?"
        sol = f"Step 1: {salary}×1.1×0.95 = {ans}."
        return finalize(order, q, ans, [salary, round(salary * 1.05), salary + 5000], sol, "Sequential % changes.")
    if t == 5:
        p, a, b = 1000, 10, 10
        ans = round(p * (1 + a / 100) * (1 - b / 100))
        q = f"Price ₹{p}: {a}% increase then {b}% decrease. Final?"
        sol = f"Step 1: {p}×1.{a}×0.{100 - b} = {ans}."
        return finalize(order, q, ans, [p, p + a - b, round(p * 0.99)], sol, "Not zero net change.")
    if t == 6:
        d1, d2 = 15 + v, 20
        eq = round((1 - (1 - d1 / 100) * (1 - d2 / 100)) * 100, 1)
        q = f"Equivalent single discount for {d1}% and {d2}% successive?"
        sol = f"Step 1: 1−(1−{d1}/100)(1−{d2}/100) = {eq}%."
        return finalize(order, q, f"{eq}%", [f"{d1 + d2}%", f"{d1 + d2 - 5}%", f"{eq + 3}%"], sol, "Not additive.")
    # t==7
    x = 2000 + v * 200
    ans = round(x / 0.8 / 0.9)
    q = f"After 20% discount and 10% discount, price is ₹{x}. Original?"
    sol = f"Step 1: Original = {x}/(0.8×0.9) = {ans}."
    return finalize(order, q, ans, [round(x * 1.3), x + 500, round(x / 0.7)], sol, "Reverse successive discounts.")


GENERATORS = {
    "percentages": gen_percentages,
    "profit-loss": gen_profit_loss,
    "discount": gen_discount,
    "successive-percentages": gen_successive_pct,
}
