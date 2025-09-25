package com.rige.repositories;

import com.rige.entities.ProductEntity;
import lombok.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IProductRepository extends JpaRepository<ProductEntity, Long> {

    @Override
    @NonNull
    @EntityGraph(attributePaths = {"category"})
    List<ProductEntity> findAll();
}