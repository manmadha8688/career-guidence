// Track 06 — Prove It  (S-rank, the only track allowed to use red accent)
// Real-world mini-systems, not algorithm tricks. Each problem is a small command-driven
// simulation: read N commands, keep state, and respond correctly to every one — including
// the edge cases. There is no "brute vs optimal"; the grade is complete, correct logic.
// Student/product/account IDs are bounded 1–100 so plain arrays work in every language.
import { solo, ex } from './_helpers.mjs'

const T = 'PROVE_IT'

const questions = [
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Conditions'],
    title: 'Library System',
    description:
      'Build the logic for a small library. Students (IDs 1–100) borrow and return books, and late returns build ' +
      'up a fine.\n\n' +
      'Rules:\n' +
      '- A book kept 7 days or less has no fine. Beyond that, the fine is 5 rupees for each extra day.\n' +
      '- A student can hold only one book at a time.\n' +
      '- A student cannot borrow while their total unpaid fine is above 50.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  BORROW s      — student s tries to borrow a book\n' +
      '  RETURN s d    — student s returns their book after d days\n' +
      '  FINE s        — report student s\'s total fine',
    outputFormat:
      'One line per command:\n' +
      '  BORROW → "OK" or "DENIED"\n' +
      '  RETURN → "FINE x" (x = fine added by this return)\n' +
      '  FINE   → the student\'s total fine',
    examples: [
      ex('4\nBORROW 1\nRETURN 1 20\nBORROW 1\nFINE 1', 'OK\nFINE 65\nDENIED\n65',
        '20 days → (20−7)×5 = 65 fine. Fine 65 > 50, so the next BORROW is DENIED.'),
      ex('3\nBORROW 2\nRETURN 2 5\nFINE 2', 'OK\nFINE 0\n0',
        '5 days is within the free week, so no fine is added.'),
    ],
    hints: [
      'Keep two facts per student: their total fine, and whether they currently hold a book.',
      'Check the borrow rules (already holding? fine too high?) before allowing a borrow.',
    ],
    approach:
      'This is about holding state, not clever algorithms. Track each student\'s fine and whether they hold a book. ' +
      'For BORROW, deny if they already hold one or their fine exceeds 50, otherwise mark them holding. For RETURN, ' +
      'free the book and add the late fine (only when days exceed 7). For FINE, just report. Handle every command in order.',
    whatYouLearn: ['Holding per-entity state across commands', 'Enforcing business rules in the right order'],
    solutions: solo(
      'Keep fine[] and holding[] per student; apply each command\'s rules and print its result.',
      {
        python:
          'n = int(input())\n' +
          'fine = {}\n' +
          'holding = {}\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    cmd = parts[0]\n' +
          '    if cmd == "BORROW":\n' +
          '        s = int(parts[1])\n' +
          '        if holding.get(s, False) or fine.get(s, 0) > 50:\n' +
          '            out.append("DENIED")\n' +
          '        else:\n' +
          '            holding[s] = True\n' +
          '            out.append("OK")\n' +
          '    elif cmd == "RETURN":\n' +
          '        s, d = int(parts[1]), int(parts[2])\n' +
          '        holding[s] = False\n' +
          '        f = (d - 7) * 5 if d > 7 else 0\n' +
          '        fine[s] = fine.get(s, 0) + f\n' +
          '        out.append("FINE " + str(f))\n' +
          '    else:  # FINE\n' +
          '        s = int(parts[1])\n' +
          '        out.append(str(fine.get(s, 0)))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] fine = new int[101];\n' +
          '        boolean[] holding = new boolean[101];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            if (cmd.equals("BORROW")) {\n' +
          '                int s = sc.nextInt();\n' +
          '                if (holding[s] || fine[s] > 50) sb.append("DENIED\\n");\n' +
          '                else { holding[s] = true; sb.append("OK\\n"); }\n' +
          '            } else if (cmd.equals("RETURN")) {\n' +
          '                int s = sc.nextInt(), d = sc.nextInt();\n' +
          '                holding[s] = false;\n' +
          '                int f = d > 7 ? (d - 7) * 5 : 0;\n' +
          '                fine[s] += f;\n' +
          '                sb.append("FINE ").append(f).append("\\n");\n' +
          '            } else {\n' +
          '                int s = sc.nextInt();\n' +
          '                sb.append(fine[s]).append("\\n");\n' +
          '            }\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int fine[101] = {0}, holding[101] = {0};\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", cmd);\n' +
          '        if (strcmp(cmd, "BORROW") == 0) {\n' +
          '            int s;\n' +
          '            scanf("%d", &s);\n' +
          '            if (holding[s] || fine[s] > 50) printf("DENIED\\n");\n' +
          '            else { holding[s] = 1; printf("OK\\n"); }\n' +
          '        } else if (strcmp(cmd, "RETURN") == 0) {\n' +
          '            int s, d;\n' +
          '            scanf("%d %d", &s, &d);\n' +
          '            holding[s] = 0;\n' +
          '            int f = d > 7 ? (d - 7) * 5 : 0;\n' +
          '            fine[s] += f;\n' +
          '            printf("FINE %d\\n", f);\n' +
          '        } else {\n' +
          '            int s;\n' +
          '            scanf("%d", &s);\n' +
          '            printf("%d\\n", fine[s]);\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int fine[101] = {0};\n' +
          '    bool holding[101] = {false};\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> cmd;\n' +
          '        if (cmd == "BORROW") {\n' +
          '            int s; cin >> s;\n' +
          '            if (holding[s] || fine[s] > 50) cout << "DENIED\\n";\n' +
          '            else { holding[s] = true; cout << "OK\\n"; }\n' +
          '        } else if (cmd == "RETURN") {\n' +
          '            int s, d; cin >> s >> d;\n' +
          '            holding[s] = false;\n' +
          '            int f = d > 7 ? (d - 7) * 5 : 0;\n' +
          '            fine[s] += f;\n' +
          '            cout << "FINE " << f << "\\n";\n' +
          '        } else {\n' +
          '            int s; cin >> s;\n' +
          '            cout << fine[s] << "\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
      'O(n)', 'O(1)',
    ),
    explanation:
      'A real system is just state plus rules applied in the right order. The two arrays remember everything that ' +
      'matters — each student\'s fine and whether they hold a book. Every command reads or updates that state under ' +
      'its own rules. The tricky parts are the guards: deny a borrow when already holding or over the fine limit, and only charge a fine past day 7.',
    tip: 'For "build a system" problems, first list your state, then write one clean block per command. Do not mix them.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Conditions'],
    title: 'Bank Ledger',
    description:
      'Build the core logic of a simple bank. Accounts (IDs 1–100) start at balance 0.\n\n' +
      'Rules:\n' +
      '- A withdrawal or transfer is only allowed if the source account has enough balance.\n' +
      '- A transfer moves money from one account to another in a single step.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  DEPOSIT a amt       — add amt to account a\n' +
      '  WITHDRAW a amt      — take amt from account a\n' +
      '  TRANSFER a b amt    — move amt from a to b\n' +
      '  BALANCE a           — report account a\'s balance',
    outputFormat:
      'One line per command:\n' +
      '  DEPOSIT → "OK"\n' +
      '  WITHDRAW / TRANSFER → "OK" or "INSUFFICIENT"\n' +
      '  BALANCE → the account\'s balance',
    examples: [
      ex('5\nDEPOSIT 1 500\nWITHDRAW 1 200\nTRANSFER 1 2 400\nBALANCE 1\nBALANCE 2',
        'OK\nOK\nINSUFFICIENT\n300\n0',
        'After depositing 500 and withdrawing 200, account 1 has 300 — not enough to transfer 400, so it fails.'),
      ex('3\nDEPOSIT 5 100\nTRANSFER 5 6 60\nBALANCE 6', 'OK\nOK\n60',
        'Account 5 has enough, so 60 moves to account 6.'),
    ],
    hints: [
      'One balance per account is all the state you need.',
      'Always check "enough balance?" before subtracting, for both withdraw and transfer.',
    ],
    approach:
      'Keep a balance for each account. Deposits always succeed. Withdrawals and transfers must first check the ' +
      'source has enough money — only then move it. A transfer is just a checked withdrawal from one account paired ' +
      'with a deposit into another. Report balances on demand.',
    whatYouLearn: ['Guarding an operation with a balance check', 'Composing transfer from withdraw + deposit'],
    solutions: solo(
      'Track a balance per account; verify funds before withdraw/transfer, then apply the change.',
      {
        python:
          'n = int(input())\n' +
          'bal = {}\n' +
          'def g(x):\n' +
          '    return bal.get(x, 0)\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    p = input().split()\n' +
          '    c = p[0]\n' +
          '    if c == "DEPOSIT":\n' +
          '        a, amt = int(p[1]), int(p[2])\n' +
          '        bal[a] = g(a) + amt\n' +
          '        out.append("OK")\n' +
          '    elif c == "WITHDRAW":\n' +
          '        a, amt = int(p[1]), int(p[2])\n' +
          '        if g(a) >= amt:\n' +
          '            bal[a] = g(a) - amt\n' +
          '            out.append("OK")\n' +
          '        else:\n' +
          '            out.append("INSUFFICIENT")\n' +
          '    elif c == "TRANSFER":\n' +
          '        a, b, amt = int(p[1]), int(p[2]), int(p[3])\n' +
          '        if g(a) >= amt:\n' +
          '            bal[a] = g(a) - amt\n' +
          '            bal[b] = g(b) + amt\n' +
          '            out.append("OK")\n' +
          '        else:\n' +
          '            out.append("INSUFFICIENT")\n' +
          '    else:  # BALANCE\n' +
          '        a = int(p[1])\n' +
          '        out.append(str(g(a)))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        long[] bal = new long[101];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String c = sc.next();\n' +
          '            if (c.equals("DEPOSIT")) {\n' +
          '                int a = sc.nextInt(); long amt = sc.nextLong();\n' +
          '                bal[a] += amt; sb.append("OK\\n");\n' +
          '            } else if (c.equals("WITHDRAW")) {\n' +
          '                int a = sc.nextInt(); long amt = sc.nextLong();\n' +
          '                if (bal[a] >= amt) { bal[a] -= amt; sb.append("OK\\n"); }\n' +
          '                else sb.append("INSUFFICIENT\\n");\n' +
          '            } else if (c.equals("TRANSFER")) {\n' +
          '                int a = sc.nextInt(), b = sc.nextInt(); long amt = sc.nextLong();\n' +
          '                if (bal[a] >= amt) { bal[a] -= amt; bal[b] += amt; sb.append("OK\\n"); }\n' +
          '                else sb.append("INSUFFICIENT\\n");\n' +
          '            } else {\n' +
          '                int a = sc.nextInt();\n' +
          '                sb.append(bal[a]).append("\\n");\n' +
          '            }\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    long bal[101] = {0};\n' +
          '    char c[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", c);\n' +
          '        if (strcmp(c, "DEPOSIT") == 0) {\n' +
          '            int a; long amt; scanf("%d %ld", &a, &amt);\n' +
          '            bal[a] += amt; printf("OK\\n");\n' +
          '        } else if (strcmp(c, "WITHDRAW") == 0) {\n' +
          '            int a; long amt; scanf("%d %ld", &a, &amt);\n' +
          '            if (bal[a] >= amt) { bal[a] -= amt; printf("OK\\n"); }\n' +
          '            else printf("INSUFFICIENT\\n");\n' +
          '        } else if (strcmp(c, "TRANSFER") == 0) {\n' +
          '            int a, b; long amt; scanf("%d %d %ld", &a, &b, &amt);\n' +
          '            if (bal[a] >= amt) { bal[a] -= amt; bal[b] += amt; printf("OK\\n"); }\n' +
          '            else printf("INSUFFICIENT\\n");\n' +
          '        } else {\n' +
          '            int a; scanf("%d", &a);\n' +
          '            printf("%ld\\n", bal[a]);\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    long bal[101] = {0};\n' +
          '    string c;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> c;\n' +
          '        if (c == "DEPOSIT") {\n' +
          '            int a; long amt; cin >> a >> amt;\n' +
          '            bal[a] += amt; cout << "OK\\n";\n' +
          '        } else if (c == "WITHDRAW") {\n' +
          '            int a; long amt; cin >> a >> amt;\n' +
          '            if (bal[a] >= amt) { bal[a] -= amt; cout << "OK\\n"; }\n' +
          '            else cout << "INSUFFICIENT\\n";\n' +
          '        } else if (c == "TRANSFER") {\n' +
          '            int a, b; long amt; cin >> a >> b >> amt;\n' +
          '            if (bal[a] >= amt) { bal[a] -= amt; bal[b] += amt; cout << "OK\\n"; }\n' +
          '            else cout << "INSUFFICIENT\\n";\n' +
          '        } else {\n' +
          '            int a; cin >> a;\n' +
          '            cout << bal[a] << "\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
      'O(n)', 'O(1)',
    ),
    explanation:
      'The whole bank is one array of balances plus a rule that money can never go negative. Deposits are ' +
      'unconditional; withdrawals and transfers share the same guard — check funds first, then move. Modelling a ' +
      'transfer as a checked debit plus a credit keeps the two accounts consistent and avoids ever creating money out of nothing.',
    tip: 'Any operation that can fail needs its check BEFORE it changes state. Validate, then mutate — never the reverse.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Sets'],
    title: 'Parking Lot',
    description:
      'Build the logic for a parking lot with a fixed number of slots. Cars are identified by an ID (1–100).\n\n' +
      'Rules:\n' +
      '- A car can enter only if the lot is not full.\n' +
      '- A car already inside cannot take a second slot.\n' +
      '- A car can only leave if it is actually parked.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: capacity C. Line 2: number of commands N. Next N lines, one of:\n' +
      '  IN id     — car id tries to enter\n' +
      '  OUT id    — car id tries to leave\n' +
      '  COUNT     — report how many cars are currently parked',
    outputFormat:
      'One line per command:\n' +
      '  IN → "PARKED" or "FULL"\n' +
      '  OUT → "OUT" or "NOT FOUND"\n' +
      '  COUNT → the number currently parked',
    examples: [
      ex('2\n5\nIN 10\nIN 20\nIN 30\nOUT 10\nCOUNT', 'PARKED\nPARKED\nFULL\nOUT\n1',
        'Capacity 2: the third car finds the lot FULL. After one leaves, 1 car remains.'),
      ex('1\n3\nIN 7\nOUT 9\nOUT 7', 'PARKED\nNOT FOUND\nOUT',
        'Car 9 was never parked, so OUT 9 is NOT FOUND.'),
    ],
    hints: [
      'Track which cars are parked and a running count of occupied slots.',
      'For IN, an already-parked car should not be treated as full — handle that case first.',
    ],
    approach:
      'Keep a flag per car (parked or not) and a count of occupied slots. For IN: if the car is already parked, it ' +
      'stays parked; else if the lot is full, refuse; otherwise park it and bump the count. For OUT: only release a ' +
      'car that is actually parked. COUNT just reports the running total.',
    whatYouLearn: ['Membership + capacity together', 'Ordering edge-case checks correctly'],
    solutions: solo(
      'Keep a parked[] flag and a count; apply capacity and membership rules per command.',
      {
        python:
          'cap = int(input())\n' +
          'n = int(input())\n' +
          'parked = set()\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    p = input().split()\n' +
          '    c = p[0]\n' +
          '    if c == "IN":\n' +
          '        cid = int(p[1])\n' +
          '        if cid in parked:\n' +
          '            out.append("PARKED")\n' +
          '        elif len(parked) >= cap:\n' +
          '            out.append("FULL")\n' +
          '        else:\n' +
          '            parked.add(cid)\n' +
          '            out.append("PARKED")\n' +
          '    elif c == "OUT":\n' +
          '        cid = int(p[1])\n' +
          '        if cid in parked:\n' +
          '            parked.remove(cid)\n' +
          '            out.append("OUT")\n' +
          '        else:\n' +
          '            out.append("NOT FOUND")\n' +
          '    else:  # COUNT\n' +
          '        out.append(str(len(parked)))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int cap = sc.nextInt(), n = sc.nextInt();\n' +
          '        boolean[] parked = new boolean[101];\n' +
          '        int count = 0;\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String c = sc.next();\n' +
          '            if (c.equals("IN")) {\n' +
          '                int id = sc.nextInt();\n' +
          '                if (parked[id]) sb.append("PARKED\\n");\n' +
          '                else if (count >= cap) sb.append("FULL\\n");\n' +
          '                else { parked[id] = true; count++; sb.append("PARKED\\n"); }\n' +
          '            } else if (c.equals("OUT")) {\n' +
          '                int id = sc.nextInt();\n' +
          '                if (parked[id]) { parked[id] = false; count--; sb.append("OUT\\n"); }\n' +
          '                else sb.append("NOT FOUND\\n");\n' +
          '            } else {\n' +
          '                sb.append(count).append("\\n");\n' +
          '            }\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int cap, n;\n' +
          '    scanf("%d %d", &cap, &n);\n' +
          '    int parked[101] = {0}, count = 0;\n' +
          '    char c[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", c);\n' +
          '        if (strcmp(c, "IN") == 0) {\n' +
          '            int id; scanf("%d", &id);\n' +
          '            if (parked[id]) printf("PARKED\\n");\n' +
          '            else if (count >= cap) printf("FULL\\n");\n' +
          '            else { parked[id] = 1; count++; printf("PARKED\\n"); }\n' +
          '        } else if (strcmp(c, "OUT") == 0) {\n' +
          '            int id; scanf("%d", &id);\n' +
          '            if (parked[id]) { parked[id] = 0; count--; printf("OUT\\n"); }\n' +
          '            else printf("NOT FOUND\\n");\n' +
          '        } else {\n' +
          '            printf("%d\\n", count);\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int cap, n;\n' +
          '    cin >> cap >> n;\n' +
          '    bool parked[101] = {false};\n' +
          '    int count = 0;\n' +
          '    string c;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> c;\n' +
          '        if (c == "IN") {\n' +
          '            int id; cin >> id;\n' +
          '            if (parked[id]) cout << "PARKED\\n";\n' +
          '            else if (count >= cap) cout << "FULL\\n";\n' +
          '            else { parked[id] = true; count++; cout << "PARKED\\n"; }\n' +
          '        } else if (c == "OUT") {\n' +
          '            int id; cin >> id;\n' +
          '            if (parked[id]) { parked[id] = false; count--; cout << "OUT\\n"; }\n' +
          '            else cout << "NOT FOUND\\n";\n' +
          '        } else {\n' +
          '            cout << count << "\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
      'O(n)', 'O(1)',
    ),
    explanation:
      'The lot needs two pieces of state: who is inside, and how many slots are taken. The order of checks in IN is ' +
      'what makes it correct — an already-parked car must be handled before the full check, or you would wrongly ' +
      'report FULL for a car that is already inside. OUT only succeeds for cars genuinely present, which is how real gates behave.',
    tip: 'When several rules can apply, order them so the most specific case is checked first.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Conditions'],
    title: 'Inventory Manager',
    description:
      'Build a small shop inventory. Products are identified by an ID (1–100) and start with 0 stock.\n\n' +
      'Rules:\n' +
      '- A sale succeeds only if there is enough stock; otherwise nothing changes.\n' +
      '- A product is "low" when its stock is between 1 and 4 (needs reordering).\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  ADD p qty     — add qty units to product p\n' +
      '  SELL p qty    — sell qty units of product p\n' +
      '  STOCK p       — report product p\'s current stock\n' +
      '  LOW           — report how many products are low (stock 1–4)',
    outputFormat:
      'One line per command:\n' +
      '  ADD → "OK"\n' +
      '  SELL → "SOLD" or "NO STOCK"\n' +
      '  STOCK → the current stock\n' +
      '  LOW → count of products with stock between 1 and 4',
    examples: [
      ex('6\nADD 1 10\nSELL 1 4\nSTOCK 1\nSELL 1 10\nADD 2 3\nLOW', 'OK\nSOLD\n6\nNO STOCK\nOK\n1',
        'Product 1 ends at 6 (not low). Product 2 has 3 (low). So LOW reports 1.'),
      ex('3\nADD 5 2\nSELL 5 2\nLOW', 'OK\nSOLD\n0',
        'Product 5 drops to 0 after the sale, which is not "low" (low is 1–4).'),
    ],
    hints: [
      'One stock value per product is the whole state.',
      'For LOW, scan all product IDs and count those with stock between 1 and 4.',
    ],
    approach:
      'Keep a stock count per product. ADD increases it. SELL must check there is enough before subtracting — a ' +
      'failed sale changes nothing. STOCK reports a single product. LOW scans every product and counts the ones ' +
      'sitting in the 1–4 reorder range (a product at 0 is out, not low).',
    whatYouLearn: ['Guarding a decrement with a stock check', 'Scanning state to answer an aggregate query'],
    solutions: solo(
      'Track stock per product; check before selling, and scan all products to answer LOW.',
      {
        python:
          'n = int(input())\n' +
          'stock = {}\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    p = input().split()\n' +
          '    c = p[0]\n' +
          '    if c == "ADD":\n' +
          '        pid, q = int(p[1]), int(p[2])\n' +
          '        stock[pid] = stock.get(pid, 0) + q\n' +
          '        out.append("OK")\n' +
          '    elif c == "SELL":\n' +
          '        pid, q = int(p[1]), int(p[2])\n' +
          '        if stock.get(pid, 0) >= q:\n' +
          '            stock[pid] -= q\n' +
          '            out.append("SOLD")\n' +
          '        else:\n' +
          '            out.append("NO STOCK")\n' +
          '    elif c == "STOCK":\n' +
          '        pid = int(p[1])\n' +
          '        out.append(str(stock.get(pid, 0)))\n' +
          '    else:  # LOW\n' +
          '        low = sum(1 for v in stock.values() if 1 <= v <= 4)\n' +
          '        out.append(str(low))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] stock = new int[101];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String c = sc.next();\n' +
          '            if (c.equals("ADD")) {\n' +
          '                int pid = sc.nextInt(), q = sc.nextInt();\n' +
          '                stock[pid] += q; sb.append("OK\\n");\n' +
          '            } else if (c.equals("SELL")) {\n' +
          '                int pid = sc.nextInt(), q = sc.nextInt();\n' +
          '                if (stock[pid] >= q) { stock[pid] -= q; sb.append("SOLD\\n"); }\n' +
          '                else sb.append("NO STOCK\\n");\n' +
          '            } else if (c.equals("STOCK")) {\n' +
          '                int pid = sc.nextInt();\n' +
          '                sb.append(stock[pid]).append("\\n");\n' +
          '            } else {\n' +
          '                int low = 0;\n' +
          '                for (int p = 1; p <= 100; p++) if (stock[p] >= 1 && stock[p] <= 4) low++;\n' +
          '                sb.append(low).append("\\n");\n' +
          '            }\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int stock[101] = {0};\n' +
          '    char c[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", c);\n' +
          '        if (strcmp(c, "ADD") == 0) {\n' +
          '            int pid, q; scanf("%d %d", &pid, &q);\n' +
          '            stock[pid] += q; printf("OK\\n");\n' +
          '        } else if (strcmp(c, "SELL") == 0) {\n' +
          '            int pid, q; scanf("%d %d", &pid, &q);\n' +
          '            if (stock[pid] >= q) { stock[pid] -= q; printf("SOLD\\n"); }\n' +
          '            else printf("NO STOCK\\n");\n' +
          '        } else if (strcmp(c, "STOCK") == 0) {\n' +
          '            int pid; scanf("%d", &pid);\n' +
          '            printf("%d\\n", stock[pid]);\n' +
          '        } else {\n' +
          '            int low = 0;\n' +
          '            for (int p = 1; p <= 100; p++) if (stock[p] >= 1 && stock[p] <= 4) low++;\n' +
          '            printf("%d\\n", low);\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int stock[101] = {0};\n' +
          '    string c;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> c;\n' +
          '        if (c == "ADD") {\n' +
          '            int pid, q; cin >> pid >> q;\n' +
          '            stock[pid] += q; cout << "OK\\n";\n' +
          '        } else if (c == "SELL") {\n' +
          '            int pid, q; cin >> pid >> q;\n' +
          '            if (stock[pid] >= q) { stock[pid] -= q; cout << "SOLD\\n"; }\n' +
          '            else cout << "NO STOCK\\n";\n' +
          '        } else if (c == "STOCK") {\n' +
          '            int pid; cin >> pid;\n' +
          '            cout << stock[pid] << "\\n";\n' +
          '        } else {\n' +
          '            int low = 0;\n' +
          '            for (int p = 1; p <= 100; p++) if (stock[p] >= 1 && stock[p] <= 4) low++;\n' +
          '            cout << low << "\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
      'O(n)', 'O(1)',
    ),
    explanation:
      'Inventory is one number per product plus a rule that stock never goes negative. SELL shares the same "check ' +
      'first" discipline as a bank withdrawal. LOW is a different kind of question — an aggregate — so it scans the ' +
      'whole range and counts. Defining "low" precisely as 1–4 (excluding 0) is the sort of detail real systems live or die on.',
    tip: 'Separate the two kinds of commands: those that change one item, and those that summarise everything.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Conditions'],
    title: 'Hostel Fee Manager',
    description:
      'Build the fee logic for a hostel. Students are identified by an ID (1–100).\n\n' +
      'Rules:\n' +
      '- A monthly fee paid on or before day 5 has no fine. Paid on day 6–10 → 200 fine. After day 10 → 500 fine.\n' +
      '- A student with any unpaid dues cannot register for the next term.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  PAY s day     — student s pays their fee on the given day of the month\n' +
      '  DUE s amt     — add amt of unpaid dues to student s\n' +
      '  CLEAR s       — clear student s\'s dues\n' +
      '  REGISTER s    — check if student s may register',
    outputFormat:
      'One line per command:\n' +
      '  PAY → "FINE x" (the fine charged for that payment)\n' +
      '  DUE / CLEAR → "OK"\n' +
      '  REGISTER → "ALLOWED" or "BLOCKED"',
    examples: [
      ex('6\nPAY 1 3\nPAY 1 12\nDUE 1 1000\nREGISTER 1\nCLEAR 1\nREGISTER 1',
        'FINE 0\nFINE 500\nOK\nBLOCKED\nOK\nALLOWED',
        'Day 3 → no fine. Day 12 → 500 fine. With dues, registration is BLOCKED until they are cleared.'),
      ex('2\nPAY 4 8\nREGISTER 4', 'FINE 200\nALLOWED',
        'Day 8 falls in the 6–10 band → 200 fine. No dues, so registration is ALLOWED.'),
    ],
    hints: [
      'The fine depends only on the day: 3 bands, checked in order.',
      'Registration looks only at whether the student currently owes anything.',
    ],
    approach:
      'Track the unpaid dues per student. PAY computes the fine purely from the day using the three bands and reports ' +
      'it. DUE and CLEAR adjust the dues. REGISTER allows a student only when their dues are zero. Each command is ' +
      'independent — decide its rule and print.',
    whatYouLearn: ['Mapping a value to banded outcomes', 'Gating an action on accumulated state'],
    solutions: solo(
      'Keep dues per student; compute the PAY fine from day bands and gate REGISTER on dues being zero.',
      {
        python:
          'n = int(input())\n' +
          'due = {}\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    p = input().split()\n' +
          '    c = p[0]\n' +
          '    if c == "PAY":\n' +
          '        s, day = int(p[1]), int(p[2])\n' +
          '        f = 0 if day <= 5 else (200 if day <= 10 else 500)\n' +
          '        out.append("FINE " + str(f))\n' +
          '    elif c == "DUE":\n' +
          '        s, amt = int(p[1]), int(p[2])\n' +
          '        due[s] = due.get(s, 0) + amt\n' +
          '        out.append("OK")\n' +
          '    elif c == "CLEAR":\n' +
          '        s = int(p[1])\n' +
          '        due[s] = 0\n' +
          '        out.append("OK")\n' +
          '    else:  # REGISTER\n' +
          '        s = int(p[1])\n' +
          '        out.append("ALLOWED" if due.get(s, 0) == 0 else "BLOCKED")\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        long[] due = new long[101];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String c = sc.next();\n' +
          '            if (c.equals("PAY")) {\n' +
          '                int s = sc.nextInt(), day = sc.nextInt();\n' +
          '                int f = day <= 5 ? 0 : (day <= 10 ? 200 : 500);\n' +
          '                sb.append("FINE ").append(f).append("\\n");\n' +
          '            } else if (c.equals("DUE")) {\n' +
          '                int s = sc.nextInt(); long amt = sc.nextLong();\n' +
          '                due[s] += amt; sb.append("OK\\n");\n' +
          '            } else if (c.equals("CLEAR")) {\n' +
          '                int s = sc.nextInt();\n' +
          '                due[s] = 0; sb.append("OK\\n");\n' +
          '            } else {\n' +
          '                int s = sc.nextInt();\n' +
          '                sb.append(due[s] == 0 ? "ALLOWED" : "BLOCKED").append("\\n");\n' +
          '            }\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    long due[101] = {0};\n' +
          '    char c[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", c);\n' +
          '        if (strcmp(c, "PAY") == 0) {\n' +
          '            int s, day; scanf("%d %d", &s, &day);\n' +
          '            int f = day <= 5 ? 0 : (day <= 10 ? 200 : 500);\n' +
          '            printf("FINE %d\\n", f);\n' +
          '        } else if (strcmp(c, "DUE") == 0) {\n' +
          '            int s; long amt; scanf("%d %ld", &s, &amt);\n' +
          '            due[s] += amt; printf("OK\\n");\n' +
          '        } else if (strcmp(c, "CLEAR") == 0) {\n' +
          '            int s; scanf("%d", &s);\n' +
          '            due[s] = 0; printf("OK\\n");\n' +
          '        } else {\n' +
          '            int s; scanf("%d", &s);\n' +
          '            printf(due[s] == 0 ? "ALLOWED\\n" : "BLOCKED\\n");\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    long due[101] = {0};\n' +
          '    string c;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> c;\n' +
          '        if (c == "PAY") {\n' +
          '            int s, day; cin >> s >> day;\n' +
          '            int f = day <= 5 ? 0 : (day <= 10 ? 200 : 500);\n' +
          '            cout << "FINE " << f << "\\n";\n' +
          '        } else if (c == "DUE") {\n' +
          '            int s; long amt; cin >> s >> amt;\n' +
          '            due[s] += amt; cout << "OK\\n";\n' +
          '        } else if (c == "CLEAR") {\n' +
          '            int s; cin >> s;\n' +
          '            due[s] = 0; cout << "OK\\n";\n' +
          '        } else {\n' +
          '            int s; cin >> s;\n' +
          '            cout << (due[s] == 0 ? "ALLOWED" : "BLOCKED") << "\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
      'O(n)', 'O(1)',
    ),
    explanation:
      'Two independent rules live side by side here. The fine is a pure function of the payment day — three bands ' +
      'checked top-to-bottom. Registration is a gate on accumulated dues: owe anything and you are blocked. Keeping ' +
      'the dues as state lets DUE, CLEAR, and REGISTER interact correctly across the sequence of commands, which is exactly how real fee systems behave.',
    tip: 'Real systems mix "compute from input" rules with "depends on history" rules. Know which is which before you code.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Counting'],
    title: 'Voting Machine',
    description:
      'Build the logic for a simple voting machine. Candidates have IDs 1–100.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  VOTE c    — cast one vote for candidate c\n' +
      '  COUNT c   — report how many votes candidate c has\n' +
      '  LEAD      — report the candidate currently leading (on a tie, the smallest ID; 0 if no votes yet)',
    outputFormat:
      'One line per command:\n' +
      '  VOTE  → "OK"\n' +
      '  COUNT → the vote count\n' +
      '  LEAD  → the leading candidate\'s ID (or 0)',
    examples: [
      ex('5\nVOTE 1\nVOTE 2\nVOTE 1\nLEAD\nCOUNT 2', 'OK\nOK\nOK\n1\n1',
        'Candidate 1 has 2 votes, candidate 2 has 1, so 1 leads. Candidate 2\'s count is 1.'),
      ex('2\nLEAD\nVOTE 3', '0\nOK', 'With no votes yet, LEAD reports 0.'),
    ],
    hints: [
      'Keep a vote count for each candidate ID.',
      'For LEAD, scan the IDs in increasing order so ties naturally favour the smallest ID.',
    ],
    approach:
      'Maintain an array of vote counts indexed by candidate ID. VOTE bumps a count, COUNT reports one. For LEAD, walk ' +
      'the IDs from 1 upward, tracking the highest count seen; because you go in order and only replace on a strictly ' +
      'higher count, a tie keeps the smaller ID. If the best count is 0, print 0.',
    whatYouLearn: ['Per-key counters', 'Order-based tie-breaking on a scan'],
    solutions: solo(
      'Keep votes[] per candidate; for LEAD scan IDs ascending keeping the strictly-highest count.',
      {
        python:
          'n = int(input())\n' +
          'votes = [0] * 101\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    if parts[0] == "VOTE":\n' +
          '        votes[int(parts[1])] += 1\n' +
          '        out.append("OK")\n' +
          '    elif parts[0] == "COUNT":\n' +
          '        out.append(str(votes[int(parts[1])]))\n' +
          '    else:\n' +
          '        best_id, best = 0, 0\n' +
          '        for c in range(1, 101):\n' +
          '            if votes[c] > best:\n' +
          '                best = votes[c]\n' +
          '                best_id = c\n' +
          '        out.append(str(best_id))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] votes = new int[101];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            if (cmd.equals("VOTE")) { votes[sc.nextInt()]++; sb.append("OK\\n"); }\n' +
          '            else if (cmd.equals("COUNT")) { sb.append(votes[sc.nextInt()]).append("\\n"); }\n' +
          '            else {\n' +
          '                int bestId = 0, best = 0;\n' +
          '                for (int c = 1; c <= 100; c++) if (votes[c] > best) { best = votes[c]; bestId = c; }\n' +
          '                sb.append(bestId).append("\\n");\n' +
          '            }\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int votes[101] = {0};\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", cmd);\n' +
          '        if (strcmp(cmd, "VOTE") == 0) { int c; scanf("%d", &c); votes[c]++; printf("OK\\n"); }\n' +
          '        else if (strcmp(cmd, "COUNT") == 0) { int c; scanf("%d", &c); printf("%d\\n", votes[c]); }\n' +
          '        else {\n' +
          '            int bestId = 0, best = 0;\n' +
          '            for (int c = 1; c <= 100; c++) if (votes[c] > best) { best = votes[c]; bestId = c; }\n' +
          '            printf("%d\\n", bestId);\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int votes[101] = {0};\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> cmd;\n' +
          '        if (cmd == "VOTE") { int c; cin >> c; votes[c]++; cout << "OK\\n"; }\n' +
          '        else if (cmd == "COUNT") { int c; cin >> c; cout << votes[c] << "\\n"; }\n' +
          '        else {\n' +
          '            int bestId = 0, best = 0;\n' +
          '            for (int c = 1; c <= 100; c++) if (votes[c] > best) { best = votes[c]; bestId = c; }\n' +
          '            cout << bestId << "\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'This is pure state-keeping: an array of counters is the whole "database". The one place logic hides is LEAD\'s ' +
      'tie rule — scanning IDs upward and replacing only on a strictly greater count means the smallest ID wins ties, ' +
      'and a leftover best of 0 correctly reports "no votes". Getting every command right, including the empty case, is the exercise.',
    tip: 'For "leader with smallest-ID tie-break", scan IDs ascending and replace only on a strictly higher count.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Conditions'],
    title: 'Seat Booking System',
    description:
      'Build the booking logic for a hall with seats numbered 1–100.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  BOOK s     — try to book seat s\n' +
      '  CANCEL s   — try to cancel seat s\n' +
      '  STATUS s   — report seat s',
    outputFormat:
      'One line per command:\n' +
      '  BOOK   → "OK" if it was free, else "TAKEN"\n' +
      '  CANCEL → "OK" if it was booked, else "EMPTY"\n' +
      '  STATUS → "BOOKED" or "FREE"',
    examples: [
      ex('4\nBOOK 5\nBOOK 5\nSTATUS 5\nCANCEL 5', 'OK\nTAKEN\nBOOKED\nOK',
        'The first BOOK succeeds; the second finds it TAKEN. STATUS shows BOOKED; CANCEL frees it.'),
      ex('2\nCANCEL 3\nSTATUS 3', 'EMPTY\nFREE', 'Cancelling an unbooked seat reports EMPTY; it stays FREE.'),
    ],
    hints: [
      'Keep a booked/free flag for each seat.',
      'Every command\'s reply depends on the seat\'s current flag.',
    ],
    approach:
      'A boolean per seat is all the state you need. BOOK succeeds only if the seat is currently free (then mark it ' +
      'booked); otherwise it is TAKEN. CANCEL succeeds only if it is currently booked (then free it); otherwise EMPTY. ' +
      'STATUS just reports the flag. Each reply is decided by reading the flag before you change it.',
    whatYouLearn: ['Boolean state per resource', 'Reply-then-update ordering'],
    solutions: solo(
      'Keep booked[] per seat; each command checks the flag, replies, then updates it.',
      {
        python:
          'n = int(input())\n' +
          'booked = [False] * 101\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    cmd, s = input().split()\n' +
          '    s = int(s)\n' +
          '    if cmd == "BOOK":\n' +
          '        if booked[s]:\n' +
          '            out.append("TAKEN")\n' +
          '        else:\n' +
          '            booked[s] = True\n' +
          '            out.append("OK")\n' +
          '    elif cmd == "CANCEL":\n' +
          '        if booked[s]:\n' +
          '            booked[s] = False\n' +
          '            out.append("OK")\n' +
          '        else:\n' +
          '            out.append("EMPTY")\n' +
          '    else:\n' +
          '        out.append("BOOKED" if booked[s] else "FREE")\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        boolean[] booked = new boolean[101];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            int s = sc.nextInt();\n' +
          '            if (cmd.equals("BOOK")) {\n' +
          '                if (booked[s]) sb.append("TAKEN\\n");\n' +
          '                else { booked[s] = true; sb.append("OK\\n"); }\n' +
          '            } else if (cmd.equals("CANCEL")) {\n' +
          '                if (booked[s]) { booked[s] = false; sb.append("OK\\n"); }\n' +
          '                else sb.append("EMPTY\\n");\n' +
          '            } else sb.append(booked[s] ? "BOOKED\\n" : "FREE\\n");\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int booked[101] = {0};\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int s;\n' +
          '        scanf("%s %d", cmd, &s);\n' +
          '        if (strcmp(cmd, "BOOK") == 0) {\n' +
          '            if (booked[s]) printf("TAKEN\\n");\n' +
          '            else { booked[s] = 1; printf("OK\\n"); }\n' +
          '        } else if (strcmp(cmd, "CANCEL") == 0) {\n' +
          '            if (booked[s]) { booked[s] = 0; printf("OK\\n"); }\n' +
          '            else printf("EMPTY\\n");\n' +
          '        } else printf(booked[s] ? "BOOKED\\n" : "FREE\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    bool booked[101] = {false};\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int s;\n' +
          '        cin >> cmd >> s;\n' +
          '        if (cmd == "BOOK") {\n' +
          '            if (booked[s]) cout << "TAKEN\\n";\n' +
          '            else { booked[s] = true; cout << "OK\\n"; }\n' +
          '        } else if (cmd == "CANCEL") {\n' +
          '            if (booked[s]) { booked[s] = false; cout << "OK\\n"; }\n' +
          '            else cout << "EMPTY\\n";\n' +
          '        } else cout << (booked[s] ? "BOOKED\\n" : "FREE\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The whole system is a row of on/off flags. The care needed is in the conditional replies: BOOK must fail on an ' +
      'already-booked seat, CANCEL must fail on a free one. Reading the flag to decide the reply before flipping it ' +
      'keeps the two cases correct. Modelling resources as independent boolean states is the backbone of real booking systems.',
    tip: 'Decide the reply from the current state first, then update it — never the other way around.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Counting'],
    title: 'Attendance Register',
    description:
      'Track who is currently inside a building. People have IDs 1–100.\n\n' +
      'A person can be marked in or out any number of times; being marked in twice does not count them twice.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  IN id      — mark person id as inside\n' +
      '  OUT id     — mark person id as outside\n' +
      '  PRESENT    — report how many people are currently inside',
    outputFormat:
      'One line per command:\n' +
      '  IN, OUT → "OK"\n' +
      '  PRESENT → the number of people currently inside',
    examples: [
      ex('5\nIN 1\nIN 2\nIN 1\nOUT 2\nPRESENT', 'OK\nOK\nOK\nOK\n1',
        'IDs 1 and 2 enter (the repeat IN 1 changes nothing), then 2 leaves — leaving only person 1 inside.'),
      ex('3\nOUT 5\nIN 5\nPRESENT', 'OK\nOK\n1', 'Marking out someone not inside is harmless; then 5 enters.'),
    ],
    hints: [
      'Keep an inside/outside flag per person.',
      'Only change the present count when a flag actually flips.',
    ],
    approach:
      'Keep a boolean per person for "inside". For IN, only if they were outside do you flip them in and increase the ' +
      'count; a repeat IN must not double-count. OUT is symmetric. PRESENT just reports the running count. Guarding the ' +
      'count so it only changes on a real state flip is the crux.',
    whatYouLearn: ['Idempotent state changes', 'Maintaining a running count safely'],
    solutions: solo(
      'Keep inside[] per person and a count; only adjust the count when a flag genuinely flips.',
      {
        python:
          'n = int(input())\n' +
          'inside = [False] * 101\n' +
          'count = 0\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    if parts[0] == "IN":\n' +
          '        p = int(parts[1])\n' +
          '        if not inside[p]:\n' +
          '            inside[p] = True\n' +
          '            count += 1\n' +
          '        out.append("OK")\n' +
          '    elif parts[0] == "OUT":\n' +
          '        p = int(parts[1])\n' +
          '        if inside[p]:\n' +
          '            inside[p] = False\n' +
          '            count -= 1\n' +
          '        out.append("OK")\n' +
          '    else:\n' +
          '        out.append(str(count))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        boolean[] inside = new boolean[101];\n' +
          '        int count = 0;\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            if (cmd.equals("IN")) {\n' +
          '                int p = sc.nextInt();\n' +
          '                if (!inside[p]) { inside[p] = true; count++; }\n' +
          '                sb.append("OK\\n");\n' +
          '            } else if (cmd.equals("OUT")) {\n' +
          '                int p = sc.nextInt();\n' +
          '                if (inside[p]) { inside[p] = false; count--; }\n' +
          '                sb.append("OK\\n");\n' +
          '            } else sb.append(count).append("\\n");\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int inside[101] = {0}, count = 0;\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", cmd);\n' +
          '        if (strcmp(cmd, "IN") == 0) {\n' +
          '            int p; scanf("%d", &p);\n' +
          '            if (!inside[p]) { inside[p] = 1; count++; }\n' +
          '            printf("OK\\n");\n' +
          '        } else if (strcmp(cmd, "OUT") == 0) {\n' +
          '            int p; scanf("%d", &p);\n' +
          '            if (inside[p]) { inside[p] = 0; count--; }\n' +
          '            printf("OK\\n");\n' +
          '        } else printf("%d\\n", count);\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    bool inside[101] = {false};\n' +
          '    int count = 0;\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> cmd;\n' +
          '        if (cmd == "IN") {\n' +
          '            int p; cin >> p;\n' +
          '            if (!inside[p]) { inside[p] = true; count++; }\n' +
          '            cout << "OK\\n";\n' +
          '        } else if (cmd == "OUT") {\n' +
          '            int p; cin >> p;\n' +
          '            if (inside[p]) { inside[p] = false; count--; }\n' +
          '            cout << "OK\\n";\n' +
          '        } else cout << count << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        },
    ),
    explanation:
      'The trap here is double-counting. If you blindly add on every IN, a repeated IN inflates the count. Guarding the ' +
      'count so it changes only when the flag actually flips keeps it accurate no matter how many redundant commands ' +
      'arrive. Making operations idempotent — safe to repeat — is a genuinely important real-world discipline.',
    tip: 'Adjust a running count only when the underlying flag truly changes, so repeated commands stay harmless.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Totals'],
    title: 'Shopping Cart Manager',
    description:
      'Manage a shopping cart. Items have IDs 1–100, and each item in the cart has a price.\n\n' +
      'Adding an item that is already in the cart updates its price. Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  ADD item price   — add the item at that price (or update its price if already in the cart)\n' +
      '  REMOVE item      — remove the item from the cart\n' +
      '  TOTAL            — report the sum of prices of all items currently in the cart',
    outputFormat:
      'One line per command:\n' +
      '  ADD    → "OK"\n' +
      '  REMOVE → "OK" if the item was in the cart, else "NONE"\n' +
      '  TOTAL  → the current cart total',
    examples: [
      ex('5\nADD 1 100\nADD 2 250\nTOTAL\nREMOVE 1\nTOTAL', 'OK\nOK\n350\nOK\n250',
        'Cart holds 100 + 250 = 350; after removing item 1 the total is 250.'),
      ex('3\nADD 1 100\nADD 1 150\nTOTAL', 'OK\nOK\n150', 'Re-adding item 1 updates its price to 150.'),
    ],
    hints: [
      'Track whether each item is in the cart and its current price.',
      'Keep a running total, adjusting it whenever a price is added, updated, or removed.',
    ],
    approach:
      'Keep a price per item and a flag for whether it is in the cart, plus a running total. ADD sets the price and, ' +
      'if the item is new, adds it to the total — but if it already exists, it adjusts the total by the price ' +
      'difference. REMOVE subtracts its price and clears the flag. TOTAL just reports. The subtle case is updating an ' +
      'existing item without double-adding.',
    whatYouLearn: ['Maintaining a running total under updates', 'Handling add-vs-update correctly'],
    solutions: solo(
      'Keep inCart[] and price[] plus a running total; adjust the total by differences on ADD and by price on REMOVE.',
      {
        python:
          'n = int(input())\n' +
          'in_cart = [False] * 101\n' +
          'price = [0] * 101\n' +
          'total = 0\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    if parts[0] == "ADD":\n' +
          '        item, p = int(parts[1]), int(parts[2])\n' +
          '        if in_cart[item]:\n' +
          '            total += p - price[item]\n' +
          '        else:\n' +
          '            in_cart[item] = True\n' +
          '            total += p\n' +
          '        price[item] = p\n' +
          '        out.append("OK")\n' +
          '    elif parts[0] == "REMOVE":\n' +
          '        item = int(parts[1])\n' +
          '        if in_cart[item]:\n' +
          '            total -= price[item]\n' +
          '            in_cart[item] = False\n' +
          '            out.append("OK")\n' +
          '        else:\n' +
          '            out.append("NONE")\n' +
          '    else:\n' +
          '        out.append(str(total))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        boolean[] inCart = new boolean[101];\n' +
          '        int[] price = new int[101];\n' +
          '        long total = 0;\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            if (cmd.equals("ADD")) {\n' +
          '                int item = sc.nextInt(), p = sc.nextInt();\n' +
          '                if (inCart[item]) total += p - price[item];\n' +
          '                else { inCart[item] = true; total += p; }\n' +
          '                price[item] = p;\n' +
          '                sb.append("OK\\n");\n' +
          '            } else if (cmd.equals("REMOVE")) {\n' +
          '                int item = sc.nextInt();\n' +
          '                if (inCart[item]) { total -= price[item]; inCart[item] = false; sb.append("OK\\n"); }\n' +
          '                else sb.append("NONE\\n");\n' +
          '            } else sb.append(total).append("\\n");\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int inCart[101] = {0}, price[101] = {0};\n' +
          '    long total = 0;\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", cmd);\n' +
          '        if (strcmp(cmd, "ADD") == 0) {\n' +
          '            int item, p; scanf("%d %d", &item, &p);\n' +
          '            if (inCart[item]) total += p - price[item];\n' +
          '            else { inCart[item] = 1; total += p; }\n' +
          '            price[item] = p;\n' +
          '            printf("OK\\n");\n' +
          '        } else if (strcmp(cmd, "REMOVE") == 0) {\n' +
          '            int item; scanf("%d", &item);\n' +
          '            if (inCart[item]) { total -= price[item]; inCart[item] = 0; printf("OK\\n"); }\n' +
          '            else printf("NONE\\n");\n' +
          '        } else printf("%ld\\n", total);\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    bool inCart[101] = {false};\n' +
          '    int price[101] = {0};\n' +
          '    long total = 0;\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> cmd;\n' +
          '        if (cmd == "ADD") {\n' +
          '            int item, p; cin >> item >> p;\n' +
          '            if (inCart[item]) total += p - price[item];\n' +
          '            else { inCart[item] = true; total += p; }\n' +
          '            price[item] = p;\n' +
          '            cout << "OK\\n";\n' +
          '        } else if (cmd == "REMOVE") {\n' +
          '            int item; cin >> item;\n' +
          '            if (inCart[item]) { total -= price[item]; inCart[item] = false; cout << "OK\\n"; }\n' +
          '            else cout << "NONE\\n";\n' +
          '        } else cout << total << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Keeping a running total is faster than re-summing the cart on every TOTAL, but it demands discipline: an ADD on ' +
      'an existing item must adjust by the price difference, not add afresh, or the total drifts. Tracking each item\'s ' +
      'flag and price and updating the total on every mutation keeps it perfectly in sync — the essence of a correct stateful system.',
    tip: 'When you cache a running total, every mutation must update it consistently — especially the update-in-place case.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Max Tracking'],
    title: 'Score Leaderboard',
    description:
      'Maintain a leaderboard. Players have IDs 1–100, each starting with a score of 0.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  ADD p s     — add s points to player p\'s score\n' +
      '  SCORE p     — report player p\'s total score\n' +
      '  TOP         — report the player with the highest score (smallest ID on a tie; 0 if all scores are 0)',
    outputFormat:
      'One line per command:\n' +
      '  ADD   → "OK"\n' +
      '  SCORE → the player\'s total\n' +
      '  TOP   → the leading player\'s ID (or 0)',
    examples: [
      ex('5\nADD 1 50\nADD 2 70\nADD 1 30\nTOP\nSCORE 1', 'OK\nOK\nOK\n1\n80',
        'Player 1 reaches 80 and player 2 has 70, so player 1 is on top.'),
      ex('2\nTOP\nADD 3 10', '0\nOK', 'With every score at 0, TOP reports 0.'),
    ],
    hints: [
      'Keep a total score per player.',
      'For TOP, scan IDs in increasing order so a tie keeps the smallest ID.',
    ],
    approach:
      'Keep an array of scores indexed by player ID. ADD increases one score, SCORE reports one. For TOP, scan the IDs ' +
      'from 1 upward keeping the best score seen, replacing only on a strictly higher value so ties favour the smaller ' +
      'ID. If the best remains 0, print 0.',
    whatYouLearn: ['Accumulating scores per key', 'Leader lookup with ordered tie-breaking'],
    solutions: solo(
      'Keep score[] per player; for TOP scan IDs ascending keeping the strictly-highest score.',
      {
        python:
          'n = int(input())\n' +
          'score = [0] * 101\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    if parts[0] == "ADD":\n' +
          '        p, s = int(parts[1]), int(parts[2])\n' +
          '        score[p] += s\n' +
          '        out.append("OK")\n' +
          '    elif parts[0] == "SCORE":\n' +
          '        out.append(str(score[int(parts[1])]))\n' +
          '    else:\n' +
          '        best_id, best = 0, 0\n' +
          '        for p in range(1, 101):\n' +
          '            if score[p] > best:\n' +
          '                best = score[p]\n' +
          '                best_id = p\n' +
          '        out.append(str(best_id))\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        long[] score = new long[101];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            if (cmd.equals("ADD")) { int p = sc.nextInt(); score[p] += sc.nextInt(); sb.append("OK\\n"); }\n' +
          '            else if (cmd.equals("SCORE")) { sb.append(score[sc.nextInt()]).append("\\n"); }\n' +
          '            else {\n' +
          '                int bestId = 0; long best = 0;\n' +
          '                for (int p = 1; p <= 100; p++) if (score[p] > best) { best = score[p]; bestId = p; }\n' +
          '                sb.append(bestId).append("\\n");\n' +
          '            }\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    long score[101] = {0};\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", cmd);\n' +
          '        if (strcmp(cmd, "ADD") == 0) { int p; long s; scanf("%d %ld", &p, &s); score[p] += s; printf("OK\\n"); }\n' +
          '        else if (strcmp(cmd, "SCORE") == 0) { int p; scanf("%d", &p); printf("%ld\\n", score[p]); }\n' +
          '        else {\n' +
          '            int bestId = 0; long best = 0;\n' +
          '            for (int p = 1; p <= 100; p++) if (score[p] > best) { best = score[p]; bestId = p; }\n' +
          '            printf("%d\\n", bestId);\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    long score[101] = {0};\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> cmd;\n' +
          '        if (cmd == "ADD") { int p; long s; cin >> p >> s; score[p] += s; cout << "OK\\n"; }\n' +
          '        else if (cmd == "SCORE") { int p; cin >> p; cout << score[p] << "\\n"; }\n' +
          '        else {\n' +
          '            int bestId = 0; long best = 0;\n' +
          '            for (int p = 1; p <= 100; p++) if (score[p] > best) { best = score[p]; bestId = p; }\n' +
          '            cout << bestId << "\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Scores accumulate per player, so ADD is a simple increment on the right slot. The judgement is in TOP: scanning ' +
      'IDs in order and switching only on a strictly higher score gives the smallest-ID winner on ties, and a best of 0 ' +
      'means nobody has scored. This is exactly how a live leaderboard maintains standings as points roll in.',
    tip: 'Accumulate into a per-key total; resolve "highest" with an ordered scan and strict comparison for tie-breaks.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Queue'],
    title: 'Task Queue',
    description:
      'Build a first-in, first-out task queue. Tasks are identified by numbers.\n\n' +
      'The oldest task waiting is always the next one served. Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  PUSH id   — add task id to the back of the queue\n' +
      '  POP       — remove and report the task at the front\n' +
      '  FRONT     — report the task at the front without removing it',
    outputFormat:
      'One line per command:\n' +
      '  PUSH  → "OK"\n' +
      '  POP   → the removed task\'s id, or "EMPTY" if the queue is empty\n' +
      '  FRONT → the front task\'s id, or "EMPTY" if the queue is empty',
    examples: [
      ex('5\nPUSH 10\nPUSH 20\nFRONT\nPOP\nFRONT', 'OK\nOK\n10\n10\n20',
        '10 was pushed first, so it is at the front; POP removes it, leaving 20 at the front.'),
      ex('2\nPOP\nFRONT', 'EMPTY\nEMPTY', 'Both commands act on an empty queue.'),
    ],
    hints: [
      'A queue serves the oldest item first — keep a "head" position that moves forward on each POP.',
      'The queue is empty when the head has caught up to the back.',
    ],
    approach:
      'Store pushed tasks in order and keep a head index for the front. PUSH appends to the back. POP, if anything is ' +
      'waiting, reports the item at the head and advances the head forward. FRONT reports the head item without moving ' +
      'it. The queue is empty exactly when the head has reached the back — both POP and FRONT must handle that.',
    whatYouLearn: ['FIFO queue with a moving head index', 'Guarding operations on an empty queue'],
    solutions: solo(
      'Append on PUSH; use a head index that advances on POP; report EMPTY when head reaches the back.',
      {
        python:
          'n = int(input())\n' +
          'queue = []\n' +
          'head = 0\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    if parts[0] == "PUSH":\n' +
          '        queue.append(int(parts[1]))\n' +
          '        out.append("OK")\n' +
          '    elif parts[0] == "POP":\n' +
          '        if head < len(queue):\n' +
          '            out.append(str(queue[head]))\n' +
          '            head += 1\n' +
          '        else:\n' +
          '            out.append("EMPTY")\n' +
          '    else:\n' +
          '        out.append(str(queue[head]) if head < len(queue) else "EMPTY")\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] queue = new int[n];\n' +
          '        int head = 0, tail = 0;\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            if (cmd.equals("PUSH")) { queue[tail++] = sc.nextInt(); sb.append("OK\\n"); }\n' +
          '            else if (cmd.equals("POP")) {\n' +
          '                if (head < tail) sb.append(queue[head++]).append("\\n");\n' +
          '                else sb.append("EMPTY\\n");\n' +
          '            } else sb.append(head < tail ? String.valueOf(queue[head]) : "EMPTY").append("\\n");\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int queue[100000], head = 0, tail = 0;\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", cmd);\n' +
          '        if (strcmp(cmd, "PUSH") == 0) { int id; scanf("%d", &id); queue[tail++] = id; printf("OK\\n"); }\n' +
          '        else if (strcmp(cmd, "POP") == 0) {\n' +
          '            if (head < tail) printf("%d\\n", queue[head++]);\n' +
          '            else printf("EMPTY\\n");\n' +
          '        } else {\n' +
          '            if (head < tail) printf("%d\\n", queue[head]);\n' +
          '            else printf("EMPTY\\n");\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <vector>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    vector<int> queue;\n' +
          '    int head = 0;\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> cmd;\n' +
          '        if (cmd == "PUSH") { int id; cin >> id; queue.push_back(id); cout << "OK\\n"; }\n' +
          '        else if (cmd == "POP") {\n' +
          '            if (head < (int)queue.size()) cout << queue[head++] << "\\n";\n' +
          '            else cout << "EMPTY\\n";\n' +
          '        } else {\n' +
          '            if (head < (int)queue.size()) cout << queue[head] << "\\n";\n' +
          '            else cout << "EMPTY\\n";\n' +
          '        }\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A queue is fair: whoever waited longest is served first. Modelling it with a growing list plus a head index is ' +
      'simple and fast — PUSH appends, POP hands out the head and steps it forward. The essential care is the empty ' +
      'check: once the head reaches the back there is nothing to serve, so both POP and FRONT must report EMPTY rather than reading past the end.',
    tip: 'A moving head index turns an array into a queue. Always guard reads when head has caught up to the back.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Systems', topics: ['State', 'Commands', 'Average'],
    title: 'Rating Tracker',
    description:
      'Track product ratings as they arrive. Each rating is a whole number from 1 to 5.\n\n' +
      'Process each command and print its result.',
    inputFormat:
      'Line 1: number of commands N. Next N lines, one of:\n' +
      '  RATE v     — record a new rating v (1–5)\n' +
      '  COUNT      — report how many ratings have been recorded\n' +
      '  AVERAGE    — report the average rating so far, rounded down (0 if there are no ratings yet)',
    outputFormat:
      'One line per command:\n' +
      '  RATE    → "OK"\n' +
      '  COUNT   → the number of ratings\n' +
      '  AVERAGE → the rounded-down average (or 0)',
    examples: [
      ex('5\nRATE 5\nRATE 4\nRATE 3\nAVERAGE\nCOUNT', 'OK\nOK\nOK\n4\n3',
        'Sum is 12 over 3 ratings → 12 ÷ 3 = 4. Three ratings recorded.'),
      ex('2\nAVERAGE\nRATE 2', '0\nOK', 'With no ratings yet, AVERAGE reports 0.'),
    ],
    hints: [
      'Keep a running sum and a running count; you do not need to store every rating.',
      'Guard against dividing by zero when no ratings exist.',
    ],
    approach:
      'Two numbers capture everything: the running sum of ratings and how many there are. RATE adds to both. COUNT ' +
      'reports the count. AVERAGE divides sum by count using whole-number division — but only when the count is above ' +
      'zero, otherwise it must report 0 to avoid dividing by zero.',
    whatYouLearn: ['Streaming aggregates (sum and count)', 'Avoiding division by zero'],
    solutions: solo(
      'Maintain a running sum and count; AVERAGE is sum ÷ count when count > 0, else 0.',
      {
        python:
          'n = int(input())\n' +
          'total = 0\n' +
          'count = 0\n' +
          'out = []\n' +
          'for _ in range(n):\n' +
          '    parts = input().split()\n' +
          '    if parts[0] == "RATE":\n' +
          '        total += int(parts[1])\n' +
          '        count += 1\n' +
          '        out.append("OK")\n' +
          '    elif parts[0] == "COUNT":\n' +
          '        out.append(str(count))\n' +
          '    else:\n' +
          '        out.append(str(total // count) if count > 0 else "0")\n' +
          'print("\\n".join(out))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        long total = 0;\n' +
          '        int count = 0;\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            String cmd = sc.next();\n' +
          '            if (cmd.equals("RATE")) { total += sc.nextInt(); count++; sb.append("OK\\n"); }\n' +
          '            else if (cmd.equals("COUNT")) sb.append(count).append("\\n");\n' +
          '            else sb.append(count > 0 ? total / count : 0).append("\\n");\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    long total = 0;\n' +
          '    int count = 0;\n' +
          '    char cmd[16];\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%s", cmd);\n' +
          '        if (strcmp(cmd, "RATE") == 0) { int v; scanf("%d", &v); total += v; count++; printf("OK\\n"); }\n' +
          '        else if (strcmp(cmd, "COUNT") == 0) printf("%d\\n", count);\n' +
          '        else printf("%ld\\n", count > 0 ? total / count : 0);\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    long total = 0;\n' +
          '    int count = 0;\n' +
          '    string cmd;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cin >> cmd;\n' +
          '        if (cmd == "RATE") { int v; cin >> v; total += v; count++; cout << "OK\\n"; }\n' +
          '        else if (cmd == "COUNT") cout << count << "\\n";\n' +
          '        else cout << (count > 0 ? total / count : 0) << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'You never need to remember individual ratings — a running sum and count answer both COUNT and AVERAGE. That is ' +
      'the idea of a streaming aggregate: fixed memory no matter how many events arrive. The one landmine is AVERAGE ' +
      'before any rating exists; guarding the division against a zero count is what makes the system robust.',
    tip: 'Running sum + count computes an average in O(1) memory — just never divide when the count is zero.',
  },
]

export default questions
