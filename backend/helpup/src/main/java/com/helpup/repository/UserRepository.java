package com.helpup.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.helpup.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // optional: custom queries here
}
