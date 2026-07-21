"""Time-work and speed-distance generators."""
from __future__ import annotations

from generators.base import *


def gen_time_work(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        days = 12 + v
        ans = round(1 / (1 / days), 1)
        q = f"A completes work in {days} days. Days for A alone?"
        sol = f"Step 1: Rate = 1/{days} per day. Time = {days} days."
        return finalize(order, q, days, [days + 2, days // 2, days * 2], sol, "Time = 1/rate.")
    if t == 1:
        a, b = 6 + v, 12 + v
        ans = round(a * b / (a + b), 1)
        q = f"A finishes in {a} days, B in {b} days. Together?"
        sol = f"Step 1: 1/{a}+1/{b} = 1/{ans}. Together = {ans} days."
        return finalize(order, q, ans, [a + b, (a + b) // 2, a], sol, "1/T = 1/a + 1/b.")
    if t == 2:
        total, a_days = 1, 10 + v
        b_rate = 2
        ans = round(a_days / (1 + b_rate), 1)
        q = f"A is twice as fast as B. A takes {a_days} days. Together?"
        b_days = a_days * 2
        ans = round(a_days * b_days / (a_days + b_days), 1)
        sol = f"Step 1: B takes {b_days} days. Together = {ans} days."
        return finalize(order, q, ans, [a_days, b_days, a_days // 2], sol, "Efficiency ratio.")
    if t == 3:
        men, days = 8 + v, 15
        new_men = 10 + v
        ans = round(men * days / new_men)
        q = f"{men} men finish in {days} days. How many days for {new_men} men?"
        sol = f"Step 1: M1D1 = M2D2 → {ans} days."
        return finalize(order, q, ans, [days, men, days + 5], sol, "Inverse proportion.")
    if t == 4:
        a, b, c = 12, 15 + v, 20
        ans = round(1 / (1 / a + 1 / b + 1 / c), 1)
        q = f"A:{a}d, B:{b}d, C:{c}d alone. All together?"
        sol = f"Step 1: Combined rate → {ans} days."
        return finalize(order, q, ans, [a + b, (a + b + c) // 3, c], sol, "Sum of rates.")
    if t == 5:
        work_days = 20 + v
        done = 5 + v
        left = work_days - done
        q = f"Work takes {work_days} days. After {done} days, days left?"
        sol = f"Step 1: {work_days} − {done} = {left} days."
        return finalize(order, q, left, [done, work_days, work_days + done], sol, "Remaining work time.")
    if t == 6:
        m1, d1, m2 = 6, 18, 9 + v
        ans = round(m1 * d1 / m2)
        q = f"{m1} men do work in {d1} days. {m2} men need?"
        sol = f"Step 1: {m1}×{d1} = {m2}×D → D = {ans}."
        return finalize(order, q, ans, [d1, m2, d1 + m1], sol, "MD = constant.")
    # t==7
    eff_a, eff_b = 3, 2 + v % 3
    ans = round(30 / (eff_a + eff_b), 1)
    q = f"A:B efficiency = {eff_a}:{eff_b}. Together finish 30 units in how many days if A does 3/day?"
    sol = f"Step 1: B = {eff_b} units/day. Total {eff_a + eff_b}/day → {ans} days."
    return finalize(order, q, ans, [30 // eff_a, 15, 10], sol, "Add daily outputs.")


def gen_pipes(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        fill, empty = 10 + v, 15 + v
        ans = round(1 / (1 / fill - 1 / empty), 1)
        q = f"Pipe fills tank in {fill} h, drain empties in {empty} h. Both open, fill time?"
        sol = f"Step 1: Net rate 1/{fill}−1/{empty}. Time = {ans} h."
        return finalize(order, q, ans, [fill + empty, fill, empty], sol, "Net inflow rate.")
    if t == 1:
        a, b = 6 + v, 8 + v
        ans = round(a * b / (a + b), 1)
        q = f"Two pipes fill in {a} h and {b} h. Together?"
        sol = f"Step 1: 1/{a}+1/{b} → {ans} h."
        return finalize(order, q, ans, [a + b, max(a, b), min(a, b)], sol, "Parallel fill rates.")
    if t == 2:
        fill = 12 + v
        ans = round(fill / 2, 1)
        q = f"Pipe fills tank in {fill} h. Half tank?"
        sol = f"Step 1: Half time = {ans} h."
        return finalize(order, q, ans, [fill, fill * 2, fill // 3], sol, "Half work, half time.")
    if t == 3:
        in1, in2, out = 20, 30 + v, 60
        ans = round(1 / (1 / in1 + 1 / in2 - 1 / out), 1)
        q = f"Inlets {in1}h & {in2}h, outlet {out}h. All open?"
        sol = f"Step 1: Net rate → {ans} h to fill."
        return finalize(order, q, ans, [in1 + in2, out, 30], sol, "In minus out.")
    if t == 4:
        tank = 100
        rate = 5 + v
        ans = round(tank / rate)
        q = f"Tank {tank} L, pipe {rate} L/min. Minutes to fill?"
        sol = f"Step 1: {tank}/{rate} = {ans} min."
        return finalize(order, q, ans, [rate, tank, tank // 2], sol, "Volume/rate.")
    if t == 5:
        a, leak = 8 + v, 24 + v
        ans = round(1 / (1 / a - 1 / leak), 1)
        q = f"Tap fills in {a} h, leak empties in {leak} h. Effective fill?"
        sol = f"Step 1: Net = {ans} h."
        return finalize(order, q, ans, [a + leak, a, leak], sol, "Fill minus leak.")
    if t == 6:
        p1, p2 = 12, 18 + v
        ans = round(p1 * p2 / (p1 + p2))
        q = f"Pipe A: {p1} min, B: {p2} min. Together fill?"
        sol = f"Step 1: {ans} minutes."
        return finalize(order, q, ans, [p1 + p2, 15, 30], sol, "Harmonic mean time.")
    # t==7
    fill = 6 + v
    q = f"Pipe fills in {fill} h. What fraction filled in 2 h?"
    ans = f"{2}/{fill}" if 2 < fill else "1"
    frac = round(2 / fill, 2) if 2 < fill else 1
    sol = f"Step 1: Rate 1/{fill} × 2 h = {frac}."
    return finalize(order, q, frac, [2, fill, round(1 / fill, 2)], sol, "Rate × time.")


def gen_tsd(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        d, s = 120 + v * 10, 60
        ans = round(d / s, 1)
        q = f"Distance {d} km at {s} km/h. Time (hours)?"
        sol = f"Step 1: T = D/S = {ans} h."
        return finalize(order, q, ans, [d - s, s, d / (s + 10)], sol, "T = D/S.")
    if t == 1:
        s, t_h = 45 + v * 5, 4
        ans = s * t_h
        q = f"Speed {s} km/h for {t_h} hours. Distance?"
        sol = f"Step 1: D = S×T = {ans} km."
        return finalize(order, q, ans, [s + t_h, s // t_h, ans // 2], sol, "D = ST.")
    if t == 2:
        d, t_h = 180 + v * 20, 3
        ans = d // t_h
        q = f"{d} km in {t_h} hours. Speed?"
        sol = f"Step 1: S = {d}/{t_h} = {ans} km/h."
        return finalize(order, q, ans, [d - t_h, t_h * 10, ans + 10], sol, "S = D/T.")
    if t == 3:
        up, down = 30 + v * 5, 20 + v * 5
        avg = round(2 * up * down / (up + down))
        q = f"Go {up} km/h, return {down} km/h. Average speed for equal distance?"
        sol = f"Step 1: Harmonic mean = {avg} km/h."
        return finalize(order, q, avg, [(up + down) // 2, up, down], sol, "2ab/(a+b).")
    if t == 4:
        s = 72 + v * 4
        ans = round(s * 1000 / 3600, 1)
        q = f"Convert {s} km/h to m/s."
        sol = f"Step 1: ×5/18 = {ans} m/s."
        return finalize(order, q, ans, [s / 2, s * 5, s // 18], sol, "×5/18 conversion.")
    if t == 5:
        m_s = 10 + v
        ans = round(m_s * 18 / 5)
        q = f"Convert {m_s} m/s to km/h."
        sol = f"Step 1: ×18/5 = {ans} km/h."
        return finalize(order, q, ans, [m_s * 2, m_s + 18, m_s * 5], sol, "×18/5 conversion.")
    if t == 6:
        d, s1, s2 = 200 + v * 20, 40, 60
        t1 = d / 2 / s1
        t2 = d / 2 / s2
        avg = round(d / (t1 + t2))
        q = f"{d} km: half at {s1} km/h, half at {s2} km/h. Average speed?"
        sol = f"Step 1: Total time = {t1 + t2:.2f} h. Avg = {avg} km/h."
        return finalize(order, q, avg, [(s1 + s2) // 2, s2, s1], sol, "Total D / total T.")
    # t==7
    start, end = 8, 11 + v % 3
    s = 50 + v * 5
    ans = s * (end - start)
    q = f"Car {s} km/h from {start} AM to {end} AM. Distance?"
    sol = f"Step 1: {end - start} h × {s} = {ans} km."
    return finalize(order, q, ans, [s, end - start, ans // 2], sol, "Hours × speed.")


def gen_relative_speed(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        a, b = 60 + v * 5, 40 + v * 5
        ans = a + b
        q = f"Two cars {a} & {b} km/h opposite directions. Relative speed?"
        sol = f"Step 1: Add speeds = {ans} km/h."
        return finalize(order, q, ans, [abs(a - b), a, b], sol, "Opposite → sum.")
    if t == 1:
        a, b = 70 + v * 2, 50 + v * 2
        ans = a - b
        q = f"Same direction: {a} km/h and {b} km/h. Relative speed?"
        sol = f"Step 1: Difference = {ans} km/h."
        return finalize(order, q, ans, [a + b, b, a], sol, "Same direction → subtract.")
    if t == 2:
        rel, t_h = 90 + v * 10, 2
        ans = rel * t_h
        q = f"Relative speed {rel} km/h for {t_h} h. Distance covered?"
        sol = f"Step 1: D = {ans} km."
        return finalize(order, q, ans, [rel, t_h * 10, rel // t_h], sol, "D = rel × T.")
    if t == 3:
        d, sa, sb = 300 + v * 20, 50, 70
        ans = round(d / (sa + sb), 1)
        q = f"{d} km apart, approach at {sa} & {sb} km/h. Meet in?"
        sol = f"Step 1: {d}/({sa + sb}) = {ans} h."
        return finalize(order, q, ans, [d / sa, d / sb, sa + sb], sol, "Time = D / sum.")
    if t == 4:
        faster, slower = 80 + v * 2, 60 + v * 2
        gap = 100 + v * 10
        ans = round(gap / (faster - slower))
        q = f"{gap} km apart, same direction {faster} & {slower} km/h. Catch-up time (h)?"
        sol = f"Step 1: {gap}/({faster - slower}) = {ans} h."
        return finalize(order, q, ans, [gap // faster, gap // slower, faster - slower], sol, "Gap/rel speed.")
    if t == 5:
        a, b, meet = 60, 80 + v * 5, 2 + v % 3
        ans = (a + b) * meet
        q = f"Two trains {a} & {b} km/h toward each other meet in {meet} h. Initial distance?"
        sol = f"Step 1: D = ({a}+{b})×{meet} = {ans} km."
        return finalize(order, q, ans, [a * meet, b * meet, meet * 50], sol, "Sum speed × time.")
    if t == 6:
        walker, train = 5 + v, 55 + v * 5
        ans = train - walker
        q = f"Person {walker} km/h, train same direction {train} km/h. Relative speed?"
        sol = f"Step 1: {train} − {walker} = {ans} km/h."
        return finalize(order, q, ans, [train + walker, train, walker], sol, "Same dir subtract.")
    # t==7
    d = 240 + v * 20
    s = 80
    t_h = d / s
    q = f"Car covers {d} km at {s} km/h. Another at {s + 20} km/h starts 1 h later. Relative catch time?"
    rel = 20
    ans = round((s - (d / (d / s + 1))) / rel, 1) if False else round(d / (2 * s + 20), 1)
    ans = round(d / (2 * 80 + 20), 1)
    sol = f"Step 1: Use relative speed analysis → approx {ans} h."
    return finalize(order, q, ans, [t_h, d / s, 3.0], sol, "Relative speed chase.")


def gen_trains(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        l, s = 150 + v * 10, 54 + v * 6
        ans = round(l / (s * 1000 / 3600))
        q = f"Train {l} m long at {s} km/h crosses pole in? (seconds)"
        sol = f"Step 1: Speed m/s = {s * 1000 / 3600:.1f}. Time = {ans} s."
        return finalize(order, q, ans, [l // s, ans + 5, s], sol, "Time = length/speed.")
    if t == 1:
        l1, l2, s = 120, 180 + v * 10, 90
        ans = round((l1 + l2) / (s * 1000 / 3600))
        q = f"Trains {l1}m & {l2}m at {s} km/h cross each other. Time (s)?"
        sol = f"Step 1: Relative crossing length {l1 + l2} m → {ans} s."
        return finalize(order, q, ans, [l1 + l2, ans + 10, s], sol, "Sum lengths / rel speed.")
    if t == 2:
        platform, train = 400 + v * 20, 200 + v * 10
        s = 72
        ans = round((platform + train) / (s * 1000 / 3600))
        q = f"Train {train}m at {s} km/h crosses platform {platform}m. Time (s)?"
        sol = f"Step 1: Total {platform + train} m / speed → {ans} s."
        return finalize(order, q, ans, [platform // 2, train, ans + 5], sol, "Platform + train length.")
    if t == 3:
        l, s, t_sec = 100 + v * 10, 36, 20 + v
        calc_s = round(l / t_sec * 18 / 5)
        q = f"Train {l}m passes pole in {t_sec}s. Speed km/h?"
        sol = f"Step 1: Speed = {l}/{t_sec} m/s → {calc_s} km/h."
        return finalize(order, q, calc_s, [s, l, t_sec * 2], sol, "Speed from time over length.")
    if t == 4:
        l = 240 + v * 20
        s = 108
        ans = round(l / (s * 1000 / 3600))
        q = f"{l} m train at {s} km/h crosses telegraph post. Seconds?"
        sol = f"Step 1: Time = {ans} s."
        return finalize(order, q, ans, [l // 10, s, ans * 2], sol, "Length/speed.")
    if t == 5:
        t1, t2 = 15 + v, 20 + v
        l = 300
        s = round(l / t1 * 18 / 5)
        q = f"Train {l}m takes {t1}s to pass man. Speed km/h?"
        sol = f"Step 1: {l}/{t1} m/s = {s} km/h."
        return finalize(order, q, s, [60, 72, 90], sol, "Convert m/s to km/h.")
    if t == 6:
        a, b = 60, 40 + v * 5
        la, lb = 150, 100
        ans = round((la + lb) / ((a + b) * 1000 / 3600))
        q = f"Trains {la}m ({a} km/h) & {lb}m ({b} km/h) opposite. Crossing time (s)?"
        sol = f"Step 1: ({la}+{lb}) / rel speed = {ans} s."
        return finalize(order, q, ans, [la + lb, 10, 20], sol, "Opposite relative speed.")
    # t==7
    train_l, platform = 200 + v * 10, 300 + v * 20
    s = 54
    ans = round((train_l + platform) / (s * 1000 / 3600))
    q = f"Train {train_l}m, platform {platform}m, speed {s} km/h. Crossing time?"
    sol = f"Step 1: {ans} seconds."
    return finalize(order, q, ans, [train_l, platform, s], sol, "Sum length over speed.")


def gen_boats(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        down, up = 12 + v, 8 + v
        still = (down + up) / 2
        q = f"Downstream {down} km/h, upstream {up} km/h. Speed in still water?"
        sol = f"Step 1: ({down}+{up})/2 = {still} km/h."
        return finalize(order, q, still, [down - up, down, up], sol, "Boat = avg of up/down.")
    if t == 1:
        down, up = 15 + v, 9 + v
        stream = (down - up) / 2
        q = f"Downstream {down}, upstream {up}. Stream speed?"
        sol = f"Step 1: ({down}−{up})/2 = {stream} km/h."
        return finalize(order, q, stream, [down + up, down, up], sol, "Stream = half difference.")
    if t == 2:
        boat, stream = 10 + v, 2 + v
        down = boat + stream
        q = f"Boat {boat} km/h in still, stream {stream} km/h. Downstream speed?"
        sol = f"Step 1: {boat}+{stream} = {down} km/h."
        return finalize(order, q, down, [boat - stream, boat, stream], sol, "Down = boat + stream.")
    if t == 3:
        boat, stream, d = 8 + v, 2, 30 + v * 5
        ans = round(d / (boat + stream), 1)
        q = f"Boat {boat} km/h, stream {stream} km/h. {d} km downstream time (h)?"
        sol = f"Step 1: Speed {boat + stream}. Time = {ans} h."
        return finalize(order, q, ans, [d / boat, d / stream, boat + stream], sol, "D / downstream speed.")
    if t == 4:
        d, down, up = 48 + v * 4, 12, 8
        t_down = d / down
        t_up = d / up
        ans = round(t_down + t_up, 1)
        q = f"Round trip {d} km: down {down} km/h, up {up} km/h. Total time?"
        sol = f"Step 1: {d}/{down}+{d}/{up} = {ans} h."
        return finalize(order, q, ans, [t_down, t_up, d / 10], sol, "Sum of leg times.")
    if t == 5:
        man, stream = 5 + v, 3
        ans = man + stream
        q = f"Swimmer {man} km/h in still, river {stream} km/h. Downstream speed?"
        sol = f"Step 1: {ans} km/h."
        return finalize(order, q, ans, [man - stream, man, stream], sol, "Add stream.")
    if t == 6:
        boat = 15 + v
        stream = 3
        d = 60 + v * 10
        ans = round(d / (boat - stream), 1)
        q = f"Boat {boat} km/h upstream against {stream} km/h stream. {d} km time?"
        sol = f"Step 1: Upstream {boat - stream} km/h → {ans} h."
        return finalize(order, q, ans, [d / boat, d / stream, boat], sol, "Subtract stream.")
    # t==7
    t_down = 3 + v % 3
    t_up = 5 + v % 4
    d = 30 + v * 5
    down_s = d / t_down
    up_s = d / t_up
    boat = (down_s + up_s) / 2
    q = f"{d} km downstream in {t_down}h, upstream in {t_up}h. Boat speed in still water?"
    sol = f"Step 1: Down={down_s}, Up={up_s}. Boat=({down_s}+{up_s})/2={boat} km/h."
    return finalize(order, q, round(boat, 1), [down_s, up_s, d / (t_down + t_up)], sol, "From leg speeds.")


def gen_races(order: int) -> dict:
    t = (order - 21) % 8
    v = (order - 21) // 8
    if t == 0:
        fast, slow = 100 + v * 5, 80 + v * 5
        head = 200 + v * 20
        ans = round(head / (fast - slow))
        q = f"A ({fast} m/min) gives B ({slow} m/min) {head} m head start in 1 km race. A catches B in? (min)"
        sol = f"Step 1: Rel speed {fast - slow}. Time = {head}/({fast - slow}) = {ans} min."
        return finalize(order, q, ans, [head // fast, head // slow, fast - slow], sol, "Head start / rel speed.")
    if t == 1:
        track = 400 + v * 40
        a, b = 60, 80 + v * 5
        ans = round(track / abs(a - b)) if a != b else 0
        q = f"Circular track {track}m. A {a} m/min, B {b} m/min same direction. First meeting (min)?"
        sol = f"Step 1: Rel lap = {track}/({b - a}) = {ans} min."
        return finalize(order, q, ans, [track // a, track // b, b - a], sol, "Track / rel speed.")
    if t == 2:
        winner, loser = 10 + v, 12 + v
        q = f"Winner runs {winner}s per 100m. Loser {loser}s. Winner's lead per 100m (s)?"
        ans = loser - winner
        sol = f"Step 1: {loser} − {winner} = {ans} s."
        return finalize(order, q, ans, [winner, loser, winner + loser], sol, "Time difference.")
    if t == 3:
        n_laps = 5 + v
        lap = 300
        ans = n_laps * lap
        q = f"Runner completes {n_laps} laps of {lap}m track. Distance?"
        sol = f"Step 1: {n_laps}×{lap} = {ans} m."
        return finalize(order, q, ans, [n_laps + lap, lap, n_laps * 100], sol, "Laps × lap length.")
    if t == 4:
        a, b, dist = 8, 10 + v, 1000 + v * 100
        ta, tb = dist / a, dist / b
        ans = round(abs(ta - tb), 1)
        q = f"{dist}m race: A {a} m/s, B {b} m/s. Winning margin (s)?"
        sol = f"Step 1: |{dist}/{a} − {dist}/{b}| = {ans} s."
        return finalize(order, q, ans, [ta, tb, dist // b], sol, "Time difference.")
    if t == 5:
        speed = 5 + v
        track = 500 + v * 50
        ans = round(track / speed, 1)
        q = f"Runner {speed} m/s on {track}m circular track. One lap time (s)?"
        sol = f"Step 1: {track}/{speed} = {ans} s."
        return finalize(order, q, ans, [speed, track, ans * 2], sol, "Lap = distance/speed.")
    if t == 6:
        ratio = 3 + v % 2
        ans = ratio
        q = f"A runs 3 times as fast as B on same track. When A finishes 3 laps, B completes?"
        sol = f"Step 1: Speed ratio 3:1 → B completes 1 lap."
        return finalize(order, q, 1, [3, 2, ratio], sol, "Inverse to speed ratio.")
    # t==7
    a, b = 72 + v * 4, 60 + v * 4
    d = 600 + v * 60
    ans = round(d / (a - b))
    q = f"A ({a} km/h) chases B ({b} km/h) with {d} km lead. Catch time (h)?"
    sol = f"Step 1: {d}/({a - b}) = {ans} h."
    return finalize(order, q, ans, [d // a, d // b, a - b], sol, "Lead / relative speed.")


GENERATORS = {
    "time-work": gen_time_work,
    "pipes-cisterns": gen_pipes,
    "time-speed-distance": gen_tsd,
    "relative-speed": gen_relative_speed,
    "train-problems": gen_trains,
    "boats-streams": gen_boats,
    "races-circular-tracks": gen_races,
}
