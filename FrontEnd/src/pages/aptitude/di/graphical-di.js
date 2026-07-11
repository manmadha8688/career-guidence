// Graphical DI — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "Graphical DI (comparison graphs) shows two or three series plotted together on the SAME axes — imports vs exports, revenue vs cost, two or three cities/countries/products over time. Unlike single-series charts, the whole game here is COMPARISON: reading the gap between two lines, spotting where they cross, counting how many periods one beat the other, and combining series. In TCS, Infosys, Wipro and CAT-style tests, 3-5 questions hang off one such graph and the trickiest ones never ask a single value — they ask about the relationship between series. Master gap, crossover, ratio-of-two-series, count-of-periods and combined-total and you clear this set fast.",

  howToRead: [
    { step: "Identify each series and its axis unit first", detail: "Read the legend before the data. Note WHICH line/bar colour is which series (Imports vs Exports, City X vs Y vs Z) and the unit on the vertical axis (Rs crore, thousands, $ million). A whole question can flip if you swap the two series." },
    { step: "Read categories left to right as a time story", detail: "The horizontal axis is usually years or months. Scan each series across categories once to feel its trend (rising, falling, dipping) before touching any question. This 5-second scan tells you crossovers and peaks in advance." },
    { step: "Think in GAPS, not just points", detail: "For every category mentally hold the vertical distance between the two series (A minus B). A positive gap means A is on top; a sign flip between two categories is a CROSSOVER. Most comparison questions are just about this gap and its sign." },
    { step: "Mark crossovers and peaks", detail: "A crossover is where the two lines meet/swap order — the answer to 'in which year did B first overtake A'. The highest single point and the widest gap are frequent targets; jot them once so you do not re-scan for every sub-question." },
    { step: "For grouped bars, compare bars WITHIN a category", detail: "In a grouped bar chart each category has 2-3 bars side by side. Compare heights within the group for gap/ratio questions, and read the same-colour bar ACROSS groups for a single series' trend." },
    { step: "Recompute combined and ratio values exactly", detail: "Combined total = add the series values in that one category. Ratio A:B = divide and reduce to lowest terms. Do these on the actual numbers you read off — never eyeball a ratio from bar heights." }
  ],

  speedTips: [
    "For 'how many periods did A exceed B', walk left to right once and tally with a finger — do not compute every value.",
    "The largest-gap year is almost never where a line peaks; it is where one series is high AND the other is low. Scan the vertical distances, not the peaks.",
    "Ratio A:B — first check if both share an obvious common factor (both even, both end in 0 or 5) before long division.",
    "Percentage by which A exceeds B = (A minus B) / B x 100. The denominator is ALWAYS the smaller/base series (B), not A and not the total.",
    "A crossover sits between the last category where A leads and the first where B leads — answer is that FIRST category where the order flips.",
    "Combined total questions: add first, compare after. Do not compare each series separately then guess the sum.",
    "For 'largest increase over the period' compare (last minus first) for each series — a steep-looking line can still have a smaller net rise."
  ],

  traps: [
    "Reading the wrong series — the top line at the start is often NOT the top line at the end. Always confirm colour against the legend for the exact category asked.",
    "Percentage-more confusion: 'A is x% more than B' uses B as base; 'B is what % of A' uses A as base. Wrong base is the single most common mistake here.",
    "Counting the crossover category itself as a period where A>B when they are actually equal there — equal is NOT 'exceeded'.",
    "Assuming the widest visual gap equals the widest real gap when the two series use values with a broken/zoomed axis — trust the numbers you read, not the picture.",
    "Adding across years instead of across series for a 'combined total in year Y' question — combined means the series added within ONE category.",
    "Mixing units when a chart mislabels one series (e.g. one in units, one in hundreds) — check the single stated unit applies to all series before combining."
  ],

  questionTypes: [
    { name: "Direct value read", how: "Read one series' value at one category straight off the graph. The easy warm-up; confirm the correct series colour." },
    { name: "Gap between two series", how: "Compute A minus B (or its absolute value) for a given category, or find the category with the largest/smallest gap by scanning all vertical distances." },
    { name: "Count of periods A exceeded B", how: "Walk across all categories, tally the ones where series A is strictly above series B. Watch out for equal/crossover categories." },
    { name: "Crossover year", how: "Find the category where the order of the two series first flips (B first overtakes A). It sits between the last A-lead and first B-lead category." },
    { name: "Ratio of two series in one period", how: "Take A and B in the SAME category and reduce A:B to lowest terms. Common in 'ratio of imports to exports in year Y'." },
    { name: "Combined total in a period", how: "Add all series' values within one category. Sometimes then compare combined totals across categories to find the highest." },
    { name: "Percentage by which A exceeds B", how: "(A minus B) / B x 100, with the base series B in the denominator. Do NOT use the total or A as base." },
    { name: "Cumulative / total-over-period comparison", how: "Sum each series across ALL categories, then compare totals (which series is bigger overall and by how much). Tests careful addition." },
    { name: "Largest change / growth", how: "For each series compute last-category minus first-category (or a % growth between two given years) and pick the biggest. A visual slope can mislead." }
  ],

  visual: {
    note: "A two-series line graph is the classic comparison chart. Here Imports and Exports of a company are plotted together. Almost every question is about how the two lines relate: gaps, crossovers, ratios, and counts — not single readings.",
    charts: [
      {
        type: "line",
        unit: "Rs crore",
        categories: ["2018", "2019", "2020", "2021", "2022"],
        series: [
          { name: "Imports", data: [420, 480, 510, 560, 640] },
          { name: "Exports", data: [360, 500, 470, 610, 710] }
        ]
      }
    ]
  },

  worked: {
    question: "Using the Imports vs Exports graph above, what is the ratio of Imports to Exports in 2019?",
    steps: [
      { action: "Read both series at the year 2019", why: "The ratio compares the two series within the SAME category, so lock onto 2019 for both lines." },
      { action: "Imports (2019) = 480, Exports (2019) = 500", why: "Read each value off its own line against the legend — do not swap the series." },
      { action: "Write the ratio Imports : Exports = 480 : 500", why: "Order matters — the question asks Imports to Exports, so Imports goes first." },
      { action: "Divide both by their common factor 20 -> 24 : 25", why: "480/20 = 24 and 500/20 = 25; reduce to lowest terms for the exam-form answer." }
    ],
    answer: "24 : 25"
  },

  sheets: [
    {
      title: "Sheet 1 — Two-Product Sales (Line, Easy)",
      difficulty: "Easy",
      note: "A two-series line graph of monthly unit sales for Product A and Product B. Warm up on direct reads, simple gaps, totals and a first count-of-periods question.",
      charts: [
        {
          type: "line",
          unit: "units",
          categories: ["Jan", "Feb", "Mar", "Apr", "May"],
          series: [
            { name: "Product A", data: [200, 250, 300, 280, 350] },
            { name: "Product B", data: [150, 300, 250, 400, 320] }
          ]
        }
      ],
      questions: [
        {
          question: "What were the sales of Product A in March?",
          answer: "300 units",
          solution: "Read Product A at March directly = 300 units."
        },
        {
          question: "In which month were Product B's sales the highest?",
          answer: "April",
          solution: "Product B values: Jan 150, Feb 300, Mar 250, Apr 400, May 320. The maximum is 400 in April."
        },
        {
          question: "What is the total sales of Product A over the five months?",
          answer: "1380 units",
          solution: "200 + 250 + 300 + 280 + 350 = 1380 units."
        },
        {
          question: "In how many months did Product B exceed Product A?",
          answer: "2 months",
          solution: "Compare each month (B vs A): Jan 150<200 no, Feb 300>250 yes, Mar 250<300 no, Apr 400>280 yes, May 320<350 no. B exceeded A in Feb and Apr = 2 months."
        },
        {
          question: "What were the combined sales of both products in April?",
          answer: "680 units",
          solution: "April: Product A 280 + Product B 400 = 680 units."
        },
        {
          question: "What is the difference between Product B and Product A sales in February?",
          answer: "50 units",
          solution: "February: B 300 minus A 250 = 50 units."
        },
        {
          question: "In which month were the sales of the two products closest to each other?",
          answer: "May",
          solution: "Absolute gaps |A-B|: Jan 50, Feb 50, Mar 50, Apr 120, May 30. Smallest gap is 30 in May."
        },
        {
          question: "What is the average monthly sales of Product A over the five months?",
          answer: "276 units",
          solution: "Total for A = 1380 (from Q3). Average = 1380 / 5 = 276 units."
        }
      ]
    },

    {
      title: "Sheet 2 — Revenue vs Cost of a Startup (Grouped Bar, Medium)",
      difficulty: "Medium",
      note: "A grouped bar chart with two bars per year: Revenue and Cost (Rs lakh). Introduces profit (Revenue minus Cost), largest-gap, ratio, and a percentage-growth question.",
      charts: [
        {
          type: "groupedBar",
          unit: "Rs lakh",
          categories: ["2019", "2020", "2021", "2022"],
          series: [
            { name: "Revenue", data: [50, 80, 120, 200] },
            { name: "Cost", data: [60, 70, 90, 140] }
          ]
        }
      ],
      questions: [
        {
          question: "In which year did the startup first make a profit (Revenue greater than Cost)?",
          answer: "2020",
          solution: "Profit = Revenue - Cost: 2019 = 50-60 = -10 (loss), 2020 = 80-70 = +10 (first profit), 2021 = +30, 2022 = +60. First profit is in 2020."
        },
        {
          question: "What was the profit in 2022?",
          answer: "60 Rs lakh",
          solution: "2022: Revenue 200 minus Cost 140 = 60 Rs lakh."
        },
        {
          question: "In how many years did Revenue exceed Cost?",
          answer: "3 years",
          solution: "Revenue > Cost in 2020 (80>70), 2021 (120>90), 2022 (200>140). Not in 2019 (50<60). That is 3 years."
        },
        {
          question: "Which year had the largest gap between Revenue and Cost?",
          answer: "2022",
          solution: "Absolute gaps: 2019 |50-60|=10, 2020 |80-70|=10, 2021 |120-90|=30, 2022 |200-140|=60. Largest is 60 in 2022."
        },
        {
          question: "What is the total Revenue over the four years?",
          answer: "450 Rs lakh",
          solution: "50 + 80 + 120 + 200 = 450 Rs lakh."
        },
        {
          question: "What is the ratio of Revenue to Cost in 2021?",
          answer: "4 : 3",
          solution: "2021: Revenue 120, Cost 90. 120:90, divide both by 30 -> 4:3."
        },
        {
          question: "By what percentage did Revenue grow from 2021 to 2022?",
          answer: "66.67%",
          solution: "Growth = (200 - 120) / 120 x 100 = 80/120 x 100 = 66.67%."
        },
        {
          question: "What is the total Cost across all four years?",
          answer: "360 Rs lakh",
          solution: "60 + 70 + 90 + 140 = 360 Rs lakh."
        }
      ]
    },

    {
      title: "Sheet 3 — Population of Three Cities (Line, Hard)",
      difficulty: "Hard",
      note: "A three-series line graph of city populations (in thousands). Three lines make crossovers, counts and combined totals harder — track each series carefully against the legend.",
      charts: [
        {
          type: "line",
          unit: "thousands",
          categories: ["2018", "2019", "2020", "2021", "2022"],
          series: [
            { name: "City X", data: [120, 140, 160, 150, 180] },
            { name: "City Y", data: [100, 130, 170, 200, 190] },
            { name: "City Z", data: [90, 110, 130, 160, 210] }
          ]
        }
      ],
      questions: [
        {
          question: "In 2020, which city had the highest population?",
          answer: "City Y",
          solution: "2020: X 160, Y 170, Z 130. Highest is City Y at 170 thousand."
        },
        {
          question: "In how many years did City Y's population exceed City X's?",
          answer: "3 years",
          solution: "Y vs X: 2018 100<120 no, 2019 130<140 no, 2020 170>160 yes, 2021 200>150 yes, 2022 190>180 yes. That is 3 years (2020, 2021, 2022)."
        },
        {
          question: "In which year did City Z first exceed City X?",
          answer: "2021",
          solution: "Z minus X: 2018 -30, 2019 -30, 2020 -30, 2021 160-150 = +10, 2022 +30. The sign first turns positive in 2021, so Z first overtakes X in 2021."
        },
        {
          question: "What was the combined population of all three cities in 2022?",
          answer: "580 thousand",
          solution: "2022: X 180 + Y 190 + Z 210 = 580 thousand."
        },
        {
          question: "Which city had the largest increase in population from 2018 to 2022?",
          answer: "City Z",
          solution: "Increase (2022 minus 2018): X 180-120 = 60, Y 190-100 = 90, Z 210-90 = 120. Largest is City Z with +120 thousand."
        },
        {
          question: "What is the ratio of City X to City Y population in 2019?",
          answer: "14 : 13",
          solution: "2019: X 140, Y 130. 140:130, divide both by 10 -> 14:13."
        },
        {
          question: "By what percentage was City Y's population more than City Z's in 2021?",
          answer: "25%",
          solution: "2021: Y 200, Z 160. (200 - 160)/160 x 100 = 40/160 x 100 = 25%."
        },
        {
          question: "In which year was the combined population of all three cities the highest?",
          answer: "2022",
          solution: "Combined totals: 2018 = 120+100+90 = 310, 2019 = 140+130+110 = 380, 2020 = 160+170+130 = 460, 2021 = 150+200+160 = 510, 2022 = 180+190+210 = 580. Highest is 2022."
        }
      ]
    },

    {
      title: "Sheet 4 — Exports of Two Countries (Grouped Bar, Hard)",
      difficulty: "Hard",
      note: "A grouped bar chart comparing yearly exports of Country A and Country B ($ million). Focuses on the trickiest comparison types: count of periods, largest gap, crossover, ratio, percentage-more, and a cumulative total-over-period comparison.",
      charts: [
        {
          type: "groupedBar",
          unit: "$ million",
          categories: ["2017", "2018", "2019", "2020", "2021"],
          series: [
            { name: "Country A", data: [300, 360, 420, 400, 500] },
            { name: "Country B", data: [250, 400, 380, 460, 450] }
          ]
        }
      ],
      questions: [
        {
          question: "In how many years did Country B's exports exceed Country A's?",
          answer: "2 years",
          solution: "B vs A: 2017 250<300 no, 2018 400>360 yes, 2019 380<420 no, 2020 460>400 yes, 2021 450<500 no. B exceeded A in 2018 and 2020 = 2 years."
        },
        {
          question: "Which year had the largest gap between the two countries' exports?",
          answer: "2020",
          solution: "Absolute gaps |A-B|: 2017 50, 2018 40, 2019 40, 2020 |400-460| = 60, 2021 50. Largest is 60 in 2020."
        },
        {
          question: "What were the combined exports of both countries in 2021?",
          answer: "950 $ million",
          solution: "2021: Country A 500 + Country B 450 = 950 $ million."
        },
        {
          question: "What is the total exports of Country A over all five years?",
          answer: "1980 $ million",
          solution: "300 + 360 + 420 + 400 + 500 = 1980 $ million."
        },
        {
          question: "What is the ratio of Country A to Country B exports in 2019?",
          answer: "21 : 19",
          solution: "2019: A 420, B 380. 420:380, divide both by 20 -> 21:19."
        },
        {
          question: "In which year did Country B first overtake Country A?",
          answer: "2018",
          solution: "In 2017 A leads (300>250). In 2018 B 400 > A 360, so the order first flips in 2018 — that is the crossover year."
        },
        {
          question: "By what percentage were Country A's exports more than Country B's in 2021?",
          answer: "11.11%",
          solution: "2021: A 500, B 450. (500 - 450)/450 x 100 = 50/450 x 100 = 11.11%."
        },
        {
          question: "Over the whole period, which country exported more in total and by how much?",
          answer: "Country A, by 40 $ million",
          solution: "Country A total = 1980 (from Q4). Country B total = 250+400+380+460+450 = 1940. A - B = 1980 - 1940 = 40 $ million, so Country A exported more by 40 $ million."
        }
      ]
    }
  ]
}
