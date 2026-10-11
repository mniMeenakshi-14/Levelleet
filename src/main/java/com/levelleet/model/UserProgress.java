package com.levelleet.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "user_progress")
public class UserProgress {

    /** Same value as users.id (one progress row per player). */
    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(nullable = false)
    private int coins = 30;

    @Column(nullable = false)
    private int xp = 0;

    @Column(nullable = false)
    private int hearts = 5;

    @Column(name = "heart_ts")
    private Long heartTs;

    @Column(nullable = false)
    private int streak = 0;

    @Column(name = "last_day", nullable = false, length = 10)
    private String lastDay = "";

    @Column(name = "treat_day", nullable = false, length = 10)
    private String treatDay = "";

    @Column(name = "sound_on", nullable = false)
    private boolean soundOn = true;

    @Column(name = "voice_on", nullable = false)
    private boolean voiceOn = true;

    @Column(name = "seen_worlds", nullable = false, length = 100)
    private String seenWorlds = "";

    @Column(nullable = false)
    private boolean initialized = false;

    @Column(name = "updated_at", nullable = false)
    private Instant updatedAt = Instant.now();

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
    public int getCoins() { return coins; }
    public void setCoins(int coins) { this.coins = coins; }
    public int getXp() { return xp; }
    public void setXp(int xp) { this.xp = xp; }
    public int getHearts() { return hearts; }
    public void setHearts(int hearts) { this.hearts = hearts; }
    public Long getHeartTs() { return heartTs; }
    public void setHeartTs(Long heartTs) { this.heartTs = heartTs; }
    public int getStreak() { return streak; }
    public void setStreak(int streak) { this.streak = streak; }
    public String getLastDay() { return lastDay; }
    public void setLastDay(String lastDay) { this.lastDay = lastDay; }
    public String getTreatDay() { return treatDay; }
    public void setTreatDay(String treatDay) { this.treatDay = treatDay; }
    public boolean isSoundOn() { return soundOn; }
    public void setSoundOn(boolean soundOn) { this.soundOn = soundOn; }
    public boolean isVoiceOn() { return voiceOn; }
    public void setVoiceOn(boolean voiceOn) { this.voiceOn = voiceOn; }
    public String getSeenWorlds() { return seenWorlds; }
    public void setSeenWorlds(String seenWorlds) { this.seenWorlds = seenWorlds; }
    public boolean isInitialized() { return initialized; }
    public void setInitialized(boolean initialized) { this.initialized = initialized; }
    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
