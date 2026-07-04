// Track 03 — Skill Up
// For learners ready for harder problems: arrays, strings, and the common patterns
// interviewers and platforms lean on. The signature of this track is "solve it first,
// then beat your own solution" — so many problems ship BOTH a brute-force and an
// optimal variant so the student can feel the difference between working and fast.
import { solo, variant, ex } from './_helpers.mjs'

const T = 'SKILL_UP'

const questions = [
  {
    track: T, level: 'BEGINNER', category: 'Array Basics', topics: ['Arrays', 'Accumulator'],
    title: 'Sum of an Array',
    description:
      'Read an array of integers and print the sum of all its elements.',
    inputFormat: 'First line: N (size). Second line: N integers separated by spaces.',
    outputFormat: 'One integer: the sum of the array.',
    examples: [
      ex('5\n1 2 3 4 5', '15', '1 + 2 + 3 + 4 + 5 = 15.'),
      ex('3\n10 20 30', '60', 'Adding all three elements gives 60.'),
    ],
    hints: [
      'Keep a running total that starts at 0.',
      'Walk through the array once, adding each element.',
    ],
    approach:
      'This is the accumulator pattern applied to an array. Start total at 0, loop over every element, and ' +
      'add it to total. One pass through the array is all you need.',
    whatYouLearn: ['Reading an array of numbers', 'Summing elements in a single pass'],
    solutions: solo(
      'Loop over the array once, adding each element to a running total.',
      {
        python:
          'n = int(input())\n' +
          'arr = list(map(int, input().split()))\n' +
          'total = 0\n' +
          'for x in arr:\n' +
          '    total += x\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int total = 0;\n' +
          '        for (int i = 0; i < n; i++) total += sc.nextInt();\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int total = 0, x;\n' +
          '    for (int i = 0; i < n; i++) { scanf("%d", &x); total += x; }\n' +
          '    printf("%d\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int total = 0, x;\n' +
          '    for (int i = 0; i < n; i++) { cin >> x; total += x; }\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'An array is just many values in a row. The same running-total idea from single numbers works here — ' +
      'you simply loop over each element once. This single-pass habit is the base for almost every array problem.',
    tip: 'Get comfortable reading an array in your language now — every problem in this track starts with it.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Array Basics', topics: ['Arrays', 'Max'],
    title: 'Find the Maximum',
    description:
      'Read an array of integers and print the largest element.',
    inputFormat: 'First line: N. Second line: N integers.',
    outputFormat: 'One integer: the maximum value.',
    examples: [
      ex('5\n3 9 2 15 8', '15', '15 is the largest value in the array.'),
      ex('4\n-2 -9 -1 -5', '-1', 'Among negatives, -1 is the largest.'),
    ],
    hints: [
      'Assume the first element is the biggest, then check the rest.',
      'Update your "biggest so far" whenever you find a larger value.',
    ],
    approach:
      'Set best to the first element (not 0 — negatives would break that). Scan the array; each time an ' +
      'element beats best, update best. After one pass, best holds the maximum.',
    whatYouLearn: ['The "best so far" pattern on arrays', 'Why you seed best with the first element'],
    solutions: solo(
      'Start best at the first element and update it whenever a larger element appears.',
      {
        python:
          'n = int(input())\n' +
          'arr = list(map(int, input().split()))\n' +
          'best = arr[0]\n' +
          'for x in arr:\n' +
          '    if x > best:\n' +
          '        best = x\n' +
          'print(best)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int best = Integer.MIN_VALUE;\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            int x = sc.nextInt();\n' +
          '            if (x > best) best = x;\n' +
          '        }\n' +
          '        System.out.println(best);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int best, x;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        scanf("%d", &x);\n' +
          '        if (i == 0 || x > best) best = x;\n' +
          '    }\n' +
          '    printf("%d\\n", best);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <climits>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int best = INT_MIN, x;\n' +
          '    for (int i = 0; i < n; i++) { cin >> x; if (x > best) best = x; }\n' +
          '    cout << best << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Seeding best with the first element (or the smallest possible value) matters: if you start at 0, an ' +
      'array of all-negative numbers would wrongly return 0. Then a single pass keeps the largest seen so far.',
    tip: 'Starting values decide correctness. For max, never assume the data is positive — seed carefully.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Array Basics', topics: ['Arrays', 'Two Pointers'],
    title: 'Reverse an Array',
    description:
      'Read an array and print it with the elements in reverse order.',
    inputFormat: 'First line: N. Second line: N integers.',
    outputFormat: 'The N integers in reverse order, space-separated.',
    examples: [
      ex('5\n1 2 3 4 5', '5 4 3 2 1', 'The order of elements is flipped.'),
    ],
    hints: [
      'You can print from the last index down to the first.',
      'Or use two pointers — one at each end — and swap inward.',
    ],
    approach:
      'The simplest way is to print from the end to the start. To reverse in place, use two pointers: one at ' +
      'the start, one at the end. Swap them and move both inward until they meet.',
    whatYouLearn: ['The two-pointer technique', 'Walking an array from both ends'],
    solutions: solo(
      'Use two pointers from both ends, swapping until they meet (or print from the end).',
      {
        python:
          'n = int(input())\n' +
          'arr = list(map(int, input().split()))\n' +
          'left, right = 0, n - 1\n' +
          'while left < right:\n' +
          '    arr[left], arr[right] = arr[right], arr[left]\n' +
          '    left += 1\n' +
          '    right -= 1\n' +
          'print(*arr)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] arr = new int[n];\n' +
          '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
          '        int left = 0, right = n - 1;\n' +
          '        while (left < right) {\n' +
          '            int t = arr[left]; arr[left] = arr[right]; arr[right] = t;\n' +
          '            left++; right--;\n' +
          '        }\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < n; i++) sb.append(arr[i]).append(i < n - 1 ? " " : "");\n' +
          '        System.out.println(sb.toString());\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int arr[1000];\n' +
          '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
          '    for (int i = n - 1; i >= 0; i--) printf("%d%s", arr[i], i > 0 ? " " : "\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <vector>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    vector<int> arr(n);\n' +
          '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
          '    int left = 0, right = n - 1;\n' +
          '    while (left < right) { swap(arr[left++], arr[right--]); }\n' +
          '    for (int i = 0; i < n; i++) cout << arr[i] << (i < n - 1 ? " " : "\\n");\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Two pointers is a pattern you will use constantly. Starting at both ends and swapping inward reverses ' +
      'the array in place using no extra memory, and it stops exactly when the pointers meet in the middle.',
    tip: 'Two pointers — one from each end — is one of the most reused tricks in all of coding. Learn it here.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Searching', topics: ['Arrays', 'Two Pointers', 'Sorting'],
    title: 'Two Sum — Does a Pair Exist?',
    description:
      'Read an array and a target. Print "Yes" if any two different elements add up to the target, ' +
      'otherwise "No".\n\n' +
      'Solve it the slow way first. Then solve it without a nested loop — and notice which one wins.',
    inputFormat: 'Line 1: N. Line 2: N integers. Line 3: the target.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('5\n3 7 1 9 4\n10', 'Yes', '3 + 7 = 10 (also 1 + 9), so a valid pair exists.'),
      ex('4\n1 2 3 4\n20', 'No', 'No two elements add up to 20.'),
    ],
    hints: [
      'The obvious way checks every pair with two nested loops.',
      'If you sort first, two pointers from both ends can find the pair in one sweep.',
    ],
    approach:
      'Start with the honest brute force: two nested loops trying every pair. Then improve it — sort the ' +
      'array and use two pointers (one at each end). If their sum is too small move the left pointer up; ' +
      'if too big move the right pointer down. This turns O(n²) into O(n log n).',
    whatYouLearn: ['Two-pointer search on a sorted array', 'Trading a nested loop for a smarter sweep'],
    solutions: {
      brute: variant(
        'Try every possible pair with two nested loops; if any sums to the target, answer Yes.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'found = False\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        if arr[i] + arr[j] == target:\n' +
            '            found = True\n' +
            'print("Yes" if found else "No")',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt();\n' +
            '        boolean found = false;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                if (arr[i] + arr[j] == target) found = true;\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int target;\n' +
            '    scanf("%d", &target);\n' +
            '    int found = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (arr[i] + arr[j] == target) found = 1;\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int target;\n' +
            '    cin >> target;\n' +
            '    bool found = false;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (arr[i] + arr[j] == target) found = true;\n' +
            '    cout << (found ? "Yes" : "No") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Sort the array, then move two pointers inward: raise left if the sum is too small, lower right if too big.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'arr.sort()\n' +
            'left, right = 0, n - 1\n' +
            'found = False\n' +
            'while left < right:\n' +
            '    s = arr[left] + arr[right]\n' +
            '    if s == target:\n' +
            '        found = True\n' +
            '        break\n' +
            '    elif s < target:\n' +
            '        left += 1\n' +
            '    else:\n' +
            '        right -= 1\n' +
            'print("Yes" if found else "No")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt();\n' +
            '        Arrays.sort(arr);\n' +
            '        int left = 0, right = n - 1;\n' +
            '        boolean found = false;\n' +
            '        while (left < right) {\n' +
            '            int s = arr[left] + arr[right];\n' +
            '            if (s == target) { found = true; break; }\n' +
            '            else if (s < target) left++;\n' +
            '            else right--;\n' +
            '        }\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int target;\n' +
            '    scanf("%d", &target);\n' +
            '    qsort(arr, n, sizeof(int), cmp);\n' +
            '    int left = 0, right = n - 1, found = 0;\n' +
            '    while (left < right) {\n' +
            '        int s = arr[left] + arr[right];\n' +
            '        if (s == target) { found = 1; break; }\n' +
            '        else if (s < target) left++;\n' +
            '        else right--;\n' +
            '    }\n' +
            '    printf(found ? "Yes\\n" : "No\\n");\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int target;\n' +
            '    cin >> target;\n' +
            '    sort(arr.begin(), arr.end());\n' +
            '    int left = 0, right = n - 1;\n' +
            '    bool found = false;\n' +
            '    while (left < right) {\n' +
            '        int s = arr[left] + arr[right];\n' +
            '        if (s == target) { found = true; break; }\n' +
            '        else if (s < target) left++;\n' +
            '        else right--;\n' +
            '    }\n' +
            '    cout << (found ? "Yes" : "No") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The brute force checks all ~n²/2 pairs — correct but slow. After sorting, the two-pointer sweep is the ' +
      'insight: if the current sum is too small the only way to grow it is to move left rightward; if too big, ' +
      'move right leftward. Each pointer moves at most n steps, so the sweep is linear and sorting dominates at ' +
      'O(n log n). (A hash set gives an even faster O(n) — a great next step to explore.)',
    tip: 'Working was never the finish line — optimal is. Always ask "can I remove a nested loop?"',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Array Basics', topics: ['Arrays', 'Sorting'],
    title: 'Second Largest Element',
    description:
      'Read an array and print the second largest DISTINCT value.\n\n' +
      'For [5, 5, 3] the largest is 5 and the second largest is 3 (duplicates of the max do not count).',
    inputFormat: 'First line: N. Second line: N integers (at least two distinct values).',
    outputFormat: 'One integer: the second largest distinct value.',
    examples: [
      ex('5\n10 5 20 20 8', '10', '20 is the largest; the next distinct value is 10.'),
      ex('3\n5 5 3', '3', 'Ignoring the duplicate 5, the second largest is 3.'),
    ],
    hints: [
      'The easy way: sort, then scan from the top for the first value smaller than the max.',
      'The better way: track the largest AND second largest together in a single pass.',
    ],
    approach:
      'Brute force: sort the array and walk from the largest end until you find a value below the maximum — ' +
      'that is the answer. Optimal: in one pass keep two variables, largest and second. When a new value beats ' +
      'largest, the old largest becomes second. This avoids sorting entirely.',
    whatYouLearn: ['Tracking two "best so far" values at once', 'Beating an O(n log n) sort with an O(n) pass'],
    solutions: {
      brute: variant(
        'Sort the array, then scan down from the largest for the first value less than the maximum.',
        'O(n log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'arr.sort()\n' +
            'mx = arr[-1]\n' +
            'for i in range(n - 2, -1, -1):\n' +
            '    if arr[i] < mx:\n' +
            '        print(arr[i])\n' +
            '        break',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        Arrays.sort(arr);\n' +
            '        int mx = arr[n - 1];\n' +
            '        for (int i = n - 2; i >= 0; i--) {\n' +
            '            if (arr[i] < mx) { System.out.println(arr[i]); break; }\n' +
            '        }\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    qsort(arr, n, sizeof(int), cmp);\n' +
            '    int mx = arr[n - 1];\n' +
            '    for (int i = n - 2; i >= 0; i--) {\n' +
            '        if (arr[i] < mx) { printf("%d\\n", arr[i]); break; }\n' +
            '    }\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    sort(arr.begin(), arr.end());\n' +
            '    int mx = arr[n - 1];\n' +
            '    for (int i = n - 2; i >= 0; i--) {\n' +
            '        if (arr[i] < mx) { cout << arr[i] << endl; break; }\n' +
            '    }\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'One pass: keep largest and second; when a value beats largest, the old largest slides into second.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'largest = second = float("-inf")\n' +
            'for x in arr:\n' +
            '    if x > largest:\n' +
            '        second = largest\n' +
            '        largest = x\n' +
            '    elif largest > x > second:\n' +
            '        second = x\n' +
            'print(second)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        long largest = Long.MIN_VALUE, second = Long.MIN_VALUE;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int x = sc.nextInt();\n' +
            '            if (x > largest) { second = largest; largest = x; }\n' +
            '            else if (x < largest && x > second) second = x;\n' +
            '        }\n' +
            '        System.out.println(second);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <limits.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    long largest = LONG_MIN, second = LONG_MIN, x;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        scanf("%ld", &x);\n' +
            '        if (x > largest) { second = largest; largest = x; }\n' +
            '        else if (x < largest && x > second) second = x;\n' +
            '    }\n' +
            '    printf("%ld\\n", second);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <climits>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    long largest = LONG_MIN, second = LONG_MIN, x;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        cin >> x;\n' +
            '        if (x > largest) { second = largest; largest = x; }\n' +
            '        else if (x < largest && x > second) second = x;\n' +
            '    }\n' +
            '    cout << second << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Sorting works but does more than needed — you only want the top two values. The optimal pass keeps two ' +
      'trackers: whenever a value beats largest, the previous largest becomes second. The "x < largest" check ' +
      'is what quietly skips duplicates of the maximum, giving the second DISTINCT value.',
    tip: 'When a sort feels like overkill, ask what you actually need. Often one clever pass replaces it.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Strings', topics: ['Strings', 'Counting'],
    title: 'Count the Vowels',
    description:
      'Read a string and print how many vowels (a, e, i, o, u) it contains. Count both lowercase and uppercase.',
    inputFormat: 'One line containing a word or string (no spaces).',
    outputFormat: 'One integer: the number of vowels.',
    examples: [
      ex('Education', '5', 'E, u, a, i, o are the vowels — 5 of them.'),
      ex('sky', '0', 'There are no vowels in "sky".'),
    ],
    hints: [
      'Walk through the string one character at a time.',
      'Check if each character is one of the vowels, counting matches.',
    ],
    approach:
      'A string is a sequence of characters, so you can loop over it just like an array. For each character, ' +
      'check whether it is a vowel (in either case) and add to a counter.',
    whatYouLearn: ['Looping over the characters of a string', 'Counting characters that match a rule'],
    solutions: solo(
      'Loop each character; if it is a vowel (upper or lower), add to the count.',
      {
        python:
          's = input()\n' +
          'vowels = "aeiouAEIOU"\n' +
          'count = 0\n' +
          'for ch in s:\n' +
          '    if ch in vowels:\n' +
          '        count += 1\n' +
          'print(count)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String s = new Scanner(System.in).next();\n' +
          '        int count = 0;\n' +
          '        String vowels = "aeiouAEIOU";\n' +
          '        for (int i = 0; i < s.length(); i++)\n' +
          '            if (vowels.indexOf(s.charAt(i)) >= 0) count++;\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char s[1000];\n' +
          '    scanf("%s", s);\n' +
          '    int count = 0;\n' +
          '    for (int i = 0; s[i] != \'\\0\'; i++) {\n' +
          '        char c = s[i];\n' +
          '        if (strchr("aeiouAEIOU", c)) count++;\n' +
          '    }\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string s;\n' +
          '    cin >> s;\n' +
          '    string vowels = "aeiouAEIOU";\n' +
          '    int count = 0;\n' +
          '    for (char c : s)\n' +
          '        if (vowels.find(c) != string::npos) count++;\n' +
          '    cout << count << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Strings behave like arrays of characters, so the same looping habit applies. Checking membership in a ' +
      '"aeiouAEIOU" string is a clean way to test for a vowel in both cases at once.',
    tip: 'Treat a string as a list of characters and most string problems suddenly feel familiar.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Strings', topics: ['Strings', 'Two Pointers'],
    title: 'Palindrome String',
    description:
      'Read a string and print "Yes" if it reads the same forwards and backwards, otherwise "No".\n\n' +
      'For example, "madam" is a palindrome.',
    inputFormat: 'One line containing a string (no spaces).',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('madam', 'Yes', 'Reversed, "madam" is still "madam".'),
      ex('hello', 'No', 'Reversed, "hello" becomes "olleh" — different.'),
    ],
    hints: [
      'Use two pointers: one at the start, one at the end.',
      'Compare the characters and move inward; a mismatch means it is not a palindrome.',
    ],
    approach:
      'Put one pointer at the first character and one at the last. Compare them; if they differ, answer "No" ' +
      'immediately. Otherwise move both inward and repeat until they meet. Surviving to the middle means "Yes".',
    whatYouLearn: ['Applying two pointers to strings', 'Exiting early the moment you have an answer'],
    solutions: solo(
      'Two pointers from both ends; compare and move inward, stopping early on any mismatch.',
      {
        python:
          's = input()\n' +
          'left, right = 0, len(s) - 1\n' +
          'ok = True\n' +
          'while left < right:\n' +
          '    if s[left] != s[right]:\n' +
          '        ok = False\n' +
          '        break\n' +
          '    left += 1\n' +
          '    right -= 1\n' +
          'print("Yes" if ok else "No")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String s = new Scanner(System.in).next();\n' +
          '        int left = 0, right = s.length() - 1;\n' +
          '        boolean ok = true;\n' +
          '        while (left < right) {\n' +
          '            if (s.charAt(left) != s.charAt(right)) { ok = false; break; }\n' +
          '            left++; right--;\n' +
          '        }\n' +
          '        System.out.println(ok ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char s[1000];\n' +
          '    scanf("%s", s);\n' +
          '    int left = 0, right = strlen(s) - 1, ok = 1;\n' +
          '    while (left < right) {\n' +
          '        if (s[left] != s[right]) { ok = 0; break; }\n' +
          '        left++; right--;\n' +
          '    }\n' +
          '    printf(ok ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string s;\n' +
          '    cin >> s;\n' +
          '    int left = 0, right = s.size() - 1;\n' +
          '    bool ok = true;\n' +
          '    while (left < right) {\n' +
          '        if (s[left] != s[right]) { ok = false; break; }\n' +
          '        left++; right--;\n' +
          '    }\n' +
          '    cout << (ok ? "Yes" : "No") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Two pointers make this clean and fast: you compare mirror characters and stop the instant they differ. ' +
      'There is no need to build a reversed copy — comparing in place uses no extra memory and quits early on failure.',
    tip: 'Same two-pointer idea as reversing an array. One pattern, many problems — that is the Skill Up mindset.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Strings', topics: ['Strings', 'Hashing', 'Sorting'],
    title: 'Check for Anagram',
    description:
      'Two strings are anagrams if they contain exactly the same letters in any order (assume lowercase ' +
      'letters only).\n\n' +
      'Read two strings and print "Yes" if they are anagrams, otherwise "No".',
    inputFormat: 'Two lines, each containing a lowercase string.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('listen\nsilent', 'Yes', 'Both use the same letters: e, i, l, n, s, t.'),
      ex('hello\nworld', 'No', 'They contain different letters.'),
    ],
    hints: [
      'The easy way: sort both strings and check if they become identical.',
      'The faster way: count how many times each letter appears and compare the counts.',
    ],
    approach:
      'Brute force: sort both strings; anagrams become the exact same sequence. Optimal: build a count of each ' +
      'of the 26 letters for both strings (or +1 for the first, -1 for the second) and check every count is ' +
      'zero. Counting is O(n) versus sorting\'s O(n log n).',
    whatYouLearn: ['Frequency counting with a fixed-size array', 'Comparing two strings by contents, not order'],
    solutions: {
      brute: variant(
        'Sort both strings; if the sorted versions are equal, they are anagrams.',
        'O(n log n)', 'O(n)',
        {
          python:
            'a = input()\n' +
            'b = input()\n' +
            'print("Yes" if sorted(a) == sorted(b) else "No")',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        char[] a = sc.next().toCharArray();\n' +
            '        char[] b = sc.next().toCharArray();\n' +
            '        Arrays.sort(a); Arrays.sort(b);\n' +
            '        System.out.println(Arrays.equals(a, b) ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <string.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *x, const void *y) { return (*(char*)x - *(char*)y); }\n\n' +
            'int main() {\n' +
            '    char a[1000], b[1000];\n' +
            '    scanf("%s %s", a, b);\n' +
            '    qsort(a, strlen(a), 1, cmp);\n' +
            '    qsort(b, strlen(b), 1, cmp);\n' +
            '    printf(strcmp(a, b) == 0 ? "Yes\\n" : "No\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <string>\n' +
            '#include <algorithm>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    string a, b;\n' +
            '    cin >> a >> b;\n' +
            '    sort(a.begin(), a.end());\n' +
            '    sort(b.begin(), b.end());\n' +
            '    cout << (a == b ? "Yes" : "No") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Count each letter: +1 for the first string, -1 for the second. Anagrams leave every count at zero.',
        'O(n)', 'O(1)',
        {
          python:
            'a = input()\n' +
            'b = input()\n' +
            'if len(a) != len(b):\n' +
            '    print("No")\n' +
            'else:\n' +
            '    count = [0] * 26\n' +
            '    for ch in a:\n' +
            '        count[ord(ch) - ord("a")] += 1\n' +
            '    for ch in b:\n' +
            '        count[ord(ch) - ord("a")] -= 1\n' +
            '    print("Yes" if all(c == 0 for c in count) else "No")',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        String a = sc.next(), b = sc.next();\n' +
            '        if (a.length() != b.length()) { System.out.println("No"); return; }\n' +
            '        int[] count = new int[26];\n' +
            '        for (char c : a.toCharArray()) count[c - \'a\']++;\n' +
            '        for (char c : b.toCharArray()) count[c - \'a\']--;\n' +
            '        boolean ok = true;\n' +
            '        for (int c : count) if (c != 0) ok = false;\n' +
            '        System.out.println(ok ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <string.h>\n\n' +
            'int main() {\n' +
            '    char a[1000], b[1000];\n' +
            '    scanf("%s %s", a, b);\n' +
            '    if (strlen(a) != strlen(b)) { printf("No\\n"); return 0; }\n' +
            '    int count[26] = {0};\n' +
            '    for (int i = 0; a[i]; i++) count[a[i] - \'a\']++;\n' +
            '    for (int i = 0; b[i]; i++) count[b[i] - \'a\']--;\n' +
            '    int ok = 1;\n' +
            '    for (int i = 0; i < 26; i++) if (count[i] != 0) ok = 0;\n' +
            '    printf(ok ? "Yes\\n" : "No\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <string>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    string a, b;\n' +
            '    cin >> a >> b;\n' +
            '    if (a.size() != b.size()) { cout << "No" << endl; return 0; }\n' +
            '    int count[26] = {0};\n' +
            '    for (char c : a) count[c - \'a\']++;\n' +
            '    for (char c : b) count[c - \'a\']--;\n' +
            '    bool ok = true;\n' +
            '    for (int i = 0; i < 26; i++) if (count[i] != 0) ok = false;\n' +
            '    cout << (ok ? "Yes" : "No") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Sorting is the intuitive fix, but it does O(n log n) work. Frequency counting is smarter: since there are ' +
      'only 26 letters, a fixed array of counts lets you compare contents in a single linear pass. Adding for one ' +
      'string and subtracting for the other means true anagrams cancel out to all zeros.',
    tip: 'Frequency arrays (counting into 26 buckets) unlock a whole family of string problems. Remember this trick.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Searching', topics: ['Binary Search', 'Arrays'],
    title: 'Search a Sorted Array',
    description:
      'Read a SORTED array and a target. Print the 0-based index of the target, or -1 if it is not present.\n\n' +
      'Solve it by scanning first. Then use the fact that the array is sorted to go much faster.',
    inputFormat: 'Line 1: N. Line 2: N integers in increasing order. Line 3: the target.',
    outputFormat: 'One integer: the index of the target, or -1.',
    examples: [
      ex('6\n2 5 8 12 16 23\n12', '3', '12 sits at index 3 (counting from 0).'),
      ex('5\n1 3 5 7 9\n4', '-1', '4 is not in the array.'),
    ],
    hints: [
      'The simple way checks every element one by one.',
      'Because it is sorted, you can jump to the middle and throw away half the array each step.',
    ],
    approach:
      'Brute force: a linear scan comparing each element to the target — O(n). Optimal: binary search. Look at ' +
      'the middle element; if it matches you are done, if the target is larger search the right half, otherwise ' +
      'the left half. Each step halves the range, giving O(log n).',
    whatYouLearn: ['Binary search on sorted data', 'How halving the search space beats scanning'],
    solutions: {
      brute: variant(
        'Scan every element left to right and return the first index that matches the target.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'ans = -1\n' +
            'for i in range(n):\n' +
            '    if arr[i] == target:\n' +
            '        ans = i\n' +
            '        break\n' +
            'print(ans)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt(), ans = -1;\n' +
            '        for (int i = 0; i < n; i++) if (arr[i] == target) { ans = i; break; }\n' +
            '        System.out.println(ans);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int target, ans = -1;\n' +
            '    scanf("%d", &target);\n' +
            '    for (int i = 0; i < n; i++) if (arr[i] == target) { ans = i; break; }\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int target, ans = -1;\n' +
            '    cin >> target;\n' +
            '    for (int i = 0; i < n; i++) if (arr[i] == target) { ans = i; break; }\n' +
            '    cout << ans << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Binary search: compare the middle element and discard the half that cannot contain the target.',
        'O(log n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'low, high, ans = 0, n - 1, -1\n' +
            'while low <= high:\n' +
            '    mid = (low + high) // 2\n' +
            '    if arr[mid] == target:\n' +
            '        ans = mid\n' +
            '        break\n' +
            '    elif arr[mid] < target:\n' +
            '        low = mid + 1\n' +
            '    else:\n' +
            '        high = mid - 1\n' +
            'print(ans)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt();\n' +
            '        int low = 0, high = n - 1, ans = -1;\n' +
            '        while (low <= high) {\n' +
            '            int mid = (low + high) / 2;\n' +
            '            if (arr[mid] == target) { ans = mid; break; }\n' +
            '            else if (arr[mid] < target) low = mid + 1;\n' +
            '            else high = mid - 1;\n' +
            '        }\n' +
            '        System.out.println(ans);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int target;\n' +
            '    scanf("%d", &target);\n' +
            '    int low = 0, high = n - 1, ans = -1;\n' +
            '    while (low <= high) {\n' +
            '        int mid = (low + high) / 2;\n' +
            '        if (arr[mid] == target) { ans = mid; break; }\n' +
            '        else if (arr[mid] < target) low = mid + 1;\n' +
            '        else high = mid - 1;\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int target;\n' +
            '    cin >> target;\n' +
            '    int low = 0, high = n - 1, ans = -1;\n' +
            '    while (low <= high) {\n' +
            '        int mid = (low + high) / 2;\n' +
            '        if (arr[mid] == target) { ans = mid; break; }\n' +
            '        else if (arr[mid] < target) low = mid + 1;\n' +
            '        else high = mid - 1;\n' +
            '    }\n' +
            '    cout << ans << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Binary search only works because the array is sorted. By checking the middle and discarding half the ' +
      'remaining range each step, it reaches the answer in about log2(n) checks — for a million elements that is ' +
      'roughly 20 steps versus a million for the scan. Sorted data is a gift; binary search is how you cash it in.',
    tip: 'Whenever the input is sorted, ask "can binary search help?" It usually can.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Hashing', topics: ['Arrays', 'Hashing'],
    title: 'Does the Array Have a Duplicate?',
    description:
      'Read an array and print "Yes" if any value appears more than once, otherwise "No".',
    inputFormat: 'First line: N. Second line: N integers.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('5\n3 1 4 1 5', 'Yes', '1 appears twice.'),
      ex('4\n7 2 9 4', 'No', 'All values are different.'),
    ],
    hints: [
      'The simple way compares every pair of elements.',
      'A faster way remembers what you have already seen using a set.',
    ],
    approach:
      'Brute force: two nested loops checking if any two elements are equal — O(n²). Optimal: keep a set of ' +
      'values seen so far. For each element, if it is already in the set, you found a duplicate; otherwise add ' +
      'it. This is one pass, O(n).',
    whatYouLearn: ['Using a set to remember what you have seen', 'Turning an O(n^2) scan into O(n)'],
    solutions: {
      brute: variant(
        'Compare every pair with two nested loops; equal values mean a duplicate exists.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'found = False\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        if arr[i] == arr[j]:\n' +
            '            found = True\n' +
            'print("Yes" if found else "No")',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        boolean found = false;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                if (arr[i] == arr[j]) found = true;\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int found = 0;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (arr[i] == arr[j]) found = 1;\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    bool found = false;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (arr[i] == arr[j]) found = true;\n' +
            '    cout << (found ? "Yes" : "No") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Keep a set of seen values; if a value is already present when you reach it, a duplicate exists.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'seen = set()\n' +
            'found = False\n' +
            'for x in arr:\n' +
            '    if x in seen:\n' +
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
            '        Set<Integer> seen = new HashSet<>();\n' +
            '        boolean found = false;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int x = sc.nextInt();\n' +
            '            if (!seen.add(x)) found = true;\n' +
            '        }\n' +
            '        System.out.println(found ? "Yes" : "No");\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return (*(int*)a - *(int*)b); }\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    qsort(arr, n, sizeof(int), cmp);\n' +
            '    int found = 0;\n' +
            '    for (int i = 1; i < n; i++) if (arr[i] == arr[i - 1]) found = 1;\n' +
            '    printf(found ? "Yes\\n" : "No\\n");\n' +
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
            '    bool found = false;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int x; cin >> x;\n' +
            '        if (!seen.insert(x).second) found = true;\n' +
            '    }\n' +
            '    cout << (found ? "Yes" : "No") << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The set-based version remembers every value it has met. The moment it sees a value already in the set, ' +
      'it has proof of a duplicate. That is one pass instead of comparing all pairs. (The C version, lacking a ' +
      'built-in set, sorts first so duplicates sit next to each other — a common workaround in C.)',
    tip: 'A set answers "have I seen this before?" instantly. It is one of the most useful tools you will meet.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Patterns', topics: ['Arrays', 'Kadane', 'Subarray'],
    title: 'Maximum Subarray Sum',
    description:
      'Read an array (it may contain negative numbers). Find the largest sum of any CONTIGUOUS block of ' +
      'elements.\n\n' +
      'For [-2, 1, -3, 4, -1, 2, 1, -5, 4] the best block is [4, -1, 2, 1] with sum 6.',
    inputFormat: 'First line: N. Second line: N integers (can be negative).',
    outputFormat: 'One integer: the maximum contiguous sum.',
    examples: [
      ex('9\n-2 1 -3 4 -1 2 1 -5 4', '6', 'The block [4, -1, 2, 1] sums to 6, the best possible.'),
      ex('4\n-5 -2 -8 -1', '-1', 'All negative — the best single element is -1.'),
    ],
    hints: [
      'The brute way tries every possible start and end and sums between them.',
      'The trick (Kadane): at each element decide — extend the current block, or start fresh from here.',
    ],
    approach:
      'Brute force: try every subarray by fixing a start and extending the end, tracking the best sum — O(n²). ' +
      'Optimal (Kadane): walk once, keeping "best sum ending here". At each element, either extend the previous ' +
      'block or restart at the current element, whichever is larger. Track the overall best as you go — O(n).',
    whatYouLearn: ["Kadane's algorithm", 'Making a local "extend or restart" decision at each step'],
    solutions: {
      brute: variant(
        'Fix each start, extend the end, and track the largest running sum across all subarrays.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'best = arr[0]\n' +
            'for i in range(n):\n' +
            '    s = 0\n' +
            '    for j in range(i, n):\n' +
            '        s += arr[j]\n' +
            '        if s > best:\n' +
            '            best = s\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int best = arr[0];\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int s = 0;\n' +
            '            for (int j = i; j < n; j++) {\n' +
            '                s += arr[j];\n' +
            '                if (s > best) best = s;\n' +
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
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int best = arr[0];\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int s = 0;\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            s += arr[j];\n' +
            '            if (s > best) best = s;\n' +
            '        }\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int best = arr[0];\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int s = 0;\n' +
            '        for (int j = i; j < n; j++) {\n' +
            '            s += arr[j];\n' +
            '            if (s > best) best = s;\n' +
            '        }\n' +
            '    }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Kadane: keep "best ending here"; at each element extend it or restart, and track the overall best.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'best = cur = arr[0]\n' +
            'for i in range(1, n):\n' +
            '    cur = max(arr[i], cur + arr[i])\n' +
            '    best = max(best, cur)\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int best = arr[0], cur = arr[0];\n' +
            '        for (int i = 1; i < n; i++) {\n' +
            '            cur = Math.max(arr[i], cur + arr[i]);\n' +
            '            best = Math.max(best, cur);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int max(int a, int b) { return a > b ? a : b; }\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int best = arr[0], cur = arr[0];\n' +
            '    for (int i = 1; i < n; i++) {\n' +
            '        cur = max(arr[i], cur + arr[i]);\n' +
            '        best = max(best, cur);\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int best = arr[0], cur = arr[0];\n' +
            '    for (int i = 1; i < n; i++) {\n' +
            '        cur = max(arr[i], cur + arr[i]);\n' +
            '        best = max(best, cur);\n' +
            '    }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      "Kadane's insight is that the best block ending at position i is either just arr[i], or arr[i] added to " +
      'the best block ending just before it. If the running sum ever turns negative, carrying it forward only ' +
      'hurts, so you restart. One pass replaces checking every subarray — a huge leap from O(n²) to O(n).',
    tip: 'Kadane is a rite of passage. Understand the "extend or restart" choice and many DP problems open up.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Patterns', topics: ['Arrays', 'Sliding Window'],
    title: 'Max Sum of K Consecutive Elements',
    description:
      'Read an array and a number K. Find the largest sum of any K elements that sit next to each other.\n\n' +
      'For [2, 1, 5, 1, 3, 2] with K = 3, the best window is [5, 1, 3] with sum 9.',
    inputFormat: 'Line 1: N. Line 2: N integers. Line 3: K (1 <= K <= N).',
    outputFormat: 'One integer: the maximum sum of K consecutive elements.',
    examples: [
      ex('6\n2 1 5 1 3 2\n3', '9', 'The window [5, 1, 3] gives the largest sum, 9.'),
    ],
    hints: [
      'The brute way re-adds K elements for every possible window.',
      'Slide the window: add the new element entering, subtract the one leaving — no re-summing.',
    ],
    approach:
      'Brute force: for each starting position, sum its K elements and track the best — O(n·k) because you ' +
      're-add K values each time. Optimal (sliding window): compute the first window\'s sum once, then slide by ' +
      'adding the incoming element and subtracting the outgoing one. Each move is O(1), so the whole thing is O(n).',
    whatYouLearn: ['The sliding-window technique', 'Reusing previous work instead of recomputing'],
    solutions: {
      brute: variant(
        'For every window start, add up its K elements and keep the largest total.',
        'O(n*k)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'k = int(input())\n' +
            'best = float("-inf")\n' +
            'for i in range(n - k + 1):\n' +
            '    s = 0\n' +
            '    for j in range(i, i + k):\n' +
            '        s += arr[j]\n' +
            '    best = max(best, s)\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int k = sc.nextInt();\n' +
            '        int best = Integer.MIN_VALUE;\n' +
            '        for (int i = 0; i + k <= n; i++) {\n' +
            '            int s = 0;\n' +
            '            for (int j = i; j < i + k; j++) s += arr[j];\n' +
            '            best = Math.max(best, s);\n' +
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
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int k;\n' +
            '    scanf("%d", &k);\n' +
            '    int best = INT_MIN;\n' +
            '    for (int i = 0; i + k <= n; i++) {\n' +
            '        int s = 0;\n' +
            '        for (int j = i; j < i + k; j++) s += arr[j];\n' +
            '        if (s > best) best = s;\n' +
            '    }\n' +
            '    printf("%d\\n", best);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <climits>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int k;\n' +
            '    cin >> k;\n' +
            '    int best = INT_MIN;\n' +
            '    for (int i = 0; i + k <= n; i++) {\n' +
            '        int s = 0;\n' +
            '        for (int j = i; j < i + k; j++) s += arr[j];\n' +
            '        best = max(best, s);\n' +
            '    }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Sum the first K elements, then slide: add the entering element and subtract the leaving one each step.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'arr = list(map(int, input().split()))\n' +
            'k = int(input())\n' +
            'window = sum(arr[:k])\n' +
            'best = window\n' +
            'for i in range(k, n):\n' +
            '    window += arr[i] - arr[i - k]\n' +
            '    best = max(best, window)\n' +
            'print(best)',
          java:
            'import java.util.Scanner;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] arr = new int[n];\n' +
            '        for (int i = 0; i < n; i++) arr[i] = sc.nextInt();\n' +
            '        int k = sc.nextInt();\n' +
            '        int window = 0;\n' +
            '        for (int i = 0; i < k; i++) window += arr[i];\n' +
            '        int best = window;\n' +
            '        for (int i = k; i < n; i++) {\n' +
            '            window += arr[i] - arr[i - k];\n' +
            '            best = Math.max(best, window);\n' +
            '        }\n' +
            '        System.out.println(best);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int arr[1000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n' +
            '    int k;\n' +
            '    scanf("%d", &k);\n' +
            '    int window = 0;\n' +
            '    for (int i = 0; i < k; i++) window += arr[i];\n' +
            '    int best = window;\n' +
            '    for (int i = k; i < n; i++) {\n' +
            '        window += arr[i] - arr[i - k];\n' +
            '        if (window > best) best = window;\n' +
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
            '    vector<int> arr(n);\n' +
            '    for (int i = 0; i < n; i++) cin >> arr[i];\n' +
            '    int k;\n' +
            '    cin >> k;\n' +
            '    int window = 0;\n' +
            '    for (int i = 0; i < k; i++) window += arr[i];\n' +
            '    int best = window;\n' +
            '    for (int i = k; i < n; i++) {\n' +
            '        window += arr[i] - arr[i - k];\n' +
            '        best = max(best, window);\n' +
            '    }\n' +
            '    cout << best << endl;\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The brute force wastes effort by re-adding K elements for every window, even though neighbouring windows ' +
      'overlap almost entirely. The sliding window keeps a running total: when it moves one step, only one ' +
      'element enters and one leaves, so a single add and subtract updates the sum in O(1). Reusing prior work is the whole idea.',
    tip: 'Sliding window is the go-to for "best/longest block of size K" problems. Spot the overlap, reuse the work.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Array Basics', topics: ['Arrays', 'Two Pointers', 'Optimization'],
    title: 'Move Zeros to End',
    description:
      'Given a list of numbers, move every 0 to the end while keeping the order of the non-zero numbers the same.\n\n' +
      'Print the resulting list.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers.',
    outputFormat: 'The list with all zeros moved to the end, space separated.',
    examples: [
      ex('5\n0 1 0 3 12', '1 3 12 0 0', 'Non-zeros keep their order (1, 3, 12), then the two zeros follow.'),
      ex('3\n0 0 5', '5 0 0', 'The single non-zero comes first.'),
    ],
    hints: [
      'The simple way copies the non-zeros into a fresh list, then pads with zeros.',
      'The in-place way keeps a write position and overwrites as it scans.',
    ],
    approach:
      'The straightforward approach builds a new list: first all the non-zeros in order, then enough zeros to fill up. ' +
      'The better approach avoids the extra list — keep a "write" index, and each time you meet a non-zero, place it at ' +
      'the write index and advance it; finally fill the rest with zeros. Same result, no second array.',
    whatYouLearn: ['Stable reordering', 'Removing extra space with a write pointer'],
    solutions: {
      brute: variant(
        'Copy the non-zeros into a new list in order, then append the zeros.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'res = [x for x in a if x != 0]\n' +
            'res += [0] * (n - len(res))\n' +
            'print(" ".join(map(str, res)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int[] res = new int[n];\n' +
            '        int w = 0;\n' +
            '        for (int x : a) if (x != 0) res[w++] = x;\n' +
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
            '    int a[100000], res[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int w = 0;\n' +
            '    for (int i = 0; i < n; i++) if (a[i] != 0) res[w++] = a[i];\n' +
            '    while (w < n) res[w++] = 0;\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) printf(" "); printf("%d", res[i]); }\n' +
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
            '    vector<int> res;\n' +
            '    for (int x : a) if (x != 0) res.push_back(x);\n' +
            '    while ((int)res.size() < n) res.push_back(0);\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << res[i]; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Keep a write index; place each non-zero there in place, then fill the tail with zeros.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'w = 0\n' +
            'for i in range(n):\n' +
            '    if a[i] != 0:\n' +
            '        a[w] = a[i]\n' +
            '        w += 1\n' +
            'for i in range(w, n):\n' +
            '    a[i] = 0\n' +
            'print(" ".join(map(str, a)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int w = 0;\n' +
            '        for (int i = 0; i < n; i++) if (a[i] != 0) a[w++] = a[i];\n' +
            '        while (w < n) a[w++] = 0;\n' +
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
            '    int w = 0;\n' +
            '    for (int i = 0; i < n; i++) if (a[i] != 0) a[w++] = a[i];\n' +
            '    while (w < n) a[w++] = 0;\n' +
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
            '    int w = 0;\n' +
            '    for (int i = 0; i < n; i++) if (a[i] != 0) a[w++] = a[i];\n' +
            '    while (w < n) a[w++] = 0;\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << a[i]; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Both versions keep the non-zeros in order; the difference is memory. The brute one spends a whole extra array, ' +
      'while the optimal one reuses the input by overwriting from a write index and zero-filling the tail. Learning to ' +
      'edit an array in place instead of allocating a new one is a common way to cut space from O(n) to O(1).',
    tip: 'A "write pointer" that trails your scan lets you compact an array in place without extra memory.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Array Basics', topics: ['Arrays', 'Optimization'],
    title: 'Rotate Array Left by K',
    description:
      'Rotate a list to the left by K positions. The first K elements wrap around to the end.\n\n' +
      'Print the rotated list.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers. Line 3: the rotation amount K.',
    outputFormat: 'The list after rotating left by K, space separated.',
    examples: [
      ex('5\n1 2 3 4 5\n2', '3 4 5 1 2', 'The first 2 elements (1, 2) move to the back.'),
      ex('4\n10 20 30 40\n4', '10 20 30 40', 'Rotating by the full length returns the original.'),
    ],
    hints: [
      'Rotating by N (or a multiple) changes nothing, so reduce K with K % N first.',
      'The slow way shifts one position at a time, K times. The fast way uses three reversals.',
    ],
    approach:
      'First reduce K modulo N so you never do redundant full turns. The simple approach shifts the array left by one, ' +
      'K times — easy but slow. The clever approach reverses the first K elements, reverses the rest, then reverses the ' +
      'whole array; those three flips leave it perfectly rotated in linear time and no extra space.',
    whatYouLearn: ['The reversal trick for rotation', 'Reducing work with K % N'],
    solutions: {
      brute: variant(
        'Shift the array left by one position, repeated K times.',
        'O(n*k)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'k = int(input()) % n\n' +
            'for _ in range(k):\n' +
            '    first = a[0]\n' +
            '    for i in range(n - 1):\n' +
            '        a[i] = a[i + 1]\n' +
            '    a[n - 1] = first\n' +
            'print(" ".join(map(str, a)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int k = sc.nextInt() % n;\n' +
            '        for (int r = 0; r < k; r++) {\n' +
            '            int first = a[0];\n' +
            '            for (int i = 0; i < n - 1; i++) a[i] = a[i + 1];\n' +
            '            a[n - 1] = first;\n' +
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
            '    int k;\n' +
            '    scanf("%d", &k);\n' +
            '    k %= n;\n' +
            '    for (int r = 0; r < k; r++) {\n' +
            '        int first = a[0];\n' +
            '        for (int i = 0; i < n - 1; i++) a[i] = a[i + 1];\n' +
            '        a[n - 1] = first;\n' +
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
            '    int k;\n' +
            '    cin >> k;\n' +
            '    k %= n;\n' +
            '    for (int r = 0; r < k; r++) {\n' +
            '        int first = a[0];\n' +
            '        for (int i = 0; i < n - 1; i++) a[i] = a[i + 1];\n' +
            '        a[n - 1] = first;\n' +
            '    }\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << a[i]; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Reverse the first K, reverse the rest, then reverse the whole array.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'k = int(input()) % n\n' +
            'def rev(lo, hi):\n' +
            '    while lo < hi:\n' +
            '        a[lo], a[hi] = a[hi], a[lo]\n' +
            '        lo += 1\n' +
            '        hi -= 1\n' +
            'rev(0, k - 1)\n' +
            'rev(k, n - 1)\n' +
            'rev(0, n - 1)\n' +
            'print(" ".join(map(str, a)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    static int[] a;\n' +
            '    static void rev(int lo, int hi) {\n' +
            '        while (lo < hi) { int t = a[lo]; a[lo] = a[hi]; a[hi] = t; lo++; hi--; }\n' +
            '    }\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int k = sc.nextInt() % n;\n' +
            '        rev(0, k - 1); rev(k, n - 1); rev(0, n - 1);\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int i = 0; i < n; i++) { if (i > 0) sb.append(\' \'); sb.append(a[i]); }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'void rev(int a[], int lo, int hi) {\n' +
            '    while (lo < hi) { int t = a[lo]; a[lo] = a[hi]; a[hi] = t; lo++; hi--; }\n' +
            '}\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int k;\n' +
            '    scanf("%d", &k);\n' +
            '    k %= n;\n' +
            '    rev(a, 0, k - 1); rev(a, k, n - 1); rev(a, 0, n - 1);\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) printf(" "); printf("%d", a[i]); }\n' +
            '    printf("\\n");\n' +
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
            '    int k;\n' +
            '    cin >> k;\n' +
            '    k %= n;\n' +
            '    reverse(a.begin(), a.begin() + k);\n' +
            '    reverse(a.begin() + k, a.end());\n' +
            '    reverse(a.begin(), a.end());\n' +
            '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << a[i]; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Shifting one step at a time does K passes of N work — fine for small K, slow otherwise. The reversal trick is ' +
      'the elegant fix: reversing the first K and the remaining part, then reversing everything, lands each element in ' +
      'its rotated spot. It runs in one linear sweep with no extra array — a favourite interview technique.',
    tip: 'Three reversals rotate an array in O(n). Reduce K by K % N first to skip pointless full turns.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Array Basics', topics: ['Arrays', 'Math', 'Optimization'],
    title: 'Find the Missing Number',
    description:
      'The numbers 1 to N should all be present, but exactly one is missing. You are given the other N − 1 numbers ' +
      'in any order.\n\n' +
      'Find and print the missing number.',
    inputFormat: 'Line 1: N. Line 2: the N − 1 numbers (some order) drawn from 1..N with one missing.',
    outputFormat: 'One integer: the missing number.',
    examples: [
      ex('5\n1 2 4 5', '3', 'Out of 1..5, the number 3 is absent.'),
      ex('3\n1 2', '3', 'Out of 1..3, the number 3 is absent.'),
    ],
    hints: [
      'The slow way checks each candidate 1..N against the list.',
      'The fast way compares the expected sum of 1..N with the actual sum you were given.',
    ],
    approach:
      'The brute approach tests every value from 1 to N to see whether it appears — correct but quadratic. The optimal ' +
      'trick uses arithmetic: the sum of 1..N is known (N × (N + 1) ÷ 2). Subtract the sum of the numbers you actually ' +
      'have, and the difference is exactly the missing number.',
    whatYouLearn: ['Using a sum formula to avoid searching', 'Turning O(n²) into O(n)'],
    solutions: {
      brute: variant(
        'For each candidate 1..N, scan the list to see whether it is present; the absent one is the answer.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'for cand in range(1, n + 1):\n' +
            '    if cand not in a:\n' +
            '        print(cand)\n' +
            '        break',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n - 1];\n' +
            '        for (int i = 0; i < n - 1; i++) a[i] = sc.nextInt();\n' +
            '        for (int cand = 1; cand <= n; cand++) {\n' +
            '            boolean found = false;\n' +
            '            for (int x : a) if (x == cand) found = true;\n' +
            '            if (!found) { System.out.println(cand); break; }\n' +
            '        }\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n - 1; i++) scanf("%d", &a[i]);\n' +
            '    for (int cand = 1; cand <= n; cand++) {\n' +
            '        int found = 0;\n' +
            '        for (int i = 0; i < n - 1; i++) if (a[i] == cand) found = 1;\n' +
            '        if (!found) { printf("%d\\n", cand); break; }\n' +
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
            '    vector<int> a(n - 1);\n' +
            '    for (auto &x : a) cin >> x;\n' +
            '    for (int cand = 1; cand <= n; cand++) {\n' +
            '        bool found = false;\n' +
            '        for (int x : a) if (x == cand) found = true;\n' +
            '        if (!found) { cout << cand << "\\n"; break; }\n' +
            '    }\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Missing = (expected sum 1..N) − (sum of the numbers given).',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'expected = n * (n + 1) // 2\n' +
            'print(expected - sum(a))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        long sum = 0;\n' +
            '        for (int i = 0; i < n - 1; i++) sum += sc.nextInt();\n' +
            '        long expected = (long) n * (n + 1) / 2;\n' +
            '        System.out.println(expected - sum);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    long sum = 0;\n' +
            '    for (int i = 0; i < n - 1; i++) { int x; scanf("%d", &x); sum += x; }\n' +
            '    long expected = (long) n * (n + 1) / 2;\n' +
            '    printf("%ld\\n", expected - sum);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    long sum = 0;\n' +
            '    for (int i = 0; i < n - 1; i++) { int x; cin >> x; sum += x; }\n' +
            '    long expected = (long) n * (n + 1) / 2;\n' +
            '    cout << expected - sum << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Searching for each candidate is intuitive but repeats work. The sum formula turns the problem into one ' +
      'subtraction: since you know what the total of 1..N must be, whatever is missing shows up as the gap between ' +
      'that and the actual total. This is a classic example of replacing a search with a mathematical shortcut.',
    tip: 'A known formula (like the sum 1..N) can collapse a search into arithmetic. Always ask if one exists.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Hashing', topics: ['Arrays', 'Voting', 'Optimization'],
    title: 'Majority Element',
    description:
      'A list has a majority element — a value that appears more than half the time. It is guaranteed to exist.\n\n' +
      'Find and print that element.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers (one value appears more than N/2 times).',
    outputFormat: 'One integer: the majority element.',
    examples: [
      ex('7\n3 3 4 2 3 3 3', '3', '3 appears 5 times out of 7 — more than half.'),
      ex('3\n1 1 2', '1', '1 appears twice out of three.'),
    ],
    hints: [
      'The slow way counts occurrences of each value.',
      'The fast way keeps a candidate and a count that cancels out on mismatches (Boyer–Moore voting).',
    ],
    approach:
      'Brute force counts how often each value appears and returns the one over N/2 — simple but quadratic. The optimal ' +
      'Boyer–Moore voting algorithm keeps one candidate and a counter: a matching value increments it, a different one ' +
      'decrements it, and when it hits zero you adopt the current value. The true majority always survives this.',
    whatYouLearn: ['Boyer–Moore majority voting', 'Constant-space counting with cancellation'],
    solutions: {
      brute: variant(
        'Count each value across the list; return the one appearing more than N/2 times.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'for x in a:\n' +
            '    if a.count(x) > n // 2:\n' +
            '        print(x)\n' +
            '        break',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int c = 0;\n' +
            '            for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '            if (c > n / 2) { System.out.println(a[i]); break; }\n' +
            '        }\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '        if (c > n / 2) { printf("%d\\n", a[i]); break; }\n' +
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
            '    for (int i = 0; i < n; i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < n; j++) if (a[j] == a[i]) c++;\n' +
            '        if (c > n / 2) { cout << a[i] << "\\n"; break; }\n' +
            '    }\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Boyer–Moore voting: keep a candidate; +1 on a match, −1 otherwise; adopt a new candidate at count 0.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'candidate = a[0]\n' +
            'count = 0\n' +
            'for x in a:\n' +
            '    if count == 0:\n' +
            '        candidate = x\n' +
            '    count += 1 if x == candidate else -1\n' +
            'print(candidate)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int candidate = 0, count = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            int x = sc.nextInt();\n' +
            '            if (count == 0) candidate = x;\n' +
            '            count += (x == candidate) ? 1 : -1;\n' +
            '        }\n' +
            '        System.out.println(candidate);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int candidate = 0, count = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int x;\n' +
            '        scanf("%d", &x);\n' +
            '        if (count == 0) candidate = x;\n' +
            '        count += (x == candidate) ? 1 : -1;\n' +
            '    }\n' +
            '    printf("%d\\n", candidate);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    int candidate = 0, count = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int x;\n' +
            '        cin >> x;\n' +
            '        if (count == 0) candidate = x;\n' +
            '        count += (x == candidate) ? 1 : -1;\n' +
            '    }\n' +
            '    cout << candidate << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Counting every value is the obvious route but wastes time re-scanning. Boyer–Moore voting is a clever ' +
      'constant-space trick: pairs of different values cancel out, so a value that occurs more than half the time can ' +
      'never be fully cancelled and remains as the final candidate. It is a beautiful example of an algorithm that looks like magic until you see the cancellation idea.',
    tip: 'Boyer–Moore finds a >N/2 majority in one pass with O(1) memory. Remember the cancel-on-mismatch idea.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Prefix Sums', topics: ['Arrays', 'Prefix Sums', 'Optimization'],
    title: 'Equilibrium Index',
    description:
      'An equilibrium index is a position where the sum of all elements to its left equals the sum of all elements ' +
      'to its right.\n\n' +
      'Find the smallest such index (0-based). If none exists, print -1.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers.',
    outputFormat: 'One integer: the smallest equilibrium index, or -1.',
    examples: [
      ex('5\n1 3 5 2 2', '2', 'At index 2: left is 1+3=4 and right is 2+2=4.'),
      ex('3\n1 2 3', '-1', 'No index balances the two sides.'),
    ],
    hints: [
      'The slow way recomputes the left and right sums for every index.',
      'The fast way keeps a running left sum; the right sum is total − left − current.',
    ],
    approach:
      'Brute force adds up the left and right sides separately for each index — lots of repeated addition. The optimal ' +
      'way computes the total once, then sweeps left to right maintaining a running left sum. At each index the right ' +
      'sum is simply total − leftSum − current, so a single pass finds the balance point.',
    whatYouLearn: ['Prefix sums to avoid recomputation', 'Deriving the right sum from the total'],
    solutions: {
      brute: variant(
        'For each index, add everything on its left and everything on its right and compare.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'ans = -1\n' +
            'for i in range(n):\n' +
            '    left = sum(a[:i])\n' +
            '    right = sum(a[i + 1:])\n' +
            '    if left == right:\n' +
            '        ans = i\n' +
            '        break\n' +
            'print(ans)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int ans = -1;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            long left = 0, right = 0;\n' +
            '            for (int j = 0; j < i; j++) left += a[j];\n' +
            '            for (int j = i + 1; j < n; j++) right += a[j];\n' +
            '            if (left == right) { ans = i; break; }\n' +
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
            '        long left = 0, right = 0;\n' +
            '        for (int j = 0; j < i; j++) left += a[j];\n' +
            '        for (int j = i + 1; j < n; j++) right += a[j];\n' +
            '        if (left == right) { ans = i; break; }\n' +
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
            '        long left = 0, right = 0;\n' +
            '        for (int j = 0; j < i; j++) left += a[j];\n' +
            '        for (int j = i + 1; j < n; j++) right += a[j];\n' +
            '        if (left == right) { ans = i; break; }\n' +
            '    }\n' +
            '    cout << ans << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Compute the total once; sweep left keeping leftSum, with rightSum = total − leftSum − current.',
        'O(n)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'total = sum(a)\n' +
            'left = 0\n' +
            'ans = -1\n' +
            'for i in range(n):\n' +
            '    right = total - left - a[i]\n' +
            '    if left == right:\n' +
            '        ans = i\n' +
            '        break\n' +
            '    left += a[i]\n' +
            'print(ans)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        long total = 0;\n' +
            '        for (int i = 0; i < n; i++) { a[i] = sc.nextInt(); total += a[i]; }\n' +
            '        long left = 0;\n' +
            '        int ans = -1;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            long right = total - left - a[i];\n' +
            '            if (left == right) { ans = i; break; }\n' +
            '            left += a[i];\n' +
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
            '    long total = 0;\n' +
            '    for (int i = 0; i < n; i++) { scanf("%d", &a[i]); total += a[i]; }\n' +
            '    long left = 0;\n' +
            '    int ans = -1;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long right = total - left - a[i];\n' +
            '        if (left == right) { ans = i; break; }\n' +
            '        left += a[i];\n' +
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
            '    long total = 0;\n' +
            '    for (auto &x : a) { cin >> x; total += x; }\n' +
            '    long left = 0;\n' +
            '    int ans = -1;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        long right = total - left - a[i];\n' +
            '        if (left == right) { ans = i; break; }\n' +
            '        left += a[i];\n' +
            '    }\n' +
            '    cout << ans << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Recomputing both sides for every index is the classic O(n²) trap. Keeping a running left sum — a prefix sum — ' +
      'lets you get the right side by subtraction, since the total never changes. One pass then locates the balance ' +
      'point. Prefix sums are one of the most useful tools for turning repeated range-sum work into constant-time lookups.',
    tip: 'A running (prefix) sum plus the known total often removes an inner loop. Reach for it on range-sum problems.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Hashing', topics: ['Arrays', 'Hashing', 'Optimization'],
    title: 'Count Pairs with Given Sum',
    description:
      'Given a list of numbers and a target, count how many pairs of positions (i < j) have values that add up to ' +
      'the target.\n\n' +
      'Print the count.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers. Line 3: the target sum.',
    outputFormat: 'One integer: the number of pairs that add up to the target.',
    examples: [
      ex('4\n1 5 7 1\n6', '2', 'Pairs (1,5) and (5,1) — positions (0,1) and (1,3) — both sum to 6.'),
      ex('3\n2 2 2\n4', '3', 'All three pairs of 2s add to 4.'),
    ],
    hints: [
      'The slow way tests every pair with two loops.',
      'The fast way remembers how many of each value you have seen; the partner of x is (target − x).',
    ],
    approach:
      'Brute force checks all pairs — O(n²). The optimal way scans once, keeping a count of values seen so far. For ' +
      'each new value x, the number of pairs it completes equals how many times (target − x) has already appeared, so ' +
      'add that to the answer before recording x.',
    whatYouLearn: ['Counting pairs with a hash map', 'The complement (target − x) idea'],
    solutions: {
      brute: variant(
        'Try every pair (i, j) with i < j and count those that sum to the target.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'count = 0\n' +
            'for i in range(n):\n' +
            '    for j in range(i + 1, n):\n' +
            '        if a[i] + a[j] == target:\n' +
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
            '        int target = sc.nextInt(), count = 0;\n' +
            '        for (int i = 0; i < n; i++)\n' +
            '            for (int j = i + 1; j < n; j++)\n' +
            '                if (a[i] + a[j] == target) count++;\n' +
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
            '    int target, count = 0;\n' +
            '    scanf("%d", &target);\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] + a[j] == target) count++;\n' +
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
            '    int target, count = 0;\n' +
            '    cin >> target;\n' +
            '    for (int i = 0; i < n; i++)\n' +
            '        for (int j = i + 1; j < n; j++)\n' +
            '            if (a[i] + a[j] == target) count++;\n' +
            '    cout << count << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Scan once with a count map; for each x add seen[target − x], then record x.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'target = int(input())\n' +
            'seen = {}\n' +
            'count = 0\n' +
            'for x in a:\n' +
            '    count += seen.get(target - x, 0)\n' +
            '    seen[x] = seen.get(x, 0) + 1\n' +
            'print(count)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int target = sc.nextInt();\n' +
            '        HashMap<Integer, Integer> seen = new HashMap<>();\n' +
            '        long count = 0;\n' +
            '        for (int x : a) {\n' +
            '            count += seen.getOrDefault(target - x, 0);\n' +
            '            seen.merge(x, 1, Integer::sum);\n' +
            '        }\n' +
            '        System.out.println(count);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n\n' +
            '// Values are small here, so a direct count table stands in for a hash map.\n' +
            '#define OFF 100000\n' +
            'int seen[200005];\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int target;\n' +
            '    scanf("%d", &target);\n' +
            '    long count = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int need = target - a[i];\n' +
            '        if (need + OFF >= 0 && need + OFF < 200005) count += seen[need + OFF];\n' +
            '        seen[a[i] + OFF]++;\n' +
            '    }\n' +
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
            '    int target;\n' +
            '    cin >> target;\n' +
            '    unordered_map<int, int> seen;\n' +
            '    long count = 0;\n' +
            '    for (int x : a) {\n' +
            '        count += seen[target - x];\n' +
            '        seen[x]++;\n' +
            '    }\n' +
            '    cout << count << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Every pair that sums to the target is a value x paired with its complement (target − x). Instead of hunting for ' +
      'that partner with a second loop, a running count of what you have already seen tells you instantly how many ' +
      'partners exist. Adding before recording x avoids pairing an element with itself. This complement-count pattern is one of hashing\'s greatest hits.',
    tip: 'Pairs that sum to a target = complement counting. Track seen values and look up (target − x).',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Hashing', topics: ['Arrays', 'Sets', 'Optimization'],
    title: 'Intersection of Two Arrays',
    description:
      'Given two lists of numbers, print the distinct values that appear in both, in increasing order.\n\n' +
      'If they share nothing, print an empty line.',
    inputFormat: 'Line 1: size N and the N values of the first list. Line 2: size M and the M values of the second list.',
    outputFormat: 'The common distinct values in increasing order, space separated.',
    examples: [
      ex('4 1 2 2 3\n3 2 3 4', '2 3', 'Both lists contain 2 and 3 (duplicates counted once).'),
      ex('2 5 6\n3 6 7 8', '6', 'Only the value 6 appears in both lists.'),
    ],
    hints: [
      'The slow way checks, for each value of the first list, whether it appears in the second.',
      'The fast way puts one list in a set for instant membership tests.',
    ],
    approach:
      'Brute force compares each first-list value against the whole second list — O(N×M). The optimal way stores the ' +
      'second list in a set, then walks the distinct values of the first list checking membership in O(1). Collect ' +
      'matches into a set to avoid repeats, then sort for the required order.',
    whatYouLearn: ['Sets for fast membership', 'Producing a distinct, sorted result'],
    solutions: {
      brute: variant(
        'For each distinct value of the first list, scan the second list to check if it is present.',
        'O(n*m)', 'O(1)',
        {
          python:
            'first = list(map(int, input().split()))[1:]\n' +
            'second = list(map(int, input().split()))[1:]\n' +
            'res = []\n' +
            'for x in sorted(set(first)):\n' +
            '    found = False\n' +
            '    for y in second:\n' +
            '        if x == y:\n' +
            '            found = True\n' +
            '            break\n' +
            '    if found:\n' +
            '        res.append(str(x))\n' +
            'print(" ".join(res))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] first = new int[n];\n' +
            '        for (int i = 0; i < n; i++) first[i] = sc.nextInt();\n' +
            '        int m = sc.nextInt();\n' +
            '        int[] second = new int[m];\n' +
            '        for (int i = 0; i < m; i++) second[i] = sc.nextInt();\n' +
            '        TreeSet<Integer> res = new TreeSet<>();\n' +
            '        for (int x : first) {\n' +
            '            for (int y : second) if (x == y) { res.add(x); break; }\n' +
            '        }\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int v : res) { if (sb.length() > 0) sb.append(\' \'); sb.append(v); }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int first[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &first[i]);\n' +
            '    int m;\n' +
            '    scanf("%d", &m);\n' +
            '    int second[100000];\n' +
            '    for (int i = 0; i < m; i++) scanf("%d", &second[i]);\n' +
            '    qsort(first, n, sizeof(int), cmp);\n' +
            '    int firstOut = 1, last = -2147483647;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        if (i > 0 && first[i] == first[i - 1]) continue;\n' +
            '        int found = 0;\n' +
            '        for (int j = 0; j < m; j++) if (second[j] == first[i]) { found = 1; break; }\n' +
            '        if (found) { if (!firstOut) printf(" "); printf("%d", first[i]); firstOut = 0; last = first[i]; }\n' +
            '    }\n' +
            '    (void) last;\n' +
            '    printf("\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <set>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    vector<int> first(n);\n' +
            '    for (auto &x : first) cin >> x;\n' +
            '    int m;\n' +
            '    cin >> m;\n' +
            '    vector<int> second(m);\n' +
            '    for (auto &x : second) cin >> x;\n' +
            '    set<int> res;\n' +
            '    for (int x : first)\n' +
            '        for (int y : second) if (x == y) { res.insert(x); break; }\n' +
            '    bool firstOut = true;\n' +
            '    for (int v : res) { if (!firstOut) cout << " "; cout << v; firstOut = false; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Put the second list in a set, then check each distinct first-list value in O(1); sort the matches.',
        'O(n + m)', 'O(n + m)',
        {
          python:
            'first = list(map(int, input().split()))[1:]\n' +
            'second = list(map(int, input().split()))[1:]\n' +
            'second_set = set(second)\n' +
            'common = sorted(v for v in set(first) if v in second_set)\n' +
            'print(" ".join(map(str, common)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        Set<Integer> firstVals = new HashSet<>();\n' +
            '        for (int i = 0; i < n; i++) firstVals.add(sc.nextInt());\n' +
            '        int m = sc.nextInt();\n' +
            '        Set<Integer> secondVals = new HashSet<>();\n' +
            '        for (int i = 0; i < m; i++) secondVals.add(sc.nextInt());\n' +
            '        TreeSet<Integer> common = new TreeSet<>();\n' +
            '        for (int v : firstVals) if (secondVals.contains(v)) common.add(v);\n' +
            '        StringBuilder sb = new StringBuilder();\n' +
            '        for (int v : common) { if (sb.length() > 0) sb.append(\' \'); sb.append(v); }\n' +
            '        System.out.println(sb.toString());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// Sort both, then walk them like a merge to collect common distinct values.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    int m;\n' +
            '    scanf("%d", &m);\n' +
            '    int b[100000];\n' +
            '    for (int i = 0; i < m; i++) scanf("%d", &b[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    qsort(b, m, sizeof(int), cmp);\n' +
            '    int i = 0, j = 0, first = 1;\n' +
            '    while (i < n && j < m) {\n' +
            '        if (a[i] < b[j]) i++;\n' +
            '        else if (a[i] > b[j]) j++;\n' +
            '        else {\n' +
            '            if (!first) printf(" "); printf("%d", a[i]); first = 0;\n' +
            '            int v = a[i];\n' +
            '            while (i < n && a[i] == v) i++;\n' +
            '            while (j < m && b[j] == v) j++;\n' +
            '        }\n' +
            '    }\n' +
            '    printf("\\n");\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <vector>\n' +
            '#include <unordered_set>\n' +
            '#include <set>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    cin >> n;\n' +
            '    unordered_set<int> firstVals;\n' +
            '    for (int i = 0; i < n; i++) { int x; cin >> x; firstVals.insert(x); }\n' +
            '    int m;\n' +
            '    cin >> m;\n' +
            '    unordered_set<int> secondVals;\n' +
            '    for (int i = 0; i < m; i++) { int x; cin >> x; secondVals.insert(x); }\n' +
            '    set<int> common;\n' +
            '    for (int v : firstVals) if (secondVals.count(v)) common.insert(v);\n' +
            '    bool first = true;\n' +
            '    for (int v : common) { if (!first) cout << " "; cout << v; first = false; }\n' +
            '    cout << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'Membership testing is what a set does best. Brute force re-scans the second list for every value; a set answers ' +
      '"is this present?" in constant time, so the whole intersection drops to linear work. Collecting into a sorted ' +
      'set gives distinct, ordered output for free. (The C versions sort and merge, since C has no built-in hash set.)',
    tip: 'Need fast "is it in the other collection?" checks? Load that collection into a set first.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Strings', topics: ['Strings', 'Hashing', 'Optimization'],
    title: 'First Non-Repeating Character',
    description:
      'Find the first character in a word that appears exactly once.\n\n' +
      'If every character repeats, print "None".',
    inputFormat: 'One word (letters only, no spaces).',
    outputFormat: 'The first character that occurs once, or "None".',
    examples: [
      ex('leetcode', 'l', 'l appears once and is the earliest such character.'),
      ex('aabb', 'None', 'Every character repeats.'),
    ],
    hints: [
      'The slow way counts each character across the whole word.',
      'The fast way counts all characters first, then scans once for the first with a count of 1.',
    ],
    approach:
      'Brute force checks each character by counting it in the whole string — O(n²). The optimal way makes two passes: ' +
      'first tally how many times each character appears, then walk the word in order and return the first character ' +
      'whose tally is 1. Two linear passes beat the nested loop.',
    whatYouLearn: ['Frequency counting for characters', 'Two-pass count-then-scan'],
    solutions: {
      brute: variant(
        'For each character, count its occurrences in the whole word; the first with count 1 wins.',
        'O(n^2)', 'O(1)',
        {
          python:
            's = input().strip()\n' +
            'ans = "None"\n' +
            'for ch in s:\n' +
            '    if s.count(ch) == 1:\n' +
            '        ans = ch\n' +
            '        break\n' +
            'print(ans)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        String s = new Scanner(System.in).next();\n' +
            '        String ans = "None";\n' +
            '        for (int i = 0; i < s.length(); i++) {\n' +
            '            int c = 0;\n' +
            '            for (int j = 0; j < s.length(); j++) if (s.charAt(j) == s.charAt(i)) c++;\n' +
            '            if (c == 1) { ans = String.valueOf(s.charAt(i)); break; }\n' +
            '        }\n' +
            '        System.out.println(ans);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <string.h>\n\n' +
            'int main() {\n' +
            '    char s[100005];\n' +
            '    scanf("%s", s);\n' +
            '    int len = strlen(s), idx = -1;\n' +
            '    for (int i = 0; i < len; i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < len; j++) if (s[j] == s[i]) c++;\n' +
            '        if (c == 1) { idx = i; break; }\n' +
            '    }\n' +
            '    if (idx == -1) printf("None\\n"); else printf("%c\\n", s[idx]);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <string>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    string s;\n' +
            '    cin >> s;\n' +
            '    string ans = "None";\n' +
            '    for (int i = 0; i < (int)s.size(); i++) {\n' +
            '        int c = 0;\n' +
            '        for (int j = 0; j < (int)s.size(); j++) if (s[j] == s[i]) c++;\n' +
            '        if (c == 1) { ans = string(1, s[i]); break; }\n' +
            '    }\n' +
            '    cout << ans << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Count every character first, then scan the word once for the first character with count 1.',
        'O(n)', 'O(1)',
        {
          python:
            's = input().strip()\n' +
            'count = {}\n' +
            'for ch in s:\n' +
            '    count[ch] = count.get(ch, 0) + 1\n' +
            'ans = "None"\n' +
            'for ch in s:\n' +
            '    if count[ch] == 1:\n' +
            '        ans = ch\n' +
            '        break\n' +
            'print(ans)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        String s = new Scanner(System.in).next();\n' +
            '        int[] count = new int[128];\n' +
            '        for (int i = 0; i < s.length(); i++) count[s.charAt(i)]++;\n' +
            '        String ans = "None";\n' +
            '        for (int i = 0; i < s.length(); i++)\n' +
            '            if (count[s.charAt(i)] == 1) { ans = String.valueOf(s.charAt(i)); break; }\n' +
            '        System.out.println(ans);\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <string.h>\n\n' +
            'int main() {\n' +
            '    char s[100005];\n' +
            '    scanf("%s", s);\n' +
            '    int len = strlen(s), count[128] = {0};\n' +
            '    for (int i = 0; i < len; i++) count[(int)s[i]]++;\n' +
            '    int idx = -1;\n' +
            '    for (int i = 0; i < len; i++) if (count[(int)s[i]] == 1) { idx = i; break; }\n' +
            '    if (idx == -1) printf("None\\n"); else printf("%c\\n", s[idx]);\n' +
            '    return 0;\n' +
            '}',
          cpp:
            '#include <iostream>\n' +
            '#include <string>\n' +
            'using namespace std;\n\n' +
            'int main() {\n' +
            '    string s;\n' +
            '    cin >> s;\n' +
            '    int count[128] = {0};\n' +
            '    for (char ch : s) count[(int)ch]++;\n' +
            '    string ans = "None";\n' +
            '    for (char ch : s) if (count[(int)ch] == 1) { ans = string(1, ch); break; }\n' +
            '    cout << ans << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The question needs two things: how often each character appears, and their original order. Brute force jams ' +
      'both into one nested loop. Counting first (one pass) and then scanning in order (a second pass) separates the ' +
      'concerns and runs in linear time. A fixed-size count array works nicely because there are only so many characters.',
    tip: 'Count first, then scan in order. A small fixed array beats a hash map when the alphabet is limited.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Hashing', topics: ['Arrays', 'Sets', 'Optimization'],
    title: 'Count Distinct Elements',
    description:
      'Read a list of numbers and count how many different values it contains.\n\n' +
      'Print the number of distinct values.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers.',
    outputFormat: 'One integer: the count of distinct values.',
    examples: [
      ex('6\n1 2 2 3 3 3', '3', 'The distinct values are 1, 2, and 3.'),
      ex('4\n5 5 5 5', '1', 'Only one distinct value.'),
    ],
    hints: [
      'The slow way checks whether each element appeared earlier before counting it.',
      'The fast way adds everything to a set and reads its size.',
    ],
    approach:
      'Brute force counts an element only if it is its first occurrence, which needs a backward scan each time — O(n²). ' +
      'The optimal way puts every value into a set (which ignores duplicates automatically) and reports the set size. ' +
      'Insertion and lookup are effectively constant, giving linear time.',
    whatYouLearn: ['Deduplication with a set', 'Recognising O(n²) "seen before?" scans and removing them'],
    solutions: {
      brute: variant(
        'Count an element only if no earlier element equals it.',
        'O(n^2)', 'O(1)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'count = 0\n' +
            'for i in range(n):\n' +
            '    seen_before = False\n' +
            '    for j in range(i):\n' +
            '        if a[j] == a[i]:\n' +
            '            seen_before = True\n' +
            '            break\n' +
            '    if not seen_before:\n' +
            '        count += 1\n' +
            'print(count)',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        int[] a = new int[n];\n' +
            '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
            '        int count = 0;\n' +
            '        for (int i = 0; i < n; i++) {\n' +
            '            boolean seen = false;\n' +
            '            for (int j = 0; j < i; j++) if (a[j] == a[i]) { seen = true; break; }\n' +
            '            if (!seen) count++;\n' +
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
            '    int count = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        int seen = 0;\n' +
            '        for (int j = 0; j < i; j++) if (a[j] == a[i]) { seen = 1; break; }\n' +
            '        if (!seen) count++;\n' +
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
            '    int count = 0;\n' +
            '    for (int i = 0; i < n; i++) {\n' +
            '        bool seen = false;\n' +
            '        for (int j = 0; j < i; j++) if (a[j] == a[i]) { seen = true; break; }\n' +
            '        if (!seen) count++;\n' +
            '    }\n' +
            '    cout << count << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
      optimized: variant(
        'Insert every value into a set and print its size.',
        'O(n)', 'O(n)',
        {
          python:
            'n = int(input())\n' +
            'a = list(map(int, input().split()))\n' +
            'print(len(set(a)))',
          java:
            'import java.util.*;\n\n' +
            'public class Main {\n' +
            '    public static void main(String[] args) {\n' +
            '        Scanner sc = new Scanner(System.in);\n' +
            '        int n = sc.nextInt();\n' +
            '        Set<Integer> seen = new HashSet<>();\n' +
            '        for (int i = 0; i < n; i++) seen.add(sc.nextInt());\n' +
            '        System.out.println(seen.size());\n' +
            '    }\n' +
            '}',
          c:
            '#include <stdio.h>\n' +
            '#include <stdlib.h>\n\n' +
            '// Sort, then distinct values are counted by comparing neighbours.\n' +
            'int cmp(const void *a, const void *b) { return *(int*)a - *(int*)b; }\n' +
            'int main() {\n' +
            '    int n;\n' +
            '    scanf("%d", &n);\n' +
            '    int a[100000];\n' +
            '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
            '    qsort(a, n, sizeof(int), cmp);\n' +
            '    int count = n > 0 ? 1 : 0;\n' +
            '    for (int i = 1; i < n; i++) if (a[i] != a[i - 1]) count++;\n' +
            '    printf("%d\\n", count);\n' +
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
            '    for (int i = 0; i < n; i++) { int x; cin >> x; seen.insert(x); }\n' +
            '    cout << seen.size() << "\\n";\n' +
            '    return 0;\n' +
            '}',
        },
      ),
    },
    explanation:
      'The brute force "have I seen this before?" check is a hidden O(n²) because each element scans all earlier ones. ' +
      'A set removes that entirely: it silently rejects duplicates, so its final size is the distinct count. When C has ' +
      'no set, sorting first makes duplicates adjacent so a single neighbour comparison counts distinct values.',
    tip: 'A set is the go-to tool for "how many different..." questions — duplicates vanish on insertion.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Strings', topics: ['Strings', 'Tokenizing'],
    title: 'Reverse Words in a Sentence',
    description:
      'Read a sentence and print its words in reverse order, separated by single spaces.\n\n' +
      'The letters inside each word stay the same — only the word order flips.',
    inputFormat: 'One line containing words separated by spaces.',
    outputFormat: 'The same words in reverse order, single-spaced.',
    examples: [
      ex('hello world foo', 'foo world hello', 'The three words are printed back to front.'),
      ex('code gym', 'gym code', 'Two words swapped.'),
    ],
    hints: [
      'Split the sentence into a list of words.',
      'Print the list from the last word to the first.',
    ],
    approach:
      'Break the sentence into words by splitting on spaces, then output them from the end toward the start. The main ' +
      'care is joining with a single space so you do not add a trailing or leading space.',
    whatYouLearn: ['Splitting text into words', 'Iterating a collection in reverse'],
    solutions: solo(
      'Split into words, then print them from last to first with single spaces.',
      {
        python:
          'words = input().split()\n' +
          'print(" ".join(reversed(words)))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String line = new Scanner(System.in).nextLine().trim();\n' +
          '        String[] w = line.split("\\\\s+");\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = w.length - 1; i >= 0; i--) { if (sb.length() > 0) sb.append(\' \'); sb.append(w[i]); }\n' +
          '        System.out.println(sb.toString());\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char line[100005];\n' +
          '    fgets(line, sizeof(line), stdin);\n' +
          '    char *words[20000];\n' +
          '    int cnt = 0;\n' +
          '    char *tok = strtok(line, " \\t\\n");\n' +
          '    while (tok) { words[cnt++] = tok; tok = strtok(NULL, " \\t\\n"); }\n' +
          '    for (int i = cnt - 1; i >= 0; i--) { if (i < cnt - 1) printf(" "); printf("%s", words[i]); }\n' +
          '    printf("\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <vector>\n' +
          '#include <string>\n' +
          '#include <sstream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string line;\n' +
          '    getline(cin, line);\n' +
          '    istringstream iss(line);\n' +
          '    vector<string> w;\n' +
          '    string word;\n' +
          '    while (iss >> word) w.push_back(word);\n' +
          '    for (int i = (int)w.size() - 1; i >= 0; i--) { if (i < (int)w.size() - 1) cout << " "; cout << w[i]; }\n' +
          '    cout << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Splitting turns a raw line into a list of words, which is far easier to manipulate than characters. Once the ' +
      'words are separate, reversing their order is trivial. Careful joining keeps the spacing clean. This split → ' +
      'process → join pipeline is how most real text handling works.',
    tip: 'Split text into tokens, work with the tokens, then join. It beats fiddling with characters directly.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Strings', topics: ['Strings', 'Tokenizing'],
    title: 'Count Words',
    description:
      'Read a sentence and print how many words it contains.\n\n' +
      'Words are separated by one or more spaces.',
    inputFormat: 'One line of text.',
    outputFormat: 'One integer: the number of words.',
    examples: [
      ex('the quick brown fox', '4', 'Four space-separated words.'),
      ex('hello', '1', 'A single word.'),
    ],
    hints: [
      'Split the line on spaces.',
      'The number of pieces is the word count.',
    ],
    approach:
      'Splitting the sentence on whitespace produces one piece per word, so the length of that list is the answer. ' +
      'Trim the line first so leading or trailing spaces do not create empty pieces.',
    whatYouLearn: ['Counting tokens after a split', 'Handling extra spaces cleanly'],
    solutions: solo(
      'Split on whitespace and count the resulting pieces.',
      {
        python:
          'print(len(input().split()))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String line = new Scanner(System.in).nextLine().trim();\n' +
          '        System.out.println(line.isEmpty() ? 0 : line.split("\\\\s+").length);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char line[100005];\n' +
          '    fgets(line, sizeof(line), stdin);\n' +
          '    int count = 0;\n' +
          '    char *tok = strtok(line, " \\t\\n");\n' +
          '    while (tok) { count++; tok = strtok(NULL, " \\t\\n"); }\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          '#include <sstream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string line;\n' +
          '    getline(cin, line);\n' +
          '    istringstream iss(line);\n' +
          '    string word;\n' +
          '    int count = 0;\n' +
          '    while (iss >> word) count++;\n' +
          '    cout << count << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Reading a whole line and splitting it into words is the standard way to count words. Splitting on runs of ' +
      'whitespace means multiple spaces between words do not inflate the count, and trimming avoids empty edge pieces. ' +
      'This tiny task is the base of search, word-frequency, and text-analysis features.',
    tip: 'Splitting on "one or more spaces" (not a single space) safely handles messy real-world text.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Strings', topics: ['Strings', 'Frequency'],
    title: 'Most Frequent Character',
    description:
      'Read a word and print the character that appears the most times.\n\n' +
      'If several characters tie, print the one that appears earliest in the word.',
    inputFormat: 'One word (no spaces).',
    outputFormat: 'A single character: the most frequent one.',
    examples: [
      ex('success', 's', 's appears 3 times, more than any other character.'),
      ex('abcabc', 'a', 'a, b, c each appear twice; a comes first, so it wins the tie.'),
    ],
    hints: [
      'Count how many times each character appears.',
      'Then scan the word in order, keeping the character with the highest count so far.',
    ],
    approach:
      'First tally every character with a small count array. Then walk the word from left to right, remembering the ' +
      'best character seen — but only replace it when you find a strictly higher count. Because you scan in order and ' +
      'never replace on ties, the earliest of the top characters naturally wins.',
    whatYouLearn: ['Frequency counting', 'Breaking ties by scan order'],
    solutions: solo(
      'Count characters, then scan in order keeping the one with the strictly highest count.',
      {
        python:
          's = input().strip()\n' +
          'counts = {}\n' +
          'for ch in s:\n' +
          '    counts[ch] = counts.get(ch, 0) + 1\n' +
          'best = s[0]\n' +
          'for ch in s:\n' +
          '    if counts[ch] > counts[best]:\n' +
          '        best = ch\n' +
          'print(best)',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String s = new Scanner(System.in).next();\n' +
          '        int[] cnt = new int[128];\n' +
          '        for (int i = 0; i < s.length(); i++) cnt[s.charAt(i)]++;\n' +
          '        char best = s.charAt(0);\n' +
          '        for (int i = 0; i < s.length(); i++)\n' +
          '            if (cnt[s.charAt(i)] > cnt[best]) best = s.charAt(i);\n' +
          '        System.out.println(best);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char s[100005];\n' +
          '    scanf("%s", s);\n' +
          '    int len = strlen(s), cnt[128] = {0};\n' +
          '    for (int i = 0; i < len; i++) cnt[(int)s[i]]++;\n' +
          '    char best = s[0];\n' +
          '    for (int i = 0; i < len; i++) if (cnt[(int)s[i]] > cnt[(int)best]) best = s[i];\n' +
          '    printf("%c\\n", best);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string s;\n' +
          '    cin >> s;\n' +
          '    int cnt[128] = {0};\n' +
          '    for (char ch : s) cnt[(int)ch]++;\n' +
          '    char best = s[0];\n' +
          '    for (char ch : s) if (cnt[(int)ch] > cnt[(int)best]) best = ch;\n' +
          '    cout << best << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Two passes solve it cleanly: one to count, one to choose. The tie rule is handled for free by scanning in order ' +
      'and only switching on a strictly greater count — the first character to reach the maximum keeps the title. ' +
      'Deciding tie-breaking through iteration order is a neat, bug-avoiding habit.',
    tip: 'Use ">" (not ">=") when scanning for a "best" to keep the first winner on ties.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Strings', topics: ['Strings', 'Sets'],
    title: 'Remove Duplicate Characters',
    description:
      'Read a word and print it with duplicate characters removed, keeping only the first time each character appears.',
    inputFormat: 'One word (no spaces).',
    outputFormat: 'The word with later repeats of any character removed.',
    examples: [
      ex('programming', 'progamin', 'The second r, m, and g are dropped; first appearances stay in order.'),
      ex('aaa', 'a', 'Only the first a remains.'),
    ],
    hints: [
      'Remember which characters you have already output.',
      'Append a character only the first time you see it.',
    ],
    approach:
      'Keep a set of characters already used. Walk the word left to right; for each character, if it is new, add it to ' +
      'the result and mark it as seen, otherwise skip it. This preserves the order of first appearances.',
    whatYouLearn: ['Tracking seen items with a set', 'Preserving first-occurrence order'],
    solutions: solo(
      'Append each character the first time it appears, skipping ones already seen.',
      {
        python:
          's = input().strip()\n' +
          'seen = set()\n' +
          'res = []\n' +
          'for ch in s:\n' +
          '    if ch not in seen:\n' +
          '        seen.add(ch)\n' +
          '        res.append(ch)\n' +
          'print("".join(res))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String s = new Scanner(System.in).next();\n' +
          '        boolean[] seen = new boolean[128];\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 0; i < s.length(); i++) {\n' +
          '            char c = s.charAt(i);\n' +
          '            if (!seen[c]) { seen[c] = true; sb.append(c); }\n' +
          '        }\n' +
          '        System.out.println(sb.toString());\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char s[100005];\n' +
          '    scanf("%s", s);\n' +
          '    int len = strlen(s), seen[128] = {0};\n' +
          '    for (int i = 0; i < len; i++) {\n' +
          '        if (!seen[(int)s[i]]) { seen[(int)s[i]] = 1; printf("%c", s[i]); }\n' +
          '    }\n' +
          '    printf("\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string s;\n' +
          '    cin >> s;\n' +
          '    bool seen[128] = {false};\n' +
          '    string res = "";\n' +
          '    for (char c : s) if (!seen[(int)c]) { seen[(int)c] = true; res += c; }\n' +
          '    cout << res << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A "seen" set (or boolean array) is the classic tool for keeping first occurrences: it answers "have I output this ' +
      'already?" instantly. Because you scan left to right and only ever skip repeats, the surviving characters stay in ' +
      'their original order. This is the same idea behind deduplicating any stream while preserving order.',
    tip: 'To dedupe while preserving order, remember what you have emitted and skip repeats — do not sort.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Strings', topics: ['Strings', 'Sets'],
    title: 'Check Pangram',
    description:
      'A pangram is a sentence that uses every letter of the English alphabet at least once.\n\n' +
      'Read a sentence and print "Yes" if it is a pangram, otherwise "No". Ignore case.',
    inputFormat: 'One line of text.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('The quick brown fox jumps over the lazy dog', 'Yes', 'This famous sentence contains all 26 letters.'),
      ex('hello world', 'No', 'Many letters are missing.'),
    ],
    hints: [
      'Convert everything to one case so A and a count as the same letter.',
      'Collect the distinct letters; it is a pangram when you have all 26.',
    ],
    approach:
      'Lowercase the whole line so case does not matter, then gather the distinct alphabet letters into a set (ignoring ' +
      'spaces and punctuation). If the set ends up with all 26 letters, the sentence is a pangram.',
    whatYouLearn: ['Case-insensitive letter handling', 'Using a set to track coverage'],
    solutions: solo(
      'Lowercase the text, collect the distinct a–z letters, and check whether there are 26.',
      {
        python:
          's = input().lower()\n' +
          'letters = set(ch for ch in s if "a" <= ch <= "z")\n' +
          'print("Yes" if len(letters) == 26 else "No")',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String s = new Scanner(System.in).nextLine().toLowerCase();\n' +
          '        boolean[] seen = new boolean[26];\n' +
          '        int count = 0;\n' +
          '        for (int i = 0; i < s.length(); i++) {\n' +
          '            char c = s.charAt(i);\n' +
          '            if (c >= \'a\' && c <= \'z\' && !seen[c - \'a\']) { seen[c - \'a\'] = true; count++; }\n' +
          '        }\n' +
          '        System.out.println(count == 26 ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <ctype.h>\n\n' +
          'int main() {\n' +
          '    char line[100005];\n' +
          '    fgets(line, sizeof(line), stdin);\n' +
          '    int seen[26] = {0}, count = 0;\n' +
          '    for (int i = 0; line[i] != \'\\0\'; i++) {\n' +
          '        char c = tolower((unsigned char)line[i]);\n' +
          '        if (c >= \'a\' && c <= \'z\' && !seen[c - \'a\']) { seen[c - \'a\'] = 1; count++; }\n' +
          '    }\n' +
          '    printf(count == 26 ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          '#include <cctype>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string s;\n' +
          '    getline(cin, s);\n' +
          '    bool seen[26] = {false};\n' +
          '    int count = 0;\n' +
          '    for (char c : s) {\n' +
          '        c = tolower((unsigned char)c);\n' +
          '        if (c >= \'a\' && c <= \'z\' && !seen[c - \'a\']) { seen[c - \'a\'] = true; count++; }\n' +
          '    }\n' +
          '    cout << (count == 26 ? "Yes" : "No") << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Normalising case first means A and a are treated identically, which is essential for letter-coverage questions. ' +
      'A set (or a 26-slot boolean array) records which letters have shown up; reaching 26 means full coverage. ' +
      'Tracking "have we covered everything?" with a fixed-size marker is a widely reusable technique.',
    tip: 'For "uses all of X?" questions, mark coverage in a fixed array/set and compare the count to the target.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Strings', topics: ['Strings', 'Counting'],
    title: 'Count Character Occurrences',
    description:
      'Read a word and a single character, then print how many times that character appears in the word.',
    inputFormat: 'Line 1: a word (no spaces). Line 2: a single character.',
    outputFormat: 'One integer: the number of occurrences.',
    examples: [
      ex('banana\na', '3', 'The letter a appears three times in "banana".'),
      ex('hello\nz', '0', 'There is no z in "hello".'),
    ],
    hints: [
      'Look at each character of the word one by one.',
      'Count the ones that match the target character.',
    ],
    approach:
      'Walk through the word character by character, comparing each to the target. Every time they match, add one to a ' +
      'counter. Print the counter at the end.',
    whatYouLearn: ['Scanning a string', 'Counting matches against a target'],
    solutions: solo(
      'Loop over the word and count characters equal to the target.',
      {
        python:
          'word = input().strip()\n' +
          'target = input().strip()[0]\n' +
          'count = 0\n' +
          'for ch in word:\n' +
          '    if ch == target:\n' +
          '        count += 1\n' +
          'print(count)',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        String word = sc.next();\n' +
          '        char target = sc.next().charAt(0);\n' +
          '        int count = 0;\n' +
          '        for (int i = 0; i < word.length(); i++) if (word.charAt(i) == target) count++;\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char word[100005], target;\n' +
          '    scanf("%s", word);\n' +
          '    scanf(" %c", &target);\n' +
          '    int count = 0, len = strlen(word);\n' +
          '    for (int i = 0; i < len; i++) if (word[i] == target) count++;\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string word;\n' +
          '    char target;\n' +
          '    cin >> word >> target;\n' +
          '    int count = 0;\n' +
          '    for (char ch : word) if (ch == target) count++;\n' +
          '    cout << count << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'This is the most basic form of scanning-and-counting: compare every character to a target and tally the hits. ' +
      'Starting the counter at 0 gives the correct answer even when the character is absent. Master this and searching, ' +
      'filtering, and frequency counting all feel natural.',
    tip: 'Scan-and-count is the foundation of most string search. Start the counter at 0 and add on each match.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Sorting', topics: ['Sorting', 'Arrays'],
    title: 'Bubble Sort',
    description:
      'Sort a list of numbers into increasing order using the bubble sort method — repeatedly swapping neighbouring ' +
      'values that are out of order.\n\n' +
      'Print the sorted list. (Write the sorting yourself rather than calling a built-in sort.)',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers.',
    outputFormat: 'The N integers in increasing order, space separated.',
    examples: [
      ex('5\n5 1 4 2 8', '1 2 4 5 8', 'The list is arranged from smallest to largest.'),
      ex('3\n3 2 1', '1 2 3', 'Fully reversed input becomes fully sorted.'),
    ],
    hints: [
      'Compare each pair of neighbours; if the left is bigger, swap them.',
      'After each full pass, the largest remaining value has "bubbled" to the end.',
    ],
    approach:
      'Bubble sort makes repeated passes over the list. On each pass, it compares neighbouring pairs and swaps any that ' +
      'are out of order, so the biggest unsorted value drifts to its correct spot at the end. After N passes the whole ' +
      'list is sorted. It is not the fastest sort, but it makes the mechanics of sorting crystal clear.',
    whatYouLearn: ['How a simple sort works internally', 'Swapping and nested-pass logic'],
    solutions: solo(
      'Repeatedly sweep the list, swapping out-of-order neighbours until it is sorted.',
      {
        python:
          'n = int(input())\n' +
          'a = list(map(int, input().split()))\n' +
          'for i in range(n):\n' +
          '    for j in range(n - 1 - i):\n' +
          '        if a[j] > a[j + 1]:\n' +
          '            a[j], a[j + 1] = a[j + 1], a[j]\n' +
          'print(" ".join(map(str, a)))',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] a = new int[n];\n' +
          '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
          '        for (int i = 0; i < n; i++)\n' +
          '            for (int j = 0; j < n - 1 - i; j++)\n' +
          '                if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }\n' +
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
          '    for (int i = 0; i < n; i++)\n' +
          '        for (int j = 0; j < n - 1 - i; j++)\n' +
          '            if (a[j] > a[j + 1]) { int t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; }\n' +
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
          '    for (int i = 0; i < n; i++)\n' +
          '        for (int j = 0; j < n - 1 - i; j++)\n' +
          '            if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);\n' +
          '    for (int i = 0; i < n; i++) { if (i > 0) cout << " "; cout << a[i]; }\n' +
          '    cout << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Bubble sort is O(n²), so it is not what you would use in production, but implementing it teaches the core sorting ' +
      'ideas: comparisons, swaps, and the "each pass locks one more element in place" invariant. Understanding a sort ' +
      'from the inside makes the faster ones (merge, quick) far less mysterious later.',
    tip: 'Know at least one sort by heart. Bubble sort is the simplest window into how sorting really works.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Sorting', topics: ['Sorting', 'Arrays'],
    title: 'Kth Largest Element',
    description:
      'Read a list of numbers and a value K, then print the Kth largest element.\n\n' +
      'For example, the 1st largest is the maximum, the 2nd largest is the next one down, and so on.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers. Line 3: K (1 ≤ K ≤ N).',
    outputFormat: 'One integer: the Kth largest value.',
    examples: [
      ex('6\n3 2 1 5 6 4\n2', '5', 'Sorted descending: 6 5 4 3 2 1 — the 2nd is 5.'),
      ex('4\n7 7 7 7\n1', '7', 'All equal, so the largest is 7.'),
    ],
    hints: [
      'Sorting the list makes ranking trivial.',
      'After sorting in decreasing order, the Kth largest sits at position K − 1.',
    ],
    approach:
      'Sort the numbers in decreasing order so the biggest comes first. Then the Kth largest is simply the element at ' +
      'index K − 1. Sorting does the heavy lifting; picking the position is the easy final step.',
    whatYouLearn: ['Using sorting to answer ranking questions', 'Zero-based indexing for the Kth item'],
    solutions: solo(
      'Sort in descending order and return the element at index K − 1.',
      {
        python:
          'n = int(input())\n' +
          'a = list(map(int, input().split()))\n' +
          'k = int(input())\n' +
          'a.sort(reverse=True)\n' +
          'print(a[k - 1])',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        Integer[] a = new Integer[n];\n' +
          '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
          '        int k = sc.nextInt();\n' +
          '        Arrays.sort(a, Collections.reverseOrder());\n' +
          '        System.out.println(a[k - 1]);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <stdlib.h>\n\n' +
          'int cmpDesc(const void *a, const void *b) { return *(int*)b - *(int*)a; }\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int a[100000];\n' +
          '    for (int i = 0; i < n; i++) scanf("%d", &a[i]);\n' +
          '    int k;\n' +
          '    scanf("%d", &k);\n' +
          '    qsort(a, n, sizeof(int), cmpDesc);\n' +
          '    printf("%d\\n", a[k - 1]);\n' +
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
          '    int k;\n' +
          '    cin >> k;\n' +
          '    sort(a.rbegin(), a.rend());\n' +
          '    cout << a[k - 1] << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Ranking questions become easy once the data is sorted: order imposes a clear position for every value. Sorting ' +
      'descending puts the largest first, so "Kth largest" maps to index K − 1. The only subtlety is the off-by-one ' +
      'between 1-based ranks and 0-based indexes, which trips up many beginners.',
    tip: 'When you need the "Kth biggest/smallest", sort first — then it is just the right index (mind the −1).',
  },
  {
    track: T, level: 'ADVANCED', category: 'Searching', topics: ['Binary Search', 'Arrays'],
    title: 'Floor in a Sorted Array',
    description:
      'Given a sorted (increasing) list and a value X, find the "floor" of X — the largest element that is less than ' +
      'or equal to X.\n\n' +
      'If no element is ≤ X, print -1.',
    inputFormat: 'Line 1: number of elements N. Line 2: N integers in increasing order. Line 3: the value X.',
    outputFormat: 'One integer: the floor of X, or -1 if it does not exist.',
    examples: [
      ex('5\n1 2 8 10 12\n5', '2', 'The largest value ≤ 5 is 2.'),
      ex('5\n1 2 8 10 12\n0', '-1', 'No element is ≤ 0.'),
    ],
    hints: [
      'Because the list is sorted, use binary search instead of scanning it all.',
      'When the middle value is ≤ X, it is a candidate — remember it and look further right for something bigger.',
    ],
    approach:
      'Since the list is sorted, binary search finds the floor in logarithmic time. Check the middle: if it is ≤ X, it ' +
      'is a valid candidate, so record it and move right to try for a larger one; if it is greater than X, move left. ' +
      'When the search ends, the last recorded candidate is the floor.',
    whatYouLearn: ['Binary search on a condition (not just equality)', 'Tracking the best candidate while narrowing'],
    solutions: solo(
      'Binary search: when mid ≤ X, keep it as a candidate and search the right half, else search the left.',
      {
        python:
          'n = int(input())\n' +
          'a = list(map(int, input().split()))\n' +
          'x = int(input())\n' +
          'lo, hi = 0, n - 1\n' +
          'ans = -1\n' +
          'while lo <= hi:\n' +
          '    mid = (lo + hi) // 2\n' +
          '    if a[mid] <= x:\n' +
          '        ans = a[mid]\n' +
          '        lo = mid + 1\n' +
          '    else:\n' +
          '        hi = mid - 1\n' +
          'print(ans)',
        java:
          'import java.util.*;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt();\n' +
          '        int[] a = new int[n];\n' +
          '        for (int i = 0; i < n; i++) a[i] = sc.nextInt();\n' +
          '        int x = sc.nextInt();\n' +
          '        int lo = 0, hi = n - 1, ans = -1;\n' +
          '        while (lo <= hi) {\n' +
          '            int mid = (lo + hi) / 2;\n' +
          '            if (a[mid] <= x) { ans = a[mid]; lo = mid + 1; }\n' +
          '            else hi = mid - 1;\n' +
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
          '    int x;\n' +
          '    scanf("%d", &x);\n' +
          '    int lo = 0, hi = n - 1, ans = -1;\n' +
          '    while (lo <= hi) {\n' +
          '        int mid = (lo + hi) / 2;\n' +
          '        if (a[mid] <= x) { ans = a[mid]; lo = mid + 1; }\n' +
          '        else hi = mid - 1;\n' +
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
          '    for (auto &v : a) cin >> v;\n' +
          '    int x;\n' +
          '    cin >> x;\n' +
          '    int lo = 0, hi = n - 1, ans = -1;\n' +
          '    while (lo <= hi) {\n' +
          '        int mid = (lo + hi) / 2;\n' +
          '        if (a[mid] <= x) { ans = a[mid]; lo = mid + 1; }\n' +
          '        else hi = mid - 1;\n' +
          '    }\n' +
          '    cout << ans << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Binary search is not only for finding an exact value — it can locate a boundary defined by a condition. Here, ' +
      '"≤ X" splits the array into a left part that qualifies and a right part that does not; we push toward the ' +
      'boundary while remembering the best candidate. Halving the search each step gives O(log n), far faster than scanning.',
    tip: 'Binary search works whenever a yes/no condition is monotonic along a sorted array — not just for exact matches.',
  },
]

export default questions
