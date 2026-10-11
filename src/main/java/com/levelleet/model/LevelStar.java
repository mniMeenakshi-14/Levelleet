package com.levelleet.model;

import jakarta.persistence.*;

@Entity
@Table(name = "level_stars",
       uniqueConstraints = @UniqueConstraint(name = "uq_user_level", columnNames = {"user_id", "level_index"}))
public class LevelStar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "level_index", nullable = false)
    private int levelIndex;

    @Column(nullable = false)
    private int stars;

    public LevelStar() {}

    public LevelStar(Long userId, int levelIndex, int stars) {
        this.userId = userId;
        this.levelIndex = levelIndex;
        this.stars = stars;
    }

    public Long getId() { return id; }
    public Long getUserId() { return userId; }
    public int getLevelIndex() { return levelIndex; }
    public int getStars() { return stars; }
}
