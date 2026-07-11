// Mixed DI — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "Mixed (combined) DI gives you TWO data sources at once — usually a chart PLUS a table — and forces you to read from both to answer a single question. The classic move is a hidden or derived column: Profit = Revenue minus Cost, Pass% = Passed / Appeared, Price = Revenue / Units, and so on. One source rarely holds the full answer; you pull revenue from the bar chart, cost from the table, subtract to get profit, then compute a margin or a ratio. TCS, Infosys, Wipro and CAT-style papers love this format because it punishes candidates who read only half the data. This lesson teaches you to spot which number lives where, build the derived column once, and reuse it across every question in the set.",

  howToRead: [
    {
      step: "Identify the two sources and what each one owns",
      detail:
        "First glance: which quantity is in the chart and which is in the table? A very common split is Revenue in the bar/line chart and Cost/Expense in the table (or vice versa). Write a one-line map in the margin so you never hunt twice: 'Chart = Revenue, Table = Cost, Profit = Rev - Cost'."
    },
    {
      step: "Lock the units before touching numbers",
      detail:
        "Mixed sets often mix crore and lakh, or absolute values and percentages. Confirm both sources are in the same unit. 1 crore = 100 lakh. If the chart is in crore and the table gives a percentage, you must convert one side before combining them."
    },
    {
      step: "Build the derived column once, up front",
      detail:
        "Before reading any question, compute the hidden column for every row: Profit = Revenue - Cost for each entity. This 30-second investment is reused by 4-5 questions. Note it lightly beside the table so you never recompute the same subtraction."
    },
    {
      step: "For a question, decide which sources it needs",
      detail:
        "A pure 'total revenue' question needs only the chart. A 'profit margin' question needs chart (revenue) + your derived profit. A 'cost as % of revenue' question needs table (cost) + chart (revenue). Tag each question C, T, or C+T so you fetch the minimum data."
    },
    {
      step: "Nail the denominator for every percentage",
      detail:
        "Profit margin uses revenue as the base; markup uses cost as the base; growth uses the earlier year as the base. The examiner's trap is to compute the right numerator over the wrong base. State the base out loud: 'profit as % OF revenue' means divide by revenue."
    },
    {
      step: "Re-derive each sub-answer independently",
      detail:
        "Do not chain rounded intermediate results across sub-questions. Each answer starts from the clean chart/table numbers so one rounding slip cannot cascade through the whole set."
    }
  ],

  speedTips: [
    "Write the source map (Chart = X, Table = Y, Derived = X - Y) once — it serves the whole set.",
    "Pre-compute the entire derived column before reading questions; you will use it 4-5 times.",
    "Profit margin = profit / revenue. Markup = profit / cost. Never swap the base.",
    "Column/row totals you compute once (total revenue, total cost, total profit) get reused — cache them on paper.",
    "For 'A as a % of B', both A and B may live in different sources — locate both before dividing.",
    "Growth of a derived column: derive both years' profit first, then apply (new - old) / old.",
    "When a question gives you profit and asks for revenue, work backward: Revenue = Cost + Profit."
  ],

  traps: [
    "Mixed units: chart in crore, table in lakh (or in %). Convert to one unit BEFORE combining.",
    "Wrong base for margin: dividing profit by cost instead of by revenue (or vice versa).",
    "'Greater than 25%' excludes exactly 25% — read strict vs inclusive wording carefully.",
    "Reading the answer from a single source when the question secretly needs both chart and table.",
    "Reusing a rounded intermediate profit in the next question and drifting off the exact value.",
    "Confusing 'cost as % of revenue' (cost/revenue) with 'profit margin' (profit/revenue) — they sum to 100%."
  ],

  questionTypes: [
    {
      name: "Derive the hidden column",
      how: "Compute Profit = Revenue - Cost (or Pass% = Passed/Appeared) for a given row using one number from the chart and one from the table."
    },
    {
      name: "Cross-source single value",
      how: "Read one value from the chart and one from the table for the same entity and combine (add, subtract, or ratio)."
    },
    {
      name: "Profit / profit margin",
      how: "Margin = profit / revenue x 100. Requires the derived profit and the revenue base. The most common mixed-DI question."
    },
    {
      name: "Cost as % of revenue",
      how: "Cost / revenue x 100. Pulls cost from the table and revenue from the chart. Complement of profit margin."
    },
    {
      name: "Combined / cumulative totals",
      how: "Sum revenue, cost or the derived profit across all rows or years, sometimes then taking a percentage of the grand total."
    },
    {
      name: "Ratio of derived values",
      how: "Ratio of profit in one year to another, or profit of one entity to another — derive both, then reduce the ratio."
    },
    {
      name: "Growth of the derived column",
      how: "Percentage growth of profit (a derived value) from an earlier period to a later one: (new profit - old profit) / old profit x 100."
    },
    {
      name: "Reverse: find the missing base from a given derived value",
      how: "Given profit and cost, find revenue (Revenue = Cost + Profit). Or given margin and revenue, find profit. Work the formula backward."
    },
    {
      name: "Threshold / counting",
      how: "Count how many entities exceed a cutoff on a derived metric — e.g. how many companies have profit margin above 25%."
    }
  ],

  visual: {
    note:
      "Two representations of the same data. The grouped bar chart shows Revenue and Expense (in Rs crore) for four companies. The table repeats those two figures and adds the DERIVED column Profit = Revenue - Expense (highlighted). Any margin, ratio or count question is answered by combining the chart's revenue with the table's derived profit.",
    charts: [
      {
        type: "groupedBar",
        unit: "Rs crore",
        categories: ["A", "B", "C", "D"],
        series: [
          { name: "Revenue", data: [120, 150, 200, 180] },
          { name: "Expense", data: [90, 100, 140, 150] }
        ]
      },
      {
        type: "table",
        caption: "Revenue, Expense and derived Profit (Rs crore)",
        columns: ["Company", "Revenue", "Expense", "Profit"],
        rows: [
          ["A", 120, 90, 30],
          ["B", 150, 100, 50],
          ["C", 200, 140, 60],
          ["D", 180, 150, 30]
        ],
        highlightCol: 3
      }
    ]
  },

  worked: {
    question:
      "Using the chart and table above, for how many companies is the profit margin (profit as a percentage of revenue) greater than 25%?",
    steps: [
      {
        action: "Confirm the derived column: Profit = Revenue - Expense.",
        why: "A: 120 - 90 = 30, B: 150 - 100 = 50, C: 200 - 140 = 60, D: 180 - 150 = 30 (crore). These match the highlighted table column."
      },
      {
        action: "Compute each margin = profit / revenue x 100 (revenue is the base).",
        why: "A: 30/120 = 25.00%, B: 50/150 = 33.33%, C: 60/200 = 30.00%, D: 30/180 = 16.67%."
      },
      {
        action: "Apply the strict 'greater than 25%' cutoff.",
        why: "A is exactly 25% — NOT greater, so it is excluded. B (33.33%) and C (30%) exceed 25%; D is below."
      },
      {
        action: "Count the qualifying companies.",
        why: "Only B and C clear the strict cutoff, so the count is 2. (The trap is including A at exactly 25%.)"
      }
    ],
    answer: "2 companies (B and C)."
  },

  sheets: [
    {
      title: "Sheet 1 — Store Sales vs Cost (Easy)",
      difficulty: "Easy",
      note:
        "A retail store's quarterly Sales and Cost (Rs lakh) are in the bar chart; the table adds the derived Profit = Sales - Cost. Warm up on direct reads and the basic derived column.",
      charts: [
        {
          type: "groupedBar",
          unit: "Rs lakh",
          categories: ["Q1", "Q2", "Q3", "Q4"],
          series: [
            { name: "Sales", data: [40, 50, 60, 80] },
            { name: "Cost", data: [30, 35, 45, 50] }
          ]
        },
        {
          type: "table",
          caption: "Quarterly Sales, Cost and derived Profit (Rs lakh)",
          columns: ["Quarter", "Sales", "Cost", "Profit"],
          rows: [
            ["Q1", 40, 30, 10],
            ["Q2", 50, 35, 15],
            ["Q3", 60, 45, 15],
            ["Q4", 80, 50, 30]
          ],
          highlightCol: 3
        }
      ],
      questions: [
        {
          question: "What were the total sales for the full year?",
          answer: "230 lakh",
          solution: "Sum the Sales bars: 40 + 50 + 60 + 80 = 230 lakh."
        },
        {
          question: "What was the profit in Q4?",
          answer: "30 lakh",
          solution: "Profit = Sales - Cost = 80 - 50 = 30 lakh (matches the derived column)."
        },
        {
          question: "Which quarter had the highest profit?",
          answer: "Q4",
          solution: "Derived profits: Q1 10, Q2 15, Q3 15, Q4 30. Q4 is highest at 30 lakh."
        },
        {
          question: "What was the total profit for the year?",
          answer: "70 lakh",
          solution: "Add the derived column: 10 + 15 + 15 + 30 = 70 lakh."
        },
        {
          question: "Which quarter had the lowest cost?",
          answer: "Q1",
          solution: "Costs: Q1 30, Q2 35, Q3 45, Q4 50. Q1 is lowest at 30 lakh."
        },
        {
          question: "What was the total cost for the year?",
          answer: "160 lakh",
          solution: "Sum the Cost values: 30 + 35 + 45 + 50 = 160 lakh."
        },
        {
          question: "In how many quarters did profit exceed 12 lakh?",
          answer: "3 quarters",
          solution: "Profits 10, 15, 15, 30. Those above 12: Q2 (15), Q3 (15), Q4 (30) — that is 3 quarters."
        },
        {
          question: "What is the difference between the highest and lowest quarterly sales?",
          answer: "40 lakh",
          solution: "Highest sales 80 (Q4), lowest 40 (Q1). Difference = 80 - 40 = 40 lakh."
        }
      ]
    },

    {
      title: "Sheet 2 — Revenue Trend + Expense Table (Medium)",
      difficulty: "Medium",
      note:
        "The line chart tracks a company's annual Revenue (Rs crore). The table gives Expense and the derived Profit = Revenue - Expense. Practise growth, margins and ratios of the derived column.",
      charts: [
        {
          type: "line",
          unit: "Rs crore",
          categories: ["2019", "2020", "2021", "2022", "2023"],
          series: [
            { name: "Revenue", data: [200, 240, 300, 360, 400] }
          ]
        },
        {
          type: "table",
          caption: "Revenue, Expense and derived Profit (Rs crore)",
          columns: ["Year", "Revenue", "Expense", "Profit"],
          rows: [
            ["2019", 200, 150, 50],
            ["2020", 240, 180, 60],
            ["2021", 300, 210, 90],
            ["2022", 360, 240, 120],
            ["2023", 400, 250, 150]
          ],
          highlightCol: 3
        }
      ],
      questions: [
        {
          question: "What was the total profit earned over the five years?",
          answer: "470 crore",
          solution: "Sum the derived profits: 50 + 60 + 90 + 120 + 150 = 470 crore."
        },
        {
          question: "What was the percentage growth in profit from 2019 to 2023?",
          answer: "200%",
          solution: "Profit rose from 50 to 150. Growth = (150 - 50)/50 x 100 = 100/50 x 100 = 200%."
        },
        {
          question: "In which year was the profit margin (profit / revenue) the highest?",
          answer: "2023",
          solution: "Margins: 2019 50/200 = 25%, 2020 60/240 = 25%, 2021 90/300 = 30%, 2022 120/360 = 33.33%, 2023 150/400 = 37.5%. Highest is 2023."
        },
        {
          question: "What was the profit as a percentage of revenue in 2021?",
          answer: "30%",
          solution: "Profit 90, revenue 300. Margin = 90/300 x 100 = 30%."
        },
        {
          question: "What was the percentage growth in revenue from 2020 to 2021?",
          answer: "25%",
          solution: "Revenue rose 240 to 300. Growth = (300 - 240)/240 x 100 = 60/240 x 100 = 25%."
        },
        {
          question: "What is the ratio of profit in 2023 to profit in 2020?",
          answer: "5 : 2",
          solution: "Profit 2023 = 150, profit 2020 = 60. Ratio 150 : 60 = 5 : 2 (divide both by 30)."
        },
        {
          question: "What was the average annual profit over the five years?",
          answer: "94 crore",
          solution: "Total profit 470 over 5 years: 470 / 5 = 94 crore."
        },
        {
          question: "What was the expense as a percentage of revenue in 2022?",
          answer: "66.67%",
          solution: "Expense 240, revenue 360. 240/360 x 100 = 66.67% (equivalently, margin was 33.33%)."
        }
      ]
    },

    {
      title: "Sheet 3 — Cost Chart + Profit Table, Revenue Hidden (Hard)",
      difficulty: "Hard",
      note:
        "Here the chart gives ONLY Cost (Rs crore) per branch and the table gives ONLY Profit. Revenue appears in neither directly — you must derive Revenue = Cost + Profit. Every question forces a genuine cross-source read.",
      charts: [
        {
          type: "bar",
          unit: "Rs crore",
          categories: ["North", "South", "East", "West"],
          series: [
            { name: "Cost", data: [180, 240, 210, 300] }
          ]
        },
        {
          type: "table",
          caption: "Profit given; derived Revenue = Cost + Profit (Rs crore)",
          columns: ["Branch", "Cost", "Profit", "Revenue"],
          rows: [
            ["North", 180, 70, 250],
            ["South", 240, 80, 320],
            ["East", 210, 90, 300],
            ["West", 300, 100, 400]
          ],
          highlightCol: 3
        }
      ],
      questions: [
        {
          question: "What was North's revenue?",
          answer: "250 crore",
          solution: "Revenue = Cost + Profit = 180 (chart) + 70 (table) = 250 crore."
        },
        {
          question: "What was the total revenue of all four branches?",
          answer: "1270 crore",
          solution: "Derive each: 250 + 320 + 300 + 400 = 1270 crore (or total cost 930 + total profit 340 = 1270)."
        },
        {
          question: "Which branch had the highest profit margin (profit / revenue)?",
          answer: "East",
          solution: "Margins: North 70/250 = 28%, South 80/320 = 25%, East 90/300 = 30%, West 100/400 = 25%. East is highest at 30%."
        },
        {
          question: "What was the cost as a percentage of revenue for West?",
          answer: "75%",
          solution: "Cost 300, revenue 400. 300/400 x 100 = 75% (so West's margin was 25%)."
        },
        {
          question: "What is the ratio of East's revenue to North's revenue?",
          answer: "6 : 5",
          solution: "East 300, North 250. Ratio 300 : 250 = 6 : 5 (divide both by 50)."
        },
        {
          question: "By what percentage is East's revenue less than West's revenue?",
          answer: "25%",
          solution: "West 400, East 300. Shortfall = (400 - 300)/400 x 100 = 100/400 x 100 = 25%."
        },
        {
          question: "Which branch has the lowest cost-to-revenue ratio?",
          answer: "East",
          solution: "Cost/revenue: North 180/250 = 72%, South 240/320 = 75%, East 210/300 = 70%, West 300/400 = 75%. East is lowest at 70%."
        },
        {
          question: "What was the average profit per branch?",
          answer: "85 crore",
          solution: "Total profit 70 + 80 + 90 + 100 = 340 over 4 branches: 340 / 4 = 85 crore."
        }
      ]
    },

    {
      title: "Sheet 4 — Two Divisions (chart) + Company P&L (table) (Hard)",
      difficulty: "Hard",
      note:
        "The grouped bar chart splits revenue into Products and Services (Rs crore) per year; the table gives Total Revenue, Total Expense and the derived Profit for the whole company. Total Revenue equals the sum of the two bars, so questions cross both sources.",
      charts: [
        {
          type: "groupedBar",
          unit: "Rs crore",
          categories: ["2021", "2022", "2023"],
          series: [
            { name: "Products", data: [300, 400, 500] },
            { name: "Services", data: [200, 200, 300] }
          ]
        },
        {
          type: "table",
          caption: "Company total Revenue, Expense and derived Profit (Rs crore)",
          columns: ["Year", "Total Revenue", "Expense", "Profit"],
          rows: [
            ["2021", 500, 375, 125],
            ["2022", 600, 420, 180],
            ["2023", 800, 520, 280]
          ],
          highlightCol: 3
        }
      ],
      questions: [
        {
          question: "What was the company's total revenue in 2023?",
          answer: "800 crore",
          solution: "Add both bars: Products 500 + Services 300 = 800 crore (matches the table's Total Revenue)."
        },
        {
          question: "What was the total profit over the three years?",
          answer: "585 crore",
          solution: "Sum the derived profit: 125 + 180 + 280 = 585 crore."
        },
        {
          question: "What was the profit margin (profit / revenue) in 2022?",
          answer: "30%",
          solution: "Profit 180, revenue 600. Margin = 180/600 x 100 = 30%."
        },
        {
          question: "What was the percentage growth in total revenue from 2021 to 2022?",
          answer: "20%",
          solution: "Revenue 500 to 600. Growth = (600 - 500)/500 x 100 = 100/500 x 100 = 20%."
        },
        {
          question: "In 2023, by how much did Products revenue exceed Services revenue?",
          answer: "200 crore",
          solution: "Products 500 - Services 300 = 200 crore."
        },
        {
          question: "What was the expense as a percentage of revenue in 2021?",
          answer: "75%",
          solution: "Expense 375, revenue 500. 375/500 x 100 = 75% (so the margin was 25%)."
        },
        {
          question: "What was the percentage growth in profit from 2022 to 2023?",
          answer: "55.56%",
          solution: "Profit 180 to 280. Growth = (280 - 180)/180 x 100 = 100/180 x 100 = 55.56%."
        },
        {
          question: "In 2022 the Services bar is smudged. Given total revenue was 600 crore and Products was 400 crore, what was the Services revenue?",
          answer: "200 crore",
          solution: "Services = Total revenue - Products = 600 (table) - 400 (chart) = 200 crore."
        }
      ]
    }
  ]
}
