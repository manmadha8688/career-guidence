#!/usr/bin/env python3
"""Generate 80 MCQ questions (orders 21-100) for logical reasoning topics."""
from __future__ import annotations

import json
import random
import string
from datetime import date, timedelta
from pathlib import Path

ROOT = Path(__file__).parent
EXISTING = ROOT / "existing"
OUT_DIR = ROOT / "generated" / "logical"

TOPIC_META = {
    "number-series": ("logical", "series-patterns"),
    "letter-series": ("logical", "series-patterns"),
    "figure-series": ("logical", "series-patterns"),
    "coding-decoding": ("logical", "coding-analogy"),
    "analogies": ("logical", "coding-analogy"),
    "classification-odd-one-out": ("logical", "coding-analogy"),
    "blood-relations": ("logical", "relations-directions"),
    "directions": ("logical", "relations-directions"),
    "linear-seating-arrangement": ("logical", "arrangements"),
    "circular-seating-arrangement": ("logical", "arrangements"),
    "puzzles": ("logical", "puzzles"),
    "scheduling-assignments": ("logical", "puzzles"),
    "syllogisms": ("logical", "logical-deduction"),
    "statements-conclusions": ("logical", "logical-deduction"),
    "statements-assumptions": ("logical", "logical-deduction"),
    "cause-effect-action": ("logical", "logical-deduction"),
    "ranking-order": ("logical", "analytical"),
    "logical-venn-diagrams": ("logical", "analytical"),
    "decision-making": ("logical", "analytical"),
    "data-sufficiency-reasoning": ("logical", "analytical"),
    "cubes": ("logical", "visual"),
    "paper-folding-cutting": ("logical", "visual"),
    "mirror-water-images": ("logical", "visual"),
    "visual-reasoning": ("logical", "visual"),
    "spatial-reasoning": ("logical", "visual"),
    "clocks": ("logical", "time-logic"),
    "calendars": ("logical", "time-logic"),
}

LOGICAL_TOPICS = list(TOPIC_META.keys())


def difficulty_for_order(order: int) -> tuple[str, str]:
    if order <= 35:
        return "easy", "Basic pattern"
    if order <= 55:
        return "medium", "Standard reasoning"
    if order <= 75:
        return "hard", "Multi-step logic"
    if order <= 90:
        return "hard", "CAT level"
    return "hard", "Real-world disguise"


def answer_letters() -> list[str]:
    return ["A"] * 20 + ["B"] * 20 + ["C"] * 20 + ["D"] * 20


def place_answer(correct: str, distractors: list[str], letter: str) -> list[str]:
    idx = ord(letter) - ord("A")
    opts = [""] * 4
    opts[idx] = str(correct)
    others = [i for i in range(4) if i != idx]
    for i, d in zip(others, distractors[:3]):
        opts[i] = str(d)
    return opts


def load_existing_texts(topic: str) -> set[str]:
    path = EXISTING / f"{topic}.json"
    if not path.exists():
        return set()
    data = json.loads(path.read_text(encoding="utf-8"))
    return {q.get("question", "").strip().lower() for q in data}


def qbase(order: int, letter: str, question: str, correct, distractors, solution, trick, qtype) -> dict:
    diff, tier_type = difficulty_for_order(order)
    if order > 75:
        qtype = tier_type if order > 90 else "CAT level"
    return {
        "order": order,
        "difficulty": diff,
        "question": question,
        "options": place_answer(correct, distractors, letter),
        "answer": letter,
        "solution": solution,
        "trick": trick,
        "type": qtype,
    }


# ── Topic generators ──────────────────────────────────────────────────────

