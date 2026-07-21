"""Shared helpers for aptitude question generation."""
from __future__ import annotations

import math
import random
from fractions import Fraction

LETTERS = ["A", "B", "C", "D"]


def difficulty_for_order(order: int) -> str:
    if order <= 35:
        return "easy"
    if order <= 55:
        return "medium"
    return "hard"


def tier_type_for_order(order: int) -> str:
    if order <= 35:
        return "Basic computation"
    if order <= 55:
        return "Standard application"
    if order <= 75:
        return "Multi-step problem"
    if order <= 90:
        return "CAT level"
    return "Real-world disguise"


def answer_letter(order: int) -> str:
    return LETTERS[(order - 21) % 4]


def build_options(correct, traps: list, letter: str) -> list[str]:
    opts = [""] * 4
    idx = LETTERS.index(letter)
    opts[idx] = str(correct)
    ti = 0
    for i in range(4):
        if i != idx:
            opts[i] = str(traps[ti])
            ti += 1
    return opts


def finalize(order: int, question: str, correct, traps: list, solution: str, trick: str = "", qtype: str = ""):
    letter = answer_letter(order)
    return {
        "order": order,
        "difficulty": difficulty_for_order(order),
        "question": question,
        "options": build_options(correct, traps[:3], letter),
        "answer": letter,
        "solution": solution,
        "trick": trick,
        "type": qtype or tier_type_for_order(order),
    }


def unit_digit(base: int, exp: int) -> int:
    cycle = {2: [2, 4, 8, 6], 3: [3, 9, 7, 1], 4: [4, 6], 7: [7, 9, 3, 1], 8: [8, 4, 2, 6], 9: [9, 1]}
    if base % 10 in (0, 1, 5, 6):
        return base % 10
    c = cycle.get(base % 10, [base % 10])
    return c[(exp - 1) % len(c)]


def count_factors(n: int) -> int:
    n = abs(n)
    if n == 0:
        return 0
    count = 0
    i = 1
    while i * i <= n:
        if n % i == 0:
            count += 2 if i * i != n else 1
        i += 1
    return count


def trailing_zeros(n: int) -> int:
    c = 0
    p = 5
    while p <= n:
        c += n // p
        p *= 5
    return c


def hcf(a: int, b: int) -> int:
    while b:
        a, b = b, a % b
    return a


def lcm(a: int, b: int) -> int:
    return a * b // hcf(a, b) if a and b else 0


def lcm_list(nums) -> int:
    result = 1
    for n in nums:
        result = lcm(result, n)
    return result


def prime_factors(n: int) -> dict[int, int]:
    n = abs(n)
    f: dict[int, int] = {}
    d = 2
    while d * d <= n:
        while n % d == 0:
            f[d] = f.get(d, 0) + 1
            n //= d
        d += 1 if d == 2 else 2
    if n > 1:
        f[n] = f.get(n, 0) + 1
    return f


def sum_of_factors(n: int) -> int:
    pf = prime_factors(n)
    s = 1
    for p, e in pf.items():
        s *= (p ** (e + 1) - 1) // (p - 1)
    return s


def unique_traps(correct, candidates: list) -> list:
    seen = {correct}
    traps = []
    for c in candidates:
        if c not in seen:
            traps.append(c)
            seen.add(c)
        if len(traps) == 3:
            break
    n = 1
    while len(traps) < 3:
        t = correct + n if isinstance(correct, int) else correct
        if t not in seen:
            traps.append(t)
            seen.add(t)
        n += 1
    return traps


def load_existing_texts(path) -> set[str]:
    import json
    from pathlib import Path

    p = Path(path)
    if not p.exists():
        return set()
    data = json.loads(p.read_text(encoding="utf-8"))
    return {q.get("question", "") for q in data}


def reassign_answer(q: dict, letter: str) -> dict:
    """Place the correct option at the required answer letter."""
    current = q["answer"]
    if current == letter:
        return q
    opts = q["options"]
    correct_val = opts[LETTERS.index(current)]
    wrong = [opts[i] for i in range(4) if LETTERS[i] != current]
    q["options"] = build_options(correct_val, wrong, letter)
    q["answer"] = letter
    return q


def seed_for(topic: str, order: int) -> int:
    return hash(f"{topic}-{order}") & 0xFFFFFFFF


def rng_for(topic: str, order: int) -> random.Random:
    return random.Random(seed_for(topic, order))
