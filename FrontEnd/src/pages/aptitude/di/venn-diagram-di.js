// Venn Diagram DI — Data Interpretation (frontend-rendered, exam-grade)
export default {
  intro:
    "Venn Diagram DI gives you a picture of three overlapping circles (three sets) and asks you to read counts out of specific regions. The single most important skill is knowing exactly which regions a phrase covers. A three-set diagram has 7 regions inside the circles plus 1 region outside (neither). In this module every region is labelled the placement-exam way: A, B and C mean ONLY that one set; AB, BC and AC mean EXACTLY those two sets (and NOT the third); ABC means all three. The classic mistake that costs marks is confusing exactly-two (the three pairwise-only slices) with at-least-two (those same slices PLUS the centre). Master the region map below and most TCS, Infosys, Wipro and CAT-style Venn questions become 20-second reads.",

  howToRead: [
    {
      step: "Name the three sets and lock the 7 inside regions",
      detail:
        "Circle A alone (only-A), circle B alone (only-B), circle C alone (only-C) are the three petals touching no overlap. AB, BC, AC are the three lens-shaped overlaps of exactly two circles. ABC is the small centre where all three meet. Every count on the diagram sits in exactly one of these 7 slices."
    },
    {
      step: "Translate the English phrase into a set of regions BEFORE adding",
      detail:
        "\"Only Cricket\" = A. \"Exactly two games\" = AB + BC + AC. \"At least two games\" = AB + BC + AC + ABC. \"Cricket and Football\" (both, no other word) = AB + ABC. \"Cricket but not Tennis\" = A + AB. Write the region letters down first, then plug the numbers."
    },
    {
      step: "Total in a set sweeps the WHOLE circle",
      detail:
        "Total who like Cricket = only-A + AB + AC + ABC. It is NOT just the only-A petal. A circle total always adds its four pieces: the petal, its two overlaps, and the centre."
    },
    {
      step: "Handle the outside region (neither) with the grand total",
      detail:
        "The diagram only shows people inside at least one circle. If a grand total is given, neither = grand total minus the sum of all 7 inside regions. At-least-one = sum of all 7 inside regions = grand total minus neither."
    },
    {
      step: "Use inclusion-exclusion only when overlaps are given as full intersections",
      detail:
        "If a question gives |A|, |B|, |C|, |A and B|, |B and C|, |A and C|, |A and B and C| as FULL overlaps (not exactly-two slices), then at-least-one = A + B + C - (A and B) - (B and C) - (A and C) + (A and B and C). Convert to region slices when you need only-two or only-one counts."
    },
    {
      step: "Sanity check by re-summing",
      detail:
        "All 7 inside regions should add up to at-least-one. Only-one + exactly-two + all-three must equal at-least-one too. If these two totals disagree, you mis-assigned a slice."
    }
  ],

  speedTips: [
    "Write the 7 region values in a row (A, B, C, AB, BC, AC, ABC) the moment you see the diagram — you will reuse them for every sub-question.",
    "Pre-compute three sums once: only-one = A+B+C, exactly-two = AB+BC+AC, all-three = ABC. Most questions are a combination of these three numbers.",
    "at-least-two = exactly-two + ABC. at-least-one = only-one + exactly-two + ABC. Memorise these two shortcuts.",
    "For any full circle total, add exactly four slices (petal + two overlaps + centre) — never three, never one.",
    "\"X and Y\" with no other word means the full lens: XY + ABC. \"Only X and Y\" or \"exactly X and Y\" means just XY.",
    "\"X but not Z\" = keep every region inside X that does not touch Z = only-X + (the X-Y overlap). Drop XZ and ABC.",
    "neither is the only region you cannot read off the picture — you must be handed a grand total to get it."
  ],

  traps: [
    "Confusing exactly-two with at-least-two: exactly-two is AB+BC+AC only; at-least-two adds the centre ABC. This is the number-one trap.",
    "Reading total-in-a-set as the petal only. Total Cricket includes both overlaps and the centre, not just only-Cricket.",
    "Treating a printed \"A and B\" overlap as exactly-two when the question defines it as the full intersection (which already includes all-three). Read whether the label means only-two or full-two.",
    "Forgetting neither. When a grand total is stated, some people fall outside all circles — the inside regions will not sum to the grand total.",
    "Double counting the centre. When you add only-one + exactly-two + all-three, add ABC exactly once; do not also fold it into the pairwise slices.",
    "Assuming symmetry. Only-A, only-B, only-C are usually different numbers; never average or copy one for another."
  ],

  questionTypes: [
    {
      name: "Only-one-set count",
      how: "Read a single petal directly (only-A, only-B or only-C), or sum all three petals for \"exactly one of the three\"."
    },
    {
      name: "Total in a set",
      how: "Add the four slices of that circle: petal + its two overlaps + the centre. Watch for the petal-only trap."
    },
    {
      name: "Exactly-two count",
      how: "Add only the three pairwise lens slices: AB + BC + AC. Do NOT include the centre."
    },
    {
      name: "At-least-two count",
      how: "Exactly-two plus the centre: AB + BC + AC + ABC. The centre qualifies because those people are in all three (hence at least two)."
    },
    {
      name: "Both X and Y (full intersection)",
      how: "The whole lens of X and Y = XY + ABC. Used when the phrase names two sets with no \"only\"/\"exactly\" qualifier."
    },
    {
      name: "X but not Y",
      how: "Take everything in circle X and remove any region that also lies in Y: only-X + the X-with-the-other-set overlap. Drop the X-Y overlap and the centre."
    },
    {
      name: "At-least-one / union",
      how: "Sum all 7 inside regions, or use inclusion-exclusion if full overlaps are given. Equals grand total minus neither."
    },
    {
      name: "Neither / complement",
      how: "neither = grand total minus at-least-one (the sum of all 7 inside regions). Needs a stated grand total."
    },
    {
      name: "Find a missing region",
      how: "Use a known total to back-solve one unknown slice, e.g. all-three = at-least-one minus the six known slices, or a petal = circle total minus its overlaps and centre."
    }
  ],

  visual: {
    note:
      "Survey of 120 students on the sports they play — Cricket (A), Football (B), Tennis (C). The 7 numbers are region counts: A/B/C = only that sport, AB/BC/AC = exactly those two sports, ABC = all three. Inside regions sum to 28+20+17+12+8+10+5 = 100, so with 120 surveyed, 20 play none.",
    charts: [
      {
        type: "venn",
        labels: { A: "Cricket", B: "Football", C: "Tennis" },
        regions: { A: 28, B: 20, C: 17, AB: 12, BC: 8, AC: 10, ABC: 5 }
      }
    ]
  },

  worked: {
    question:
      "In the survey of 120 students above (Cricket, Football, Tennis), how many play at least two of the three sports, and how many play none?",
    steps: [
      {
        action: "List the 7 inside regions",
        why: "Only=28,20,17 (Cricket, Football, Tennis); pairs AB=12, BC=8, AC=10; centre ABC=5. Having them in a row prevents mis-picks."
      },
      {
        action: "at-least-two = exactly-two + all-three",
        why: "Exactly-two = AB + BC + AC = 12 + 8 + 10 = 30. Add the centre ABC = 5, because all-three people are also in at least two."
      },
      {
        action: "Compute at-least-two = 30 + 5 = 35",
        why: "This is the standard trap: leaving out the centre would wrongly give 30."
      },
      {
        action: "Sum all inside regions for at-least-one",
        why: "28 + 20 + 17 + 12 + 8 + 10 + 5 = 100 play at least one sport."
      },
      {
        action: "neither = grand total - at-least-one = 120 - 100",
        why: "The diagram only covers players; the remaining students play none."
      }
    ],
    answer:
      "At least two sports = 35 students. Play none = 120 - 100 = 20 students. (Note exactly-two alone is 30 — the difference of 5 is the all-three centre.)"
  },

  sheets: [
    {
      title: "Sheet 1 — Newspaper Readership (Easy)",
      difficulty: "Easy",
      note:
        "100 people surveyed on the newspapers they read — Times (A), Hindu (B), Express (C). Regions: only-Times=25, only-Hindu=18, only-Express=15, exactly Times&Hindu=8, exactly Hindu&Express=6, exactly Times&Express=7, all three=4. Inside regions sum to 83, so 100 - 83 = 17 read no newspaper.",
      charts: [
        {
          type: "venn",
          labels: { A: "Times", B: "Hindu", C: "Express" },
          regions: { A: 25, B: 18, C: 15, AB: 8, BC: 6, AC: 7, ABC: 4 }
        }
      ],
      questions: [
        {
          question: "How many read only the Times?",
          answer: "25",
          solution: "Only-Times is the A petal read directly = 25."
        },
        {
          question: "How many read all three newspapers?",
          answer: "4",
          solution: "The centre region ABC = 4."
        },
        {
          question: "How many read exactly two newspapers?",
          answer: "21",
          solution: "Exactly-two = AB + BC + AC = 8 + 6 + 7 = 21 (centre excluded)."
        },
        {
          question: "How many read at least two newspapers?",
          answer: "25",
          solution: "At-least-two = exactly-two + all-three = 21 + 4 = 25."
        },
        {
          question: "How many read the Times in total?",
          answer: "44",
          solution: "Total Times = A + AB + AC + ABC = 25 + 8 + 7 + 4 = 44 (full circle, all four slices)."
        },
        {
          question: "How many read at least one newspaper?",
          answer: "83",
          solution: "Sum of all 7 inside regions = 25 + 18 + 15 + 8 + 6 + 7 + 4 = 83."
        },
        {
          question: "How many read no newspaper at all?",
          answer: "17",
          solution: "neither = grand total - at-least-one = 100 - 83 = 17."
        },
        {
          question: "How many read exactly one newspaper?",
          answer: "58",
          solution: "Exactly-one = only-Times + only-Hindu + only-Express = 25 + 18 + 15 = 58."
        }
      ]
    },

    {
      title: "Sheet 2 — Programming Languages Known (Easy-Medium)",
      difficulty: "Easy-Medium",
      note:
        "200 students surveyed on the languages they know — Python (A), Java (B), C++ (C). Regions: only-Python=40, only-Java=35, only-C++=30, exactly Python&Java=15, exactly Java&C++=12, exactly Python&C++=18, all three=10. Inside regions sum to 160, so 200 - 160 = 40 know none of the three.",
      charts: [
        {
          type: "venn",
          labels: { A: "Python", B: "Java", C: "C++" },
          regions: { A: 40, B: 35, C: 30, AB: 15, BC: 12, AC: 18, ABC: 10 }
        }
      ],
      questions: [
        {
          question: "How many students know Python (in total)?",
          answer: "83",
          solution: "Total Python = A + AB + AC + ABC = 40 + 15 + 18 + 10 = 83."
        },
        {
          question: "How many students know Java (in total)?",
          answer: "72",
          solution: "Total Java = B + AB + BC + ABC = 35 + 15 + 12 + 10 = 72."
        },
        {
          question: "How many students know C++ (in total)?",
          answer: "70",
          solution: "Total C++ = C + BC + AC + ABC = 30 + 12 + 18 + 10 = 70."
        },
        {
          question: "How many know exactly two languages?",
          answer: "45",
          solution: "Exactly-two = AB + BC + AC = 15 + 12 + 18 = 45."
        },
        {
          question: "How many know at least two languages?",
          answer: "55",
          solution: "At-least-two = exactly-two + all-three = 45 + 10 = 55."
        },
        {
          question: "How many know only one language?",
          answer: "105",
          solution: "Only-one = 40 + 35 + 30 = 105."
        },
        {
          question: "How many know none of the three languages?",
          answer: "40",
          solution: "Inside sum = 40+35+30+15+12+18+10 = 160; neither = 200 - 160 = 40."
        },
        {
          question: "How many know both Python and Java (whether or not they also know C++)?",
          answer: "25",
          solution: "Both Python and Java is the full lens = AB + ABC = 15 + 10 = 25 (the centre counts because those students know Python and Java too)."
        }
      ]
    },

    {
      title: "Sheet 3 — Employee Skills (Medium-Hard)",
      difficulty: "Medium-Hard",
      note:
        "150 employees surveyed on the tools they can use — SQL (A), Excel (B), Tableau (C). Regions: only-SQL=22, only-Excel=30, only-Tableau=14, exactly SQL&Excel=18, exactly Excel&Tableau=9, exactly SQL&Tableau=16, all three=11. Inside regions sum to 120, so 150 - 120 = 30 use none of these tools.",
      charts: [
        {
          type: "venn",
          labels: { A: "SQL", B: "Excel", C: "Tableau" },
          regions: { A: 22, B: 30, C: 14, AB: 18, BC: 9, AC: 16, ABC: 11 }
        },
        {
          type: "table",
          title: "Region summary",
          columns: ["Region", "Meaning", "Count"],
          rows: [
            ["only-SQL", "SQL only", "22"],
            ["only-Excel", "Excel only", "30"],
            ["only-Tableau", "Tableau only", "14"],
            ["SQL & Excel", "exactly these two", "18"],
            ["Excel & Tableau", "exactly these two", "9"],
            ["SQL & Tableau", "exactly these two", "16"],
            ["all three", "SQL & Excel & Tableau", "11"]
          ]
        }
      ],
      questions: [
        {
          question: "How many employees can use Excel (in total)?",
          answer: "68",
          solution: "Total Excel = B + AB + BC + ABC = 30 + 18 + 9 + 11 = 68."
        },
        {
          question: "How many can use exactly two of the tools?",
          answer: "43",
          solution: "Exactly-two = AB + BC + AC = 18 + 9 + 16 = 43."
        },
        {
          question: "How many can use at least two of the tools?",
          answer: "54",
          solution: "At-least-two = exactly-two + all-three = 43 + 11 = 54."
        },
        {
          question: "How many can use SQL but not Tableau?",
          answer: "40",
          solution: "Keep SQL regions that avoid Tableau = only-SQL + (SQL&Excel) = 22 + 18 = 40. Check: total SQL = 22+18+16+11 = 67; SQL with Tableau = AC + ABC = 16 + 11 = 27; 67 - 27 = 40."
        },
        {
          question: "How many can use SQL and Excel but not Tableau?",
          answer: "18",
          solution: "That is exactly the SQL&Excel lens excluding the centre = AB = 18."
        },
        {
          question: "How many can use exactly one tool?",
          answer: "66",
          solution: "Only-one = 22 + 30 + 14 = 66."
        },
        {
          question: "How many use none of the three tools?",
          answer: "30",
          solution: "Inside sum = 22+30+14+18+9+16+11 = 120; neither = 150 - 120 = 30."
        },
        {
          question: "How many can use at least one of the three tools?",
          answer: "120",
          solution: "Sum of all 7 inside regions = 120 (equivalently 150 - 30 = 120)."
        }
      ]
    },

    {
      title: "Sheet 4 — OTT Subscriptions, Missing Region (Hard)",
      difficulty: "Hard",
      note:
        "500 people surveyed on the streaming services they use — Netflix (A), Prime (B), Hotstar (C). It is given that 60 people use none, so 500 - 60 = 440 use at least one. Known regions: only-Netflix=150, only-Prime=110, only-Hotstar=80, exactly Netflix&Prime=35, exactly Prime&Hotstar=25, exactly Netflix&Hotstar=20; the all-three centre is unknown and must be found. (Completed diagram below shows the solved centre.)",
      charts: [
        {
          type: "venn",
          labels: { A: "Netflix", B: "Prime", C: "Hotstar" },
          regions: { A: 150, B: 110, C: 80, AB: 35, BC: 25, AC: 20, ABC: 20 }
        }
      ],
      questions: [
        {
          question: "How many people use all three services?",
          answer: "20",
          solution: "all-three = at-least-one - (six known regions) = 440 - (150 + 110 + 80 + 35 + 25 + 20) = 440 - 420 = 20."
        },
        {
          question: "How many use Netflix in total?",
          answer: "225",
          solution: "Total Netflix = A + AB + AC + ABC = 150 + 35 + 20 + 20 = 225."
        },
        {
          question: "How many use exactly two services?",
          answer: "80",
          solution: "Exactly-two = AB + BC + AC = 35 + 25 + 20 = 80 (centre excluded)."
        },
        {
          question: "How many use at least two services?",
          answer: "100",
          solution: "At-least-two = exactly-two + all-three = 80 + 20 = 100."
        },
        {
          question: "How many use only one service?",
          answer: "340",
          solution: "Only-one = 150 + 110 + 80 = 340."
        },
        {
          question: "How many use both Netflix and Prime (whether or not they also use Hotstar)?",
          answer: "55",
          solution: "Full Netflix-Prime lens = AB + ABC = 35 + 20 = 55."
        },
        {
          question: "How many use Hotstar but not Prime?",
          answer: "100",
          solution: "Keep Hotstar regions avoiding Prime = only-Hotstar + (Netflix&Hotstar) = 80 + 20 = 100. Check: total Hotstar = 80+25+20+20 = 145; Hotstar with Prime = BC + ABC = 25 + 20 = 45; 145 - 45 = 100."
        },
        {
          question: "How many use none of the three services, and what percent use at least one?",
          answer: "None = 60; at-least-one = 440, i.e. 88%",
          solution: "None is given as 60. At-least-one = 500 - 60 = 440; 440 / 500 = 0.88 = 88%."
        }
      ]
    }
  ]
}
