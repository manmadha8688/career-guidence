// Track 01 — Start Coding
// For learners who have never written code. Goal: from "Hello, World" to
// simple loops and conditions. Most problems have a single clear solution.
import { solo, ex } from './_helpers.mjs'

const T = 'START_CODING'

const questions = [
  {
    track: T, level: 'BEGINNER', category: 'First Steps', topics: ['Printing'],
    title: 'Hello, World',
    description:
      'Every programmer\'s journey starts the same way — by making the computer say hello.\n\n' +
      'Write a program that prints exactly this line:\n\nHello, World',
    inputFormat: 'No input is needed for this problem.',
    outputFormat: 'A single line: Hello, World',
    examples: [
      ex('(no input)', 'Hello, World', 'The program prints the fixed text and nothing else.'),
    ],
    hints: [
      'You do not need any input for this one — just print a line of text.',
      'Text you want to print goes inside quotes.',
    ],
    approach:
      'There is no logic here — just one print statement. Find how your language prints a line ' +
      'of text to the screen, put the exact words inside quotes, and run it.',
    whatYouLearn: ['How to print text to the screen', 'How to write and run your very first program'],
    solutions: solo(
      'Call the language\'s print function with the text "Hello, World".',
      {
        python: 'print("Hello, World")',
        java:
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        System.out.println("Hello, World");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    printf("Hello, World\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    cout << "Hello, World" << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The print statement sends whatever is inside the quotes to the screen. ' +
      'Getting this to run means your setup works and you are ready to learn.',
    tip: 'Type it yourself instead of copying. Your fingers remember what your eyes skip over.',
  },
  {
    track: T, level: 'BEGINNER', category: 'First Steps', topics: ['Printing', 'Input'],
    title: 'Welcome Greeting',
    description:
      'Now make the program talk to a person.\n\n' +
      'Read a name from the user, then greet them like this:\n\n' +
      'Hello, <name>. Welcome to Code Gym.',
    inputFormat: 'A single line containing a name.',
    outputFormat: 'Hello, <name>. Welcome to Code Gym.',
    examples: [
      ex('Aarav', 'Hello, Aarav. Welcome to Code Gym.', 'The name replaces <name> in the sentence.'),
      ex('Meera', 'Hello, Meera. Welcome to Code Gym.', 'Any name the user types is placed into the greeting.'),
    ],
    hints: [
      'First read the input into a variable, then use it while printing.',
      'You are joining fixed text with a value the user typed.',
    ],
    approach:
      'Read one line of input and store it in a variable. Then print the greeting, ' +
      'placing the stored name in the middle. Do not print the word "name" — print what the user typed.',
    whatYouLearn: ['How to read input from the user', 'How to combine text with a variable'],
    solutions: solo(
      'Read the name into a variable and print it inside the greeting sentence.',
      {
        python:
          'name = input()\n' +
          'print(f"Hello, {name}. Welcome to Code Gym.")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        String name = sc.nextLine();\n' +
          '        System.out.println("Hello, " + name + ". Welcome to Code Gym.");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    char name[100];\n' +
          '    scanf("%99s", name);\n' +
          '    printf("Hello, %s. Welcome to Code Gym.\\n", name);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    string name;\n' +
          '    getline(cin, name);\n' +
          '    cout << "Hello, " << name << ". Welcome to Code Gym." << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The value the user types is stored in a variable. When printing, that variable is ' +
      'dropped into the sentence, so the greeting changes with each different name.',
    tip: 'A variable is just a labelled box. You put a value in once and reuse it by its name.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Variables', 'Arithmetic'],
    title: 'Add Two Numbers',
    description:
      'Read two whole numbers and print their sum.\n\n' +
      'This is the "hello world" of working with numbers instead of text.',
    inputFormat: 'Two integers, each on its own line (or separated by a space).',
    outputFormat: 'A single integer: the sum of the two numbers.',
    examples: [
      ex('5\n3', '8', '5 + 3 = 8.'),
      ex('40\n2', '42', '40 + 2 = 42.'),
    ],
    hints: [
      'Input usually arrives as text — convert it to a number before adding.',
      'Store each number in its own variable, then add the variables.',
    ],
    approach:
      'Read the first number and convert it to an integer. Do the same for the second. ' +
      'Add them and print the result. The conversion step is the part beginners forget.',
    whatYouLearn: ['Converting input text into numbers', 'Doing arithmetic with variables'],
    solutions: solo(
      'Parse both inputs as integers, add them, and print the total.',
      {
        python:
          'a = int(input())\n' +
          'b = int(input())\n' +
          'print(a + b)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt();\n' +
          '        int b = sc.nextInt();\n' +
          '        System.out.println(a + b);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    scanf("%d %d", &a, &b);\n' +
          '    printf("%d\\n", a + b);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    cin >> a >> b;\n' +
          '    cout << a + b << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Numbers typed by the user come in as text. Once converted to integers they can be added. ' +
      'Printing the result of a + b shows the sum.',
    tip: 'If your output looks like "53" instead of "8", you added text, not numbers — convert first.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Arithmetic'],
    title: 'Simple Arithmetic',
    description:
      'Read two integers and print the results of five operations, each on its own line, in this order:\n\n' +
      'sum, difference, product, quotient (integer division), remainder.',
    inputFormat: 'Two integers a and b (b is not zero).',
    outputFormat: 'Five lines: a+b, a-b, a*b, a/b (integer division), a%b.',
    examples: [
      ex('10\n3', '13\n7\n30\n3\n1', '10+3=13, 10-3=7, 10*3=30, 10/3=3 (integer), 10%3=1.'),
    ],
    hints: [
      'Integer division throws away the fractional part.',
      'The % operator gives the remainder after division.',
    ],
    approach:
      'Read both numbers. Print each operation on its own line in the given order. ' +
      'Use integer division for the quotient so the output is a whole number.',
    whatYouLearn: ['The five basic arithmetic operators', 'The difference between division and remainder'],
    solutions: solo(
      'Apply +, -, *, integer /, and % to the two numbers and print each on its own line.',
      {
        python:
          'a = int(input())\n' +
          'b = int(input())\n' +
          'print(a + b)\n' +
          'print(a - b)\n' +
          'print(a * b)\n' +
          'print(a // b)\n' +
          'print(a % b)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt();\n' +
          '        System.out.println(a + b);\n' +
          '        System.out.println(a - b);\n' +
          '        System.out.println(a * b);\n' +
          '        System.out.println(a / b);\n' +
          '        System.out.println(a % b);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    scanf("%d %d", &a, &b);\n' +
          '    printf("%d\\n%d\\n%d\\n%d\\n%d\\n", a + b, a - b, a * b, a / b, a % b);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    cin >> a >> b;\n' +
          '    cout << a + b << "\\n" << a - b << "\\n" << a * b\n' +
          '         << "\\n" << a / b << "\\n" << a % b << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Each operator produces one result. Integer division (a/b) keeps only the whole part, ' +
      'while the remainder (a%b) is what is left over — together they describe the full division.',
    tip: 'Remainder (%) is one of the most useful tools in coding — you will use it constantly.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Arithmetic', 'Formulas'],
    title: 'Area of a Rectangle',
    description:
      'A rectangle has a length and a width.\n\n' +
      'Read the length and width and print the area (length × width).',
    inputFormat: 'Two integers: length and width.',
    outputFormat: 'A single integer: the area.',
    examples: [
      ex('5\n4', '20', 'Area = 5 × 4 = 20.'),
      ex('7\n3', '21', 'Area = 7 × 3 = 21.'),
    ],
    hints: ['Area of a rectangle is simply length multiplied by width.'],
    approach:
      'Read both values, multiply them, and print the result. This is a formula problem — ' +
      'the only skill is turning a real-world formula into one line of code.',
    whatYouLearn: ['Turning a formula into code', 'Multiplying two variables'],
    solutions: solo(
      'Multiply length by width and print it.',
      {
        python:
          'length = int(input())\n' +
          'width = int(input())\n' +
          'print(length * width)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int length = sc.nextInt(), width = sc.nextInt();\n' +
          '        System.out.println(length * width);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int length, width;\n' +
          '    scanf("%d %d", &length, &width);\n' +
          '    printf("%d\\n", length * width);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int length, width;\n' +
          '    cin >> length >> width;\n' +
          '    cout << length * width << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The area formula length × width becomes a single multiplication in code. ' +
      'Reading real problems and spotting the formula is a core beginner skill.',
    tip: 'Name variables after what they mean (length, width) — future-you will thank you.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Arithmetic', 'Formulas'],
    title: 'Celsius to Fahrenheit',
    description:
      'Temperatures can be written in Celsius or Fahrenheit.\n\n' +
      'Read a temperature in Celsius and convert it to Fahrenheit using:\n\n' +
      'F = C × 9 / 5 + 32',
    inputFormat: 'One number: the temperature in Celsius.',
    outputFormat: 'One number: the temperature in Fahrenheit.',
    examples: [
      ex('0', '32', '0°C is freezing point = 32°F.'),
      ex('100', '212', '100°C is boiling point = 212°F.'),
    ],
    hints: [
      'Follow the formula exactly: multiply by 9, divide by 5, then add 32.',
      'Use decimals so values like 37°C convert correctly.',
    ],
    approach:
      'Read the Celsius value. Apply the formula in the right order (multiply and divide before adding 32). ' +
      'Print the Fahrenheit result.',
    whatYouLearn: ['Applying a multi-step formula', 'Why order of operations matters'],
    solutions: solo(
      'Plug the Celsius value into F = C * 9 / 5 + 32 and print the result.',
      {
        python:
          'c = float(input())\n' +
          'f = c * 9 / 5 + 32\n' +
          'print(f)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        double c = sc.nextDouble();\n' +
          '        double f = c * 9 / 5 + 32;\n' +
          '        System.out.println(f);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    double c;\n' +
          '    scanf("%lf", &c);\n' +
          '    printf("%g\\n", c * 9 / 5 + 32);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    double c;\n' +
          '    cin >> c;\n' +
          '    cout << c * 9 / 5 + 32 << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The computer follows maths rules: multiplication and division happen before addition, ' +
      'so C × 9 / 5 is computed first and then 32 is added. Using decimals keeps fractional results accurate.',
    tip: 'When a formula is given, code it step by step exactly as written before trying to simplify.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Variables'],
    title: 'Swap Two Numbers',
    description:
      'Read two numbers a and b, swap their values, and print them so the second value comes first.\n\n' +
      'If you read 3 and 7, after swapping you print 7 then 3.',
    inputFormat: 'Two integers a and b.',
    outputFormat: 'Two lines: the value of b, then the value of a (after swapping).',
    examples: [
      ex('3\n7', '7\n3', 'After swapping, a holds 7 and b holds 3.'),
    ],
    hints: [
      'A third temporary variable can hold one value while you move the other.',
      'Some languages let you swap in a single line — but the temp-variable way always works.',
    ],
    approach:
      'The classic way: save a into a temporary variable, copy b into a, then copy the temporary ' +
      'into b. Now the values are exchanged. Print them in the new order.',
    whatYouLearn: ['How values move between variables', 'Using a temporary variable'],
    solutions: solo(
      'Use a temporary variable to exchange the two values, then print them.',
      {
        python:
          'a = int(input())\n' +
          'b = int(input())\n' +
          'a, b = b, a\n' +
          'print(a)\n' +
          'print(b)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt();\n' +
          '        int temp = a; a = b; b = temp;\n' +
          '        System.out.println(a);\n' +
          '        System.out.println(b);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    scanf("%d %d", &a, &b);\n' +
          '    int temp = a; a = b; b = temp;\n' +
          '    printf("%d\\n%d\\n", a, b);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    cin >> a >> b;\n' +
          '    swap(a, b);\n' +
          '    cout << a << "\\n" << b << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A variable can only hold one value at a time, so copying b into a would erase a. ' +
      'The temporary variable keeps a safe until b has been moved, letting both values swap cleanly.',
    tip: 'The temp-variable trick shows up everywhere. Understand it once and it becomes second nature.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Making Decisions', topics: ['Conditions', 'Modulo'],
    title: 'Even or Odd',
    description:
      'Read a number and print whether it is even or odd.\n\n' +
      'Print the word "Even" or the word "Odd".',
    inputFormat: 'A single integer.',
    outputFormat: 'Either "Even" or "Odd".',
    examples: [
      ex('4', 'Even', '4 divided by 2 leaves no remainder, so it is even.'),
      ex('7', 'Odd', '7 divided by 2 leaves remainder 1, so it is odd.'),
    ],
    hints: [
      'A number is even when it divides by 2 with no remainder.',
      'The % operator gives the remainder — check if it is 0.',
    ],
    approach:
      'Take the number, find its remainder when divided by 2. If the remainder is 0 it is even, ' +
      'otherwise it is odd. Use an if/else to choose which word to print.',
    whatYouLearn: ['Making a decision with if/else', 'Using remainder to test divisibility'],
    solutions: solo(
      'If number % 2 equals 0 print "Even", else print "Odd".',
      {
        python:
          'n = int(input())\n' +
          'if n % 2 == 0:\n' +
          '    print("Even")\n' +
          'else:\n' +
          '    print("Odd")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        if (n % 2 == 0) System.out.println("Even");\n' +
          '        else System.out.println("Odd");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    if (n % 2 == 0) printf("Even\\n");\n' +
          '    else printf("Odd\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    if (n % 2 == 0) cout << "Even" << endl;\n' +
          '    else cout << "Odd" << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Dividing by 2 and checking the remainder is the standard test for even/odd. ' +
      'The if/else picks exactly one of the two words to print based on that test.',
    tip: 'Even/odd by remainder is a pattern you will reuse for "every 3rd item", "every 5th row", and more.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Making Decisions', topics: ['Conditions'],
    title: 'Positive, Negative or Zero',
    description:
      'Read a number and print whether it is Positive, Negative, or Zero.\n\n' +
      'This needs three possible answers, not two.',
    inputFormat: 'A single integer.',
    outputFormat: 'One of: Positive, Negative, Zero.',
    examples: [
      ex('9', 'Positive', '9 is greater than 0.'),
      ex('-4', 'Negative', '-4 is less than 0.'),
    ],
    hints: [
      'Three outcomes need more than a single if/else — chain the checks.',
      'Check greater than 0, then less than 0, otherwise it must be zero.',
    ],
    approach:
      'Use an if / else-if / else chain. First test if the number is greater than 0, ' +
      'then if it is less than 0, and if neither is true it must be exactly zero.',
    whatYouLearn: ['Handling more than two cases', 'The if / else-if / else chain'],
    solutions: solo(
      'Chain three conditions: > 0 prints Positive, < 0 prints Negative, otherwise Zero.',
      {
        python:
          'n = int(input())\n' +
          'if n > 0:\n' +
          '    print("Positive")\n' +
          'elif n < 0:\n' +
          '    print("Negative")\n' +
          'else:\n' +
          '    print("Zero")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        if (n > 0) System.out.println("Positive");\n' +
          '        else if (n < 0) System.out.println("Negative");\n' +
          '        else System.out.println("Zero");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    if (n > 0) printf("Positive\\n");\n' +
          '    else if (n < 0) printf("Negative\\n");\n' +
          '    else printf("Zero\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    if (n > 0) cout << "Positive" << endl;\n' +
          '    else if (n < 0) cout << "Negative" << endl;\n' +
          '    else cout << "Zero" << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The conditions are checked top to bottom. As soon as one is true its block runs and the rest ' +
      'are skipped. The final else catches the only remaining case — the number being exactly zero.',
    tip: 'Order matters in a chain: put the most specific or most likely conditions first.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Making Decisions', topics: ['Conditions', 'Comparison'],
    title: 'Largest of Two Numbers',
    description:
      'Read two numbers and print the larger one.\n\n' +
      'If both are equal, print either value.',
    inputFormat: 'Two integers a and b.',
    outputFormat: 'The larger of the two numbers.',
    examples: [
      ex('5\n9', '9', '9 is greater than 5.'),
      ex('12\n7', '12', '12 is greater than 7.'),
    ],
    hints: ['Compare the two values with the greater-than operator, then print the winner.'],
    approach:
      'Compare a and b. If a is greater than or equal to b, a is the answer; otherwise b is. ' +
      'Print whichever is larger.',
    whatYouLearn: ['Comparing two values', 'Choosing an output based on a comparison'],
    solutions: solo(
      'If a is greater than or equal to b print a, otherwise print b.',
      {
        python:
          'a = int(input())\n' +
          'b = int(input())\n' +
          'if a >= b:\n' +
          '    print(a)\n' +
          'else:\n' +
          '    print(b)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt();\n' +
          '        System.out.println(a >= b ? a : b);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    scanf("%d %d", &a, &b);\n' +
          '    printf("%d\\n", a >= b ? a : b);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    cin >> a >> b;\n' +
          '    cout << (a >= b ? a : b) << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A single comparison decides the answer. The Java/C/C++ versions use the shortcut ' +
      '"condition ? x : y", which reads as "if condition then x else y" — a compact if/else.',
    tip: 'Once this clicks, "largest of three" is just one more comparison — try it next.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Making Decisions', topics: ['Conditions', 'Ranges'],
    title: 'Grade Calculator',
    description:
      'A student\'s grade depends on their marks (0 to 100):\n\n' +
      '90 and above  -> A\n' +
      '75 to 89      -> B\n' +
      '60 to 74      -> C\n' +
      '35 to 59      -> D\n' +
      'below 35      -> F\n\n' +
      'Read the marks and print the grade letter.',
    inputFormat: 'One integer: marks between 0 and 100.',
    outputFormat: 'A single letter: A, B, C, D, or F.',
    examples: [
      ex('82', 'B', '82 falls in the 75 to 89 range, which is grade B.'),
      ex('30', 'F', '30 is below 35, so the grade is F.'),
    ],
    hints: [
      'Check the highest range first, then work downwards.',
      'Once a condition matches, the remaining ranges do not need checking.',
    ],
    approach:
      'Use an if / else-if chain, starting from the top grade. Check "90 and above" first; if it fails, ' +
      'check the next band, and so on. Because you go top-down, each band only needs its lower bound.',
    whatYouLearn: ['Mapping number ranges to categories', 'Ordering conditions from high to low'],
    solutions: solo(
      'Compare marks against each band from highest to lowest and print the first grade that matches.',
      {
        python:
          'm = int(input())\n' +
          'if m >= 90:\n' +
          '    print("A")\n' +
          'elif m >= 75:\n' +
          '    print("B")\n' +
          'elif m >= 60:\n' +
          '    print("C")\n' +
          'elif m >= 35:\n' +
          '    print("D")\n' +
          'else:\n' +
          '    print("F")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int m = new Scanner(System.in).nextInt();\n' +
          '        String g;\n' +
          '        if (m >= 90) g = "A";\n' +
          '        else if (m >= 75) g = "B";\n' +
          '        else if (m >= 60) g = "C";\n' +
          '        else if (m >= 35) g = "D";\n' +
          '        else g = "F";\n' +
          '        System.out.println(g);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int m;\n' +
          '    scanf("%d", &m);\n' +
          '    if (m >= 90) printf("A\\n");\n' +
          '    else if (m >= 75) printf("B\\n");\n' +
          '    else if (m >= 60) printf("C\\n");\n' +
          '    else if (m >= 35) printf("D\\n");\n' +
          '    else printf("F\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int m;\n' +
          '    cin >> m;\n' +
          '    if (m >= 90) cout << "A";\n' +
          '    else if (m >= 75) cout << "B";\n' +
          '    else if (m >= 60) cout << "C";\n' +
          '    else if (m >= 35) cout << "D";\n' +
          '    else cout << "F";\n' +
          '    cout << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Checking from the highest band down means each test only needs a lower bound. For 82, the ' +
      '"90 and above" test fails, then "75 and above" succeeds, so B is printed and the rest are skipped.',
    tip: 'Range problems are everywhere — tax slabs, discounts, ratings. Master the top-down chain once.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Making Decisions', topics: ['Conditions', 'Modulo'],
    title: 'Leap Year Check',
    description:
      'A year is a leap year if:\n\n' +
      '- it is divisible by 4, AND\n' +
      '- it is NOT divisible by 100, UNLESS it is also divisible by 400.\n\n' +
      'Read a year and print "Leap Year" or "Not a Leap Year".',
    inputFormat: 'One integer: the year.',
    outputFormat: 'Either "Leap Year" or "Not a Leap Year".',
    examples: [
      ex('2024', 'Leap Year', '2024 is divisible by 4 and not by 100, so it is a leap year.'),
      ex('1900', 'Not a Leap Year', '1900 is divisible by 100 but not by 400, so it is not a leap year.'),
    ],
    hints: [
      'Combine conditions with AND / OR.',
      'The rule: divisible by 400, OR (divisible by 4 AND not divisible by 100).',
    ],
    approach:
      'Translate the sentence into one boolean expression. A year is a leap year when it is divisible ' +
      'by 400, or when it is divisible by 4 but not by 100. Print the matching message.',
    whatYouLearn: ['Combining conditions with AND / OR', 'Turning a wordy rule into a single test'],
    solutions: solo(
      'Leap when (year % 400 == 0) OR (year % 4 == 0 AND year % 100 != 0).',
      {
        python:
          'y = int(input())\n' +
          'leap = (y % 400 == 0) or (y % 4 == 0 and y % 100 != 0)\n' +
          'print("Leap Year" if leap else "Not a Leap Year")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int y = new Scanner(System.in).nextInt();\n' +
          '        boolean leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);\n' +
          '        System.out.println(leap ? "Leap Year" : "Not a Leap Year");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int y;\n' +
          '    scanf("%d", &y);\n' +
          '    int leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);\n' +
          '    printf(leap ? "Leap Year\\n" : "Not a Leap Year\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int y;\n' +
          '    cin >> y;\n' +
          '    bool leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);\n' +
          '    cout << (leap ? "Leap Year" : "Not a Leap Year") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The tricky part is the exceptions. Divisible-by-400 years are always leap years; that is why 2000 ' +
      'is a leap year but 1900 is not. Writing the rule as one OR/AND expression captures all cases at once.',
    tip: 'When a rule has "unless" or "except", it usually becomes an OR in code. Read carefully.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Loops', topics: ['Loops'],
    title: 'Print 1 to N',
    description:
      'Read a number N and print every number from 1 up to N, each on its own line.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'The numbers 1, 2, ..., N, each on its own line.',
    examples: [
      ex('5', '1\n2\n3\n4\n5', 'Counting up from 1 to 5, one per line.'),
    ],
    hints: [
      'A loop repeats an action. Here the action is "print the current number".',
      'Start the counter at 1 and stop after it reaches N.',
    ],
    approach:
      'Use a loop with a counter that starts at 1 and increases by 1 each time, continuing while it is ' +
      'less than or equal to N. Print the counter inside the loop.',
    whatYouLearn: ['Writing your first loop', 'Using a counter to repeat an action'],
    solutions: solo(
      'Loop the counter from 1 to N and print it each time.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(1, n + 1):\n' +
          '    print(i)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = 1; i <= n; i++) System.out.println(i);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= n; i++) printf("%d\\n", i);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i <= n; i++) cout << i << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The loop repeats its body while the counter stays within range. Each pass prints one number and ' +
      'then the counter moves up by one, so the output counts cleanly from 1 to N.',
    tip: 'Loops are the heart of programming. Once you can count with one, you can do almost anything.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Loops', topics: ['Loops', 'Accumulator'],
    title: 'Sum from 1 to N',
    description:
      'Read a number N and print the sum of all numbers from 1 to N.\n\n' +
      'For N = 5 the sum is 1 + 2 + 3 + 4 + 5 = 15.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'One integer: the total.',
    examples: [
      ex('5', '15', '1 + 2 + 3 + 4 + 5 = 15.'),
      ex('10', '55', 'Adding 1 through 10 gives 55.'),
    ],
    hints: [
      'Keep a running total that starts at 0.',
      'Add each number to the total as the loop visits it.',
    ],
    approach:
      'Create a total variable set to 0 before the loop. Loop from 1 to N, adding the current number ' +
      'to the total each time. After the loop, print the total.',
    whatYouLearn: ['The accumulator pattern (a running total)', 'Building a result across loop passes'],
    solutions: solo(
      'Start total at 0, add every number from 1 to N, then print the total.',
      {
        python:
          'n = int(input())\n' +
          'total = 0\n' +
          'for i in range(1, n + 1):\n' +
          '    total += i\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int total = 0;\n' +
          '        for (int i = 1; i <= n; i++) total += i;\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= n; i++) total += i;\n' +
          '    printf("%d\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i <= n; i++) total += i;\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The total variable "accumulates" the answer: it starts empty (0) and grows by each number the ' +
      'loop meets. This running-total pattern is one you will use constantly — sums, counts, averages.',
    tip: 'There is also a formula n*(n+1)/2 — try it after the loop version to see both give the same answer.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Loops', topics: ['Loops'],
    title: 'Multiplication Table',
    description:
      'Read a number N and print its multiplication table from 1 to 10.\n\n' +
      'Each line looks like:  N x i = result',
    inputFormat: 'One integer N.',
    outputFormat: 'Ten lines: "N x 1 = ...", up to "N x 10 = ...".',
    examples: [
      ex('3', '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n... (up to) ...\n3 x 10 = 30',
        'Each line multiplies N by the loop counter from 1 to 10.'),
    ],
    hints: [
      'Loop the multiplier from 1 to 10.',
      'Print the full line including N, the multiplier, and the product.',
    ],
    approach:
      'Loop a counter i from 1 to 10. On each pass, compute N times i and print the whole line in the ' +
      'required format. The only new skill is printing text and numbers together in one line.',
    whatYouLearn: ['Repeating with a loop', 'Formatting text and numbers on one line'],
    solutions: solo(
      'Loop i from 1 to 10 and print "N x i = N*i" each time.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(1, 11):\n' +
          '    print(f"{n} x {i} = {n * i}")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = 1; i <= 10; i++)\n' +
          '            System.out.println(n + " x " + i + " = " + (n * i));\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= 10; i++) printf("%d x %d = %d\\n", n, i, n * i);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = 1; i <= 10; i++) cout << n << " x " << i << " = " << n * i << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The loop runs ten times, once for each multiplier. Inside, N times i is computed and printed as ' +
      'part of a formatted line, giving the familiar multiplication table.',
    tip: 'Mixing text and numbers in output trips up beginners — practise it here until it feels easy.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Loops', topics: ['Loops', 'Accumulator'],
    title: 'Factorial of a Number',
    description:
      'The factorial of N (written N!) is the product of all numbers from 1 to N.\n\n' +
      '5! = 1 x 2 x 3 x 4 x 5 = 120.\n\n' +
      'Read N and print N!.',
    inputFormat: 'One integer N (0 <= N <= 12).',
    outputFormat: 'One integer: N!.',
    examples: [
      ex('5', '120', '1 x 2 x 3 x 4 x 5 = 120.'),
      ex('0', '1', 'By definition, 0! = 1.'),
    ],
    hints: [
      'This is like a running total, but you multiply instead of add.',
      'Start the result at 1 (not 0) — multiplying by 0 would wipe everything out.',
    ],
    approach:
      'Set a result variable to 1. Loop from 1 to N, multiplying the result by each number. ' +
      'Because you multiply, the starting value must be 1. Print the result after the loop.',
    whatYouLearn: ['A running product', 'Why the starting value depends on the operation'],
    solutions: solo(
      'Start result at 1, multiply by every number from 1 to N, then print it.',
      {
        python:
          'n = int(input())\n' +
          'result = 1\n' +
          'for i in range(1, n + 1):\n' +
          '    result *= i\n' +
          'print(result)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        long result = 1;\n' +
          '        for (int i = 1; i <= n; i++) result *= i;\n' +
          '        System.out.println(result);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    long long result = 1;\n' +
          '    for (int i = 1; i <= n; i++) result *= i;\n' +
          '    printf("%lld\\n", result);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    long long result = 1;\n' +
          '    for (int i = 1; i <= n; i++) result *= i;\n' +
          '    cout << result << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Factorial is a running product. Starting at 1 keeps the first multiplication correct, and each ' +
      'loop pass multiplies in the next number. This also quietly handles 0! because the loop never runs and result stays 1.',
    tip: 'Factorials grow huge fast — that is why the code uses a bigger number type (long) for safety.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Loops', topics: ['While Loop', 'Digits'],
    title: 'Count the Digits',
    description:
      'Read a whole number and print how many digits it has.\n\n' +
      'For 4072 the answer is 4.',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'One integer: the number of digits.',
    examples: [
      ex('4072', '4', '4072 has four digits.'),
      ex('9', '1', 'A single-digit number has one digit.'),
    ],
    hints: [
      'Dividing a whole number by 10 removes its last digit.',
      'Keep dividing by 10 and counting until the number becomes 0.',
    ],
    approach:
      'Use a while loop. Each pass, remove the last digit by dividing by 10 (integer division) and add ' +
      '1 to a counter. Stop when the number reaches 0. Print the counter.',
    whatYouLearn: ['The while loop', 'Peeling digits off a number with division'],
    solutions: solo(
      'Repeatedly integer-divide by 10, counting each step until the number is 0.',
      {
        python:
          'n = int(input())\n' +
          'if n == 0:\n' +
          '    print(1)\n' +
          'else:\n' +
          '    count = 0\n' +
          '    while n > 0:\n' +
          '        n //= 10\n' +
          '        count += 1\n' +
          '    print(count)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        if (n == 0) { System.out.println(1); return; }\n' +
          '        int count = 0;\n' +
          '        while (n > 0) { n /= 10; count++; }\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    if (n == 0) { printf("1\\n"); return 0; }\n' +
          '    int count = 0;\n' +
          '    while (n > 0) { n /= 10; count++; }\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    if (n == 0) { cout << 1 << endl; return 0; }\n' +
          '    int count = 0;\n' +
          '    while (n > 0) { n /= 10; count++; }\n' +
          '    cout << count << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Integer division by 10 chops off the rightmost digit each time. Counting how many chops it takes ' +
      'to reach 0 tells you the digit count. Zero is handled separately since the loop would never run for it.',
    tip: 'Divide-by-10 to peel digits is a classic trick — it powers reverse-a-number and sum-of-digits too.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Loops', topics: ['While Loop', 'Digits'],
    title: 'Sum of Digits',
    description:
      'Read a whole number and print the sum of its digits.\n\n' +
      'For 253 the answer is 2 + 5 + 3 = 10.',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'One integer: the sum of the digits.',
    examples: [
      ex('253', '10', '2 + 5 + 3 = 10.'),
      ex('9', '9', 'A single digit sums to itself.'),
    ],
    hints: [
      'The remainder after dividing by 10 gives you the last digit.',
      'Take the last digit, add it to a total, then remove it — repeat.',
    ],
    approach:
      'Use a while loop. Each pass, get the last digit with % 10, add it to a running total, then remove ' +
      'that digit with integer division by 10. Stop at 0 and print the total.',
    whatYouLearn: ['Extracting the last digit with %', 'Combining % and / to walk through digits'],
    solutions: solo(
      'Repeatedly add (n % 10) to a total and drop the digit with n // 10 until n is 0.',
      {
        python:
          'n = int(input())\n' +
          'total = 0\n' +
          'while n > 0:\n' +
          '    total += n % 10\n' +
          '    n //= 10\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int total = 0;\n' +
          '        while (n > 0) { total += n % 10; n /= 10; }\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    scanf("%d", &n);\n' +
          '    while (n > 0) { total += n % 10; n /= 10; }\n' +
          '    printf("%d\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, total = 0;\n' +
          '    cin >> n;\n' +
          '    while (n > 0) { total += n % 10; n /= 10; }\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The pair "% 10" (last digit) and "/ 10" (drop last digit) lets you walk through a number one digit ' +
      'at a time. Adding each last digit to the total builds up the digit sum.',
    tip: 'Notice this reuses the divide-by-10 idea from counting digits — small tricks combine into bigger ones.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Loops', topics: ['Loops'],
    title: 'Countdown from N',
    description:
      'Read a number N and count down from N to 1, each number on its own line.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'The numbers N, N-1, ..., 1, each on its own line.',
    examples: [
      ex('5', '5\n4\n3\n2\n1', 'Counting down from 5 to 1.'),
    ],
    hints: [
      'Start the counter at N instead of 1.',
      'Decrease the counter by 1 each pass instead of increasing it.',
    ],
    approach:
      'Loop with a counter that starts at N and decreases by 1 each time, continuing while it is at ' +
      'least 1. Print the counter inside the loop.',
    whatYouLearn: ['Looping downwards', 'Choosing the loop direction and step'],
    solutions: solo(
      'Loop the counter from N down to 1, printing it each time.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(n, 0, -1):\n' +
          '    print(i)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = n; i >= 1; i--) System.out.println(i);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = n; i >= 1; i--) printf("%d\\n", i);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = n; i >= 1; i--) cout << i << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A loop can run in either direction. Starting high and stepping down by 1 each time produces a ' +
      'countdown. Choosing the start, the stop test, and the step is what shapes any loop.',
    tip: 'Off-by-one errors love loops. Check the very first and very last value your loop prints.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Loops', topics: ['Loops', 'Modulo'],
    title: 'Even Numbers up to N',
    description:
      'Read a number N and print all even numbers from 1 up to N, each on its own line.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'Each even number from 1 to N, one per line.',
    examples: [
      ex('10', '2\n4\n6\n8\n10', 'Only the even numbers between 1 and 10.'),
    ],
    hints: [
      'Loop through every number and print only the even ones.',
      'Or start at 2 and step by 2 to visit only even numbers.',
    ],
    approach:
      'Two simple ways: loop 1..N and print only numbers where number % 2 == 0, or loop starting at 2 ' +
      'and add 2 each pass. Either produces just the even numbers.',
    whatYouLearn: ['Filtering inside a loop', 'Stepping a loop by more than 1'],
    solutions: solo(
      'Loop from 2 to N in steps of 2, printing each value.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(2, n + 1, 2):\n' +
          '    print(i)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = 2; i <= n; i += 2) System.out.println(i);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 2; i <= n; i += 2) printf("%d\\n", i);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    for (int i = 2; i <= n; i += 2) cout << i << "\\n";\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Stepping by 2 from an even start lands on even numbers only, so no check is needed. It is a neat ' +
      'example of choosing a smarter loop instead of testing every value.',
    tip: 'Often you can avoid an if by setting up the loop cleverly. Both ways are correct — pick the clearer one.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Patterns', topics: ['Nested Loops', 'Patterns'],
    title: 'Square of Stars',
    description:
      'Read a number N and print an N x N square made of the star character (*).\n\n' +
      'For N = 3 the output is three lines, each with three stars.',
    inputFormat: 'One integer N (N is at least 1).',
    outputFormat: 'N lines, each containing N stars.',
    examples: [
      ex('3', '***\n***\n***', 'A 3 by 3 block of stars.'),
    ],
    hints: [
      'You need a loop for the rows and, inside it, a loop for the stars in each row.',
      'Print a newline after finishing each row.',
    ],
    approach:
      'Use a loop for each row (N rows). Inside it, use another loop to print N stars on that row, then ' +
      'move to the next line. A loop inside a loop is called a nested loop.',
    whatYouLearn: ['Nested loops', 'Building 2D shapes from rows and columns'],
    solutions: solo(
      'Outer loop for rows, inner loop prints N stars, then a newline per row.',
      {
        python:
          'n = int(input())\n' +
          'for row in range(n):\n' +
          '    print("*" * n)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int r = 0; r < n; r++) {\n' +
          '            for (int c = 0; c < n; c++) System.out.print("*");\n' +
          '            System.out.println();\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int r = 0; r < n; r++) {\n' +
          '        for (int c = 0; c < n; c++) printf("*");\n' +
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
          '        for (int c = 0; c < n; c++) cout << "*";\n' +
          '        cout << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The outer loop decides how many rows to print; the inner loop fills each row with stars. Nested ' +
      'loops like this are the foundation of every star pattern you will meet in the Logic track.',
    tip: 'Picture rows and columns like a grid. Master the square first — triangles are just a small tweak.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Loops', topics: ['Loops', 'Conditions', 'Modulo'],
    title: 'FizzBuzz',
    description:
      'For every number from 1 to N, print:\n\n' +
      '- "Fizz" if it is divisible by 3\n' +
      '- "Buzz" if it is divisible by 5\n' +
      '- "FizzBuzz" if it is divisible by both 3 and 5\n' +
      '- otherwise the number itself\n\n' +
      'One value per line.',
    inputFormat: 'One integer N.',
    outputFormat: 'N lines following the FizzBuzz rules.',
    examples: [
      ex('5', '1\n2\nFizz\n4\nBuzz', '3 -> Fizz, 5 -> Buzz, others print themselves.'),
      ex('15', '... 14\nFizzBuzz', '15 is divisible by both 3 and 5, so it prints FizzBuzz.'),
    ],
    hints: [
      'Check the "both" case (divisible by 3 AND 5) first.',
      'If you check 3 or 5 before the combined case, you will never reach FizzBuzz.',
    ],
    approach:
      'Loop from 1 to N. For each number, test divisibility by 15 first (that is 3 and 5 together), then ' +
      'by 3, then by 5, and if none match print the number. Order matters here.',
    whatYouLearn: ['Combining loops with conditions', 'Why the order of checks matters'],
    solutions: solo(
      'Loop 1..N; print FizzBuzz for multiples of 15, else Fizz for 3, else Buzz for 5, else the number.',
      {
        python:
          'n = int(input())\n' +
          'for i in range(1, n + 1):\n' +
          '    if i % 15 == 0:\n' +
          '        print("FizzBuzz")\n' +
          '    elif i % 3 == 0:\n' +
          '        print("Fizz")\n' +
          '    elif i % 5 == 0:\n' +
          '        print("Buzz")\n' +
          '    else:\n' +
          '        print(i)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        for (int i = 1; i <= n; i++) {\n' +
          '            if (i % 15 == 0) System.out.println("FizzBuzz");\n' +
          '            else if (i % 3 == 0) System.out.println("Fizz");\n' +
          '            else if (i % 5 == 0) System.out.println("Buzz");\n' +
          '            else System.out.println(i);\n' +
          '        }\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    for (int i = 1; i <= n; i++) {\n' +
          '        if (i % 15 == 0) printf("FizzBuzz\\n");\n' +
          '        else if (i % 3 == 0) printf("Fizz\\n");\n' +
          '        else if (i % 5 == 0) printf("Buzz\\n");\n' +
          '        else printf("%d\\n", i);\n' +
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
          '        if (i % 15 == 0) cout << "FizzBuzz\\n";\n' +
          '        else if (i % 3 == 0) cout << "Fizz\\n";\n' +
          '        else if (i % 5 == 0) cout << "Buzz\\n";\n' +
          '        else cout << i << "\\n";\n' +
          '    }\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'FizzBuzz is famous because the obvious order fails: if you check 3 first, multiples of 15 print ' +
      '"Fizz" and never "FizzBuzz". Testing the combined case first fixes it. It blends loops, conditions, and % in one small problem.',
    tip: 'This is a classic first screening question. If you can explain the ordering, you understand conditions well.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Making Decisions', topics: ['Characters', 'Conditions'],
    title: 'Vowel or Consonant',
    description:
      'Read a single lowercase letter and print "Vowel" if it is one of a, e, i, o, u, ' +
      'otherwise print "Consonant".',
    inputFormat: 'A single lowercase letter.',
    outputFormat: 'Either "Vowel" or "Consonant".',
    examples: [
      ex('e', 'Vowel', 'e is one of the five vowels.'),
      ex('k', 'Consonant', 'k is not a vowel.'),
    ],
    hints: [
      'Compare the letter against each of the five vowels using OR.',
      'If it matches none of them, it is a consonant.',
    ],
    approach:
      'Read one character. Check whether it equals a, e, i, o, or u by joining the tests with OR. ' +
      'If any match, print "Vowel"; otherwise print "Consonant".',
    whatYouLearn: ['Working with a single character', 'Comparing against several values with OR'],
    solutions: solo(
      'If the letter is a, e, i, o, or u print "Vowel", else "Consonant".',
      {
        python:
          'ch = input().strip()\n' +
          'if ch in "aeiou":\n' +
          '    print("Vowel")\n' +
          'else:\n' +
          '    print("Consonant")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        char ch = new Scanner(System.in).next().charAt(0);\n' +
          '        if (ch == \'a\' || ch == \'e\' || ch == \'i\' || ch == \'o\' || ch == \'u\')\n' +
          '            System.out.println("Vowel");\n' +
          '        else System.out.println("Consonant");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    char ch;\n' +
          '    scanf("%c", &ch);\n' +
          '    if (ch == \'a\' || ch == \'e\' || ch == \'i\' || ch == \'o\' || ch == \'u\')\n' +
          '        printf("Vowel\\n");\n' +
          '    else printf("Consonant\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    char ch;\n' +
          '    cin >> ch;\n' +
          '    if (ch == \'a\' || ch == \'e\' || ch == \'i\' || ch == \'o\' || ch == \'u\')\n' +
          '        cout << "Vowel" << endl;\n' +
          '    else cout << "Consonant" << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'A letter is just a value you can compare. Joining five equality checks with OR asks "is it any of ' +
      'these?". Python offers a shortcut with "in", which reads almost like English.',
    tip: 'Characters are handled much like numbers under the hood — comparing them is completely normal.',
  },
  {
    track: T, level: 'INTERMEDIATE', category: 'Making Decisions', topics: ['Conditions', 'Arithmetic'],
    title: 'Simple Calculator',
    description:
      'Read two numbers and an operator (+, -, *, or /), then print the result.\n\n' +
      'For division, assume the second number is not zero.',
    inputFormat: 'Two numbers a and b, and a single operator character.',
    outputFormat: 'The result of applying the operator to a and b.',
    examples: [
      ex('6 2 +', '8', '6 + 2 = 8.'),
      ex('6 2 /', '3', '6 / 2 = 3.'),
    ],
    hints: [
      'Read both numbers and the operator symbol.',
      'Use an if/else-if chain (or switch) to pick which operation to run.',
    ],
    approach:
      'Read a, b, and the operator. Compare the operator against each symbol and perform the matching ' +
      'operation. This is decision-making driven by a value rather than a number range.',
    whatYouLearn: ['Choosing an action from an input', 'Using a switch / operator chain'],
    solutions: solo(
      'Match the operator character and apply the matching arithmetic operation.',
      {
        python:
          'parts = input().split()\n' +
          'a = float(parts[0]); b = float(parts[1]); op = parts[2]\n' +
          'if op == "+":\n' +
          '    print(a + b)\n' +
          'elif op == "-":\n' +
          '    print(a - b)\n' +
          'elif op == "*":\n' +
          '    print(a * b)\n' +
          'else:\n' +
          '    print(a / b)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        double a = sc.nextDouble(), b = sc.nextDouble();\n' +
          '        String op = sc.next();\n' +
          '        double r = 0;\n' +
          '        if (op.equals("+")) r = a + b;\n' +
          '        else if (op.equals("-")) r = a - b;\n' +
          '        else if (op.equals("*")) r = a * b;\n' +
          '        else r = a / b;\n' +
          '        System.out.println(r);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    double a, b; char op;\n' +
          '    scanf("%lf %lf %c", &a, &b, &op);\n' +
          '    if (op == \'+\') printf("%g\\n", a + b);\n' +
          '    else if (op == \'-\') printf("%g\\n", a - b);\n' +
          '    else if (op == \'*\') printf("%g\\n", a * b);\n' +
          '    else printf("%g\\n", a / b);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    double a, b; char op;\n' +
          '    cin >> a >> b >> op;\n' +
          '    if (op == \'+\') cout << a + b;\n' +
          '    else if (op == \'-\') cout << a - b;\n' +
          '    else if (op == \'*\') cout << a * b;\n' +
          '    else cout << a / b;\n' +
          '    cout << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Here the decision is based on which symbol was typed, not a numeric range. Matching the operator ' +
      'and running the right calculation is the same pattern used by real calculators and menus.',
    tip: 'You just built a tiny app that reacts to user choice — that is the seed of every interactive program.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Making Decisions', topics: ['Conditions'],
    title: 'Maximum of Three Numbers',
    description:
      'Given three numbers, find the biggest one.\n\n' +
      'Read three integers and print the largest.',
    inputFormat: 'Three integers separated by spaces.',
    outputFormat: 'One integer: the largest of the three.',
    examples: [
      ex('3 9 5', '9', '9 is bigger than both 3 and 5.'),
      ex('12 4 12', '12', 'When the biggest value appears twice, it is still the answer.'),
    ],
    hints: [
      'Assume the first number is the biggest, then compare it against the other two.',
      'If a later number is bigger, remember it instead.',
    ],
    approach:
      'Start by guessing the first number is the largest. Compare it with the second — if the second is bigger, ' +
      'switch your guess. Do the same with the third. Whatever you are holding at the end is the maximum.',
    whatYouLearn: ['Comparing values with if', 'Keeping a "best so far" value'],
    solutions: solo(
      'Hold a "largest so far", starting at the first number, and update it when a bigger one appears.',
      {
        python:
          'a, b, c = map(int, input().split())\n' +
          'largest = a\n' +
          'if b > largest:\n' +
          '    largest = b\n' +
          'if c > largest:\n' +
          '    largest = c\n' +
          'print(largest)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();\n' +
          '        int largest = a;\n' +
          '        if (b > largest) largest = b;\n' +
          '        if (c > largest) largest = c;\n' +
          '        System.out.println(largest);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b, c;\n' +
          '    scanf("%d %d %d", &a, &b, &c);\n' +
          '    int largest = a;\n' +
          '    if (b > largest) largest = b;\n' +
          '    if (c > largest) largest = c;\n' +
          '    printf("%d\\n", largest);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b, c;\n' +
          '    cin >> a >> b >> c;\n' +
          '    int largest = a;\n' +
          '    if (b > largest) largest = b;\n' +
          '    if (c > largest) largest = c;\n' +
          '    cout << largest << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Finding the maximum is about holding onto the best value you have seen so far and replacing it whenever you ' +
      'find something bigger. With three numbers you only need two comparisons — the same idea scales to a whole list later.',
    tip: 'The "best so far" pattern is everywhere in programming. Learn it now with three numbers.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Math'],
    title: 'Absolute Difference',
    description:
      'The difference between two numbers should always be reported as a positive value (how far apart they are).\n\n' +
      'Read two integers and print the absolute difference between them.',
    inputFormat: 'Two integers separated by a space.',
    outputFormat: 'One integer: how far apart the two numbers are.',
    examples: [
      ex('10 3', '7', '10 − 3 = 7.'),
      ex('3 10', '7', '3 − 10 = −7, but the distance apart is 7.'),
    ],
    hints: [
      'Subtract one from the other.',
      'If the result is negative, flip its sign so it becomes positive.',
    ],
    approach:
      'Subtract the two numbers. The answer might come out negative depending on their order, so if it is below ' +
      'zero, make it positive. Most languages have a built-in "absolute value" function that does this for you.',
    whatYouLearn: ['Absolute value', 'Handling negative results'],
    solutions: solo(
      'Subtract the numbers and take the absolute value of the result.',
      {
        python:
          'a, b = map(int, input().split())\n' +
          'print(abs(a - b))',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt();\n' +
          '        System.out.println(Math.abs(a - b));\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n' +
          '#include <stdlib.h>\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    scanf("%d %d", &a, &b);\n' +
          '    printf("%d\\n", abs(a - b));\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          '#include <cstdlib>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b;\n' +
          '    cin >> a >> b;\n' +
          '    cout << abs(a - b) << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Absolute value answers "how far apart?" regardless of order. Subtracting gives a signed result; taking the ' +
      'absolute value drops the sign so the distance is always positive. This is the same idea behind measuring gaps and errors.',
    tip: 'abs() turns "direction" into "distance". Reach for it whenever order should not matter.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Math', 'Formula'],
    title: 'Simple Interest',
    description:
      'Simple interest is calculated with the formula:\n\n' +
      'interest = principal × rate × time ÷ 100\n\n' +
      'Read the principal, rate, and time, then print the interest earned.',
    inputFormat: 'Three integers: principal, rate (percent per year), and time (years).',
    outputFormat: 'One integer: the simple interest.',
    examples: [
      ex('1000 5 2', '100', '1000 × 5 × 2 ÷ 100 = 100.'),
      ex('2000 10 3', '600', '2000 × 10 × 3 ÷ 100 = 600.'),
    ],
    hints: [
      'Multiply all three values together first.',
      'Then divide by 100.',
    ],
    approach:
      'Plug the three inputs straight into the formula. Multiply principal, rate, and time, then divide by 100. ' +
      'The only care needed is doing the multiplication before the division so you do not lose accuracy.',
    whatYouLearn: ['Turning a formula into code', 'Order of arithmetic operations'],
    solutions: solo(
      'Apply interest = principal × rate × time ÷ 100 directly.',
      {
        python:
          'p, r, t = map(int, input().split())\n' +
          'print(p * r * t // 100)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int p = sc.nextInt(), r = sc.nextInt(), t = sc.nextInt();\n' +
          '        System.out.println(p * r * t / 100);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int p, r, t;\n' +
          '    scanf("%d %d %d", &p, &r, &t);\n' +
          '    printf("%d\\n", p * r * t / 100);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int p, r, t;\n' +
          '    cin >> p >> r >> t;\n' +
          '    cout << p * r * t / 100 << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'This is a direct formula problem: read the values, compute, print. Multiplying all three numbers before ' +
      'dividing by 100 keeps the result correct. Recognising a real-world formula and coding it verbatim is a core everyday skill.',
    tip: 'When a formula is given, translate it symbol-for-symbol. Do not overthink it.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Math'],
    title: 'Average of Three Numbers',
    description:
      'Read three integers and print their average (rounded down to a whole number).',
    inputFormat: 'Three integers separated by spaces.',
    outputFormat: 'One integer: the average, rounded down.',
    examples: [
      ex('10 20 30', '20', 'Sum is 60, divided by 3 is 20.'),
      ex('10 20 25', '18', 'Sum is 55, divided by 3 is 18.33, which rounds down to 18.'),
    ],
    hints: [
      'Add the three numbers first.',
      'Then divide the total by 3.',
    ],
    approach:
      'Average means "total shared equally". Add the three numbers to get the sum, then divide by 3. Using whole-number ' +
      'division automatically drops the fractional part, which is what "rounded down" asks for.',
    whatYouLearn: ['Computing an average', 'Integer (floor) division'],
    solutions: solo(
      'Add the three numbers and divide the sum by 3 using integer division.',
      {
        python:
          'a, b, c = map(int, input().split())\n' +
          'print((a + b + c) // 3)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int a = sc.nextInt(), b = sc.nextInt(), c = sc.nextInt();\n' +
          '        System.out.println((a + b + c) / 3);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int a, b, c;\n' +
          '    scanf("%d %d %d", &a, &b, &c);\n' +
          '    printf("%d\\n", (a + b + c) / 3);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int a, b, c;\n' +
          '    cin >> a >> b >> c;\n' +
          '    cout << (a + b + c) / 3 << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'An average is just the sum divided by how many values there are. The brackets around the addition matter — ' +
      'you must total the numbers before dividing. Integer division then discards the decimal, giving the rounded-down answer.',
    tip: 'Always add first, then divide. (a + b + c) / 3 is right; a + b + c / 3 is not.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Math', 'Percentages'],
    title: 'Total Bill with Tax',
    description:
      'A shop adds tax on top of the bill amount.\n\n' +
      'Read the bill amount and the tax percentage, then print the total the customer pays.',
    inputFormat: 'Two integers: the bill amount and the tax percentage.',
    outputFormat: 'One integer: the total after adding tax.',
    examples: [
      ex('1000 18', '1180', 'Tax is 18% of 1000 = 180. Total = 1000 + 180 = 1180.'),
      ex('500 0', '500', 'With 0% tax, the total equals the bill.'),
    ],
    hints: [
      'Tax amount = bill × tax percent ÷ 100.',
      'Add the tax to the original bill.',
    ],
    approach:
      'First work out the tax: a percentage of the bill. Then add it back to the bill to get the total. Compute the ' +
      'tax as bill × percent ÷ 100, doing the multiplication before the division.',
    whatYouLearn: ['Calculating a percentage', 'Adding a percentage on top of a value'],
    solutions: solo(
      'Compute tax = bill × percent ÷ 100, then add it to the bill.',
      {
        python:
          'bill, tax = map(int, input().split())\n' +
          'print(bill + bill * tax // 100)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int bill = sc.nextInt(), tax = sc.nextInt();\n' +
          '        System.out.println(bill + bill * tax / 100);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int bill, tax;\n' +
          '    scanf("%d %d", &bill, &tax);\n' +
          '    printf("%d\\n", bill + bill * tax / 100);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int bill, tax;\n' +
          '    cin >> bill >> tax;\n' +
          '    cout << bill + bill * tax / 100 << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Adding tax is a two-step calculation: find the percentage, then add it on. Writing it as bill + bill × percent ÷ 100 ' +
      'does both in one expression. This exact pattern powers every shopping cart and invoice you will ever build.',
    tip: 'A percent of a number is (number × percent ÷ 100). Memorise that shape — you will use it constantly.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Math'],
    title: 'Seconds to Minutes',
    description:
      'Read a number of seconds and break it into whole minutes and leftover seconds.\n\n' +
      'Print the minutes and the remaining seconds.',
    inputFormat: 'One integer: a number of seconds.',
    outputFormat: 'Two integers separated by a space: minutes and leftover seconds.',
    examples: [
      ex('130', '2 10', '130 seconds is 2 full minutes (120 seconds) and 10 seconds left over.'),
      ex('45', '0 45', 'Less than a minute, so 0 minutes and 45 seconds.'),
    ],
    hints: [
      'There are 60 seconds in a minute.',
      'Whole minutes come from dividing; leftover seconds come from the remainder.',
    ],
    approach:
      'Dividing the seconds by 60 (whole-number division) gives the number of complete minutes. The remainder after ' +
      'dividing by 60 gives the seconds that did not make a full minute. Print both.',
    whatYouLearn: ['Integer division and remainder together', 'Splitting a value into units'],
    solutions: solo(
      'Minutes = seconds ÷ 60, leftover = seconds mod 60.',
      {
        python:
          's = int(input())\n' +
          'print(s // 60, s % 60)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int s = new Scanner(System.in).nextInt();\n' +
          '        System.out.println(s / 60 + " " + s % 60);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int s;\n' +
          '    scanf("%d", &s);\n' +
          '    printf("%d %d\\n", s / 60, s % 60);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int s;\n' +
          '    cin >> s;\n' +
          '    cout << s / 60 << " " << s % 60 << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Division and remainder are a team: ÷ 60 tells you how many whole minutes fit, and mod 60 tells you what is left ' +
      'over. Together they convert a raw count into human-friendly units — the same trick converts to hours, days, or any base.',
    tip: 'Division gives "how many whole", remainder gives "what is left". You will use this pair forever.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Making Decisions', topics: ['Conditions', 'Math'],
    title: 'Divisibility Check',
    description:
      'Read two numbers and decide whether the first divides evenly by the second.\n\n' +
      'Print "Yes" if it does, otherwise "No".',
    inputFormat: 'Two integers: the number and the divisor.',
    outputFormat: 'Either "Yes" or "No".',
    examples: [
      ex('10 5', 'Yes', '10 divided by 5 leaves no remainder.'),
      ex('10 3', 'No', '10 divided by 3 leaves a remainder of 1.'),
    ],
    hints: [
      'A number divides evenly when the remainder is 0.',
      'The remainder operator (%) gives what is left after division.',
    ],
    approach:
      'The key idea is the remainder. If dividing leaves nothing behind — a remainder of 0 — then it divides evenly. ' +
      'Use the % operator and check whether the result equals 0.',
    whatYouLearn: ['The remainder (modulo) operator', 'Testing divisibility'],
    solutions: solo(
      'Divides evenly exactly when number % divisor equals 0.',
      {
        python:
          'n, d = map(int, input().split())\n' +
          'print("Yes" if n % d == 0 else "No")',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int n = sc.nextInt(), d = sc.nextInt();\n' +
          '        System.out.println(n % d == 0 ? "Yes" : "No");\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n, d;\n' +
          '    scanf("%d %d", &n, &d);\n' +
          '    printf(n % d == 0 ? "Yes\\n" : "No\\n");\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n, d;\n' +
          '    cin >> n >> d;\n' +
          '    cout << (n % d == 0 ? "Yes" : "No") << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Divisibility is defined by the remainder: if number % divisor is 0, it splits evenly. This one operator answers ' +
      'the question directly, and it is the foundation for checking even/odd, multiples, and factors later.',
    tip: 'The % operator is your divisibility test. "% d == 0" means "a clean multiple of d".',
  },
  {
    track: T, level: 'BEGINNER', category: 'Variables & Math', topics: ['Math'],
    title: 'Last Digit of a Number',
    description:
      'Read a whole number and print only its last digit.',
    inputFormat: 'One non-negative integer.',
    outputFormat: 'One digit: the last digit of the number.',
    examples: [
      ex('3427', '7', 'The last digit of 3427 is 7.'),
      ex('80', '0', 'The last digit of 80 is 0.'),
    ],
    hints: [
      'The last digit is the remainder when dividing by 10.',
      'For example, 3427 % 10 = 7.',
    ],
    approach:
      'Every number is written in base 10, so its last digit is exactly what is left over after dividing by 10. ' +
      'The remainder operator (% 10) gives you that digit in one step.',
    whatYouLearn: ['Extracting a digit with % 10', 'How place value connects to remainders'],
    solutions: solo(
      'The last digit is number % 10.',
      {
        python:
          'n = int(input())\n' +
          'print(n % 10)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        System.out.println(n % 10);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    printf("%d\\n", n % 10);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    cout << n % 10 << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Because we count in tens, the "ones" place is whatever remains after removing all the complete tens — that is ' +
      '% 10. This tiny trick is the first step of bigger digit problems like reversing a number or summing its digits.',
    tip: '% 10 peels off the last digit; ÷ 10 removes it. Those two moves unlock every digit-by-digit problem.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Loops', topics: ['Loops', 'Conditions'],
    title: 'Sum of Even Numbers up to N',
    description:
      'Read a number N and add up all the even numbers from 1 to N.\n\n' +
      'Print the total.',
    inputFormat: 'One integer N.',
    outputFormat: 'One integer: the sum of all even numbers from 1 to N.',
    examples: [
      ex('10', '30', '2 + 4 + 6 + 8 + 10 = 30.'),
      ex('5', '6', '2 + 4 = 6 (5 is not even).'),
    ],
    hints: [
      'Loop through the numbers from 1 to N.',
      'Only add a number to the total when it is even.',
    ],
    approach:
      'Keep a running total that starts at 0. Walk through every number from 1 to N, and each time you meet an even ' +
      'one (remainder 0 when divided by 2), add it to the total. Print the total at the end.',
    whatYouLearn: ['Looping with a running total', 'Filtering values with a condition inside a loop'],
    solutions: solo(
      'Loop 1..N, adding a number to the total only when it is even.',
      {
        python:
          'n = int(input())\n' +
          'total = 0\n' +
          'for i in range(1, n + 1):\n' +
          '    if i % 2 == 0:\n' +
          '        total += i\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int total = 0;\n' +
          '        for (int i = 1; i <= n; i++)\n' +
          '            if (i % 2 == 0) total += i;\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int total = 0;\n' +
          '    for (int i = 1; i <= n; i++)\n' +
          '        if (i % 2 == 0) total += i;\n' +
          '    printf("%d\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int total = 0;\n' +
          '    for (int i = 1; i <= n; i++)\n' +
          '        if (i % 2 == 0) total += i;\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'This combines two beginner skills: looping over a range and using a condition to decide what counts. The running ' +
      'total grows only when the current number passes the even test. Once you can filter-and-add, you can total anything that matches a rule.',
    tip: 'A loop plus an if inside it lets you process "only the items that match". That combo is used everywhere.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Loops', topics: ['Loops', 'Math'],
    title: 'Count Multiples up to N',
    description:
      'Read two numbers, K and N. Count how many multiples of K are there from 1 to N.\n\n' +
      'Print the count.',
    inputFormat: 'Two integers: K and N.',
    outputFormat: 'One integer: how many multiples of K lie between 1 and N.',
    examples: [
      ex('3 10', '3', 'The multiples of 3 up to 10 are 3, 6, 9 — that is 3 of them.'),
      ex('5 4', '0', 'There are no multiples of 5 up to 4.'),
    ],
    hints: [
      'Loop from 1 to N and test each number.',
      'A number is a multiple of K when it divides evenly by K.',
    ],
    approach:
      'Keep a counter starting at 0. Go through every number from 1 to N, and whenever one is a multiple of K ' +
      '(remainder 0 when divided by K), add one to the counter. Print the counter at the end.',
    whatYouLearn: ['Counting items that match a rule', 'Using % inside a loop'],
    solutions: solo(
      'Loop 1..N and increment a counter each time the number is divisible by K.',
      {
        python:
          'k, n = map(int, input().split())\n' +
          'count = 0\n' +
          'for i in range(1, n + 1):\n' +
          '    if i % k == 0:\n' +
          '        count += 1\n' +
          'print(count)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        Scanner sc = new Scanner(System.in);\n' +
          '        int k = sc.nextInt(), n = sc.nextInt();\n' +
          '        int count = 0;\n' +
          '        for (int i = 1; i <= n; i++)\n' +
          '            if (i % k == 0) count++;\n' +
          '        System.out.println(count);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int k, n;\n' +
          '    scanf("%d %d", &k, &n);\n' +
          '    int count = 0;\n' +
          '    for (int i = 1; i <= n; i++)\n' +
          '        if (i % k == 0) count++;\n' +
          '    printf("%d\\n", count);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int k, n;\n' +
          '    cin >> k >> n;\n' +
          '    int count = 0;\n' +
          '    for (int i = 1; i <= n; i++)\n' +
          '        if (i % k == 0) count++;\n' +
          '    cout << count << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'Counting is just like summing, but you add 1 instead of the value. The divisibility test (% k == 0) decides ' +
      'what to count. Starting the counter at 0 also gives the correct answer when nothing matches, as in the second example.',
    tip: 'To count matches, start a counter at 0 and add 1 on each hit. Simple and reliable.',
  },
  {
    track: T, level: 'BEGINNER', category: 'Loops', topics: ['Loops', 'Math'],
    title: 'Sum of Squares up to N',
    description:
      'Read a number N and add up the squares of every number from 1 to N.\n\n' +
      'That is, compute 1² + 2² + 3² + ... + N². Print the total.',
    inputFormat: 'One integer N.',
    outputFormat: 'One integer: the sum of the squares from 1 to N.',
    examples: [
      ex('3', '14', '1 + 4 + 9 = 14.'),
      ex('1', '1', 'Just 1² = 1.'),
    ],
    hints: [
      'Loop from 1 to N.',
      'For each number, add its square (number × number) to the total.',
    ],
    approach:
      'Keep a running total at 0. For each number i from 1 to N, square it by multiplying i by itself, and add that ' +
      'to the total. After the loop finishes, print the total.',
    whatYouLearn: ['Building a total from a computed value', 'Squaring inside a loop'],
    solutions: solo(
      'Loop 1..N, adding i × i to a running total each time.',
      {
        python:
          'n = int(input())\n' +
          'total = 0\n' +
          'for i in range(1, n + 1):\n' +
          '    total += i * i\n' +
          'print(total)',
        java:
          'import java.util.Scanner;\n\n' +
          'public class Main {\n' +
          '    public static void main(String[] args) {\n' +
          '        int n = new Scanner(System.in).nextInt();\n' +
          '        int total = 0;\n' +
          '        for (int i = 1; i <= n; i++) total += i * i;\n' +
          '        System.out.println(total);\n' +
          '    }\n' +
          '}',
        c:
          '#include <stdio.h>\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    scanf("%d", &n);\n' +
          '    int total = 0;\n' +
          '    for (int i = 1; i <= n; i++) total += i * i;\n' +
          '    printf("%d\\n", total);\n' +
          '    return 0;\n' +
          '}',
        cpp:
          '#include <iostream>\n' +
          'using namespace std;\n\n' +
          'int main() {\n' +
          '    int n;\n' +
          '    cin >> n;\n' +
          '    int total = 0;\n' +
          '    for (int i = 1; i <= n; i++) total += i * i;\n' +
          '    cout << total << endl;\n' +
          '    return 0;\n' +
          '}',
      },
    ),
    explanation:
      'The only new idea beyond a plain sum is that you add a computed value (i × i) rather than i itself. This shows ' +
      'that the thing you accumulate can be any expression, which opens the door to sums of cubes, factorials, and series.',
    tip: 'What you add in a loop can be a calculation, not just the counter. That small shift unlocks many problems.',
  },
]

export default questions
