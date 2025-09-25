package com.rige.repositories;

import com.rige.entities.UserEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<UserEntity, Long> {

    @EntityGraph(attributePaths = {"roles"})
    Optional<UserEntity> findByEmail(String email);
}