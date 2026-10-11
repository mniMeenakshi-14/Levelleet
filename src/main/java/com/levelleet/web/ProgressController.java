package com.levelleet.web;

import com.levelleet.dto.LeaderboardEntry;
import com.levelleet.dto.ProgressDto;
import com.levelleet.service.ProgressService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProgressController {

    private final ProgressService progress;

    public ProgressController(ProgressService progress) {
        this.progress = progress;
    }

    @GetMapping("/progress")
    public ProgressDto get(@RequestAttribute("userId") Long userId) {
        return progress.load(userId);
    }

    @PutMapping("/progress")
    public ProgressDto put(@RequestAttribute("userId") Long userId, @RequestBody ProgressDto body) {
        return progress.save(userId, body);
    }

    /** Public: anyone can see the top players. */
    @GetMapping("/leaderboard")
    public List<LeaderboardEntry> leaderboard(@RequestParam(defaultValue = "20") int limit) {
        return progress.leaderboard(limit);
    }
}
