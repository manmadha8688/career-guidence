package com.example.student.repository;

import com.example.student.model.QuizAttempt;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface QuizAttemptRepository extends MongoRepository<QuizAttempt, String> {
    List<QuizAttempt> findByUserIdAndTypeAndRefId(String userId, String type, String refId);
    Optional<QuizAttempt> findTopByUserIdAndTypeAndRefIdOrderByTakenAtDesc(String userId, String type, String refId);
    boolean existsByUserIdAndTypeAndRefIdAndPassedTrue(String userId, String type, String refId);
    long countByUserIdAndTypeAndRefId(String userId, String type, String refId);
}
