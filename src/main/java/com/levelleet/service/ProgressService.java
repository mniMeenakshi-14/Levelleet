package com.levelleet.service;

import com.levelleet.dto.LeaderboardEntry;
import com.levelleet.dto.LeaderboardRow;
import com.levelleet.dto.ProgressDto;
import com.levelleet.model.LevelStar;
import com.levelleet.model.UserProgress;
import com.levelleet.repo.LevelStarRepository;
import com.levelleet.repo.UserProgressRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Pattern;

@Service
public class ProgressService {

    private static final Pattern DAY = Pattern.compile("^\\d{4}-\\d{2}-\\d{2}$");

    private final UserProgressRepository progress;
    private final LevelStarRepository levelStars;

    @Value("${levelleet.max-levels:1000}")
    private int maxLevels;

    public ProgressService(UserProgressRepository progress, LevelStarRepository levelStars) {
        this.progress = progress;
        this.levelStars = levelStars;
    }

    @Transactional(readOnly = true)
    public ProgressDto load(Long userId) {
        UserProgress p = progress.findById(userId).orElse(null);
        if (p == null || !p.isInitialized()) return ProgressDto.empty();

        Map<Integer, Integer> stars = new TreeMap<>();
        for (LevelStar s : levelStars.findByUserId(userId)) stars.put(s.getLevelIndex(), s.getStars());

        return new ProgressDto(true, stars, p.getCoins(), p.getXp(), p.getHearts(), p.getHeartTs(),
                p.getStreak(), p.getLastDay(), p.getTreatDay(), p.isSoundOn(), p.isVoiceOn(),
                parseSeen(p.getSeenWorlds()));
    }

    /** Replaces the saved progress with what the game sends. Values are clamped to sane ranges. */
    @Transactional
    public ProgressDto save(Long userId, ProgressDto in) {
        UserProgress p = progress.findById(userId).orElseGet(() -> {
            UserProgress n = new UserProgress();
            n.setUserId(userId);
            return n;
        });
        p.setCoins(clamp(in.coins(), 0, 1_000_000));
        p.setXp(clamp(in.xp(), 0, 10_000_000));
        p.setHearts(clamp(in.hearts(), 0, 5));
        p.setHeartTs(in.heartTs() == null || in.heartTs() <= 0 ? null : in.heartTs());
        p.setStreak(clamp(in.streak(), 0, 100_000));
        p.setLastDay(day(in.lastDay()));
        p.setTreatDay(day(in.treatDay()));
        p.setSoundOn(in.sound());
        p.setVoiceOn(in.voice());
        p.setSeenWorlds(seenToString(in.seen()));
        p.setInitialized(true);
        p.setUpdatedAt(Instant.now());
        progress.save(p);

        levelStars.deleteAllForUser(userId);
        List<LevelStar> rows = new ArrayList<>();
        if (in.stars() != null) {
            in.stars().forEach((level, stars) -> {
                if (level == null || stars == null) return;
                int s = clamp(stars, 0, 3);
                if (level >= 0 && level < maxLevels && s > 0) rows.add(new LevelStar(userId, level, s));
            });
        }
        levelStars.saveAll(rows);
        return load(userId);
    }

    @Transactional(readOnly = true)
    public List<LeaderboardEntry> leaderboard(int limit) {
        int n = clamp(limit, 1, 50);
        List<LeaderboardRow> rows = progress.leaderboard(PageRequest.of(0, n));
        List<LeaderboardEntry> out = new ArrayList<>();
        int rank = 1;
        for (LeaderboardRow r : rows) {
            out.add(new LeaderboardEntry(rank++, r.username(), r.stars() == null ? 0 : r.stars(),
                    r.xp() == null ? 0 : r.xp(), r.coins() == null ? 0 : r.coins()));
        }
        return out;
    }

    private static int clamp(int v, int lo, int hi) {
        return Math.max(lo, Math.min(hi, v));
    }

    private static String day(String s) {
        return s != null && DAY.matcher(s).matches() ? s : "";
    }

    private static String seenToString(List<Integer> seen) {
        if (seen == null) return "";
        StringBuilder sb = new StringBuilder();
        seen.stream().filter(w -> w != null && w >= 0 && w < 50).distinct().sorted().forEach(w -> {
            if (sb.length() > 0) sb.append(',');
            sb.append(w);
        });
        return sb.toString();
    }

    private static List<Integer> parseSeen(String s) {
        List<Integer> out = new ArrayList<>();
        if (s == null || s.isBlank()) return out;
        for (String part : s.split(",")) {
            try { out.add(Integer.parseInt(part.trim())); } catch (NumberFormatException ignored) { }
        }
        return out;
    }
}