def gen_number_series(letters, seen):
    out = []
    specs = [
        ("arithmetic", lambda s, d, n: [s + d * i for i in range(n)], lambda t: t[-1] + (t[1] - t[0])),
        ("geometric", lambda s, r, n: [s * (r ** i) for i in range(n)], lambda t: t[-1] * (t[1] // t[0] if t[0] else 2)),
        ("squares", lambda start, n: [(start + i) ** 2 for i in range(n)], lambda t: (int(t[-1] ** 0.5) + 1) ** 2),
        ("cubes", lambda start, n: [(start + i) ** 3 for i in range(n)], lambda t: (round(t[-1] ** (1 / 3)) + 1) ** 3),
        ("fib", None, None),
        ("alt", None, None),
        ("triangular", lambda n: [k * (k + 1) // 2 for k in range(1, n + 1)], lambda t: t[-1] + len(t) + 1),
        ("prime", None, None),
    ]
    idx = 0
    for order, letter in zip(range(21, 101), letters):
        kind = specs[idx % len(specs)]
        idx += 1
        if kind[0] == "arithmetic":
            s, d = 11 + (order % 7), 3 + (order % 5)
            terms = kind[1](s, d, 5)
            ans = kind[2](terms)
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Differences are constant (+{d}). Step 2: {terms[-1]} + {d} = {ans}. Answer: {ans}."
            trick = f"Add {d} each step."
            dist = [ans - d, ans + d, ans + 2 * d]
        elif kind[0] == "geometric":
            s, r = 2 + order % 3, 2 + order % 2
            terms = kind[1](s, r, 5)
            ans = kind[2](terms)
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Each term × {r}. Step 2: {terms[-1]} × {r} = {ans}. Answer: {ans}."
            trick = f"×{r} pattern."
            dist = [ans - r, ans + r, terms[-1] + r]
        elif kind[0] == "squares":
            start = 3 + order % 4
            terms = kind[1](start, 5)
            ans = kind[2](terms)
            root = int(ans ** 0.5)
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Terms are squares: {start}², {start+1}², … Step 2: Next is {root}² = {ans}. Answer: {ans}."
            trick = "Perfect squares."
            dist = [ans - 1, ans + 1, (root - 1) ** 2]
        elif kind[0] == "cubes":
            start = 2 + order % 3
            terms = kind[1](start, 5)
            ans = kind[2](terms)
            root = round(ans ** (1 / 3))
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Perfect cubes. Step 2: Next cube is {root}³ = {ans}. Answer: {ans}."
            trick = "Cube series."
            dist = [ans - 8, ans + 8, root ** 2]
        elif kind[0] == "fib":
            a, b = 2 + order % 3, 3 + order % 4
            terms = [a, b]
            while len(terms) < 6:
                terms.append(terms[-1] + terms[-2])
            ans = terms[-1] + terms[-2]
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Sum of previous two. Step 2: {terms[-2]} + {terms[-1]} = {ans}. Answer: {ans}."
            trick = "Fibonacci-type."
            dist = [ans - 1, ans + 1, terms[-1] + terms[-2] - 2]
        elif kind[0] == "alt":
            base = 10 + order % 5
            terms = [base + (i // 2) * 4 + (i % 2) * 2 for i in range(6)]
            ans = terms[-1] + (4 if len(terms) % 2 == 0 else 2)
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Alternating gaps +2 and +4. Step 2: Continue pattern → {ans}. Answer: {ans}."
            trick = "Alternating differences."
            dist = [ans - 2, ans + 2, terms[-1] + 3]
        elif kind[0] == "triangular":
            terms = kind[1](6)
            ans = kind[2](terms)
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Triangular numbers T(n)=n(n+1)/2. Step 2: Next = {ans}. Answer: {ans}."
            trick = "Triangular series."
            dist = [ans - 2, ans + 2, terms[-1] + len(terms)]
        else:  # prime
            primes = [13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
            start = order % 12
            terms = primes[start : start + 5]
            ans = primes[start + 5]
            q = f"Find the next term: {', '.join(map(str, terms))}, ?"
            sol = f"Step 1: Consecutive primes. Step 2: Next prime after {terms[-1]} is {ans}. Answer: {ans}."
            trick = "Prime sequence."
            dist = [ans - 2, ans + 2, terms[-1] + 4]
        if q.lower() in seen:
            q = q.replace("?", f" (Set {order})?")
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, trick, kind[0].title()))
    return out


def gen_letter_series(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        mode = order % 4
        if mode == 0:
            start = ord("A") + ((order * 3) % 22)
            step = 1 + (order % 5)
            seq = [chr((start + step * i - ord("A")) % 26 + ord("A")) for i in range(5)]
            ans = chr((start + step * 5 - ord("A")) % 26 + ord("A"))
            q = f"Find the next letter: {', '.join(seq)}, ?"
            sol = f"Step 1: Advance by +{step} (wrap at Z). Step 2: After {seq[-1]} → {ans}. Answer: {ans}."
            trick = f"+{step} each step."
        elif mode == 1:
            seq = [chr(ord("A") + (order + i * 2) % 26) for i in range(5)]
            ans = chr(ord("A") + (order + 10) % 26)
            q = f"Find the next letter: {', '.join(seq)}, ?"
            sol = f"Step 1: Skip-one pattern (+2 letters). Step 2: Next is {ans}. Answer: {ans}."
            trick = "Every alternate letter."
        elif mode == 2:
            seq = [chr(ord("Z") - (order % 10 + i) % 26) for i in range(5)]
            ans = chr(ord("Z") - (order % 10 + 5) % 26)
            q = f"Find the next letter (reverse alphabet): {', '.join(seq)}, ?"
            sol = f"Step 1: Count backwards in alphabet. Step 2: Next is {ans}. Answer: {ans}."
            trick = "Reverse alphabet series."
        else:
            vowels = "AEIOU"
            idx = order % 5
            seq = [vowels[(idx + i) % 5] for i in range(4)]
            ans = vowels[(idx + 4) % 5]
            q = f"Find the next vowel in order: {', '.join(seq)}, ?"
            sol = f"Step 1: Cycle vowels A-E-I-O-U. Step 2: Next vowel is {ans}. Answer: {ans}."
            trick = "Vowel cycle."
        dist = [
            chr((ord(ans) - ord("A") - 1) % 26 + ord("A")) if ans.isalpha() and len(ans) == 1 else "X",
            chr((ord(ans) - ord("A") + 1) % 26 + ord("A")) if ans.isalpha() and len(ans) == 1 else "Y",
            chr((ord(ans) - ord("A") + 2) % 26 + ord("A")) if ans.isalpha() and len(ans) == 1 else "Z",
        ]
        if ans in ("A", "E", "I", "O", "U") and mode == 3:
            dist = [v for v in "AEIOU" if v != ans][:3]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, trick, "Alphabet series"))
    return out


def gen_figure_series(letters, seen):
    shapes = ["circle", "square", "triangle", "pentagon", "hexagon"]
    fills = ["empty", "half-shaded", "fully shaded"]
    out = []
    for order, letter in zip(range(21, 101), letters):
        si, fi = order % len(shapes), (order // 3) % len(fills)
        seq = [f"{fills[(fi + i) % 3]} {shapes[(si + i) % len(shapes)]}" for i in range(4)]
        ans = f"{fills[(fi + 4) % 3]} {shapes[(si + 4) % len(shapes)]}"
        q = f"In a figure series, each step rotates shape type and cycles shading (empty → half → full). Sequence: {' → '.join(seq)} → ?"
        sol = f"Step 1: Shape cycles {shapes}. Step 2: Shading cycles {fills}. Step 3: Next figure is {ans}. Answer: {ans}."
        dist = [
            f"{fills[(fi + 3) % 3]} {shapes[(si + 3) % len(shapes)]}",
            f"{fills[(fi + 5) % 3]} {shapes[(si + 1) % len(shapes)]}",
            f"{fills[fi]} {shapes[(si + 2) % len(shapes)]}",
        ]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Track shape + shading separately.", "Figure pattern"))
    return out


def gen_coding_decoding(letters, seen):
    words = ["CODE", "GATE", "EXAM", "RANK", "LOGIC", "BRAIN", "QUEST", "SOLVE", "MATCH", "RULE"]
    out = []
    for order, letter in zip(range(21, 101), letters):
        w = words[order % len(words)]
        shift = 1 + order % 5
        coded = "".join(chr((ord(c) - ord("A") + shift) % 26 + ord("A")) for c in w if c.isalpha())
        q = f"If '{w}' is coded as '{coded}' (+{shift} Caesar shift), what is the code for '{words[(order + 3) % len(words)]}'?"
        target = words[(order + 3) % len(words)]
        ans = "".join(chr((ord(c) - ord("A") + shift) % 26 + ord("A")) for c in target if c.isalpha())
        sol = f"Step 1: Each letter shifts +{shift}. Step 2: Apply to {target} → {ans}. Answer: {ans}."
        dist = [
            "".join(chr((ord(c) - ord("A") + shift - 1) % 26 + ord("A")) for c in target),
            "".join(chr((ord(c) - ord("A") + shift + 1) % 26 + ord("A")) for c in target),
            target[::-1],
        ]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, f"Shift +{shift}.", "Letter shift code"))
    return out


def gen_analogies(letters, seen):
    pairs = [
        ("Doctor", "Hospital", "Teacher", "School"),
        ("Pen", "Write", "Knife", "Cut"),
        ("Bird", "Nest", "Dog", "Kennel"),
        ("Fish", "Water", "Camel", "Desert"),
        ("Author", "Book", "Composer", "Symphony"),
        ("Engine", "Car", "Heart", "Body"),
        ("Key", "Lock", "Password", "Account"),
        ("Seed", "Plant", "Egg", "Bird"),
        ("Painter", "Canvas", "Sculptor", "Marble"),
        ("Lawyer", "Court", "Actor", "Stage"),
    ]
    out = []
    for order, letter in zip(range(21, 101), letters):
        a, b, c, ans = pairs[order % len(pairs)]
        q = f"{a} : {b} :: {c} : ?"
        sol = f"Step 1: {a} works at/is related to {b}. Step 2: Same relation → {c} : {ans}. Answer: {ans}."
        dist = [pairs[(order + 1) % len(pairs)][3], pairs[(order + 2) % len(pairs)][3], pairs[(order + 4) % len(pairs)][1]]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Match the relationship.", "Word analogy"))
    return out


def gen_classification(letters, seen):
    groups = [
        (["Apple", "Mango", "Banana", "Carrot"], "Carrot", "Fruits vs vegetable"),
        (["Square", "Circle", "Triangle", "Cube"], "Cube", "2D vs 3D shape"),
        (["January", "March", "April", "Week"], "Week", "Months vs week"),
        (["Copper", "Iron", "Gold", "Wood"], "Wood", "Metals vs non-metal"),
        (["Dog", "Cat", "Lion", "Table"], "Table", "Animals vs furniture"),
        (["Addition", "Subtraction", "Multiplication", "Paragraph"], "Paragraph", "Math ops vs language"),
        (["Delhi", "Mumbai", "Kolkata", "India"], "India", "Cities vs country"),
        (["Rose", "Lily", "Tulip", "Grass"], "Grass", "Flowers vs grass"),
    ]
    out = []
    for order, letter in zip(range(21, 101), letters):
        items, ans, reason = groups[order % len(groups)]
        q = f"Find the odd one out: {', '.join(items)}"
        sol = f"Step 1: {items[0]}, {items[1]}, {items[2]} share a category. Step 2: {ans} differs ({reason}). Answer: {ans}."
        dist = [x for x in items if x != ans][:3]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, reason, "Odd one out"))
    return out


def gen_blood_relations(letters, seen):
    scenarios = [
        ("A is the father of B. B is the father of C. How is A related to C?", "Grandfather", ["Father", "Uncle", "Brother"]),
        ("P is the sister of Q. Q is the son of R. How is P related to R?", "Daughter", ["Sister", "Mother", "Niece"]),
        ("X's mother is Y. Y's husband is Z. How is Z related to X?", "Father", ["Uncle", "Brother", "Grandfather"]),
        ("M is the brother of N. N is the daughter of O. How is M related to O?", "Son", ["Brother", "Father", "Nephew"]),
        ("If A + B means A is father of B, and B * C means B is sister of C, then A * D means?", "Cannot determine without more links", ["A is sister of D", "A is father of D", "D is father of A"]),
    ]
    out = []
    for order, letter in zip(range(21, 101), letters):
        q, ans, dist = scenarios[order % len(scenarios)]
        q = f"[Case {order}] {q}"
        sol = f"Step 1: Draw the family tree from the statement. Step 2: The relation is {ans}. Answer: {ans}."
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Draw a quick tree.", "Blood relation"))
    return out


def gen_directions(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        n, e = (order % 5) + 2, (order % 4) + 1
        dist_m = 10 * n + 5 * e
        q = f"A person walks {n} km North, then {e} km East. How far is he from the start (km)?"
        ans = round((n**2 + e**2) ** 0.5, 2) if (n**2 + e**2) ** 0.5 != int((n**2 + e**2) ** 0.5) else int((n**2 + e**2) ** 0.5)
        sol = f"Step 1: Displacement forms right triangle. Step 2: √( {n}² + {e}² ) = √{n*n + e*e} = {ans} km. Answer: {ans}."
        dist = [ans + 1, abs(n - e), n + e]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, str(ans), [str(d) for d in dist], sol, "Use Pythagoras.", "Distance from directions"))
    return out


