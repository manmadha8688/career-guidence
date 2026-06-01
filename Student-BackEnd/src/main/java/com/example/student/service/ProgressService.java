package com.example.student.service;

import com.example.student.dto.ProgressSummaryDTO;
import com.example.student.exception.ResourceNotFoundException;
import com.example.student.model.Concept;
import com.example.student.model.User;
import com.example.student.model.UserConceptProgress;
import com.example.student.repository.ConceptRepository;
import com.example.student.repository.SubjectRepository;
import com.example.student.repository.UserConceptProgressRepository;
import com.example.student.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProgressService {

    private final UserConceptProgressRepository progressRepository;
    private final ConceptRepository conceptRepository;
    private final SubjectRepository subjectRepository;
    private final UserRepository userRepository;

    public ProgressService(UserConceptProgressRepository progressRepository,
                           ConceptRepository conceptRepository,
                           SubjectRepository subjectRepository,
                           UserRepository userRepository) {
        this.progressRepository = progressRepository;
        this.conceptRepository = conceptRepository;
        this.subjectRepository = subjectRepository;
        this.userRepository = userRepository;
    }

    private static String computeRank(long xp) {
        if (xp >= 10000) return "S";
        if (xp >= 6000)  return "A";
        if (xp >= 3000)  return "B";
        if (xp >= 1500)  return "C";
        if (xp >= 500)   return "D";
        return "E";
    }

    public Map<String, Object> completeConcept(String conceptId, String userId) {
        if (progressRepository.existsByUserIdAndConceptId(userId, conceptId)) {
            return Map.of("message", "Already completed", "conceptId", conceptId);
        }
        Concept concept = conceptRepository.findById(conceptId)
                .orElseThrow(() -> new ResourceNotFoundException("Concept not found"));

        UserConceptProgress progress = new UserConceptProgress();
        progress.setUserId(userId);
        progress.setConceptId(conceptId);
        progress.setSubjectId(concept.getSubjectId());
        progress.setSubjectTitle(concept.getSubjectTitle());
        progress.setSubjectIcon(concept.getSubjectIcon());
        UserConceptProgress saved = progressRepository.save(progress);

        // Update XP, level, rank on the User document
        userRepository.findById(userId).ifPresent(user -> {
            long newXp = user.getXp() + 50L;
            user.setXp(newXp);
            user.setLevel(Math.max(1, (int)(newXp / 200)));
            user.setRank(computeRank(newXp));
            userRepository.save(user);
        });

        return Map.of("message", "Completed", "conceptId", conceptId,
                "completedAt", saved.getCompletedAt() != null ? saved.getCompletedAt().toString() : "");
    }

    public Map<String, Object> uncompleteConcept(String conceptId, String userId) {
        progressRepository.deleteByUserIdAndConceptId(userId, conceptId);
        return Map.of("message", "Unmarked");
    }

    public ProgressSummaryDTO getProgressSummary(String userId) {
        long totalConcepts     = conceptRepository.count();
        long completedConcepts = progressRepository.countByUserId(userId);
        double percentage = totalConcepts > 0
                ? Math.round((completedConcepts * 100.0 / totalConcepts) * 10) / 10.0
                : 0;

        // ── Streak ──────────────────────────────────────────────────────────
        List<UserConceptProgress> all = progressRepository.findByUserId(userId);
        Set<LocalDate> completionDates = all.stream()
                .filter(p -> p.getCompletedAt() != null)
                .map(p -> p.getCompletedAt().toLocalDate())
                .collect(Collectors.toSet());

        int streak = 0;
        LocalDate date = LocalDate.now();
        while (completionDates.contains(date)) { streak++; date = date.minusDays(1); }

        // ── XP / Level / Rank — read from User document (source of truth) ─────
        User user = userRepository.findById(userId).orElse(null);
        long   xp    = user != null ? user.getXp()    : completedConcepts * 50L;
        int    level = user != null ? user.getLevel()  : Math.max(1, (int)(xp / 200));
        String rank  = user != null ? user.getRank()   : computeRank(xp);

        // ── Per-subject progress ─────────────────────────────────────────────
        List<ProgressSummaryDTO.SubjectProgress> subjectProgress = subjectRepository.findAll()
                .stream()
                .filter(s -> conceptRepository.countBySubjectId(s.getId()) > 0)
                .map(s -> {
                    int total = (int) conceptRepository.countBySubjectId(s.getId());
                    long completed = progressRepository.countByUserIdAndSubjectId(userId, s.getId());
                    double pct = total > 0
                            ? Math.round((completed * 100.0 / total) * 10) / 10.0
                            : 0;
                    return new ProgressSummaryDTO.SubjectProgress(
                            s.getId(), s.getTitle(), s.getIcon(), s.getColor(),
                            s.getRank() != null ? s.getRank() : "E",
                            total, completed, pct);
                })
                .collect(Collectors.toList());

        return new ProgressSummaryDTO(totalConcepts, completedConcepts, percentage,
                streak, xp, level, rank, subjectProgress);
    }
}
