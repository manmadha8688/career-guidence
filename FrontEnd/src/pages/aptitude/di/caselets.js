// Caselets — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "A caselet is data interpretation with the training wheels off: instead of a ready-made table or chart, you are handed a paragraph of sentences and must build the table yourself before you can answer anything. This is the single most common DI format in TCS, Infosys, Wipro and CAT-style tests, because it checks two skills at once — can you convert words into a grid, and can you then read that grid. The good news: once the table is on paper, every question becomes ordinary arithmetic (subtraction, ratio, percentage, probability). The whole game is the 45 seconds you spend translating the paragraph into rows and columns. This lesson drills exactly that: percentage-in-text caselets, two-category boys/girls grids, and set-overlap caselets with both / only / neither. Read once, tabulate as you read, then attack.",

  howToRead: [
    {
      step: "1. Turn words into a table BEFORE reading the questions",
      detail:
        "Identify the two things that vary. In 'boys/girls who chose Science/Commerce' the rows are Boys/Girls and the columns are Science/Commerce. In a survey caselet the categories are Only A / Only B / Both / Neither. Draw the empty grid first — the paragraph tells you what to fill in.",
    },
    {
      step: "2. Write the grand total and the sub-totals first",
      detail:
        "The overall total (class size, number surveyed, number of books) plus each row total and column total form the skeleton. 'A class of 120, of which 70 are boys' immediately gives you Total=120, Boys=70, so Girls=120-70=50 without any more reading.",
    },
    {
      step: "3. Convert every percentage into a raw number on the spot",
      detail:
        "'60% work in Tech' out of 400 is 240 — write 240, not 60%. Caselets love to state one group as a percentage of the total and another as a percentage of that group. Anchor to actual head-counts so you never re-multiply mid-question.",
    },
    {
      step: "4. Fill the empty cells by subtraction",
      detail:
        "'Among the boys, 45 study Science and the rest Commerce' means Commerce boys = 70-45 = 25. Any 'the rest / the remaining' is a subtraction. For sets: Only A = A - Both, Neither = Total - (OnlyA + OnlyB + Both).",
    },
    {
      step: "5. Cross-check totals both ways",
      detail:
        "The row totals and the column totals must both add up to the grand total. If Boys+Girls = 120 but Science+Commerce = 118, you mis-read a sentence. Reconcile before answering — this catches almost every silly error.",
    },
    {
      step: "6. Only now read the questions and pull cells",
      detail:
        "With a verified table, each question is a lookup plus one operation: a difference, a ratio, a fraction, a percentage, or a probability. You should not need to re-read the paragraph again.",
    },
  ],

  speedTips: [
    "Tabulate while you read the paragraph the first time — reading it 'to understand' and then again 'to solve' wastes double the time.",
    "For any two-category caselet, a 3x3 grid (2 groups + Total rows, 2 attributes + Total columns) holds everything; fill the corners you know, subtract for the rest.",
    "Keep the grand total in a box at the corner — most fraction/percentage/probability questions divide by it.",
    "'The rest', 'the remaining', 'the others' = subtract from that row's or column's total. Circle these words as you read.",
    "For set caselets, immediately compute Both, then Only-A and Only-B, then Neither — in that order — even before seeing the questions.",
    "Percentages of a subgroup: keep the subgroup total handy, because '% of Dance participants who also did Music' divides by Dance, not by the grand total.",
    "Answer options are usually spread apart; if you have the table, estimate first and confirm — do not compute to three decimals unless the options are that close.",
  ],

  traps: [
    "Percentage of a group vs percentage of the total: 'of the boys, 40% play cricket' is 40% of boys, NOT 40% of the class. Multiply by the boys count, never the total.",
    "Forgetting 'Neither' in set problems: At-least-one = OnlyA + OnlyB + Both, but the Total includes the Neither group too. Total is bigger than at-least-one.",
    "Double-counting 'Both': people who did both A and B are already inside the A-count and the B-count. n(A or B) = n(A) + n(B) - n(Both), not n(A) + n(B).",
    "Answering 'how many did A' with the 'only A' number: 'took part in Dance' = Only-Dance + Both; 'took part only in Dance' = Only-Dance. Read the word 'only' carefully.",
    "Fraction/percentage denominator swap: 'what fraction of the batch' divides by the grand total; 'what fraction of the boys' divides by the boys total. Wrong denominator = wrong answer.",
    "Ratio not reduced or reversed: 54:36 should be given as 3:2 and in the asked order (Morning-boys : Morning-girls), not 2:3.",
  ],

  questionTypes: [
    {
      name: "Direct cell lookup",
      how: "Asks for one cell you already filled, e.g. 'how many girls chose Evening'. Read it straight off the built table.",
    },
    {
      name: "Row / column total",
      how: "'How many students opted for the Morning slot' = sum of that column. The table's margin totals answer these instantly.",
    },
    {
      name: "Difference / how-many-more",
      how: "'How many more work in Tech than Sales' = subtract two cells or two totals. Watch which is larger.",
    },
    {
      name: "Ratio between two cells",
      how: "'Ratio of boys in Morning to girls in Morning' = divide both by their HCF and give in the asked order, e.g. 54:36 = 3:2.",
    },
    {
      name: "Fraction of a whole",
      how: "'What fraction of the batch are Evening boys' = that cell over the grand total, reduced to lowest terms (36/150 = 6/25).",
    },
    {
      name: "Percentage of a subgroup",
      how: "'What percentage of Morning students are girls' = girls-Morning / total-Morning x 100. The denominator is the subgroup, not the grand total.",
    },
    {
      name: "Set overlap (both / only / neither)",
      how: "Uses n(A or B) = n(A)+n(B)-n(Both) and Neither = Total - n(A or B). 'Exactly one' = OnlyA + OnlyB.",
    },
    {
      name: "Probability from the table",
      how: "'Probability a random person is a woman in Support' = favourable cell / grand total (30/400 = 3/40). It is just a fraction of the whole dressed up.",
    },
    {
      name: "Multi-step (ratio -> counts -> further split)",
      how: "The paragraph gives a ratio or a chain ('English is twice Telugu, Hindi is 180'); solve for each count first, then answer the sub-split question.",
    },
  ],

  visual: {
    note:
      "\"In a class of 120 students, 70 are boys and the rest are girls. Among the boys, 45 study Science and the remaining study Commerce. Among the girls, 30 study Science and the rest study Commerce.\" The skill is turning this paragraph into the grid below: Girls = 120 - 70 = 50; Commerce boys = 70 - 45 = 25; Commerce girls = 50 - 30 = 20; then every column and row total is checked against 120.",
    charts: [
      {
        type: "table",
        caption: "Paragraph converted to a two-category grid (Boys/Girls x Science/Commerce)",
        columns: ["Group", "Science", "Commerce", "Total"],
        rows: [
          ["Boys", "45", "25", "70"],
          ["Girls", "30", "20", "50"],
          ["Total", "75", "45", "120"],
        ],
        highlightCol: 3,
      },
    ],
  },

  worked: {
    question:
      "In a survey of 200 people, 120 read newspaper A, 90 read newspaper B, and 40 read both A and B. How many people read neither newspaper, and what is the probability that a randomly chosen person reads exactly one newspaper?",
    steps: [
      {
        action: "List the raw numbers: Total = 200, n(A) = 120, n(B) = 90, n(Both) = 40.",
        why: "Extract every number from the paragraph before touching a formula.",
      },
      {
        action: "Only A = 120 - 40 = 80; Only B = 90 - 40 = 50.",
        why: "The 40 'both' readers are counted inside both 120 and 90, so remove them to isolate the 'only' groups.",
      },
      {
        action: "At least one = Only A + Only B + Both = 80 + 50 + 40 = 170.",
        why: "This is n(A or B); equivalently 120 + 90 - 40 = 170.",
      },
      {
        action: "Neither = Total - at least one = 200 - 170 = 30.",
        why: "Everyone not in the union read no newspaper.",
      },
      {
        action: "Exactly one = Only A + Only B = 80 + 50 = 130, so probability = 130 / 200 = 13/20 = 0.65.",
        why: "'Exactly one' excludes the 40 who read both; probability is that count over the grand total.",
      },
    ],
    answer: "30 people read neither; probability of reading exactly one = 13/20 (0.65).",
  },

  sheets: [
    {
      title: "Sheet 1 — Two-category grid (Easy)",
      difficulty: "Easy",
      note:
        "\"A coaching batch has 150 students. 90 of them are boys and the rest are girls. Among the boys, 54 chose the Morning slot and the remaining chose the Evening slot. Among the girls, 36 chose the Morning slot and the rest chose the Evening slot.\"",
      charts: [
        {
          type: "table",
          caption: "Extracted grid (Boys/Girls x Morning/Evening). Girls = 150-90 = 60; Evening boys = 90-54 = 36; Evening girls = 60-36 = 24.",
          columns: ["Group", "Morning", "Evening", "Total"],
          rows: [
            ["Boys", "54", "36", "90"],
            ["Girls", "36", "24", "60"],
            ["Total", "90", "60", "150"],
          ],
          highlightCol: 3,
        },
      ],
      questions: [
        {
          question: "1. How many girls are in the batch?",
          answer: "60",
          solution: "Total - boys = 150 - 90 = 60.",
        },
        {
          question: "2. How many students chose the Evening slot in total?",
          answer: "60",
          solution: "Evening column = boys 36 + girls 24 = 60.",
        },
        {
          question: "3. How many boys chose the Morning slot?",
          answer: "54",
          solution: "Direct cell from the grid: Boys-Morning = 54.",
        },
        {
          question: "4. How many girls chose the Evening slot?",
          answer: "24",
          solution: "Girls total - girls Morning = 60 - 36 = 24.",
        },
        {
          question: "5. How many students chose the Morning slot in total?",
          answer: "90",
          solution: "Morning column = boys 54 + girls 36 = 90.",
        },
        {
          question: "6. What is the ratio of boys in the Morning slot to girls in the Morning slot?",
          answer: "3 : 2",
          solution: "54 : 36, divide both by 18 -> 3 : 2.",
        },
        {
          question: "7. What fraction of the whole batch are boys in the Evening slot?",
          answer: "6/25",
          solution: "Evening boys / total = 36 / 150 = 6/25.",
        },
        {
          question: "8. What percentage of Morning-slot students are girls?",
          answer: "40%",
          solution: "Girls-Morning / total-Morning = 36 / 90 = 0.4 = 40%. (Denominator is the Morning subgroup, not 150.)",
        },
      ],
    },

    {
      title: "Sheet 2 — Percentages-in-text, three departments (Medium)",
      difficulty: "Medium",
      note:
        "\"A company has 400 employees. 60% of them work in the Tech department, 25% in Sales, and the rest in Support. In the Tech department, one-fourth of the employees are women. In Sales, 40% are women. In Support, half are women.\"",
      charts: [
        {
          type: "table",
          caption: "Convert each percentage to a count. Tech=240, Sales=100, Support=60. Tech women=240/4=60; Sales women=40% of 100=40; Support women=30. Men = department total - women.",
          columns: ["Department", "Total", "Women", "Men"],
          rows: [
            ["Tech", "240", "60", "180"],
            ["Sales", "100", "40", "60"],
            ["Support", "60", "30", "30"],
            ["Total", "400", "130", "270"],
          ],
          highlightCol: 2,
        },
      ],
      questions: [
        {
          question: "1. How many employees work in Support?",
          answer: "60",
          solution: "Support = 100% - 60% - 25% = 15% of 400 = 60.",
        },
        {
          question: "2. How many women work in the Tech department?",
          answer: "60",
          solution: "One-fourth of Tech = 240 / 4 = 60.",
        },
        {
          question: "3. How many male employees are there in total?",
          answer: "270",
          solution: "Men = 400 - 130 women = 270 (or 180 + 60 + 30).",
        },
        {
          question: "4. How many more employees are in Tech than in Sales?",
          answer: "140",
          solution: "240 - 100 = 140.",
        },
        {
          question: "5. What is the ratio of women in Sales to women in Support?",
          answer: "4 : 3",
          solution: "40 : 30, divide by 10 -> 4 : 3.",
        },
        {
          question: "6. What percentage of all employees are women?",
          answer: "32.5%",
          solution: "Total women / total = 130 / 400 = 0.325 = 32.5%.",
        },
        {
          question: "7. What fraction of Tech employees are men?",
          answer: "3/4",
          solution: "Tech men / Tech total = 180 / 240 = 3/4.",
        },
        {
          question: "8. If one employee is picked at random, what is the probability the person is a woman working in Support?",
          answer: "3/40",
          solution: "Favourable / total = 30 / 400 = 3/40 (= 0.075).",
        },
      ],
    },

    {
      title: "Sheet 3 — Set overlap with both / only / neither (Hard)",
      difficulty: "Hard",
      note:
        "\"In a college fest, 300 students participated. 160 took part in the Dance event, 140 took part in the Music event, and 50 students took part in both events. The remaining students only helped in organising and took part in neither event.\"",
      charts: [
        {
          type: "table",
          caption: "Only Dance = 160-50 = 110; Only Music = 140-50 = 90; Both = 50; At least one = 110+90+50 = 250; Neither = 300-250 = 50.",
          columns: ["Category", "Count"],
          rows: [
            ["Only Dance", "110"],
            ["Only Music", "90"],
            ["Both events", "50"],
            ["Neither (organisers)", "50"],
            ["Total", "300"],
          ],
          highlightCol: 1,
        },
      ],
      questions: [
        {
          question: "1. How many students took part in at least one event?",
          answer: "250",
          solution: "n(Dance or Music) = 160 + 140 - 50 = 250.",
        },
        {
          question: "2. How many students took part in neither event?",
          answer: "50",
          solution: "Total - at least one = 300 - 250 = 50.",
        },
        {
          question: "3. How many students took part only in the Dance event?",
          answer: "110",
          solution: "Dance - Both = 160 - 50 = 110.",
        },
        {
          question: "4. How many students took part only in the Music event?",
          answer: "90",
          solution: "Music - Both = 140 - 50 = 90.",
        },
        {
          question: "5. What is the ratio of students only in Dance to students only in Music?",
          answer: "11 : 9",
          solution: "110 : 90, divide by 10 -> 11 : 9.",
        },
        {
          question: "6. What fraction of all participants took part in both events?",
          answer: "1/6",
          solution: "Both / total = 50 / 300 = 1/6.",
        },
        {
          question: "7. If a student is chosen at random, what is the probability the student took part in exactly one event?",
          answer: "2/3",
          solution: "Exactly one = Only Dance + Only Music = 110 + 90 = 200; probability = 200 / 300 = 2/3.",
        },
        {
          question: "8. What percentage of Dance participants also took part in Music?",
          answer: "31.25%",
          solution: "Both / Dance total = 50 / 160 = 0.3125 = 31.25%. (Denominator is Dance = 160, not 300.)",
        },
      ],
    },

    {
      title: "Sheet 4 — Multi-step ratio chain + sub-split (Hard)",
      difficulty: "Hard",
      note:
        "\"A library has 480 books in three languages: English, Hindi and Telugu. There are 180 Hindi books, and the number of English books is twice the number of Telugu books. 25% of the English books are fiction. Among the Hindi books, the ratio of fiction to non-fiction is 4 : 5. Telugu has 40 fiction books.\"",
      charts: [
        {
          type: "table",
          caption: "English + Telugu = 480-180 = 300, and English = 2 x Telugu, so Telugu=100, English=200. English fiction=25% of 200=50. Hindi 180 split 4:5 -> fiction 80, non-fiction 100. Telugu fiction=40, non-fiction=60.",
          columns: ["Language", "Fiction", "Non-Fiction", "Total"],
          rows: [
            ["English", "50", "150", "200"],
            ["Hindi", "80", "100", "180"],
            ["Telugu", "40", "60", "100"],
            ["Total", "170", "310", "480"],
          ],
          highlightCol: 3,
        },
      ],
      questions: [
        {
          question: "1. How many English books are there?",
          answer: "200",
          solution: "English + Telugu = 480 - 180 = 300; English = 2 x Telugu, so 3 x Telugu = 300, Telugu = 100, English = 200.",
        },
        {
          question: "2. How many Telugu books are there?",
          answer: "100",
          solution: "From step above, Telugu = 300 / 3 = 100.",
        },
        {
          question: "3. How many English fiction books are there?",
          answer: "50",
          solution: "25% of 200 = 50.",
        },
        {
          question: "4. How many non-fiction Hindi books are there?",
          answer: "100",
          solution: "Hindi split 4:5 over 180 -> 9 parts, 1 part = 20; non-fiction = 5 x 20 = 100.",
        },
        {
          question: "5. How many fiction books are there across all three languages?",
          answer: "170",
          solution: "50 + 80 + 40 = 170.",
        },
        {
          question: "6. What is the ratio of total fiction to total non-fiction books?",
          answer: "17 : 31",
          solution: "170 : 310, divide by 10 -> 17 : 31.",
        },
        {
          question: "7. What fraction of the English books are non-fiction?",
          answer: "3/4",
          solution: "English non-fiction / English total = 150 / 200 = 3/4.",
        },
        {
          question: "8. If a book is picked at random, what is the probability it is a Telugu non-fiction book?",
          answer: "1/8",
          solution: "Telugu non-fiction / total = 60 / 480 = 1/8.",
        },
      ],
    },
  ],
}
