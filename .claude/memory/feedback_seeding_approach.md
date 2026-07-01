---
name: feedback-seeding-approach
description: How to seed subjects and concepts — add directly to DataSeeder, format is known, never read DataSeeder for content reference
metadata:
  type: feedback
---

Add seeding methods directly to DataSeeder.java. Format is fully known from session context — do not fetch from API or read existing DataSeeder for content.

**Why:** DataSeeder.java is minimal between sessions — user regularly clears seeding methods after data is in DB. Never assume previous seeding methods still exist.

## Pattern for new subject

**Step 1 — Guard in run():**
```java
if (subjectRepository.findAll().stream().noneMatch(s -> "Subject Title".equals(s.getTitle()))) {
    seedSubjectName();
}
```

**Step 2 — Private method:**
```java
private void seedSubjectName() {
    Subject s = subjectRepository.save(sub("Title", "description", "icon", "#color", "rank"));
    s.setOverview("...");
    s.setWhyLearn("...");
    // ... set all rich fields
    subjectRepository.save(s);

    List<Concept> concepts = List.of(
        conceptRich(s, "Title", intro, simple, technical, syntax, examples, keyPoints, tip, mistakes, minutes, order, rank),
        // ... 12+ concepts
    );
    conceptRepository.saveAll(concepts);
    s.setTotalConcepts(concepts.size());
    subjectRepository.save(s);
}
```

## conceptRich() parameter order
```
subject, title, intro, simple, technical, syntax, examples, keyPoints, tip, mistakes, minutes, orderIndex, rank
```

## Content field formats
- `introduction` — 1-2 sentence hook for card
- `explanationSimple` — plain English, analogies, paragraphs with `\n\n`
- `explanationTechnical` — numbered sections: `1. Section:\n- detail\n\n2. Section:\n- detail`
- `syntax` — multi-line code with `\n` line breaks
- `examples` — `List.of(new Concept.ConceptExample(title, description, code, output))`
- `keyPoints` — `List.of("...")` complete sentences
- `tip` — 2-3 sentences, practical and actionable
- `commonMistakes` — `List.of("...")` real mistakes only

**No fixed counts** — write what each concept genuinely needs.

Restart backend to trigger seeding → prints ✅ to console.
