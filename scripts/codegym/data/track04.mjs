// Track 04 — Crack It
// Story problems with several rules hidden inside them — the placement-exam style.
// The challenge is NOT speed; it is reading the situation carefully and turning every
// rule into correct code. Mostly single-solution problems (the logic is the point).
// No company names or "interview" labels anywhere — just real-life scenarios.
import { solo, variant, ex } from './_helpers.mjs'

const T = 'CRACK_IT'

const questions = [
  {
    track: T, level: 'BEGINNER', category: 'Money & Bills', topics: ['Conditions', 'Ranges'],
    title: 'Shopping Cart Discount',
    description:
      'A store gives a discount based on the cart total:\n\n' +
      '- total above 5000 → 20% off\n' +
      '- total above 2000 (up to 5000) → 10% off\n' +
      '- total above 1000 (up to 2000) → 5% off\n' +
      '- 1000 or below → no discount\n\n' +
      'Read the cart total and print the final amount the customer pays.',
    inputFormat: 'One integer: the cart total.',
    outputFormat: 'One number: the final amount after discount.',
    examples: [
      ex('6000', '4800', '6000 is above 5000 → 20% off → pay 4800.'),
      ex('1500', '1425', '1500 is above 1000 → 5% off → pay 1425.'),
    ],
    hints: [
      'Check the highest tier first and work downward.',
      'Final amount = total minus (total × discount percent).',
    ],
    approach:
      'This is a range problem hiding in a story. Check the bands from highest to lowest so the first match ' +
      'is the right one. Once you know the discount percent, the final amount is total minus that percentage.',
    whatYouLearn: ['Reading tiered rules from a story', 'Ordering conditions from high to low'],
    solutions: solo(
      'Pick the discount percent by checking bands top-down, then subtract it from the total.',
      {
        python:
          'total = int(input())\n' +
          'if total > 5000:\n' +
          '    pct = 20\n' +
          'elif total > 2000:\n' +
          '    pct = 10\n' +
          'elif total > 1000:\n' +
          '    pct = 5\n' +
          'else:\n' +
          '    pct = 0\n' +
          'print(total - total * pct // 100)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int total = new Scanner(System.in).nextInt();\n' +
          '        int pct;\n' +
          '        if (total > 5000) pct = 20;\n' +
          '        else if (total > 2000) pct = 10;\n' +
          '        else if (total > 1000) pct = 5;\n' +
          '        else pct = 0;\n' +
          '        System.out.println(total - total * pct / 100);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int total;\n' +
          '    scanf("%d", &total);\n' +
          '    int pct;\n' +
          '    if (total > 5000) pct = 20;\n' +
          '    else if (total > 2000) pct = 10;\n' +
          '    else if (total > 1000) pct = 5;\n' +
          '    else pct = 0;\n' +
          '    printf("%d\\n", total - total * pct / 100);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int total;\n' +
          '    cin >> total;\n' +
          '    int pct;\n' +
          '    if (total > 5000) pct = 20;\n' +
          '    else if (total > 2000) pct = 10;\n' +
          '    else if (total > 1000) pct = 5;\n' +
          '    else pct = 0;\n' +
          '    cout << total - total * pct / 100 << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The story is just a tiered range in disguise. Checking from the top band down means the first condition ' +
      'that matches is automatically the correct one, so each check only needs a lower bound. The rest is one subtraction.',
    tip: 'Placement problems love hiding a simple range behind a story. Find the bands and it becomes easy.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Money & Bills', topics: ['Conditions', 'Slabs'],
    title: 'Electricity Bill',
    description:
      'An electricity board charges in slabs based on units consumed:\n\n' +
      '- first 100 units → 5 rupees per unit\n' +
      '- next 100 units (101 to 200) → 7 rupees per unit\n' +
      '- every unit above 200 → 10 rupees per unit\n\n' +
      'Read the units consumed and print the total bill.',
    inputFormat: 'One integer: units consumed.',
    outputFormat: 'One integer: the total bill.',
    examples: [
      ex('250', '1700', '100×5 + 100×7 + 50×10 = 500 + 700 + 500 = 1700.'),
      ex('80', '400', 'All 80 units fall in the first slab: 80×5 = 400.'),
    ],
    hints: [
      'Charge each slab separately, only for the units that fall inside it.',
      'Subtract the units already charged before moving to the next slab.',
    ],
    approach:
      'The mistake is charging all units at one rate. Instead, handle slabs one at a time: charge the first 100 ' +
      '(or fewer if the total is small), then the next 100, then whatever is left at the top rate. Add the pieces.',
    whatYouLearn: ['Slab-based (tiered) billing', 'Charging only the units that belong to each slab'],
    solutions: solo(
      'Charge each slab only for the units inside it, then add the slab amounts together.',
      {
        python:
          'units = int(input())\n' +
          'bill = 0\n' +
          'if units > 200:\n' +
          '    bill += (units - 200) * 10\n' +
          '    units = 200\n' +
          'if units > 100:\n' +
          '    bill += (units - 100) * 7\n' +
          '    units = 100\n' +
          'bill += units * 5\n' +
          'print(bill)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int units = new Scanner(System.in).nextInt();\n' +
          '        int bill = 0;\n' +
          '        if (units > 200) { bill += (units - 200) * 10; units = 200; }\n' +
          '        if (units > 100) { bill += (units - 100) * 7; units = 100; }\n' +
          '        bill += units * 5;\n' +
          '        System.out.println(bill);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int units;\n' +
          '    scanf("%d", &units);\n' +
          '    int bill = 0;\n' +
          '    if (units > 200) { bill += (units - 200) * 10; units = 200; }\n' +
          '    if (units > 100) { bill += (units - 100) * 7; units = 100; }\n' +
          '    bill += units * 5;\n' +
          '    printf("%d\\n", bill);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int units;\n' +
          '    cin >> units;\n' +
          '    int bill = 0;\n' +
          '    if (units > 200) { bill += (units - 200) * 10; units = 200; }\n' +
          '    if (units > 100) { bill += (units - 100) * 7; units = 100; }\n' +
          '    bill += units * 5;\n' +
          '    cout << bill << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Working from the top slab downward lets you peel off the units above 200, then those between 100 and 200, ' +
      'and finally the base slab — capping units after each step so no unit is charged twice. Each slab contributes ' +
      'only for the units that actually fall inside it.',
    tip: 'Tax, electricity, data plans — slab billing is everywhere. Charge each band separately and add them up.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'People & Records', topics: ['Loops', 'Conditions', 'Max'],
    title: 'Pass, Fail and Topper',
    description:
      'A class has N students. Each student has a name and marks in 3 subjects.\n\n' +
      'A student PASSES only if they score above 35 in every subject AND their total is above 120.\n\n' +
      'Print how many passed, how many failed, and the name of the topper (highest total).',
    inputFormat: 'Line 1: N. Next N lines: a name followed by 3 integer marks.',
    outputFormat: 'Three lines — "Passed: X", "Failed: Y", "Topper: name".',
    examples: [
      ex('3\nRavi 40 50 45\nMeena 30 90 80\nArjun 60 55 50',
        'Passed: 2\nFailed: 1\nTopper: Arjun',
        'Meena fails (30 is not above 35). Ravi and Arjun pass. Arjun has the highest total (165).'),
    ],
    hints: [
      'Process students one by one, keeping running counts and the best total so far.',
      'A student passes only if ALL three conditions on marks hold AND the total condition holds.',
    ],
    approach:
      'Loop over the N students. For each, check the pass rule (every subject above 35 and total above 120) and ' +
      'update passed/failed counts. Separately track the highest total seen and the name that goes with it. Print all three results at the end.',
    whatYouLearn: ['Combining multiple conditions with AND', 'Counting and finding a maximum in the same loop'],
    solutions: solo(
      'For each student check the full pass rule for counts, and track the highest total for the topper.',
      {
        python:
          'n = int(input())\n' +
          'passed = 0\n' +
          'best_total = -1\n' +
          'topper = ""\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    name = parts[0]\n' +
          '    a, b, c = int(parts[1]), int(parts[2]), int(parts[3])\n' +
          '    total = a + b + c\n' +
          '    if a > 35 and b > 35 and c > 35 and total > 120:\n' +
          '        passed += 1\n' +
          '    if total > best_total:\n' +
          '        best_total = total\n' +
          '        topper = name\n' +
          'print("Passed:", passed)\n' +
          'print("Failed:", n - passed)\n' +
          'print("Topper:", topper)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int passed = 0, bestTotal = -1;\n' +
          '        String topper = "";\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String name = sc.next();\n' +
          '            int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();\n' +
          '            int total = a + b + c;\n' +
          '            if (a > 35 && b > 35 && c > 35 && total > 120) passed++;\n' +
          '            if (total > bestTotal) { bestTotal = total; topper = name; }\n' +
          '        }\n' +
          '        System.out.println("Passed: " + passed);\n' +
          '        System.out.println("Failed: " + (n - passed));\n' +
          '        System.out.println("Topper: " + topper);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int passed = 0, bestTotal = -1;\n' +
          '    char topper[100] = "", name[100];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int a, b, c;\n' +
          '        scanf("%s %d %d %d", name, &a, &b, &c);\n' +
          '        int total = a + b + c;\n' +
          '        if (a > 35 && b > 35 && c > 35 && total > 120) passed++;\n' +
          '        if (total > bestTotal) { bestTotal = total; \n' +
          '            int j = 0; while ((topper[j] = name[j]) != \'\\0\') j++; }\n' +
          '    }\n' +
          '    printf("Passed: %d\\n", passed);\n' +
          '    printf("Failed: %d\\n", n - passed);\n' +
          '    printf("Topper: %s\\n", topper);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int passed = 0, bestTotal = -1;\n' +
          '    string topper = "", name;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int a, b, c;\n' +
          '        cin >> name >> a >> b >> c;\n' +
          '        int total = a + b + c;\n' +
          '        if (a > 35 && b > 35 && c > 35 && total > 120) passed++;\n' +
          '        if (total > bestTotal) { bestTotal = total; topper = name; }\n' +
          '    }\n' +
          '    cout << "Passed: " << passed << "\\n";\n' +
          '    cout << "Failed: " << (n - passed) << "\\n";\n' +
          '    cout << "Topper: " << topper << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The key is reading the rule precisely: passing needs every subject above 35 AND the total above 120 — one ' +
      'AND chain. Counting passes and tracking the highest total happen together in the same loop, so a single pass over the students answers all three questions.',
    tip: 'Underline every "and", "or", "only if" in the story before coding. Those words are the logic.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Money & Bills', topics: ['Conditions', 'Caps'],
    title: 'Parking Fee',
    description:
      'A parking lot charges like this:\n\n' +
      '- the first 2 hours cost a flat 50 rupees\n' +
      '- every hour after that costs 20 rupees\n' +
      '- but the total is capped at 200 rupees per day\n\n' +
      'Read the number of hours parked and print the fee.',
    inputFormat: 'One integer: hours parked (at least 1).',
    outputFormat: 'One integer: the parking fee.',
    examples: [
      ex('5', '110', 'First 2 hours = 50, then 3 extra hours × 20 = 60, total 110.'),
      ex('12', '200', '50 + 10×20 = 250, but the daily cap limits it to 200.'),
    ],
    hints: [
      'Handle the flat first-2-hours charge, then the extra hours separately.',
      'After computing the fee, do not forget to apply the maximum cap.',
    ],
    approach:
      'Start with the flat 50 for the first two hours. If more hours were used, add 20 for each extra hour. ' +
      'Finally, if the result is above 200, bring it down to 200 — the cap is a rule that is easy to forget.',
    whatYouLearn: ['Flat-plus-extra pricing', 'Applying a maximum cap at the end'],
    solutions: solo(
      'Flat 50 for the first 2 hours, add 20 per extra hour, then cap the total at 200.',
      {
        python:
          'hours = int(input())\n' +
          'fee = 50\n' +
          'if hours > 2:\n' +
          '    fee += (hours - 2) * 20\n' +
          'if fee > 200:\n' +
          '    fee = 200\n' +
          'print(fee)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int hours = new Scanner(System.in).nextInt();\n' +
          '        int fee = 50;\n' +
          '        if (hours > 2) fee += (hours - 2) * 20;\n' +
          '        if (fee > 200) fee = 200;\n' +
          '        System.out.println(fee);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int hours;\n' +
          '    scanf("%d", &hours);\n' +
          '    int fee = 50;\n' +
          '    if (hours > 2) fee += (hours - 2) * 20;\n' +
          '    if (fee > 200) fee = 200;\n' +
          '    printf("%d\\n", fee);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int hours;\n' +
          '    cin >> hours;\n' +
          '    int fee = 50;\n' +
          '    if (hours > 2) fee += (hours - 2) * 20;\n' +
          '    if (fee > 200) fee = 200;\n' +
          '    cout << fee << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The fee has three parts: a flat base, a per-hour add-on, and a cap. Beginners usually nail the first two ' +
      'and forget the cap — which is exactly the kind of hidden rule these problems test. Read every sentence as a rule.',
    tip: 'Words like "at most", "capped", "maximum" mean an extra check at the end. Never skip them.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Eligibility', topics: ['Conditions', 'Boolean Logic'],
    title: 'Exam Eligibility',
    description:
      'A student can sit an exam if their attendance is 75% or more.\n\n' +
      'There is one exception: students with a medical certificate are allowed with just 65% attendance.\n\n' +
      'Read the attendance percentage and whether a medical certificate exists (1 for yes, 0 for no). Print ' +
      '"Eligible" or "Not Eligible".',
    inputFormat: 'Line 1: attendance percentage (integer). Line 2: 1 if a medical certificate exists, else 0.',
    outputFormat: 'Either "Eligible" or "Not Eligible".',
    examples: [
      ex('70\n1', 'Eligible', '70% with a medical certificate clears the lower 65% bar.'),
      ex('70\n0', 'Not Eligible', 'Without a certificate, 70% is below the required 75%.'),
    ],
    hints: [
      'There are two ways to be eligible — join them with OR.',
      'The exception only helps when the certificate exists AND attendance is at least 65%.',
    ],
    approach:
      'Translate the "exception" into an OR. A student is eligible if attendance is at least 75%, OR if they have ' +
      'a certificate and attendance is at least 65%. Write it as one boolean expression and print the matching result.',
    whatYouLearn: ['Turning an "exception" rule into an OR', 'Combining a flag with a threshold'],
    solutions: solo(
      'Eligible when attendance >= 75, OR (certificate exists AND attendance >= 65).',
      {
        python:
          'attendance = int(input())\n' +
          'medical = int(input())\n' +
          'if attendance >= 75 or (medical == 1 and attendance >= 65):\n' +
          '    print("Eligible")\n' +
          'else:\n' +
          '    print("Not Eligible")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int attendance = sc.nextInt(), medical = sc.nextInt();\n' +
          '        boolean ok = attendance >= 75 || (medical == 1 && attendance >= 65);\n' +
          '        System.out.println(ok ? "Eligible" : "Not Eligible");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int attendance, medical;\n' +
          '    scanf("%d %d", &attendance, &medical);\n' +
          '    int ok = attendance >= 75 || (medical == 1 && attendance >= 65);\n' +
          '    printf(ok ? "Eligible\\n" : "Not Eligible\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int attendance, medical;\n' +
          '    cin >> attendance >> medical;\n' +
          '    bool ok = attendance >= 75 || (medical == 1 && attendance >= 65);\n' +
          '    cout << (ok ? "Eligible" : "Not Eligible") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The main rule and its exception become two conditions joined by OR. The exception itself is an AND (needs ' +
      'both the certificate and 65%). Getting the brackets right — (medical AND attendance>=65) — is what makes the logic correct.',
    tip: '"Unless" and "except" almost always become an OR with an extra AND inside. Spot them in the story.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Money & Bills', topics: ['Conditions', 'Percentages'],
    title: 'Salary to Net Pay',
    description:
      'An employee\'s pay is built from their basic salary:\n\n' +
      '- HRA is 20% of basic, DA is 50% of basic. Gross = basic + HRA + DA.\n' +
      '- PF deduction is 12% of basic.\n' +
      '- If gross is above 50000, a 10% tax on gross is also deducted.\n\n' +
      'Read the basic salary and print the net pay (gross minus deductions).',
    inputFormat: 'One integer: the basic salary.',
    outputFormat: 'One integer: the net pay.',
    examples: [
      ex('30000', '42300', 'HRA 6000 + DA 15000 → gross 51000. PF 3600, tax 5100 (gross>50000). Net = 51000 − 3600 − 5100 = 42300.'),
      ex('20000', '31600', 'Gross = 34000 (below 50000, no tax). PF 2400. Net = 34000 − 2400 = 31600.'),
    ],
    hints: [
      'Build the gross first, then compute each deduction.',
      'The tax only applies when gross is above 50000 — check that before subtracting it.',
    ],
    approach:
      'Compute HRA and DA from the basic and add them to get gross. Then subtract PF (always) and tax (only if ' +
      'gross exceeds 50000). Doing it in the order stated in the story keeps each step clear and avoids mistakes.',
    whatYouLearn: ['Building a value in stages', 'Applying a conditional deduction'],
    solutions: solo(
      'Gross = basic + 20% + 50%; subtract 12% PF always and 10% tax only if gross > 50000.',
      {
        python:
          'basic = int(input())\n' +
          'gross = basic + basic * 20 // 100 + basic * 50 // 100\n' +
          'pf = basic * 12 // 100\n' +
          'tax = gross * 10 // 100 if gross > 50000 else 0\n' +
          'print(gross - pf - tax)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int basic = new Scanner(System.in).nextInt();\n' +
          '        int gross = basic + basic * 20 / 100 + basic * 50 / 100;\n' +
          '        int pf = basic * 12 / 100;\n' +
          '        int tax = gross > 50000 ? gross * 10 / 100 : 0;\n' +
          '        System.out.println(gross - pf - tax);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int basic;\n' +
          '    scanf("%d", &basic);\n' +
          '    int gross = basic + basic * 20 / 100 + basic * 50 / 100;\n' +
          '    int pf = basic * 12 / 100;\n' +
          '    int tax = gross > 50000 ? gross * 10 / 100 : 0;\n' +
          '    printf("%d\\n", gross - pf - tax);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int basic;\n' +
          '    cin >> basic;\n' +
          '    int gross = basic + basic * 20 / 100 + basic * 50 / 100;\n' +
          '    int pf = basic * 12 / 100;\n' +
          '    int tax = gross > 50000 ? gross * 10 / 100 : 0;\n' +
          '    cout << gross - pf - tax << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Payroll is a chain of steps: build gross from percentages of basic, then remove deductions. The tax is the ' +
      'trap — it is conditional on gross exceeding 50000, so it must be guarded by a check rather than always subtracted.',
    tip: 'Do the steps in the exact order the story lists them. Payroll problems punish reordering.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Money & Bills', topics: ['Conditions', 'Percentages'],
    title: 'Movie Ticket Price',
    description:
      'A cinema prices tickets like this:\n\n' +
      '- base price: normal seat 150, premium seat 300\n' +
      '- on weekends, add 20% to the base\n' +
      '- children (below 12) and seniors (60 or above) get 30% off the price after any weekend surcharge\n\n' +
      'Read the age, seat type (1 = normal, 2 = premium), and whether it is a weekend (1 = yes, 0 = no). ' +
      'Print the final ticket price.',
    inputFormat: 'Three integers on separate lines: age, seat type (1 or 2), weekend (1 or 0).',
    outputFormat: 'One integer: the final ticket price.',
    examples: [
      ex('10\n1\n1', '126', 'Normal 150 → weekend +20% = 180 → child 30% off = 126.'),
      ex('30\n2\n0', '300', 'Premium 300, no weekend surcharge, no age discount.'),
    ],
    hints: [
      'Apply the rules in order: base price, then weekend surcharge, then age discount.',
      'The discount is on the price AFTER the weekend surcharge, not the base.',
    ],
    approach:
      'Pick the base from the seat type. If it is a weekend, increase it by 20%. Then, if the person is a child ' +
      'or senior, take 30% off. Order matters — the story says the discount applies after the surcharge.',
    whatYouLearn: ['Applying rules in the correct order', 'Chaining a surcharge and a discount'],
    solutions: solo(
      'Base by seat, add 20% on weekends, then 30% off for children or seniors — in that order.',
      {
        python:
          'age = int(input())\n' +
          'seat = int(input())\n' +
          'weekend = int(input())\n' +
          'price = 300 if seat == 2 else 150\n' +
          'if weekend == 1:\n' +
          '    price = price * 120 // 100\n' +
          'if age < 12 or age >= 60:\n' +
          '    price = price * 70 // 100\n' +
          'print(price)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int age = sc.nextInt(), seat = sc.nextInt(), weekend = sc.nextInt();\n' +
          '        int price = (seat == 2) ? 300 : 150;\n' +
          '        if (weekend == 1) price = price * 120 / 100;\n' +
          '        if (age < 12 || age >= 60) price = price * 70 / 100;\n' +
          '        System.out.println(price);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int age, seat, weekend;\n' +
          '    scanf("%d %d %d", &age, &seat, &weekend);\n' +
          '    int price = (seat == 2) ? 300 : 150;\n' +
          '    if (weekend == 1) price = price * 120 / 100;\n' +
          '    if (age < 12 || age >= 60) price = price * 70 / 100;\n' +
          '    printf("%d\\n", price);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int age, seat, weekend;\n' +
          '    cin >> age >> seat >> weekend;\n' +
          '    int price = (seat == 2) ? 300 : 150;\n' +
          '    if (weekend == 1) price = price * 120 / 100;\n' +
          '    if (age < 12 || age >= 60) price = price * 70 / 100;\n' +
          '    cout << price << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Three rules stack in a fixed order: choose base, add weekend surcharge, then apply the age discount on the ' +
      'new price. If you discounted before the surcharge, the numbers would be wrong — which is exactly the ordering trap these problems set.',
    tip: 'When a story says "after" or "then", it is telling you the order of operations. Follow it exactly.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Money & Bills', topics: ['Conditions', 'Slabs'],
    title: 'Income Tax Slabs',
    description:
      'Income tax is charged in slabs:\n\n' +
      '- income up to 250000 → no tax\n' +
      '- the part from 250001 to 500000 → 5%\n' +
      '- the part from 500001 to 1000000 → 20%\n' +
      '- the part above 1000000 → 30%\n\n' +
      'Read the income and print the total tax.',
    inputFormat: 'One integer: the annual income.',
    outputFormat: 'One integer: the total tax.',
    examples: [
      ex('700000', '52500', '5% of 250000 (12500) + 20% of 200000 (40000) = 52500.'),
      ex('200000', '0', 'Income is within the tax-free slab.'),
    ],
    hints: [
      'Only the portion of income inside each slab is taxed at that slab\'s rate.',
      'Handle the slabs from the top down, capping the income after each one.',
    ],
    approach:
      'Like electricity billing: tax each slab only on the money that falls inside it. Take the part above ' +
      '1000000 at 30%, the part between 500000 and 1000000 at 20%, the part between 250000 and 500000 at 5%, ' +
      'and leave the first 250000 untaxed. Add the pieces.',
    whatYouLearn: ['Progressive (slab) taxation', 'Taxing only the amount inside each band'],
    solutions: solo(
      'Tax each slab only on the income inside it, working top-down and capping after each slab.',
      {
        python:
          'income = int(input())\n' +
          'tax = 0\n' +
          'if income > 1000000:\n' +
          '    tax += (income - 1000000) * 30 // 100\n' +
          '    income = 1000000\n' +
          'if income > 500000:\n' +
          '    tax += (income - 500000) * 20 // 100\n' +
          '    income = 500000\n' +
          'if income > 250000:\n' +
          '    tax += (income - 250000) * 5 // 100\n' +
          'print(tax)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        long income = new Scanner(System.in).nextLong();\n' +
          '        long tax = 0;\n' +
          '        if (income > 1000000) { tax += (income - 1000000) * 30 / 100; income = 1000000; }\n' +
          '        if (income > 500000) { tax += (income - 500000) * 20 / 100; income = 500000; }\n' +
          '        if (income > 250000) { tax += (income - 250000) * 5 / 100; }\n' +
          '        System.out.println(tax);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    long income;\n' +
          '    scanf("%ld", &income);\n' +
          '    long tax = 0;\n' +
          '    if (income > 1000000) { tax += (income - 1000000) * 30 / 100; income = 1000000; }\n' +
          '    if (income > 500000) { tax += (income - 500000) * 20 / 100; income = 500000; }\n' +
          '    if (income > 250000) { tax += (income - 250000) * 5 / 100; }\n' +
          '    printf("%ld\\n", tax);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    long income;\n' +
          '    cin >> income;\n' +
          '    long tax = 0;\n' +
          '    if (income > 1000000) { tax += (income - 1000000) * 30 / 100; income = 1000000; }\n' +
          '    if (income > 500000) { tax += (income - 500000) * 20 / 100; income = 500000; }\n' +
          '    if (income > 250000) { tax += (income - 250000) * 5 / 100; }\n' +
          '    cout << tax << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A common mistake is taxing the whole income at one rate. Progressive tax only charges each band on the ' +
      'money inside it. Working top-down and capping the income after each slab ensures every rupee is taxed exactly once at the right rate.',
    tip: 'Slab tax and slab electricity are the same skeleton. Once you can do one, you can do them all.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Money & Bills', topics: ['Conditions'],
    title: 'Shipping Cost',
    description:
      'A courier charges by zone and weight:\n\n' +
      '- base charge: local 50, national 100, international 300\n' +
      '- for every kilogram above 5 kg: local +10/kg, national +20/kg, international +50/kg\n\n' +
      'Read the weight and the zone (1 = local, 2 = national, 3 = international) and print the total cost.',
    inputFormat: 'Line 1: weight in kg (integer). Line 2: zone (1, 2, or 3).',
    outputFormat: 'One integer: the shipping cost.',
    examples: [
      ex('8\n2', '160', 'National base 100 + 3 extra kg × 20 = 160.'),
      ex('3\n1', '50', 'Local base 50, and no extra since weight is under 5 kg.'),
    ],
    hints: [
      'Pick the base and per-kg rate together based on the zone.',
      'Extra weight only counts for kilograms ABOVE 5.',
    ],
    approach:
      'Choose the base charge and the per-kg rate from the zone. If the weight is over 5 kg, add the per-kg rate ' +
      'for each kilogram beyond 5. Both values depend on the same zone, so decide them in one place.',
    whatYouLearn: ['Selecting several values from one condition', 'Charging only the excess over a threshold'],
    solutions: solo(
      'Set base and per-kg rate from the zone, then add the rate for each kg above 5.',
      {
        python:
          'weight = int(input())\n' +
          'zone = int(input())\n' +
          'if zone == 1:\n' +
          '    base, rate = 50, 10\n' +
          'elif zone == 2:\n' +
          '    base, rate = 100, 20\n' +
          'else:\n' +
          '    base, rate = 300, 50\n' +
          'cost = base\n' +
          'if weight > 5:\n' +
          '    cost += (weight - 5) * rate\n' +
          'print(cost)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int weight = sc.nextInt(), zone = sc.nextInt();\n' +
          '        int base, rate;\n' +
          '        if (zone == 1) { base = 50; rate = 10; }\n' +
          '        else if (zone == 2) { base = 100; rate = 20; }\n' +
          '        else { base = 300; rate = 50; }\n' +
          '        int cost = base;\n' +
          '        if (weight > 5) cost += (weight - 5) * rate;\n' +
          '        System.out.println(cost);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int weight, zone;\n' +
          '    scanf("%d %d", &weight, &zone);\n' +
          '    int base, rate;\n' +
          '    if (zone == 1) { base = 50; rate = 10; }\n' +
          '    else if (zone == 2) { base = 100; rate = 20; }\n' +
          '    else { base = 300; rate = 50; }\n' +
          '    int cost = base;\n' +
          '    if (weight > 5) cost += (weight - 5) * rate;\n' +
          '    printf("%d\\n", cost);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int weight, zone;\n' +
          '    cin >> weight >> zone;\n' +
          '    int base, rate;\n' +
          '    if (zone == 1) { base = 50; rate = 10; }\n' +
          '    else if (zone == 2) { base = 100; rate = 20; }\n' +
          '    else { base = 300; rate = 50; }\n' +
          '    int cost = base;\n' +
          '    if (weight > 5) cost += (weight - 5) * rate;\n' +
          '    cout << cost << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The zone decides two things at once — the base charge and the per-kg rate — so it is cleanest to set both ' +
      'in the same branch. The extra weight rule only applies above 5 kg, so the surcharge uses (weight − 5), never the full weight.',
    tip: 'When one fact (the zone) drives several numbers, choose them all together to avoid mismatched values.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Handling Records', topics: ['Loops', 'Conditions'],
    title: 'Employee Bonus Run',
    description:
      'A company pays a yearly bonus based on years of experience:\n\n' +
      '- more than 5 years → 35% of salary\n' +
      '- more than 3 years (up to 5) → 20% of salary\n' +
      '- 3 years or below → no bonus\n\n' +
      'You are given a number of employees. For each, you get their salary and years of experience. ' +
      'Print each employee\'s bonus on its own line.',
    inputFormat: 'Line 1: number of employees N. Next N lines: two integers each — salary and years of experience.',
    outputFormat: 'N lines: each employee\'s bonus, in the same order.',
    examples: [
      ex('3\n50000 6\n40000 4\n30000 2', '17500\n8000\n0', '6 yrs → 35%, 4 yrs → 20%, 2 yrs → none.'),
      ex('1\n80000 5', '16000', '5 years is "up to 5", so it falls in the 20% band.'),
    ],
    hints: [
      'Read N first, then loop exactly N times.',
      'Check the experience bands from highest to lowest, printing the bonus each time.',
    ],
    approach:
      'This is the same tiered rule as before, but now applied to many records. Read the count, then loop that ' +
      'many times. For each employee, decide the percentage from their experience (top band first) and print the bonus right away.',
    whatYouLearn: ['Applying one rule across many records', 'Reading a count then looping that many times'],
    solutions: solo(
      'Loop N times; for each employee pick the bonus percent by experience band and print salary × percent.',
      {
        python:
          'n = int(input())\n' +
          'for _ in range(n):\n' +
          '    salary, years = map(int, input().split())\n' +
          '    if years > 5:\n' +
          '        pct = 35\n' +
          '    elif years > 3:\n' +
          '        pct = 20\n' +
          '    else:\n' +
          '        pct = 0\n' +
          '    print(salary * pct // 100)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            int salary = sc.nextInt(), years = sc.nextInt();\n' +
          '            int pct = years > 5 ? 35 : years > 3 ? 20 : 0;\n' +
          '            System.out.println(salary * pct / 100);\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int salary, years;\n' +
          '        scanf("%d %d", &salary, &years);\n' +
          '        int pct = years > 5 ? 35 : years > 3 ? 20 : 0;\n' +
          '        printf("%d\\n", salary * pct / 100);\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int salary, years;\n' +
          '        cin >> salary >> years;\n' +
          '        int pct = years > 5 ? 35 : years > 3 ? 20 : 0;\n' +
          '        cout << salary * pct / 100 << endl;\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The bonus rule for one person is simple; the real skill is applying it to a whole list. Reading the count ' +
      'first and looping that many times is the standard pattern for "process these N records", which placement tests use constantly.',
    tip: 'Almost every placement problem is "one rule, many records". Master the read-count-then-loop shape.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Eligibility', topics: ['Conditions', 'Boolean Logic'],
    title: 'Loan Approval',
    description:
      'A bank approves a personal loan only if ALL of these are true:\n\n' +
      '- the applicant is at least 21 years old\n' +
      '- monthly income is at least 25000\n' +
      '- credit score is 700 or above\n' +
      '- they have no existing unpaid loan\n\n' +
      'Read age, monthly income, credit score, and whether an unpaid loan exists (1 = yes, 0 = no). ' +
      'Print "Approved" or "Rejected".',
    inputFormat: 'Four integers on separate lines: age, monthly income, credit score, unpaid loan (1 or 0).',
    outputFormat: 'Either "Approved" or "Rejected".',
    examples: [
      ex('25\n30000\n720\n0', 'Approved', 'Every condition is satisfied.'),
      ex('25\n30000\n720\n1', 'Rejected', 'An existing unpaid loan fails the last rule.'),
    ],
    hints: [
      'Every condition must hold — join them with AND.',
      'The unpaid-loan rule is the reverse: it must be 0 to pass.',
    ],
    approach:
      'This is an "all must be true" check, so combine every condition with AND. Be careful with the last one — ' +
      'the applicant passes when there is NO unpaid loan, so the check is (unpaidLoan == 0), not == 1.',
    whatYouLearn: ['Combining many conditions with AND', 'Reading a flag in the correct direction'],
    solutions: solo(
      'Approve only when age, income, and score all pass AND there is no unpaid loan.',
      {
        python:
          'age = int(input())\n' +
          'income = int(input())\n' +
          'score = int(input())\n' +
          'unpaid = int(input())\n' +
          'if age >= 21 and income >= 25000 and score >= 700 and unpaid == 0:\n' +
          '    print("Approved")\n' +
          'else:\n' +
          '    print("Rejected")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int age = sc.nextInt(), income = sc.nextInt(), score = sc.nextInt(), unpaid = sc.nextInt();\n' +
          '        boolean ok = age >= 21 && income >= 25000 && score >= 700 && unpaid == 0;\n' +
          '        System.out.println(ok ? "Approved" : "Rejected");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int age, income, score, unpaid;\n' +
          '    scanf("%d %d %d %d", &age, &income, &score, &unpaid);\n' +
          '    int ok = age >= 21 && income >= 25000 && score >= 700 && unpaid == 0;\n' +
          '    printf(ok ? "Approved\\n" : "Rejected\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int age, income, score, unpaid;\n' +
          '    cin >> age >> income >> score >> unpaid;\n' +
          '    bool ok = age >= 21 && income >= 25000 && score >= 700 && unpaid == 0;\n' +
          '    cout << (ok ? "Approved" : "Rejected") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'When a story says "all of these must be true", every condition connects with AND — one failure rejects the ' +
      'whole application. The subtle part is the unpaid-loan flag: the applicant qualifies when it is 0, so reading the flag in the right direction is the real test.',
    tip: '"All of these" → AND. "Any of these" → OR. Reading which one the story means is half the battle.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Handling Records', topics: ['Arrays', 'Hashing', 'Optimization'],
    title: 'Suspicious Transaction Pair',
    description:
      'A bank\'s fraud system watches one account. It raises a flag if ANY two transactions in the day add up to ' +
      'exactly a "suspicious amount".\n\n' +
      'You are given the list of transaction amounts and the suspicious amount. Print "Flag" if some two of them ' +
      'sum to it, otherwise print "Clear".',
    inputFormat: 'Line 1: number of transactions N. Line 2: N amounts. Line 3: the suspicious amount.',
    outputFormat: 'Either "Flag" or "Clear".',
    examples: [
      ex('5\n120 200 75 300 25\n100', 'Flag', '75 + 25 = 100, so the account is flagged.'),
      ex('4\n10 20 30 40\n95', 'Clear', 'No two amounts add up to 95.'),
    ],
    hints: [
      'The slow way checks every pair with two loops.',
      'The fast way remembers what you have seen: for each amount, is (suspicious − amount) already seen?',
    ],
    approach:
      'First solve it the obvious way — try every pair. Then speed it up: as you scan once, keep a set of amounts ' +
      'seen so far. For each new amount, the partner you need is (suspicious − amount); if that partner is already ' +
      'in the set, you have found a pair. This turns nested loops into a single pass.',
    whatYouLearn: ['Turning a nested-loop search into a single pass', 'Using a set to remember what you have seen'],
    solutions: {
      brute: variant(
        'Check every possible pair with two nested loops; flag if any sums to the suspicious amount.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'amounts = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'flag = False\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        if amounts[i] + amounts[j] == target:\n' +
            '            flag = True\n' +
            'print("Flag" if flag else "Clear")',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt();\n' +
            '        boolean flag = false;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                if (a[i] + a[j] == target) flag = true;\n' +
            '        System.out.println(flag ? "Flag" : "Clear");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int target;\n' +
            '    scanf("%d", &target);\n' +
            '    int flag = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] + a[j] == target) flag = 1;\n' +
            '    printf(flag ? "Flag\\n" : "Clear\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> a[i];\n' +
            '    int target;\n' +
            '    cin >> target;\n' +
            '    bool flag = false;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] + a[j] == target) flag = true;\n' +
            '    cout << (flag ? "Flag" : "Clear") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Scan once, keeping a set of seen amounts; for each amount check if (target − amount) was already seen.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'amounts = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'seen = set()\n' +
            'flag = False\n' +
            'for a in amounts:\n' +
            '    if target - a in seen:\n' +
            '        flag = True\n' +
            '    seen.add(a)\n' +
            'print("Flag" if flag else "Clear")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt();\n' +
            '        Set<Integer> seen = new HashSet<>();\n' +
            '        boolean flag = false;\n' +
            '        for (int x : a) {\n' +
            '            if (seen.contains(target - x)) flag = true;\n' +
            '            seen.add(x);\n' +
            '        }\n' +
            '        System.out.println(flag ? "Flag" : "Clear");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// Simple approach in C: sort then two-pointer (a set is awkward without a library).\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int target;\n' +
            '    scanf("%d", &target);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int lo = 0, hi = n - 1, flag = 0;\n' +
            '    while (lo < hi) {\n' +
            '        int s = a[lo] + a[hi];\n' +
            '        if (s == target) { flag = 1; break; }\n' +
            '        else if (s < target) lo++;\n' +
            '        else hi--;\n' +
            '    }\n' +
            '    printf(flag ? "Flag\\n" : "Clear\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <unordered_set>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> a[i];\n' +
            '    int target;\n' +
            '    cin >> target;\n' +
            '    unordered_set<int> seen;\n' +
            '    bool flag = false;\n' +
            '    for (int x : a) {\n' +
            '        if (seen.count(target - x)) flag = true;\n' +
            '        seen.insert(x);\n' +
            '    }\n' +
            '    cout << (flag ? "Flag" : "Clear") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The brute force checks all pairs — correct, but slow for large days of transactions. The optimal trick is to ' +
      'realize that for any amount, there is exactly one partner that completes the target. Remembering every amount ' +
      'in a set lets you check for that partner instantly, so one pass replaces the nested loops. (In C, a sorted two-pointer scan achieves the same speed without a hash set.)',
    tip: 'Whenever you see "any two that add up to X", think set/hashing — it collapses O(n²) into O(n).',
  },
  {
    track: T, level: 'BEGINNER', category: 'Money & Bills', topics: ['Conditions', 'Percentages'],
    title: 'Restaurant Bill',
    description:
      'A restaurant computes the final bill like this:\n\n' +
      '- A service charge (a percentage of the food subtotal) is added ONLY when the subtotal is above 500.\n' +
      '- A tip (a percentage of the subtotal) is always added.\n\n' +
      'Read the subtotal, the service-charge percent, and the tip percent, then print the final bill.',
    inputFormat: 'Three integers: subtotal, service-charge percent, tip percent.',
    outputFormat: 'One integer: the final bill.',
    examples: [
      ex('1000 10 5', '1150', 'Subtotal is above 500: service 100 + tip 50 → 1000 + 100 + 50 = 1150.'),
      ex('400 10 5', '420', 'Subtotal is 400 (not above 500): no service charge, tip 20 → 420.'),
    ],
    hints: [
      'The service charge is conditional — only when the subtotal is above 500.',
      'The tip always applies. Both are percentages of the subtotal.',
    ],
    approach:
      'The trap is the conditional service charge. Start the total at the subtotal. Add the service charge only when ' +
      'the subtotal is above 500, then always add the tip. Reading which charge is conditional and which is always ' +
      'applied is the whole point.',
    whatYouLearn: ['Applying a charge conditionally', 'Separating always-on from conditional rules'],
    solutions: solo(
      'Add the service charge only when subtotal > 500; always add the tip.',
      {
        python:
          'sub, service, tip = map(int, input().split())\n' +
          'total = sub\n' +
          'if sub > 500:\n' +
          '    total += sub * service // 100\n' +
          'total += sub * tip // 100\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int sub = sc.nextInt(), service = sc.nextInt(), tip = sc.nextInt();\n' +
          '        int total = sub;\n' +
          '        if (sub > 500) total += sub * service / 100;\n' +
          '        total += sub * tip / 100;\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int sub, service, tip;\n' +
          '    scanf("%d %d %d", &sub, &service, &tip);\n' +
          '    int total = sub;\n' +
          '    if (sub > 500) total += sub * service / 100;\n' +
          '    total += sub * tip / 100;\n' +
          '    printf("%d\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int sub, service, tip;\n' +
          '    cin >> sub >> service >> tip;\n' +
          '    int total = sub;\n' +
          '    if (sub > 500) total += sub * service / 100;\n' +
          '    total += sub * tip / 100;\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Real bills mix charges that always apply with ones that only apply under a condition. The clean way is to build ' +
      'up the total step by step, guarding the conditional part with an if. Missing the "only above 500" clause is the ' +
      'classic mistake — careful reading, not clever code, is what solves it.',
    tip: 'Underline which parts of a rule are conditional and which are unconditional before you write any if.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Money & Bills', topics: ['Conditions', 'Slabs'],
    title: 'Water Usage Bill',
    description:
      'A water board charges in slabs based on units used:\n\n' +
      '- First 100 units: 2 per unit\n' +
      '- Next 100 units (101–200): 3 per unit\n' +
      '- Above 200 units: 5 per unit\n\n' +
      'Read the units consumed and print the total bill.',
    inputFormat: 'One integer: the number of units consumed.',
    outputFormat: 'One integer: the total water bill.',
    examples: [
      ex('250', '750', '100×2 + 100×3 + 50×5 = 200 + 300 + 250 = 750.'),
      ex('80', '160', 'All 80 units fall in the first slab: 80×2 = 160.'),
    ],
    hints: [
      'Charge each slab only for the units that actually fall within it.',
      'A higher slab only kicks in after the lower ones are completely filled.',
    ],
    approach:
      'Slab billing charges each band separately. If usage stays within the first 100, only the first rate applies. ' +
      'Beyond that, the first 100 are billed at rate 1, the next 100 at rate 2, and anything past 200 at rate 3. Add ' +
      'up only the units that belong to each slab.',
    whatYouLearn: ['Slab / tiered pricing', 'Charging each band for only its own units'],
    solutions: solo(
      'Fill each slab in order, charging only the units that land inside it.',
      {
        python:
          'units = int(input())\n' +
          'if units <= 100:\n' +
          '    bill = units * 2\n' +
          'elif units <= 200:\n' +
          '    bill = 100 * 2 + (units - 100) * 3\n' +
          'else:\n' +
          '    bill = 100 * 2 + 100 * 3 + (units - 200) * 5\n' +
          'print(bill)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int units = new Scanner(System.in).nextInt();\n' +
          '        int bill;\n' +
          '        if (units <= 100) bill = units * 2;\n' +
          '        else if (units <= 200) bill = 100 * 2 + (units - 100) * 3;\n' +
          '        else bill = 100 * 2 + 100 * 3 + (units - 200) * 5;\n' +
          '        System.out.println(bill);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int units;\n' +
          '    scanf("%d", &units);\n' +
          '    int bill;\n' +
          '    if (units <= 100) bill = units * 2;\n' +
          '    else if (units <= 200) bill = 100 * 2 + (units - 100) * 3;\n' +
          '    else bill = 100 * 2 + 100 * 3 + (units - 200) * 5;\n' +
          '    printf("%d\\n", bill);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int units;\n' +
          '    cin >> units;\n' +
          '    int bill;\n' +
          '    if (units <= 100) bill = units * 2;\n' +
          '    else if (units <= 200) bill = 100 * 2 + (units - 100) * 3;\n' +
          '    else bill = 100 * 2 + 100 * 3 + (units - 200) * 5;\n' +
          '    cout << bill << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Slab pricing is not "pick one rate" — each band is charged for only the units inside it, so a large bill is a ' +
      'sum of partial slabs. The common error is charging the whole usage at the top rate. Filling slabs from the ' +
      'bottom up, and charging only the overflow at higher rates, is exactly how utilities and tax brackets work.',
    tip: 'In slab/bracket problems, charge each band only for its own units — never the whole amount at the top rate.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Money & Bills', topics: ['Greedy', 'Division'],
    title: 'Minimum Currency Notes',
    description:
      'A cashier must hand out an amount using the fewest notes/coins, with denominations 500, 100, 50, 10, and 1.\n\n' +
      'Read the amount and print the total number of notes/coins needed.',
    inputFormat: 'One integer: the amount to pay out.',
    outputFormat: 'One integer: the minimum count of notes/coins.',
    examples: [
      ex('1288', '16', '2×500 + 2×100 + 1×50 + 3×10 + 8×1 = 2+2+1+3+8 = 16.'),
      ex('50', '1', 'A single 50 note.'),
    ],
    hints: [
      'Always use as many of the largest denomination as possible first.',
      'After using a denomination, continue with the remainder using the next smaller one.',
    ],
    approach:
      'Go from the biggest denomination to the smallest. For each, take as many as fit (amount ÷ denomination), add ' +
      'that to the count, and reduce the amount to the remainder (amount mod denomination). Because these denominations ' +
      'are "nice", grabbing the largest first is guaranteed to use the fewest pieces.',
    whatYouLearn: ['Greedy denomination breakdown', 'Using division and remainder together'],
    solutions: solo(
      'For each denomination high to low, add amount ÷ denom to the count and keep the remainder.',
      {
        python:
          'amount = int(input())\n' +
          'denoms = [500, 100, 50, 10, 1]\n' +
          'count = 0\n' +
          'for d in denoms:\n' +
          '    count += amount // d\n' +
          '    amount %= d\n' +
          'print(count)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int amount = new Scanner(System.in).nextInt();\n' +
          '        int[] denoms = {500, 100, 50, 10, 1};\n' +
          '        int count = 0;\n' +
          '        for (int d : denoms) { count += amount / d; amount %= d; }\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int amount;\n' +
          '    scanf("%d", &amount);\n' +
          '    int denoms[] = {500, 100, 50, 10, 1};\n' +
          '    int count = 0;\n' +
          '    for (int i = 0; i < 5; i++) { count += amount / denoms[i]; amount %= denoms[i]; }\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int amount;\n' +
          '    cin >> amount;\n' +
          '    int denoms[] = {500, 100, 50, 10, 1};\n' +
          '    int count = 0;\n' +
          '    for (int d : denoms) { count += amount / d; amount %= d; }\n' +
          '    cout << count << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'This is a greedy strategy: at each step take as much of the largest denomination as possible. Division tells you ' +
      'how many fit; the remainder is what is left for smaller denominations. For standard currency systems the greedy ' +
      'choice is provably optimal, which is why cashiers reach for the biggest note first without thinking.',
    tip: 'Greedy "take the biggest that fits" works for standard currency. Division gives the count, remainder gives the rest.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Money & Bills', topics: ['Conditions', 'Math'],
    title: 'Mobile Bill with Extra Data',
    description:
      'A mobile plan has a fixed monthly rent that includes a certain amount of data. Any data used beyond that is ' +
      'charged at an extra rate per GB.\n\n' +
      'Read the base rent, data used, data included, and the extra rate per GB, then print the total bill.',
    inputFormat: 'Four integers: base rent, data used (GB), data included (GB), extra rate per GB.',
    outputFormat: 'One integer: the total bill.',
    examples: [
      ex('200 6 5 50', '250', 'Used 6 GB, 5 included → 1 extra GB × 50 = 50, plus 200 rent = 250.'),
      ex('200 4 5 50', '200', 'Used less than included, so only the base rent applies.'),
    ],
    hints: [
      'Extra data is used minus included — but never below zero.',
      'The bill is the base rent plus the charge for extra data.',
    ],
    approach:
      'Work out how much data is over the included amount: used minus included, but clamp it to zero if the customer ' +
      'stayed under. Multiply that overage by the extra rate and add the base rent. Forgetting the clamp gives a ' +
      'negative charge, which is wrong.',
    whatYouLearn: ['Clamping a value to a minimum of zero', 'Base-plus-overage billing'],
    solutions: solo(
      'Extra = max(0, used − included); bill = base + extra × rate.',
      {
        python:
          'base, used, included, rate = map(int, input().split())\n' +
          'extra = used - included\n' +
          'if extra < 0:\n' +
          '    extra = 0\n' +
          'print(base + extra * rate)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int base = sc.nextInt(), used = sc.nextInt(), included = sc.nextInt(), rate = sc.nextInt();\n' +
          '        int extra = Math.max(0, used - included);\n' +
          '        System.out.println(base + extra * rate);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int base, used, included, rate;\n' +
          '    scanf("%d %d %d %d", &base, &used, &included, &rate);\n' +
          '    int extra = used - included;\n' +
          '    if (extra < 0) extra = 0;\n' +
          '    printf("%d\\n", base + extra * rate);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <algorithm>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int base, used, included, rate;\n' +
          '    cin >> base >> used >> included >> rate;\n' +
          '    int extra = max(0, used - included);\n' +
          '    cout << base + extra * rate << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The subtle part is the clamp. If a customer uses less than the included data, the "extra" comes out negative — ' +
      'and multiplying that by the rate would wrongly reduce the bill. Guarding with max(0, …) keeps overage at zero ' +
      'or above. Base-plus-metered-overage is a billing pattern you will meet in phones, cloud usage, and utilities.',
    tip: 'When computing an "overage", clamp it to zero — customers under the limit should never get a negative charge.',
  },
  {
    track: T, level: 'BEGINNER', category: 'People & Records', topics: ['Conditions', 'Ranges'],
    title: 'Age Group Classifier',
    description:
      'Classify a person by age into one of four groups:\n\n' +
      '- 0 to 12 → Child\n' +
      '- 13 to 19 → Teen\n' +
      '- 20 to 59 → Adult\n' +
      '- 60 and above → Senior\n\n' +
      'Read an age and print the group name.',
    inputFormat: 'One integer: the age.',
    outputFormat: 'One word: Child, Teen, Adult, or Senior.',
    examples: [
      ex('15', 'Teen', '15 falls in the 13–19 range.'),
      ex('70', 'Senior', '70 is 60 or above.'),
    ],
    hints: [
      'Check the ranges in order from youngest to oldest (or oldest to youngest).',
      'Each range has a clear upper boundary except the last.',
    ],
    approach:
      'This is a set of ranges. Check them in order — for example youngest first — so the first condition that matches ' +
      'gives the right group. Because the ranges do not overlap, an if/else-if chain cleanly assigns exactly one label.',
    whatYouLearn: ['Mapping ranges to labels', 'Non-overlapping if/else-if chains'],
    solutions: solo(
      'Use an ordered if/else-if chain, one branch per age range.',
      {
        python:
          'age = int(input())\n' +
          'if age <= 12:\n' +
          '    print("Child")\n' +
          'elif age <= 19:\n' +
          '    print("Teen")\n' +
          'elif age <= 59:\n' +
          '    print("Adult")\n' +
          'else:\n' +
          '    print("Senior")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int age = new Scanner(System.in).nextInt();\n' +
          '        if (age <= 12) System.out.println("Child");\n' +
          '        else if (age <= 19) System.out.println("Teen");\n' +
          '        else if (age <= 59) System.out.println("Adult");\n' +
          '        else System.out.println("Senior");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int age;\n' +
          '    scanf("%d", &age);\n' +
          '    if (age <= 12) printf("Child\\n");\n' +
          '    else if (age <= 19) printf("Teen\\n");\n' +
          '    else if (age <= 59) printf("Adult\\n");\n' +
          '    else printf("Senior\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int age;\n' +
          '    cin >> age;\n' +
          '    if (age <= 12) cout << "Child" << endl;\n' +
          '    else if (age <= 19) cout << "Teen" << endl;\n' +
          '    else if (age <= 59) cout << "Adult" << endl;\n' +
          '    else cout << "Senior" << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'When ranges are ordered and do not overlap, an if/else-if chain checked in order assigns exactly one label — ' +
      'each branch implicitly assumes the earlier ones failed, so you only need the upper bound of each band. This ' +
      '"ladder of ranges" appears in grading, pricing tiers, and age gating everywhere.',
    tip: 'For ordered ranges, an else-if ladder only needs each band\'s upper limit — earlier checks handle the lower one.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'People & Records', topics: ['Conditions', 'Calendar'],
    title: 'Days in a Month',
    description:
      'Read a month number (1–12) and a year, then print how many days that month has.\n\n' +
      'February has 29 days in a leap year and 28 otherwise. A year is a leap year if it is divisible by 4 but not by ' +
      '100, unless it is also divisible by 400.',
    inputFormat: 'Two integers: month (1–12) and year.',
    outputFormat: 'One integer: the number of days in that month.',
    examples: [
      ex('2 2020', '29', '2020 is a leap year, so February has 29 days.'),
      ex('4 2021', '30', 'April always has 30 days.'),
    ],
    hints: [
      'Most months have a fixed number of days — store them in a list.',
      'Only February needs the leap-year check.',
    ],
    approach:
      'Keep the standard day counts for the twelve months. Look up the given month directly. The one special case is ' +
      'February: apply the leap-year rule (divisible by 4, not by 100 unless also by 400) to decide between 28 and 29.',
    whatYouLearn: ['Table lookup for fixed data', 'The exact leap-year rule'],
    solutions: solo(
      'Look up month length from a table; for February, apply the full leap-year rule.',
      {
        python:
          'month, year = map(int, input().split())\n' +
          'days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]\n' +
          'if month == 2 and (year % 4 == 0 and year % 100 != 0 or year % 400 == 0):\n' +
          '    print(29)\n' +
          'else:\n' +
          '    print(days[month - 1])',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int month = sc.nextInt(), year = sc.nextInt();\n' +
          '        int[] days = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\n' +
          '        boolean leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;\n' +
          '        if (month == 2 && leap) System.out.println(29);\n' +
          '        else System.out.println(days[month - 1]);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int month, year;\n' +
          '    scanf("%d %d", &month, &year);\n' +
          '    int days[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\n' +
          '    int leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;\n' +
          '    if (month == 2 && leap) printf("29\\n");\n' +
          '    else printf("%d\\n", days[month - 1]);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int month, year;\n' +
          '    cin >> month >> year;\n' +
          '    int days[] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\n' +
          '    bool leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;\n' +
          '    if (month == 2 && leap) cout << 29 << endl;\n' +
          '    else cout << days[month - 1] << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Fixed data — the length of each month — is best stored in a lookup table so you index straight to the answer. ' +
      'Only February varies, and only by the leap-year rule, so it gets one special case. Getting the leap rule exactly ' +
      'right (the 100/400 exception) is what separates a correct calendar from a buggy one.',
    tip: 'Store fixed data in a table and index into it. Handle only the genuine exceptions (like February) separately.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Eligibility', topics: ['Conditions', 'Logic'],
    title: 'Voter Eligibility',
    description:
      'A person can vote only if they are at least 18 years old AND a citizen.\n\n' +
      'Read the age and a citizenship flag (1 for citizen, 0 for not) and print "Yes" if they can vote, otherwise "No".',
    inputFormat: 'Two integers: age and citizenship flag (1 or 0).',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('20 1', 'Yes', 'Age 20 and a citizen — both conditions met.'),
      ex('25 0', 'No', 'Old enough, but not a citizen.'),
    ],
    hints: [
      'Both conditions must be true at the same time.',
      'Combine them with AND.',
    ],
    approach:
      'Two conditions must hold together: the age requirement and citizenship. Combine them with a logical AND — the ' +
      'answer is "Yes" only when both are satisfied, and "No" if either fails.',
    whatYouLearn: ['Combining conditions with AND', 'Boolean flags (1/0) as conditions'],
    solutions: solo(
      'Print "Yes" only when age ≥ 18 AND the citizenship flag is 1.',
      {
        python:
          'age, citizen = map(int, input().split())\n' +
          'print("Yes" if age >= 18 and citizen == 1 else "No")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int age = sc.nextInt(), citizen = sc.nextInt();\n' +
          '        System.out.println(age >= 18 && citizen == 1 ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int age, citizen;\n' +
          '    scanf("%d %d", &age, &citizen);\n' +
          '    printf((age >= 18 && citizen == 1) ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int age, citizen;\n' +
          '    cin >> age >> citizen;\n' +
          '    cout << ((age >= 18 && citizen == 1) ? "Yes" : "No") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Eligibility rules usually chain several requirements with AND: every one must hold. Here two conditions — the ' +
      'age threshold and the citizenship flag — are joined so that a single failure produces "No". Recognising "AND ' +
      'means all must be true" is fundamental to encoding any rulebook correctly.',
    tip: 'When a rule says "must be A and B", use AND — a single false condition should sink the whole result.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Eligibility', topics: ['Conditions', 'Logic'],
    title: 'Scholarship Eligibility',
    description:
      'A scholarship is granted only when BOTH of these are true:\n\n' +
      '- marks are 85 or above, AND\n' +
      '- family income is 200000 or below\n\n' +
      'Read the marks and the family income, then print "Approved" or "Rejected".',
    inputFormat: 'Two integers: marks (percentage) and family income.',
    outputFormat: 'Either "Approved" or "Rejected".',
    examples: [
      ex('90 150000', 'Approved', 'High marks and low enough income — both pass.'),
      ex('90 250000', 'Rejected', 'Marks are fine, but the income is too high.'),
    ],
    hints: [
      'Both the marks rule and the income rule must hold.',
      'A high scorer with too much income is still rejected.',
    ],
    approach:
      'Combine the two requirements with AND: the marks must clear the threshold and the income must be within the ' +
      'limit. Only when both are satisfied do you print "Approved"; if either fails, print "Rejected".',
    whatYouLearn: ['Two-sided eligibility checks', 'Why one failing condition rejects the whole application'],
    solutions: solo(
      'Approve only when marks ≥ 85 AND income ≤ 200000.',
      {
        python:
          'marks, income = map(int, input().split())\n' +
          'print("Approved" if marks >= 85 and income <= 200000 else "Rejected")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int marks = sc.nextInt(), income = sc.nextInt();\n' +
          '        System.out.println(marks >= 85 && income <= 200000 ? "Approved" : "Rejected");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int marks, income;\n' +
          '    scanf("%d %d", &marks, &income);\n' +
          '    printf((marks >= 85 && income <= 200000) ? "Approved\\n" : "Rejected\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int marks, income;\n' +
          '    cin >> marks >> income;\n' +
          '    cout << ((marks >= 85 && income <= 200000) ? "Approved" : "Rejected") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Notice the two thresholds point in opposite directions: marks must be high enough (≥), income low enough (≤). ' +
      'Both joined by AND means a strong student with too much income is still rejected — a very common real rule. ' +
      'Reading which way each comparison faces is where careless mistakes creep in.',
    tip: 'Watch the direction of each comparison — "at least" is ≥ while "at most/within" is ≤.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Eligibility', topics: ['Conditions', 'Logic'],
    title: 'Driving License Eligibility',
    description:
      'To get a driving license, an applicant must satisfy ALL of these:\n\n' +
      '- age is 18 or above\n' +
      '- passed the vision test (flag 1)\n' +
      '- scored at least 60 in the written test\n\n' +
      'Read the age, vision flag, and written score, then print "Eligible" or "Not Eligible".',
    inputFormat: 'Three integers: age, vision flag (1 or 0), written test score.',
    outputFormat: 'Either "Eligible" or "Not Eligible".',
    examples: [
      ex('20 1 75', 'Eligible', 'Old enough, passed vision, and scored above 60.'),
      ex('20 1 50', 'Not Eligible', 'The written score of 50 is below 60.'),
    ],
    hints: [
      'Three separate conditions must all be true.',
      'Join them together with AND.',
    ],
    approach:
      'Three requirements must hold simultaneously: the age minimum, the vision pass, and the written-score minimum. ' +
      'Chain all three with AND. If every one is satisfied print "Eligible"; the moment any single check fails, the ' +
      'answer is "Not Eligible".',
    whatYouLearn: ['Combining three conditions with AND', 'Modelling a multi-requirement rule'],
    solutions: solo(
      'Eligible only when age ≥ 18 AND vision flag is 1 AND written score ≥ 60.',
      {
        python:
          'age, vision, written = map(int, input().split())\n' +
          'if age >= 18 and vision == 1 and written >= 60:\n' +
          '    print("Eligible")\n' +
          'else:\n' +
          '    print("Not Eligible")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int age = sc.nextInt(), vision = sc.nextInt(), written = sc.nextInt();\n' +
          '        boolean ok = age >= 18 && vision == 1 && written >= 60;\n' +
          '        System.out.println(ok ? "Eligible" : "Not Eligible");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int age, vision, written;\n' +
          '    scanf("%d %d %d", &age, &vision, &written);\n' +
          '    int ok = age >= 18 && vision == 1 && written >= 60;\n' +
          '    printf(ok ? "Eligible\\n" : "Not Eligible\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int age, vision, written;\n' +
          '    cin >> age >> vision >> written;\n' +
          '    bool ok = age >= 18 && vision == 1 && written >= 60;\n' +
          '    cout << (ok ? "Eligible" : "Not Eligible") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Many real-world approvals are a checklist where everything must pass. Chaining the conditions with AND models ' +
      'that exactly — one failure is enough to disqualify. Storing the combined result in a boolean first also makes ' +
      'the logic readable, which matters as rulebooks grow more complex.',
    tip: 'For a checklist rule, AND every requirement together and store the result in one boolean for clarity.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Eligibility', topics: ['Conditions', 'Ranges'],
    title: 'Job Application Screening',
    description:
      'A company shortlists a candidate only when ALL of these hold:\n\n' +
      '- age is between 21 and 35 (inclusive)\n' +
      '- at least 2 years of experience\n' +
      '- test score of 70 or more\n\n' +
      'Read the age, years of experience, and test score, then print "Shortlisted" or "Rejected".',
    inputFormat: 'Three integers: age, years of experience, test score.',
    outputFormat: 'Either "Shortlisted" or "Rejected".',
    examples: [
      ex('28 3 80', 'Shortlisted', 'Age in range, 3 years experience, score 80 — all pass.'),
      ex('40 5 90', 'Rejected', 'Experience and score are great, but age 40 is outside 21–35.'),
    ],
    hints: [
      'The age condition is a range: it needs both a lower and an upper bound.',
      'All three conditions must be satisfied together.',
    ],
    approach:
      'The age rule is a two-sided range (21 ≤ age ≤ 35), which needs both bounds checked. Combine that with the ' +
      'experience minimum and the score minimum using AND. Only when the full combination is true is the candidate ' +
      'shortlisted.',
    whatYouLearn: ['Two-sided range checks', 'Mixing a range with other AND conditions'],
    solutions: solo(
      'Shortlist only when 21 ≤ age ≤ 35 AND experience ≥ 2 AND score ≥ 70.',
      {
        python:
          'age, exp, score = map(int, input().split())\n' +
          'if 21 <= age <= 35 and exp >= 2 and score >= 70:\n' +
          '    print("Shortlisted")\n' +
          'else:\n' +
          '    print("Rejected")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int age = sc.nextInt(), exp = sc.nextInt(), score = sc.nextInt();\n' +
          '        boolean ok = age >= 21 && age <= 35 && exp >= 2 && score >= 70;\n' +
          '        System.out.println(ok ? "Shortlisted" : "Rejected");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int age, exp, score;\n' +
          '    scanf("%d %d %d", &age, &exp, &score);\n' +
          '    int ok = age >= 21 && age <= 35 && exp >= 2 && score >= 70;\n' +
          '    printf(ok ? "Shortlisted\\n" : "Rejected\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int age, exp, score;\n' +
          '    cin >> age >> exp >> score;\n' +
          '    bool ok = age >= 21 && age <= 35 && exp >= 2 && score >= 70;\n' +
          '    cout << (ok ? "Shortlisted" : "Rejected") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A range condition is really two comparisons — a lower and an upper bound — both of which must hold. Candidates ' +
      'often fail exactly here, being too young or too old. Mixing that two-sided check with the other minimums under ' +
      'a single AND captures the full policy and rejects anyone who misses even one requirement.',
    tip: 'A "between X and Y" rule is two comparisons. Do not forget the second bound.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Handling Records', topics: ['Records', 'Max Tracking'],
    title: 'Class Topper',
    description:
      'Read the records of N students — each with a name and a score — and print the name of the student with the ' +
      'highest score.\n\n' +
      'If several students share the highest score, print the one who appears first in the input.',
    inputFormat: 'Line 1: number of students N. Next N lines: a name (no spaces) and a score.',
    outputFormat: 'One line: the name of the top scorer.',
    examples: [
      ex('3\nAsha 88\nRavi 92\nMeera 92', 'Ravi', 'Ravi and Meera both scored 92, but Ravi appears first.'),
      ex('2\nSam 70\nLee 40', 'Sam', 'Sam has the higher score.'),
    ],
    hints: [
      'Keep track of the best score and the name that goes with it.',
      'Only replace the best when you find a strictly higher score, so ties keep the earlier student.',
    ],
    approach:
      'Read the students one by one, holding the best score and its owner. When a new score is strictly higher than ' +
      'the best so far, update both the score and the name. Using "strictly higher" means the first student to reach ' +
      'the top score is kept when there is a tie.',
    whatYouLearn: ['Tracking a best record (value + label)', 'First-wins tie handling'],
    solutions: solo(
      'Scan records, updating the stored name only when a strictly higher score appears.',
      {
        python:
          'n = int(input())\n' +
          'best_name = ""\n' +
          'best_score = -1\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    name, score = parts[0], int(parts[1])\n' +
          '    if score > best_score:\n' +
          '        best_score = score\n' +
          '        best_name = name\n' +
          'print(best_name)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        String bestName = "";\n' +
          '        int bestScore = -1;\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String name = sc.next();\n' +
          '            int score = sc.nextInt();\n' +
          '            if (score > bestScore) { bestScore = score; bestName = name; }\n' +
          '        }\n' +
          '        System.out.println(bestName);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    char bestName[64] = "", name[64];\n' +
          '    int bestScore = -1, score;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s %d", name, &score);\n' +
          '        if (score > bestScore) { bestScore = score; strcpy(bestName, name); }\n' +
          '    }\n' +
          '    printf("%s\\n", bestName);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    string bestName = "", name;\n' +
          '    int bestScore = -1, score;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> name >> score;\n' +
          '        if (score > bestScore) { bestScore = score; bestName = name; }\n' +
          '    }\n' +
          '    cout << bestName << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Finding a "best record" means tracking two things together — the winning value and the label attached to it. ' +
      'Updating only on a strictly greater score keeps the earliest student on ties, matching the requirement. This ' +
      'pattern (max plus the data that owns it) is how you find top sellers, highest bidders, and leaderboards.',
    tip: 'To find "who has the max", store both the best value and its owner, and update them together.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Handling Records', topics: ['Records', 'Counting'],
    title: 'Count Passed Students',
    description:
      'Read a pass mark and the marks of N students, then print how many students passed (scored at or above the ' +
      'pass mark).',
    inputFormat: 'Line 1: the number of students N and the pass mark. Line 2: N marks.',
    outputFormat: 'One integer: how many students passed.',
    examples: [
      ex('5 40\n35 40 90 20 60', '3', 'Marks 40, 90, and 60 are at or above 40 — three passes.'),
      ex('3 50\n10 20 30', '0', 'Nobody reached 50.'),
    ],
    hints: [
      'Go through each mark once.',
      'Count a student when their mark is at least the pass mark.',
    ],
    approach:
      'Read the pass mark, then scan the marks keeping a counter. Every time a mark meets or exceeds the pass mark, ' +
      'increase the counter. Print the counter at the end. "At or above" means the comparison is ≥, not >.',
    whatYouLearn: ['Counting records that meet a threshold', 'Getting the ≥ vs > boundary right'],
    solutions: solo(
      'Count marks that are greater than or equal to the pass mark.',
      {
        python:
          'first = input().split()\n' +
          'n, pass_mark = int(first[0]), int(first[1])\n' +
          'marks = list(map(int, input().split()))\n' +
          'print(sum(1 for m in marks if m >= pass_mark))',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt(), passMark = sc.nextInt(), count = 0;\n' +
          '        for (int i = 0; i < n; i++) if (sc.nextInt() >= passMark) count++;\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, passMark, count = 0;\n' +
          '    scanf("%d %d", &n, &passMark);\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int m;\n' +
          '        scanf("%d", &m);\n' +
          '        if (m >= passMark) count++;\n' +
          '    }\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, passMark, count = 0;\n' +
          '    cin >> n >> passMark;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int m;\n' +
          '        cin >> m;\n' +
          '        if (m >= passMark) count++;\n' +
          '    }\n' +
          '    cout << count << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Counting records against a threshold is one of the most common report tasks. The only place to slip is the ' +
      'boundary: "passed" here includes exactly the pass mark, so the test is ≥, not >. A student sitting exactly on ' +
      'the line should be counted — reading that detail carefully is the whole exercise.',
    tip: 'Read boundary words precisely: "at least"/"or above" means include the boundary (use ≥).',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Handling Records', topics: ['Records', 'Average'],
    title: 'Above Average Count',
    description:
      'Read the marks of N students and print how many of them scored strictly above the class average.',
    inputFormat: 'Line 1: number of students N. Line 2: N marks.',
    outputFormat: 'One integer: how many marks are strictly above the average.',
    examples: [
      ex('4\n10 20 30 40', '2', 'Average is 25; the marks 30 and 40 are above it.'),
      ex('3\n5 5 5', '0', 'Everyone equals the average, so nobody is strictly above.'),
    ],
    hints: [
      'You need the average first, so make one pass to find the total.',
      'To avoid fractions, compare mark × N against the total instead of using the average directly.',
    ],
    approach:
      'This needs two passes. First add all the marks to get the total (and therefore the average). Then count how ' +
      'many marks are above that average. To dodge fractional averages, compare mark × N with the total — that is the ' +
      'same as comparing mark with total ÷ N but stays in whole numbers.',
    whatYouLearn: ['Two-pass processing (compute, then compare)', 'Avoiding fractions by cross-multiplying'],
    solutions: solo(
      'Sum first; then count marks where mark × N exceeds the total (i.e. above the average).',
      {
        python:
          'n = int(input())\n' +
          'marks = list(map(int, input().split()))\n' +
          'total = sum(marks)\n' +
          'print(sum(1 for m in marks if m * n > total))',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] marks = new int[n];\n' +
          '        long total = 0;\n' +
          '        for (int i = 0; i < n; i++) { marks[i] = sc.nextInt(); total += marks[i]; }\n' +
          '        int count = 0;\n' +
          '        for (int m : marks) if ((long) m * n > total) count++;\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int marks[100000];\n' +
          '    long total = 0;\n' +
          '    for (int i = 0; i < n; i++) { scanf("%d", &marks[i]); total += marks[i]; }\n' +
          '    int count = 0;\n' +
          '    for (int i = 0; i < n; i++) if ((long) marks[i] * n > total) count++;\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <vector>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    vector<int> marks(n);\n' +
          '    long total = 0;\n' +
          '    for (auto &m : marks) { cin >> m; total += m; }\n' +
          '    int count = 0;\n' +
          '    for (int m : marks) if ((long) m * n > total) count++;\n' +
          '    cout << count << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'You cannot compare against the average until you have seen every mark, so this needs two passes: total first, ' +
      'then count. Comparing mark × N to the total is a neat trick that keeps everything in integers and sidesteps ' +
      'rounding issues from a fractional average. Multi-pass "compute a summary, then use it" logic is extremely common in reports.',
    tip: 'Cannot decide an item until you know a global value (like the average)? Do two passes: compute, then compare.',
  },
]

export default questions
