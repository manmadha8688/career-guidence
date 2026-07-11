// Data Tables — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "A data table is the most common Data Interpretation (DI) format in TCS NQT, Infosys, Wipro and CAT-style exams. Rows and columns hold raw numbers; the question forces you to combine them - a row total, a column total, an average, a ratio, a percentage change, or a lookup like \"in which year/entity\". The numbers are usually easy; the marks are lost by misreading which line to add, ignoring the unit (thousands, crore, percent), or confusing a row total with a column total. This lesson drills every pattern examiners use, with the exact recompute-from-the-table discipline you need under time pressure.",

  howToRead: [
    { step: "Read the title and the unit first", detail: "Spend 10-15 seconds on the caption. Is the data in units, thousands, lakhs, crore, or percent? A wrong unit is the single biggest cause of wrong DI answers. Note the row label (entity) and the column label (category/period)." },
    { step: "Fix the row, then scan the column", detail: "Every cell is the intersection of one row (e.g. a person, product, year) and one column (e.g. a subject, month, quarter). To read one value, lock the row with your finger, then move across to the target column. Do not read diagonally." },
    { step: "Distinguish a row total from a column total", detail: "A row total sums across all columns for ONE entity (e.g. one student's marks in all subjects). A column total sums one column down ALL rows (e.g. everyone's marks in Maths). The grand total is reachable both ways and must match - use that as your arithmetic check." },
    { step: "Underline exactly what is asked", detail: "\"Total\", \"average\", \"how many\", \"ratio\", \"percentage change\", \"which\" each need a different operation. Circle the entity, the period, and the operation before you touch a number." },
    { step: "Compute only the cells you need", detail: "Do not total the whole table for a question that needs two cells. For a ratio between Beta and Delta in one year, you only read two numbers. Selective reading is where DI speed comes from." },
    { step: "Cross-check with the grand total", detail: "When a question needs the full grand total, add row totals AND add column totals - they must be equal. If they differ, you misread a cell; re-scan before answering." },
  ],

  speedTips: [
    "Write the row totals and column totals in the margin ONCE at the start of a table set - most questions reuse them, so you compute each total only a single time.",
    "For percentage change use (new - old) / old x 100, always dividing by the OLD (earlier) value, never the new one.",
    "For \"percentage of total\" use part / whole x 100; be sure you picked the right whole (whole table vs one row vs one column).",
    "Convert a ratio to lowest terms by dividing both sides by their HCF (60:50 -> divide by 10 -> 6:5).",
    "For \"average\" of a set of n numbers, average = sum / n; when every group has the same count, the average of the group-averages equals grand total / total cells (this shortcut fails when group sizes differ).",
    "For \"how many entries exceed X\", scan cell by cell and tally with tick marks; read \"more than X\" as strictly greater (X itself does NOT count) unless it says \"X or more\".",
    "Estimate first: round numbers to compare magnitudes and eliminate options, then compute exactly only for the survivors.",
  ],

  traps: [
    "Unit blindness: the table says \"in thousands\" or \"Rs crore\" and you answer the raw cell value - always carry the unit into the answer.",
    "Row total vs column total mix-up: the question asks for one product across all years (row) but you add one year across all products (column), or vice versa.",
    "Percentage change divided by the wrong base: dividing by the new value instead of the old inflates or deflates the answer.",
    "Average of averages: averaging each row's average and re-averaging those is only valid when all rows have the same number of entries; with unequal counts you must go back to the grand total / total count.",
    "Strictly-greater vs at-least: \"exceeds 120\" excludes a cell equal to 120, but \"120 or more\" includes it - one boundary cell flips the count.",
    "Equal totals from different splits: two rows can have the same total (ratio 1:1) even though their year-by-year values look nothing alike - do not assume different distributions mean different totals.",
  ],

  questionTypes: [
    { name: "Row total (one entity, all columns)", how: "Lock the entity's row and add every column value in it. Example: one student's marks across all subjects." },
    { name: "Column total (one category, all rows)", how: "Lock the column and add down all rows. Example: everyone's sales in March, or total Maths marks of the class." },
    { name: "Average", how: "Average = sum / count. Decide whether the sum is over a row (columns count) or a column (rows count), then divide by that count." },
    { name: "Percentage change between two cells", how: "(new - old) / old x 100. Used for growth of one entity from an earlier period to a later one." },
    { name: "Percentage of total / contribution", how: "part / whole x 100. Whole may be the grand total, one row total, or one column total - identify it precisely." },
    { name: "Ratio across rows or cells", how: "Write value A : value B and reduce by the HCF. Common between two entities in the same period, or between two totals." },
    { name: "Max / min lookup (\"which / in which\")", how: "Compute the required totals or read the cells, then pick the largest or smallest. Watch for ties." },
    { name: "Count with a threshold (\"how many exceed X\")", how: "Scan every relevant cell and tally those that satisfy the condition, respecting strictly-greater vs at-least." },
    { name: "Combined multi-condition lookup", how: "Apply each condition as a filter in turn (e.g. increasing every year AND total above X) and keep only the entities that pass all filters." },
  ],

  visual: {
    note: "Same data, two views. The table below shows units sold by four salespersons over three months (rows are people, columns are months). The grouped bar redraws the SAME numbers grouped by month so column totals become easy to compare visually - but every answer is still computed from the numbers, not eyeballed off the bars.",
    charts: [
      {
        type: "table",
        caption: "Units sold by salesperson (Jan-Mar)",
        columns: ["Salesperson", "Jan", "Feb", "Mar"],
        rows: [
          ["Arun", 120, 150, 180],
          ["Bhavna", 200, 160, 240],
          ["Chetan", 90, 120, 150],
          ["Divya", 160, 200, 180],
        ],
      },
      {
        type: "groupedBar",
        unit: "units",
        categories: ["Jan", "Feb", "Mar"],
        series: [
          { name: "Arun", data: [120, 150, 180] },
          { name: "Bhavna", data: [200, 160, 240] },
          { name: "Chetan", data: [90, 120, 150] },
          { name: "Divya", data: [160, 200, 180] },
        ],
      },
    ],
  },

  worked: {
    question:
      "Using the salesperson table above, by what percentage did Arun's sales increase from January to March?",
    steps: [
      { action: "Lock Arun's row and read the two cells asked for.", why: "Arun Jan = 120, Arun Mar = 180. Only these two cells matter; ignore the rest of the table." },
      { action: "Identify old and new values.", why: "January is the earlier period, so old = 120; March is later, so new = 180. The base for a percentage change is always the OLD value." },
      { action: "Apply percentage change = (new - old) / old x 100.", why: "(180 - 120) / 120 x 100 = 60 / 120 x 100." },
      { action: "Simplify.", why: "60 / 120 = 0.5, and 0.5 x 100 = 50." },
    ],
    answer: "50% increase.",
  },

  sheets: [
    {
      title: "Sheet 1 - Reading Rows, Columns and Totals",
      difficulty: "Easy",
      note: "Marks (out of 100) scored by four students in three subjects. Practise reading single cells, row totals, column totals and a simple average before any percentages appear.",
      charts: [
        {
          type: "table",
          caption: "Marks out of 100",
          columns: ["Student", "English", "Maths", "Science"],
          rows: [
            ["Neha", 70, 80, 95],
            ["Omar", 65, 90, 60],
            ["Priya", 80, 70, 60],
            ["Quadir", 90, 60, 85],
          ],
        },
        {
          type: "groupedBar",
          unit: "marks",
          categories: ["English", "Maths", "Science"],
          series: [
            { name: "Neha", data: [70, 80, 95] },
            { name: "Omar", data: [65, 90, 60] },
            { name: "Priya", data: [80, 70, 60] },
            { name: "Quadir", data: [90, 60, 85] },
          ],
        },
      ],
      questions: [
        {
          question: "What are the total marks scored by Quadir across all three subjects?",
          answer: "235",
          solution: "Lock Quadir's row and add across: 90 + 60 + 85 = 235.",
        },
        {
          question: "What are the total marks scored in Science by all four students?",
          answer: "300",
          solution: "Add down the Science column: 95 + 60 + 60 + 85 = 300.",
        },
        {
          question: "Which student has the highest total marks?",
          answer: "Neha (245)",
          solution: "Row totals: Neha 70+80+95 = 245, Omar 65+90+60 = 215, Priya 80+70+60 = 210, Quadir 90+60+85 = 235. The largest is 245, so Neha.",
        },
        {
          question: "What is the average marks in Maths across the four students?",
          answer: "75",
          solution: "Maths column total = 80 + 90 + 70 + 60 = 300. Average = 300 / 4 = 75.",
        },
        {
          question: "How many students scored 80 or more in English?",
          answer: "2",
          solution: "English values are 70, 65, 80, 90. Those that are 80 or more: 80 (Priya) and 90 (Quadir) = 2 students.",
        },
        {
          question: "In which subject did Omar score the highest?",
          answer: "Maths",
          solution: "Omar's row: English 65, Maths 90, Science 60. The highest is 90, in Maths.",
        },
        {
          question: "What is the difference between the highest and the lowest student total?",
          answer: "35",
          solution: "Highest total = Neha 245, lowest total = Priya 210. Difference = 245 - 210 = 35.",
        },
        {
          question: "What are the total marks scored in English by all four students?",
          answer: "305",
          solution: "Add down the English column: 70 + 65 + 80 + 90 = 305.",
        },
      ],
    },

    {
      title: "Sheet 2 - Averages, Ratios and Percentage Change",
      difficulty: "Medium",
      note: "Units sold (in thousands) of four products over four years. The unit is thousands - keep that in every answer. Now averages, ratios, percentage change and threshold counts appear.",
      charts: [
        {
          type: "table",
          caption: "Units sold (in thousands)",
          columns: ["Product", "2021", "2022", "2023", "2024"],
          rows: [
            ["Alpha", 40, 50, 60, 70],
            ["Beta", 60, 40, 50, 50],
            ["Gamma", 30, 60, 45, 65],
            ["Delta", 50, 30, 45, 55],
          ],
        },
        {
          type: "bar",
          unit: "thousand units",
          categories: ["2021", "2022", "2023", "2024"],
          series: [{ name: "Total (all products)", data: [180, 180, 200, 240] }],
        },
      ],
      questions: [
        {
          question: "What is the total number of units sold by Alpha over the four years?",
          answer: "220 thousand units",
          solution: "Alpha row: 40 + 50 + 60 + 70 = 220 (in thousands).",
        },
        {
          question: "In which year were the total sales of all products the highest?",
          answer: "2024",
          solution: "Column totals: 2021 = 40+60+30+50 = 180, 2022 = 50+40+60+30 = 180, 2023 = 60+50+45+45 = 200, 2024 = 70+50+65+55 = 240. The largest is 240, in 2024.",
        },
        {
          question: "What is the percentage increase in Alpha's sales from 2021 to 2024?",
          answer: "75%",
          solution: "Old (2021) = 40, new (2024) = 70. Change = (70 - 40) / 40 x 100 = 30 / 40 x 100 = 75%.",
        },
        {
          question: "What is the average annual sales of Gamma over the four years?",
          answer: "50 thousand units",
          solution: "Gamma total = 30 + 60 + 45 + 65 = 200. Average = 200 / 4 = 50 (in thousands).",
        },
        {
          question: "What is the ratio of Beta's 2021 sales to Delta's 2021 sales?",
          answer: "6 : 5",
          solution: "Beta 2021 = 60, Delta 2021 = 50. Ratio = 60 : 50; divide both by 10 = 6 : 5.",
        },
        {
          question: "By what percentage did total company sales change from 2022 to 2023?",
          answer: "11.11% increase (approximately)",
          solution: "Total 2022 = 180, total 2023 = 200. Change = (200 - 180) / 180 x 100 = 20 / 180 x 100 = 11.11% (approx).",
        },
        {
          question: "How many product-year entries had sales of 60 thousand or more?",
          answer: "5",
          solution: "Scan every cell for values 60 or more: Alpha 60, 70 (2); Beta 60 (1); Gamma 60, 65 (2); Delta none (0). Total = 2 + 1 + 2 + 0 = 5.",
        },
        {
          question: "Which product had the highest total sales over the four years, and what was that total?",
          answer: "Alpha, 220 thousand units",
          solution: "Row totals: Alpha 220, Beta 60+40+50+50 = 200, Gamma 30+60+45+65 = 200, Delta 50+30+45+55 = 180. Highest is Alpha with 220 (in thousands).",
        },
      ],
    },

    {
      title: "Sheet 3 - Contribution, Ratios and Multi-Condition Lookups",
      difficulty: "Hard",
      note: "Revenue (in Rs crore) of five departments across three quarters. Mix of contribution percentages, whole-company averages, threshold counts and a combined two-condition lookup.",
      charts: [
        {
          type: "table",
          caption: "Revenue in Rs crore",
          columns: ["Department", "Q1", "Q2", "Q3"],
          rows: [
            ["Retail", 120, 150, 180],
            ["Wholesale", 90, 120, 90],
            ["Online", 60, 90, 150],
            ["Export", 150, 120, 180],
            ["Services", 80, 100, 120],
          ],
        },
        {
          type: "bar",
          unit: "Rs crore",
          categories: ["Q1", "Q2", "Q3"],
          series: [{ name: "Total revenue (all departments)", data: [500, 580, 720] }],
        },
      ],
      questions: [
        {
          question: "What is the total revenue of the Online department across all three quarters?",
          answer: "Rs 300 crore",
          solution: "Online row: 60 + 90 + 150 = 300 (Rs crore).",
        },
        {
          question: "What is the average quarterly revenue of the Retail department?",
          answer: "Rs 150 crore",
          solution: "Retail total = 120 + 150 + 180 = 450. Average = 450 / 3 = 150 (Rs crore).",
        },
        {
          question: "What is the average revenue per quarter for the whole company (all departments combined)?",
          answer: "Rs 600 crore",
          solution: "Grand total = Q1 500 + Q2 580 + Q3 720 = 1800. Average per quarter = 1800 / 3 = 600 (Rs crore).",
        },
        {
          question: "What is the Export department's percentage contribution to the total company revenue?",
          answer: "25%",
          solution: "Export total = 150 + 120 + 180 = 450. Grand total = 1800. Contribution = 450 / 1800 x 100 = 25%.",
        },
        {
          question: "What is the percentage change in Online revenue from Q1 to Q3?",
          answer: "150% increase",
          solution: "Old (Q1) = 60, new (Q3) = 150. Change = (150 - 60) / 60 x 100 = 90 / 60 x 100 = 150%.",
        },
        {
          question: "What is the ratio of total Q1 revenue to total Q3 revenue?",
          answer: "25 : 36",
          solution: "Q1 total = 500, Q3 total = 720. Ratio = 500 : 720; divide both by 20 = 25 : 36.",
        },
        {
          question: "How many department-quarter entries exceed Rs 120 crore? (strictly greater than 120)",
          answer: "5",
          solution: "Count cells strictly greater than 120: Retail 150, 180 (2); Wholesale none (120 is not greater than 120); Online 150 (1); Export 150, 180 (2); Services none. Total = 2 + 1 + 2 = 5.",
        },
        {
          question: "Which department(s) had Q3 revenue higher than Q1 revenue AND a three-quarter total above Rs 350 crore?",
          answer: "Retail and Export",
          solution: "Apply both filters. Q3 > Q1: Retail 180>120 yes, Wholesale 90>90 no, Online 150>60 yes, Export 180>150 yes, Services 120>80 yes. Now total > 350: Retail 450 yes, Online 300 no, Export 450 yes, Services 300 no. Passing both: Retail and Export.",
        },
      ],
    },

    {
      title: "Sheet 4 - Trickiest Variants (average of averages, % of a row, combined trends)",
      difficulty: "Hard",
      note: "Books issued (in hundreds) by a library in five categories over three years. This sheet targets the classic traps: average of the group-averages, percentage of a ROW total, an equal-total ratio and a strictly-increasing trend count.",
      charts: [
        {
          type: "table",
          caption: "Books issued (in hundreds)",
          columns: ["Category", "2022", "2023", "2024"],
          rows: [
            ["Fiction", 200, 250, 300],
            ["Science", 150, 120, 180],
            ["History", 120, 150, 180],
            ["Comics", 300, 240, 360],
            ["Biography", 80, 100, 120],
          ],
        },
        {
          type: "groupedBar",
          unit: "hundred books",
          categories: ["2022", "2023", "2024"],
          series: [
            { name: "Fiction", data: [200, 250, 300] },
            { name: "Science", data: [150, 120, 180] },
            { name: "History", data: [120, 150, 180] },
            { name: "Comics", data: [300, 240, 360] },
            { name: "Biography", data: [80, 100, 120] },
          ],
        },
      ],
      questions: [
        {
          question: "What is the total number of Comics books issued over the three years?",
          answer: "900 hundred books (i.e. 90,000 books)",
          solution: "Comics row: 300 + 240 + 360 = 900 (in hundreds), which is 90,000 books.",
        },
        {
          question: "The three yearly totals are 850, 860 and 1140 (in hundreds). What is the average number of books issued per year?",
          answer: "950 hundred books",
          solution: "Year totals: 2022 = 200+150+120+300+80 = 850, 2023 = 250+120+150+240+100 = 860, 2024 = 300+180+180+360+120 = 1140. Grand total = 2850. Average per year = 2850 / 3 = 950 (in hundreds).",
        },
        {
          question: "What percentage of all Fiction books (over the three years) were issued in 2024?",
          answer: "40%",
          solution: "Fiction 2024 = 300. Fiction total = 200 + 250 + 300 = 750. The WHOLE here is the Fiction row, not the grand total: 300 / 750 x 100 = 40%.",
        },
        {
          question: "What is the ratio of the total Science books to the total History books over the three years?",
          answer: "1 : 1",
          solution: "Science total = 150 + 120 + 180 = 450. History total = 120 + 150 + 180 = 450. Ratio = 450 : 450 = 1 : 1 - equal totals despite different year-by-year splits.",
        },
        {
          question: "What is the percentage change in Biography issues from 2022 to 2024?",
          answer: "50% increase",
          solution: "Old (2022) = 80, new (2024) = 120. Change = (120 - 80) / 80 x 100 = 40 / 80 x 100 = 50%.",
        },
        {
          question: "The average yearly issue for each of the five categories is computed, then those five averages are themselves averaged. What is the result, and does it equal (grand total / 15)?",
          answer: "190 hundred books; yes, it equals the grand total / 15.",
          solution: "Category averages: Fiction 750/3 = 250, Science 450/3 = 150, History 450/3 = 150, Comics 900/3 = 300, Biography 300/3 = 100. Average of these = (250+150+150+300+100)/5 = 950/5 = 190. Also grand total / 15 = 2850 / 15 = 190. They match ONLY because every category has the same number of years (3); with unequal counts the two methods would differ.",
        },
        {
          question: "How many category-year entries exceed 200 hundred books? (strictly greater than 200)",
          answer: "5",
          solution: "Count cells strictly greater than 200: Fiction 250, 300 (2); Science none; History none; Comics 300, 240, 360 (3); Biography none. Total = 2 + 3 = 5. Note Fiction's 200 does not count (not strictly greater).",
        },
        {
          question: "In how many categories did the number of books issued increase every year (2022 < 2023 < 2024)?",
          answer: "3",
          solution: "Check strictly increasing rows: Fiction 200<250<300 yes; Science 150<120 no; History 120<150<180 yes; Comics 300<240 no; Biography 80<100<120 yes. Categories that increase every year: Fiction, History, Biography = 3.",
        },
      ],
    },
  ],
}
