package com.example.student.dto;

import lombok.Data;

@Data
public class AdminConceptRequest {
    private String subjectId;
    private String title;
    private String whatItIs;
    private String whyItMatters;
    private String codeExample;
    private int estimatedMinutes;
    private int orderIndex;
}
