// Tabular DI — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "Tabular DI gives you raw numbers laid out in rows and columns — no chart to read off, so every answer is pure arithmetic on the grid. The advanced sets you meet in TCS NQT, Infosys, Wipro and CAT-style papers pack many entities (companies, banks, factories, salesmen) across many periods (months or years), sometimes with a derived Total column or a deliberately blank cell. The winning skill is not reading one number; it is reusing row totals, column totals and the grand total to answer growth %, share of total, ratios and cross-table comparisons quickly and without slips.",

  howToRead: [
    { step: "Read the caption and the unit first", detail: "The unit (Rs crore, thousand units, lakh) decides whether answers stay in the same unit. A wrong unit is the most common silly loss. Note whether rows are entities and columns are periods, or the reverse." },
    { step: "Fix row meaning vs column meaning", detail: "A row total = one entity across all periods (e.g. a company over five years). A column total = all entities in one period (e.g. everyone in 2023). Most multi-step questions need one or the other, so know which is which before you compute." },
    { step: "Pre-compute the totals you will reuse", detail: "Before touching the questions, jot the row totals down the side and column totals along the bottom, then the grand total. Verify: sum of row totals must equal sum of column totals. That single check catches most reading errors." },
    { step: "Translate each question into an operation", detail: "Growth % = (new - old)/old x 100. Share of total = part/whole x 100. Ratio = a:b reduced by the common factor. Average = sum/count. Missing value = given total minus the known cells in that row or column." },
    { step: "Anchor the whole for share questions", detail: "Share of grand total uses the grand total; share within a period uses that column total; share within an entity uses that row total. Picking the wrong whole is the classic trap — decide the denominator first." },
    { step: "Estimate, then confirm", detail: "For approximate MCQs, round to the nearest 10 and eliminate options before doing exact arithmetic. Only compute to the decimal when two options are close." }
  ],

  speedTips: [
    "Write row and column totals in the margins once and reuse them all set long — never re-add a row for each question.",
    "Growth from A to B: memorise the clean jumps — doubling is +100%, x1.5 is +50%, x1.25 is +25%, halving is -50%.",
    "For share of total, keep the grand total handy; every share question then becomes one division.",
    "To compare growth across entities, compare the RATIO new/old, not the absolute rise — the biggest rise is often not the fastest grower.",
    "Reduce ratios by spotting the common factor early (both end in 0 -> drop a zero; both even -> halve).",
    "For average-excluding-one-row, subtract that row total from the grand total, then divide by the reduced count — do not re-add the survivors.",
    "For missing-value cells, always use the total that involves the FEWEST unknown cells (a row total with one blank is instant)."
  ],

  traps: [
    "Confusing row total with column total — read the axis meaning before dividing.",
    "Using the wrong whole in a share question: grand total vs a single period vs a single entity give three different answers.",
    "Assuming the largest absolute increase is the largest percentage growth — a small base can grow faster in %.",
    "Percentage-point vs percentage confusion: a rise from 20% to 30% is +10 points but a +50% change.",
    "Forgetting the unit or mixing two units (crore with lakh) when a question spans different tables.",
    "Answering the period total when the question asks the entity total (or vice versa) because the table was skimmed."
  ],

  questionTypes: [
    { name: "Direct read / single total", how: "Read one cell, or add one full row (entity total) or one full column (period total). Warm-up questions — do not overthink." },
    { name: "Share of total", how: "part / whole x 100. Decide the whole: grand total, a period column total, or an entity row total." },
    { name: "Growth / decline percentage", how: "(later value - earlier value) / earlier value x 100 for a single cell, a row over time, or a column total over time." },
    { name: "Ratio of two totals", how: "Form a:b from two column totals or two row totals and reduce by the common factor to lowest terms." },
    { name: "Average (including / excluding a row)", how: "Average = sum / count. For 'excluding entity X', use (grand total - X row total) / (count - 1)." },
    { name: "Fastest / slowest grower comparison", how: "Compute growth % (or the ratio new/old) for every entity, then pick the max or min. Never compare raw differences." },
    { name: "Missing value from a given total", how: "Given a row or column total, missing cell = total - sum of the known cells in that line." },
    { name: "Cross-table / cross-period comparison", how: "Combine two column totals or two entity totals — e.g. by what % does one period exceed another, or difference between two entities as a % of one." },
    { name: "Multi-step chained", how: "Answers feed forward: find a missing cell, then use it inside a growth %, share or ratio question later in the same set." }
  ],

  visual: {
    note:
      "A dense table with entities down the rows and years across the columns. No totals are printed — you must build the row totals (each division over all years), the column totals (all divisions per year) and the grand total yourself. The secondary bar shows the year-wise column totals so you can sanity-check the trend. Grand total = 1610 (Rs crore): rows 330+420+250+410+200 and columns 200+250+320+380+460 must both give 1610.",
    charts: [
      {
        type: "table",
        caption: "Annual revenue (Rs crore) of five divisions, 2019-2023",
        columns: ["Division", "2019", "2020", "2021", "2022", "2023"],
        rows: [
          ["North", 40, 50, 60, 80, 100],
          ["South", 60, 60, 90, 100, 110],
          ["East", 30, 40, 50, 60, 70],
          ["West", 50, 70, 80, 90, 120],
          ["Central", 20, 30, 40, 50, 60]
        ],
        highlightCol: 5
      },
      {
        type: "bar",
        unit: "Rs crore",
        categories: ["2019", "2020", "2021", "2022", "2023"],
        series: [
          { name: "Total revenue (all divisions)", data: [200, 250, 320, 380, 460] }
        ]
      }
    ]
  },

  worked: {
    question:
      "Using the divisions table above, by what percentage did the total revenue of all divisions grow from 2019 to 2023?",
    steps: [
      { action: "Build the 2019 column total: 40 + 60 + 30 + 50 + 20 = 200 (Rs crore).", why: "The question is about ALL divisions in a year, so we need the column total, not any single row." },
      { action: "Build the 2023 column total: 100 + 110 + 70 + 120 + 60 = 460 (Rs crore).", why: "Same period-wise whole for the later year so the two are comparable." },
      { action: "Apply the growth formula: (460 - 200) / 200 x 100.", why: "Growth % always divides the change by the EARLIER (base) value, here 2019." },
      { action: "Compute: 260 / 200 = 1.3, so 1.3 x 100 = 130%.", why: "Clean division; 260 is 1.3 times the base 200." }
    ],
    answer: "130% growth."
  },

  sheets: [
    {
      title: "Sheet 1 — Enrollment by college (Easy)",
      difficulty: "Easy",
      note:
        "Rows are colleges, columns are courses. No totals printed — compute the row totals (per college) and column totals (per course). Grand total should reconcile to 1580 both ways: rows 400+360+420+400 and columns 440+300+500+340.",
      charts: [
        {
          type: "table",
          caption: "Number of students enrolled, by college and course",
          columns: ["College", "BCA", "BBA", "BCom", "BSc"],
          rows: [
            ["A", 120, 80, 150, 50],
            ["B", 100, 90, 110, 60],
            ["C", 90, 60, 140, 130],
            ["D", 130, 70, 100, 100]
          ]
        }
      ],
      questions: [
        {
          question: "How many students are enrolled in BCom across all four colleges?",
          answer: "500 students.",
          solution: "BCom column total = 150 + 110 + 140 + 100 = 500."
        },
        {
          question: "Which college has the highest total enrollment?",
          answer: "College C, with 420 students.",
          solution: "Row totals: A = 120+80+150+50 = 400; B = 100+90+110+60 = 360; C = 90+60+140+130 = 420; D = 130+70+100+100 = 400. Highest is C at 420."
        },
        {
          question: "What is the total enrollment of College B?",
          answer: "360 students.",
          solution: "100 + 90 + 110 + 60 = 360."
        },
        {
          question: "What is the total number of students across all colleges?",
          answer: "1580 students.",
          solution: "Grand total = row totals 400 + 360 + 420 + 400 = 1580 (check: columns 440 + 300 + 500 + 340 = 1580)."
        },
        {
          question: "In College A, what percentage of students are enrolled in BCom?",
          answer: "37.5%.",
          solution: "BCom in A = 150; College A total = 400. Share = 150 / 400 x 100 = 37.5%."
        },
        {
          question: "What is the ratio of total BCA students to total BSc students (all colleges)?",
          answer: "22 : 17.",
          solution: "BCA total = 120+100+90+130 = 440; BSc total = 50+60+130+100 = 340. Ratio 440 : 340, divide by 20 = 22 : 17."
        },
        {
          question: "What is the average number of BBA students per college?",
          answer: "75 students.",
          solution: "BBA total = 80 + 90 + 60 + 70 = 300; divided by 4 colleges = 75."
        },
        {
          question: "Which course has the lowest total enrollment, and what is it?",
          answer: "BBA, with 300 students.",
          solution: "Column totals: BCA 440, BBA 300, BCom 500, BSc 340. Lowest is BBA at 300."
        }
      ]
    },

    {
      title: "Sheet 2 — Salesmen monthly sales (Medium)",
      difficulty: "Medium",
      note:
        "Rows are salesmen, columns are months. Build row totals (per salesman over five months) and column totals (all salesmen per month). Grand total = 750 both ways: rows 150+200+150+250 and columns 140+150+150+180+130.",
      charts: [
        {
          type: "table",
          caption: "Sales (Rs lakh) by salesman and month",
          columns: ["Salesman", "Jan", "Feb", "Mar", "Apr", "May"],
          rows: [
            ["P", 20, 25, 30, 35, 40],
            ["Q", 40, 35, 45, 50, 30],
            ["R", 30, 30, 30, 40, 20],
            ["S", 50, 60, 45, 55, 40]
          ]
        },
        {
          type: "line",
          unit: "Rs lakh",
          categories: ["Jan", "Feb", "Mar", "Apr", "May"],
          series: [
            { name: "Total sales (all salesmen)", data: [140, 150, 150, 180, 130] }
          ]
        }
      ],
      questions: [
        {
          question: "What is the total sales of salesman S over the five months?",
          answer: "Rs 250 lakh.",
          solution: "50 + 60 + 45 + 55 + 40 = 250."
        },
        {
          question: "In which month were the total sales (all salesmen) the highest?",
          answer: "April, with Rs 180 lakh.",
          solution: "Column totals: Jan 140, Feb 150, Mar 150, Apr 180, May 130. Highest is April at 180."
        },
        {
          question: "What is salesman P's percentage growth in sales from January to May?",
          answer: "100%.",
          solution: "P: Jan 20, May 40. Growth = (40 - 20) / 20 x 100 = 20/20 x 100 = 100%."
        },
        {
          question: "What is the average monthly sales of salesman Q?",
          answer: "Rs 40 lakh.",
          solution: "Q total = 40 + 35 + 45 + 50 + 30 = 200; divided by 5 months = 40."
        },
        {
          question: "Salesman S's total sales are what percentage of the combined sales of all salesmen?",
          answer: "33.33% (one-third).",
          solution: "S total = 250; grand total = 750. Share = 250 / 750 x 100 = 33.33%."
        },
        {
          question: "What is the ratio of total sales in January to total sales in February?",
          answer: "14 : 15.",
          solution: "Jan total = 20+40+30+50 = 140; Feb total = 25+35+30+60 = 150. Ratio 140 : 150, divide by 10 = 14 : 15."
        },
        {
          question: "What was the highest sales recorded by any salesman in a single month, and by whom?",
          answer: "Rs 60 lakh, by salesman S in February.",
          solution: "Scanning every cell, the maximum is 60 (S, February); next highest is 55 (S, April)."
        },
        {
          question: "Which salesman recorded the highest percentage growth in sales from January to April? (Tricky)",
          answer: "Salesman P, with 75% growth.",
          solution: "Jan -> Apr growth: P (35-20)/20 = 75%; Q (50-40)/40 = 25%; R (40-30)/30 = 33.3%; S (55-50)/50 = 10%. Largest is P at 75% — note P had the smallest absolute rise base but the fastest growth."
        }
      ]
    },

    {
      title: "Sheet 3 — Factory production with a missing cell (Hard)",
      difficulty: "Hard",
      note:
        "Rows are factories, columns are years, and a Total column IS printed — but F5's 2022 cell is blank ('?') while its four-year total (300) is given. Recover the missing cell first, then reuse it. After filling it, grand total = 1290; column totals are 2020 = 250, 2021 = 305, 2022 = 345, 2023 = 390.",
      charts: [
        {
          type: "table",
          caption: "Production (thousand units) by factory, 2020-2023, with four-year totals",
          columns: ["Factory", "2020", "2021", "2022", "2023", "Total"],
          rows: [
            ["F1", 50, 60, 70, 80, 260],
            ["F2", 40, 50, 55, 65, 210],
            ["F3", 30, 45, 50, 55, 180],
            ["F4", 70, 80, 90, 100, 340],
            ["F5", 60, 70, "?", 90, 300]
          ],
          highlightCol: 5
        }
      ],
      questions: [
        {
          question: "F5's total production over the four years was 300 thousand units. What was its 2022 production?",
          answer: "80 thousand units.",
          solution: "Missing cell = row total - known cells = 300 - (60 + 70 + 90) = 300 - 220 = 80."
        },
        {
          question: "What was the percentage growth in F1's production from 2020 to 2023?",
          answer: "60%.",
          solution: "F1: 2020 = 50, 2023 = 80. Growth = (80 - 50) / 50 x 100 = 30/50 x 100 = 60%."
        },
        {
          question: "Which factory had the highest total production over the four years?",
          answer: "F4, with 340 thousand units.",
          solution: "Read the Total column: F1 260, F2 210, F3 180, F4 340, F5 300. Highest is F4."
        },
        {
          question: "F4's total production was approximately what percentage of the grand total production of all factories?",
          answer: "Approximately 26.4%.",
          solution: "Grand total = 260+210+180+340+300 = 1290. Share = 340 / 1290 x 100 = 26.36%, i.e. about 26.4%."
        },
        {
          question: "Which factory recorded the highest percentage growth from 2020 to 2023? (Tricky)",
          answer: "F3, with about 83.3% growth.",
          solution: "2020 -> 2023 growth: F1 (80-50)/50 = 60%; F2 (65-40)/40 = 62.5%; F3 (55-30)/30 = 83.3%; F4 (100-70)/70 = 42.9%; F5 (90-60)/60 = 50%. Largest is F3 — F4 had the biggest absolute rise (30) yet the smallest % growth because of its large base."
        },
        {
          question: "What is the ratio of total production in 2020 to total production in 2023?",
          answer: "25 : 39.",
          solution: "2020 column = 50+40+30+70+60 = 250; 2023 column = 80+65+55+100+90 = 390. Ratio 250 : 390, divide by 10 = 25 : 39."
        },
        {
          question: "What is the average four-year total production of the factories, EXCLUDING F4? (Tricky)",
          answer: "237.5 thousand units.",
          solution: "Exclude F4: (260 + 210 + 180 + 300) / 4 = 950 / 4 = 237.5. Shortcut: (grand 1290 - 340) / 4 = 950 / 4 = 237.5."
        },
        {
          question: "By what percentage did total production (all factories) grow from 2020 to 2021? (Tricky)",
          answer: "22%.",
          solution: "2020 column total = 250; 2021 column total = 60+50+45+80+70 = 305. Growth = (305 - 250) / 250 x 100 = 55/250 x 100 = 22%."
        }
      ]
    },

    {
      title: "Sheet 4 — Bank loans by sector (Hard / analytical)",
      difficulty: "Hard",
      note:
        "Rows are banks, columns are sectors, no totals printed. Build both sets of totals. Row totals: A 500, B 500, C 500, D 600, E 470. Column totals: Agri 500, Retail 700, Industry 790, Housing 580. Grand total = 2570 both ways.",
      charts: [
        {
          type: "table",
          caption: "Loans disbursed (Rs crore) by bank and sector",
          columns: ["Bank", "Agri", "Retail", "Industry", "Housing"],
          rows: [
            ["A", 100, 150, 200, 50],
            ["B", 120, 100, 160, 120],
            ["C", 80, 220, 140, 60],
            ["D", 160, 140, 100, 200],
            ["E", 40, 90, 190, 150]
          ]
        }
      ],
      questions: [
        {
          question: "What is the total loan disbursed to the Industry sector by all banks?",
          answer: "Rs 790 crore.",
          solution: "Industry column = 200 + 160 + 140 + 100 + 190 = 790."
        },
        {
          question: "Which sector received the largest share of total loans, and approximately what percentage is it? (Tricky)",
          answer: "Industry, approximately 30.7% of the total.",
          solution: "Column totals: Agri 500, Retail 700, Industry 790, Housing 580; grand total 2570. Largest is Industry: 790 / 2570 x 100 = 30.74%, about 31%."
        },
        {
          question: "What is the ratio of total Retail loans to total Housing loans?",
          answer: "35 : 29.",
          solution: "Retail total = 150+100+220+140+90 = 700; Housing total = 50+120+60+200+150 = 580. Ratio 700 : 580, divide by 20 = 35 : 29."
        },
        {
          question: "Which bank contributed the largest share to Industry-sector loans, and what percentage of Industry loans is that? (Tricky)",
          answer: "Bank A, contributing about 25.3% of Industry loans.",
          solution: "Industry contributions: A 200, B 160, C 140, D 100, E 190. Largest is A at 200. Industry total = 790, so A's share = 200 / 790 x 100 = 25.32%, about 25.3%."
        },
        {
          question: "What is the average total loan disbursed per bank, EXCLUDING Bank D? (Tricky)",
          answer: "Rs 492.5 crore.",
          solution: "Row totals: A 500, B 500, C 500, E 470 (exclude D's 600). Average = (500+500+500+470)/4 = 1970/4 = 492.5. Shortcut: (grand 2570 - 600)/4 = 1970/4 = 492.5."
        },
        {
          question: "Bank D's total loans are approximately what percentage of the total loans disbursed by all banks?",
          answer: "Approximately 23.3%.",
          solution: "Bank D total = 160+140+100+200 = 600; grand total = 2570. Share = 600 / 2570 x 100 = 23.35%, about 23.3%."
        },
        {
          question: "What is the ratio of total Agri loans to total Industry loans (all banks)?",
          answer: "50 : 79.",
          solution: "Agri total = 100+120+80+160+40 = 500; Industry total = 790. Ratio 500 : 790, divide by 10 = 50 : 79."
        },
        {
          question: "By what percentage do total Industry loans exceed total Agri loans? (Tricky)",
          answer: "58%.",
          solution: "Industry 790, Agri 500. Excess % = (790 - 500) / 500 x 100 = 290/500 x 100 = 58%. Note the base is Agri (the smaller / reference sector)."
        }
      ]
    }
  ]
}
