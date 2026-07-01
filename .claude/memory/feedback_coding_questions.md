---
name: feedback-coding-questions
description: Rules for writing problem-solving coding questions — LeetCode style, 2 examples mandatory, 3 solution variants, descriptive names
metadata:
  type: feedback
---

## 1. Two Sample Examples — Mandatory
- `sampleInput` + `sampleOutput` = Example 1
- `sampleInput2` + `sampleOutput2` = Example 2
- `example1Explanation` = step-by-step walkthrough WHY that input gives that output
- `example2Explanation` = same for example 2
- Examples must cover different cases — one normal, one edge (negatives, zeros, all-same)

## 2. Approach Field = HOW TO THINK
Not "what the code does" — what reasoning leads to the solution.
Example: "Start from the last digit — use N%10 to extract it, then N/10 to remove it. Count divisions until N=0."
Must give a mental model, not just the answer.

## 3. Explanation Field = CODE WALKTHROUGH
What the code does line by line. Variable roles, loop behavior, what each operation does.
Different from approach — approach is thinking, explanation is code.

## 4. Three Solution Variants

| Variant | What it means |
|---------|--------------|
| Brute | Most direct/naive — correct but possibly slow |
| Normal | Genuinely improved — different technique, not just renamed brute |
| Optimized | Best known algorithm. If no real improvement → use OPT constant |

**OPT constant:** `"This is already the optimal solution for this problem."`

## 5. Solution Names — Descriptive Format
- NOT: "Brute Force", "Normal Solution", "Optimized"
- YES: `"Nested Loop Check Every Pair — O(N²)"`, `"HashMap: Store Complements for O(N) Lookup"`
- Format: `"<Technique Name> — O(complexity)"`

## 6. Code style
- Step-by-step readable lines, no minification
- All 4 languages: C, Python, Java, C++

## 7. Difficulty by Track
| Track | Audience |
|-------|---------|
| START_CODING | Absolute beginners |
| LOGIC_BUILDING | Building logic skills |
| SKILL_UP | Intermediate LeetCode-style |
| INTERVIEW_PREP | Job-ready classic problems |
| SCENARIO_CODING | Story-based placement problems |

## 8. SCENARIO_CODING Format
- Story context (bus company, hospital, factory...)
- Clear rules in bullet points + example walkthrough
- Clean numeric/string I/O — NOT command parsing like ADD/REMOVE/STATUS
- `isInterview: true`, `companiesThatAsk` filled
