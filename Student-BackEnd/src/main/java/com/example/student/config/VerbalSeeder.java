package com.example.student.config;

import com.example.student.model.AptitudeGroup;
import com.example.student.model.VerbalTopic;
import com.example.student.repository.AptitudeGroupRepository;
import com.example.student.repository.VerbalTopicRepository;
import com.example.student.service.CacheService;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.annotation.Order;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Seeds the verbal / English category from
 * {@code resources/seed/aptitude-verbal.json}.
 *
 * Groups go into the shared {@code aptitude_groups} collection (navigation);
 * topics go into the dedicated {@code verbal_topics} collection with the
 * purpose-built rule-based lesson model. Lesson content is JSON-source-of-truth
 * and pruning is scoped to the verbal category only.
 */
@Component
@Order(0)
public class VerbalSeeder {

    private static final Logger log = LoggerFactory.getLogger(VerbalSeeder.class);
    private static final String SEED_FILE = "seed/aptitude-verbal.json";
    private static final String CATEGORY = "verbal";

    private final VerbalTopicRepository topicRepo;
    private final AptitudeGroupRepository groupRepo;
    private final CacheService cacheService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public VerbalSeeder(VerbalTopicRepository topicRepo,
                        AptitudeGroupRepository groupRepo,
                        CacheService cacheService) {
        this.topicRepo = topicRepo;
        this.groupRepo = groupRepo;
        this.cacheService = cacheService;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class SeedCategory {
        public String category;
        public List<SeedGroup> groups = new ArrayList<>();
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    static class SeedGroup {
        public String slug;
        public String displayName;
        public String description;
        public String icon;
        public int order;
        public List<VerbalTopic> topics = new ArrayList<>();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void seed() {
        try {
            List<SeedCategory> taxonomy = load();
            if (taxonomy.isEmpty()) {
                log.info("Verbal seeder: no data in {} — skipping (verbal data left untouched).", SEED_FILE);
                return;
            }

            int gInserted = 0, gUpdated = 0, tInserted = 0, tUpdated = 0;
            Set<String> keepGroups = new HashSet<>();
            Set<String> keepTopics = new HashSet<>();
            List<VerbalTopic> topicsToInsert = new ArrayList<>();

            for (SeedCategory cat : taxonomy) {
                int groupOrder = 0;
                for (SeedGroup g : cat.groups) {
                    groupOrder++;
                    keepGroups.add(g.slug);

                    Optional<AptitudeGroup> gExistingOpt = groupRepo.findBySlug(g.slug);
                    if (gExistingOpt.isEmpty()) {
                        groupRepo.save(AptitudeGroup.builder()
                                .category(CATEGORY)
                                .slug(g.slug)
                                .displayName(g.displayName)
                                .description(g.description)
                                .icon(g.icon)
                                .order(g.order != 0 ? g.order : groupOrder)
                                .isActive(true)
                                .build());
                        gInserted++;
                    } else if (refreshGroup(gExistingOpt.get(), g, groupOrder)) {
                        groupRepo.save(gExistingOpt.get());
                        gUpdated++;
                    }

                    int topicOrder = 0;
                    for (VerbalTopic def : g.topics) {
                        topicOrder++;
                        keepTopics.add(def.getTopic());
                        def.setCategory(CATEGORY);
                        def.setGroup(g.slug);
                        if (def.getOrder() == 0) def.setOrder(topicOrder);
                        def.setActive(true);

                        Optional<VerbalTopic> tExistingOpt = topicRepo.findByTopic(def.getTopic());
                        if (tExistingOpt.isEmpty()) {
                            topicsToInsert.add(def);
                            tInserted++;
                        } else if (refreshTopic(tExistingOpt.get(), def)) {
                            topicRepo.save(tExistingOpt.get());
                            tUpdated++;
                        }
                    }
                }
            }

            if (!topicsToInsert.isEmpty()) topicRepo.saveAll(topicsToInsert);

            List<VerbalTopic> orphanTopics = new ArrayList<>();
            for (VerbalTopic t : topicRepo.findAll()) {
                if (!keepTopics.contains(t.getTopic())) orphanTopics.add(t);
            }
            if (!orphanTopics.isEmpty()) topicRepo.deleteAll(orphanTopics);

            List<AptitudeGroup> orphanGroups = new ArrayList<>();
            for (AptitudeGroup g : groupRepo.findAll()) {
                if (CATEGORY.equals(g.getCategory()) && !keepGroups.contains(g.getSlug())) orphanGroups.add(g);
            }
            if (!orphanGroups.isEmpty()) groupRepo.deleteAll(orphanGroups);

            boolean changed = gInserted + gUpdated + tInserted + tUpdated
                    + orphanGroups.size() + orphanTopics.size() > 0;
            if (changed) cacheService.evictAll("aptitude");

            log.info("Verbal seeder: groups[{} new, {} upd, {} pruned] topics[{} new, {} upd, {} pruned].",
                    gInserted, gUpdated, orphanGroups.size(),
                    tInserted, tUpdated, orphanTopics.size());
        } catch (Exception e) {
            log.error("Verbal seeder failed — app continues: {}", e.getMessage(), e);
        }
    }

    private boolean refreshGroup(AptitudeGroup existing, SeedGroup def, int fallbackOrder) {
        boolean changed = false;
        int order = def.order != 0 ? def.order : fallbackOrder;
        if (!equalsSafe(existing.getCategory(), CATEGORY))          { existing.setCategory(CATEGORY); changed = true; }
        if (!equalsSafe(existing.getDisplayName(), def.displayName)) { existing.setDisplayName(def.displayName); changed = true; }
        if (!equalsSafe(existing.getDescription(), def.description)) { existing.setDescription(def.description); changed = true; }
        if (!equalsSafe(existing.getIcon(), def.icon))              { existing.setIcon(def.icon); changed = true; }
        if (existing.getOrder() != order)                           { existing.setOrder(order); changed = true; }
        if (!existing.isActive())                                   { existing.setActive(true); changed = true; }
        return changed;
    }

    private boolean refreshTopic(VerbalTopic existing, VerbalTopic def) {
        boolean changed = false;
        if (!equalsSafe(existing.getCategory(), CATEGORY))                { existing.setCategory(CATEGORY); changed = true; }
        if (!equalsSafe(existing.getGroup(), def.getGroup()))             { existing.setGroup(def.getGroup()); changed = true; }
        if (!equalsSafe(existing.getDisplayName(), def.getDisplayName())) { existing.setDisplayName(def.getDisplayName()); changed = true; }
        if (!equalsSafe(existing.getDescription(), def.getDescription())) { existing.setDescription(def.getDescription()); changed = true; }
        if (!equalsSafe(existing.getIcon(), def.getIcon()))              { existing.setIcon(def.getIcon()); changed = true; }
        if (!equalsSafe(existing.getDifficulty(), def.getDifficulty()))   { existing.setDifficulty(def.getDifficulty()); changed = true; }
        if (!equalsSafe(existing.getPriority(), def.getPriority()))       { existing.setPriority(def.getPriority()); changed = true; }
        if (existing.getOrder() != def.getOrder())                       { existing.setOrder(def.getOrder()); changed = true; }
        if (!existing.isActive())                                        { existing.setActive(true); changed = true; }

        if (def.getLesson() != null && !jsonEquals(existing.getLesson(), def.getLesson())) {
            existing.setLesson(def.getLesson());
            changed = true;
        }
        if (def.getVideos() != null && !def.getVideos().isEmpty()
                && !jsonEquals(existing.getVideos(), def.getVideos())) {
            existing.setVideos(def.getVideos());
            changed = true;
        }
        return changed;
    }

    private boolean jsonEquals(Object a, Object b) {
        try {
            return objectMapper.writeValueAsString(a).equals(objectMapper.writeValueAsString(b));
        } catch (Exception e) {
            return false;
        }
    }

    private static boolean equalsSafe(Object a, Object b) {
        return a == null ? b == null : a.equals(b);
    }

    private List<SeedCategory> load() throws Exception {
        ClassPathResource resource = new ClassPathResource(SEED_FILE);
        if (!resource.exists()) return List.of();
        try (InputStream in = resource.getInputStream()) {
            SeedCategory[] arr = objectMapper.readValue(in, SeedCategory[].class);
            return new ArrayList<>(List.of(arr));
        }
    }
}
