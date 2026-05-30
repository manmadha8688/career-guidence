package com.example.student.service;

import com.example.student.dto.ProgressSummaryDTO;
import com.example.student.exception.ResourceNotFoundException;
import com.example.student.model.Concept;
import com.example.student.model.UserConceptProgress;
import com.example.student.repository.ConceptRepository;
import com.example.student.repository.SubjectRepository;
import com.example.student.repository.UserConceptProgressRepository;
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

    public ProgressService(UserConceptProgressRepository progressRepository,
                           ConceptRepository conceptRepository,
                           SubjectRepository subjectRepository) {
        this.progressRepository = progressRepository;
        this.conceptRepository = conceptRepository;
        this.subjectRepository = subjectRepository;
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

        return Map.of("message", "Completed", "conceptId", conceptId,
                "completedAt", saved.getCompletedAt() != null ? saved.getCompletedAt().toString() : "");
    }

    public Map<String, Object> uncompleteConcept(String conceptId, String userId) {
        progressRepository.deleteByUserIdAndConceptId(userId, conceptId);
        return Map.of("message", "Unmarked");
    }

    public ProgressSummaryDTO getProgressSummary(String userId) {
        long totalConcepts = conceptRepository.count();
        long completedConcepts = progressRepository.countByUserId(userId);
        double percentage = totalConcepts > 0
                ? Math.round((completedConcepts * 100.0 / totalConcepts) * 10) / 10.0
                : 0;

        List<UserConceptProgress> all = progressRepository.findByUserId(userId);
        Set<LocalDate> completionDates = all.stream()
                .filter(p -> p.getCompletedAt() != null)
                .map(p -> p.getCompletedAt().toLocalDate())
                .collect(Collectors.toSet());

        int streak = 0;
        LocalDate date = LocalDate.now();
        while (completionDates.contains(date)) {
            streak++;
            date = date.minusDays(1);
        }

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
                            total, completed, pct);
                })
                .collect(Collectors.toList());

        return new ProgressSummaryDTO(totalConcepts, completedConcepts, percentage, streak, subjectProgress);
    }
}
