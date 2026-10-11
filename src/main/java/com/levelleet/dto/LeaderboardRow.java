package com.levelleet.dto;

/** Row produced by the leaderboard query (no rank yet). */
public record LeaderboardRow(String username, Integer xp, Integer coins, Long stars) {
}
