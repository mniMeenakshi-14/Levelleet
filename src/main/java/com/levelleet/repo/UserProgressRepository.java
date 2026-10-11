package com.levelleet.repo;

import com.levelleet.dto.LeaderboardRow;
import com.levelleet.model.UserProgress;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {

    @Query("""
            select new com.levelleet.dto.LeaderboardRow(u.username, p.xp, p.coins, coalesce(sum(s.stars), 0L))
            from UserProgress p
            join User u on u.id = p.userId
            left join LevelStar s on s.userId = p.userId
            where p.initialized = true
            group by u.username, p.xp, p.coins
            order by coalesce(sum(s.stars), 0L) desc, p.xp desc, u.username asc
            """)
    List<LeaderboardRow> leaderboard(Pageable pageable);
}
