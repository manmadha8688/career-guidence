package com.example.student.service;

import com.example.student.dto.*;
import com.example.student.exception.ResourceNotFoundException;
import com.example.student.model.*;
import com.example.student.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final SubjectRepository subjectRepository;
    private final ConceptRepository conceptRepository;
    private final RoadmapRepository roadmapRepository;
    private final RoadmapSubjectRepository roadmapSubjectRepository;
    private final UserConceptProgressRepository progressRepository;

    public AdminService(UserRepository userRepository,
                        SubjectRepository subjectRepository,
                        ConceptRepository conceptRepository,
                        RoadmapRepository roadmapRepository,
                        RoadmapSubjectRepository roadmapSubjectRepository,
                        UserConceptProgressRepository progressRepository) {
        this.userRepository = userRepository;
        this.subjectRepository = subjectRepository;
        this.conceptRepository = conceptRepository;
        this.roadmapRepository = roadmapRepository;
        this.roadmapSubjectRepository = roadmapSubjectRepository;
        this.progressRepository = progressRepository;
    }

    // ─── STATS ───────────────────────────────────────────────────────────────

    public AdminStatsDTO getStats() {
        long totalUsers = userRepository.count();
        long totalStudents = userRepository.countByRole("STUDENT");
        long totalSubjects = subjectRepository.count();
        long totalConcepts = conceptRepository.count();
        long totalRoadmaps = roadmapRepository.count();

        List<Map<String, Object>> recentUsers = userRepository.findTop5ByOrderByCreatedAtDesc()
                .stream().map(u -> Map.<String, Object>of(
                        "id", u.getId(),
                        "fullName", u.getFullName(),
                        "email", u.getEmail(),
                        "role", u.getRole(),
                        "createdAt", u.getCreatedAt() != null ? u.getCreatedAt().toString() : ""
                )).collect(Collectors.toList());

        List<SubjectCompletionAgg> topRaw = progressRepository.findTopSubjectsByCompletion();
        List<Map<String, Object>> topSubjects = topRaw.stream()
                .map(r -> Map.<String, Object>of(
                        "subjectId", r.getSubjectId(),
                        "title", r.getSubjectTitle(),
                        "icon", r.getSubjectIcon(),
                        "completionCount", r.getCount()
                )).collect(Collectors.toList());

        return new AdminStatsDTO(totalUsers, totalStudents, totalSubjects,
                totalConcepts, totalRoadmaps, recentUsers, topSubjects);
    }

    // ─── USERS ───────────────────────────────────────────────────────────────

    public Page<Map<String, Object>> getUsers(int page, int size, String search) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<User> users = (search == null || search.isBlank())
                ? userRepository.findAll(pageable)
                : userRepository.findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        search, search, pageable);

        return users.map(u -> Map.<String, Object>of(
                "id", u.getId(),
                "fullName", u.getFullName(),
                "email", u.getEmail(),
                "role", u.getRole(),
                "collegeName", u.getCollegeName() != null ? u.getCollegeName() : "",
                "avatarColor", u.getAvatarColor() != null ? u.getAvatarColor() : "#4F46E5",
                "isActive", u.getIsActive() != null ? u.getIsActive() : true,
                "createdAt", u.getCreatedAt() != null ? u.getCreatedAt().toString() : ""
        ));
    }

    public Map<String, Object> getUserProgress(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        List<Map<String, Object>> subjectProgress = subjectRepository.findAll().stream()
                .filter(s -> conceptRepository.countBySubjectId(s.getId()) > 0)
                .map(s -> {
                    int total = (int) conceptRepository.countBySubjectId(s.getId());
                    long completed = progressRepository.countByUserIdAndSubjectId(userId, s.getId());
                    double pct = total > 0
                            ? Math.round((completed * 100.0 / total) * 10) / 10.0 : 0;
                    return Map.<String, Object>of(
                            "subjectId", s.getId(), "title", s.getTitle(),
                            "icon", s.getIcon(), "total", total,
                            "completed", completed, "percentage", pct);
                }).collect(Collectors.toList());

        return Map.of(
                "user", Map.of("id", user.getId(), "fullName", user.getFullName(),
                        "email", user.getEmail(), "role", user.getRole()),
                "subjectProgress", subjectProgress
        );
    }

    public void deleteUser(String userId) {
        if (!userRepository.existsById(userId))
            throw new ResourceNotFoundException("User not found");
        userRepository.deleteById(userId);
    }

    // ─── SUBJECTS ────────────────────────────────────────────────────────────

    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    public Subject createSubject(AdminSubjectRequest req) {
        Subject s = new Subject();
        s.setTitle(req.getTitle());
        s.setDescription(req.getDescription());
        s.setIcon(req.getIcon() != null ? req.getIcon() : "📚");
        s.setColor(req.getColor() != null ? req.getColor() : "#4F46E5");
        s.setTotalConcepts(0);
        return subjectRepository.save(s);
    }

    public Subject updateSubject(String id, AdminSubjectRequest req) {
        Subject s = subjectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        if (req.getTitle() != null) s.setTitle(req.getTitle());
        if (req.getDescription() != null) s.setDescription(req.getDescription());
        if (req.getIcon() != null) s.setIcon(req.getIcon());
        if (req.getColor() != null) s.setColor(req.getColor());
        return subjectRepository.save(s);
    }

    public void deleteSubject(String id) {
        if (!subjectRepository.existsById(id))
            throw new ResourceNotFoundException("Subject not found");
        subjectRepository.deleteById(id);
    }

    // ─── CONCEPTS ────────────────────────────────────────────────────────────

    public List<Concept> getConceptsBySubject(String subjectId) {
        return conceptRepository.findBySubjectIdOrderByOrderIndex(subjectId);
    }

    public Concept createConcept(AdminConceptRequest req) {
        Subject subject = subjectRepository.findById(req.getSubjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        Concept c = new Concept();
        c.setSubjectId(subject.getId());
        c.setSubjectTitle(subject.getTitle());
        c.setSubjectIcon(subject.getIcon());
        c.setTitle(req.getTitle());
        c.setWhatItIs(req.getWhatItIs());
        c.setWhyItMatters(req.getWhyItMatters());
        c.setCodeExample(req.getCodeExample());
        c.setEstimatedMinutes(req.getEstimatedMinutes() > 0 ? req.getEstimatedMinutes() : 15);
        c.setOrderIndex(req.getOrderIndex());
        Concept saved = conceptRepository.save(c);
        subject.setTotalConcepts((int) conceptRepository.countBySubjectId(subject.getId()));
        subjectRepository.save(subject);
        return saved;
    }

    public Concept updateConcept(String id, AdminConceptRequest req) {
        Concept c = conceptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Concept not found"));
        if (req.getTitle() != null) c.setTitle(req.getTitle());
        if (req.getWhatItIs() != null) c.setWhatItIs(req.getWhatItIs());
        if (req.getWhyItMatters() != null) c.setWhyItMatters(req.getWhyItMatters());
        if (req.getCodeExample() != null) c.setCodeExample(req.getCodeExample());
        if (req.getEstimatedMinutes() > 0) c.setEstimatedMinutes(req.getEstimatedMinutes());
        if (req.getOrderIndex() > 0) c.setOrderIndex(req.getOrderIndex());
        return conceptRepository.save(c);
    }

    public void deleteConcept(String id) {
        Concept c = conceptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Concept not found"));
        String subjectId = c.getSubjectId();
        conceptRepository.deleteById(id);
        subjectRepository.findById(subjectId).ifPresent(subject -> {
            subject.setTotalConcepts((int) conceptRepository.countBySubjectId(subjectId));
            subjectRepository.save(subject);
        });
    }

    // ─── ROADMAPS ────────────────────────────────────────────────────────────

    public List<Roadmap> getAllRoadmaps() {
        return roadmapRepository.findAll();
    }

    public Roadmap createRoadmap(AdminRoadmapRequest req) {
        Roadmap r = new Roadmap();
        r.setTitle(req.getTitle());
        r.setDescription(req.getDescription());
        r.setRoleTarget(req.getRoleTarget());
        r.setIcon(req.getIcon() != null ? req.getIcon() : "🗺️");
        r.setColor(req.getColor() != null ? req.getColor() : "#7C3AED");
        r.setEstimatedWeeks(req.getEstimatedWeeks() > 0 ? req.getEstimatedWeeks() : 12);
        r.setPublished(true);
        return roadmapRepository.save(r);
    }

    public Roadmap updateRoadmap(String id, AdminRoadmapRequest req) {
        Roadmap r = roadmapRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Roadmap not found"));
        if (req.getTitle() != null) r.setTitle(req.getTitle());
        if (req.getDescription() != null) r.setDescription(req.getDescription());
        if (req.getRoleTarget() != null) r.setRoleTarget(req.getRoleTarget());
        if (req.getIcon() != null) r.setIcon(req.getIcon());
        if (req.getColor() != null) r.setColor(req.getColor());
        if (req.getEstimatedWeeks() > 0) r.setEstimatedWeeks(req.getEstimatedWeeks());
        return roadmapRepository.save(r);
    }

    public void deleteRoadmap(String id) {
        if (!roadmapRepository.existsById(id))
            throw new ResourceNotFoundException("Roadmap not found");
        roadmapRepository.deleteById(id);
    }

    public List<RoadmapSubject> getRoadmapSubjects(String roadmapId) {
        return roadmapSubjectRepository.findByRoadmapIdOrderByOrderIndex(roadmapId);
    }

    public RoadmapSubject addSubjectToRoadmap(String roadmapId, String subjectId, int orderIndex) {
        if (!roadmapRepository.existsById(roadmapId))
            throw new ResourceNotFoundException("Roadmap not found");
        Subject subject = subjectRepository.findById(subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Subject not found"));
        RoadmapSubject rs = new RoadmapSubject();
        rs.setRoadmapId(roadmapId);
        rs.setSubjectId(subjectId);
        rs.setSubject(subject);
        rs.setOrderIndex(orderIndex);
        return roadmapSubjectRepository.save(rs);
    }

    public void removeSubjectFromRoadmap(String roadmapId, String subjectId) {
        roadmapSubjectRepository.deleteByRoadmapIdAndSubjectId(roadmapId, subjectId);
    }

    public RoadmapSubject reorderSubjectInRoadmap(String roadmapId, String subjectId, int newOrderIndex) {
        RoadmapSubject rs = roadmapSubjectRepository.findByRoadmapIdAndSubjectId(roadmapId, subjectId)
                .orElseThrow(() -> new ResourceNotFoundException("Not found"));
        rs.setOrderIndex(newOrderIndex);
        return roadmapSubjectRepository.save(rs);
    }
}
