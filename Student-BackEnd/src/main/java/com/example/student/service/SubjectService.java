package com.example.student.service;

import com.example.student.dto.ConceptDTO;
import com.example.student.dto.SubjectDTO;
import com.example.student.exception.ResourceNotFoundException;
import com.example.student.model.Concept;
import com.example.student.model.Subject;
import com.example.student.repository.ConceptRepository;
import com.example.student.repository.SubjectRepository;
import com.example.student.repository.UserConceptProgressRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SubjectService {

    private final SubjectRepository subjectRepository;
    private final ConceptRepository conceptRepository;
    private final UserConceptProgressRepository progressRepository;

    public SubjectService(SubjectRepository subjectRepository,
                          ConceptRepository conceptRepository,
                          UserConceptProgressRepository progressRepository) {
        this.subjectRepository = subjectRepository;
        this.conceptRepository = conceptRepository;
        this.progressRepository = progressRepository;
    }

    public List<SubjectDTO> getAllSubjects(String userId) {
        return subjectRepository.findAll().stream()
                .map(s -> toDTO(s, userId))
                .collect(Collectors.toList());
    }

    public Map<String, Object> getSubjectDetail(String subjectId, String userId) {
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));

        List<ConceptDTO> concepts = conceptRepository.findBySubjectIdOrderByOrderIndex(subjectId)
                .stream().map(c -> toConceptDTO(c, userId)).collect(Collectors.toList());

        long total = concepts.size();
        long completed = concepts.stream().filter(ConceptDTO::isCompleted).count();

        return Map.of(
                "id", subject.getId(),
                "title", subject.getTitle(),
                "description", subject.getDescription() != null ? subject.getDescription() : "",
                "icon", subject.getIcon(),
                "color", subject.getColor(),
                "totalConcepts", total,
                "completedCount", completed,
                "concepts", concepts
        );
    }

    public List<SubjectDTO> search(String query, String userId) {
        return subjectRepository.findByTitleContainingIgnoreCase(query)
                .stream().map(s -> toDTO(s, userId)).collect(Collectors.toList());
    }

    private SubjectDTO toDTO(Subject s, String userId) {
        long total = conceptRepository.countBySubjectId(s.getId());
        long completed = progressRepository.countByUserIdAndSubjectId(userId, s.getId());
        return new SubjectDTO(s.getId(), s.getTitle(), s.getDescription(),
                s.getIcon(), s.getColor(), (int) total, completed);
    }

    private ConceptDTO toConceptDTO(Concept c, String userId) {
        boolean done = progressRepository.existsByUserIdAndConceptId(userId, c.getId());
        return new ConceptDTO(c.getId(), c.getTitle(), c.getWhatItIs(), c.getWhyItMatters(),
                c.getCodeExample(), c.getOrderIndex(), c.getEstimatedMinutes(), done);
    }
}
