package com.rige.repositories;

import com.rige.entities.OrderEntity;
import com.rige.enums.OrderStatus;
import lombok.NonNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IOrderRepository extends JpaRepository<OrderEntity, Long>, JpaSpecificationExecutor<OrderEntity> {

    @Override
    @NonNull
    Page<OrderEntity> findAll(Specification<OrderEntity> spec, @NonNull Pageable pageable);

    @Override
    @NonNull
    @EntityGraph(attributePaths = {
            "items.product",
            "user.roles"
    })
    Optional<OrderEntity> findById(@NonNull Long id);

    @Override
    @NonNull
    @EntityGraph(attributePaths = {
            "items.product",
            "user.roles"
    })
    List<OrderEntity> findAllById(@NonNull Iterable<Long> ids);

    Long countByStatus(OrderStatus status);

    @Query("SELECT SUM(o.total) FROM OrderEntity o WHERE o.status = :status")
    Double sumTotalByStatus(@Param("status") OrderStatus status);

    List<OrderEntity> findTop5ByOrderByOrderDateDesc();
}