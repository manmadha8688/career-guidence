// Bar Graphs — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "A bar graph shows quantities as rectangular bars whose length equals the value, so you can compare items at a glance. In placement tests (TCS NQT, Infosys, Wipro, CAT-style) 30-40% of the Data Interpretation section is built on single-bar and grouped/multi-bar graphs. Marks are won not by hard math but by reading the axis and units correctly and by avoiding the percentage and average traps that examiners plant on purpose.",

  howToRead: [
    { step: "Read the title and both axes first", detail: "The title tells you WHAT is measured (sales, students, production). The vertical axis gives the VALUE scale and the horizontal axis gives the CATEGORIES (years, cities, products). Never start calculating before you know what each axis means." },
    { step: "Lock the unit in your mind", detail: "Bars are almost never plain numbers. Check for 'in thousands', 'in lakh', 'in crore', '%'. A bar of height 40 in 'thousands' means 40,000. Every final answer must carry that same unit." },
    { step: "For grouped bars, decode the legend", detail: "A grouped bar has 2-3 coloured bars per category. The legend maps each colour to a series (e.g. blue = 2021, orange = 2022). Confusing the two series is the No.1 grouped-bar error." },
    { step: "Estimate each bar's value from gridlines", detail: "Read the top of the bar against the nearest gridline. If gridlines are at 0,10,20,30 and the bar sits just above the 30 line, call it ~32. Approximation is fine for 'which is largest' questions; be exact only when the numbers are printed on the bars." },
    { step: "Jot the numbers in a mini-table", detail: "Before answering, quickly copy every bar value into a small table on your rough sheet. You will reuse the same numbers for 4-5 questions on that graph, so reading once and reusing is far faster than re-reading the chart each time." },
    { step: "Match the question's unit and time-frame", detail: "Questions mix 'total', 'average', 'per year', 'the given years'. Underline the exact scope (which categories, which series) before computing so you sum only what is asked." },
  ],

  speedTips: [
    "Sum small, then scale: to add 200+250+300+250+400 drop the trailing zero (2+2.5+3+2.5+4 = 14) then add it back -> 1400. Averages get instant too (1400/5 = 280).",
    "Percentage of total: convert the fraction, don't long-divide. 400 out of 1400 = 4/14 = 2/7 ~ 28.6%. Memorise 1/7 = 14.3%, 1/8 = 12.5%, 1/9 = 11.1%, 1/11 = 9.1%, 1/12 = 8.3%.",
    "Percentage change = difference / OLD (base) value x 100. The base is always the earlier / reference figure — never the new one. Wrong base is the most common lost mark.",
    "'A is x% more than B' uses B as base; 'B is y% less than A' uses A as base. They are DIFFERENT numbers. If A=200, B=160: A is 25% more than B, but B is only 20% less than A.",
    "For 'how many times', divide directly (300/200 = 1.5 times) and for 'how much more' subtract first. Read the verb carefully.",
    "Never simple-average percentages that have different bases. Average growth of a total = (new total - old total)/old total, NOT the mean of the individual growth rates.",
    "Round-number scan: for 'maximum increase over previous year', compare fractions, not raw gaps. A jump of 10 on a base of 20 (50%) beats a jump of 15 on a base of 60 (25%).",
  ],

  traps: [
    "Ignoring the unit — answering '40' when the axis says 'in thousands' (real value 40,000). Always re-attach the unit.",
    "Percent vs percentage-points — 90% and 50% differ by 40 percentage points, but 90% is 80% higher than 50%. Questions deliberately ask one and tempt the other.",
    "Averaging percentages / average-of-averages — the mean of four cities' growth rates is NOT the overall growth of the total; overall change must be recomputed from the summed totals.",
    "Wrong base in % change — dividing the difference by the new value instead of the old, or by the wrong year.",
    "Absolute vs relative growth — the item with the biggest rise in units is often NOT the one with the biggest percentage rise (small base inflates the %). Read which one is asked.",
    "Grouped-bar series mix-up — reading the 2021 bar for a 2022 question, or summing across the wrong colour. Confirm the legend every time.",
  ],

  questionTypes: [
    { name: "Direct read / highest-lowest", how: "Just read bar heights and pick the max or min. Scan tops of bars; no arithmetic. Watch the unit on the answer." },
    { name: "Total & average over the period", how: "Sum the relevant bars, then divide by the count for average. Use the drop-the-zero trick. State the unit." },
    { name: "Difference / gap between two items or series", how: "Subtract the two bar values. For 'maximum/minimum difference across years' compute all the gaps and compare. In grouped bars this is series-A minus series-B per category." },
    { name: "Percentage change over previous period", how: "(current - previous)/previous x 100. Base = previous value. For 'maximum % increase' compare fractions across all consecutive pairs, not raw differences." },
    { name: "Percentage of total / contribution / share", how: "part / whole x 100. Whole = sum of the category or the grand total, whichever is asked. Convert to a known fraction for speed." },
    { name: "Ratio and 'how many times' / multiples", how: "Divide the two values and simplify to lowest terms (35/20 = 7:4). 'How many times' wants the plain quotient (1.5 times); 'how much more' wants a subtraction first." },
    { name: "Comparison: 'A is what % more/less than B'", how: "Fix the base from the wording — 'more than B' -> base B; 'less than A' -> base A. Compute diff/base x 100. Expect the same pair asked both ways to expose the trap." },
    { name: "Combined / merged / weighted values", how: "When two categories are merged (or a pass% of two depts combined), add the raw numerators and add the raw denominators, THEN divide. Never average the two percentages." },
    { name: "Derived-value word twist", how: "Bars give a base quantity, the question adds a rate: profit per unit, marks per student, cost per tonne. Compute the bar total first, then multiply by the rate, keeping units consistent (thousands x rupees -> crore)." },
  ],

  visual: {
    note: "Anchor data — units sold (in thousands) of Product A and Product B across four quarters. The grouped bar and the table below show the SAME numbers. Product A totals 200 (thousand); Product B totals 160 (thousand).",
    charts: [
      {
        type: "groupedBar",
        unit: "units sold (in thousands)",
        categories: ["Q1", "Q2", "Q3", "Q4"],
        series: [
          { name: "Product A", data: [40, 50, 60, 50] },
          { name: "Product B", data: [30, 40, 50, 40] },
        ],
      },
      {
        type: "table",
        caption: "Same data (in thousands)",
        columns: ["Quarter", "Product A", "Product B", "Total"],
        rows: [
          ["Q1", 40, 30, 70],
          ["Q2", 50, 40, 90],
          ["Q3", 60, 50, 110],
          ["Q4", 50, 40, 90],
          ["Total", 200, 160, 360],
        ],
        highlightCol: 3,
      },
    ],
  },

  worked: {
    question:
      "Over the four quarters, by what percent are Product A's total sales MORE than Product B's total sales? Also, by what percent are Product B's total sales LESS than Product A's? (units in thousands)",
    steps: [
      { action: "Total Product A = 40+50+60+50 = 200 (thousand units).", why: "Sum the A bars across all four quarters — this is the figure the question compares." },
      { action: "Total Product B = 30+40+50+40 = 160 (thousand units).", why: "Sum the B bars the same way; the two totals are what we compare." },
      { action: "Absolute difference = 200 - 160 = 40 (thousand units).", why: "Both parts of the question use this same gap; only the base changes." },
      { action: "'A more than B' uses B as the base: 40 / 160 x 100 = 25%.", why: "The phrase 'more than B' means we measure the gap relative to B, the item being exceeded." },
      { action: "'B less than A' uses A as the base: 40 / 200 x 100 = 20%.", why: "The phrase 'less than A' means we measure the same gap relative to A, so the base and therefore the answer change." },
    ],
    answer:
      "Product A is 25% more than Product B, while Product B is 20% less than Product A. Same 40-thousand gap, different bases — this asymmetry is the classic trap.",
  },

  sheets: [
    {
      title: "Sheet 1 — Reading a single bar graph",
      difficulty: "Easy",
      note: "Annual production of a factory (in tonnes) from 2018 to 2022. Read one bar per year. Total = 1400 tonnes, average = 280 tonnes.",
      charts: [
        {
          type: "bar",
          unit: "production (in tonnes)",
          categories: ["2018", "2019", "2020", "2021", "2022"],
          series: [{ name: "Production", data: [200, 250, 300, 250, 400] }],
        },
      ],
      questions: [
        {
          question: "In which year was production the highest?",
          answer: "2022 (400 tonnes).",
          solution: "Scan the bar tops: 200, 250, 300, 250, 400. The tallest is 2022 at 400 tonnes.",
        },
        {
          question: "In which year was production the lowest?",
          answer: "2018 (200 tonnes).",
          solution: "The shortest bar is 2018 at 200 tonnes.",
        },
        {
          question: "What was the total production over the five years?",
          answer: "1400 tonnes.",
          solution: "200+250+300+250+400. Drop the zeros: 2+2.5+3+2.5+4 = 14, add zero back = 1400 tonnes.",
        },
        {
          question: "What was the average annual production?",
          answer: "280 tonnes.",
          solution: "Total 1400 / 5 years = 280 tonnes.",
        },
        {
          question: "What is the difference between the highest and the lowest year's production?",
          answer: "200 tonnes.",
          solution: "Highest 400 (2022) - lowest 200 (2018) = 200 tonnes.",
        },
        {
          question: "In how many years was production above the five-year average?",
          answer: "2 years (2020 and 2022).",
          solution: "Average = 280. Compare each: 200 no, 250 no, 300 yes, 250 no, 400 yes. Two years exceed 280.",
        },
        {
          question: "Production in 2020 was how many times that of 2018?",
          answer: "1.5 times.",
          solution: "2020 = 300, 2018 = 200. 300/200 = 1.5 times.",
        },
        {
          question: "What was the percentage increase in production from 2019 to 2022?",
          answer: "60%.",
          solution: "Change / base = (400 - 250) / 250 x 100 = 150/250 x 100 = 60%. Base is the earlier year, 2019.",
        },
      ],
    },

    {
      title: "Sheet 2 — Grouped bar: two companies compared",
      difficulty: "Easy-Medium",
      note: "Revenue (₹ crore) of Company X and Company Y over four years. Two bars per year. X totals 290 crore; Y totals 215 crore.",
      charts: [
        {
          type: "groupedBar",
          unit: "revenue (₹ crore)",
          categories: ["2019", "2020", "2021", "2022"],
          series: [
            { name: "Company X", data: [50, 60, 80, 100] },
            { name: "Company Y", data: [35, 50, 60, 70] },
          ],
        },
      ],
      questions: [
        {
          question: "In which year was Company X's revenue the highest?",
          answer: "2022 (₹100 crore).",
          solution: "X's bars: 50, 60, 80, 100. Tallest is 2022 at ₹100 crore.",
        },
        {
          question: "What was Company Y's total revenue over the four years?",
          answer: "₹215 crore.",
          solution: "35+50+60+70 = 215. Y's total revenue is ₹215 crore.",
        },
        {
          question: "In which year was the gap between X and Y the maximum?",
          answer: "2022 (gap ₹30 crore).",
          solution: "Gaps (X-Y): 50-35=15, 60-50=10, 80-60=20, 100-70=30. Largest is 30 in 2022.",
        },
        {
          question: "In which year was the gap between X and Y the minimum?",
          answer: "2020 (gap ₹10 crore).",
          solution: "From the gaps 15, 10, 20, 30 the smallest is 10 in 2020.",
        },
        {
          question: "What was the combined revenue of X and Y in 2021?",
          answer: "₹140 crore.",
          solution: "X 2021 = 80, Y 2021 = 60. 80 + 60 = ₹140 crore.",
        },
        {
          question: "What was Company X's average annual revenue?",
          answer: "₹72.5 crore.",
          solution: "Total X = 50+60+80+100 = 290. 290 / 4 = ₹72.5 crore.",
        },
        {
          question: "By what percent was X's 2022 revenue higher than its 2019 revenue?",
          answer: "100%.",
          solution: "(100 - 50) / 50 x 100 = 50/50 x 100 = 100%. Base is 2019 (=50), so revenue doubled.",
        },
        {
          question: "In which year did Company Y record its highest percentage growth over the previous year?",
          answer: "2020 (about 42.9%).",
          solution: "Y year-on-year: 2020 (50-35)/35 = 42.9%, 2021 (60-50)/50 = 20%, 2022 (70-60)/60 = 16.7%. Highest % growth is 2020, even though later absolute jumps look similar — small base inflates the %.",
        },
      ],
    },

    {
      title: "Sheet 3 — Grouped bar: cities across two years (traps)",
      difficulty: "Medium-Hard",
      note: "Cars sold (in thousands) by a dealer in four cities in 2021 vs 2022. 2021 total = 100 thousand; 2022 total = 140 thousand. Watch absolute-vs-percentage and average-of-percentages traps.",
      charts: [
        {
          type: "groupedBar",
          unit: "cars sold (in thousands)",
          categories: ["Delhi", "Mumbai", "Chennai", "Kolkata"],
          series: [
            { name: "2021", data: [60, 10, 20, 10] },
            { name: "2022", data: [75, 20, 30, 15] },
          ],
        },
      ],
      questions: [
        {
          question: "How many cars in total did the dealer sell in 2022 (all cities)?",
          answer: "140 thousand cars.",
          solution: "75 + 20 + 30 + 15 = 140 thousand cars.",
        },
        {
          question: "Which city had the largest ABSOLUTE increase in sales from 2021 to 2022?",
          answer: "Delhi (increase of 15 thousand).",
          solution: "Increases: Delhi 75-60=15, Mumbai 20-10=10, Chennai 30-20=10, Kolkata 15-10=5. Largest absolute rise is Delhi (15 thousand).",
        },
        {
          question: "Which city had the highest PERCENTAGE growth from 2021 to 2022?",
          answer: "Mumbai (100%).",
          solution: "Delhi 15/60=25%, Mumbai 10/10=100%, Chennai 10/20=50%, Kolkata 5/10=50%. Highest % growth is Mumbai — note it is NOT Delhi, which had the biggest absolute rise. Small base inflates the percentage.",
        },
        {
          question: "What was the overall percentage increase in the dealer's total sales from 2021 to 2022?",
          answer: "40%.",
          solution: "Total rose from 100 to 140 thousand. (140-100)/100 x 100 = 40%.",
        },
        {
          question: "What was the average number of cars sold per city in 2022?",
          answer: "35 thousand cars.",
          solution: "Total 2022 = 140 thousand / 4 cities = 35 thousand per city.",
        },
        {
          question: "TRICKY: A manager averages the four cities' growth rates (25%, 100%, 50%, 50%) and reports overall growth as 56.25%. Is this correct? What is the true overall growth?",
          answer: "Incorrect. True overall growth is 40%.",
          solution: "Simple average = (25+100+50+50)/4 = 225/4 = 56.25%. But percentages with different bases cannot be simple-averaged. Overall growth must use the summed totals: (140-100)/100 = 40%. The average-of-percentages overstates because Mumbai's 100% sits on a tiny base of 10.",
        },
        {
          question: "What is the ratio of Chennai's 2022 sales to Delhi's 2021 sales?",
          answer: "1 : 2.",
          solution: "Chennai 2022 = 30, Delhi 2021 = 60. 30/60 = 1/2, i.e. 1 : 2.",
        },
        {
          question: "If each car sold yields ₹50,000 profit, what was the dealer's total profit in 2021?",
          answer: "₹500 crore.",
          solution: "2021 sales = 100 thousand = 100,000 cars. 100,000 x ₹50,000 = ₹5,00,00,00,000 = ₹500 crore.",
        },
      ],
    },

    {
      title: "Sheet 4 — Appeared vs passed (percent-points, averages, merging)",
      difficulty: "Hard",
      note: "Students who appeared and passed an exam across four departments. Total appeared = 600, total passed = 450 (overall pass rate 75%). The grouped bar and the table show the same figures.",
      charts: [
        {
          type: "groupedBar",
          unit: "number of students",
          categories: ["CSE", "ECE", "MECH", "CIVIL"],
          series: [
            { name: "Appeared", data: [200, 200, 100, 100] },
            { name: "Passed", data: [180, 140, 80, 50] },
          ],
        },
        {
          type: "table",
          caption: "Appeared, passed and pass % by department",
          columns: ["Dept", "Appeared", "Passed", "Failed", "Pass %"],
          rows: [
            ["CSE", 200, 180, 20, "90%"],
            ["ECE", 200, 140, 60, "70%"],
            ["MECH", 100, 80, 20, "80%"],
            ["CIVIL", 100, 50, 50, "50%"],
            ["Total", 600, 450, 150, "75%"],
          ],
          highlightCol: 4,
        },
      ],
      questions: [
        {
          question: "What was the overall pass percentage across all departments?",
          answer: "75%.",
          solution: "Total passed 450 / total appeared 600 x 100 = 75%.",
        },
        {
          question: "Which department had the highest pass percentage?",
          answer: "CSE (90%).",
          solution: "CSE 180/200=90%, ECE 140/200=70%, MECH 80/100=80%, CIVIL 50/100=50%. Highest is CSE at 90%.",
        },
        {
          question: "Which department had the lowest pass percentage?",
          answer: "CIVIL (50%).",
          solution: "From 90%, 70%, 80%, 50% the lowest is CIVIL at 50%.",
        },
        {
          question: "TRICKY: The simple average of the four departmental pass rates is 72.5%, but the overall pass rate is 75%. Why do they differ, and which is the correct overall rate?",
          answer: "75% is correct; 72.5% is a meaningless average-of-averages.",
          solution: "Simple average = (90+70+80+50)/4 = 290/4 = 72.5%. But departments have different sizes, so rates must be weighted by students. Correct overall = total passed / total appeared = 450/600 = 75%. CSE and ECE have twice as many students, pulling the true rate above the plain mean.",
        },
        {
          question: "How many students failed overall?",
          answer: "150 students.",
          solution: "Appeared 600 - passed 450 = 150 failed.",
        },
        {
          question: "Which department had the most failures in absolute numbers?",
          answer: "ECE (60 failures).",
          solution: "Failures: CSE 200-180=20, ECE 200-140=60, MECH 100-80=20, CIVIL 100-50=50. Highest is ECE (60) — even though CIVIL has the worst pass RATE, ECE has the most failed STUDENTS.",
        },
        {
          question: "TRICKY: CSE's pass rate is how many percentage points higher than CIVIL's, and by what percent is it higher?",
          answer: "40 percentage points higher; 80% higher.",
          solution: "Percentage-points = 90% - 50% = 40 pp. Percent higher = (90-50)/50 x 100 = 80%. The two answers are different — 'percentage points' is a subtraction, 'percent higher' divides by the base (50).",
        },
        {
          question: "TRICKY: If CSE and ECE are treated as one combined group, what is their combined pass percentage?",
          answer: "80%.",
          solution: "Add raw numbers, not the rates: passed 180+140=320, appeared 200+200=400. 320/400 x 100 = 80%. (Averaging 90% and 70% happens to also give 80% here only because both have 200 appeared — never rely on that; always merge the raw counts.)",
        },
      ],
    },
  ],
}
