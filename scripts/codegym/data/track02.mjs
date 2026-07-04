// Track 02 — Logic Building
// For learners who can already write basic code but freeze when a problem needs
// real thinking. These are WRITE-code problems (like other coding platforms) that
// build logical thinking: patterns, number logic, and math/series. Every problem
// ships a full solution in all four languages, same as Track 01 — just harder.
import { solo, ex } from './_helpers.mjs'

const T = 'LOGIC_BUILDING'

const questions = [
  {
    track: T, level: 'BEGINNER', category: 'Patterns', topics: ['Nested Loops', 'Patterns'],
    title: 'Right-Angled Star Triangle',
    description:
      'Read a number N and print a right-angled triangle of stars.\n\n' +
      'Row 1 has 1 star, row 2 has 2 stars, and so on down to row N.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'N rows, where row i contains i stars.',
    examples: [
      ex('4', '*\n**\n***\n****', 'Row 1 has one star, row 2 has two, up to row 4 with four.'),
    ],
    hints: [
      'You need a loop for the rows, and inside it a loop for the stars in that row.',
      'On row i, the inner loop should print exactly i stars.',
    ],
    approach:
      'Use an outer loop for the row number, going 1 to N. Inside, use an inner loop that prints stars i ' +
      'times (i = current row). After each row, move to a new line. The row number controls how many stars.',
    whatYouLearn: ['Linking an inner loop to the outer loop counter', 'Building growing patterns'],
    solutions: solo(
      'Outer loop rows 1..N; inner loop prints i stars on row i; newline after each row.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(1, n + 1):\n' +
          '    print("*" * i)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = 1; i <= n; i++) {\n' +
          '            for (int j = 1; j <= i; j++) System.out.print("*");\n' +
          '            System.out.println();\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int j = 1; j <= i; j++) printf("*");\n' +
          '        printf("\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int j = 1; j <= i; j++) cout << "*";\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The outer loop picks the row; the inner loop draws that row. The trick is that the inner loop runs ' +
      'i times on row i, so each row has one more star than the last. That link between the two loops is the whole idea.',
    tip: 'Almost every pattern is "outer loop = rows, inner loop = what goes in each row". Master this one first.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Patterns', topics: ['Nested Loops', 'Patterns'],
    title: 'Inverted Star Triangle',
    description:
      'Read a number N and print an upside-down triangle of stars.\n\n' +
      'The first row has N stars, and each row below has one fewer, down to 1.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'N rows, starting with N stars and decreasing by one each row.',
    examples: [
      ex('4', '****\n***\n**\n*', 'Row 1 has four stars, then three, two, and one.'),
    ],
    hints: [
      'This is the star triangle in reverse — start big and shrink.',
      'Let the outer loop count down from N to 1.',
    ],
    approach:
      'Run the outer loop from N down to 1. On each row, the inner loop prints as many stars as the current ' +
      'outer value. Because the outer value shrinks, each row gets shorter.',
    whatYouLearn: ['Counting a loop downwards', 'Turning a pattern upside down'],
    solutions: solo(
      'Outer loop from N down to 1; inner loop prints that many stars per row.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(n, 0, -1):\n' +
          '    print("*" * i)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = n; i >= 1; i--) {\n' +
          '            for (int j = 1; j <= i; j++) System.out.print("*");\n' +
          '            System.out.println();\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = n; i >= 1; i--) {\n' +
          '        for (int j = 1; j <= i; j++) printf("*");\n' +
          '        printf("\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = n; i >= 1; i--) {\n' +
          '        for (int j = 1; j <= i; j++) cout << "*";\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Only one thing changed from the normal triangle: the outer loop counts down instead of up. The ' +
      'inner loop still prints "current row value" stars — but now that value starts high and falls, flipping the shape.',
    tip: 'Once you can build a shape, ask "what if the loop ran the other way?" — half of patterns come from that.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Patterns', topics: ['Nested Loops', 'Patterns'],
    title: 'Number Triangle',
    description:
      'Read a number N and print a triangle where each row lists numbers from 1 up to the row number.\n\n' +
      'Row 3 prints 123, row 4 prints 1234, and so on.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'N rows; row i prints the numbers 1 to i with no spaces.',
    examples: [
      ex('4', '1\n12\n123\n1234', 'Each row counts from 1 up to its own row number.'),
    ],
    hints: [
      'Same structure as the star triangle — but print the counter instead of a star.',
      'The inner loop counter itself is the number to print.',
    ],
    approach:
      'Outer loop for rows 1..N. The inner loop runs from 1 to i, and instead of a star it prints the inner ' +
      'counter value. So row i shows 1, 2, ... up to i. Newline after each row.',
    whatYouLearn: ['Printing the loop counter to form patterns', 'Reusing a structure with a small change'],
    solutions: solo(
      'Outer loop rows 1..N; inner loop prints numbers 1..i; newline each row.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(1, n + 1):\n' +
          '    for j in range(1, i + 1):\n' +
          '        print(j, end="")\n' +
          '    print()',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = 1; i <= n; i++) {\n' +
          '            for (int j = 1; j <= i; j++) System.out.print(j);\n' +
          '            System.out.println();\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int j = 1; j <= i; j++) printf("%d", j);\n' +
          '        printf("\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int j = 1; j <= i; j++) cout << j;\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The inner loop counter j runs from 1 to i, and we print j itself. Because the code prints the counter ' +
      'rather than a fixed star, the same triangle structure now shows increasing numbers on each row.',
    tip: 'See how the shape is identical to the star triangle? Patterns are variations on a few core skeletons.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Patterns', topics: ['Nested Loops', 'Patterns', 'Counter'],
    title: "Floyd's Triangle",
    description:
      'Print a triangle filled with numbers that keep counting up, without ever resetting.\n\n' +
      'Row 1 has 1 number, row 2 has 2, and the numbers run 1, 2, 3, 4, ... continuously.',
    inputFormat: 'One integer N (number of rows).',
    outputFormat: 'N rows; row i has i numbers, continuing the count from the previous row.',
    examples: [
      ex('4', '1\n2 3\n4 5 6\n7 8 9 10', 'The count never restarts — it flows across all rows.'),
    ],
    hints: [
      'Keep one counter OUTSIDE both loops so it does not reset each row.',
      'Print the counter, then increase it by 1 — every single time.',
    ],
    approach:
      'The key insight: the number is not tied to the row or column — it just keeps growing. So declare a ' +
      'counter before the loops start. Inside the inner loop, print it and add 1. Never reset it.',
    whatYouLearn: ['Keeping state across loop iterations', 'Why a counter\'s position (inside vs outside) matters'],
    solutions: solo(
      'Use one running counter declared before the loops; print and increment it in the inner loop.',
      {
        python:
          'n = int(input())\n' +
          'num = 1\n' +
          'for i in range(1, n + 1):\n' +
          '    for j in range(i):\n' +
          '        print(num, end=" ")\n' +
          '        num += 1\n' +
          '    print()',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int num = 1;\n' +
          '        for (int i = 1; i <= n; i++) {\n' +
          '            for (int j = 0; j < i; j++) System.out.print(num++ + " ");\n' +
          '            System.out.println();\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int num = 1;\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int j = 0; j < i; j++) printf("%d ", num++);\n' +
          '        printf("\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int num = 1;\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int j = 0; j < i; j++) cout << num++ << " ";\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'If you reset the number each row you would repeat values. Because the counter lives outside both loops, ' +
      'it survives from one row to the next and keeps flowing. Where you declare a variable decides how long it remembers its value.',
    tip: 'Ask of every variable: "should this reset each row, or keep going?" That single question fixes most pattern bugs.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Number Logic', topics: ['While Loop', 'Digits'],
    title: 'Reverse a Number',
    description:
      'Read a whole number and print it with its digits reversed.\n\n' +
      'For 1234 the output is 4321.',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'The number with its digits reversed.',
    examples: [
      ex('1234', '4321', 'The digits are printed in the opposite order.'),
      ex('50', '5', 'Reversing 50 gives 05, which is just 5 as a number.'),
    ],
    hints: [
      'Peel off the last digit with % 10, and build the reversed number as you go.',
      'reversed = reversed * 10 + last_digit shifts old digits left and adds the new one.',
    ],
    approach:
      'Start reversed at 0. Repeatedly take the last digit (n % 10), append it to reversed using ' +
      'reversed = reversed * 10 + digit, then drop that digit from n (n // 10). Stop when n hits 0.',
    whatYouLearn: ['Building a number digit by digit', 'The reversed = reversed*10 + digit trick'],
    solutions: solo(
      'Peel the last digit each step and build reversed = reversed*10 + digit until n is 0.',
      {
        python:
          'n = int(input())\n' +
          'reversed_num = 0\n' +
          'while n > 0:\n' +
          '    reversed_num = reversed_num * 10 + n % 10\n' +
          '    n //= 10\n' +
          'print(reversed_num)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int rev = 0;\n' +
          '        while (n > 0) {\n' +
          '            rev = rev * 10 + n % 10;\n' +
          '            n /= 10;\n' +
          '        }\n' +
          '        System.out.println(rev);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, rev = 0;\n' +
          '    scanf("%d", &n);\n' +
          '    while (n > 0) {\n' +
          '        rev = rev * 10 + n % 10;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    printf("%d\\n", rev);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, rev = 0;\n' +
          '    cin >> n;\n' +
          '    while (n > 0) {\n' +
          '        rev = rev * 10 + n % 10;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    cout << rev << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Each step grabs the current last digit and pushes it into reversed. Multiplying reversed by 10 first ' +
      'makes room (shifts existing digits left) before adding the new digit. This is the backbone of palindrome checks too.',
    tip: 'This reverse trick appears constantly — palindrome numbers, digit puzzles, and more. Learn it cold.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Number Logic', topics: ['While Loop', 'Digits', 'Max'],
    title: 'Largest Digit in a Number',
    description:
      'Read a whole number and print its largest single digit.\n\n' +
      'For 4917 the largest digit is 9.',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'One digit: the largest one in the number.',
    examples: [
      ex('4917', '9', 'Among 4, 9, 1, 7 the biggest is 9.'),
      ex('300', '3', 'Among 3, 0, 0 the biggest is 3.'),
    ],
    hints: [
      'Look at digits one at a time using % 10 and // 10.',
      'Keep a "largest so far" variable and update it when you find a bigger digit.',
    ],
    approach:
      'Combine two ideas you already know: walking digits with % 10 / // 10, and tracking the maximum so far. ' +
      'Start largest at 0, check each digit, and raise largest whenever a digit beats it.',
    whatYouLearn: ['Combining digit-walking with max-tracking', 'Reusing small patterns together'],
    solutions: solo(
      'Walk each digit with % 10 and keep the maximum seen so far.',
      {
        python:
          'n = int(input())\n' +
          'largest = 0\n' +
          'while n > 0:\n' +
          '    digit = n % 10\n' +
          '    if digit > largest:\n' +
          '        largest = digit\n' +
          '    n //= 10\n' +
          'print(largest)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int largest = 0;\n' +
          '        while (n > 0) {\n' +
          '            int digit = n % 10;\n' +
          '            if (digit > largest) largest = digit;\n' +
          '            n /= 10;\n' +
          '        }\n' +
          '        System.out.println(largest);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, largest = 0;\n' +
          '    scanf("%d", &n);\n' +
          '    while (n > 0) {\n' +
          '        int digit = n % 10;\n' +
          '        if (digit > largest) largest = digit;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    printf("%d\\n", largest);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, largest = 0;\n' +
          '    cin >> n;\n' +
          '    while (n > 0) {\n' +
          '        int digit = n % 10;\n' +
          '        if (digit > largest) largest = digit;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    cout << largest << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'You are running two familiar patterns at once: peel each digit off with % 10, and keep the "best so far" ' +
      'like a maximum finder. Logic building is mostly about spotting which small patterns to combine.',
    tip: 'Big problems are just small patterns stacked together. Name the patterns you know and reach for them.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Number Logic', topics: ['Loops', 'Divisibility', 'Primes'],
    title: 'Prime Number Check',
    description:
      'A prime number is greater than 1 and divisible only by 1 and itself.\n\n' +
      'Read a number and print "Prime" or "Not Prime".',
    inputFormat: 'One integer N.',
    outputFormat: 'Either "Prime" or "Not Prime".',
    examples: [
      ex('7', 'Prime', '7 has no divisors other than 1 and 7.'),
      ex('12', 'Not Prime', '12 is divisible by 2, 3, 4 and 6, so it is not prime.'),
    ],
    hints: [
      'Try dividing by every number from 2 upward — if any divides evenly, it is not prime.',
      'You only need to check up to the square root of N, not all the way to N.',
    ],
    approach:
      'Numbers below 2 are not prime. Otherwise, test divisors starting at 2. If any divides N with no ' +
      'remainder, N is not prime. You can stop at sqrt(N): if a factor exists above it, its partner is below it.',
    whatYouLearn: ['Turning a definition into a loop', 'Why checking up to the square root is enough'],
    solutions: solo(
      'Reject numbers below 2; then test divisors from 2 up to sqrt(N). Any clean divisor means not prime.',
      {
        python:
          'n = int(input())\n' +
          'if n < 2:\n' +
          '    print("Not Prime")\n' +
          'else:\n' +
          '    is_prime = True\n' +
          '    i = 2\n' +
          '    while i * i <= n:\n' +
          '        if n % i == 0:\n' +
          '            is_prime = False\n' +
          '            break\n' +
          '        i += 1\n' +
          '    print("Prime" if is_prime else "Not Prime")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        boolean prime = n >= 2;\n' +
          '        for (int i = 2; i * i <= n; i++) {\n' +
          '            if (n % i == 0) { prime = false; break; }\n' +
          '        }\n' +
          '        System.out.println(prime ? "Prime" : "Not Prime");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int prime = n >= 2;\n' +
          '    for (int i = 2; i * i <= n; i++) {\n' +
          '        if (n % i == 0) { prime = 0; break; }\n' +
          '    }\n' +
          '    printf(prime ? "Prime\\n" : "Not Prime\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    bool prime = n >= 2;\n' +
          '    for (int i = 2; i * i <= n; i++) {\n' +
          '        if (n % i == 0) { prime = false; break; }\n' +
          '    }\n' +
          '    cout << (prime ? "Prime" : "Not Prime") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The loop searches for any factor between 2 and sqrt(N). Finding one proves N is composite, so we stop ' +
      'early. Checking only to the square root works because factors come in pairs — if one is bigger than sqrt(N), the other is smaller.',
    tip: 'The "break as soon as you find proof" idea saves huge amounts of work. Stop the moment you know the answer.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Number Logic', topics: ['Digits', 'Reverse'],
    title: 'Palindrome Number',
    description:
      'A palindrome reads the same forwards and backwards.\n\n' +
      'Read a number and print "Palindrome" if it equals its own reverse, otherwise "Not Palindrome".',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'Either "Palindrome" or "Not Palindrome".',
    examples: [
      ex('121', 'Palindrome', '121 reversed is still 121.'),
      ex('123', 'Not Palindrome', '123 reversed is 321, which is different.'),
    ],
    hints: [
      'Reverse the number first (the trick from the Reverse a Number problem).',
      'Compare the reversed value with the original — keep a copy of the original.',
    ],
    approach:
      'Save the original number in a separate variable. Reverse a working copy using the digit-by-digit ' +
      'method. Finally compare the reverse with the saved original: equal means palindrome.',
    whatYouLearn: ['Reusing the reverse-a-number skill', 'Keeping an original value while modifying a copy'],
    solutions: solo(
      'Reverse a copy of the number, then compare it to the saved original.',
      {
        python:
          'n = int(input())\n' +
          'original = n\n' +
          'reversed_num = 0\n' +
          'while n > 0:\n' +
          '    reversed_num = reversed_num * 10 + n % 10\n' +
          '    n //= 10\n' +
          'print("Palindrome" if reversed_num == original else "Not Palindrome")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int original = n, rev = 0;\n' +
          '        while (n > 0) { rev = rev * 10 + n % 10; n /= 10; }\n' +
          '        System.out.println(rev == original ? "Palindrome" : "Not Palindrome");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int original = n, rev = 0;\n' +
          '    while (n > 0) { rev = rev * 10 + n % 10; n /= 10; }\n' +
          '    printf(rev == original ? "Palindrome\\n" : "Not Palindrome\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int original = n, rev = 0;\n' +
          '    while (n > 0) { rev = rev * 10 + n % 10; n /= 10; }\n' +
          '    cout << (rev == original ? "Palindrome" : "Not Palindrome") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The reversing loop destroys n as it works, so we save the original first. Comparing the reverse to that ' +
      'saved value answers the question. This is a perfect example of building a new problem out of one you already solved.',
    tip: 'Notice you did not learn anything new here — you combined reverse + compare. That is logic building.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Number Logic', topics: ['Loops', 'Divisibility'],
    title: 'Count the Divisors',
    description:
      'Read a number and print how many divisors it has (numbers that divide it evenly, including 1 and itself).\n\n' +
      'For 12 the divisors are 1, 2, 3, 4, 6, 12 — so the answer is 6.',
    inputFormat: 'One positive integer N.',
    outputFormat: 'One integer: the count of divisors.',
    examples: [
      ex('12', '6', '1, 2, 3, 4, 6 and 12 divide 12 evenly.'),
      ex('7', '2', 'Only 1 and 7 divide 7 — it is prime.'),
    ],
    hints: [
      'Loop from 1 to N and count the numbers that divide N with no remainder.',
      'A divisor leaves remainder 0 when N is divided by it.',
    ],
    approach:
      'Start a counter at 0. Loop a number i from 1 to N. Each time N % i is 0, i is a divisor, so add 1 to the ' +
      'counter. After the loop, the counter holds the total number of divisors.',
    whatYouLearn: ['Counting things that satisfy a rule', 'Using the remainder test for "divides evenly"'],
    solutions: solo(
      'Loop i from 1 to N and count each i where N % i == 0.',
      {
        python:
          'n = int(input())\n' +
          'count = 0\n' +
          'for i in range(1, n + 1):\n' +
          '    if n % i == 0:\n' +
          '        count += 1\n' +
          'print(count)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int count = 0;\n' +
          '        for (int i = 1; i <= n; i++) if (n % i == 0) count++;\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, count = 0;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= n; i++) if (n % i == 0) count++;\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, count = 0;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i <= n; i++) if (n % i == 0) count++;\n' +
          '    cout << count << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Every number from 1 to N is tested as a possible divisor. The remainder test (N % i == 0) decides ' +
      'whether i divides N cleanly. Counting the successes gives the divisor count — and exactly 2 divisors means the number is prime.',
    tip: 'Spot the link: a number with exactly two divisors is prime. Small problems quietly connect to each other.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Math & Series', topics: ['Series', 'Loops'],
    title: 'Fibonacci Series',
    description:
      'In the Fibonacci series each number is the sum of the two before it, starting 0, 1.\n\n' +
      'Read N and print the first N Fibonacci numbers.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'The first N Fibonacci numbers, space-separated on one line.',
    examples: [
      ex('7', '0 1 1 2 3 5 8', 'Each term is the sum of the previous two.'),
    ],
    hints: [
      'Keep track of the last two numbers; the next one is their sum.',
      'After printing, slide the pair forward: the second becomes the first, the sum becomes the second.',
    ],
    approach:
      'Hold two variables a and b (start 0 and 1). Print a, then update the pair so a takes b\'s value and b ' +
      'becomes a + b. Repeat N times. The whole series comes from just remembering the last two values.',
    whatYouLearn: ['Carrying two values forward each step', 'Generating a series from a rule'],
    solutions: solo(
      'Keep the last two numbers; each step print the first, then shift the pair forward.',
      {
        python:
          'n = int(input())\n' +
          'a, b = 0, 1\n' +
          'for _ in range(n):\n' +
          '    print(a, end=" ")\n' +
          '    a, b = b, a + b',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int a = 0, b = 1;\n' +
          '        for (int i = 0; i < n; i++) {\n' +
          '            System.out.print(a + " ");\n' +
          '            int next = a + b; a = b; b = next;\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int a = 0, b = 1;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        printf("%d ", a);\n' +
          '        int next = a + b; a = b; b = next;\n' +
          '    }\n' +
          '    printf("\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int a = 0, b = 1;\n' +
          '    for (int i = 0; i < n; i++) {\n' +
          '        cout << a << " ";\n' +
          '        int next = a + b; a = b; b = next;\n' +
          '    }\n' +
          '    cout << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'You never need the whole series in memory — only the last two numbers. Each step prints one and shifts ' +
      'the pair forward. Languages without simultaneous assignment use a temporary "next" variable to avoid overwriting a too early.',
    tip: 'Watch the update order in Java/C/C++: compute next BEFORE changing a, or you will corrupt the series.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Math & Series', topics: ['Math', 'GCD'],
    title: 'GCD of Two Numbers',
    description:
      'The GCD (greatest common divisor) is the largest number that divides both values evenly.\n\n' +
      'Read two numbers and print their GCD.',
    inputFormat: 'Two positive integers a and b.',
    outputFormat: 'One integer: the GCD of a and b.',
    examples: [
      ex('12\n18', '6', '6 is the largest number dividing both 12 and 18.'),
      ex('7\n5', '1', '7 and 5 share no factor except 1.'),
    ],
    hints: [
      'There is a fast rule: gcd(a, b) = gcd(b, a % b).',
      'Keep replacing the pair until one becomes 0 — the other is the answer.',
    ],
    approach:
      'Use the Euclidean method. Repeatedly replace (a, b) with (b, a % b). Each step shrinks the numbers ' +
      'fast. When b reaches 0, a holds the GCD. This is far quicker than testing every possible divisor.',
    whatYouLearn: ['The Euclidean algorithm', 'Using remainder to shrink a problem quickly'],
    solutions: solo(
      'Apply gcd(a, b) = gcd(b, a % b) until b is 0; then a is the GCD.',
      {
        python:
          'a = int(input())\n' +
          'b = int(input())\n' +
          'while b != 0:\n' +
          '    a, b = b, a % b\n' +
          'print(a)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt();\n' +
          '        while (b != 0) { int t = b; b = a % b; a = t; }\n' +
          '        System.out.println(a);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    scanf("%d %d", &a, &b);\n' +
          '    while (b != 0) { int t = b; b = a % b; a = t; }\n' +
          '    printf("%d\\n", a);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    cin >> a >> b;\n' +
          '    while (b != 0) { int t = b; b = a % b; a = t; }\n' +
          '    cout << a << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The Euclidean algorithm works because any common divisor of a and b also divides a % b. Replacing the ' +
      'bigger number with the remainder shrinks the pair rapidly, and when the remainder hits 0 the other number is the GCD.',
    tip: 'Once you have GCD, LCM is easy: LCM(a, b) = a * b / GCD(a, b). Solved problems become tools.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Math & Series', topics: ['Math', 'Loops'],
    title: 'Power Without Built-ins',
    description:
      'Read two numbers, a base and an exponent, and print base raised to the exponent — without using any ' +
      'built-in power function.\n\n' +
      'For base 2 and exponent 5, the answer is 32.',
    inputFormat: 'Two integers: base and exponent (exponent >= 0).',
    outputFormat: 'One integer: base raised to the exponent.',
    examples: [
      ex('2\n5', '32', '2 multiplied by itself 5 times is 32.'),
      ex('7\n0', '1', 'Anything to the power 0 is 1.'),
    ],
    hints: [
      'Raising to a power is just repeated multiplication.',
      'Start the result at 1 and multiply by the base "exponent" times.',
    ],
    approach:
      'Set result to 1. Loop exactly exponent times, multiplying result by the base each pass. Starting at 1 ' +
      'is what makes exponent 0 correctly give 1 (the loop simply never runs).',
    whatYouLearn: ['Repeated multiplication as power', 'Why the starting value is 1 for products'],
    solutions: solo(
      'Start result at 1 and multiply by the base "exponent" times.',
      {
        python:
          'base = int(input())\n' +
          'exp = int(input())\n' +
          'result = 1\n' +
          'for _ in range(exp):\n' +
          '    result *= base\n' +
          'print(result)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int base = sc.nextInt(), exp = sc.nextInt();\n' +
          '        long result = 1;\n' +
          '        for (int i = 0; i < exp; i++) result *= base;\n' +
          '        System.out.println(result);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int base, exp;\n' +
          '    scanf("%d %d", &base, &exp);\n' +
          '    long long result = 1;\n' +
          '    for (int i = 0; i < exp; i++) result *= base;\n' +
          '    printf("%lld\\n", result);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int base, exp;\n' +
          '    cin >> base >> exp;\n' +
          '    long long result = 1;\n' +
          '    for (int i = 0; i < exp; i++) result *= base;\n' +
          '    cout << result << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A power is defined as multiplying the base by itself exponent times. Starting result at 1 handles the ' +
      'exponent-0 case automatically, since multiplying nothing leaves the identity value 1. Bigger results use a long type to avoid overflow.',
    tip: 'Building things "from scratch" instead of calling a built-in is how you truly understand what they do.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Math & Series', topics: ['Math', 'LCM', 'GCD'],
    title: 'LCM of Two Numbers',
    description:
      'The LCM (least common multiple) is the smallest number that both values divide into evenly.\n\n' +
      'Read two numbers and print their LCM.',
    inputFormat: 'Two positive integers a and b.',
    outputFormat: 'One integer: the LCM of a and b.',
    examples: [
      ex('4\n6', '12', '12 is the smallest number both 4 and 6 divide into.'),
      ex('3\n5', '15', '3 and 5 share nothing, so LCM is their product.'),
    ],
    hints: [
      'There is a shortcut: LCM = a * b / GCD(a, b).',
      'Find the GCD first (Euclid), then divide the product by it.',
    ],
    approach:
      'Reuse the GCD you already know how to compute. Once you have it, the LCM is simply a times b divided by ' +
      'the GCD. Computing GCD first avoids a slow search for common multiples.',
    whatYouLearn: ['Building LCM on top of GCD', 'Reusing a solved sub-problem'],
    solutions: solo(
      'Compute GCD with Euclid, then return a * b / GCD.',
      {
        python:
          'a = int(input())\n' +
          'b = int(input())\n' +
          'x, y = a, b\n' +
          'while y != 0:\n' +
          '    x, y = y, x % y\n' +
          'print(a * b // x)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt();\n' +
          '        int x = a, y = b;\n' +
          '        while (y != 0) { int t = y; y = x % y; x = t; }\n' +
          '        System.out.println((long) a * b / x);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    scanf("%d %d", &a, &b);\n' +
          '    int x = a, y = b;\n' +
          '    while (y != 0) { int t = y; y = x % y; x = t; }\n' +
          '    printf("%lld\\n", (long long) a * b / x);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    cin >> a >> b;\n' +
          '    int x = a, y = b;\n' +
          '    while (y != 0) { int t = y; y = x % y; x = t; }\n' +
          '    cout << (long long) a * b / x << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The identity LCM(a, b) = a * b / GCD(a, b) comes from the fact that multiplying the two numbers double-counts ' +
      'their shared factors exactly once — dividing by the GCD removes that overlap. Reusing GCD makes this short and fast.',
    tip: 'This is the second time GCD paid off. Solve a problem well once and it keeps rewarding you.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Number Logic', topics: ['Digits', 'Math'],
    title: 'Armstrong Number',
    description:
      'A 3-digit Armstrong number equals the sum of the cubes of its digits.\n\n' +
      '153 is Armstrong because 1³ + 5³ + 3³ = 1 + 125 + 27 = 153.\n\n' +
      'Read a 3-digit number and print "Armstrong" or "Not Armstrong".',
    inputFormat: 'One 3-digit integer.',
    outputFormat: 'Either "Armstrong" or "Not Armstrong".',
    examples: [
      ex('153', 'Armstrong', '1³ + 5³ + 3³ = 153.'),
      ex('123', 'Not Armstrong', '1³ + 2³ + 3³ = 36, which is not 123.'),
    ],
    hints: [
      'Extract each digit with % 10 and // 10, just like before.',
      'Cube each digit, add them up, and compare the total to the original number.',
    ],
    approach:
      'Save the original number. Walk its digits with % 10 and // 10, cubing each and adding to a sum. At the ' +
      'end, compare the sum of cubes to the saved original. Equal means it is an Armstrong number.',
    whatYouLearn: ['Combining digit extraction with a running sum', 'Translating a maths definition into code'],
    solutions: solo(
      'Sum the cubes of the digits and compare to the original number.',
      {
        python:
          'n = int(input())\n' +
          'original = n\n' +
          'total = 0\n' +
          'while n > 0:\n' +
          '    d = n % 10\n' +
          '    total += d * d * d\n' +
          '    n //= 10\n' +
          'print("Armstrong" if total == original else "Not Armstrong")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int original = n, total = 0;\n' +
          '        while (n > 0) { int d = n % 10; total += d * d * d; n /= 10; }\n' +
          '        System.out.println(total == original ? "Armstrong" : "Not Armstrong");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int original = n, total = 0;\n' +
          '    while (n > 0) { int d = n % 10; total += d * d * d; n /= 10; }\n' +
          '    printf(total == original ? "Armstrong\\n" : "Not Armstrong\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int original = n, total = 0;\n' +
          '    while (n > 0) { int d = n % 10; total += d * d * d; n /= 10; }\n' +
          '    cout << (total == original ? "Armstrong" : "Not Armstrong") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'This blends two patterns you already know: peeling digits with % 10 / // 10, and building a running sum. ' +
      'Cubing each digit and comparing to the saved original turns the definition directly into working code.',
    tip: 'Every "special number" problem (Armstrong, perfect, palindrome) is digit-walking plus one small rule.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Number Logic', topics: ['Loops', 'Divisibility'],
    title: 'Perfect Number',
    description:
      'A perfect number equals the sum of its proper divisors (all divisors except itself).\n\n' +
      '6 is perfect because 1 + 2 + 3 = 6.\n\n' +
      'Read a number and print "Perfect" or "Not Perfect".',
    inputFormat: 'One positive integer N.',
    outputFormat: 'Either "Perfect" or "Not Perfect".',
    examples: [
      ex('6', 'Perfect', '1 + 2 + 3 = 6.'),
      ex('10', 'Not Perfect', '1 + 2 + 5 = 8, which is not 10.'),
    ],
    hints: [
      'Find every divisor from 1 up to N-1 and add them.',
      'Do NOT include N itself in the sum.',
    ],
    approach:
      'Loop i from 1 to N-1, adding i to a sum whenever it divides N evenly. Excluding N itself is the crucial ' +
      'detail. After the loop, compare the sum of proper divisors to N.',
    whatYouLearn: ['Summing divisors with a condition', 'Reading a definition precisely (excluding N)'],
    solutions: solo(
      'Add every divisor from 1 to N-1, then check if the sum equals N.',
      {
        python:
          'n = int(input())\n' +
          'total = 0\n' +
          'for i in range(1, n):\n' +
          '    if n % i == 0:\n' +
          '        total += i\n' +
          'print("Perfect" if total == n else "Not Perfect")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int total = 0;\n' +
          '        for (int i = 1; i < n; i++) if (n % i == 0) total += i;\n' +
          '        System.out.println(total == n ? "Perfect" : "Not Perfect");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i < n; i++) if (n % i == 0) total += i;\n' +
          '    printf(total == n ? "Perfect\\n" : "Not Perfect\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i < n; i++) if (n % i == 0) total += i;\n' +
          '    cout << (total == n ? "Perfect" : "Not Perfect") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The loop stops at N-1 so the number itself is never counted — that is what "proper divisor" means. ' +
      'Summing those divisors and comparing to N answers the question. Read definitions carefully; one wrong bound changes everything.',
    tip: 'The whole difference between "count divisors" and "perfect number" is where the loop stops. Bounds matter.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Number Logic', topics: ['Digits', 'While Loop'],
    title: 'Digital Root',
    description:
      'Keep summing the digits of a number until only one digit is left.\n\n' +
      'For 9875: 9+8+7+5 = 29, then 2+9 = 11, then 1+1 = 2. The digital root is 2.',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'A single digit: the digital root.',
    examples: [
      ex('9875', '2', '9875 → 29 → 11 → 2.'),
      ex('7', '7', 'A single digit is already its own digital root.'),
    ],
    hints: [
      'You need a loop inside a loop: repeat the digit-sum until the number drops below 10.',
      'After each full digit-sum, replace the number with that sum and check again.',
    ],
    approach:
      'Use an outer while loop that continues while the number has more than one digit (>= 10). Inside, sum all ' +
      'its digits. Replace the number with that sum. Repeat until a single digit remains.',
    whatYouLearn: ['Looping until a condition is finally met', 'Nesting a digit-sum inside a repeat loop'],
    solutions: solo(
      'Repeatedly replace the number with the sum of its digits until it is a single digit.',
      {
        python:
          'n = int(input())\n' +
          'while n >= 10:\n' +
          '    s = 0\n' +
          '    while n > 0:\n' +
          '        s += n % 10\n' +
          '        n //= 10\n' +
          '    n = s\n' +
          'print(n)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        while (n >= 10) {\n' +
          '            int s = 0;\n' +
          '            while (n > 0) { s += n % 10; n /= 10; }\n' +
          '            n = s;\n' +
          '        }\n' +
          '        System.out.println(n);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    while (n >= 10) {\n' +
          '        int s = 0;\n' +
          '        while (n > 0) { s += n % 10; n /= 10; }\n' +
          '        n = s;\n' +
          '    }\n' +
          '    printf("%d\\n", n);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    while (n >= 10) {\n' +
          '        int s = 0;\n' +
          '        while (n > 0) { s += n % 10; n /= 10; }\n' +
          '        n = s;\n' +
          '    }\n' +
          '    cout << n << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The inner loop does one round of digit-summing; the outer loop keeps repeating that until a single digit ' +
      'is left. This "loop until nothing changes" shape appears in many real algorithms — recognising when to stop is the skill.',
    tip: 'Two nested whiles feel scary at first. Trace one small number by hand and it clicks fast.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Number Logic', topics: ['Digits', 'Loops'],
    title: 'Count Even and Odd Digits',
    description:
      'Read a positive number and count how many of its digits are even and how many are odd.\n\n' +
      'Print the two counts.',
    inputFormat: 'One positive integer.',
    outputFormat: 'Two integers separated by a space: the count of even digits and the count of odd digits.',
    examples: [
      ex('123456', '3 3', 'Even digits: 2, 4, 6. Odd digits: 1, 3, 5.'),
      ex('2468', '4 0', 'All four digits are even.'),
    ],
    hints: [
      'Peel off digits one at a time using % 10 and ÷ 10.',
      'Test each digit with % 2 to decide even or odd.',
    ],
    approach:
      'Walk through the number digit by digit. The last digit is number % 10, and dividing by 10 removes it so you ' +
      'can reach the next one. For each digit, check % 2 to bump either the even or the odd counter.',
    whatYouLearn: ['Looping through digits', 'Classifying each digit as even or odd'],
    solutions: solo(
      'Repeatedly take the last digit (% 10), classify it, then drop it (÷ 10) until the number is gone.',
      {
        python:
          'n = int(input())\n' +
          'even = odd = 0\n' +
          'while n > 0:\n' +
          '    d = n % 10\n' +
          '    if d % 2 == 0:\n' +
          '        even += 1\n' +
          '    else:\n' +
          '        odd += 1\n' +
          '    n //= 10\n' +
          'print(even, odd)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int even = 0, odd = 0;\n' +
          '        while (n > 0) {\n' +
          '            int d = n % 10;\n' +
          '            if (d % 2 == 0) even++; else odd++;\n' +
          '            n /= 10;\n' +
          '        }\n' +
          '        System.out.println(even + " " + odd);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int even = 0, odd = 0;\n' +
          '    while (n > 0) {\n' +
          '        int d = n % 10;\n' +
          '        if (d % 2 == 0) even++; else odd++;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    printf("%d %d\\n", even, odd);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int even = 0, odd = 0;\n' +
          '    while (n > 0) {\n' +
          '        int d = n % 10;\n' +
          '        if (d % 2 == 0) even++; else odd++;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    cout << even << " " << odd << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Processing a number digit by digit is a core logic-building skill. The pair "% 10 to read, ÷ 10 to advance" ' +
      'is the engine; the even/odd test just decides which counter grows. Master this loop and reversing, summing, or checking digits all become easy.',
    tip: 'The % 10 / ÷ 10 loop is the workhorse of digit problems. Recognise it instantly.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Number Logic', topics: ['Digits', 'Loops'],
    title: 'Product of Digits',
    description:
      'Read a positive number and multiply all of its digits together.\n\n' +
      'Print the product.',
    inputFormat: 'One positive integer.',
    outputFormat: 'One integer: the product of all the digits.',
    examples: [
      ex('234', '24', '2 × 3 × 4 = 24.'),
      ex('405', '0', 'One digit is 0, so the whole product becomes 0.'),
    ],
    hints: [
      'Start the product at 1, not 0 — multiplying by 0 would wipe everything out.',
      'Peel digits with % 10 and ÷ 10, multiplying each into the product.',
    ],
    approach:
      'Keep a running product starting at 1. Take each digit with % 10, multiply it into the product, then remove it ' +
      'with ÷ 10. Starting at 1 is essential, because starting at 0 would make every product 0.',
    whatYouLearn: ['Building a product (not a sum)', 'Why a product accumulator starts at 1'],
    solutions: solo(
      'Multiply every digit into a running product that starts at 1.',
      {
        python:
          'n = int(input())\n' +
          'product = 1\n' +
          'while n > 0:\n' +
          '    product *= n % 10\n' +
          '    n //= 10\n' +
          'print(product)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int product = 1;\n' +
          '        while (n > 0) {\n' +
          '            product *= n % 10;\n' +
          '            n /= 10;\n' +
          '        }\n' +
          '        System.out.println(product);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int product = 1;\n' +
          '    while (n > 0) {\n' +
          '        product *= n % 10;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    printf("%d\\n", product);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int product = 1;\n' +
          '    while (n > 0) {\n' +
          '        product *= n % 10;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    cout << product << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A product accumulator must start at 1 — the multiplicative identity — otherwise the first multiplication by 0 ' +
      'ruins it. The digit loop is the same as before; only the operation changed from adding to multiplying. Recognising when to start at 0 versus 1 is a subtle but important habit.',
    tip: 'Sums start at 0, products start at 1. Getting the starting value wrong is a classic beginner bug.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Number Logic', topics: ['Number Systems', 'Loops'],
    title: 'Decimal to Binary',
    description:
      'Read a non-negative number and print its binary (base-2) representation.\n\n' +
      'Binary uses only the digits 0 and 1.',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'The number written in binary.',
    examples: [
      ex('10', '1010', '10 in binary is 1010 (8 + 2).'),
      ex('0', '0', 'Zero is written as 0.'),
    ],
    hints: [
      'Repeatedly divide by 2 and record the remainders.',
      'The remainders come out in reverse order, so build the answer from the front.',
    ],
    approach:
      'Dividing by 2 and noting the remainder gives one binary digit at a time — but from least significant to most. ' +
      'So collect the remainders and reverse them (or prepend each new one to the front). Handle 0 as a special case, since the loop would produce nothing.',
    whatYouLearn: ['Converting between number bases', 'Collecting digits in reverse order'],
    solutions: solo(
      'Take remainders mod 2 while dividing by 2, then read them most-significant first.',
      {
        python:
          'n = int(input())\n' +
          'if n == 0:\n' +
          '    print(0)\n' +
          'else:\n' +
          '    bits = ""\n' +
          '    while n > 0:\n' +
          '        bits = str(n % 2) + bits\n' +
          '        n //= 2\n' +
          '    print(bits)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        if (n == 0) { System.out.println(0); return; }\n' +
          '        StringBuilder bits = new StringBuilder();\n' +
          '        while (n > 0) {\n' +
          '            bits.insert(0, n % 2);\n' +
          '            n /= 2;\n' +
          '        }\n' +
          '        System.out.println(bits.toString());\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    if (n == 0) { printf("0\\n"); return 0; }\n' +
          '    int bits[64], count = 0;\n' +
          '    while (n > 0) {\n' +
          '        bits[count++] = n % 2;\n' +
          '        n /= 2;\n' +
          '    }\n' +
          '    for (int i = count - 1; i >= 0; i--) printf("%d", bits[i]);\n' +
          '    printf("\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    if (n == 0) { cout << 0 << endl; return 0; }\n' +
          '    string bits = "";\n' +
          '    while (n > 0) {\n' +
          '        bits = char(\'0\' + n % 2) + bits;\n' +
          '        n /= 2;\n' +
          '    }\n' +
          '    cout << bits << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Base conversion works by repeated division: each remainder is a digit in the new base, produced from lowest ' +
      'place to highest. Because they arrive in reverse, you prepend them or reverse at the end. The 0 special case ' +
      'matters — without it the loop body never runs and prints nothing.',
    tip: 'Repeated division gives digits back-to-front. Always ask whether you need to reverse them.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Number Logic', topics: ['Number Systems', 'Strings'],
    title: 'Binary to Decimal',
    description:
      'Read a binary number (a string of 0s and 1s) and print its value in normal decimal.',
    inputFormat: 'One binary number (only the characters 0 and 1).',
    outputFormat: 'One integer: the decimal value.',
    examples: [
      ex('1010', '10', '1010 in binary equals 8 + 0 + 2 + 0 = 10.'),
      ex('111', '7', '111 equals 4 + 2 + 1 = 7.'),
    ],
    hints: [
      'Read the binary number as text so you can look at each digit.',
      'Going left to right, each new digit means: value = value × 2 + digit.',
    ],
    approach:
      'Process the binary string from left to right. Start the value at 0, and for each character shift what you have ' +
      'by multiplying by 2, then add the new bit (0 or 1). By the end, the value holds the decimal number.',
    whatYouLearn: ['Reading a value digit by digit', 'The "×base + digit" evaluation trick'],
    solutions: solo(
      'Scan the bits left to right, updating value = value × 2 + bit.',
      {
        python:
          's = input().strip()\n' +
          'value = 0\n' +
          'for ch in s:\n' +
          '    value = value * 2 + (1 if ch == "1" else 0)\n' +
          'print(value)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        String s = new Scanner(System.in).next();\n' +
          '        int value = 0;\n' +
          '        for (int i = 0; i < s.length(); i++)\n' +
          '            value = value * 2 + (s.charAt(i) - \'0\');\n' +
          '        System.out.println(value);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <string.h>\n\n' +
          'int main() {\n' +
          '    char s[64];\n' +
          '    scanf("%s", s);\n' +
          '    int value = 0;\n' +
          '    for (int i = 0; s[i] != \'\\0\'; i++)\n' +
          '        value = value * 2 + (s[i] - \'0\');\n' +
          '    printf("%d\\n", value);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <string>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string s;\n' +
          '    cin >> s;\n' +
          '    int value = 0;\n' +
          '    for (char ch : s)\n' +
          '        value = value * 2 + (ch - \'0\');\n' +
          '    cout << value << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Reading digits left to right, "value × 2 + digit" rebuilds the number one bit at a time — each existing bit ' +
      'slides up one power of two as a new one arrives. The same technique (with × 10) parses ordinary decimal text into a number.',
    tip: 'value = value × base + digit is how every number-from-text parser works. Learn it once, reuse everywhere.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Number Logic', topics: ['Digits', 'Divisibility'],
    title: 'Harshad Number',
    description:
      'A Harshad (or Niven) number is divisible by the sum of its own digits.\n\n' +
      'Read a positive number and print "Yes" if it is a Harshad number, otherwise "No".',
    inputFormat: 'One positive integer.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('18', 'Yes', 'Digit sum is 1 + 8 = 9, and 18 is divisible by 9.'),
      ex('19', 'No', 'Digit sum is 1 + 9 = 10, and 19 is not divisible by 10.'),
    ],
    hints: [
      'First compute the sum of the digits.',
      'Then check whether the original number divides evenly by that sum.',
    ],
    approach:
      'You need two things: the original number and its digit sum. Save the original before you start breaking the ' +
      'number apart, add up its digits with the % 10 / ÷ 10 loop, then test whether the original is divisible by the sum.',
    whatYouLearn: ['Preserving the original value while processing it', 'Combining digit sum with a divisibility test'],
    solutions: solo(
      'Sum the digits, then check original % digitSum == 0.',
      {
        python:
          'n = int(input())\n' +
          'original = n\n' +
          's = 0\n' +
          'while n > 0:\n' +
          '    s += n % 10\n' +
          '    n //= 10\n' +
          'print("Yes" if original % s == 0 else "No")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int original = n, s = 0;\n' +
          '        while (n > 0) { s += n % 10; n /= 10; }\n' +
          '        System.out.println(original % s == 0 ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int original = n, s = 0;\n' +
          '    while (n > 0) { s += n % 10; n /= 10; }\n' +
          '    printf(original % s == 0 ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int original = n, s = 0;\n' +
          '    while (n > 0) { s += n % 10; n /= 10; }\n' +
          '    cout << (original % s == 0 ? "Yes" : "No") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The classic trap here is destroying the number while summing its digits, then having nothing to divide. Saving ' +
      'the original first solves that. After the digit sum, the answer is one divisibility check — the same % test you already know.',
    tip: 'Before a loop chews up a value, save a copy if you will still need the original.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Number Logic', topics: ['Digits', 'Math'],
    title: 'Automorphic Number',
    description:
      'A number is automorphic if its square ends with the number itself.\n\n' +
      'For example, 5² = 25 ends with 5, and 25² = 625 ends with 25. Read a number and print "Yes" if it is ' +
      'automorphic, otherwise "No".',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('25', 'Yes', '25² = 625, which ends with 25.'),
      ex('7', 'No', '7² = 49, which does not end with 7.'),
    ],
    hints: [
      'Count how many digits the number has.',
      'The square "ends with" the number if square % (10^digits) equals the number.',
    ],
    approach:
      'Square the number. To check whether the square ends with the original, take the square modulo 10 raised to the ' +
      'number of digits — that keeps only the last few digits. If those equal the original number, it is automorphic.',
    whatYouLearn: ['Extracting the last k digits with a power of 10', 'Counting digits to build the right modulus'],
    solutions: solo(
      'Build 10^(digit count) and test whether (n × n) % that power equals n.',
      {
        python:
          'n = int(input())\n' +
          'sq = n * n\n' +
          'p = 1\n' +
          't = n\n' +
          'if t == 0:\n' +
          '    p = 10\n' +
          'while t > 0:\n' +
          '    p *= 10\n' +
          '    t //= 10\n' +
          'print("Yes" if sq % p == n else "No")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        long n = new Scanner(System.in).nextLong();\n' +
          '        long sq = n * n, p = 1, t = n;\n' +
          '        if (t == 0) p = 10;\n' +
          '        while (t > 0) { p *= 10; t /= 10; }\n' +
          '        System.out.println(sq % p == n ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    long n;\n' +
          '    scanf("%ld", &n);\n' +
          '    long sq = n * n, p = 1, t = n;\n' +
          '    if (t == 0) p = 10;\n' +
          '    while (t > 0) { p *= 10; t /= 10; }\n' +
          '    printf(sq % p == n ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    long n;\n' +
          '    cin >> n;\n' +
          '    long sq = n * n, p = 1, t = n;\n' +
          '    if (t == 0) p = 10;\n' +
          '    while (t > 0) { p *= 10; t /= 10; }\n' +
          '    cout << (sq % p == n ? "Yes" : "No") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Taking a number modulo 10^k keeps exactly its last k digits. So if a number has d digits, comparing the square ' +
      'modulo 10^d against the number itself asks precisely "does the square end with the number?". Counting digits to build the right power of ten is the crux.',
    tip: 'x % 10^k gives the last k digits of x. That single idea powers many digit problems.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Number Logic', topics: ['Digits', 'Factorial'],
    title: 'Strong Number',
    description:
      'A strong number equals the sum of the factorials of its digits.\n\n' +
      'For example, 145 = 1! + 4! + 5! = 1 + 24 + 120. Read a number and print "Yes" if it is a strong number, ' +
      'otherwise "No".',
    inputFormat: 'One positive integer.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('145', 'Yes', '1! + 4! + 5! = 1 + 24 + 120 = 145.'),
      ex('123', 'No', '1! + 2! + 3! = 1 + 2 + 6 = 9, which is not 123.'),
    ],
    hints: [
      'For each digit, compute its factorial.',
      'Add all those factorials and compare the total against the original number.',
    ],
    approach:
      'Save the original number. Then peel off each digit and compute its factorial with a small loop, adding it to a ' +
      'running total. At the end, the number is "strong" if that total equals the original.',
    whatYouLearn: ['Computing factorial inside a digit loop', 'Combining two loops (outer digits, inner factorial)'],
    solutions: solo(
      'For every digit, add its factorial to a total, then compare the total with the original number.',
      {
        python:
          'n = int(input())\n' +
          'original = n\n' +
          'total = 0\n' +
          'while n > 0:\n' +
          '    d = n % 10\n' +
          '    f = 1\n' +
          '    for i in range(2, d + 1):\n' +
          '        f *= i\n' +
          '    total += f\n' +
          '    n //= 10\n' +
          'print("Yes" if total == original else "No")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int original = n, total = 0;\n' +
          '        while (n > 0) {\n' +
          '            int d = n % 10, f = 1;\n' +
          '            for (int i = 2; i <= d; i++) f *= i;\n' +
          '            total += f;\n' +
          '            n /= 10;\n' +
          '        }\n' +
          '        System.out.println(total == original ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int original = n, total = 0;\n' +
          '    while (n > 0) {\n' +
          '        int d = n % 10, f = 1;\n' +
          '        for (int i = 2; i <= d; i++) f *= i;\n' +
          '        total += f;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    printf(total == original ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int original = n, total = 0;\n' +
          '    while (n > 0) {\n' +
          '        int d = n % 10, f = 1;\n' +
          '        for (int i = 2; i <= d; i++) f *= i;\n' +
          '        total += f;\n' +
          '        n /= 10;\n' +
          '    }\n' +
          '    cout << (total == original ? "Yes" : "No") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'This problem nests two loops: the outer one walks the digits, the inner one builds each digit\'s factorial. ' +
      'Keeping the original number safe lets you compare at the end. Learning to place one loop inside another for a ' +
      'sub-calculation is a real step up in logical thinking.',
    tip: 'A loop inside a loop is fine when the inner one does a small, self-contained job like a factorial.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Number Logic', topics: ['Digits', 'Simulation'],
    title: 'Happy Number',
    description:
      'Take a number and replace it with the sum of the squares of its digits. Repeat.\n\n' +
      'If you eventually reach 1, the number is "happy". If it falls into an endless loop instead, it is not. Read a ' +
      'number and print "Yes" if it is happy, otherwise "No".',
    inputFormat: 'One positive integer.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('19', 'Yes', '19 → 1+81=82 → 68 → 100 → 1. It reaches 1, so it is happy.'),
      ex('4', 'No', '4 falls into a cycle 4 → 16 → 37 → ... → 4 that never reaches 1.'),
    ],
    hints: [
      'Write a step that replaces the number with the sum of the squares of its digits.',
      'Every unhappy number eventually reaches 4, so you can stop when the value is 1 (happy) or 4 (unhappy).',
    ],
    approach:
      'Repeat the "sum of squared digits" step. The tricky part is knowing when to stop for an unhappy number — it ' +
      'loops forever. A well-known fact rescues you: every unhappy number eventually reaches 4. So loop until the ' +
      'value becomes 1 (happy) or 4 (stuck), then decide.',
    whatYouLearn: ['Simulating a repeated transformation', 'Using a known stopping condition to detect a cycle'],
    solutions: solo(
      'Repeat sum-of-squared-digits until the value is 1 (happy) or 4 (unhappy cycle).',
      {
        python:
          'n = int(input())\n' +
          'while n != 1 and n != 4:\n' +
          '    s = 0\n' +
          '    while n > 0:\n' +
          '        d = n % 10\n' +
          '        s += d * d\n' +
          '        n //= 10\n' +
          '    n = s\n' +
          'print("Yes" if n == 1 else "No")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        while (n != 1 && n != 4) {\n' +
          '            int s = 0;\n' +
          '            while (n > 0) { int d = n % 10; s += d * d; n /= 10; }\n' +
          '            n = s;\n' +
          '        }\n' +
          '        System.out.println(n == 1 ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    while (n != 1 && n != 4) {\n' +
          '        int s = 0;\n' +
          '        while (n > 0) { int d = n % 10; s += d * d; n /= 10; }\n' +
          '        n = s;\n' +
          '    }\n' +
          '    printf(n == 1 ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    while (n != 1 && n != 4) {\n' +
          '        int s = 0;\n' +
          '        while (n > 0) { int d = n % 10; s += d * d; n /= 10; }\n' +
          '        n = s;\n' +
          '    }\n' +
          '    cout << (n == 1 ? "Yes" : "No") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The heart of the problem is simulating a repeating process. The subtlety is termination: unhappy numbers loop, ' +
      'so you must detect the cycle. Rather than tracking every value seen, we lean on the known fact that all unhappy ' +
      'chains pass through 4 — turning a tricky cycle-detection into a simple two-way stop condition.',
    tip: 'When a process can loop forever, you need a guaranteed stopping rule — either track seen values or use a known landmark.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Patterns', topics: ['Patterns', 'Loops'],
    title: 'Pyramid of Stars',
    description:
      'Read a number N and print a centered pyramid of stars with N rows.\n\n' +
      'Row 1 has one star, and each row grows by two, with spaces on the left so the pyramid is centered.',
    inputFormat: 'One integer N.',
    outputFormat: 'N lines forming a centered star pyramid.',
    examples: [
      ex('3', '  *\n ***\n*****', 'Row 1: 2 spaces + 1 star. Row 2: 1 space + 3 stars. Row 3: 0 spaces + 5 stars.'),
      ex('1', '*', 'A single star.'),
    ],
    hints: [
      'Row i needs (N − i) spaces before the stars.',
      'Row i has (2 × i − 1) stars.',
    ],
    approach:
      'For each row, print the leading spaces first, then the stars. The spaces shrink as the row number grows ' +
      '(N − i of them), while the stars increase by two each row (2i − 1). Getting both counts right gives a clean pyramid.',
    whatYouLearn: ['Combining spaces and symbols in a pattern', 'Deriving counts from the row number'],
    solutions: solo(
      'For row i: print (N − i) spaces then (2i − 1) stars.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(1, n + 1):\n' +
          '    print(" " * (n - i) + "*" * (2 * i - 1))',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 1; i <= n; i++) {\n' +
          '            for (int s = 0; s < n - i; s++) sb.append(\' \');\n' +
          '            for (int s = 0; s < 2 * i - 1; s++) sb.append(\'*\');\n' +
          '            sb.append(\'\\n\');\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int s = 0; s < n - i; s++) printf(" ");\n' +
          '        for (int s = 0; s < 2 * i - 1; s++) printf("*");\n' +
          '        printf("\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        for (int s = 0; s < n - i; s++) cout << " ";\n' +
          '        for (int s = 0; s < 2 * i - 1; s++) cout << "*";\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A centered pattern is two patterns at once: the shrinking spaces on the left and the growing stars. Expressing ' +
      'both as a formula of the row number (N − i spaces, 2i − 1 stars) is the logical leap. Once you can turn a row ' +
      'number into counts, any triangular pattern is within reach.',
    tip: 'For pyramids, write down the space count and symbol count per row as formulas of i before coding.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Patterns', topics: ['Patterns', 'Loops', 'Conditions'],
    title: 'Hollow Rectangle',
    description:
      'Read the number of rows and columns and print a rectangle of stars that is hollow inside — only the border ' +
      'is made of stars, and the inside is spaces.',
    inputFormat: 'Two integers: rows and columns.',
    outputFormat: 'A hollow rectangle of the given size.',
    examples: [
      ex('3 4', '****\n*  *\n****', 'Top and bottom rows are full; the middle row has stars only at the edges.'),
      ex('2 2', '**\n**', 'Every cell is on the border.'),
    ],
    hints: [
      'A cell is on the border if it is in the first/last row or the first/last column.',
      'Border cells get a star; everything else gets a space.',
    ],
    approach:
      'Go through every cell by row and column. A cell belongs to the border when its row is the first or last, or its ' +
      'column is the first or last. Print a star for border cells and a space otherwise, then move to the next line after each row.',
    whatYouLearn: ['Nested loops over a grid', 'Border detection with a combined condition'],
    solutions: solo(
      'For each cell, print "*" if it is on any edge, else " ".',
      {
        python:
          'rows, cols = map(int, input().split())\n' +
          'for r in range(1, rows + 1):\n' +
          '    line = ""\n' +
          '    for c in range(1, cols + 1):\n' +
          '        if r == 1 or r == rows or c == 1 or c == cols:\n' +
          '            line += "*"\n' +
          '        else:\n' +
          '            line += " "\n' +
          '    print(line)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int rows = sc.nextInt(), cols = sc.nextInt();\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int r = 1; r <= rows; r++) {\n' +
          '            for (int c = 1; c <= cols; c++)\n' +
          '                sb.append((r == 1 || r == rows || c == 1 || c == cols) ? \'*\' : \' \');\n' +
          '            sb.append(\'\\n\');\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int rows, cols;\n' +
          '    scanf("%d %d", &rows, &cols);\n' +
          '    for (int r = 1; r <= rows; r++) {\n' +
          '        for (int c = 1; c <= cols; c++)\n' +
          '            printf("%c", (r == 1 || r == rows || c == 1 || c == cols) ? \'*\' : \' \');\n' +
          '        printf("\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int rows, cols;\n' +
          '    cin >> rows >> cols;\n' +
          '    for (int r = 1; r <= rows; r++) {\n' +
          '        for (int c = 1; c <= cols; c++)\n' +
          '            cout << ((r == 1 || r == rows || c == 1 || c == cols) ? \'*\' : \' \');\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Grids are handled with two nested loops — one for rows, one for columns. The single insight is the border ' +
      'condition: a cell is on the edge when it sits in the outer row or outer column. This "condition inside a grid" ' +
      'pattern extends to borders, diagonals, and checkerboards.',
    tip: 'On a grid, decide each cell with a condition on its (row, column). That handles most 2-D patterns.',
  },
  {
    track: T, level: 'ADVANCED', category: 'Patterns', topics: ['Patterns', 'Math', 'Combinations'],
    title: "Pascal's Triangle",
    description:
      "Print the first N rows of Pascal's Triangle.\n\n" +
      'Each row starts and ends with 1, and every inner number is the sum of the two numbers above it.',
    inputFormat: 'One integer N (the number of rows).',
    outputFormat: 'N lines; each line has the row values separated by single spaces.',
    examples: [
      ex('4', '1\n1 1\n1 2 1\n1 3 3 1', 'Each inner value is the sum of the two directly above it.'),
      ex('1', '1', 'The first row is just 1.'),
    ],
    hints: [
      'You do not need to store previous rows — each value can be computed from the one before it in the same row.',
      'Within a row, the next value is current × (row − k) ÷ (k + 1).',
    ],
    approach:
      'Each row of Pascal\'s Triangle is a sequence of binomial coefficients. Starting each row at 1, you can get the ' +
      'next value from the current one using value × (row − k) ÷ (k + 1). This avoids storing the whole triangle and ' +
      'builds each row on the fly.',
    whatYouLearn: ['Generating binomial coefficients iteratively', 'Building a row without storing earlier rows'],
    solutions: solo(
      'For each row, start at 1 and roll to the next value with val × (row − k) ÷ (k + 1).',
      {
        python:
          'n = int(input())\n' +
          'for r in range(n):\n' +
          '    val = 1\n' +
          '    row = []\n' +
          '    for k in range(r + 1):\n' +
          '        row.append(val)\n' +
          '        val = val * (r - k) // (k + 1)\n' +
          '    print(" ".join(map(str, row)))',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int r = 0; r < n; r++) {\n' +
          '            long val = 1;\n' +
          '            for (int k = 0; k <= r; k++) {\n' +
          '                if (k > 0) sb.append(\' \');\n' +
          '                sb.append(val);\n' +
          '                val = val * (r - k) / (k + 1);\n' +
          '            }\n' +
          '            sb.append(\'\\n\');\n' +
          '        }\n' +
          '        System.out.print(sb);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int r = 0; r < n; r++) {\n' +
          '        long val = 1;\n' +
          '        for (int k = 0; k <= r; k++) {\n' +
          '            if (k > 0) printf(" ");\n' +
          '            printf("%ld", val);\n' +
          '            val = val * (r - k) / (k + 1);\n' +
          '        }\n' +
          '        printf("\\n");\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int r = 0; r < n; r++) {\n' +
          '        long val = 1;\n' +
          '        for (int k = 0; k <= r; k++) {\n' +
          '            if (k > 0) cout << " ";\n' +
          '            cout << val;\n' +
          '            val = val * (r - k) / (k + 1);\n' +
          '        }\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      "Each Pascal row is the binomial coefficients C(r,0), C(r,1), ... C(r,r). Instead of adding rows together, we use "
      + 'the relation between neighbours in the same row: multiply by (r − k), divide by (k + 1). That rolls one value ' +
      'into the next, so each row is generated in place with simple arithmetic.',
    tip: 'Many "triangle of numbers" problems have a neighbour formula. Finding it beats storing the whole structure.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Math & Series', topics: ['Primes', 'Loops'],
    title: 'Primes up to N',
    description:
      'Read a number N and print all prime numbers from 2 up to N, separated by spaces.\n\n' +
      'A prime number has exactly two divisors: 1 and itself.',
    inputFormat: 'One integer N.',
    outputFormat: 'All primes from 2 to N on one line, separated by single spaces (empty line if there are none).',
    examples: [
      ex('10', '2 3 5 7', 'The primes up to 10 are 2, 3, 5, and 7.'),
      ex('2', '2', '2 is the smallest prime.'),
    ],
    hints: [
      'Check each number from 2 to N for primality.',
      'To test one number, try dividing it by every value from 2 up to its square root.',
    ],
    approach:
      'Go through each candidate from 2 to N. For each, test whether any number from 2 up to its square root divides ' +
      'it — if one does, it is not prime. Collect the primes and print them together. Stopping at the square root keeps the check fast.',
    whatYouLearn: ['Primality testing by trial division', 'Why checking up to the square root is enough'],
    solutions: solo(
      'For each number 2..N, test divisibility up to its square root; collect those with no divisor.',
      {
        python:
          'n = int(input())\n' +
          'res = []\n' +
          'for i in range(2, n + 1):\n' +
          '    is_prime = True\n' +
          '    j = 2\n' +
          '    while j * j <= i:\n' +
          '        if i % j == 0:\n' +
          '            is_prime = False\n' +
          '            break\n' +
          '        j += 1\n' +
          '    if is_prime:\n' +
          '        res.append(str(i))\n' +
          'print(" ".join(res))',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        StringBuilder sb = new StringBuilder();\n' +
          '        for (int i = 2; i <= n; i++) {\n' +
          '            boolean prime = true;\n' +
          '            for (int j = 2; j * j <= i; j++)\n' +
          '                if (i % j == 0) { prime = false; break; }\n' +
          '            if (prime) { if (sb.length() > 0) sb.append(\' \'); sb.append(i); }\n' +
          '        }\n' +
          '        System.out.println(sb.toString());\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int first = 1;\n' +
          '    for (int i = 2; i <= n; i++) {\n' +
          '        int prime = 1;\n' +
          '        for (int j = 2; j * j <= i; j++)\n' +
          '            if (i % j == 0) { prime = 0; break; }\n' +
          '        if (prime) { if (!first) printf(" "); printf("%d", i); first = 0; }\n' +
          '    }\n' +
          '    printf("\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    bool first = true;\n' +
          '    for (int i = 2; i <= n; i++) {\n' +
          '        bool prime = true;\n' +
          '        for (int j = 2; j * j <= i; j++)\n' +
          '            if (i % j == 0) { prime = false; break; }\n' +
          '        if (prime) { if (!first) cout << " "; cout << i; first = false; }\n' +
          '    }\n' +
          '    cout << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Primality by trial division only needs divisors up to the square root: if a number had a factor larger than its ' +
      'root, the matching co-factor would be smaller and already found. Applying that test to every candidate up to N ' +
      'lists all primes efficiently, and breaking early on the first divisor saves work.',
    tip: 'For primes, loop j while j×j ≤ i. Testing past the square root is wasted effort.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Math & Series', topics: ['Fibonacci', 'Series'],
    title: 'Nth Fibonacci Number',
    description:
      'The Fibonacci sequence starts 0, 1, and each later number is the sum of the previous two: 0, 1, 1, 2, 3, 5, 8, ...\n\n' +
      'Read a position N and print the Nth Fibonacci number (counting the first as position 1).',
    inputFormat: 'One integer N (N ≥ 1).',
    outputFormat: 'One integer: the Nth Fibonacci number.',
    examples: [
      ex('7', '8', 'The sequence 0,1,1,2,3,5,8 — the 7th value is 8.'),
      ex('1', '0', 'The first Fibonacci number is 0.'),
    ],
    hints: [
      'Keep only the last two numbers, not the whole sequence.',
      'Each step, the new number is the sum of the two you are holding.',
    ],
    approach:
      'You do not need to store the full sequence — just the previous two values. Start with 0 and 1, then step ' +
      'forward N − 1 times, each time sliding the pair along (the second becomes the first, and their sum becomes the ' +
      'new second). After the loop, the first value is the answer.',
    whatYouLearn: ['Rolling two variables forward', 'Computing a sequence term with constant memory'],
    solutions: solo(
      'Hold the last two Fibonacci values and roll them forward N − 1 times.',
      {
        python:
          'n = int(input())\n' +
          'a, b = 0, 1\n' +
          'for _ in range(n - 1):\n' +
          '    a, b = b, a + b\n' +
          'print(a)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        long a = 0, b = 1;\n' +
          '        for (int i = 0; i < n - 1; i++) {\n' +
          '            long next = a + b;\n' +
          '            a = b;\n' +
          '            b = next;\n' +
          '        }\n' +
          '        System.out.println(a);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    long a = 0, b = 1;\n' +
          '    for (int i = 0; i < n - 1; i++) {\n' +
          '        long next = a + b;\n' +
          '        a = b;\n' +
          '        b = next;\n' +
          '    }\n' +
          '    printf("%ld\\n", a);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    long a = 0, b = 1;\n' +
          '    for (int i = 0; i < n - 1; i++) {\n' +
          '        long next = a + b;\n' +
          '        a = b;\n' +
          '        b = next;\n' +
          '    }\n' +
          '    cout << a << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The Fibonacci rule only ever looks back two steps, so you only need to remember two numbers. Rolling the pair ' +
      'forward each iteration computes the sequence in constant memory. This "keep the last few values" idea reappears ' +
      'in many series and dynamic-programming problems.',
    tip: 'If a rule depends only on the last few values, store just those — not the entire history.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Math & Series', topics: ['Primes', 'Series'],
    title: 'Sum of Primes up to N',
    description:
      'Read a number N and add up all the prime numbers from 2 to N.\n\n' +
      'Print the total.',
    inputFormat: 'One integer N.',
    outputFormat: 'One integer: the sum of all primes from 2 to N.',
    examples: [
      ex('10', '17', 'Primes up to 10 are 2, 3, 5, 7; their sum is 17.'),
      ex('5', '10', '2 + 3 + 5 = 10.'),
    ],
    hints: [
      'Reuse the primality test: check divisors up to the square root.',
      'Add each prime you find to a running total.',
    ],
    approach:
      'This combines two ideas you already know: testing a number for primality, and keeping a running total. For each ' +
      'value from 2 to N, run the square-root primality check, and whenever it passes, add the number to your sum.',
    whatYouLearn: ['Reusing a primality test inside a sum', 'Composing two simple ideas into one solution'],
    solutions: solo(
      'For each number 2..N, if it is prime (no divisor up to its root), add it to a running total.',
      {
        python:
          'n = int(input())\n' +
          'total = 0\n' +
          'for i in range(2, n + 1):\n' +
          '    is_prime = True\n' +
          '    j = 2\n' +
          '    while j * j <= i:\n' +
          '        if i % j == 0:\n' +
          '            is_prime = False\n' +
          '            break\n' +
          '        j += 1\n' +
          '    if is_prime:\n' +
          '        total += i\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        long total = 0;\n' +
          '        for (int i = 2; i <= n; i++) {\n' +
          '            boolean prime = true;\n' +
          '            for (int j = 2; j * j <= i; j++)\n' +
          '                if (i % j == 0) { prime = false; break; }\n' +
          '            if (prime) total += i;\n' +
          '        }\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    long total = 0;\n' +
          '    for (int i = 2; i <= n; i++) {\n' +
          '        int prime = 1;\n' +
          '        for (int j = 2; j * j <= i; j++)\n' +
          '            if (i % j == 0) { prime = 0; break; }\n' +
          '        if (prime) total += i;\n' +
          '    }\n' +
          '    printf("%ld\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    long total = 0;\n' +
          '    for (int i = 2; i <= n; i++) {\n' +
          '        bool prime = true;\n' +
          '        for (int j = 2; j * j <= i; j++)\n' +
          '            if (i % j == 0) { prime = false; break; }\n' +
          '        if (prime) total += i;\n' +
          '    }\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Bigger problems are usually small ones combined. Here the primality check (from the previous problem) becomes a ' +
      'building block inside a summation loop. Recognising that you can reuse a known technique as a component is exactly the logical maturity this track builds.',
    tip: 'Solved a sub-problem before? Reuse it as a block. Programming is assembling known pieces.',
  },
]

export default questions
