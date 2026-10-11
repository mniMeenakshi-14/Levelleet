package com.levelleet.repo;

import com.levelleet.model.LevelStar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface LevelStarRepository extends JpaRepository<LevelStar, Long> {

    List<LevelStar> findByUserId(Long userId);

    @Modifying(flushAutomatically = true, clearAutomatically = true)
    @Query("delete from LevelStar s where s.userId = :uid")
    void deleteAllForUser(@Param("uid") Long uid);
}
