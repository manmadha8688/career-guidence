package com.example.student.config;

import com.example.student.model.*;
import com.example.student.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final SubjectRepository subjectRepository;
    private final ConceptRepository conceptRepository;
    private final RoadmapRepository roadmapRepository;
    private final RoadmapSubjectRepository roadmapSubjectRepository;
    private final QuestionRepository questionRepository;

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder,
                      SubjectRepository subjectRepository, ConceptRepository conceptRepository,
                      RoadmapRepository roadmapRepository,
                      RoadmapSubjectRepository roadmapSubjectRepository,
                      QuestionRepository questionRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.subjectRepository = subjectRepository;
        this.conceptRepository = conceptRepository;
        this.roadmapRepository = roadmapRepository;
        this.roadmapSubjectRepository = roadmapSubjectRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public void run(String... args) {
        seedAdmin();
        if (subjectRepository.count() == 0) {
            List<Subject> subjects = seedSubjects();
            seedConcepts(subjects);
            List<Roadmap> roadmaps = seedRoadmaps();
            seedRoadmapSubjects(subjects, roadmaps);
        }
        if (questionRepository.count() == 0) {
            seedQuestions();
        }
        if (subjectRepository.findAll().stream().noneMatch(s -> s.getTitle().equals("Python Fundamentals"))) {
            seedPythonFullStack();
        }
    }

    private void seedAdmin() {
        userRepository.findByEmail("admin@demo.com").ifPresentOrElse(
            u -> { if (!Boolean.TRUE.equals(u.getIsActive())) { u.setIsActive(true); userRepository.save(u); } },
            () -> {
                User admin = new User();
                admin.setFullName("Admin"); admin.setEmail("admin@demo.com");
                admin.setPassword(passwordEncoder.encode("Admin@123"));
                admin.setRole("ADMIN"); admin.setCollegeName("Platform");
                admin.setAvatarColor("#4F46E5"); admin.setIsActive(true);
                userRepository.save(admin);
            }
        );
    }

    private List<Subject> seedSubjects() {
        List<Subject> subs = List.of(
            sub("Java Fundamentals",       "Core Java every developer must master",              "☕","#F59E0B"),
            sub("Object Oriented Programming","OOP principles for clean, scalable code",         "🧩","#8B5CF6"),
            sub("Data Structures",         "Arrays, Lists, Maps, Sets in Java",                  "🗂️","#EC4899"),
            sub("Spring Boot Basics",      "Build REST APIs with Spring Boot",                   "🍃","#10B981"),
            sub("Spring Data JPA",         "Database access with JPA and Hibernate",             "🗄️","#3B82F6"),
            sub("Spring Security & JWT",   "Secure your APIs with JWT authentication",           "🔐","#EF4444"),
            sub("HTML & CSS",              "Structure and style web pages",                      "🎨","#F97316"),
            sub("JavaScript",              "Core JavaScript for web development",                "⚡","#EAB308"),
            sub("React Basics",            "Build UI components with React",                     "⚛️","#06B6D4"),
            sub("React Advanced",          "Hooks, Context, Performance optimization",           "🚀","#6366F1"),
            sub("Node.js & Express",       "Backend development with Node.js",                   "🟢","#22C55E"),
            sub("MongoDB",                 "NoSQL database for modern apps",                     "🍃","#16A34A"),
            sub("MySQL / PostgreSQL",      "Relational databases and SQL queries",               "🐘","#0EA5E9"),
            sub("Python Basics",           "Python fundamentals for all domains",                "🐍","#84CC16"),
            sub("Django / Flask",          "Python web frameworks",                              "🌐","#14B8A6"),
            sub("REST API Design",         "Design clean, consistent REST APIs",                 "🔗","#A855F7"),
            sub("Git & GitHub",            "Version control for every developer",                "🐙","#64748B"),
            sub("Docker Basics",           "Containerize your applications",                     "🐳","#0284C7")
        );
        return subjectRepository.saveAll(subs);
    }

    private Subject sub(String title, String desc, String icon, String color) {
        Subject s = new Subject();
        s.setTitle(title); s.setDescription(desc); s.setIcon(icon); s.setColor(color);
        s.setTotalConcepts(0);
        return s;
    }

    private void seedConcepts(List<Subject> subjects) {
        Subject java = subjects.get(0);   // Java Fundamentals
        Subject spring = subjects.get(3); // Spring Boot Basics

        List<Concept> javaConcepts = List.of(
            concept(java, "Variables and Data Types",
                "Variables store data. Java has 8 primitive types: int, long, double, float, char, boolean, byte, short. Reference types include String, arrays, and objects.",
                "Every program manipulates data. Understanding types prevents runtime errors, memory waste, and type mismatch bugs in production.",
                "int age = 25;\nString name = \"Alice\";\ndouble salary = 75000.50;\nboolean isActive = true;", 20, 1),
            concept(java, "Control Flow",
                "if/else, switch, for, while, do-while — structures that control what code runs and when.",
                "Without control flow your code runs top to bottom once. Control flow is what makes programs solve real problems.",
                "if (score >= 90) {\n    System.out.println(\"A Grade\");\n} else if (score >= 80) {\n    System.out.println(\"B Grade\");\n} else {\n    System.out.println(\"Try again\");\n}", 20, 2),
            concept(java, "Methods",
                "A named, reusable block of code. Takes parameters (inputs), performs a task, and optionally returns a value.",
                "Methods prevent code duplication. Good method design makes code readable and maintainable.",
                "public int add(int a, int b) {\n    return a + b;\n}\n\nint result = add(5, 3); // result = 8", 15, 3),
            concept(java, "Arrays",
                "A fixed-size container holding multiple values of the same type, accessed by index starting at 0.",
                "Arrays are the foundation of all data structures. Understanding them is required before learning ArrayList, HashMap, or any Java collection.",
                "int[] scores = {85, 92, 78, 95, 88};\nSystem.out.println(scores[0]); // 85\nSystem.out.println(scores.length); // 5", 20, 4),
            concept(java, "Exception Handling",
                "try/catch/finally blocks that handle runtime errors gracefully instead of crashing the program.",
                "Production code always encounters unexpected situations. Exception handling keeps your app running.",
                "try {\n    int result = 10 / 0;\n} catch (ArithmeticException e) {\n    System.out.println(\"Error: \" + e.getMessage());\n} finally {\n    System.out.println(\"Always runs\");\n}", 25, 5),
            concept(java, "String Methods",
                "String is immutable in Java. Key methods: length(), charAt(), substring(), contains(), equals(), toUpperCase(), split(), trim().",
                "Strings are everywhere — user input, API responses, database values. String manipulation is used in almost every Java program.",
                "String name = \"  Hello World  \";\nSystem.out.println(name.trim());           // \"Hello World\"\nSystem.out.println(name.toUpperCase());     // \"  HELLO WORLD  \"\nSystem.out.println(name.contains(\"World\")); // true", 20, 6)
        );

        List<Concept> springConcepts = List.of(
            concept(spring, "@SpringBootApplication",
                "The entry point annotation combining @Configuration, @EnableAutoConfiguration, and @ComponentScan.",
                "Without understanding this annotation, Spring feels like magic. Every Spring Boot app starts here.",
                "@SpringBootApplication\npublic class MyApp {\n    public static void main(String[] args) {\n        SpringApplication.run(MyApp.class, args);\n    }\n}", 15, 1),
            concept(spring, "REST Controllers",
                "@RestController marks a class to handle HTTP requests. @GetMapping, @PostMapping, @PutMapping, @DeleteMapping map URLs to methods.",
                "This is how your Spring app talks to the outside world — every API endpoint you build lives here.",
                "@RestController\n@RequestMapping(\"/api/students\")\npublic class StudentController {\n\n    @GetMapping\n    public List<Student> getAll() {\n        return studentService.findAll();\n    }\n}", 25, 2),
            concept(spring, "Dependency Injection",
                "Spring creates and manages objects (beans). Constructor injection injects dependencies automatically.",
                "DI is the heart of Spring. It makes code loosely coupled and testable.",
                "@Service\npublic class StudentService {\n    private final StudentRepository repo;\n\n    public StudentService(StudentRepository repo) {\n        this.repo = repo;\n    }\n}", 25, 3),
            concept(spring, "application.properties",
                "The configuration file for your Spring Boot app — database URL, port, JWT secret, email settings.",
                "Every real-world app has environment-specific config. Knowing how to configure Spring Boot is essential.",
                "server.port=8080\nspring.data.mongodb.uri=mongodb+srv://...\nspring.data.mongodb.database=mydb", 15, 4),
            concept(spring, "Request & Response DTOs",
                "DTOs (Data Transfer Objects) shape data coming in (Request) and going out (Response) — separate from domain models.",
                "Never expose your database documents directly in APIs. DTOs give control over what data clients send and receive.",
                "public class LoginRequest {\n    private String email;\n    private String password;\n}\n\npublic class AuthResponse {\n    private String token;\n    private String role;\n}", 20, 5),
            concept(spring, "Global Exception Handler",
                "@RestControllerAdvice catches exceptions thrown anywhere and returns clean JSON error responses.",
                "Without this, your API returns ugly 500 errors. With it, every error returns a proper JSON response.",
                "@RestControllerAdvice\npublic class GlobalExceptionHandler {\n\n    @ExceptionHandler(RuntimeException.class)\n    public ResponseEntity<?> handle(RuntimeException ex) {\n        return ResponseEntity.badRequest().body(Map.of(\"error\", ex.getMessage()));\n    }\n}", 20, 6)
        );

        conceptRepository.saveAll(javaConcepts);
        conceptRepository.saveAll(springConcepts);

        java.setTotalConcepts(6);
        spring.setTotalConcepts(6);
        subjectRepository.saveAll(List.of(java, spring));
    }

    private Concept concept(Subject subject, String title, String whatItIs, String whyItMatters,
                             String codeExample, int minutes, int order) {
        Concept c = new Concept();
        c.setSubjectId(subject.getId());
        c.setSubjectTitle(subject.getTitle());
        c.setSubjectIcon(subject.getIcon());
        c.setTitle(title); c.setWhatItIs(whatItIs);
        c.setWhyItMatters(whyItMatters); c.setCodeExample(codeExample);
        c.setEstimatedMinutes(minutes); c.setOrderIndex(order);
        return c;
    }

    private List<Roadmap> seedRoadmaps() {
        List<Roadmap> roadmaps = List.of(
            roadmap("Java Full Stack Developer",  "Master Java backend + React frontend to build complete web applications", "Java Full Stack",  "☕","#F59E0B", 24),
            roadmap("MERN Stack Developer",       "MongoDB, Express, React, Node.js — the most popular JS stack",           "MERN Stack",       "⚡","#10B981", 20),
            roadmap("Python Full Stack Developer","Python backend with Django/Flask + React frontend",                      "Python Full Stack","🐍","#84CC16", 22),
            roadmap("Frontend Developer",         "HTML, CSS, JavaScript, React — build beautiful user interfaces",         "Frontend Dev",     "🎨","#EC4899", 16),
            roadmap("Backend Developer (Java)",   "Deep dive into Java, Spring Boot, databases, APIs, and security",        "Backend Dev",      "🍃","#3B82F6", 20)
        );
        return roadmapRepository.saveAll(roadmaps);
    }

    private Roadmap roadmap(String title, String desc, String roleTarget, String icon, String color, int weeks) {
        Roadmap r = new Roadmap();
        r.setTitle(title); r.setDescription(desc); r.setRoleTarget(roleTarget);
        r.setIcon(icon); r.setColor(color); r.setEstimatedWeeks(weeks); r.setPublished(true);
        return r;
    }

    private void seedRoadmapSubjects(List<Subject> s, List<Roadmap> r) {
        // Subject indexes: 0=Java, 1=OOP, 2=DS, 3=SpringBoot, 4=JPA, 5=Security,
        //                  6=HTML, 7=JS, 8=React, 9=ReactAdv, 10=Node, 11=Mongo,
        //                  12=SQL, 13=Python, 14=Django, 15=REST, 16=Git, 17=Docker
        // Roadmap: 0=JavaFS, 1=MERN, 2=PythonFS, 3=Frontend, 4=BackendJava

        List<int[]> javaFS     = List.of(new int[]{16,1},new int[]{0,2},new int[]{1,3},new int[]{2,4},new int[]{12,5},new int[]{3,6},new int[]{4,7},new int[]{5,8},new int[]{6,9},new int[]{7,10},new int[]{8,11},new int[]{9,12});
        List<int[]> mern       = List.of(new int[]{16,1},new int[]{6,2},new int[]{7,3},new int[]{8,4},new int[]{9,5},new int[]{10,6},new int[]{11,7},new int[]{15,8});
        List<int[]> pythonFS   = List.of(new int[]{16,1},new int[]{13,2},new int[]{14,3},new int[]{6,4},new int[]{7,5},new int[]{8,6},new int[]{15,7});
        List<int[]> frontend   = List.of(new int[]{16,1},new int[]{6,2},new int[]{7,3},new int[]{8,4},new int[]{9,5});
        List<int[]> backendJava= List.of(new int[]{16,1},new int[]{0,2},new int[]{1,3},new int[]{2,4},new int[]{12,5},new int[]{3,6},new int[]{4,7},new int[]{5,8},new int[]{15,9});

        saveRoadmapSubjects(r.get(0), s, javaFS);
        saveRoadmapSubjects(r.get(1), s, mern);
        saveRoadmapSubjects(r.get(2), s, pythonFS);
        saveRoadmapSubjects(r.get(3), s, frontend);
        saveRoadmapSubjects(r.get(4), s, backendJava);
    }

    private void saveRoadmapSubjects(Roadmap roadmap, List<Subject> subjects, List<int[]> mappings) {
        for (int[] m : mappings) {
            Subject subject = subjects.get(m[0]);
            RoadmapSubject rs = new RoadmapSubject();
            rs.setRoadmapId(roadmap.getId());
            rs.setSubjectId(subject.getId());
            rs.setSubject(subject);
            rs.setOrderIndex(m[1]);
            roadmapSubjectRepository.save(rs);
        }
    }

    // ─── QUESTIONS ────────────────────────────────────────────────────────────

    private void seedQuestions() {
        List<Subject> subjects = subjectRepository.findAll();
        if (subjects.isEmpty()) return;
        Subject java = subjects.stream().filter(s -> s.getTitle().equals("Java Fundamentals")).findFirst().orElse(null);
        Subject spring = subjects.stream().filter(s -> s.getTitle().equals("Spring Boot Basics")).findFirst().orElse(null);
        if (java == null || spring == null) return;

        List<Concept> javaConcepts = conceptRepository.findBySubjectIdOrderByOrderIndex(java.getId());
        List<Concept> springConcepts = conceptRepository.findBySubjectIdOrderByOrderIndex(spring.getId());

        if (javaConcepts.size() >= 6) {
            seedConceptQs(javaConcepts.get(0), variablesQs());
            seedConceptQs(javaConcepts.get(1), controlFlowQs());
            seedConceptQs(javaConcepts.get(2), methodsQs());
            seedConceptQs(javaConcepts.get(3), arraysQs());
            seedConceptQs(javaConcepts.get(4), exceptionsQs());
            seedConceptQs(javaConcepts.get(5), stringQs());
        }
        if (springConcepts.size() >= 6) {
            seedConceptQs(springConcepts.get(0), springAppQs());
            seedConceptQs(springConcepts.get(1), restControllerQs());
            seedConceptQs(springConcepts.get(2), diQs());
            seedConceptQs(springConcepts.get(3), propertiesQs());
            seedConceptQs(springConcepts.get(4), dtoQs());
            seedConceptQs(springConcepts.get(5), exceptionHandlerQs());
        }
    }

    private void seedConceptQs(Concept c, Object[][] data) {
        for (Object[] d : data) {
            Question q = new Question();
            q.setConceptId(c.getId());
            q.setSubjectId(c.getSubjectId());
            q.setText((String) d[0]);
            q.setOptions(List.of((String) d[1], (String) d[2], (String) d[3], (String) d[4]));
            q.setCorrectIndex((int) d[5]);
            q.setExplanation((String) d[6]);
            q.setDifficulty((String) d[7]);
            questionRepository.save(q);
        }
    }

    private Object[][] variablesQs() {
        return new Object[][]{
            {"What is the default value of an int field in Java?","0","null","undefined","-1",0,"Primitive int fields default to 0","EASY"},
            {"Which of these is NOT a primitive data type?","int","double","String","char",2,"String is a class/reference type, not a primitive","EASY"},
            {"What is the size of a byte in Java?","4 bits","8 bits","16 bits","32 bits",1,"byte is 8 bits with range -128 to 127","EASY"},
            {"What keyword makes a variable constant?","static","const","final","immutable",2,"final prevents reassignment after initialization","EASY"},
            {"What is the result of 9 / 2 in Java?","4","4.5","5","2",0,"Integer division truncates the decimal: 9/2 = 4","MEDIUM"},
            {"Which is the largest integer primitive type?","int","long","byte","short",1,"long is 64-bit, storing up to ~9.2 quintillion","EASY"},
            {"String is ___ in Java","mutable","a primitive type","immutable","a keyword",2,"String objects cannot be changed once created","EASY"},
            {"What is autoboxing?","Primitive to wrapper class conversion","String to int conversion","Casting double to float","Encrypting data",0,"Autoboxing auto-converts int→Integer, double→Double, etc.","MEDIUM"},
            {"Which type stores a single Unicode character?","String","char","text","Character",1,"char is the 16-bit primitive for a single character","EASY"},
            {"What is the default value of a boolean field?","true","false","0","null",1,"boolean fields default to false in Java","EASY"}
        };
    }

    private Object[][] controlFlowQs() {
        return new Object[][]{
            {"What does 'break' do inside a loop?","Skips current iteration","Exits the loop immediately","Pauses execution","Throws an error",1,"break exits the nearest enclosing loop or switch","EASY"},
            {"What does 'continue' do in a loop?","Exits the loop","Skips current iteration, goes to next","Terminates the program","Restarts from beginning",1,"continue skips the remaining body and moves to the next iteration","EASY"},
            {"Which loop always executes its body at least once?","for","while","do-while","enhanced-for",2,"do-while checks the condition after executing the body","EASY"},
            {"What is the ternary operator syntax?","if ? else :","condition ? trueVal : falseVal","condition : trueVal ? falseVal","(cond) then else",1,"Ternary: condition ? valueIfTrue : valueIfFalse","EASY"},
            {"Can a switch statement handle String values?","No, integers only","Yes, since Java 7","Only in Java 11+","Only with enums",1,"Java 7 added String support for switch","MEDIUM"},
            {"How many times does for(int i=0;i<3;i++) execute?","2","3","4","1",1,"i iterates 0, 1, 2 — three iterations total","EASY"},
            {"What is an enhanced for loop used for?","Counting from 1","Iterating arrays and Iterable collections","Only for ArrayList","Creating nested loops",1,"for(Type item : collection) works on any Iterable","EASY"},
            {"What happens in a switch case without 'break'?","Compilation error","Fall-through to next case","Loop repeats","Returns null",1,"Without break, execution continues into the next case","MEDIUM"},
            {"Which creates an infinite loop?","while(true)","for(;;)","while(1==1)","All of the above",3,"All three patterns create valid infinite loops","EASY"},
            {"What does 'return' do in a void method?","Returns 0","Prints a result","Exits the method early","Throws an exception",2,"return in void exits the method without returning a value","EASY"}
        };
    }

    private Object[][] methodsQs() {
        return new Object[][]{
            {"What is method overloading?","Same name, different parameters","Same parameters, different name","Inheriting a method","Calling super method",0,"Overloading = same method name with different parameter lists","EASY"},
            {"What does a void return type indicate?","Returns null","Returns nothing","Returns 0","Compile error",1,"void means the method completes without returning a value","EASY"},
            {"In Java, primitives passed to methods are passed by?","Reference","Value (a copy)","Pointer","Address",1,"Java always passes primitive values as copies","MEDIUM"},
            {"How is a static method called?","new Object().method()","ClassName.method()","Only from main()","Only from constructors",1,"Static methods belong to the class, not an instance","EASY"},
            {"What is a recursive method?","Calls another class's method","Calls itself","Has no return type","Is always static",1,"Recursion means a method calls itself directly or indirectly","EASY"},
            {"Method signature consists of?","Name only","Return type + name","Name + parameter types","All metadata",2,"Signature = method name + parameter types (not return type)","MEDIUM"},
            {"Which access modifier allows access from any class?","private","protected","public","default",2,"public members are accessible from any class in any package","EASY"},
            {"What does @Override annotation ensure?","Creates a new method","You're actually overriding a parent method","Makes the method static","Optional documentation",1,"@Override causes a compile error if no parent method is found","EASY"},
            {"Can a Java method return multiple values directly?","Yes natively","No, not natively — use array/object","Yes with generics","Yes with var",1,"Java methods return one value; use wrapper object for multiple","MEDIUM"},
            {"What are method parameters for?","Returning values","Accepting input data when the method is called","Declaring class variables","Making methods static",1,"Parameters receive data from the caller","EASY"}
        };
    }

    private Object[][] arraysQs() {
        return new Object[][]{
            {"How do you declare an int array of size 5?","int arr = new int[5]","int[] arr = new int[5]","Array<int> arr = 5","int arr[5]",1,"int[] arr = new int[5] is the correct Java array declaration","EASY"},
            {"What is the first valid index of an array?","1","0","-1","Depends on type",1,"Arrays are zero-indexed — first element is at index 0","EASY"},
            {"What exception is thrown for an invalid array index?","NullPointerException","ArrayIndexOutOfBoundsException","IllegalArgumentException","IndexException",1,"Accessing arr[-1] or arr[arr.length] throws AIOOBE","EASY"},
            {"What does arr.length return?","Sum of elements","Number of elements","Last element","Memory size in bytes",1,"length is a field (not method) that gives the array size","EASY"},
            {"What is the default value of elements in int[]?","null","0","undefined","-1",1,"int array elements are initialized to 0","EASY"},
            {"How do you correctly copy an array?","arr2 = arr1 (reference copy)","System.arraycopy() or Arrays.copyOf()","Use clone keyword alone","Loop only",1,"System.arraycopy and Arrays.copyOf create actual element copies","MEDIUM"},
            {"Which is a valid 2D array declaration?","int[2][3] arr","int[][] arr","int arr[2][3]","B and C are both valid",3,"Both int[][] arr and int arr[][] compile correctly","MEDIUM"},
            {"What does Arrays.sort() do?","Sorts descending","Sorts ascending in-place","Returns a sorted copy","Randomizes",1,"Arrays.sort() modifies the array in-place, ascending order","EASY"},
            {"Why are arrays generally faster than ArrayList for fixed data?","More built-in features","No boxing overhead, contiguous memory","Easier to use","Can hold any type",1,"Arrays avoid autoboxing and are cache-friendly","HARD"},
            {"How do you get the number of elements in String[]?","arr.size()","arr.length","arr.length()","arr.count()",1,"Arrays use .length field — unlike String which uses .length()","EASY"}
        };
    }

    private Object[][] exceptionsQs() {
        return new Object[][]{
            {"What is a checked exception?","Caught at runtime only","Must be declared or caught (compiler-enforced)","Optional to handle","Same as Error",1,"Checked exceptions must be handled at compile time","EASY"},
            {"RuntimeException is classified as?","Checked","Unchecked","Error","None of these",1,"RuntimeException and subclasses are unchecked — not compiler-enforced","EASY"},
            {"What does the 'finally' block always do?","Runs only on error","Runs only if no exception","Always runs after try/catch","Runs only if exception is caught",2,"finally runs whether or not an exception occurred","EASY"},
            {"How do you create a custom exception?","Implement Exception interface","Extend Exception or RuntimeException","Use @Exception annotation","new Exception class",1,"Extending RuntimeException makes it unchecked; Exception makes it checked","MEDIUM"},
            {"The 'throw' keyword is used to?","Declare possible exceptions","Actually throw an exception object","Catch exceptions","Mark a method as risky",1,"throw new MyException() explicitly throws the exception","EASY"},
            {"'throws' in a method signature declares?","The method will always throw","Possible checked exceptions callers must handle","It catches exceptions","Same as throw",1,"throws is a declaration, not an actual throw","EASY"},
            {"NullPointerException is?","Checked","Unchecked","An Error","A compile-time error",1,"NPE extends RuntimeException — no try-catch required","EASY"},
            {"Can one catch block handle multiple exception types?","No","Yes, using | between types","Only in Java 11+","Yes with comma",1,"catch(IOException | SQLException e) handles both types","MEDIUM"},
            {"try-with-resources automatically does what?","Catches all exceptions","Closes AutoCloseable resources","Retries on failure","Logs exceptions",1,"Resources in the try(...) clause are closed automatically","MEDIUM"},
            {"What is the root of Java's exception hierarchy?","Exception","RuntimeException","Error","Throwable",3,"Both Exception and Error extend Throwable","MEDIUM"}
        };
    }

    private Object[][] stringQs() {
        return new Object[][]{
            {"How do you get the length of a String?","str.size()","str.length","str.length()","str.count()",2,"String.length() is a method (unlike array.length which is a field)","EASY"},
            {"How do you correctly compare String values?","==","equals()","compare()","===",1,"== compares references; equals() compares character content","EASY"},
            {"What does 'Hello'.substring(1, 4) return?","Hell","ell","ello","Hello",1,"substring(start, end): start inclusive, end exclusive","MEDIUM"},
            {"How do you convert an int to a String?","int.toString(n)","String.valueOf(n)","(String)n","parse(n)",1,"String.valueOf() handles all primitive types cleanly","EASY"},
            {"What does contains() return?","Index of the substring","Boolean (true/false)","The found substring","Character count",1,"contains() returns true if the sequence is found","EASY"},
            {"What does trim() remove?","All whitespace","Leading and trailing whitespace only","Middle whitespace","Fixes string length",1,"trim() only removes whitespace at both ends","EASY"},
            {"What does 'a,b,c'.split(',') produce?","['a,b,c']","['a','b','c']","'abc'","['a','b,c']",1,"split() divides by the delimiter pattern","EASY"},
            {"How to check if a String starts with a prefix?","beginsWith()","startsWith()","hasPrefix()","contains()",1,"startsWith() checks the beginning of the string","EASY"},
            {"String concatenation with + creates?","Modified original","A new String object","null","An error",1,"Strings are immutable — + always creates a new String","MEDIUM"},
            {"What does toUpperCase() return?","Modified original","New String with all uppercase","New String with all lowercase","null",1,"toUpperCase() returns a new uppercase String","EASY"}
        };
    }

    private Object[][] springAppQs() {
        return new Object[][]{
            {"@SpringBootApplication combines which three annotations?","@Component+@Service+@Repository","@Configuration+@EnableAutoConfiguration+@ComponentScan","@Controller+@Service+@Config","@Bean+@Autowired+@Component",1,"It's a meta-annotation combining all three","EASY"},
            {"What does @EnableAutoConfiguration do?","Enables all REST endpoints","Auto-configures beans based on classpath","Enables Spring Security","Starts Tomcat",1,"Scans classpath JARs and sets up beans automatically","EASY"},
            {"Where should the main class be placed?","Any package","Root package of the project","src folder","test package",1,"Root package ensures @ComponentScan covers all subpackages","MEDIUM"},
            {"What does SpringApplication.run() do?","Runs DB migrations","Starts Spring context and embedded server","Builds the JAR","Runs unit tests",1,"run() bootstraps the entire Spring application","EASY"},
            {"What is @ComponentScan responsible for?","Scanning the database","Finding @Component-annotated classes","Scanning CSS files","Running tests",1,"Discovers Spring beans in the specified packages","EASY"},
            {"Auto-configuration is triggered by?","XML configuration","Classpath dependencies (JAR presence)","Database connection","Annotation count",1,"Presence of JARs triggers relevant auto-configurations","MEDIUM"},
            {"What is the default embedded server?","JBoss","Apache Tomcat","Jetty","WebLogic",1,"Spring Boot includes Tomcat by default; can switch to Jetty/Undertow","EASY"},
            {"@SpringBootApplication is placed on?","An interface","A method","A class","A field",2,"It annotates the main entry-point class","EASY"},
            {"Spring Boot's opinionated defaults mean?","You must use them","Sensible defaults you can override","Defaults that cannot be changed","Only for production",1,"Convention over configuration — override when needed","MEDIUM"},
            {"What is the embedded server benefit?","No Java needed","No external server installation needed","Faster queries","Smaller JAR",1,"Embedded server means no Tomcat/JBoss setup required","EASY"}
        };
    }

    private Object[][] restControllerQs() {
        return new Object[][]{
            {"@RestController equals?","@Controller + @Component","@Controller + @ResponseBody","@Service + @Controller","@Component + @RequestMapping",1,"@RestController = @Controller + @ResponseBody","EASY"},
            {"@GetMapping handles which HTTP method?","POST","GET","DELETE","PUT",1,"@GetMapping maps HTTP GET requests to a method","EASY"},
            {"@PathVariable extracts from?","Request body","URL path segment /{id}","Query string ?key=val","Request header",1,"@PathVariable binds a method parameter to a URI template variable","EASY"},
            {"@RequestParam extracts from?","URL path","Query string (?key=value)","Request body JSON","Session",1,"@RequestParam reads ?key=value from the request URL","EASY"},
            {"@RequestBody does what?","Reads query params","Deserializes JSON body to Java object","Sends the response","Reads headers",1,"Jackson converts JSON request body to the annotated Java object","EASY"},
            {"HTTP 201 means?","OK","Created","No Content","Bad Request",1,"201 Created is the standard response for a successful POST that creates a resource","EASY"},
            {"CORS stands for?","Common Object Resource Sharing","Cross-Origin Resource Sharing","Client Object Response System","Cross-Object REST Service",1,"CORS controls cross-origin API access from browsers","MEDIUM"},
            {"@RequestMapping on a class sets?","HTTP method for all","Base URL prefix for all methods in class","Response content type","Authentication",1,"Class-level @RequestMapping sets the URL prefix","EASY"},
            {"ResponseEntity allows you to?","Return strings only","Customize status, headers, and body","Set only status code","Return JSON only",1,"ResponseEntity gives full control over the HTTP response","EASY"},
            {"HTTP 401 means?","Bad Request","Unauthorized (auth required)","Forbidden","Not Found",1,"401 Unauthorized means authentication is missing or invalid","EASY"}
        };
    }

    private Object[][] diQs() {
        return new Object[][]{
            {"IoC (Inversion of Control) means?","You control all objects","Framework manages object creation and lifecycle","Input/Output Control","No dependencies needed",1,"IoC inverts responsibility — Spring creates/wires objects for you","EASY"},
            {"Which injection type is recommended?","Field injection","Setter injection","Constructor injection","No preference",2,"Constructor injection makes dependencies explicit and final","MEDIUM"},
            {"@Service marks a class as?","A REST controller","A service-layer business logic bean","A database repo","A configuration class",1,"@Service is a specialization of @Component for service layer","EASY"},
            {"@Repository is used for?","Controllers","Service layer","Data access layer","Configuration",2,"@Repository marks data access classes and translates persistence exceptions","EASY"},
            {"Spring beans are by default?","Prototype","Request-scoped","Session-scoped","Singleton",3,"One instance per application context — the singleton scope","MEDIUM"},
            {"@Component is?","Web-layer only","Generic Spring-managed bean marker","Database-specific","Service-specific",1,"@Component is the base stereotype for all Spring beans","EASY"},
            {"When multiple beans of same type exist, use?","@Primary or @Qualifier","@Override","@First","@Single",0,"@Primary = default choice; @Qualifier = specific selection","MEDIUM"},
            {"@Autowired on single-constructor class is?","Required","Optional in Spring Boot","Forbidden","Only for interfaces",1,"Spring Boot auto-wires single constructors without @Autowired","MEDIUM"},
            {"@Bean annotation goes on?","Classes","Methods that produce Spring beans","Fields","Interfaces",1,"@Bean annotates factory methods in @Configuration classes","EASY"},
            {"Main benefit of Dependency Injection?","Faster execution","Loose coupling and testability","Less code","More annotations",1,"DI makes classes independent and easy to swap/test","EASY"}
        };
    }

    private Object[][] propertiesQs() {
        return new Object[][]{
            {"How do you set server port to 9090?","server.http=9090","server.port=9090","port=9090","spring.port=9090",1,"server.port configures the embedded server listen port","EASY"},
            {"spring.data.mongodb.uri configures?","PostgreSQL","MySQL","MongoDB connection","Redis",2,"This Spring property sets the MongoDB connection string","EASY"},
            {"How do you inject a property value into a field?","@Value(\"${prop.name}\")","Properties.get('name')","@Config('name')","@ReadProp",0,"@Value with ${} SpEL expression injects property values","EASY"},
            {"Where is application.properties located?","src/main/java","src/main/resources","Root folder","src/test",1,"Properties files must be in src/main/resources","EASY"},
            {"How to set the active profile?","spring.active=dev","spring.profiles.active=dev","profile=dev","spring.profile=dev",1,"spring.profiles.active controls which profile config is loaded","EASY"},
            {"application.yml vs application.properties are?","YAML is faster","Equivalent — Spring reads both","Properties is deprecated","YAML is required for new projects",1,"Both formats are fully supported by Spring Boot","EASY"},
            {"logging.level.root=DEBUG does what?","Enables error logging only","Sets DEBUG log level for all packages","Disables logging","Logs to file only",1,"Sets the root log level — includes all severity levels","EASY"},
            {"spring.application.name is used for?","URL base path","App identifier for logs and service registry","Database name","Port setting",1,"Used in Actuator, distributed tracing, and service discovery","MEDIUM"},
            {"Environment-specific config uses which filename?","application-{profile}.properties","application.{profile}.props","{profile}.properties","spring-{profile}.properties",0,"application-dev.properties loads when dev profile is active","MEDIUM"},
            {"How to disable a specific auto-configuration?","Remove the JAR","spring.autoconfigure.exclude=ClassName","@DisableAutoConfig","Not possible",1,"spring.autoconfigure.exclude disables unwanted auto-configs","HARD"}
        };
    }

    private Object[][] dtoQs() {
        return new Object[][]{
            {"DTO stands for?","Data Test Object","Data Transfer Object","Direct Transfer Output","Dynamic Type Object",1,"DTOs carry data between layers without business logic","EASY"},
            {"Why use DTOs instead of exposing entities?","Required by Java","Control what data is exposed and received","Faster performance","For testing only",1,"DTOs decouple the API contract from the database schema","EASY"},
            {"@JsonIgnore does what?","Ignores null values","Excludes field from JSON output","Makes field required","Marks as deprecated",1,"Fields annotated with @JsonIgnore are not serialized to JSON","EASY"},
            {"@Data in Lombok generates?","@Getter only","@Setter only","@Getter+@Setter+@ToString+@EqualsAndHashCode+@RequiredArgsConstructor","@Builder only",2,"@Data is a shortcut for multiple Lombok annotations combined","MEDIUM"},
            {"Jackson's ObjectMapper handles?","Only Java to JSON","Only JSON to Java","Both JSON↔Java","Only XML",2,"ObjectMapper performs both serialization and deserialization","EASY"},
            {"A Request DTO is used for?","Database storage","Incoming request body data validation","Response formatting","Configuration",1,"Request DTOs model and validate incoming API data","EASY"},
            {"Java records (Java 16+) are ideal for?","Loops","Immutable data carriers like DTOs","Abstract classes","Enums",1,"Records provide concise immutable data classes with auto-generated methods","MEDIUM"},
            {"@AllArgsConstructor generates?","No-arg constructor","Constructor with all fields","Getter/setter","Builder",1,"@AllArgsConstructor creates a constructor accepting every field","EASY"},
            {"Why validate in Request DTOs?","Faster DB queries","Reject invalid data at the API boundary","Required by Lombok","For logging",1,"Early validation prevents bad data from reaching business logic","MEDIUM"},
            {"@NoArgsConstructor generates?","All-fields constructor","No-argument constructor","Static factory","Getters",1,"No-arg constructor is required by Jackson for deserialization","EASY"}
        };
    }

    private Object[][] exceptionHandlerQs() {
        return new Object[][]{
            {"@RestControllerAdvice is used for?","Routing","Global exception handling across all controllers","Authentication","Bean configuration",1,"Intercepts exceptions from any @Controller and formats the response","EASY"},
            {"@ExceptionHandler(MyException.class) handles?","All exceptions","Only that specific exception type","Only RuntimeExceptions","Only checked exceptions",1,"It's type-specific — one handler per exception type","EASY"},
            {"HTTP 404 means?","Bad Request","Unauthorized","Not Found","Internal Server Error",2,"404 Not Found — the requested resource does not exist","EASY"},
            {"HTTP 400 means?","Not Found","Bad Request (invalid input)","Unauthorized","Server Error",1,"400 Bad Request — the client sent invalid or malformed data","EASY"},
            {"Unhandled exceptions without a global handler return?","200 OK","400 Bad Request","404 Not Found","500 Internal Server Error",3,"Spring returns 500 for any unhandled exception by default","EASY"},
            {"@RestControllerAdvice vs @ControllerAdvice?","No difference","@RestControllerAdvice adds @ResponseBody automatically","@ControllerAdvice is newer","Both are identical in Spring Boot",1,"@RestControllerAdvice = @ControllerAdvice + @ResponseBody","MEDIUM"},
            {"Best error response format?","Empty body","Plain text message","JSON with error field","HTML page",2,"Consistent JSON format makes APIs predictable for clients","EASY"},
            {"One handler for multiple exception types?","Not possible","Yes: @ExceptionHandler({A.class, B.class})","Only in Java 11+","Only with @MultiException",1,"Pass an array of classes to @ExceptionHandler","MEDIUM"},
            {"ResponseEntity.ok() sets status code?","201","200","204","400",1,"ResponseEntity.ok() creates a 200 OK response","EASY"},
            {"Custom app exceptions typically extend?","Throwable","Error","RuntimeException","Object",2,"RuntimeException → unchecked, no try-catch required for callers","EASY"}
        };
    }

    // ═══════════════════════════════════════════════════════════
    // PYTHON FULL STACK ROADMAP
    // ═══════════════════════════════════════════════════════════

    private void seedPythonFullStack() {
        Roadmap pyRoadmap = new Roadmap();
        pyRoadmap.setTitle("Python Full Stack Developer");
        pyRoadmap.setDescription("Master Python, Django, React and deployment to build complete web applications from scratch");
        pyRoadmap.setRoleTarget("Python Full Stack");
        pyRoadmap.setIcon("🐍");
        pyRoadmap.setColor("#84CC16");
        pyRoadmap.setEstimatedWeeks(28);
        pyRoadmap.setPublished(true);
        pyRoadmap = roadmapRepository.save(pyRoadmap);

        Subject pyFundamentals = subjectRepository.save(pySub("Python Fundamentals",       "Core Python concepts — the foundation of everything you will build",                              "🐍","#84CC16",10));
        Subject pyOop          = subjectRepository.save(pySub("OOP in Python",              "Object Oriented Programming principles that make your Python code scalable and maintainable",    "🧩","#8B5CF6", 8));
        Subject pyAdvanced     = subjectRepository.save(pySub("Advanced Python",            "Powerful Python features that separate beginners from professional developers",                  "⚡","#F59E0B", 8));
        Subject pyHtmlCss      = subjectRepository.save(pySub("HTML & CSS",                 "Build and style web pages — the visual layer of every web application",                         "🎨","#F97316", 8));
        Subject pyJs           = subjectRepository.save(pySub("JavaScript Basics",          "Client-side scripting to make web pages interactive and dynamic",                               "⚡","#EAB308", 7));
        Subject pyGit          = subjectRepository.save(pySub("Git & GitHub",               "Version control system every developer must know before writing a single line of project code", "🐙","#64748B", 7));
        Subject pySql          = subjectRepository.save(pySub("SQL & PostgreSQL",           "Relational database skills used in every Django production application",                         "🐘","#0EA5E9", 7));
        Subject pyDjango       = subjectRepository.save(pySub("Django Framework",           "Python's most powerful web framework — build full web apps with batteries included",            "🌿","#10B981",10));
        Subject pyDrf          = subjectRepository.save(pySub("Django REST Framework",      "Build professional REST APIs with Django — the backend for your React frontend",                "🔗","#059669", 8));
        Subject pyReact        = subjectRepository.save(pySub("React Basics",               "Build modern, reactive user interfaces with the most popular frontend library",                  "⚛️","#06B6D4", 8));
        Subject pyIntegration  = subjectRepository.save(pySub("React + Django Integration", "Connect your React frontend to your Django API — build a complete full stack application",       "🔄","#8B5CF6", 6));
        Subject pyDeploy       = subjectRepository.save(pySub("Deployment",                 "Take your application live — host frontend, backend, and database on real servers",             "🚀","#EF4444", 6));

        int ord = 1;
        for (Subject s : List.of(pyFundamentals, pyOop, pyAdvanced, pyHtmlCss, pyJs, pyGit, pySql, pyDjango, pyDrf, pyReact, pyIntegration, pyDeploy)) {
            RoadmapSubject rs = new RoadmapSubject();
            rs.setRoadmapId(pyRoadmap.getId());
            rs.setSubjectId(s.getId());
            rs.setSubject(s);
            rs.setOrderIndex(ord++);
            roadmapSubjectRepository.save(rs);
        }

        conceptRepository.saveAll(List.of(
            concept(pyFundamentals, "Variables and Data Types",
                "Python has dynamic typing — you don't declare types. Key types: int, float, str, bool, NoneType. Use type() to check. Variables are just labels pointing to objects in memory.",
                "Every Python program stores and processes data. Understanding types prevents TypeErrors that crash production code. Dynamic typing is Python's power — and its main source of bugs if misunderstood.",
                "age = 25\nname = 'Alice'\nsalary = 75000.50\nis_active = True\nnull_value = None\n\nprint(type(age))      # <class 'int'>\nprint(type(name))     # <class 'str'>\nprint(type(is_active))# <class 'bool'>",
                20, 1),
            concept(pyFundamentals, "Control Flow",
                "if/elif/else for decisions. for loops iterate over sequences. while loops run until condition is False. break exits a loop. continue skips to next iteration. pass is a no-op placeholder.",
                "Without control flow your code runs top-to-bottom once and stops. Control flow is what makes programs actually solve problems — every real application is built on decisions and repetition.",
                "score = 85\n\nif score >= 90:\n    print('A Grade')\nelif score >= 80:\n    print('B Grade')\nelse:\n    print('Try harder')\n\n# Loop\nfor i in range(5):\n    if i == 3:\n        break\n    print(i)  # 0, 1, 2",
                20, 2),
            concept(pyFundamentals, "Functions",
                "def keyword defines a function. Parameters are inputs. return sends output back. Default parameters, *args (multiple positional), **kwargs (keyword arguments). Functions are first-class objects in Python.",
                "Functions prevent duplication. Every time you write the same code twice, it should be a function. Clean functions with single responsibilities are what professional Python code looks like.",
                "def greet(name, greeting='Hello'):\n    return f'{greeting}, {name}!'\n\nprint(greet('Alice'))          # Hello, Alice!\nprint(greet('Bob', 'Hi'))      # Hi, Bob!\n\ndef add_all(*args):\n    return sum(args)\n\nprint(add_all(1, 2, 3, 4))    # 10",
                20, 3),
            concept(pyFundamentals, "Lists and Tuples",
                "List: ordered, mutable, allows duplicates. [1, 2, 3]. Tuple: ordered, immutable. (1, 2, 3). Key list methods: append(), extend(), insert(), remove(), pop(), sort(), reverse(), index(), count().",
                "Lists are Python's most-used data structure. Almost every Django queryset, API response, and data processing operation returns or uses a list. Mastering list methods is non-negotiable.",
                "fruits = ['apple', 'banana', 'cherry']\nfruits.append('date')         # add to end\nfruits.insert(1, 'avocado')   # insert at index\nfruits.remove('banana')       # remove by value\n\nprint(fruits[0])              # apple\nprint(fruits[-1])             # date\nprint(fruits[1:3])            # slice",
                20, 4),
            concept(pyFundamentals, "Dictionaries",
                "Key-value pairs. Keys must be unique and immutable. Values can be anything. Methods: keys(), values(), items(), get(), update(), pop(). Dictionary comprehensions. Nested dicts for JSON-like data.",
                "Dictionaries are how Python represents JSON data — every API response you receive or send is a dictionary. Django models use dicts. Understanding dicts is understanding how data flows in web apps.",
                "student = {\n    'name': 'Alice',\n    'age': 22,\n    'grades': [85, 92, 78]\n}\n\nprint(student['name'])        # Alice\nprint(student.get('phone', 'N/A'))  # N/A (safe)\n\nstudent['email'] = 'alice@mail.com'\nstudent.update({'age': 23, 'city': 'Delhi'})\n\nfor key, value in student.items():\n    print(f'{key}: {value}')",
                20, 5),
            concept(pyFundamentals, "String Methods",
                "Strings are immutable sequences. Key methods: strip(), split(), join(), replace(), upper(), lower(), startswith(), endswith(), format(), f-strings. String slicing. in operator for membership.",
                "String manipulation appears in every real application — processing user input, parsing API data, formatting output. f-strings are modern Python's most readable way to build strings.",
                "text = '  Hello, World!  '\n\nprint(text.strip())           # 'Hello, World!'\nprint(text.lower())           # '  hello, world!  '\nprint(text.replace('World', 'Python'))\n\n# f-string (best practice)\nname = 'Alice'\nage = 22\nprint(f'Name: {name}, Age: {age}')\n\n# Split and join\nwords = 'python is great'.split()\nprint(' | '.join(words))      # python | is | great",
                20, 6),
            concept(pyFundamentals, "Exception Handling",
                "try/except/else/finally blocks. Catch specific exceptions (ValueError, TypeError, FileNotFoundError). raise to throw exceptions. Custom exception classes. The bare except is bad practice.",
                "Production code always encounters unexpected situations. Exception handling is what separates code that crashes from code that recovers gracefully. Every Django view needs proper error handling.",
                "try:\n    number = int(input('Enter a number: '))\n    result = 100 / number\nexcept ValueError:\n    print('Not a valid number')\nexcept ZeroDivisionError:\n    print('Cannot divide by zero')\nelse:\n    print(f'Result: {result}')   # runs if no exception\nfinally:\n    print('This always runs')    # cleanup code",
                20, 7),
            concept(pyFundamentals, "File Handling",
                "open() with modes: 'r' (read), 'w' (write), 'a' (append), 'rb'/'wb' (binary). Always use with statement (context manager) to auto-close files. Reading: read(), readline(), readlines(). JSON files with json module.",
                "Reading config files, processing CSVs, writing logs, handling uploads — file I/O is everywhere in backend development. The with statement is best practice because it guarantees file closure.",
                "# Reading a file\nwith open('data.txt', 'r') as f:\n    content = f.read()\n    print(content)\n\n# Writing a file\nwith open('output.txt', 'w') as f:\n    f.write('Hello from Python!\\n')\n\n# Working with JSON\nimport json\ndata = {'name': 'Alice', 'age': 22}\n\nwith open('data.json', 'w') as f:\n    json.dump(data, f, indent=2)\n\nwith open('data.json', 'r') as f:\n    loaded = json.load(f)\n    print(loaded['name'])  # Alice",
                20, 8),
            concept(pyFundamentals, "List Comprehensions",
                "Compact syntax to create lists: [expression for item in iterable if condition]. More readable and faster than equivalent for loops. Dict and set comprehensions follow the same pattern.",
                "Comprehensions are one of Python's most loved features. They appear constantly in Django querysets, data processing, and API response building. Code that uses comprehensions reads as Python — code that doesn't reads like Java.",
                "# Instead of this\nsquares = []\nfor x in range(10):\n    squares.append(x**2)\n\n# Write this\nsquares = [x**2 for x in range(10)]\nprint(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]\n\n# With condition\nevens = [x for x in range(20) if x % 2 == 0]\n\n# Dict comprehension\nstudents = ['Alice', 'Bob', 'Charlie']\ngrades = {name: 0 for name in students}",
                15, 9),
            concept(pyFundamentals, "Modules and Packages",
                "import module_name. from module import specific_function. Python Standard Library: os, sys, datetime, math, random, re, json, collections. pip installs third-party packages. virtual environments isolate dependencies.",
                "Every serious Python project uses external packages — Django, requests, pandas, etc. Understanding how imports work and how pip manages packages is essential before starting any framework.",
                "# Standard library\nimport os\nimport datetime\n\nprint(os.getcwd())            # current directory\nprint(datetime.date.today())  # today's date\n\n# Specific import\nfrom math import sqrt, pi\nprint(sqrt(16))   # 4.0\nprint(pi)         # 3.14159...\n\n# Virtual environment (terminal)\n# python -m venv venv\n# venv\\\\Scripts\\\\activate  (Windows)\n# source venv/bin/activate  (Mac/Linux)\n# pip install django",
                15, 10)
        ));

        conceptRepository.saveAll(List.of(
            concept(pyDjango, "Django Project Structure (MVT)",
                "Django follows MVT — Model (data), View (logic), Template (presentation). manage.py is the CLI tool. settings.py configures everything. urls.py routes requests. apps are modular components. INSTALLED_APPS registers them.",
                "Understanding the project structure is the first thing every Django developer must do. Without this, the framework feels like magic. With it, you can navigate any Django codebase in minutes.",
                "# Create project\ndjango-admin startproject mysite\ncd mysite\npython manage.py startapp students\n\n# Project structure\nmysite/\n├── manage.py\n├── mysite/\n│   ├── settings.py\n│   ├── urls.py\n│   └── wsgi.py\n└── students/\n    ├── models.py\n    ├── views.py\n    ├── urls.py\n    └── templates/",
                20, 1),
            concept(pyDjango, "Models and ORM",
                "Models are Python classes that map to database tables. ORM (Object Relational Mapper) lets you query the database using Python instead of SQL. Field types: CharField, IntegerField, ForeignKey, DateTimeField, BooleanField.",
                "The Django ORM is one of the most productive database tools ever built. Writing Student.objects.filter(grade__gte=80) instead of SQL means faster development and fewer bugs.",
                "from django.db import models\n\nclass Student(models.Model):\n    name = models.CharField(max_length=100)\n    email = models.EmailField(unique=True)\n    grade = models.IntegerField(default=0)\n    enrolled_at = models.DateTimeField(auto_now_add=True)\n    is_active = models.BooleanField(default=True)\n\n    def __str__(self):\n        return self.name\n\n# Querying\nall_students = Student.objects.all()\ngood_students = Student.objects.filter(grade__gte=80)\nalice = Student.objects.get(email='alice@test.com')",
                30, 2),
            concept(pyDjango, "Migrations",
                "Migrations are Django's way of syncing your model changes to the database. makemigrations creates migration files. migrate applies them. showmigrations lists status. Never edit migration files manually.",
                "Migrations solve the problem of keeping your database schema in sync with your code across multiple environments and team members. Without migrations, database changes are manual and error-prone.",
                "# After creating or changing models:\n\n# Step 1: Generate migration file\npython manage.py makemigrations\n# Creates: students/migrations/0001_initial.py\n\n# Step 2: Apply to database\npython manage.py migrate\n\n# Check status\npython manage.py showmigrations\n\n# If you add a field to Student:\n# grade = models.IntegerField(default=0)\n# Run makemigrations again → 0002_student_grade.py",
                20, 3),
            concept(pyDjango, "Views and URL Patterns",
                "Views are Python functions (or classes) that receive an HTTP request and return an HTTP response. URL patterns in urls.py map URLs to views using path(). Each app has its own urls.py included in the main one.",
                "Views are where your application logic lives. Every page a user sees, every API endpoint a frontend calls — it starts with a view. Clean URL design is a mark of professional Django development.",
                "# students/views.py\nfrom django.http import JsonResponse\nfrom .models import Student\n\ndef student_list(request):\n    students = Student.objects.all().values()\n    return JsonResponse(list(students), safe=False)\n\ndef student_detail(request, pk):\n    student = Student.objects.get(pk=pk)\n    return JsonResponse({'name': student.name, 'grade': student.grade})\n\n# students/urls.py\nfrom django.urls import path\nfrom . import views\n\nurlpatterns = [\n    path('students/', views.student_list),\n    path('students/<int:pk>/', views.student_detail),\n]",
                25, 4),
            concept(pyDjango, "Django Admin Panel",
                "Django auto-generates a full admin interface for your models. Register models in admin.py. Customise list display, search fields, filters. Create superuser with createsuperuser command.",
                "The Django admin is one of Django's killer features. In hours, not days, you get a complete content management system. Most real Django projects use it for internal operations and content management.",
                "# students/admin.py\nfrom django.contrib import admin\nfrom .models import Student\n\n@admin.register(Student)\nclass StudentAdmin(admin.ModelAdmin):\n    list_display = ['name', 'email', 'grade', 'is_active']\n    list_filter = ['is_active']\n    search_fields = ['name', 'email']\n    ordering = ['-grade']\n\n# Terminal:\n# python manage.py createsuperuser\n# python manage.py runserver\n# Visit: http://127.0.0.1:8000/admin",
                20, 5),
            concept(pyDjango, "Django REST Framework Setup",
                "DRF (Django REST Framework) turns Django into a powerful API server. Install with pip. Add to INSTALLED_APPS. APIView for class-based API views. Response object returns JSON. status module for HTTP codes.",
                "Most modern Django projects use DRF to build APIs consumed by React, mobile apps, or third parties. Understanding how to set up DRF is the gateway from web pages to professional API development.",
                "# Install\npip install djangorestframework\npip install djangorestframework-simplejwt\n\n# settings.py\nINSTALLED_APPS = [\n    ...  \n    'rest_framework',\n]\n\nREST_FRAMEWORK = {\n    'DEFAULT_AUTHENTICATION_CLASSES': [\n        'rest_framework_simplejwt.authentication.JWTAuthentication',\n    ]\n}\n\n# views.py\nfrom rest_framework.views import APIView\nfrom rest_framework.response import Response\nfrom rest_framework import status\n\nclass StudentListView(APIView):\n    def get(self, request):\n        students = Student.objects.all()\n        return Response({'count': students.count()}, status=status.HTTP_200_OK)",
                25, 6)
        ));

        System.out.println("✅ Python Full Stack roadmap seeded — 12 subjects, 16 concepts");
    }

    private Subject pySub(String title, String desc, String icon, String color, int totalConcepts) {
        Subject s = new Subject();
        s.setTitle(title); s.setDescription(desc); s.setIcon(icon); s.setColor(color);
        s.setTotalConcepts(totalConcepts);
        return s;
    }
}
