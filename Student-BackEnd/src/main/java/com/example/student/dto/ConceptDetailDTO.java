package com.example.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ConceptDetailDTO {
    private String id;
    private String title;
    private String whatItIs;
    private String whyItMatters;
    private String codeExample;
    private int orderIndex;
    private int estimatedMinutes;
    private boolean completed;
    private String subjectId;
    private String subjectTitle;
    private int totalInSubject;
    private NavItem prevConcept;
    private NavItem nextConcept;

    @Data @AllArgsConstructor @NoArgsConstructor
    public static class NavItem {
        private String id;
        private String title;
    }
}
