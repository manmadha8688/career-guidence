package com.example.student.model;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "concepts")
@Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
public class Concept {

    @Id
    private String id;

    @Indexed
    private String subjectId;

    private String subjectTitle;
    private String subjectIcon;

    private String title;
    private String content;
    private String whatItIs;
    private String whyItMatters;
    private String codeExample;

    @Builder.Default
    private int estimatedMinutes = 15;

    @Builder.Default
    private int orderIndex = 0;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
