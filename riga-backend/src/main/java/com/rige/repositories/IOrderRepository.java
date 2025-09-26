package com.rige.repositories;

import com.rige.entities.OrderEntity;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<OrderEntity, Long>, JpaSpecificationExecutor<OrderEntity> {

    @Override
    @NonNull
    @EntityGraph(attributePaths = {
            "user.roles"
    })
    Page<OrderEntity> findAll(Specification<OrderEntity> spec, @NonNull Pageable pageable);

    @Override
    @NonNull
    @EntityGraph(attributePaths = {
            "items.product",
            "user.roles"
    })
    List<OrderEntity> findAllById(@NonNull Iterable<Long> ids);
}