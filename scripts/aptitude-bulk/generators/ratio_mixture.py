"""Ratio, mixture, averages, ages generators."""
from __future__ import annotations

from generators.base import *


def gen_ratio(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        a, b, k = 3 + v % 3, 4 + v % 4, 5 + v
        ans = (a + b) * k
        q = f"Divide ₹{ans} in ratio {a}:{b}."
        sol = f"Step 1: Total parts = {a + b}. Step 2: Each part = {ans}/({a + b}) = {k}. Shares: {a * k}, {b * k}."
        return finalize(order, q, f"{a * k}:{b * k}", [f"{a}:{b}", str(a * k), str(b * k)], sol, "Value = (ratio part/sum)×total.")
    if t == 1:
        x = 12 + v * 3
        ans = round(x * 5 / 3)
        q = f"If 3:x = 9:{x + 15}, find x."
        sol = f"Step 1: 3/x = 9/({x + 15}) → cross multiply → x = {x}."
        return finalize(order, q, x, [x + 3, x - 3, 2 * x], sol, "Cross multiplication.")
    if t == 2:
        a, b = 2 + v, 3 + v
        total = 100 + v * 20
        ans = round(total * a / (a + b))
        q = f"Two numbers in ratio {a}:{b} sum to {total}. Larger number?"
        sol = f"Step 1: Larger = {b}/({a + b})×{total} = {round(total * b / (a + b))}."
        return finalize(order, q, round(total * b / (a + b)), [ans, total // 2, a + b], sol, "Larger gets b/(a+b) share.")
    if t == 3:
        ans = 4 + v
        q = f"Mean proportional between {ans} and {ans * 4}?"
        mp = ans * 2
        sol = f"Step 1: √( {ans}×{ans * 4}) = {mp}."
        return finalize(order, q, mp, [ans, ans * 4, ans + 4], sol, "Mean prop = √(ab).")
    if t == 4:
        boys, girls = 5 + v, 4 + v
        add = 20
        ans = round(add * boys / (boys + girls))
        q = f"Class ratio boys:girls = {boys}:{girls}. {add} students join in same ratio. Boys added?"
        sol = f"Step 1: Boys fraction = {boys}/({boys + girls}). Step 2: {add}×{boys}/({boys + girls}) = {ans}."
        return finalize(order, q, ans, [add - ans, add // 2, girls], sol, "Split by ratio.")
    if t == 5:
        a, b, c = 2, 3, 5
        total = 400 + v * 50
        ans = round(total * c / (a + b + c))
        q = f"₹{total} divided among A:B:C = {a}:{b}:{c}. C gets?"
        sol = f"Step 1: C share = {c}/10 × {total} = {ans}."
        return finalize(order, q, ans, [total // 3, round(total * b / 10), total - ans], sol, "Part/total parts.")
    if t == 6:
        q = f"If (3 + {v}):4 = 9:12, is the proportion valid?"
        lhs = (3 + v) / 4
        ans = "Yes" if abs(lhs - 9 / 12) < 0.01 else "No"
        sol = f"Step 1: 9/12 = 0.75. (3+{v})/4 = {lhs:.3f}. Answer: {ans}."
        return finalize(order, q, ans, ["No" if ans == "Yes" else "Yes", "Cannot say", "Sometimes"], sol, "Cross-check equality.")
    # t==7
    speed_a, speed_b = 4 + v, 6 + v
    ans = round(speed_a / speed_b, 2)
    q = f"Two cars travel same distance. Speeds {speed_a}0 km/h and {speed_b}0 km/h. Time ratio A:B?"
    sol = f"Step 1: Time ∝ 1/speed. Ratio = {speed_b}:{speed_a} = {speed_b / speed_a:.2f}:1 inverted → {speed_a}:{speed_b} time = {speed_b}:{speed_a}."
    time_ratio = f"{speed_b}:{speed_a}"
    return finalize(order, q, time_ratio, [f"{speed_a}:{speed_b}", f"1:1", f"{speed_a + speed_b}:2"], sol, "Time inverse to speed.")


def gen_partnership(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        a, b, profit = 5000 + v * 500, 3000 + v * 300, 4000 + v * 200
        ans = round(profit * a / (a + b))
        q = f"A invests ₹{a}, B ₹{b}. Profit ₹{profit}. A's share?"
        sol = f"Step 1: Ratio {a}:{b}. Step 2: A gets {a}/({a + b})×{profit} = {ans}."
        return finalize(order, q, ans, [profit - ans, profit // 2, a], sol, "Profit ∝ capital.")
    if t == 1:
        a_time, b_time = 12, 6 + v
        cap_a, cap_b = 10000, 15000 + v * 1000
        ratio = cap_a * a_time / (cap_b * b_time)
        profit = 7700 + v * 100
        ans = round(profit * cap_a * a_time / (cap_a * a_time + cap_b * b_time))
        q = f"A: ₹{cap_a} for {a_time} months, B: ₹{cap_b} for {b_time} months. Profit ₹{profit}. A's share?"
        sol = f"Step 1: Cap×time ratio {cap_a * a_time}:{cap_b * b_time}. Step 2: A share = {ans}."
        return finalize(order, q, ans, [profit - ans, profit // 2, cap_a], sol, "Profit ∝ capital×time.")
    if t == 2:
        a, b, c = 2, 3, 5
        profit = 9000 + v * 500
        ans = round(profit * b / (a + b + c))
        q = f"Partners capital ratio {a}:{b}:{c}. Profit ₹{profit}. B's share?"
        sol = f"Step 1: B = {b}/10 × {profit} = {ans}."
        return finalize(order, q, ans, [profit // 3, profit - ans, profit // 2], sol, "Share = ratio part/sum.")
    if t == 3:
        ans = 6000 + v * 500
        q = f"A and B start equal capital. A leaves after 4 months, B after {8 + v} months. Ratio of cap×time if A stays 4 mo, B {8 + v} mo with same initial?"
        sol = f"Step 1: If equal C, ratio = 4:{8 + v}. A share of profit uses 4/(4+{8 + v})."
        return finalize(order, q, f"4:{8 + v}", [f"1:2", f"4:8", f"1:{8 + v}"], sol, "Cap×time ratio.")
    if t == 4:
        p = 12000 + v * 1000
        ans = round(p * 0.6)
        q = f"Three partners share 60%, 25%, 15%. Total profit ₹{p}. Largest share?"
        sol = f"Step 1: 60% of {p} = {ans}."
        return finalize(order, q, ans, [round(p * 0.25), round(p * 0.15), p // 3], sol, "Apply percentage shares.")
    if t == 5:
        a_cap, months_a = 8000, 12
        b_cap, months_b = 6000 + v * 500, 8
        profit = 5600
        ans = round(profit * a_cap * months_a / (a_cap * months_a + b_cap * months_b))
        q = f"A ₹{a_cap} for {months_a} mo, B ₹{b_cap} for {months_b} mo. Profit ₹{profit}. A?"
        sol = f"Step 1: Ratio {a_cap * months_a}:{b_cap * months_b}. A = {ans}."
        return finalize(order, q, ans, [profit - ans, profit // 2, a_cap], sol, "Cap×months.")
    if t == 6:
        salary = 5000 + v * 500
        ans = round(salary * 8 / 12)
        q = f"Partner works 8 months of a year on ₹{salary}/month salary replaced by profit share of 2:3 with equal time. If only capital equal 8:4 months — smaller share of ₹{salary * 12} profit?"
        profit = salary * 12
        ans = round(profit * 4 / (8 + 4))
        q = f"Equal capital. A: 8 months, B: 4 months. Annual profit ₹{profit}. B's share?"
        sol = f"Step 1: Time ratio 8:4 = 2:1... B has 4 mo → B = 4/12 × {profit} = {ans}."
        return finalize(order, q, ans, [profit // 2, profit - ans, profit // 3], sol, "Share ∝ months if cap equal.")
    # t==7
    x = 10000 + v * 1000
    ans = round(x / 5)
    q = f"Five equal partners earn ₹{x}. Each gets?"
    sol = f"Step 1: {x}/5 = {ans}."
    return finalize(order, q, ans, [x // 4, x // 6, x // 3], sol, "Equal split.")


def gen_mixture(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        p1, p2, m = 40 + v, 60 + v, 50
        ans = round((p1 + p2) / 2)
        q = f"Mix {m} L milk at ₹{p1}/L with {m} L at ₹{p2}/L. Mean price/L?"
        sol = f"Step 1: Equal qty → avg = ({p1}+{p2})/2 = {ans}."
        return finalize(order, q, ans, [p1 + p2, p1, p2], sol, "Equal quantities → AM.")
    if t == 1:
        c1, c2 = 20 + v, 30 + v
        ans = round((2 * c1 * c2) / (c1 + c2), 1)
        q = f"Alloy copper:{c1}% and zinc:{100 - c1}% mixed with copper:{c2}%. Equal weights. Copper %?"
        # simplified: mix 20% and 30% equal -> 25%
        p1, p2 = 20 + v, 30 + v
        ans = (p1 + p2) // 2
        q = f"Mix equal amounts of {p1}% and {p2}% salt solutions. Final concentration?"
        sol = f"Step 1: ({p1}+{p2})/2 = {ans}%."
        return finalize(order, q, f"{ans}%", [f"{p1 + p2}%", f"{p1}%", f"{p2}%"], sol, "Alligation mean.")
    if t == 2:
        pure, water = 100, 0
        conc = 20 + v
        total = 100
        water_needed = round(total * (100 - conc) / conc)
        q = f"How much water to add to {conc} L of pure acid to get {conc}% solution? (Total {total} L target at {conc}%)"
        acid = round(total * conc / 100)
        water = total - acid
        q = f"To make {total} L of {conc}% acid, how much pure acid (100%) is needed?"
        sol = f"Step 1: Acid = {conc}% of {total} = {acid} L."
        return finalize(order, q, acid, [water, total - conc, conc], sol, "Amount = % × total.")
    if t == 3:
        r1, r2 = 2 + v, 5 + v
        ans = r1 + r2
        q = f"Milk ₹{r1}/L mixed with water (free). Ratio for mean ₹{r1 + r2}/2 per L with equal cost contribution?"
        mean = (r1) / 2
        q = f"Ratio of milk ₹{r1}/L to water to get mixture worth ₹{mean}/L?"
        ratio_m_w = 1
        sol = f"Step 1: Alligation → milk:water = 1:1 for half price."
        return finalize(order, q, "1:1", ["2:1", "1:2", "3:1"], sol, "Alligation cross.")
    if t == 4:
        a_qty, a_rate = 40, 50 + v
        b_qty, b_rate = 60, 30 + v
        ans = round((a_qty * a_rate + b_qty * b_rate) / (a_qty + b_qty))
        q = f"Mix {a_qty} kg at ₹{a_rate}/kg with {b_qty} kg at ₹{b_rate}/kg. Average price?"
        sol = f"Step 1: ({a_qty}×{a_rate}+{b_qty}×{b_rate})/{a_qty + b_qty} = {ans}."
        return finalize(order, q, ans, [a_rate, b_rate, (a_rate + b_rate) // 2], sol, "Weighted average.")
    if t == 5:
        vessel = 100
        removed, added = 20, 20
        conc = 80 - v * 5
        new_conc = round(conc * (1 - removed / vessel))
        q = f"Vessel has {conc}% alcohol {vessel} L. {removed} L replaced with water. New %?"
        sol = f"Step 1: Remaining alcohol = {conc}% × {vessel - removed} L equivalent → {new_conc}%."
        return finalize(order, q, f"{new_conc}%", [f"{conc - removed}%", f"{conc}%", f"{conc // 2}%"], sol, "Replacement reduces concentration.")
    if t == 6:
        w1, w2 = 30 + v, 50 + v
        ans = round((w1 + w2) / 2)
        q = f"Two wines {w1}% and {w2}% alcohol mixed equally. Result?"
        sol = f"Step 1: ({w1}+{w2})/2 = {ans}%."
        return finalize(order, q, f"{ans}%", [f"{w1 + w2}%", f"{w1}%", f"{w2 - w1}%"], sol, "Mean of two concentrations.")
    # t==7
    rice1, rice2 = 20, 30 + v
    q1, q2 = 3, 2
    ans = round((rice1 * q1 + rice2 * q2) / (q1 + q2))
    q = f"Mix {q1} kg rice at ₹{rice1}/kg with {q2} kg at ₹{rice2}/kg. Cost/kg?"
    sol = f"Step 1: ({q1}×{rice1}+{q2}×{rice2})/{q1 + q2} = {ans}."
    return finalize(order, q, ans, [rice1 + rice2, rice2, rice1], sol, "Weighted mean.")


def gen_averages(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        nums = [10 + v + i * 2 for i in range(5)]
        ans = round(sum(nums) / len(nums))
        q = f"Average of {', '.join(map(str, nums))}?"
        sol = f"Step 1: Sum = {sum(nums)}. Step 2: /5 = {ans}."
        return finalize(order, q, ans, [sum(nums), nums[2], ans + 2], sol, "Sum/count.")
    if t == 1:
        avg, n = 40 + v, 10 + v
        total = avg * n
        q = f"Average of {n} numbers is {avg}. Sum?"
        sol = f"Step 1: Sum = {avg}×{n} = {total}."
        return finalize(order, q, total, [avg + n, avg * (n - 1), total + avg], sol, "Sum = avg × n.")
    if t == 2:
        old_avg, new_val, n = 50 + v, 60 + v, 10
        new_avg = round((old_avg * n + new_val) / (n + 1), 1)
        q = f"{n} numbers avg {old_avg}. Add {new_val}. New average?"
        sol = f"Step 1: ({old_avg}×{n}+{new_val})/{n + 1} = {new_avg}."
        return finalize(order, q, new_avg, [old_avg, new_val, (old_avg + new_val) / 2], sol, "Update sum then divide.")
    if t == 3:
        a, b = 30 + v, 50 + v
        ans = (a + b) / 2
        q = f"Average of {a} and {b}?"
        sol = f"Step 1: ({a}+{b})/2 = {ans}."
        return finalize(order, q, ans, [a + b, b - a, a], sol, "AM of two numbers.")
    if t == 4:
        runs, innings = 50 + v * 5, 10
        need_total = 55 * (innings + 1)
        need = need_total - runs
        q = f"Cricket avg {runs // innings} after {innings} innings ({runs} runs). Runs needed in 11th for avg 55?"
        sol = f"Step 1: Need {55 * 11} total. Step 2: {55 * 11} − {runs} = {need}."
        return finalize(order, q, need, [55, runs // innings, 110], sol, "Target total − current.")
    if t == 5:
        wt_avg = round((3 * 50 + 2 * 60) / 5)
        q = f"Class: 3 sections avg 50, 2 sections avg 60. Overall average?"
        sol = f"Step 1: (150+120)/5 = {wt_avg}."
        return finalize(order, q, wt_avg, [55, 50, 60], sol, "Weighted average.")
    if t == 6:
        n = 8 + v
        avg = 35 + v
        excluded = 20 + v
        new_avg = round((avg * n - excluded) / (n - 1), 1)
        q = f"{n} numbers average {avg}. One number {excluded} removed. New average?"
        sol = f"Step 1: Sum = {avg * n}. New sum = {avg * n - excluded}. /{n - 1} = {new_avg}."
        return finalize(order, q, new_avg, [avg, excluded, avg - 5], sol, "Subtract outlier.")
    # t==7
    first, last, count = 5 + v, 25 + v * 2, 11
    ans = (first + last) / 2
    q = f"Average of first and last of {count} consecutive integers starting {first}?"
    sol = f"Step 1: Last = {last}. Avg first+last = ({first}+{last})/2 = {ans}."
    return finalize(order, q, ans, [first, last, count], sol, "AM of AP endpoints.")


def gen_ages(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        ratio_a, ratio_b = 3 + v % 3, 5 + v % 4
        if ratio_b <= ratio_a:
            ratio_b = ratio_a + 2
        diff_years = 16
        ans = round(diff_years / (ratio_b - ratio_a) * ratio_b)
        q = f"Father:son = {ratio_b}:{ratio_a}. Age diff {diff_years}. Son's age?"
        son = round(diff_years / (ratio_b - ratio_a) * ratio_a)
        sol = f"Step 1: 1 part = {diff_years}/({ratio_b - ratio_a}) = {diff_years // (ratio_b - ratio_a)}. Son = {son}."
        return finalize(order, q, son, [ans, diff_years, ratio_a + ratio_b], sol, "Difference = (m-n) parts.")
    if t == 1:
        present = 25 + v * 2
        after = 5 + v
        ans = present + after
        q = f"Person age {present}. Age after {after} years?"
        sol = f"Step 1: {present} + {after} = {ans}."
        return finalize(order, q, ans, [present, after, present - after], sol, "Add years.")
    if t == 2:
        a, b = 30 + v, 20 + v
        yrs = 10
        ans = round((a + yrs) / (b + yrs), 1)
        q = f"A is {a}, B is {b}. Ratio of ages after {yrs} years?"
        sol = f"Step 1: ({a + yrs}):({b + yrs}) = {a + yrs}:{b + yrs}."
        return finalize(order, q, f"{a + yrs}:{b + yrs}", [f"{a}:{b}", f"{a + b}:{yrs}", f"1:1"], sol, "Add same years to both.")
    if t == 3:
        f, s = 40 + v * 2, 10 + v
        yrs = f - s
        ans = round((f + yrs) / (s + yrs), 1)
        q = f"Father {f}, son {s}. When father was son's age, ratio of their ages then?"
        sol = f"Step 1: That was {yrs} years ago. Father {f - yrs}, son {s - yrs}. Ratio {f - yrs}:{s - yrs}."
        return finalize(order, q, f"{f - yrs}:{s - yrs}", [f"{f}:{s}", "1:1", f"{yrs}:0"], sol, "Go back difference years.")
    if t == 4:
        sum_age = 60 + v * 5
        ratio = 2
        ans = round(sum_age / (ratio + 1))
        q = f"Two brothers ages ratio 2:1, sum {sum_age}. Younger?"
        sol = f"Step 1: Younger = 1/3 × {sum_age} = {ans}."
        return finalize(order, q, ans, [sum_age // 2, sum_age, ans * 2], sol, "Younger = sum/(ratio+1).")
    if t == 5:
        m, d = 32 + v, 8 + v
        ans = m - d
        q = f"Mother {m}, daughter {d}. Years ago was mother 4× daughter?"
        # m-x = 4(d-x) -> m-x = 4d-4x -> 3x = 4d-m -> x = (4d-m)/3
        x = round((4 * d - m) / 3)
        q = f"Mother {m}, daughter {d}. How many years ago was mother thrice as old as daughter?"
        x = m - 3 * d
        if x <= 0:
            x = abs(m - 2 * d)
        x = max(1, (m - 3 * d) // 2 if m > 3 * d else v + 5)
        sol = f"Step 1: Solve m−x = 3(d−x). x = {x} years ago."
        return finalize(order, q, x, [m - d, d, m // 3], sol, "Set up equation in x.")
    if t == 6:
        p = 30 + v
        ans = p * 3
        q = f"Product of ages of two children is {ans}. One is {p}. Other?"
        other = ans // p
        sol = f"Step 1: Other = {ans}/{p} = {other}."
        return finalize(order, q, other, [p, ans, p + other], sol, "Divide product.")
    # t==7
    avg = 30 + v
    n = 4
    new = 40 + v
    ans = round((avg * n + new) / (n + 1))
    q = f"Average age of {n} people is {avg}. New person {new} joins. New average?"
    sol = f"Step 1: ({avg}×{n}+{new})/{n + 1} = {ans}."
    return finalize(order, q, ans, [avg, new, avg + 5], sol, "Weighted average ages.")


GENERATORS = {
    "ratio-proportion": gen_ratio,
    "partnership": gen_partnership,
    "mixture-alligation": gen_mixture,
    "averages": gen_averages,
    "ages": gen_ages,
}
