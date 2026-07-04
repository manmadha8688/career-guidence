// Track 05 — Build It
// Optimization under constraints. The naive answer works but is too slow or clumsy;
// the job is to make it faster/leaner and be able to EXPLAIN why the better version wins.
// Almost every problem shows brute + optimal (some show brute → normal → optimal).
// Real-world framing (orders, prices, deliveries) — no company names, no "interview" labels.
import { solo, trio, variant, ex } from './_helpers.mjs'

const T = 'BUILD_IT'

const questions = [
  {
    track: T, level: 'INTERMEDIATE', category: 'Prices & Discounts', topics: ['Arrays', 'Sorting', 'Optimization'],
    title: 'Best Coupon Buy',
    description:
      'A store lets you buy any 3 products. You have one coupon that gives 20% off the most expensive item ' +
      'in your basket — and only that item.\n\n' +
      'Given the price of every product, find the minimum total you can pay by choosing 3 products wisely.',
    inputFormat: 'Line 1: number of products N (N ≥ 3). Line 2: N prices.',
    outputFormat: 'One integer: the smallest total you can pay.',
    examples: [
      ex('5\n100 200 50 300 150', '270', 'Pick 50, 100, 150. Coupon: 20% off 150 → 120. Total 50 + 100 + 120 = 270.'),
      ex('4\n40 10 30 20', '54', 'Pick 10, 20, 30. 20% off 30 → 24. Total 10 + 20 + 24 = 54.'),
    ],
    hints: [
      'Buying cheaper items always lowers the total — even after the discount.',
      'Once you know the 3 cheapest, the discount only ever applies to the biggest of those three.',
    ],
    approach:
      'Start by trying every group of 3 (slow but obviously correct). Then notice a pattern: including a pricier ' +
      'item raises your total by more than the extra discount saves, so the 3 cheapest always win. Sorting reveals ' +
      'them instantly — and if you only need the 3 smallest, you can even find them in a single pass.',
    whatYouLearn: ['Proving the cheapest choice is optimal', 'Going from O(n³) to O(n log n) to O(n)'],
    solutions: trio(
      variant(
        'Try every group of 3 products, apply the coupon to the priciest of the group, and keep the smallest total.',
        'O(n^3)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'best = None\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        for k in range(j + 1, n):\n' +
            '            three = [p[i], p[j], p[k]]\n' +
            '            pay = sum(three) - max(three) * 20 // 100\n' +
            '            if best is None or pay < best:\n' +
            '                best = pay\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        int best = Integer.MAX_VALUE;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                for (int k = j + 1; k < n; k++) {\n' +
            '                    int mx = Math.max(p[i], Math.max(p[j], p[k]));\n' +
            '                    int pay = p[i] + p[j] + p[k] - mx * 20 / 100;\n' +
            '                    if (pay < best) best = pay;\n' +
            '                }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    int best = 2000000000;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            for (int k = j + 1; k < n; k++) {\n' +
            '                int mx = p[i];\n' +
            '                if (p[j] > mx) mx = p[j];\n' +
            '                if (p[k] > mx) mx = p[k];\n' +
            '                int pay = p[i] + p[j] + p[k] - mx * 20 / 100;\n' +
            '                if (pay < best) best = pay;\n' +
            '            }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    int best = 2000000000;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            for (int k = j + 1; k < n; k++) {\n' +
            '                int mx = max({p[i], p[j], p[k]});\n' +
            '                int pay = p[i] + p[j] + p[k] - mx * 20 / 100;\n' +
            '                best = min(best, pay);\n' +
            '            }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Sort the prices; the 3 cheapest are the answer, and the discount lands on the largest of those three.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = sorted(map(int, input().split()))\n' +
            'a, b, c = p[0], p[1], p[2]\n' +
            'print(a + b + c - c * 20 // 100)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        Arrays.sort(p);\n' +
            '        int c = p[2];\n' +
            '        System.out.println(p[0] + p[1] + p[2] - c * 20 / 100);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    qsort(p, n, sizeof(int), cmp);\n' +
            '    int c = p[2];\n' +
            '    printf("%d\\n", p[0] + p[1] + p[2] - c * 20 / 100);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    sort(p.begin(), p.end());\n' +
            '    int c = p[2];\n' +
            '    cout << p[0] + p[1] + p[2] - c * 20 / 100 << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'You only need the 3 smallest, so track them in one pass — no full sort required.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'INF = float("inf")\n' +
            's1 = s2 = s3 = INF\n' +
            'for x in p:\n' +
            '    if x < s1:\n' +
            '        s1, s2, s3 = x, s1, s2\n' +
            '    elif x < s2:\n' +
            '        s2, s3 = x, s2\n' +
            '    elif x < s3:\n' +
            '        s3 = x\n' +
            'print(int(s1 + s2 + s3 - s3 * 20 // 100))',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        long s1 = Long.MAX_VALUE, s2 = Long.MAX_VALUE, s3 = Long.MAX_VALUE;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            long x = sc.nextInt();\n' +
            '            if (x < s1) { s3 = s2; s2 = s1; s1 = x; }\n' +
            '            else if (x < s2) { s3 = s2; s2 = x; }\n' +
            '            else if (x < s3) { s3 = x; }\n' +
            '        }\n' +
            '        System.out.println(s1 + s2 + s3 - s3 * 20 / 100);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <limits.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    long s1 = LONG_MAX, s2 = LONG_MAX, s3 = LONG_MAX;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int t;\n' +
            '        scanf("%d", &t);\n' +
            '        long x = t;\n' +
            '        if (x < s1) { s3 = s2; s2 = s1; s1 = x; }\n' +
            '        else if (x < s2) { s3 = s2; s2 = x; }\n' +
            '        else if (x < s3) { s3 = x; }\n' +
            '    }\n' +
            '    printf("%ld\\n", s1 + s2 + s3 - s3 * 20 / 100);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <climits>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    long s1 = LONG_MAX, s2 = LONG_MAX, s3 = LONG_MAX;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long x;\n' +
            '        cin >> x;\n' +
            '        if (x < s1) { s3 = s2; s2 = s1; s1 = x; }\n' +
            '        else if (x < s2) { s3 = s2; s2 = x; }\n' +
            '        else if (x < s3) { s3 = x; }\n' +
            '    }\n' +
            '    cout << s1 + s2 + s3 - s3 * 20 / 100 << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    ),
    explanation:
      'The key insight is that swapping in a costlier product raises the basket by more than the 20% coupon can ever ' +
      'give back, so the 3 cheapest items are always optimal. Once you trust that, the whole problem collapses: sorting ' +
      'finds the three cheapest in O(n log n), and since you only need three of them, a single pass does it in O(n).',
    tip: 'When a problem says "solve it faster", first find the pattern that makes brute force unnecessary — then the speed-up is easy.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Prices & Discounts', topics: ['Arrays', 'Optimization'],
    title: 'Max Profit, One Trade',
    description:
      'You track a product\'s price for N days. You may buy it on one day and sell it on a later day — at most ' +
      'once.\n\n' +
      'Find the maximum profit you can make. If no later day has a higher price, the profit is 0.',
    inputFormat: 'Line 1: number of days N. Line 2: N prices in day order.',
    outputFormat: 'One integer: the maximum profit (never negative).',
    examples: [
      ex('6\n7 1 5 3 6 4', '5', 'Buy at 1, sell at 6 → profit 5.'),
      ex('5\n7 6 4 3 1', '0', 'Prices only fall, so the best move is not to trade.'),
    ],
    hints: [
      'The slow way checks every buy-day against every later sell-day.',
      'The fast way remembers the cheapest price seen so far as you scan left to right.',
    ],
    approach:
      'Brute force tries every pair of days — correct but slow. The optimal idea: as you walk through the days, ' +
      'keep the lowest price seen so far. Selling today, your best possible profit is today\'s price minus that ' +
      'lowest price. Track the biggest such profit in a single pass.',
    whatYouLearn: ['Replacing a pair search with a running minimum', 'Turning O(n²) into O(n)'],
    solutions: {
      brute: variant(
        'Check every buy day against every later sell day and keep the largest difference.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'best = 0\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        best = max(best, p[j] - p[i])\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        int best = 0;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                best = Math.max(best, p[j] - p[i]);\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (p[j] - p[i] > best) best = p[j] - p[i];\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            best = max(best, p[j] - p[i]);\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Scan once, tracking the cheapest price so far; best profit is today\'s price minus that minimum.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'best = 0\n' +
            'lowest = p[0]\n' +
            'for price in p:\n' +
            '    lowest = min(lowest, price)\n' +
            '    best = max(best, price - lowest)\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int best = 0, lowest = Integer.MAX_VALUE;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int price = sc.nextInt();\n' +
            '            lowest = Math.min(lowest, price);\n' +
            '            best = Math.max(best, price - lowest);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <limits.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int best = 0, lowest = INT_MAX;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int price;\n' +
            '        scanf("%d", &price);\n' +
            '        if (price < lowest) lowest = price;\n' +
            '        if (price - lowest > best) best = price - lowest;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <climits>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    int best = 0, lowest = INT_MAX;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int price;\n' +
            '        cin >> price;\n' +
            '        lowest = min(lowest, price);\n' +
            '        best = max(best, price - lowest);\n' +
            '    }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The brute force asks "for every buy day, what is the best sell day?" — that is n² work. The optimal version ' +
      'flips it: for every sell day, the best buy day is simply the cheapest price seen before it. Keeping that ' +
      'running minimum means one pass answers the whole question, and it naturally returns 0 when prices never rise.',
    tip: 'A running minimum or maximum often removes the inner loop. Ask: "what do I need to remember from the past?"',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Streaks & Windows', topics: ['Arrays', 'Optimization'],
    title: 'Longest Winning Streak',
    description:
      'A team\'s season is recorded as a list of 1s (win) and 0s (loss).\n\n' +
      'Find the length of their longest streak of back-to-back wins.',
    inputFormat: 'Line 1: number of games N. Line 2: N values, each 0 or 1.',
    outputFormat: 'One integer: the longest run of consecutive 1s.',
    examples: [
      ex('8\n1 1 0 1 1 1 0 1', '3', 'The longest unbroken run of wins has length 3.'),
      ex('4\n0 0 0 0', '0', 'No wins, so the longest streak is 0.'),
    ],
    hints: [
      'The slow way restarts a count from every position.',
      'The fast way keeps one running counter that resets to 0 on a loss.',
    ],
    approach:
      'Brute force tries every starting game and counts how far the wins continue — repeating work again and again. ' +
      'The optimal way needs just one counter: add 1 on a win, reset to 0 on a loss, and remember the highest value ' +
      'the counter ever reached.',
    whatYouLearn: ['Running counters that reset on a condition', 'Collapsing repeated scans into one pass'],
    solutions: {
      brute: variant(
        'From every game, count how many consecutive wins follow; keep the longest.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'g = list(map(int, input().split()))\n' +
            'best = 0\n' +
            'for i in range(n):\n' +
            '    run = 0\n' +
            '    for j in range(i, n):\n' +
            '        if g[j] == 1:\n' +
            '            run += 1\n' +
            '        else:\n' +
            '            break\n' +
            '    best = max(best, run)\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] g = new int[n];\n' +
            '        for (int i = 0; i < n; i++) g[i] = sc.nextInt();\n' +
            '        int best = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int run = 0;\n' +
            '            for (int j = i; j < n; j++) {\n' +
            '                if (g[j] == 1) run++;\n' +
            '                else break;\n' +
            '            }\n' +
            '            best = Math.max(best, run);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int g[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &g[i]);\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int run = 0;\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            if (g[j] == 1) run++;\n' +
            '            else break;\n' +
            '        }\n' +
            '        if (run > best) best = run;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> g(n);\n' +
            '    for (auto &x : g) cin >> x;\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int run = 0;\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            if (g[j] == 1) run++;\n' +
            '            else break;\n' +
            '        }\n' +
            '        best = max(best, run);\n' +
            '    }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'One pass: add 1 to the current run on a win, reset to 0 on a loss, and remember the best run seen.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'g = list(map(int, input().split()))\n' +
            'best = run = 0\n' +
            'for x in g:\n' +
            '    run = run + 1 if x == 1 else 0\n' +
            '    best = max(best, run)\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int best = 0, run = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int x = sc.nextInt();\n' +
            '            run = (x == 1) ? run + 1 : 0;\n' +
            '            best = Math.max(best, run);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int best = 0, run = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int x;\n' +
            '        scanf("%d", &x);\n' +
            '        run = (x == 1) ? run + 1 : 0;\n' +
            '        if (run > best) best = run;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    int best = 0, run = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int x;\n' +
            '        cin >> x;\n' +
            '        run = (x == 1) ? run + 1 : 0;\n' +
            '        best = max(best, run);\n' +
            '    }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Restarting the count from every game repeats the same additions many times. The optimal version realises the ' +
      'streak either grows by one (a win) or dies (a loss), so a single counter that resets on a loss captures every ' +
      'streak as it happens. One pass, constant memory.',
    tip: '"Longest run of..." almost always means one counter that resets. You rarely need nested loops for streaks.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Counting & Grouping', topics: ['Arrays', 'Hashing', 'Optimization'],
    title: 'Most Ordered Product',
    description:
      'You have today\'s orders as a list of product IDs. Find the product that was ordered the most times.\n\n' +
      'If two products tie for the most orders, print the smaller ID.',
    inputFormat: 'Line 1: number of orders N. Line 2: N product IDs.',
    outputFormat: 'One integer: the most-ordered product ID (smaller ID wins a tie).',
    examples: [
      ex('6\n3 1 3 2 1 3', '3', 'Product 3 appears 3 times — more than any other.'),
      ex('4\n5 5 2 2', '2', 'Both 5 and 2 appear twice; the smaller ID (2) wins.'),
    ],
    hints: [
      'The slow way counts each product by scanning the whole list again.',
      'The fast way builds a count table in one pass, then reads off the winner.',
    ],
    approach:
      'Brute force picks each product and counts it across the list — lots of repeated scanning. The optimal way ' +
      'counts every product once using a map (ID → count) in a single pass, then walks the counts to find the ' +
      'highest, breaking ties in favour of the smaller ID.',
    whatYouLearn: ['Counting with a hash map', 'Handling "smallest on a tie" cleanly'],
    solutions: {
      brute: variant(
        'For each product, count how many times it appears in the whole list; track the best (smaller ID on tie).',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'best_id, best_count = None, -1\n' +
            'for x in a:\n' +
            '    c = a.count(x)\n' +
            '    if c > best_count or (c == best_count and x < best_id):\n' +
            '        best_id, best_count = x, c\n' +
            'print(best_id)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int bestId = -1, bestCount = -1;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int c = 0;\n' +
            '            for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '            if (c > bestCount || (c == bestCount && a[i] < bestId)) { bestId = a[i]; bestCount = c; }\n' +
            '        }\n' +
            '        System.out.println(bestId);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int bestId = -1, bestCount = -1;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '        if (c > bestCount || (c == bestCount && a[i] < bestId)) { bestId = a[i]; bestCount = c; }\n' +
            '    }\n' +
            '    printf("%d\\n", bestId);\n' +
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
            '    for (auto &x : a) cin >> x;\n' +
            '    int bestId = -1, bestCount = -1;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '        if (c > bestCount || (c == bestCount && a[i] < bestId)) { bestId = a[i]; bestCount = c; }\n' +
            '    }\n' +
            '    cout << bestId << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Count every product once with a map, then pick the highest count (smaller ID wins a tie).',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'count = {}\n' +
            'for x in a:\n' +
            '    count[x] = count.get(x, 0) + 1\n' +
            'best_id, best_count = None, -1\n' +
            'for pid in sorted(count):\n' +
            '    if count[pid] > best_count:\n' +
            '        best_id, best_count = pid, count[pid]\n' +
            'print(best_id)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        TreeMap<Integer, Integer> count = new TreeMap<>();\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int x = sc.nextInt();\n' +
            '            count.merge(x, 1, Integer::sum);\n' +
            '        }\n' +
            '        int bestId = -1, bestCount = -1;\n' +
            '        for (Map.Entry<Integer, Integer> e : count.entrySet())\n' +
            '            if (e.getValue() > bestCount) { bestId = e.getKey(); bestCount = e.getValue(); }\n' +
            '        System.out.println(bestId);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// Sort so equal IDs sit together, then count runs in one pass.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int bestId = a[0], bestCount = 0, i = 0;\n' +
            '    while (i < n) {\n' +
            '        int j = i;\n' +
            '        while (j < n && a[j] == a[i]) j++;\n' +
            '        if (j - i > bestCount) { bestCount = j - i; bestId = a[i]; }\n' +
            '        i = j;\n' +
            '    }\n' +
            '    printf("%d\\n", bestId);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <map>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    map<int, int> count;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int x;\n' +
            '        cin >> x;\n' +
            '        count[x]++;\n' +
            '    }\n' +
            '    int bestId = -1, bestCount = -1;\n' +
            '    for (auto &e : count)\n' +
            '        if (e.second > bestCount) { bestId = e.first; bestCount = e.second; }\n' +
            '    cout << bestId << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Counting each product by re-scanning the list is n² work for something that only needs one pass. A map that ' +
      'remembers "ID → how many times" builds all counts at once. Reading the IDs in sorted order means the first ' +
      'one to reach the highest count is automatically the smallest, which handles ties for free.',
    tip: 'Whenever you are counting "how many of each", reach for a hash map — it turns repeated scans into one pass.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Counting & Grouping', topics: ['Arrays', 'Hashing', 'Optimization'],
    title: 'First Unique Order',
    description:
      'Customers place orders one after another; you have their customer IDs in order.\n\n' +
      'Find the first customer who placed exactly one order all day. If every customer ordered more than once, ' +
      'print -1.',
    inputFormat: 'Line 1: number of orders N. Line 2: N customer IDs in the order they arrived.',
    outputFormat: 'One integer: the first customer ID that appears exactly once, or -1.',
    examples: [
      ex('6\n4 5 4 6 5 7', '6', '4 and 5 repeat; 6 is the first ID that appears exactly once.'),
      ex('4\n1 1 2 2', '-1', 'Every customer ordered twice, so there is no unique one.'),
    ],
    hints: [
      'The slow way counts each ID across the whole list to see if it is unique.',
      'The fast way counts everyone first, then scans left to right for the first count of 1.',
    ],
    approach:
      'Brute force checks, for each order, whether that ID appears only once — recounting the list every time. The ' +
      'optimal way splits it into two passes: first count how many times each ID appears, then walk the orders in ' +
      'arrival sequence and return the first whose count is exactly 1.',
    whatYouLearn: ['Two-pass counting then scanning', 'Preserving original order while using a count map'],
    solutions: {
      brute: variant(
        'For each order, count that ID across the whole list; the first with a count of 1 is the answer.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'ans = -1\n' +
            'for x in a:\n' +
            '    if a.count(x) == 1:\n' +
            '        ans = x\n' +
            '        break\n' +
            'print(ans)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int ans = -1;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int c = 0;\n' +
            '            for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '            if (c == 1) { ans = a[i]; break; }\n' +
            '        }\n' +
            '        System.out.println(ans);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int ans = -1;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '        if (c == 1) { ans = a[i]; break; }\n' +
            '    }\n' +
            '    printf("%d\\n", ans);\n' +
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
            '    for (auto &x : a) cin >> x;\n' +
            '    int ans = -1;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '        if (c == 1) { ans = a[i]; break; }\n' +
            '    }\n' +
            '    cout << ans << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Count all IDs first, then scan in arrival order for the first ID whose count is exactly 1.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'count = {}\n' +
            'for x in a:\n' +
            '    count[x] = count.get(x, 0) + 1\n' +
            'ans = -1\n' +
            'for x in a:\n' +
            '    if count[x] == 1:\n' +
            '        ans = x\n' +
            '        break\n' +
            'print(ans)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        HashMap<Integer, Integer> count = new HashMap<>();\n' +
            '        for (int i = 0; i < n; i++) { a[i] = sc.nextInt(); count.merge(a[i], 1, Integer::sum); }\n' +
            '        int ans = -1;\n' +
            '        for (int i = 0; i < n; i++) if (count.get(a[i]) == 1) { ans = a[i]; break; }\n' +
            '        System.out.println(ans);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// Count via a sorted copy, then scan the original in order for the first unique.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000], s[100000];\n' +
            '    for (int i = 0; i < n; i++) { scanf("%d", &a[i]); s[i] = a[i]; }\n' +
            '    qsort(s, n, sizeof(int), cmp);\n' +
            '    int ans = -1;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int lo = 0, hi = n - 1, cnt = 0;\n' +
            '        for (int j = 0; j < n; j++) if (s[j] == a[i]) cnt++;\n' +
            '        (void)lo; (void)hi;\n' +
            '        if (cnt == 1) { ans = a[i]; break; }\n' +
            '    }\n' +
            '    printf("%d\\n", ans);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <unordered_map>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    unordered_map<int, int> count;\n' +
            '    for (int i = 0; i < n; i++) { cin >> a[i]; count[a[i]]++; }\n' +
            '    int ans = -1;\n' +
            '    for (int i = 0; i < n; i++) if (count[a[i]] == 1) { ans = a[i]; break; }\n' +
            '    cout << ans << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The unique-order question needs two facts: how often each ID appears, and the order they arrived in. Brute ' +
      'force mixes both into one n² loop. The optimal version separates them — count everything once, then a single ' +
      'ordered scan finds the first count-of-one. (The C version keeps it simple; a real hash map would drop it to O(n).)',
    tip: 'When you need counts AND original order, do two passes: count first, then scan. Do not force it into one loop.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Prices & Discounts', topics: ['Arrays', 'Sorting', 'Optimization'],
    title: 'Closest Two Prices',
    description:
      'You are comparing product prices and want the two that are nearest to each other.\n\n' +
      'Given N prices, print the smallest difference between any two of them.',
    inputFormat: 'Line 1: number of prices N (N ≥ 2). Line 2: N prices.',
    outputFormat: 'One integer: the smallest absolute difference between any two prices.',
    examples: [
      ex('5\n4 9 1 32 13', '3', 'The closest pair is 1 and 4 → difference 3.'),
      ex('4\n10 3 6 20', '3', 'The closest pair is 3 and 6 → difference 3.'),
    ],
    hints: [
      'The slow way checks the gap between every possible pair.',
      'After sorting, the closest pair must be next to each other — so only neighbours matter.',
    ],
    approach:
      'Brute force compares all pairs and keeps the smallest gap. The optimal insight: if you sort the prices, two ' +
      'values that are far apart in sorted order can never be the closest pair — the nearest match is always the ' +
      'neighbour. So sort once, then check only adjacent pairs.',
    whatYouLearn: ['Why sorting exposes closest pairs', 'Reducing all-pairs work to a single neighbour scan'],
    solutions: {
      brute: variant(
        'Compare every pair of prices and keep the smallest difference.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'best = abs(p[0] - p[1])\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        best = min(best, abs(p[i] - p[j]))\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        int best = Integer.MAX_VALUE;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                best = Math.min(best, Math.abs(p[i] - p[j]));\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    int best = 2000000000;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++) {\n' +
            '            int d = abs(p[i] - p[j]);\n' +
            '            if (d < best) best = d;\n' +
            '        }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <cstdlib>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    int best = 2000000000;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            best = min(best, abs(p[i] - p[j]));\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Sort the prices, then the smallest gap is between some pair of neighbours — check only those.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = sorted(map(int, input().split()))\n' +
            'best = min(p[i + 1] - p[i] for i in range(n - 1))\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        Arrays.sort(p);\n' +
            '        int best = Integer.MAX_VALUE;\n' +
            '        for (int i = 0; i < n - 1; i++) best = Math.min(best, p[i + 1] - p[i]);\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    qsort(p, n, sizeof(int), cmp);\n' +
            '    int best = 2000000000;\n' +
            '    for (int i = 0; i < n - 1; i++)\n' +
            '        if (p[i + 1] - p[i] < best) best = p[i + 1] - p[i];\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    sort(p.begin(), p.end());\n' +
            '    int best = 2000000000;\n' +
            '    for (int i = 0; i < n - 1; i++) best = min(best, p[i + 1] - p[i]);\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Checking all pairs is n² and wasteful, because most pairs are obviously far apart. Sorting lines the prices up ' +
      'so that the closest match to any value sits right beside it. That guarantees the smallest difference is between ' +
      'two neighbours, so a single pass over sorted neighbours finds it — dominated only by the sort.',
    tip: 'When a problem is about "closest" or "nearest" values, try sorting first — it usually turns O(n²) into O(n log n).',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Counting & Grouping', topics: ['Arrays', 'Sorting', 'Hashing', 'Optimization'],
    title: 'Duplicate Order ID',
    description:
      'Every order in a system must have a unique ID. Given the list of order IDs generated today, decide whether ' +
      'any ID was accidentally repeated.\n\n' +
      'Print "Duplicate" if any ID appears more than once, otherwise print "All Unique".',
    inputFormat: 'Line 1: number of IDs N. Line 2: N order IDs.',
    outputFormat: 'Either "Duplicate" or "All Unique".',
    examples: [
      ex('5\n3 7 1 7 9', 'Duplicate', 'The ID 7 appears twice.'),
      ex('4\n1 2 3 4', 'All Unique', 'No ID repeats.'),
    ],
    hints: [
      'The slow way compares every pair of IDs.',
      'Sorting puts equal IDs next to each other; a set can spot a repeat the moment it happens.',
    ],
    approach:
      'Three clear stages of thinking. Brute force compares all pairs (O(n²)). Better: sort the IDs so duplicates ' +
      'sit side by side, then one neighbour scan finds them (O(n log n)). Best: add each ID to a set as you go and ' +
      'stop the instant you see one already there (O(n)).',
    whatYouLearn: ['Three ways to detect duplicates', 'Trading time for extra memory with a set'],
    solutions: trio(
      variant(
        'Compare every pair of IDs; if any two match, there is a duplicate.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'dup = False\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        if a[i] == a[j]:\n' +
            '            dup = True\n' +
            'print("Duplicate" if dup else "All Unique")',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        boolean dup = false;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                if (a[i] == a[j]) dup = true;\n' +
            '        System.out.println(dup ? "Duplicate" : "All Unique");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int dup = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] == a[j]) dup = 1;\n' +
            '    printf(dup ? "Duplicate\\n" : "All Unique\\n");\n' +
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
            '    for (auto &x : a) cin >> x;\n' +
            '    bool dup = false;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] == a[j]) dup = true;\n' +
            '    cout << (dup ? "Duplicate" : "All Unique") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Sort the IDs; any duplicate now sits right next to its twin, so one neighbour scan finds it.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = sorted(map(int, input().split()))\n' +
            'dup = any(a[i] == a[i + 1] for i in range(n - 1))\n' +
            'print("Duplicate" if dup else "All Unique")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        Arrays.sort(a);\n' +
            '        boolean dup = false;\n' +
            '        for (int i = 0; i < n - 1; i++) if (a[i] == a[i + 1]) dup = true;\n' +
            '        System.out.println(dup ? "Duplicate" : "All Unique");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int dup = 0;\n' +
            '    for (int i = 0; i < n - 1; i++) if (a[i] == a[i + 1]) dup = 1;\n' +
            '    printf(dup ? "Duplicate\\n" : "All Unique\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    sort(a.begin(), a.end());\n' +
            '    bool dup = false;\n' +
            '    for (int i = 0; i < n - 1; i++) if (a[i] == a[i + 1]) dup = true;\n' +
            '    cout << (dup ? "Duplicate" : "All Unique") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Add each ID to a set; the moment one is already present, you have found a duplicate.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'seen = set()\n' +
            'dup = False\n' +
            'for x in a:\n' +
            '    if x in seen:\n' +
            '        dup = True\n' +
            '        break\n' +
            '    seen.add(x)\n' +
            'print("Duplicate" if dup else "All Unique")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        Set<Integer> seen = new HashSet<>();\n' +
            '        boolean dup = false;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int x = sc.nextInt();\n' +
            '            if (!seen.add(x)) dup = true;\n' +
            '        }\n' +
            '        System.out.println(dup ? "Duplicate" : "All Unique");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// Without a built-in set, sorting a copy gives the same O(n log n) detection.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int dup = 0;\n' +
            '    for (int i = 0; i < n - 1; i++) if (a[i] == a[i + 1]) dup = 1;\n' +
            '    printf(dup ? "Duplicate\\n" : "All Unique\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <unordered_set>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    unordered_set<int> seen;\n' +
            '    bool dup = false;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int x;\n' +
            '        cin >> x;\n' +
            '        if (!seen.insert(x).second) dup = true;\n' +
            '    }\n' +
            '    cout << (dup ? "Duplicate" : "All Unique") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    ),
    explanation:
      'This one problem shows the whole optimization ladder. All-pairs comparison is simple but O(n²). Sorting groups ' +
      'equal IDs so a neighbour scan suffices — O(n log n). A hash set trades memory for speed, spotting a repeat the ' +
      'instant it reappears in O(n). Same answer, three trade-offs — and being able to explain them is the real skill.',
    tip: 'Duplicates? Set = fastest, sort = no extra structure, nested loops = only for tiny inputs.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Handling Records', topics: ['Loops', 'Conditions'],
    title: 'Delivery Charge Run',
    description:
      'A food app charges delivery per order based on the order amount:\n\n' +
      '- 500 or more → free delivery\n' +
      '- 300 to 499 → 20 rupees\n' +
      '- below 300 → 40 rupees\n\n' +
      'Given all of today\'s order amounts, print the total delivery charge collected.',
    inputFormat: 'Line 1: number of orders N. Line 2: N order amounts.',
    outputFormat: 'One integer: the total delivery charge across all orders.',
    examples: [
      ex('3\n600 400 250', '60', '600 → free, 400 → 20, 250 → 40. Total 60.'),
      ex('2\n500 100', '40', '500 → free, 100 → 40. Total 40.'),
    ],
    hints: [
      'Handle one order at a time and add its charge to a running total.',
      'Check the free tier first so you do not accidentally charge a large order.',
    ],
    approach:
      'This is one rule applied to many records, so a single loop is already optimal — there is nothing to speed up. ' +
      'For each order, decide its delivery charge from the bands and add it to a running total, then print the total.',
    whatYouLearn: ['Accumulating a running total in a loop', 'Recognising when one pass is already optimal'],
    solutions: solo(
      'Loop through the orders, add each order\'s delivery charge (by band) to a running total.',
      {
        python:
          'n = int(input())\n' +
          'orders = list(map(int, input().split()))\n' +
          'total = 0\n' +
          'for amount in orders:\n' +
          '    if amount >= 500:\n' +
          '        total += 0\n' +
          '    elif amount >= 300:\n' +
          '        total += 20\n' +
          '    else:\n' +
          '        total += 40\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt(), total = 0;\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            int amount = sc.nextInt();\n' +
          '            if (amount >= 500) total += 0;\n' +
          '            else if (amount >= 300) total += 20;\n' +
          '            else total += 40;\n' +
          '        }\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int amount;\n' +
          '        scanf("%d", &amount);\n' +
          '        if (amount >= 500) total += 0;\n' +
          '        else if (amount >= 300) total += 20;\n' +
          '        else total += 40;\n' +
          '    }\n' +
          '    printf("%d\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    cin >> n;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int amount;\n' +
          '        cin >> amount;\n' +
          '        if (amount >= 500) total += 0;\n' +
          '        else if (amount >= 300) total += 20;\n' +
          '        else total += 40;\n' +
          '    }\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Not every problem has a faster version — this one visits each order exactly once, which is the minimum possible. ' +
      'The skill here is clean accumulation: pick the right band per order and keep adding to one running total. ' +
      'Checking the free tier first avoids charging big orders by mistake.',
    tip: 'Part of optimization is knowing when you are already optimal. One pass over N records cannot be beaten.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Streaks & Windows', topics: ['Arrays', 'Prefix Sums'],
    title: 'Lowest Balance in a Month',
    description:
      'A bank account starts the month at balance 0. Each day there is a transaction — a positive number is a ' +
      'credit, a negative number is a debit.\n\n' +
      'Find the lowest the balance ever drops to at any point during the month.',
    inputFormat: 'Line 1: number of days N. Line 2: N signed integers (the daily transactions).',
    outputFormat: 'One integer: the lowest balance reached (may be negative or 0).',
    examples: [
      ex('4\n100 -150 50 -80', '-80', 'Balance goes 100 → -50 → 0 → -80. Lowest is -80.'),
      ex('4\n-10 5 -20 30', '-25', 'Balance goes -10 → -5 → -25 → 5. Lowest is -25.'),
    ],
    hints: [
      'Keep a running balance as you apply each transaction.',
      'After each day, check whether the new balance is the lowest so far.',
    ],
    approach:
      'Walk through the days once, keeping a running balance. Start tracking the lowest at 0 (the opening balance), ' +
      'then after applying each transaction, update the lowest if the balance has fallen further. One pass is all it takes.',
    whatYouLearn: ['Maintaining a running total (prefix sum)', 'Tracking a minimum as you go'],
    solutions: solo(
      'Apply transactions one by one to a running balance, tracking the lowest value seen (starting from 0).',
      {
        python:
          'n = int(input())\n' +
          'txns = list(map(int, input().split()))\n' +
          'balance = 0\n' +
          'lowest = 0\n' +
          'for t in txns:\n' +
          '    balance += t\n' +
          '    lowest = min(lowest, balance)\n' +
          'print(lowest)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int balance = 0, lowest = 0;\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            balance += sc.nextInt();\n' +
          '            lowest = Math.min(lowest, balance);\n' +
          '        }\n' +
          '        System.out.println(lowest);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int balance = 0, lowest = 0;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int t;\n' +
          '        scanf("%d", &t);\n' +
          '        balance += t;\n' +
          '        if (balance < lowest) lowest = balance;\n' +
          '    }\n' +
          '    printf("%d\\n", lowest);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <algorithm>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int balance = 0, lowest = 0;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        int t;\n' +
          '        cin >> t;\n' +
          '        balance += t;\n' +
          '        lowest = min(lowest, balance);\n' +
          '    }\n' +
          '    cout << lowest << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The balance after any day is just the sum of all transactions up to that day — a running total, or prefix sum. ' +
      'By comparing that running total against the lowest seen after every step, you capture the worst moment in a ' +
      'single pass. Starting the minimum at 0 correctly handles a month that never goes negative.',
    tip: 'Running totals answer "balance over time" questions. Pair one with a min/max tracker and most become one pass.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Prices & Discounts', topics: ['Hashing', 'Optimization'],
    title: 'Two Prices That Hit a Budget',
    description:
      'A customer wants to buy exactly two items whose prices add up to their budget.\n\n' +
      'Given the list of prices and the budget, print "Yes" if some pair of two different items adds up to the budget, ' +
      'otherwise "No".',
    inputFormat: 'Line 1: number of items N. Line 2: N prices. Line 3: the budget.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('4\n2 7 11 15\n9', 'Yes', '2 + 7 = 9 matches the budget.'),
      ex('4\n2 7 11 15\n100', 'No', 'No pair of prices adds up to 100.'),
    ],
    hints: [
      'The slow way tries every pair.',
      'The fast way remembers prices seen so far; for price p, its partner is (budget − p).',
    ],
    approach:
      'Brute force tests all pairs — O(n²). The optimal way scans once with a set of prices already seen: for each ' +
      'price p, the partner that would complete the budget is (budget − p). If that partner has been seen, you have a ' +
      'match; otherwise record p and continue.',
    whatYouLearn: ['The complement trick with a set', 'Turning an O(n²) pair search into O(n)'],
    solutions: {
      brute: variant(
        'Test every pair of items to see if any two prices add to the budget.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'budget = int(input())\n' +
            'found = False\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        if p[i] + p[j] == budget:\n' +
            '            found = True\n' +
            'print("Yes" if found else "No")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        int budget = sc.nextInt();\n' +
            '        boolean found = false;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                if (p[i] + p[j] == budget) found = true;\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    int budget, found = 0;\n' +
            '    scanf("%d", &budget);\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (p[i] + p[j] == budget) found = 1;\n' +
            '    printf(found ? "Yes\\n" : "No\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    int budget;\n' +
            '    cin >> budget;\n' +
            '    bool found = false;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (p[i] + p[j] == budget) found = true;\n' +
            '    cout << (found ? "Yes" : "No") << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Scan once with a set of seen prices; for each p, check whether (budget − p) was already seen.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'budget = int(input())\n' +
            'seen = set()\n' +
            'found = False\n' +
            'for x in p:\n' +
            '    if budget - x in seen:\n' +
            '        found = True\n' +
            '        break\n' +
            '    seen.add(x)\n' +
            'print("Yes" if found else "No")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        int budget = sc.nextInt();\n' +
            '        Set<Integer> seen = new HashSet<>();\n' +
            '        boolean found = false;\n' +
            '        for (int x : p) {\n' +
            '            if (seen.contains(budget - x)) { found = true; break; }\n' +
            '            seen.add(x);\n' +
            '        }\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// No hash set in C: sort, then use two pointers from both ends.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    int budget;\n' +
            '    scanf("%d", &budget);\n' +
            '    qsort(p, n, sizeof(int), cmp);\n' +
            '    int lo = 0, hi = n - 1, found = 0;\n' +
            '    while (lo < hi) {\n' +
            '        int s = p[lo] + p[hi];\n' +
            '        if (s == budget) { found = 1; break; }\n' +
            '        else if (s < budget) lo++;\n' +
            '        else hi--;\n' +
            '    }\n' +
            '    printf(found ? "Yes\\n" : "No\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <unordered_set>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    int budget;\n' +
            '    cin >> budget;\n' +
            '    unordered_set<int> seen;\n' +
            '    bool found = false;\n' +
            '    for (int x : p) {\n' +
            '        if (seen.count(budget - x)) { found = true; break; }\n' +
            '        seen.insert(x);\n' +
            '    }\n' +
            '    cout << (found ? "Yes" : "No") << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The pair-sum question is the poster child for the complement trick. Instead of pairing every price with every ' +
      'other, you ask "have I already seen the exact partner this price needs?" — a constant-time set lookup. That ' +
      'collapses the quadratic search into one pass. (In C, with no hash set, sorting plus two pointers reaches the same O(n log n) result.)',
    tip: 'For "any two that sum to X", remember seen values and look up the complement (X − current).',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Counting & Grouping', topics: ['Hashing', 'Optimization'],
    title: 'Two Orders a Fixed Gap Apart',
    description:
      'You are given a list of order amounts and a gap value D (D ≥ 1).\n\n' +
      'Print "Yes" if some two orders differ by exactly D, otherwise "No".',
    inputFormat: 'Line 1: number of orders N. Line 2: N amounts. Line 3: the gap D (a positive integer).',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('4\n1 5 9 3\n4', 'Yes', '5 − 1 = 4 (also 9 − 5 = 4).'),
      ex('4\n1 5 9 3\n10', 'No', 'No two amounts differ by 10.'),
    ],
    hints: [
      'The slow way checks every pair for the gap.',
      'The fast way stores all amounts in a set; for each x, look for x + D.',
    ],
    approach:
      'Brute force checks all pairs for the difference — O(n²). The optimal way puts every amount in a set, then for ' +
      'each amount x checks whether x + D also exists. Because D is positive, x + D is never x itself, so no special ' +
      'handling of self-pairs is needed.',
    whatYouLearn: ['Fixed-difference search with a set', 'Choosing x + D to avoid self-matches'],
    solutions: {
      brute: variant(
        'Check every pair to see if any differ by exactly D.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'd = int(input())\n' +
            'found = False\n' +
            'for i in range(n):\n' +
            '    for j in range(n):\n' +
            '        if i != j and abs(a[i] - a[j]) == d:\n' +
            '            found = True\n' +
            'print("Yes" if found else "No")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int d = sc.nextInt();\n' +
            '        boolean found = false;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = 0; j < n; j++)\n' +
            '                if (i != j && Math.abs(a[i] - a[j]) == d) found = true;\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int d, found = 0;\n' +
            '    scanf("%d", &d);\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = 0; j < n; j++)\n' +
            '            if (i != j && abs(a[i] - a[j]) == d) found = 1;\n' +
            '    printf(found ? "Yes\\n" : "No\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <cstdlib>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int d;\n' +
            '    cin >> d;\n' +
            '    bool found = false;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = 0; j < n; j++)\n' +
            '            if (i != j && abs(a[i] - a[j]) == d) found = true;\n' +
            '    cout << (found ? "Yes" : "No") << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Put all amounts in a set; for each x check whether x + D is present.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'd = int(input())\n' +
            's = set(a)\n' +
            'found = any((x + d) in s for x in a)\n' +
            'print("Yes" if found else "No")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        Set<Integer> s = new HashSet<>();\n' +
            '        for (int i = 0; i < n; i++) { a[i] = sc.nextInt(); s.add(a[i]); }\n' +
            '        int d = sc.nextInt();\n' +
            '        boolean found = false;\n' +
            '        for (int x : a) if (s.contains(x + d)) { found = true; break; }\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// No hash set in C: sort, then two pointers looking for a gap of exactly D.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int d;\n' +
            '    scanf("%d", &d);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int i = 0, j = 1, found = 0;\n' +
            '    while (j < n) {\n' +
            '        int diff = a[j] - a[i];\n' +
            '        if (i != j && diff == d) { found = 1; break; }\n' +
            '        else if (diff < d) j++;\n' +
            '        else { i++; if (i == j) j++; }\n' +
            '    }\n' +
            '    printf(found ? "Yes\\n" : "No\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <unordered_set>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    unordered_set<int> s;\n' +
            '    for (auto &x : a) { cin >> x; s.insert(x); }\n' +
            '    int d;\n' +
            '    cin >> d;\n' +
            '    bool found = false;\n' +
            '    for (int x : a) if (s.count(x + d)) { found = true; break; }\n' +
            '    cout << (found ? "Yes" : "No") << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Fixed-difference search is a cousin of pair-sum. Rather than comparing every pair, load the values into a set ' +
      'and ask, for each x, "does x + D exist?" — an O(1) lookup. Searching for x + D (not x − D) with a positive D ' +
      'guarantees you never accidentally pair an element with itself.',
    tip: 'For "two values differ by D", store all in a set and probe for x + D. Picking + avoids self-pairs when D > 0.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Counting & Grouping', topics: ['Hashing', 'Sorting', 'Optimization'],
    title: 'Longest Run of Consecutive IDs',
    description:
      'Given a list of order IDs (unsorted, possibly with duplicates), find the length of the longest run of ' +
      'consecutive integers present.\n\n' +
      'For example, if 1, 2, 3, 4 all appear, the run length is 4.',
    inputFormat: 'Line 1: number of IDs N. Line 2: N integers.',
    outputFormat: 'One integer: the length of the longest consecutive run.',
    examples: [
      ex('6\n100 4 200 1 3 2', '4', 'The IDs 1, 2, 3, 4 form the longest consecutive run.'),
      ex('3\n10 10 10', '1', 'Only the value 10 is present, so the run length is 1.'),
    ],
    hints: [
      'The brute way, for each value, walks upward counting how many consecutive values exist by searching.',
      'Sorting groups consecutive values together. A hash set lets each run be counted once in linear time.',
    ],
    approach:
      'Three levels. Brute: for each value, repeatedly search for value+1, value+2, ... — O(n²). Better: sort, then a ' +
      'single pass measures consecutive stretches — O(n log n). Best: put everything in a set and only start counting ' +
      'from values that have no predecessor (x−1 absent), so each run is counted once — O(n).',
    whatYouLearn: ['Progressing brute → sort → hash', 'Counting each run exactly once from its start'],
    solutions: trio(
      variant(
        'For each value, count upward (value, value+1, ...) by searching the list each step.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'best = 0\n' +
            'for x in a:\n' +
            '    length = 1\n' +
            '    while (x + length) in a:\n' +
            '        length += 1\n' +
            '    best = max(best, length)\n' +
            'print(best if n > 0 else 0)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int best = 0;\n' +
            '        for (int x : a) {\n' +
            '            int length = 1;\n' +
            '            while (contains(a, x + length)) length++;\n' +
            '            best = Math.max(best, length);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '    static boolean contains(int[] a, int v) {\n' +
            '        for (int x : a) if (x == v) return true;\n' +
            '        return false;\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int a[100000], n;\n' +
            'int contains(int v) { for (int i = 0; i < n; i++) if (a[i] == v) return 1; return 0; }\n' +
            'int main() {\n' +
            '    scanf("%d", &n);\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int length = 1;\n' +
            '        while (contains(a[i] + length)) length++;\n' +
            '        if (length > best) best = length;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
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
            '    for (auto &x : a) cin >> x;\n' +
            '    auto contains = [&](int v) { for (int x : a) if (x == v) return true; return false; };\n' +
            '    int best = 0;\n' +
            '    for (int x : a) {\n' +
            '        int length = 1;\n' +
            '        while (contains(x + length)) length++;\n' +
            '        best = max(best, length);\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Sort, then sweep once measuring consecutive stretches (skipping duplicates).',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = sorted(map(int, input().split()))\n' +
            'best = 1 if n > 0 else 0\n' +
            'cur = 1\n' +
            'for i in range(1, n):\n' +
            '    if a[i] == a[i - 1]:\n' +
            '        continue\n' +
            '    if a[i] == a[i - 1] + 1:\n' +
            '        cur += 1\n' +
            '    else:\n' +
            '        cur = 1\n' +
            '    best = max(best, cur)\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        Arrays.sort(a);\n' +
            '        int best = n > 0 ? 1 : 0, cur = 1;\n' +
            '        for (int i = 1; i < n; i++) {\n' +
            '            if (a[i] == a[i - 1]) continue;\n' +
            '            if (a[i] == a[i - 1] + 1) cur++; else cur = 1;\n' +
            '            best = Math.max(best, cur);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int best = n > 0 ? 1 : 0, cur = 1;\n' +
            '    for (int i = 1; i < n; i++) {\n' +
            '        if (a[i] == a[i - 1]) continue;\n' +
            '        if (a[i] == a[i - 1] + 1) cur++; else cur = 1;\n' +
            '        if (cur > best) best = cur;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    sort(a.begin(), a.end());\n' +
            '    int best = n > 0 ? 1 : 0, cur = 1;\n' +
            '    for (int i = 1; i < n; i++) {\n' +
            '        if (a[i] == a[i - 1]) continue;\n' +
            '        if (a[i] == a[i - 1] + 1) cur++; else cur = 1;\n' +
            '        best = max(best, cur);\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Use a set; start counting only from run-starts (x−1 absent), so each run is measured once.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = set(map(int, input().split()))\n' +
            'best = 0\n' +
            'for x in a:\n' +
            '    if x - 1 not in a:\n' +
            '        length = 1\n' +
            '        while x + length in a:\n' +
            '            length += 1\n' +
            '        best = max(best, length)\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        Set<Integer> a = new HashSet<>();\n' +
            '        for (int i = 0; i < n; i++) a.add(sc.nextInt());\n' +
            '        int best = 0;\n' +
            '        for (int x : a) {\n' +
            '            if (!a.contains(x - 1)) {\n' +
            '                int length = 1;\n' +
            '                while (a.contains(x + length)) length++;\n' +
            '                best = Math.max(best, length);\n' +
            '            }\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// C has no hash set; sorting achieves the same single-pass run measurement.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int best = n > 0 ? 1 : 0, cur = 1;\n' +
            '    for (int i = 1; i < n; i++) {\n' +
            '        if (a[i] == a[i - 1]) continue;\n' +
            '        if (a[i] == a[i - 1] + 1) cur++; else cur = 1;\n' +
            '        if (cur > best) best = cur;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <unordered_set>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    unordered_set<int> a;\n' +
            '    for (int i = 0; i < n; i++) { int x; cin >> x; a.insert(x); }\n' +
            '    int best = 0;\n' +
            '    for (int x : a) {\n' +
            '        if (!a.count(x - 1)) {\n' +
            '            int length = 1;\n' +
            '            while (a.count(x + length)) length++;\n' +
            '            best = max(best, length);\n' +
            '        }\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    ),
    explanation:
      'This problem shows a clean brute → sort → hash progression. Brute force re-searches for every next value. ' +
      'Sorting makes consecutive numbers neighbours so one sweep suffices. The hash-set trick is cleverest: by only ' +
      'starting a count where a run begins (no x−1 present), every element is visited a constant number of times, ' +
      'giving true linear time.',
    tip: 'Only start measuring a run from its beginning (predecessor absent) — that is what makes the hash solution O(n).',
  },
  {
    track: T, level: 'ADVANCED', category: 'Counting & Grouping', topics: ['Prefix Sums', 'Hashing', 'Optimization'],
    title: 'Count Order Windows Summing to K',
    description:
      'Given daily order counts (which may be positive or negative adjustments) and a target K, count how many ' +
      'contiguous stretches of days have amounts adding up to exactly K.',
    inputFormat: 'Line 1: number of days N. Line 2: N integers. Line 3: the target K.',
    outputFormat: 'One integer: the number of contiguous stretches summing to K.',
    examples: [
      ex('3\n1 1 1\n2', '2', 'Days [1,2] and [2,3] each sum to 2.'),
      ex('5\n3 4 7 2 -3\n7', '2', 'The stretch [3,4] and the single day [7] both sum to 7.'),
    ],
    hints: [
      'The slow way adds up every possible stretch.',
      'The fast way uses running (prefix) sums: a stretch sums to K when two prefix sums differ by K.',
    ],
    approach:
      'Brute force sums every contiguous stretch — O(n²). The optimal way keeps a running total and a count of how ' +
      'often each running total has occurred. A stretch ending here sums to K exactly when (runningTotal − K) has ' +
      'been seen before, so add that count. This handles negatives correctly, which sliding windows cannot.',
    whatYouLearn: ['Prefix sums with a hash map', 'Why this beats a sliding window when negatives exist'],
    solutions: {
      brute: variant(
        'Try every start and end, summing each contiguous stretch.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'k = int(input())\n' +
            'count = 0\n' +
            'for i in range(n):\n' +
            '    s = 0\n' +
            '    for j in range(i, n):\n' +
            '        s += a[j]\n' +
            '        if s == k:\n' +
            '            count += 1\n' +
            'print(count)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int k = sc.nextInt(), count = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            long s = 0;\n' +
            '            for (int j = i; j < n; j++) { s += a[j]; if (s == k) count++; }\n' +
            '        }\n' +
            '        System.out.println(count);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int k, count = 0;\n' +
            '    scanf("%d", &k);\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long s = 0;\n' +
            '        for (int j = i; j < n; j++) { s += a[j]; if (s == k) count++; }\n' +
            '    }\n' +
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
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int k, count = 0;\n' +
            '    cin >> k;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long s = 0;\n' +
            '        for (int j = i; j < n; j++) { s += a[j]; if (s == k) count++; }\n' +
            '    }\n' +
            '    cout << count << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Keep a running total and a count of each total seen; add how often (total − K) has appeared.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'k = int(input())\n' +
            'seen = {0: 1}\n' +
            'total = 0\n' +
            'count = 0\n' +
            'for x in a:\n' +
            '    total += x\n' +
            '    count += seen.get(total - k, 0)\n' +
            '    seen[total] = seen.get(total, 0) + 1\n' +
            'print(count)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int k = sc.nextInt();\n' +
            '        HashMap<Long, Integer> seen = new HashMap<>();\n' +
            '        seen.put(0L, 1);\n' +
            '        long total = 0;\n' +
            '        long count = 0;\n' +
            '        for (int x : a) {\n' +
            '            total += x;\n' +
            '            count += seen.getOrDefault(total - k, 0);\n' +
            '            seen.merge(total, 1, Integer::sum);\n' +
            '        }\n' +
            '        System.out.println(count);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// Prefix sums sorted: equal prefix-differences of K become adjacency after sorting the needed keys.\n' +
            '// Simpler robust approach in C: O(n^2) prefix comparison, which is clear and correct.\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    static long pre[100001];\n' +
            '    pre[0] = 0;\n' +
            '    for (int i = 1; i <= n; i++) { int x; scanf("%d", &x); pre[i] = pre[i - 1] + x; }\n' +
            '    int k; scanf("%d", &k);\n' +
            '    long count = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j <= n; j++)\n' +
            '            if (pre[j] - pre[i] == k) count++;\n' +
            '    printf("%ld\\n", count);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <unordered_map>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int k;\n' +
            '    cin >> k;\n' +
            '    unordered_map<long, int> seen;\n' +
            '    seen[0] = 1;\n' +
            '    long total = 0, count = 0;\n' +
            '    for (int x : a) {\n' +
            '        total += x;\n' +
            '        count += seen[total - k];\n' +
            '        seen[total]++;\n' +
            '    }\n' +
            '    cout << count << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'A contiguous stretch sums to K exactly when two running totals differ by K. By recording how many times each ' +
      'running total has occurred (starting with total 0 seen once, for stretches that begin at day one), every day ' +
      'you can instantly add how many earlier positions complete a K-sum ending here. Because it relies on prefix ' +
      'sums rather than shrinking a window, it stays correct even with negative values.',
    tip: 'Prefix-sum + hash counts K-sum subarrays in O(n) and, unlike sliding windows, works with negatives.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Streaks & Windows', topics: ['Sliding Window', 'Two Pointers', 'Optimization'],
    title: 'Fewest Days to Hit a Sales Target',
    description:
      'Daily sales are given as a list of positive numbers. Find the fewest number of consecutive days whose sales add ' +
      'up to at least the target.\n\n' +
      'Print that smallest length, or 0 if no stretch reaches the target.',
    inputFormat: 'Line 1: number of days N. Line 2: N positive numbers. Line 3: the target.',
    outputFormat: 'One integer: the smallest number of consecutive days, or 0.',
    examples: [
      ex('6\n2 3 1 2 4 3\n7', '2', 'The two days [4, 3] already reach 7 — no shorter stretch does.'),
      ex('3\n1 1 1\n10', '0', 'Even all days together fall short of 10.'),
    ],
    hints: [
      'The slow way tries every starting day and extends until the target is reached.',
      'Because all values are positive, a sliding window can grow on the right and shrink on the left.',
    ],
    approach:
      'Brute force fixes each start and extends until the sum reaches the target — O(n²). The optimal sliding window ' +
      'grows to the right adding sales, and whenever the sum is at least the target it records the length and shrinks ' +
      'from the left. Since values are positive, shrinking always lowers the sum, so the window never misses the smallest answer.',
    whatYouLearn: ['Variable-size sliding window', 'Why positivity makes the window valid'],
    solutions: {
      brute: variant(
        'For each start day, extend forward until the running sum reaches the target; track the smallest length.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'best = n + 1\n' +
            'for i in range(n):\n' +
            '    s = 0\n' +
            '    for j in range(i, n):\n' +
            '        s += a[j]\n' +
            '        if s >= target:\n' +
            '            best = min(best, j - i + 1)\n' +
            '            break\n' +
            'print(0 if best == n + 1 else best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt(), best = n + 1;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            long s = 0;\n' +
            '            for (int j = i; j < n; j++) { s += a[j]; if (s >= target) { best = Math.min(best, j - i + 1); break; } }\n' +
            '        }\n' +
            '        System.out.println(best == n + 1 ? 0 : best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int target, best = n + 1;\n' +
            '    scanf("%d", &target);\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long s = 0;\n' +
            '        for (int j = i; j < n; j++) { s += a[j]; if (s >= target) { if (j - i + 1 < best) best = j - i + 1; break; } }\n' +
            '    }\n' +
            '    printf("%d\\n", best == n + 1 ? 0 : best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int target, best = n + 1;\n' +
            '    cin >> target;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long s = 0;\n' +
            '        for (int j = i; j < n; j++) { s += a[j]; if (s >= target) { best = min(best, j - i + 1); break; } }\n' +
            '    }\n' +
            '    cout << (best == n + 1 ? 0 : best) << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Grow a window on the right; while the sum ≥ target, record the length and shrink from the left.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'left = 0\n' +
            's = 0\n' +
            'best = n + 1\n' +
            'for right in range(n):\n' +
            '    s += a[right]\n' +
            '    while s >= target:\n' +
            '        best = min(best, right - left + 1)\n' +
            '        s -= a[left]\n' +
            '        left += 1\n' +
            'print(0 if best == n + 1 else best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt(), left = 0, best = n + 1;\n' +
            '        long s = 0;\n' +
            '        for (int right = 0; right < n; right++) {\n' +
            '            s += a[right];\n' +
            '            while (s >= target) { best = Math.min(best, right - left + 1); s -= a[left]; left++; }\n' +
            '        }\n' +
            '        System.out.println(best == n + 1 ? 0 : best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int target, left = 0, best;\n' +
            '    scanf("%d", &target);\n' +
            '    best = n + 1;\n' +
            '    long s = 0;\n' +
            '    for (int right = 0; right < n; right++) {\n' +
            '        s += a[right];\n' +
            '        while (s >= target) { if (right - left + 1 < best) best = right - left + 1; s -= a[left]; left++; }\n' +
            '    }\n' +
            '    printf("%d\\n", best == n + 1 ? 0 : best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int target, left = 0, best;\n' +
            '    cin >> target;\n' +
            '    best = n + 1;\n' +
            '    long s = 0;\n' +
            '    for (int right = 0; right < n; right++) {\n' +
            '        s += a[right];\n' +
            '        while (s >= target) { best = min(best, right - left + 1); s -= a[left]; left++; }\n' +
            '    }\n' +
            '    cout << (best == n + 1 ? 0 : best) << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The sliding window earns its speed from positivity: adding a day can only raise the sum, and removing one can ' +
      'only lower it. So you expand until you qualify, then trim from the left to find the tightest window ending at ' +
      'each point. Each index enters and leaves the window once, giving linear time versus the quadratic brute force.',
    tip: 'Variable-size sliding windows work when values are positive — grow to qualify, shrink to minimise.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Streaks & Windows', topics: ['Sliding Window', 'Hashing', 'Optimization'],
    title: 'Longest Stretch of Unique Items',
    description:
      'Given a string of item codes (single characters), find the length of the longest stretch that contains no ' +
      'repeated character.',
    inputFormat: 'One line: a string of characters (no spaces).',
    outputFormat: 'One integer: the length of the longest stretch with all distinct characters.',
    examples: [
      ex('abcabcbb', '3', '"abc" is the longest stretch without a repeat.'),
      ex('bbbb', '1', 'Every character is the same, so the best is a single character.'),
    ],
    hints: [
      'The slow way checks every stretch for duplicates.',
      'The fast way slides a window, remembering where each character was last seen.',
    ],
    approach:
      'Brute force examines each starting point and extends while characters stay unique — O(n²). The optimal sliding ' +
      'window remembers the last position of every character; when a repeat falls inside the current window, jump the ' +
      'left edge just past the earlier copy. The window then always holds a duplicate-free stretch, measured in one pass.',
    whatYouLearn: ['Sliding window with last-seen positions', 'Jumping the left edge past a repeat'],
    solutions: {
      brute: variant(
        'For each start, extend while characters remain unique (tracked in a set).',
        'O(n^2)', 'O(n)',
        {
          python:
            's = input().strip()\n' +
            'n = len(s)\n' +
            'best = 0\n' +
            'for i in range(n):\n' +
            '    seen = set()\n' +
            '    for j in range(i, n):\n' +
            '        if s[j] in seen:\n' +
            '            break\n' +
            '        seen.add(s[j])\n' +
            '        best = max(best, j - i + 1)\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        String s = new Scanner(System.in).next();\n' +
            '        int n = s.length(), best = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            Set<Character> seen = new HashSet<>();\n' +
            '            for (int j = i; j < n; j++) {\n' +
            '                if (seen.contains(s.charAt(j))) break;\n' +
            '                seen.add(s.charAt(j));\n' +
            '                best = Math.max(best, j - i + 1);\n' +
            '            }\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <string.h>\n\n' +
            'int main() {\n' +
            '    char s[100005];\n' +
            '    scanf("%s", s);\n' +
            '    int n = strlen(s), best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int seen[128] = {0};\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            if (seen[(int)s[j]]) break;\n' +
            '            seen[(int)s[j]] = 1;\n' +
            '            if (j - i + 1 > best) best = j - i + 1;\n' +
            '        }\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <string>\n' +
            '#include <unordered_set>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    string s;\n' +
            '    cin >> s;\n' +
            '    int n = s.size(), best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        unordered_set<char> seen;\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            if (seen.count(s[j])) break;\n' +
            '            seen.insert(s[j]);\n' +
            '            best = max(best, j - i + 1);\n' +
            '        }\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Slide a window; on a repeat inside it, move the left edge just past the earlier occurrence.',
        'O(n)', 'O(1)',
        {
          python:
            's = input().strip()\n' +
            'last = {}\n' +
            'left = 0\n' +
            'best = 0\n' +
            'for right, ch in enumerate(s):\n' +
            '    if ch in last and last[ch] >= left:\n' +
            '        left = last[ch] + 1\n' +
            '    last[ch] = right\n' +
            '    best = max(best, right - left + 1)\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        String s = new Scanner(System.in).next();\n' +
            '        int[] last = new int[128];\n' +
            '        Arrays.fill(last, -1);\n' +
            '        int left = 0, best = 0;\n' +
            '        for (int right = 0; right < s.length(); right++) {\n' +
            '            char ch = s.charAt(right);\n' +
            '            if (last[ch] >= left) left = last[ch] + 1;\n' +
            '            last[ch] = right;\n' +
            '            best = Math.max(best, right - left + 1);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <string.h>\n\n' +
            'int main() {\n' +
            '    char s[100005];\n' +
            '    scanf("%s", s);\n' +
            '    int n = strlen(s), last[128], left = 0, best = 0;\n' +
            '    for (int i = 0; i < 128; i++) last[i] = -1;\n' +
            '    for (int right = 0; right < n; right++) {\n' +
            '        int ch = (int)s[right];\n' +
            '        if (last[ch] >= left) left = last[ch] + 1;\n' +
            '        last[ch] = right;\n' +
            '        if (right - left + 1 > best) best = right - left + 1;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <string>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    string s;\n' +
            '    cin >> s;\n' +
            '    vector<int> last(128, -1);\n' +
            '    int left = 0, best = 0;\n' +
            '    for (int right = 0; right < (int)s.size(); right++) {\n' +
            '        int ch = (int)s[right];\n' +
            '        if (last[ch] >= left) left = last[ch] + 1;\n' +
            '        last[ch] = right;\n' +
            '        best = max(best, right - left + 1);\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The clever part of the optimal version is never moving the left edge backward. By storing each character\'s last ' +
      'seen index, a repeat lets you jump the window start forward in one move rather than re-scanning. Every index is ' +
      'visited once by each edge, so the whole thing is linear — a big win over re-checking every stretch.',
    tip: 'Track "last seen index" so the window\'s left edge can jump forward instead of crawling back.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Counting & Grouping', topics: ['Prefix Sums', 'Optimization'],
    title: 'Fast Range Sales Totals',
    description:
      'You have daily sales for N days and must answer several queries. Each query asks for the total sales between ' +
      'two days (inclusive, 1-based).\n\n' +
      'Print the answer to each query on its own line.',
    inputFormat: 'Line 1: N. Line 2: N numbers. Line 3: number of queries Q. Next Q lines: two integers L and R.',
    outputFormat: 'Q lines: the sum of days L..R for each query.',
    examples: [
      ex('5\n1 2 3 4 5\n2\n1 3\n2 5', '6\n14', 'Days 1–3 sum to 6; days 2–5 sum to 14.'),
      ex('3\n10 20 30\n1\n2 2', '20', 'A single-day range returns that day\'s sales.'),
    ],
    hints: [
      'The slow way re-adds the range for every query.',
      'Precompute prefix sums once so each query is a single subtraction.',
    ],
    approach:
      'Brute force loops over each query\'s range and adds it up — costly when there are many queries. The optimal way ' +
      'builds a prefix-sum array once, where prefix[i] is the total of the first i days. Then any range L..R is ' +
      'prefix[R] − prefix[L−1], answered in constant time.',
    whatYouLearn: ['Precomputation to speed up repeated queries', 'Prefix-sum range formula'],
    solutions: {
      brute: variant(
        'For each query, loop over L..R and add the values.',
        'O(n*q)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'q = int(input())\n' +
            'out = []\n' +
            'for _ in range(q):\n' +
            '    l, r = map(int, input().split())\n' +
            '    out.append(str(sum(a[l - 1:r])))\n' +
            'print("\\n".join(out))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int q = sc.nextInt();\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int t = 0; t < q; t++) {\n' +
            '            int l = sc.nextInt(), r = sc.nextInt();\n' +
            '            long s = 0;\n' +
            '            for (int i = l - 1; i < r; i++) s += a[i];\n' +
            '            sb.append(s).append(\'\\n\');\n' +
            '        }\n' +
            '        System.out.print(sb);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int q;\n' +
            '    scanf("%d", &q);\n' +
            '    for (int t = 0; t < q; t++) {\n' +
            '        int l, r;\n' +
            '        scanf("%d %d", &l, &r);\n' +
            '        long s = 0;\n' +
            '        for (int i = l - 1; i < r; i++) s += a[i];\n' +
            '        printf("%ld\\n", s);\n' +
            '    }\n' +
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
            '    for (auto &x : a) cin >> x;\n' +
            '    int q;\n' +
            '    cin >> q;\n' +
            '    while (q--) {\n' +
            '        int l, r;\n' +
            '        cin >> l >> r;\n' +
            '        long s = 0;\n' +
            '        for (int i = l - 1; i < r; i++) s += a[i];\n' +
            '        cout << s << "\\n";\n' +
            '    }\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Build prefix sums once; answer each query as prefix[R] − prefix[L−1].',
        'O(n + q)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'pre = [0] * (n + 1)\n' +
            'for i in range(n):\n' +
            '    pre[i + 1] = pre[i] + a[i]\n' +
            'q = int(input())\n' +
            'out = []\n' +
            'for _ in range(q):\n' +
            '    l, r = map(int, input().split())\n' +
            '    out.append(str(pre[r] - pre[l - 1]))\n' +
            'print("\\n".join(out))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        long[] pre = new long[n + 1];\n' +
            '        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + sc.nextInt();\n' +
            '        int q = sc.nextInt();\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int t = 0; t < q; t++) {\n' +
            '            int l = sc.nextInt(), r = sc.nextInt();\n' +
            '            sb.append(pre[r] - pre[l - 1]).append(\'\\n\');\n' +
            '        }\n' +
            '        System.out.print(sb);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    static long pre[100001];\n' +
            '    for (int i = 1; i <= n; i++) { int x; scanf("%d", &x); pre[i] = pre[i - 1] + x; }\n' +
            '    int q;\n' +
            '    scanf("%d", &q);\n' +
            '    for (int t = 0; t < q; t++) {\n' +
            '        int l, r;\n' +
            '        scanf("%d %d", &l, &r);\n' +
            '        printf("%ld\\n", pre[r] - pre[l - 1]);\n' +
            '    }\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<long> pre(n + 1, 0);\n' +
            '    for (int i = 0; i < n; i++) { int x; cin >> x; pre[i + 1] = pre[i] + x; }\n' +
            '    int q;\n' +
            '    cin >> q;\n' +
            '    while (q--) {\n' +
            '        int l, r;\n' +
            '        cin >> l >> r;\n' +
            '        cout << pre[r] - pre[l - 1] << "\\n";\n' +
            '    }\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'When the same array is queried many times, precomputing pays off. A prefix-sum array turns each range total into ' +
      'one subtraction: everything up to R minus everything up to L−1. The one-time O(n) build is dwarfed by answering ' +
      'thousands of queries in O(1) each — a fundamental idea behind fast analytics and range data structures.',
    tip: 'Repeated range-sum queries? Build prefix sums once, then each answer is prefix[R] − prefix[L−1].',
  },
  {
    track: T, level: 'ADVANCED', category: 'Counting & Grouping', topics: ['Prefix Products', 'Optimization'],
    title: 'Sales Product Except Each Day',
    description:
      'For each day, compute the product of the sales of ALL other days (everything except that day).\n\n' +
      'Print the resulting list. (Assume no day is zero.)',
    inputFormat: 'Line 1: number of days N. Line 2: N positive numbers.',
    outputFormat: 'N numbers: for each position, the product of all the others, space separated.',
    examples: [
      ex('4\n1 2 3 4', '24 12 8 6', 'Position 1: 2×3×4=24. Position 2: 1×3×4=12, and so on.'),
      ex('3\n2 5 10', '50 20 10', 'Each output is the total product (100) divided among the others.'),
    ],
    hints: [
      'The slow way multiplies all the other values for each position.',
      'Prefix products (everything before) times suffix products (everything after) give each answer without division.',
    ],
    approach:
      'Brute force multiplies every other element for each position — O(n²). A cleaner O(n) way stores prefix products ' +
      '(product of everything to the left) and suffix products (everything to the right); each answer is their ' +
      'product. The best version keeps only the output array plus a running value, achieving O(1) extra space.',
    whatYouLearn: ['Prefix and suffix products', 'Shrinking two helper arrays down to O(1) extra space'],
    solutions: trio(
      variant(
        'For each position, multiply together all the other values.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'res = []\n' +
            'for i in range(n):\n' +
            '    p = 1\n' +
            '    for j in range(n):\n' +
            '        if j != i:\n' +
            '            p *= a[j]\n' +
            '    res.append(str(p))\n' +
            'print(" ".join(res))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        long[] a = new long[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            long p = 1;\n' +
            '            for (int j = 0; j < n; j++) if (j != i) p *= a[j];\n' +
            '            if (i > 0) sb.append(\' \'); sb.append(p);\n' +
            '        }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    long a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%ld", &a[i]);\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long p = 1;\n' +
            '        for (int j = 0; j < n; j++) if (j != i) p *= a[j];\n' +
            '        if (i > 0) printf(" "); printf("%ld", p);\n' +
            '    }\n' +
            '    printf("\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<long> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long p = 1;\n' +
            '        for (int j = 0; j < n; j++) if (j != i) p *= a[j];\n' +
            '        if (i > 0) cout << " "; cout << p;\n' +
            '    }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Build prefix products and suffix products in two arrays; multiply them per position.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'pre = [1] * n\n' +
            'suf = [1] * n\n' +
            'for i in range(1, n):\n' +
            '    pre[i] = pre[i - 1] * a[i - 1]\n' +
            'for i in range(n - 2, -1, -1):\n' +
            '    suf[i] = suf[i + 1] * a[i + 1]\n' +
            'print(" ".join(str(pre[i] * suf[i]) for i in range(n)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        long[] a = new long[n], pre = new long[n], suf = new long[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        pre[0] = 1; suf[n - 1] = 1;\n' +
            '        for (int i = 1; i < n; i++) pre[i] = pre[i - 1] * a[i - 1];\n' +
            '        for (int i = n - 2; i >= 0; i--) suf[i] = suf[i + 1] * a[i + 1];\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int i = 0; i < n; i++) { if (i > 0) sb.append(\' \'); sb.append(pre[i] * suf[i]); }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    long a[100000], pre[100000], suf[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%ld", &a[i]);\n' +
            '    pre[0] = 1; suf[n - 1] = 1;\n' +
            '    for (int i = 1; i < n; i++) pre[i] = pre[i - 1] * a[i - 1];\n' +
            '    for (int i = n - 2; i >= 0; i--) suf[i] = suf[i + 1] * a[i + 1];\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) printf(" "); printf("%ld", pre[i] * suf[i]); }\n' +
            '    printf("\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<long> a(n), pre(n, 1), suf(n, 1);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    for (int i = 1; i < n; i++) pre[i] = pre[i - 1] * a[i - 1];\n' +
            '    for (int i = n - 2; i >= 0; i--) suf[i] = suf[i + 1] * a[i + 1];\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << pre[i] * suf[i]; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Fill the result with prefix products, then multiply by suffix products in a second pass using one running value.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'res = [1] * n\n' +
            'p = 1\n' +
            'for i in range(n):\n' +
            '    res[i] = p\n' +
            '    p *= a[i]\n' +
            'p = 1\n' +
            'for i in range(n - 1, -1, -1):\n' +
            '    res[i] *= p\n' +
            '    p *= a[i]\n' +
            'print(" ".join(map(str, res)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        long[] a = new long[n], res = new long[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        long p = 1;\n' +
            '        for (int i = 0; i < n; i++) { res[i] = p; p *= a[i]; }\n' +
            '        p = 1;\n' +
            '        for (int i = n - 1; i >= 0; i--) { res[i] *= p; p *= a[i]; }\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int i = 0; i < n; i++) { if (i > 0) sb.append(\' \'); sb.append(res[i]); }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    long a[100000], res[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%ld", &a[i]);\n' +
            '    long p = 1;\n' +
            '    for (int i = 0; i < n; i++) { res[i] = p; p *= a[i]; }\n' +
            '    p = 1;\n' +
            '    for (int i = n - 1; i >= 0; i--) { res[i] *= p; p *= a[i]; }\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) printf(" "); printf("%ld", res[i]); }\n' +
            '    printf("\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<long> a(n), res(n, 1);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    long p = 1;\n' +
            '    for (int i = 0; i < n; i++) { res[i] = p; p *= a[i]; }\n' +
            '    p = 1;\n' +
            '    for (int i = n - 1; i >= 0; i--) { res[i] *= p; p *= a[i]; }\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << res[i]; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    ),
    explanation:
      'The product of everything except position i is simply (product of the left part) × (product of the right part). ' +
      'The two-array version makes that explicit; the O(1) version realises the left products can be written straight ' +
      'into the answer, then a single reverse pass multiplies in the right products using one running variable. It ' +
      'avoids division, so it still works even if a value were zero.',
    tip: 'Prefix × suffix removes the "current element" cleanly — and folding both into the output array saves space.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Two Pointers', topics: ['Two Pointers', 'Optimization'],
    title: 'Largest Water Tank Between Walls',
    description:
      'Wall heights are given left to right. Choosing two walls, the water they can hold is the shorter wall\'s height ' +
      'times the distance between them.\n\n' +
      'Print the maximum water any two walls can hold.',
    inputFormat: 'Line 1: number of walls N. Line 2: N heights.',
    outputFormat: 'One integer: the maximum water that can be held.',
    examples: [
      ex('9\n1 8 6 2 5 4 8 3 7', '49', 'Walls of height 8 and 7, seven apart: min(8,7)×7 = 49.'),
      ex('2\n1 1', '1', 'Two walls one apart: min(1,1)×1 = 1.'),
    ],
    hints: [
      'The slow way tries every pair of walls.',
      'Start with the widest pair and move the shorter wall inward — its height is the limiting factor.',
    ],
    approach:
      'Brute force checks all pairs — O(n²). The optimal way puts two pointers at the ends (the widest span) and always ' +
      'moves the shorter wall inward. Because width only shrinks, the only hope for more water is a taller limiting ' +
      'wall, and the shorter side is the one holding you back — so moving it is the right greedy choice.',
    whatYouLearn: ['Two-pointer greedy on width vs height', 'Why moving the shorter wall is safe'],
    solutions: {
      brute: variant(
        'Compute the water for every pair of walls and keep the maximum.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'h = list(map(int, input().split()))\n' +
            'best = 0\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        area = min(h[i], h[j]) * (j - i)\n' +
            '        best = max(best, area)\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] h = new int[n];\n' +
            '        for (int i = 0; i < n; i++) h[i] = sc.nextInt();\n' +
            '        int best = 0;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                best = Math.max(best, Math.min(h[i], h[j]) * (j - i));\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int h[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &h[i]);\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++) {\n' +
            '            int m = h[i] < h[j] ? h[i] : h[j];\n' +
            '            int area = m * (j - i);\n' +
            '            if (area > best) best = area;\n' +
            '        }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> h(n);\n' +
            '    for (auto &x : h) cin >> x;\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            best = max(best, min(h[i], h[j]) * (j - i));\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Two pointers at the ends; compute water, then move the pointer at the shorter wall inward.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'h = list(map(int, input().split()))\n' +
            'lo, hi = 0, n - 1\n' +
            'best = 0\n' +
            'while lo < hi:\n' +
            '    area = min(h[lo], h[hi]) * (hi - lo)\n' +
            '    best = max(best, area)\n' +
            '    if h[lo] < h[hi]:\n' +
            '        lo += 1\n' +
            '    else:\n' +
            '        hi -= 1\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] h = new int[n];\n' +
            '        for (int i = 0; i < n; i++) h[i] = sc.nextInt();\n' +
            '        int lo = 0, hi = n - 1, best = 0;\n' +
            '        while (lo < hi) {\n' +
            '            best = Math.max(best, Math.min(h[lo], h[hi]) * (hi - lo));\n' +
            '            if (h[lo] < h[hi]) lo++; else hi--;\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int h[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &h[i]);\n' +
            '    int lo = 0, hi = n - 1, best = 0;\n' +
            '    while (lo < hi) {\n' +
            '        int m = h[lo] < h[hi] ? h[lo] : h[hi];\n' +
            '        int area = m * (hi - lo);\n' +
            '        if (area > best) best = area;\n' +
            '        if (h[lo] < h[hi]) lo++; else hi--;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> h(n);\n' +
            '    for (auto &x : h) cin >> x;\n' +
            '    int lo = 0, hi = n - 1, best = 0;\n' +
            '    while (lo < hi) {\n' +
            '        best = max(best, min(h[lo], h[hi]) * (hi - lo));\n' +
            '        if (h[lo] < h[hi]) lo++; else hi--;\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Water held is limited by the shorter wall and the width between the pair. Starting at maximum width, moving the ' +
      'shorter wall inward is safe: keeping it and shrinking width could never beat the current area, since the short ' +
      'wall still caps the height. Each step discards a wall that cannot be part of a better answer, so one linear pass suffices.',
    tip: 'Two-pointer greedy: when the bound comes from the smaller side, advance that side — the larger side can wait.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Two Pointers', topics: ['Two Pointers', 'Sorting', 'Optimization'],
    title: 'Two Prices Closest to a Budget',
    description:
      'A shopper wants two items whose combined price is as close as possible to their budget (over or under is fine).\n\n' +
      'Given the prices and the budget, print the closest achievable sum of any two different items.',
    inputFormat: 'Line 1: number of items N. Line 2: N prices. Line 3: the budget.',
    outputFormat: 'One integer: the pair sum closest to the budget.',
    examples: [
      ex('5\n1 3 4 7 10\n15', '14', '4 + 10 = 14 is closest to 15 (distance 1).'),
      ex('4\n5 5 5 5\n11', '10', 'The only possible pair sum is 10, distance 1 from 11.'),
    ],
    hints: [
      'The slow way checks every pair and tracks the closest sum.',
      'Sort, then use two pointers: if the sum is under budget move left up, if over move right down.',
    ],
    approach:
      'Brute force compares all pairs against the budget — O(n²). The optimal way sorts the prices and walks two ' +
      'pointers inward from the ends. If the current sum is below the budget, raising the low pointer increases it; if ' +
      'above, lowering the high pointer decreases it. Track the sum with the smallest distance to the budget throughout.',
    whatYouLearn: ['Two pointers on a sorted array', 'Tracking a closest-so-far target'],
    solutions: {
      brute: variant(
        'Try every pair, keeping the sum with the smallest distance to the budget.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = list(map(int, input().split()))\n' +
            'budget = int(input())\n' +
            'best = p[0] + p[1]\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        s = p[i] + p[j]\n' +
            '        if abs(s - budget) < abs(best - budget):\n' +
            '            best = s\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        int budget = sc.nextInt();\n' +
            '        int best = p[0] + p[1];\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++) {\n' +
            '                int s = p[i] + p[j];\n' +
            '                if (Math.abs(s - budget) < Math.abs(best - budget)) best = s;\n' +
            '            }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    int budget;\n' +
            '    scanf("%d", &budget);\n' +
            '    int best = p[0] + p[1];\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++) {\n' +
            '            int s = p[i] + p[j];\n' +
            '            if (abs(s - budget) < abs(best - budget)) best = s;\n' +
            '        }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <cstdlib>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    int budget;\n' +
            '    cin >> budget;\n' +
            '    int best = p[0] + p[1];\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++) {\n' +
            '            int s = p[i] + p[j];\n' +
            '            if (abs(s - budget) < abs(best - budget)) best = s;\n' +
            '        }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Sort, then move two pointers inward toward the budget, tracking the closest sum.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'p = sorted(map(int, input().split()))\n' +
            'budget = int(input())\n' +
            'lo, hi = 0, n - 1\n' +
            'best = p[lo] + p[hi]\n' +
            'while lo < hi:\n' +
            '    s = p[lo] + p[hi]\n' +
            '    if abs(s - budget) < abs(best - budget):\n' +
            '        best = s\n' +
            '    if s < budget:\n' +
            '        lo += 1\n' +
            '    elif s > budget:\n' +
            '        hi -= 1\n' +
            '    else:\n' +
            '        break\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] p = new int[n];\n' +
            '        for (int i = 0; i < n; i++) p[i] = sc.nextInt();\n' +
            '        int budget = sc.nextInt();\n' +
            '        Arrays.sort(p);\n' +
            '        int lo = 0, hi = n - 1, best = p[lo] + p[hi];\n' +
            '        while (lo < hi) {\n' +
            '            int s = p[lo] + p[hi];\n' +
            '            if (Math.abs(s - budget) < Math.abs(best - budget)) best = s;\n' +
            '            if (s < budget) lo++; else if (s > budget) hi--; else break;\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int p[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &p[i]);\n' +
            '    int budget;\n' +
            '    scanf("%d", &budget);\n' +
            '    qsort(p, n, sizeof(int), cmp);\n' +
            '    int lo = 0, hi = n - 1, best = p[lo] + p[hi];\n' +
            '    while (lo < hi) {\n' +
            '        int s = p[lo] + p[hi];\n' +
            '        if (abs(s - budget) < abs(best - budget)) best = s;\n' +
            '        if (s < budget) lo++; else if (s > budget) hi--; else break;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            '#include <cstdlib>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> p(n);\n' +
            '    for (auto &x : p) cin >> x;\n' +
            '    int budget;\n' +
            '    cin >> budget;\n' +
            '    sort(p.begin(), p.end());\n' +
            '    int lo = 0, hi = n - 1, best = p[lo] + p[hi];\n' +
            '    while (lo < hi) {\n' +
            '        int s = p[lo] + p[hi];\n' +
            '        if (abs(s - budget) < abs(best - budget)) best = s;\n' +
            '        if (s < budget) lo++; else if (s > budget) hi--; else break;\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Sorting unlocks the two-pointer method: the sum at the ends tells you which way to move to get closer to the ' +
      'budget. Too low? Only a bigger small value helps, so raise the low pointer. Too high? Lower the high pointer. ' +
      'Each move eliminates possibilities that cannot be closer, turning an O(n²) scan into O(n log n) dominated by the sort.',
    tip: 'On a sorted array, a sum that is too small/large tells you exactly which pointer to move — no wasted pairs.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Counting & Grouping', topics: ['Sorting', 'Optimization'],
    title: 'Closest Two Order Amounts',
    description:
      'Among a list of order amounts, find the smallest difference between any two of them.\n\n' +
      'Print that minimum absolute difference.',
    inputFormat: 'Line 1: number of amounts N. Line 2: N integers.',
    outputFormat: 'One integer: the smallest absolute difference between any two amounts.',
    examples: [
      ex('7\n1 19 -4 31 38 25 100', '5', 'Sorted: -4, 1, 19, 25, 31, 38, 100. The smallest gap is between -4 and 1, which is 5.'),
      ex('3\n10 10 4', '0', 'Two amounts are equal, so the smallest difference is 0.'),
    ],
    hints: [
      'The slow way compares every pair.',
      'After sorting, the closest two values must be next to each other.',
    ],
    approach:
      'Brute force compares all pairs — O(n²). The optimal insight is that once the amounts are sorted, the two ' +
      'closest values are always adjacent, so a single pass over neighbours finds the minimum gap. Sorting dominates ' +
      'the cost, giving O(n log n).',
    whatYouLearn: ['Why closest values are adjacent after sorting', 'Reducing all-pairs work by ordering first'],
    solutions: {
      brute: variant(
        'Check every pair and keep the smallest absolute difference.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'best = abs(a[0] - a[1])\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        best = min(best, abs(a[i] - a[j]))\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int best = Math.abs(a[0] - a[1]);\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                best = Math.min(best, Math.abs(a[i] - a[j]));\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int best = abs(a[0] - a[1]);\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++) {\n' +
            '            int d = abs(a[i] - a[j]);\n' +
            '            if (d < best) best = d;\n' +
            '        }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <cstdlib>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int best = abs(a[0] - a[1]);\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            best = min(best, abs(a[i] - a[j]));\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Sort, then take the smallest difference among adjacent pairs.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = sorted(map(int, input().split()))\n' +
            'best = a[1] - a[0]\n' +
            'for i in range(1, n):\n' +
            '    best = min(best, a[i] - a[i - 1])\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        Arrays.sort(a);\n' +
            '        int best = a[1] - a[0];\n' +
            '        for (int i = 1; i < n; i++) best = Math.min(best, a[i] - a[i - 1]);\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int best = a[1] - a[0];\n' +
            '    for (int i = 1; i < n; i++) if (a[i] - a[i - 1] < best) best = a[i] - a[i - 1];\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    sort(a.begin(), a.end());\n' +
            '    int best = a[1] - a[0];\n' +
            '    for (int i = 1; i < n; i++) best = min(best, a[i] - a[i - 1]);\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The key realisation is that the two closest numbers cannot be far apart once sorted — anything between them ' +
      'would be even closer to one side. So after sorting, only adjacent pairs matter, collapsing an O(n²) all-pairs ' +
      'search into a single linear scan. Sorting to expose adjacency is a recurring optimisation trick.',
    tip: 'Closest-pair on a line? Sort first — the answer is always between neighbours.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Two Pointers', topics: ['Two Pointers', 'Sorting', 'Optimization'],
    title: 'Cheap Pairs Under a Budget',
    description:
      'Count how many pairs of items have a combined price strictly less than the budget.\n\n' +
      'Each unordered pair (i < j) is counted once.',
    inputFormat: 'Line 1: number of items N. Line 2: N prices. Line 3: the budget.',
    outputFormat: 'One integer: the number of pairs whose sum is below the budget.',
    examples: [
      ex('4\n1 2 3 4\n5', '2', 'Pairs summing below 5: (1,2)=3 and (1,3)=4.'),
      ex('3\n5 5 5\n9', '0', 'Every pair sums to 10, which is not below 9.'),
    ],
    hints: [
      'The slow way tests each pair.',
      'Sort, then with two pointers: if the ends sum below budget, all pairs between them also qualify.',
    ],
    approach:
      'Brute force checks all pairs — O(n²). The optimal way sorts and uses two pointers. If the smallest and largest ' +
      'sum below budget, then the smallest paired with everything up to the largest also qualifies — add that whole ' +
      'block at once and move the low pointer up. Otherwise the high pointer comes down.',
    whatYouLearn: ['Counting many pairs in one step', 'Two-pointer counting on sorted data'],
    solutions: {
      brute: variant(
        'Test every pair and count those summing below the budget.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'budget = int(input())\n' +
            'count = 0\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        if a[i] + a[j] < budget:\n' +
            '            count += 1\n' +
            'print(count)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int budget = sc.nextInt();\n' +
            '        long count = 0;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                if (a[i] + a[j] < budget) count++;\n' +
            '        System.out.println(count);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int budget;\n' +
            '    scanf("%d", &budget);\n' +
            '    long count = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] + a[j] < budget) count++;\n' +
            '    printf("%ld\\n", count);\n' +
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
            '    for (auto &x : a) cin >> x;\n' +
            '    int budget;\n' +
            '    cin >> budget;\n' +
            '    long count = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] + a[j] < budget) count++;\n' +
            '    cout << count << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Sort; if ends sum below budget add (hi − lo) and raise lo, else lower hi.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = sorted(map(int, input().split()))\n' +
            'budget = int(input())\n' +
            'lo, hi = 0, n - 1\n' +
            'count = 0\n' +
            'while lo < hi:\n' +
            '    if a[lo] + a[hi] < budget:\n' +
            '        count += hi - lo\n' +
            '        lo += 1\n' +
            '    else:\n' +
            '        hi -= 1\n' +
            'print(count)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int budget = sc.nextInt();\n' +
            '        Arrays.sort(a);\n' +
            '        int lo = 0, hi = n - 1;\n' +
            '        long count = 0;\n' +
            '        while (lo < hi) {\n' +
            '            if (a[lo] + a[hi] < budget) { count += hi - lo; lo++; }\n' +
            '            else hi--;\n' +
            '        }\n' +
            '        System.out.println(count);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int budget;\n' +
            '    scanf("%d", &budget);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int lo = 0, hi = n - 1;\n' +
            '    long count = 0;\n' +
            '    while (lo < hi) {\n' +
            '        if (a[lo] + a[hi] < budget) { count += hi - lo; lo++; }\n' +
            '        else hi--;\n' +
            '    }\n' +
            '    printf("%ld\\n", count);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int budget;\n' +
            '    cin >> budget;\n' +
            '    sort(a.begin(), a.end());\n' +
            '    int lo = 0, hi = n - 1;\n' +
            '    long count = 0;\n' +
            '    while (lo < hi) {\n' +
            '        if (a[lo] + a[hi] < budget) { count += hi - lo; lo++; }\n' +
            '        else hi--;\n' +
            '    }\n' +
            '    cout << count << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Sorting turns counting into a two-pointer sweep. When the smallest plus the largest is under budget, every ' +
      'element between them also pairs with the smallest under budget — so you add the whole block (hi − lo) in one ' +
      'step instead of checking each. That batch-counting is what drops the work from quadratic to near-linear.',
    tip: 'On sorted data, "if the widest pair qualifies, so do all pairs inside it" lets you count in bulk.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Counting & Grouping', topics: ['Prefix Sums', 'Hashing', 'Optimization'],
    title: 'Longest Balanced Streak',
    description:
      'A log records each hour as 1 (a sale) or 0 (no sale). Find the length of the longest stretch of hours that has ' +
      'an equal number of 1s and 0s.',
    inputFormat: 'Line 1: number of hours N. Line 2: N values, each 0 or 1.',
    outputFormat: 'One integer: the length of the longest balanced stretch (0 if none).',
    examples: [
      ex('6\n0 1 0 1 1 0', '6', 'The whole log has three 0s and three 1s.'),
      ex('4\n1 1 1 0', '2', 'Only the last two hours (1, 0) are balanced.'),
    ],
    hints: [
      'Treat 0 as −1 and 1 as +1; a balanced stretch then has running sum 0.',
      'Remember the first index where each running sum appeared.',
    ],
    approach:
      'Brute force checks every stretch\'s balance — O(n²). The optimal trick treats 0 as −1 and 1 as +1, so a balanced ' +
      'stretch is one whose values sum to zero. Track the running sum and the first index at which each sum value ' +
      'occurred; if the same running sum reappears, the stretch between is balanced. Longest such gap is the answer.',
    whatYouLearn: ['Mapping a balance problem to prefix sums', 'Storing first-occurrence indices in a map'],
    solutions: {
      brute: variant(
        'For each start, extend keeping a running balance; record length whenever the balance returns to zero.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'best = 0\n' +
            'for i in range(n):\n' +
            '    bal = 0\n' +
            '    for j in range(i, n):\n' +
            '        bal += 1 if a[j] == 1 else -1\n' +
            '        if bal == 0:\n' +
            '            best = max(best, j - i + 1)\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int best = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int bal = 0;\n' +
            '            for (int j = i; j < n; j++) {\n' +
            '                bal += a[j] == 1 ? 1 : -1;\n' +
            '                if (bal == 0) best = Math.max(best, j - i + 1);\n' +
            '            }\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int bal = 0;\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            bal += a[j] == 1 ? 1 : -1;\n' +
            '            if (bal == 0 && j - i + 1 > best) best = j - i + 1;\n' +
            '        }\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int bal = 0;\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            bal += a[j] == 1 ? 1 : -1;\n' +
            '            if (bal == 0) best = max(best, j - i + 1);\n' +
            '        }\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Map 0→−1; track running sum and the first index of each sum; a repeat marks a balanced stretch.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'first = {0: -1}\n' +
            'bal = 0\n' +
            'best = 0\n' +
            'for i in range(n):\n' +
            '    bal += 1 if a[i] == 1 else -1\n' +
            '    if bal in first:\n' +
            '        best = max(best, i - first[bal])\n' +
            '    else:\n' +
            '        first[bal] = i\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        HashMap<Integer, Integer> first = new HashMap<>();\n' +
            '        first.put(0, -1);\n' +
            '        int bal = 0, best = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            bal += a[i] == 1 ? 1 : -1;\n' +
            '            if (first.containsKey(bal)) best = Math.max(best, i - first.get(bal));\n' +
            '            else first.put(bal, i);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            '// Running balance ranges from -n to n; shift by n to index a first-seen array.\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    static int firstSeen[200005];\n' +
            '    for (int i = 0; i < 200005; i++) firstSeen[i] = -2;\n' +
            '    firstSeen[n] = -1;  /* balance 0 at index -1 */\n' +
            '    int bal = 0, best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        bal += a[i] == 1 ? 1 : -1;\n' +
            '        int idx = bal + n;\n' +
            '        if (firstSeen[idx] != -2) { if (i - firstSeen[idx] > best) best = i - firstSeen[idx]; }\n' +
            '        else firstSeen[idx] = i;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <unordered_map>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> a(n);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    unordered_map<int, int> first;\n' +
            '    first[0] = -1;\n' +
            '    int bal = 0, best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        bal += a[i] == 1 ? 1 : -1;\n' +
            '        if (first.count(bal)) best = max(best, i - first[bal]);\n' +
            '        else first[bal] = i;\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Reframing 0 as −1 makes "equal counts" the same as "sums to zero". The running balance then equals the number ' +
      'of 1s minus 0s so far; if the same balance value shows up at two positions, the stretch between them added ' +
      'nothing net — equal 1s and 0s. Recording each balance\'s first index lets you find the longest such stretch in one pass.',
    tip: 'Turn "equal counts of A and B" into "prefix sum returns to a value" by scoring +1/−1.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Counting & Grouping', topics: ['Sorting', 'Two Pointers', 'Optimization'],
    title: 'Sort Ratings of 0, 1 and 2',
    description:
      'Product ratings are given as only 0, 1, or 2. Sort them in increasing order.\n\n' +
      'Print the sorted ratings.',
    inputFormat: 'Line 1: number of ratings N. Line 2: N values, each 0, 1, or 2.',
    outputFormat: 'The ratings sorted in increasing order, space separated.',
    examples: [
      ex('6\n2 0 1 2 1 0', '0 0 1 1 2 2', 'Two 0s, then two 1s, then two 2s.'),
      ex('3\n2 2 2', '2 2 2', 'All the same value.'),
    ],
    hints: [
      'The simple way counts how many 0s, 1s, and 2s there are, then rewrites the list.',
      'The one-pass way uses three pointers to place values while scanning once.',
    ],
    approach:
      'Because there are only three possible values, you do not need a general sort. The count method tallies each ' +
      'value and rewrites that many of each — two passes. The elegant one-pass method (Dutch National Flag) keeps a ' +
      'low, mid, and high pointer and swaps values into their regions as it scans, sorting in a single sweep.',
    whatYouLearn: ['Counting sort for tiny value ranges', 'The Dutch National Flag one-pass partition'],
    solutions: {
      brute: variant(
        'Count the 0s, 1s, and 2s, then rewrite the list with that many of each.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'c0 = a.count(0)\n' +
            'c1 = a.count(1)\n' +
            'c2 = a.count(2)\n' +
            'res = [0] * c0 + [1] * c1 + [2] * c2\n' +
            'print(" ".join(map(str, res)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] c = new int[3];\n' +
            '        for (int i = 0; i < n; i++) c[sc.nextInt()]++;\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int v = 0; v < 3; v++)\n' +
            '            for (int k = 0; k < c[v]; k++) { if (sb.length() > 0) sb.append(\' \'); sb.append(v); }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int c[3] = {0};\n' +
            '    for (int i = 0; i < n; i++) { int x; scanf("%d", &x); c[x]++; }\n' +
            '    int first = 1;\n' +
            '    for (int v = 0; v < 3; v++)\n' +
            '        for (int k = 0; k < c[v]; k++) { if (!first) printf(" "); printf("%d", v); first = 0; }\n' +
            '    printf("\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    int c[3] = {0};\n' +
            '    for (int i = 0; i < n; i++) { int x; cin >> x; c[x]++; }\n' +
            '    bool first = true;\n' +
            '    for (int v = 0; v < 3; v++)\n' +
            '        for (int k = 0; k < c[v]; k++) { if (!first) cout << " "; cout << v; first = false; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Dutch National Flag: low/mid/high pointers place 0s, 1s, and 2s in a single pass.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'low, mid, high = 0, 0, n - 1\n' +
            'while mid <= high:\n' +
            '    if a[mid] == 0:\n' +
            '        a[low], a[mid] = a[mid], a[low]\n' +
            '        low += 1\n' +
            '        mid += 1\n' +
            '    elif a[mid] == 1:\n' +
            '        mid += 1\n' +
            '    else:\n' +
            '        a[mid], a[high] = a[high], a[mid]\n' +
            '        high -= 1\n' +
            'print(" ".join(map(str, a)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int low = 0, mid = 0, high = n - 1;\n' +
            '        while (mid <= high) {\n' +
            '            if (a[mid] == 0) { int t = a[low]; a[low] = a[mid]; a[mid] = t; low++; mid++; }\n' +
            '            else if (a[mid] == 1) mid++;\n' +
            '            else { int t = a[mid]; a[mid] = a[high]; a[high] = t; high--; }\n' +
            '        }\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int i = 0; i < n; i++) { if (i > 0) sb.append(\' \'); sb.append(a[i]); }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int low = 0, mid = 0, high = n - 1;\n' +
            '    while (mid <= high) {\n' +
            '        if (a[mid] == 0) { int t = a[low]; a[low] = a[mid]; a[mid] = t; low++; mid++; }\n' +
            '        else if (a[mid] == 1) mid++;\n' +
            '        else { int t = a[mid]; a[mid] = a[high]; a[high] = t; high--; }\n' +
            '    }\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) printf(" "); printf("%d", a[i]); }\n' +
            '    printf("\\n");\n' +
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
            '    for (auto &x : a) cin >> x;\n' +
            '    int low = 0, mid = 0, high = n - 1;\n' +
            '    while (mid <= high) {\n' +
            '        if (a[mid] == 0) { swap(a[low], a[mid]); low++; mid++; }\n' +
            '        else if (a[mid] == 1) mid++;\n' +
            '        else { swap(a[mid], a[high]); high--; }\n' +
            '    }\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << a[i]; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'With only three distinct values a general sort is overkill. Counting is the easy win. The Dutch National Flag ' +
      'algorithm is the slick one: it partitions the array into a 0-region, a 1-region, and a 2-region on the fly, ' +
      'swapping each element into place during one scan. It is a classic demonstration that knowing your data (tiny value range) beats a generic tool.',
    tip: 'When values come from a tiny fixed set, counting or a three-way partition beats comparison sorting.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Two Pointers', topics: ['Two Pointers', 'Prefix Sums', 'Optimization'],
    title: 'Rainwater Between Buildings',
    description:
      'Building heights are given left to right. After rain, water is trapped above a spot up to the shorter of the ' +
      'tallest buildings to its left and right.\n\n' +
      'Print the total units of water trapped.',
    inputFormat: 'Line 1: number of buildings N. Line 2: N heights.',
    outputFormat: 'One integer: the total trapped water.',
    examples: [
      ex('12\n0 1 0 2 1 0 1 3 2 1 2 1', '6', 'The dips between taller buildings hold 6 units in total.'),
      ex('4\n3 0 3\n', '3', 'The single dip of height 0 between two 3s holds 3 units.'),
    ],
    hints: [
      'Water above a spot = min(tallest to the left, tallest to the right) − its own height.',
      'Precomputing those maxima, or using two pointers, avoids recomputing them each time.',
    ],
    approach:
      'Water over each position depends on the tallest bars to its left and right. Brute force recomputes both for ' +
      'every position — O(n²). Precomputing leftMax and rightMax arrays makes it O(n) but uses extra space. The best ' +
      'version uses two pointers moving inward, keeping running left/right maxima, achieving O(n) time and O(1) space.',
    whatYouLearn: ['Left/right max reasoning', 'Progressing to a two-pointer O(1)-space solution'],
    solutions: trio(
      variant(
        'For each position, scan left and right to find the bounding maxima, then add the water above it.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'h = list(map(int, input().split()))\n' +
            'total = 0\n' +
            'for i in range(n):\n' +
            '    left = max(h[:i + 1])\n' +
            '    right = max(h[i:])\n' +
            '    total += min(left, right) - h[i]\n' +
            'print(total)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] h = new int[n];\n' +
            '        for (int i = 0; i < n; i++) h[i] = sc.nextInt();\n' +
            '        long total = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int left = 0, right = 0;\n' +
            '            for (int j = 0; j <= i; j++) left = Math.max(left, h[j]);\n' +
            '            for (int j = i; j < n; j++) right = Math.max(right, h[j]);\n' +
            '            total += Math.min(left, right) - h[i];\n' +
            '        }\n' +
            '        System.out.println(total);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int h[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &h[i]);\n' +
            '    long total = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int left = 0, right = 0;\n' +
            '        for (int j = 0; j <= i; j++) if (h[j] > left) left = h[j];\n' +
            '        for (int j = i; j < n; j++) if (h[j] > right) right = h[j];\n' +
            '        total += (left < right ? left : right) - h[i];\n' +
            '    }\n' +
            '    printf("%ld\\n", total);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> h(n);\n' +
            '    for (auto &x : h) cin >> x;\n' +
            '    long total = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int left = 0, right = 0;\n' +
            '        for (int j = 0; j <= i; j++) left = max(left, h[j]);\n' +
            '        for (int j = i; j < n; j++) right = max(right, h[j]);\n' +
            '        total += min(left, right) - h[i];\n' +
            '    }\n' +
            '    cout << total << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Precompute leftMax[] and rightMax[] in two passes, then sum the water per position.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'h = list(map(int, input().split()))\n' +
            'leftMax = [0] * n\n' +
            'rightMax = [0] * n\n' +
            'leftMax[0] = h[0]\n' +
            'for i in range(1, n):\n' +
            '    leftMax[i] = max(leftMax[i - 1], h[i])\n' +
            'rightMax[n - 1] = h[n - 1]\n' +
            'for i in range(n - 2, -1, -1):\n' +
            '    rightMax[i] = max(rightMax[i + 1], h[i])\n' +
            'print(sum(min(leftMax[i], rightMax[i]) - h[i] for i in range(n)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] h = new int[n], L = new int[n], R = new int[n];\n' +
            '        for (int i = 0; i < n; i++) h[i] = sc.nextInt();\n' +
            '        L[0] = h[0];\n' +
            '        for (int i = 1; i < n; i++) L[i] = Math.max(L[i - 1], h[i]);\n' +
            '        R[n - 1] = h[n - 1];\n' +
            '        for (int i = n - 2; i >= 0; i--) R[i] = Math.max(R[i + 1], h[i]);\n' +
            '        long total = 0;\n' +
            '        for (int i = 0; i < n; i++) total += Math.min(L[i], R[i]) - h[i];\n' +
            '        System.out.println(total);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int h[100000], L[100000], R[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &h[i]);\n' +
            '    L[0] = h[0];\n' +
            '    for (int i = 1; i < n; i++) L[i] = L[i - 1] > h[i] ? L[i - 1] : h[i];\n' +
            '    R[n - 1] = h[n - 1];\n' +
            '    for (int i = n - 2; i >= 0; i--) R[i] = R[i + 1] > h[i] ? R[i + 1] : h[i];\n' +
            '    long total = 0;\n' +
            '    for (int i = 0; i < n; i++) { int m = L[i] < R[i] ? L[i] : R[i]; total += m - h[i]; }\n' +
            '    printf("%ld\\n", total);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> h(n), L(n), R(n);\n' +
            '    for (auto &x : h) cin >> x;\n' +
            '    L[0] = h[0];\n' +
            '    for (int i = 1; i < n; i++) L[i] = max(L[i - 1], h[i]);\n' +
            '    R[n - 1] = h[n - 1];\n' +
            '    for (int i = n - 2; i >= 0; i--) R[i] = max(R[i + 1], h[i]);\n' +
            '    long total = 0;\n' +
            '    for (int i = 0; i < n; i++) total += min(L[i], R[i]) - h[i];\n' +
            '    cout << total << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      variant(
        'Two pointers with running left/right maxima; the smaller side determines the water at each step.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'h = list(map(int, input().split()))\n' +
            'lo, hi = 0, n - 1\n' +
            'leftMax = rightMax = 0\n' +
            'total = 0\n' +
            'while lo < hi:\n' +
            '    if h[lo] < h[hi]:\n' +
            '        leftMax = max(leftMax, h[lo])\n' +
            '        total += leftMax - h[lo]\n' +
            '        lo += 1\n' +
            '    else:\n' +
            '        rightMax = max(rightMax, h[hi])\n' +
            '        total += rightMax - h[hi]\n' +
            '        hi -= 1\n' +
            'print(total)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] h = new int[n];\n' +
            '        for (int i = 0; i < n; i++) h[i] = sc.nextInt();\n' +
            '        int lo = 0, hi = n - 1, leftMax = 0, rightMax = 0;\n' +
            '        long total = 0;\n' +
            '        while (lo < hi) {\n' +
            '            if (h[lo] < h[hi]) { leftMax = Math.max(leftMax, h[lo]); total += leftMax - h[lo]; lo++; }\n' +
            '            else { rightMax = Math.max(rightMax, h[hi]); total += rightMax - h[hi]; hi--; }\n' +
            '        }\n' +
            '        System.out.println(total);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int h[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &h[i]);\n' +
            '    int lo = 0, hi = n - 1, leftMax = 0, rightMax = 0;\n' +
            '    long total = 0;\n' +
            '    while (lo < hi) {\n' +
            '        if (h[lo] < h[hi]) { if (h[lo] > leftMax) leftMax = h[lo]; total += leftMax - h[lo]; lo++; }\n' +
            '        else { if (h[hi] > rightMax) rightMax = h[hi]; total += rightMax - h[hi]; hi--; }\n' +
            '    }\n' +
            '    printf("%ld\\n", total);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> h(n);\n' +
            '    for (auto &x : h) cin >> x;\n' +
            '    int lo = 0, hi = n - 1, leftMax = 0, rightMax = 0;\n' +
            '    long total = 0;\n' +
            '    while (lo < hi) {\n' +
            '        if (h[lo] < h[hi]) { leftMax = max(leftMax, h[lo]); total += leftMax - h[lo]; lo++; }\n' +
            '        else { rightMax = max(rightMax, h[hi]); total += rightMax - h[hi]; hi--; }\n' +
            '    }\n' +
            '    cout << total << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    ),
    explanation:
      'Water over a spot is capped by the shorter of the tallest walls on each side. Brute force finds those walls ' +
      'afresh every time; precomputing them in arrays removes the repeated scans. The two-pointer version is the ' +
      'masterstroke: whichever side is currently shorter is guaranteed to be the limiting wall, so you can safely add ' +
      'its water and advance — no arrays, constant space.',
    tip: 'When both a left and right maximum matter, two pointers moving from the smaller side often removes the extra arrays.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Intervals', topics: ['Sorting', 'Two Pointers', 'Optimization'],
    title: 'Peak Simultaneous Meetings',
    description:
      'Given the start and end time of N meetings, find the largest number of meetings happening at the same time.\n\n' +
      'A meeting occupies the time from its start up to (but not including) its end, so a meeting ending exactly when ' +
      'another starts do not overlap.',
    inputFormat: 'Line 1: number of meetings N. Next N lines: two integers, the start and end of a meeting.',
    outputFormat: 'One integer: the peak number of overlapping meetings.',
    examples: [
      ex('6\n900 910\n940 1200\n950 1130\n1100 1130\n1500 1900\n1800 2000', '3', 'Between 1100 and 1130, three meetings (940–1200, 950–1130, 1100–1130) run together.'),
      ex('2\n100 200\n200 300', '1', 'The second starts exactly when the first ends, so they never overlap.'),
    ],
    hints: [
      'The slow way, for each meeting, counts how many others are active at its start.',
      'The fast way sorts all start times and all end times, then sweeps them like a merge.',
    ],
    approach:
      'Brute force samples each meeting\'s start time and counts overlaps — O(n²). The optimal way sorts start times ' +
      'and end times separately, then sweeps: each start about to occur before the next end raises the running count ' +
      '(track the peak); otherwise a meeting has ended, so lower the count. Ends are compared with strict "<" so ' +
      'touching meetings do not overlap.',
    whatYouLearn: ['The sort-and-sweep event technique', 'Handling touching intervals with strict comparison'],
    solutions: {
      brute: variant(
        'For each meeting\'s start time, count how many meetings are active then.',
        'O(n^2)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'starts, ends = [], []\n' +
            'for _ in range(n):\n' +
            '    s, e = map(int, input().split())\n' +
            '    starts.append(s)\n' +
            '    ends.append(e)\n' +
            'best = 0\n' +
            'for i in range(n):\n' +
            '    t = starts[i]\n' +
            '    active = sum(1 for j in range(n) if starts[j] <= t < ends[j])\n' +
            '    best = max(best, active)\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] s = new int[n], e = new int[n];\n' +
            '        for (int i = 0; i < n; i++) { s[i] = sc.nextInt(); e[i] = sc.nextInt(); }\n' +
            '        int best = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int t = s[i], active = 0;\n' +
            '            for (int j = 0; j < n; j++) if (s[j] <= t && t < e[j]) active++;\n' +
            '            best = Math.max(best, active);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int s[100000], e[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d %d", &s[i], &e[i]);\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int t = s[i], active = 0;\n' +
            '        for (int j = 0; j < n; j++) if (s[j] <= t && t < e[j]) active++;\n' +
            '        if (active > best) best = active;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> s(n), e(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> s[i] >> e[i];\n' +
            '    int best = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int t = s[i], active = 0;\n' +
            '        for (int j = 0; j < n; j++) if (s[j] <= t && t < e[j]) active++;\n' +
            '        best = max(best, active);\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Sort starts and ends; sweep with two pointers, +1 on a start before the next end, −1 otherwise; track the peak.',
        'O(n log n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'starts, ends = [], []\n' +
            'for _ in range(n):\n' +
            '    s, e = map(int, input().split())\n' +
            '    starts.append(s)\n' +
            '    ends.append(e)\n' +
            'starts.sort()\n' +
            'ends.sort()\n' +
            'i = j = cur = best = 0\n' +
            'while i < n:\n' +
            '    if starts[i] < ends[j]:\n' +
            '        cur += 1\n' +
            '        best = max(best, cur)\n' +
            '        i += 1\n' +
            '    else:\n' +
            '        cur -= 1\n' +
            '        j += 1\n' +
            'print(best)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] s = new int[n], e = new int[n];\n' +
            '        for (int i = 0; i < n; i++) { s[i] = sc.nextInt(); e[i] = sc.nextInt(); }\n' +
            '        Arrays.sort(s);\n' +
            '        Arrays.sort(e);\n' +
            '        int i = 0, j = 0, cur = 0, best = 0;\n' +
            '        while (i < n) {\n' +
            '            if (s[i] < e[j]) { cur++; best = Math.max(best, cur); i++; }\n' +
            '            else { cur--; j++; }\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int s[100000], e[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d %d", &s[i], &e[i]);\n' +
            '    qsort(s, n, sizeof(int), cmp);\n' +
            '    qsort(e, n, sizeof(int), cmp);\n' +
            '    int i = 0, j = 0, cur = 0, best = 0;\n' +
            '    while (i < n) {\n' +
            '        if (s[i] < e[j]) { cur++; if (cur > best) best = cur; i++; }\n' +
            '        else { cur--; j++; }\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> s(n), e(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> s[i] >> e[i];\n' +
            '    sort(s.begin(), s.end());\n' +
            '    sort(e.begin(), e.end());\n' +
            '    int i = 0, j = 0, cur = 0, best = 0;\n' +
            '    while (i < n) {\n' +
            '        if (s[i] < e[j]) { cur++; best = max(best, cur); i++; }\n' +
            '        else { cur--; j++; }\n' +
            '    }\n' +
            '    cout << best << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The peak overlap is an "events on a timeline" problem. Sorting the starts and ends separately lets you replay ' +
      'events in time order: each start that happens before the next end bumps the running count, each end lowers it. ' +
      'Comparing with strict "<" ensures a meeting ending as another begins does not count as overlap. Sorting makes this the standard O(n log n) solution for room/platform problems.',
    tip: 'For "max overlapping intervals", sort starts and ends, then sweep — +1 on start, −1 on end.',
  },
]

export default questions
