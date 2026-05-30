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

    public DataSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder,
                      SubjectRepository subjectRepository, ConceptRepository conceptRepository,
                      RoadmapRepository roadmapRepository,
                      RoadmapSubjectRepository roadmapSubjectRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.subjectRepository = subjectRepository;
        this.conceptRepository = conceptRepository;
        this.roadmapRepository = roadmapRepository;
        this.roadmapSubjectRepository = roadmapSubjectRepository;
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
    }

    private void seedAdmin() {
        userRepository.findByEmail("admin@demo.com").ifPresentOrElse(
            u -> { if (!Boolean.TRUE.equals(u.getIsActive())) { u.setIsActive(true); userRepository.save(u); } },
            () -> {
                User admin = new User();
                admin.setFullName("Admin"); admin.setEmail("admin@demo.com");
                admin.setPassword(passwordEncoder.encode("***REMOVED***"));
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
}
