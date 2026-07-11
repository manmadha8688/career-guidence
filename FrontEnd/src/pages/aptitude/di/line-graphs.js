// Line Graphs — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "A line graph plots one or more quantities against an ordered axis (usually years or months) and joins the points with straight segments. The slope of each segment tells the story: an upward segment means growth, a downward segment means decline, and a steeper segment means a faster change. In placement tests (TCS NQT, Infosys, Wipro, CAT-style) you will see two flavours: a SINGLE line (one quantity over time) and a MULTI-LINE / comparison graph (2-3 quantities on the same axes). The single line tests trend, growth rate and averages. The multi-line graph adds the killer questions: the gap between two lines, the year the lines cross, and how many years one series stayed above another. Almost every wrong answer here comes from confusing an absolute change (difference in units) with a percentage change (difference relative to the starting value), or from reading a percentage-share line as if it were an actual quantity. Read the units first, re-derive every sub-question from the plotted numbers, and never carry one answer into the next.",

  howToRead: [
    { step: "Read the title and the two axes", detail: "Identify WHAT is plotted (revenue, users, share), the UNIT on the vertical axis (crore, lakh, thousand, %) and the category on the horizontal axis (years/months). Every final answer must carry that unit." },
    { step: "Note the scale and gridlines", detail: "Check the vertical scale interval (does each gridline mean 5, 10 or 50?). A tall-looking spike may be a small absolute change on a fine scale. Estimate each point to the nearest gridline before calculating." },
    { step: "Trace each line end to end", detail: "For a single line, note the overall direction and any dips. For multiple lines, follow each series separately and mark where they rise, fall, meet or cross. Match each line to its legend colour/label so you never mix series." },
    { step: "Mark the extremes and the crossover", detail: "Spot the highest and lowest points of each line and, for two lines, the year(s) where they are equal or where one overtakes the other. These points power most sub-questions." },
    { step: "Convert the visual into numbers", detail: "Before answering, jot the value of each point in a quick row. All arithmetic (differences, %, averages, ratios) should be done on these numbers, not by eyeballing slopes." },
    { step: "Re-read what the question actually asks", detail: "Distinguish absolute change vs percentage change, percentage vs percentage-point, and a share-% line vs an actual-quantity line. The trap is almost always in the wording, not the graph." },
  ],

  speedTips: [
    "Write the plotted values in a single row across the years first; you will reuse them for 4-5 sub-questions.",
    "For 'steepest rise/fall' by absolute amount, just compare the vertical jumps between consecutive points — no division needed.",
    "For 'highest percentage growth', compare each rise against its OWN starting value; the biggest jump is often not the biggest percentage.",
    "The gap between two lines in any year is a subtraction; scan for where the two lines are visually farthest apart or closest, then confirm by subtracting.",
    "For averages, sum the plotted values and divide by the count of points — don't average the slopes.",
    "'In how many years did A exceed B' = count the years where A's point sits strictly above B's point; equal years do NOT count.",
    "Round only at the final step; keep fractions like 30/180 exact until you divide once.",
  ],

  traps: [
    "Confusing absolute change with percentage change: a +40 rise on a base of 200 (20%) is a smaller percentage than a +30 rise on a base of 120 (25%).",
    "Percentage vs percentage-POINT: a market share going from 20% to 40% is a rise of 20 percentage points but a 100% growth — the two are different answers.",
    "Reading a percentage-share line as an actual quantity: a brand's share can rise while, if the total market shrank, its actual units could fall (and vice-versa) — you need the total to get real numbers.",
    "Counting an equal-value year as 'A exceeded B'. Equal means neither exceeds; the crossover happens BETWEEN the two years around it.",
    "Assuming a steep-looking segment is a big change without checking the vertical scale interval.",
    "Carrying a rounded intermediate answer into the next sub-question, compounding the error across the set.",
  ],

  questionTypes: [
    { name: "Direct value read-off", how: "Locate the year on the x-axis, go up to the point, read the value against the scale. State it with its unit. Easiest marks — do these first." },
    { name: "Absolute change / difference", how: "Subtract the two plotted values (later minus earlier, or line A minus line B). Answer keeps the original unit (crore, thousand, etc.)." },
    { name: "Year-on-year percentage change", how: "(this year - previous year) / previous year x 100. Always divide by the PREVIOUS (base) year's value, never the later one. Negative result = a decline." },
    { name: "Steepest rise/fall — absolute vs percentage", how: "For absolute: pick the largest vertical jump between consecutive points. For percentage: compute each jump over its own base — the answers can be different years. Read which one is asked." },
    { name: "Gap between two lines", how: "For each year subtract the lower line from the higher line. 'Largest/smallest gap' = max/min of these differences. The gap itself is a quantity in the graph's unit." },
    { name: "Crossover / turning point / equal year", how: "Find where the two lines meet (equal) or swap order (one overtakes the other). If no exact-equal year, the crossover lies BETWEEN the two consecutive years where the ordering flips." },
    { name: "How many years A exceeded B", how: "Count years where A's value is strictly greater than B's. Exclude equal years. Do it year by year, don't guess from the overall trend." },
    { name: "Average of a series", how: "Add all the plotted values of that line and divide by the number of points. Watch dips — every point counts, including the low ones." },
    { name: "Ratio and cumulative totals", how: "Ratio: put the two plotted values as a fraction and reduce to simplest form. Cumulative: add the values up to (or across) the required years. State the running total with its unit." },
  ],

  visual: {
    note: "Left: a single-line graph — read trend, growth and averages off one series. Right: a two-line comparison graph — used for gap, crossover and 'how many years above' questions. Both are rendered from the numbers below; always convert the picture back to these values before calculating.",
    charts: [
      {
        type: "line",
        unit: "lakh users",
        categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
        series: [{ name: "App users", data: [20, 25, 30, 24, 36, 45] }],
      },
      {
        type: "line",
        unit: "₹ crore",
        categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
        series: [
          { name: "Company A", data: [10, 20, 30, 40, 50, 60] },
          { name: "Company B", data: [40, 36, 32, 28, 24, 20] },
        ],
      },
    ],
  },

  worked: {
    question:
      "The single-line graph shows app users (in lakh) from 2019 to 2024: 20, 25, 30, 24, 36, 45. In which year was the percentage increase in users over the previous year the highest, and what was that percentage?",
    steps: [
      { action: "List the year-on-year changes", why: "2019->2020: +5, 2020->2021: +5, 2021->2022: -6 (a fall), 2022->2023: +12, 2023->2024: +9." },
      { action: "Ignore the year that fell", why: "2022 decreased (30 to 24), so it cannot be a percentage INCREASE — drop it from the contest." },
      { action: "Divide each rise by its previous (base) year", why: "2020: 5/20 = 25%. 2021: 5/25 = 20%. 2023: 12/24 = 50%. 2024: 9/36 = 25%." },
      { action: "Pick the largest percentage", why: "50% (year 2023) beats 25%, 20% and 25%. Note the biggest absolute jump was also 2023 (+12), but that is a coincidence — always check the percentage separately." },
    ],
    answer: "2023, with a 50% increase over 2022.",
  },

  sheets: [
    {
      title: "Sheet 1 — Single Line: Reading, Totals & Trend (Easy)",
      difficulty: "Easy",
      note: "One line, six years. Practise clean value read-offs, totals, averages and simple growth. All values are in thousand units.",
      charts: [
        {
          type: "line",
          unit: "thousand units",
          categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
          series: [{ name: "Sales", data: [30, 50, 40, 60, 70, 80] }],
        },
      ],
      questions: [
        {
          question: "What were the sales in 2020?",
          answer: "40 thousand units",
          solution: "Read the point above 2020 on the line: 30 (2018), 50 (2019), 40 (2020). Answer = 40 thousand units.",
        },
        {
          question: "What were the total sales over all six years?",
          answer: "330 thousand units",
          solution: "30 + 50 + 40 + 60 + 70 + 80 = 330 thousand units.",
        },
        {
          question: "In which year were sales the highest?",
          answer: "2023",
          solution: "The peak of the line is 80 thousand units, at 2023.",
        },
        {
          question: "In how many years did sales exceed 55 thousand units?",
          answer: "3 years",
          solution: "Values above 55: 60 (2021), 70 (2022), 80 (2023). That is 3 years. 50 and 40 are below 55; 55 itself does not appear.",
        },
        {
          question: "What is the difference between the highest and lowest annual sales?",
          answer: "50 thousand units",
          solution: "Highest = 80 (2023), lowest = 30 (2018). 80 - 30 = 50 thousand units.",
        },
        {
          question: "What were the average annual sales over the six years?",
          answer: "55 thousand units",
          solution: "Total 330 / 6 years = 55 thousand units.",
        },
        {
          question: "By what percentage did sales increase from 2019 to 2023?",
          answer: "60%",
          solution: "2019 = 50, 2023 = 80. Increase = 80 - 50 = 30. Percentage = 30/50 x 100 = 60%.",
        },
        {
          question: "In which year did sales first cross 55 thousand units?",
          answer: "2021",
          solution: "Going in order: 30, 50, 40, then 60 in 2021 — the first value above 55. Answer = 2021.",
        },
      ],
    },

    {
      title: "Sheet 2 — Two Lines: Gap, Crossover & Comparison (Medium)",
      difficulty: "Medium",
      note: "Company A rises steadily while Company B declines steadily. Revenues in Rupees crore. Focus on the gap between lines, the crossover, and per-company totals.",
      charts: [
        {
          type: "line",
          unit: "₹ crore",
          categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
          series: [
            { name: "Company A", data: [10, 20, 30, 40, 50, 60] },
            { name: "Company B", data: [40, 36, 32, 28, 24, 20] },
          ],
        },
      ],
      questions: [
        {
          question: "In how many years was Company A's revenue greater than Company B's?",
          answer: "3 years",
          solution: "Compare each year (A vs B): 2019 10<40, 2020 20<36, 2021 30<32, 2022 40>28, 2023 50>24, 2024 60>20. A is greater in 2022, 2023, 2024 = 3 years.",
        },
        {
          question: "Between which two consecutive years did Company A overtake Company B?",
          answer: "Between 2021 and 2022",
          solution: "In 2021, A (30) is still below B (32); in 2022, A (40) is above B (28). The lines cross between 2021 and 2022.",
        },
        {
          question: "In which year was the gap between the two companies the smallest, and how large was it?",
          answer: "2021, gap = ₹2 crore",
          solution: "Gaps |A-B|: 2019=30, 2020=16, 2021=2, 2022=12, 2023=26, 2024=40. Smallest = 2 crore in 2021.",
        },
        {
          question: "In which year was the gap between the two companies the largest?",
          answer: "2024, gap = ₹40 crore",
          solution: "From the gaps 30, 16, 2, 12, 26, 40 the maximum is 40 crore in 2024 (A 60 - B 20).",
        },
        {
          question: "What was Company A's total revenue over the six years?",
          answer: "₹210 crore",
          solution: "10 + 20 + 30 + 40 + 50 + 60 = 210 crore.",
        },
        {
          question: "What was Company B's average annual revenue?",
          answer: "₹30 crore",
          solution: "B total = 40 + 36 + 32 + 28 + 24 + 20 = 180. Average = 180/6 = 30 crore.",
        },
        {
          question: "By what percentage did Company B's revenue decline from 2019 to 2024?",
          answer: "50%",
          solution: "2019 = 40, 2024 = 20. Decline = 40 - 20 = 20. Percentage = 20/40 x 100 = 50%.",
        },
        {
          question: "In which year was the combined revenue of A and B the highest?",
          answer: "2024, ₹80 crore",
          solution: "Combined A+B: 2019=50, 2020=56, 2021=62, 2022=68, 2023=74, 2024=80. Highest = 80 crore in 2024.",
        },
      ],
    },

    {
      title: "Sheet 3 — Three Lines: Absolute vs Percentage, Ratio & Cumulative (Hard)",
      difficulty: "Hard",
      note: "Three products (X, Y, Z), subscribers in thousands. This sheet contrasts steepest ABSOLUTE rise with steepest PERCENTAGE rise, and adds ratio, cumulative and 'twice-the-value' questions.",
      charts: [
        {
          type: "line",
          unit: "'000 subscribers",
          categories: ["2019", "2020", "2021", "2022", "2023", "2024"],
          series: [
            { name: "Product X", data: [100, 120, 150, 180, 200, 240] },
            { name: "Product Y", data: [80, 100, 90, 130, 160, 160] },
            { name: "Product Z", data: [50, 60, 95, 70, 120, 150] },
          ],
        },
      ],
      questions: [
        {
          question: "In which year did Product X show the steepest rise over the previous year in ABSOLUTE terms?",
          answer: "2024 (+40 thousand)",
          solution: "X year-on-year jumps: 2020 +20, 2021 +30, 2022 +30, 2023 +20, 2024 +40. Largest absolute jump = +40 in 2024.",
        },
        {
          question: "In which year did Product X show the steepest rise over the previous year in PERCENTAGE terms?",
          answer: "2021 (25%)",
          solution: "Each rise over its base: 2020 20/100=20%, 2021 30/120=25%, 2022 30/150=20%, 2023 20/180=11.1%, 2024 40/200=20%. Highest = 25% in 2021 — a DIFFERENT year from the biggest absolute jump.",
        },
        {
          question: "In how many years did Product Y exceed Product Z?",
          answer: "5 years",
          solution: "Y vs Z: 2019 80>50, 2020 100>60, 2021 90<95, 2022 130>70, 2023 160>120, 2024 160>150. Y is greater in all except 2021 = 5 years.",
        },
        {
          question: "What was the ratio of Product X to Product Z in 2024?",
          answer: "8 : 5",
          solution: "2024: X = 240, Z = 150. Ratio 240:150; divide both by 30 -> 8:5.",
        },
        {
          question: "What was the cumulative total of Product Z's subscribers over all six years?",
          answer: "545 thousand",
          solution: "50 + 60 + 95 + 70 + 120 + 150 = 545 thousand subscribers.",
        },
        {
          question: "What was the average annual number of subscribers for Product Y?",
          answer: "120 thousand",
          solution: "Y total = 80 + 100 + 90 + 130 + 160 + 160 = 720. Average = 720/6 = 120 thousand.",
        },
        {
          question: "By how much did Product X grow from 2019 to 2024, in absolute terms and as a percentage?",
          answer: "140 thousand (a 140% increase)",
          solution: "2019 = 100, 2024 = 240. Absolute rise = 240 - 100 = 140 thousand. Percentage = 140/100 x 100 = 140%.",
        },
        {
          question: "In which year did Product X first exceed TWICE the value of Product Z?",
          answer: "2022",
          solution: "Twice Z: 2019 100, 2020 120, 2021 190, 2022 140, 2023 240, 2024 300. X: 100, 120, 150, 180, 200, 240. X first exceeds 2xZ in 2022 (180 > 140); in 2019-2021 it does not.",
        },
      ],
    },

    {
      title: "Sheet 4 — Share vs Actual: Percentage-Point Traps (Hard)",
      difficulty: "Hard",
      note: "The line graph shows two brands' MARKET SHARE in percent; the table gives the total market size each year. The trap: a share-% is not an actual quantity — combine both charts to get real units, and keep percentage separate from percentage-point.",
      charts: [
        {
          type: "line",
          unit: "% market share",
          categories: ["2020", "2021", "2022", "2023", "2024"],
          series: [
            { name: "Brand P", data: [20, 25, 30, 28, 40] },
            { name: "Brand Q", data: [40, 38, 30, 35, 30] },
          ],
        },
        {
          type: "table",
          caption: "Total market size ('000 units)",
          columns: ["Year", "Total market ('000 units)"],
          rows: [
            ["2020", "500"],
            ["2021", "600"],
            ["2022", "800"],
            ["2023", "1000"],
            ["2024", "1000"],
          ],
        },
      ],
      questions: [
        {
          question: "In which year did the two brands have equal market share?",
          answer: "2022",
          solution: "Read the lines: they meet at 30% each in 2022 (P 30, Q 30).",
        },
        {
          question: "By how many percentage POINTS did Brand P's share rise from 2020 to 2024?",
          answer: "20 percentage points",
          solution: "2020 share = 20%, 2024 share = 40%. Rise = 40 - 20 = 20 percentage points (a simple subtraction of shares).",
        },
        {
          question: "By what PERCENTAGE did Brand P's share grow from 2020 to 2024?",
          answer: "100%",
          solution: "Growth relative to the base share: (40 - 20)/20 x 100 = 100%. Note this is different from the 20 percentage-point answer above.",
        },
        {
          question: "In how many years was Brand P's share greater than Brand Q's?",
          answer: "1 year",
          solution: "P vs Q: 2020 20<40, 2021 25<38, 2022 30=30 (equal, not greater), 2023 28<35, 2024 40>30. P is greater only in 2024 = 1 year.",
        },
        {
          question: "In which year did Brand Q record its largest year-on-year drop in share, and by how much?",
          answer: "2022, a drop of 8 percentage points",
          solution: "Q changes: 2021 -2, 2022 -8, 2023 +5, 2024 -5. Largest fall = 8 percentage points in 2022 (38% down to 30%).",
        },
        {
          question: "In which year did Brand P show its steepest rise in share (absolute percentage points)?",
          answer: "2024 (+12 percentage points)",
          solution: "P changes: 2021 +5, 2022 +5, 2023 -2, 2024 +12. Steepest rise = +12 percentage points in 2024 (28% to 40%).",
        },
        {
          question: "Using the table, how many units did Brand P actually sell in 2024?",
          answer: "400 thousand units",
          solution: "2024 total market = 1000 thousand units, Brand P share = 40%. Units = 40% of 1000 = 400 thousand units.",
        },
        {
          question: "How many units did Brand Q sell in 2022? (Show why share alone is not enough.)",
          answer: "240 thousand units",
          solution: "2022 total market = 800 thousand units, Q share = 30%. Units = 30% of 800 = 240 thousand units. The 30% share is meaningless for real sales until multiplied by the year's total market size.",
        },
      ],
    },
  ],
}
