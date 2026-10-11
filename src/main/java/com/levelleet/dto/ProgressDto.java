package com.levelleet.dto;

import java.util.List;
import java.util.Map;

/**
 * Same shape the game keeps in the browser.
 * {@code exists} is false when the account has never saved any progress yet (ignored on upload).
 */
public record ProgressDto(
        boolean exists,
        Map<Integer, Integer> stars,   // level index -> 1..3 stars
        int coins,
        int xp,
        int hearts,
        Long heartTs,
        int streak,
        String lastDay,
        String treatDay,
        boolean sound,
        boolean voice,
        List<Integer> seen) {          // worlds whose animated intro was watched

    public static ProgressDto empty() {
        return new ProgressDto(false, Map.of(), 30, 0, 5, null, 0, "", "", true, true, List.of());
    }
}
