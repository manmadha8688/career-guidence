package com.example.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor @NoArgsConstructor
public class ConceptDTO {
    private String id;
    private String title;
    private String whatItIs;
    private String whyItMatters;
    private String codeExample;
    private int orderIndex;
    private int estimatedMinutes;
    private boolean completed;
}
