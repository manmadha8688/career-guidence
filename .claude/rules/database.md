# Database Rules — MongoDB Atlas

## Connection
```
URI:      mongodb+srv://***REMOVED***:...@free-database.lfnuahd.mongodb.net
Database: learnData_db
Cluster:  Free-Database (M0 shared)
```
**Never hardcode this URI in source code.** Use `MONGODB_URI` env var only.

## Collections

### `users`
```json
{
  "_id": "ObjectId",
  "fullName": "string",
  "email": "string (unique)",
  "password": "BCrypt hash",
  "role": "STUDENT | GUEST | ADMIN",
  "collegeName": "string",
  "avatarColor": "#hex",
  "isActive": "boolean",
  "xp": "int (default 0)",
  "level": "int (default 1)",
  "createdAt": "Date"
}
```
Index: `email` (unique)

### `subjects`
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string",
  "icon": "emoji",
  "color": "#hex",
  "rank": "E|D|C|B|A|S",
  "difficulty": "Beginner|Intermediate|Advanced|Expert",
  "estimatedHours": "int",
  "overview": "string",
  "whyLearn": "string",
  "forWho": "string",
  "prerequisites": ["string"],
  "outcomes": ["string"],
  "whatYouWillBuild": ["string"],
  "toolsRequired": ["string"],
  "careerUse": "string"
}
```

### `concepts`
```json
{
  "_id": "ObjectId",
  "subjectId": "ObjectId ref",
  "subjectTitle": "string (denormalized)",
  "subjectIcon": "emoji (denormalized)",
  "title": "string",
  "rank": "E|D|C|B|A|S",
  "orderIndex": "int",
  "estimatedMinutes": "int",
  "introduction": "string",
  "explanationSimple": "string",
  "explanationTechnical": "string",
  "syntax": "string",
  "examples": [{ "title": "string", "description": "string", "code": "string", "output": "string", "demoHtml": "string?" }],
  "keyPoints": ["string"],
  "tip": "string",
  "commonMistakes": ["string"],
  "videoUrl": "string?",
  "videoTitle": "string?"
}
```
Index: `subjectId`

### `user_concept_progress`
```json
{
  "userId": "ObjectId ref",
  "conceptId": "ObjectId ref",
  "completedAt": "Date"
}
```
Index: `userId + conceptId` (compound unique)

### `quiz_attempts`
```json
{
  "userId": "ObjectId ref",
  "quizType": "concept|subject|roadmap",
  "refId": "ObjectId ref",
  "score": "int",
  "total": "int",
  "passed": "boolean",
  "xpEarned": "int",
  "dailyBonusEarned": "boolean",
  "takenAt": "Date"
}
```
Index: `userId + refId + takenAt`

### `user_subject_badges`
```json
{
  "userId": "ObjectId ref",
  "subjectId": "ObjectId ref",
  "score": "int",
  "total": "int",
  "earnedAt": "Date"
}
```

### `roadmaps`
```json
{
  "title": "string",
  "description": "string",
  "icon": "emoji",
  "color": "#hex",
  "roleTarget": "string",
  "estimatedWeeks": "int",
  "overview": "string",
  "roleTargets": ["string"],
  "prerequisites": ["string"],
  "outcomes": ["string"]
}
```

### `missions`
```json
{
  "title": "string",
  "brief": "string",
  "category": "SUBJECT_PRACTICE|ACADEMIC|ROLE_BASED|REAL_WORLD",
  "rank": "D|C|B|A|S",
  "techStack": ["string"],
  "objectives": ["string"],
  "bonusObjectives": ["string"],
  "hints": ["string"],
  "approachGuide": "string",
  "commonMistakes": ["string"],
  "subjectTitles": ["string"],
  "targetRoles": ["string"],
  "orderIndex": "int"
}
```

### `problems`
```json
{
  "track": "START_CODING|LOGIC_BUILDING|SKILL_UP|INTERVIEW_PREP|SCENARIO_CODING",
  "title": "string",
  "difficulty": "BEGINNER|INTERMEDIATE|ADVANCED",
  "problemType": "string",
  "description": "string",
  "example1": "string",
  "example1Explanation": "string",
  "example2": "string?",
  "example2Explanation": "string?",
  "approach": "string",
  "solutions": [{ "name": "string", "language": "string", "code": "string", "complexity": "..." }],
  "orderIndex": "int"
}
```

## Naming Conventions

- Collection names: `snake_case` plural (e.g., `user_concept_progress`)
- Field names: `camelCase` (Spring Data maps automatically)
- IDs: MongoDB `ObjectId` strings, referenced as strings in Java (`String id`)
- Timestamps: `Date` type (not String)

## Query Guidelines

- Avoid N+1: use `findByUserIdAndSubjectIdIn()` not per-subject `findByUserIdAndSubjectId()`
- Subjects and concepts are pre-loaded into Caffeine on startup — never query them in hot paths
- Progress queries always filter by `userId` first
- Quiz attempts: use `takenAt` for daily bonus detection (not concept completion date)