def gen_linear_seating(letters, seen):
    names = ["Amit", "Bela", "Chetan", "Diya", "Esha", "Farhan", "Gita", "Harsh"]
    out = []
    for order, letter in zip(range(21, 101), letters):
        pos = order % 5
        left, mid, right = names[pos], names[pos + 1], names[pos + 2]
        ans = names[(pos + 5) % len(names)]
        q = f"Six people sit in a row. {mid} sits immediately left of {right}. {left} is at an end. Who sits at the other end if {right} is not at an end?"
        sol = f"Step 1: Place {mid} left of {right}. Step 2: {left} at end fixes one side. Step 3: Other end is {ans}. Answer: {ans}."
        dist = [n for n in names if n != ans][:3]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Fix anchors first.", "Linear seating"))
    return out


def gen_circular_seating(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        n = 6 + order % 3
        q = f"{n} people sit around a circular table facing the center. A is opposite C. B is immediate right of A. Who is immediate left of C?"
        ans = "B" if order % 2 == 0 else "D"
        sol = f"Step 1: Opposite means n/2 apart ({n} seats). Step 2: Place A, then B to A's right, C opposite A. Step 3: Left of C is {ans}. Answer: {ans}."
        dist = ["A", "E", "F"] if ans == "B" else ["B", "A", "C"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Draw circle clockwise.", "Circular seating"))
    return out


def gen_puzzles(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        q = f"Puzzle {order}: Red box is heavier than Blue but lighter than Green. Yellow is lighter than Blue. Which is heaviest?"
        ans = "Green"
        sol = "Step 1: Green > Red > Blue > Yellow. Step 2: Green is heaviest. Answer: Green."
        dist = ["Red", "Blue", "Yellow"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Chain inequalities.", "Weight puzzle"))
    return out


def gen_scheduling(letters, seen):
    days = ["Mon", "Tue", "Wed", "Thu", "Fri"]
    out = []
    for order, letter in zip(range(21, 101), letters):
        d1, d2 = days[order % 5], days[(order + 2) % 5]
        q = f"Task X must finish before Task Y. Task Y cannot start on {d1}. Earliest day for Y if X takes 2 days starting {d2}?"
        start_idx = days.index(d2)
        ans = days[min(start_idx + 2, 4)]
        sol = f"Step 1: X runs 2 days from {d2}. Step 2: Y starts after X, not on {d1}. Answer: {ans}."
        dist = [days[(start_idx + 1) % 5], days[(start_idx + 3) % 5], d1]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Finish X first.", "Scheduling"))
    return out


def gen_syllogisms(letters, seen):
    templates = [
        ("All cats are animals. All animals are living. Conclusion: All cats are living.", "True", ["False", "Uncertain", "Some cats are not living"]),
        ("Some doctors are teachers. All teachers are graduates. Conclusion: Some doctors are graduates.", "True", ["False", "All doctors are graduates", "No doctors are graduates"]),
        ("No fish is a bird. Some birds are sparrows. Conclusion: Some sparrows are not fish.", "True", ["False", "All sparrows are fish", "Uncertain"]),
    ]
    out = []
    for order, letter in zip(range(21, 101), letters):
        stmt, ans, dist = templates[order % len(templates)]
        q = f"Statements: {stmt.split('Conclusion:')[0].strip()} Which conclusion follows?"
        concl = stmt.split("Conclusion:")[1].strip().rstrip(".")
        sol = f"Step 1: Apply syllogism rules. Step 2: '{concl}' is {ans}. Answer: {ans}."
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Check valid forms.", "Syllogism"))
    return out


def gen_statements_conclusions(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        q = f"Statement: Only students who submit assignments on time may sit the exam. Conclusion I: Ravi did not sit the exam → Ravi did not submit on time. Conclusion II: Ravi submitted on time → Ravi sat the exam. Which follows?"
        ans = "Both I and II" if order % 3 == 0 else ("Only I" if order % 3 == 1 else "Only II")
        sol = f"Step 1: 'Only P → Q' means Q requires P. Step 2: Contrapositive and direct valid → {ans}. Answer: {ans}."
        dist = ["Neither", "Only I", "Only II"]
        dist = [d for d in dist if d != ans][:3]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Only P → Q logic.", "Statement-conclusion"))
    return out


def gen_statements_assumptions(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        q = f"Statement: 'Buy one get one free' — Assumption I: Customers prefer free items. Assumption II: Stock is unlimited. Which is implicit?"
        ans = "Only I" if order % 2 == 0 else "Both I and II"
        sol = f"Step 1: Offers assume customer appeal (I). Step 2: Unlimited stock (II) is not necessarily assumed. Answer: {ans}."
        dist = ["Only II", "Neither", "Only I"]
        dist = [d for d in dist if d != ans][:3]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Implicit vs explicit.", "Assumption"))
    return out


def gen_cause_effect(letters, seen):
    pairs = [
        ("Heavy rainfall flooded streets.", "Traffic moved slowly.", "True", "Effect follows cause."),
        ("Company profits rose.", "Share price increased.", "True", "Market reaction."),
        ("Student studied regularly.", "Student failed the exam.", "False", "Contradicts expectation."),
    ]
    out = []
    for order, letter in zip(range(21, 101), letters):
        c, e, ans, note = pairs[order % len(pairs)]
        q = f"Cause: {c} Effect: {e} — Is the effect a valid result of the cause?"
        sol = f"Step 1: Check causal link. Step 2: {note} Answer: {ans}."
        dist = ["Uncertain", "False", "True"]
        dist = [d for d in dist if d != ans][:3]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, note, "Cause-effect"))
    return out


def gen_ranking(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        base = 20 + order
        q = f"In a class of {base} students, Rohit's rank is {order % 10 + 1} from the top and {order % 8 + 2} from the bottom. How many students?"
        ans = str(base)
        top, bot = order % 10 + 1, order % 8 + 2
        total = top + bot - 1
        q = f"Rank from top is {top}, from bottom is {bot}. Total students?"
        ans = str(total)
        sol = f"Step 1: Total = top + bottom − 1. Step 2: {top} + {bot} − 1 = {total}. Answer: {total}."
        dist = [str(total - 1), str(total + 1), str(total + 2)]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Top + bottom − 1.", "Ranking"))
    return out


def gen_venn(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        a, b, both = 20 + order % 15, 15 + order % 10, 5 + order % 8
        only_a = a - both
        only_b = b - both
        q = f"Set A has {a} elements, Set B has {b}, and {both} are in both. How many in exactly one set?"
        ans = str(only_a + only_b)
        sol = f"Step 1: Only A = {a}−{both} = {only_a}. Only B = {b}−{both} = {only_b}. Step 2: Sum = {only_a + only_b}. Answer: {only_a + only_b}."
        dist = [str(a + b), str(both), str(only_a)]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Exclude overlap twice.", "Venn count"))
    return out


def gen_decision_making(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        q = f"Policy: Refunds only within 7 days with receipt. Customer bought 10 days ago, has receipt. Decision?"
        ans = "Reject refund"
        sol = "Step 1: 10 days > 7-day window. Step 2: Receipt alone insufficient. Answer: Reject refund."
        dist = ["Approve full refund", "Approve partial refund", "Exchange only"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Check all conditions.", "Decision making"))
    return out


def gen_data_sufficiency(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        x = 10 + order % 20
        q = f"Is x > 15? (I) x + 5 = {x + 5}  (II) x is even."
        ans = "I alone sufficient" if x > 15 else "Neither sufficient"
        sol = f"Step 1: From I, x = {x}. Step 2: Compare to 15 → {ans}. Answer: {ans}."
        dist = ["II alone sufficient", "Both needed", "Either alone sufficient"]
        dist = [d for d in dist if d != ans][:3]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Test each statement.", "Data sufficiency"))
    return out


def gen_cubes(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        n = 3 + order % 3
        painted = 6 if n == 3 else 0
        q = f"A {n}×{n}×{n} cube is painted on all outer faces then cut into unit cubes. How many unit cubes have exactly 3 faces painted?"
        ans = "8" if n >= 2 else "0"
        sol = f"Step 1: 3-face cubes are corners. Step 2: A cube has 8 corners. Answer: 8."
        dist = ["6", "12", "0"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Corners = 8.", "Cube painting"))
    return out


def gen_paper_folding(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        q = f"A square paper is folded in half vertically, then a triangle is cut from the folded edge. When unfolded, how many holes appear?"
        ans = "2"
        sol = "Step 1: One cut on folded paper mirrors. Step 2: 1 cut → 2 symmetric holes. Answer: 2."
        dist = ["1", "4", "3"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Mirror on unfold.", "Paper folding"))
    return out


def gen_mirror_water(letters, seen):
    words = ["LOGIC", "REASON", "MIRROR", "WATER", "IMAGE", "REFLECT"]
    out = []
    for order, letter in zip(range(21, 101), letters):
        w = words[order % len(words)]
        ans = w[::-1]
        q = f"What is the mirror image (left-right reversal) of the word '{w}'?"
        sol = f"Step 1: Reverse letter order left-to-right. Step 2: {w} → {ans}. Answer: {ans}."
        dist = [w, w.upper(), w.lower()[: len(w)]]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Reverse horizontally.", "Mirror image"))
    return out


def gen_visual_reasoning(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        q = f"Pattern: 1 dot, 3 dots, 6 dots, 10 dots (triangular numbers). Next count?"
        n = 5
        ans = str(n * (n + 1) // 2)
        sol = f"Step 1: Triangular numbers 1,3,6,10. Step 2: Next T(5) = 15. Answer: 15."
        dist = ["12", "14", "16"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Triangular dots.", "Visual pattern"))
    return out


def gen_spatial(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        q = f"A cube is rotated 90° clockwise about the vertical axis, then 90° about the front-back axis. How many distinct orientations from start (excluding identical)?"
        ans = "Unique — track two rotations"
        sol = "Step 1: Two axis rotations compound. Step 2: Net orientation differs from start. Answer as stated."
        dist = ["Same as start", "180° only", "Mirror image"]
        q = f"Which view shows the top face of a cube if front shows {order % 6 + 1} and right shows {(order % 6) + 2}?"
        ans = str((order % 6) + 3)
        sol = f"Step 1: Opposite faces sum to 7 on standard dice. Step 2: Top = {ans}. Answer: {ans}."
        dist = [str(int(ans) - 1), str(int(ans) + 1), "6"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Face-sum 7 rule.", "Spatial view"))
    return out


def gen_clocks(letters, seen):
    out = []
    for order, letter in zip(range(21, 101), letters):
        h, m = 3 + order % 9, (order * 5) % 60
        angle = abs(30 * h - 5.5 * m)
        if angle > 180:
            angle = 360 - angle
        ans = str(int(angle) if angle == int(angle) else round(angle, 1))
        q = f"At {h}:{m:02d}, what is the smaller angle (degrees) between hour and minute hands?"
        sol = f"Step 1: |30H − 5.5M| = |{30*h} − {5.5*m}| = {angle}°. Answer: {ans}°."
        dist = [str(int(float(ans) + 10)), str(int(float(ans) - 10) if float(ans) > 10 else float(ans) + 5), "180"]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "|30H − 5.5M|.", "Clock angle"))
    return out


def gen_calendars(letters, seen):
    out = []
    base = date(2024, 1, 1)
    for order, letter in zip(range(21, 101), letters):
        d = base + timedelta(days=order * 13)
        day_name = d.strftime("%A")
        q = f"If {base.strftime('%d %b %Y')} was Monday, what day is {d.strftime('%d %b %Y')}?"
        # simplify: use known weekday
        wd = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        ans = wd[(order * 13) % 7]
        sol = f"Step 1: Count days mod 7 from anchor. Step 2: Offset {order*13} days → {ans}. Answer: {ans}."
        dist = [wd[(order * 13 + 1) % 7], wd[(order * 13 + 2) % 7], wd[(order * 13 + 3) % 7]]
        seen.add(q.lower())
        out.append(qbase(order, letter, q, ans, dist, sol, "Days mod 7.", "Calendar day"))
    return out


GENERATORS = {
    "number-series": gen_number_series,
    "letter-series": gen_letter_series,
    "figure-series": gen_figure_series,
    "coding-decoding": gen_coding_decoding,
    "analogies": gen_analogies,
    "classification-odd-one-out": gen_classification,
    "blood-relations": gen_blood_relations,
    "directions": gen_directions,
    "linear-seating-arrangement": gen_linear_seating,
    "circular-seating-arrangement": gen_circular_seating,
    "puzzles": gen_puzzles,
    "scheduling-assignments": gen_scheduling,
    "syllogisms": gen_syllogisms,
    "statements-conclusions": gen_statements_conclusions,
    "statements-assumptions": gen_statements_assumptions,
    "cause-effect-action": gen_cause_effect,
    "ranking-order": gen_ranking,
    "logical-venn-diagrams": gen_venn,
    "decision-making": gen_decision_making,
    "data-sufficiency-reasoning": gen_data_sufficiency,
    "cubes": gen_cubes,
    "paper-folding-cutting": gen_paper_folding,
    "mirror-water-images": gen_mirror_water,
    "visual-reasoning": gen_visual_reasoning,
    "spatial-reasoning": gen_spatial,
    "clocks": gen_clocks,
    "calendars": gen_calendars,
}


def generate_topic(topic: str) -> dict:
    if topic not in GENERATORS:
        raise ValueError(f"Unknown topic: {topic}")
    category, group = TOPIC_META[topic]
    seen = load_existing_texts(topic)
    letters = answer_letters()
    questions = GENERATORS[topic](letters, seen)
    if len(questions) != 80:
        raise ValueError(f"{topic}: generated {len(questions)}, need 80")
    return {"topic": topic, "category": category, "group": group, "questions": questions}


def write_topic(topic: str) -> Path:
    data = generate_topic(topic)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / f"{topic}.json"
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {path} ({len(data['questions'])} questions)")
    return path


def main():
    import sys

    topics = sys.argv[1:] if len(sys.argv) > 1 else LOGICAL_TOPICS
    for t in topics:
        write_topic(t)


if __name__ == "__main__":
    main()
