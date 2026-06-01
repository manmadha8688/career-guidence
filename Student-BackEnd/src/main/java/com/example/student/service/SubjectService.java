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

        return java.util.Map.ofEntries(
                java.util.Map.entry("id", subject.getId()),
                java.util.Map.entry("title", subject.getTitle()),
                java.util.Map.entry("description", subject.getDescription() != null ? subject.getDescription() : ""),
                java.util.Map.entry("icon", subject.getIcon()),
                java.util.Map.entry("color", subject.getColor()),
                java.util.Map.entry("rank", subject.getRank() != null ? subject.getRank() : "E"),
                java.util.Map.entry("totalConcepts", total),
                java.util.Map.entry("completedCount", completed),
                java.util.Map.entry("concepts", concepts)
        );
    }

    public List<SubjectDTO> search(String query, String userId) {
        return subjectRepository.findByTitleContainingIgnoreCase(query)
                .stream().map(s -> toDTO(s, userId)).collect(Collectors.toList());
    }

    private SubjectDTO toDTO(Subject s, String userId) {
        long total = conceptRepository.countBySubjectId(s.getId());
        long completed = progressRepository.countByUserIdAndSubjectId(userId, s.getId());
        SubjectDTO dto = new SubjectDTO(s.getId(), s.getTitle(), s.getDescription(),
                s.getIcon(), s.getColor(), (int) total, completed,
                s.getRank() != null ? s.getRank() : "E");
        return dto;
    }

    private ConceptDTO toConceptDTO(Concept c, String userId) {
        boolean done = progressRepository.existsByUserIdAndConceptId(userId, c.getId());
        ConceptDTO dto = new ConceptDTO();
        dto.setId(c.getId());
        dto.setTitle(c.getTitle());
        dto.setWhatItIs(c.getWhatItIs());
        dto.setWhyItMatters(c.getWhyItMatters());
        dto.setCodeExample(c.getCodeExample());
        dto.setIntroduction(c.getIntroduction());
        dto.setRank(c.getRank() != null ? c.getRank() : "E");
        dto.setOrderIndex(c.getOrderIndex());
        dto.setEstimatedMinutes(c.getEstimatedMinutes());
        dto.setCompleted(done);
        return dto;
    }
}
