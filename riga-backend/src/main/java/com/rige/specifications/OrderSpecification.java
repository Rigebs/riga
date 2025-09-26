package com.rige.specifications;
import com.rige.entities.OrderEntity;
import com.rige.filters.OrderFilter;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.JoinType;

import java.util.ArrayList;
import java.util.List;

public class OrderSpecification {

    public static Specification<OrderEntity> build(OrderFilter filter) {
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (filter.getOrderDateFrom() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(root.get("orderDate"), filter.getOrderDateFrom())
                );
            }

            if (filter.getOrderDateTo() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(root.get("orderDate"), filter.getOrderDateTo())
                );
            }

            if (filter.getStatus() != null) {
                predicates.add(
                        cb.equal(root.get("status"), filter.getStatus())
                );
            }

            if (filter.getMinTotal() != null) {
                predicates.add(
                        cb.greaterThanOrEqualTo(root.get("total"), filter.getMinTotal())
                );
            }

            if (filter.getMaxTotal() != null) {
                predicates.add(
                        cb.lessThanOrEqualTo(root.get("total"), filter.getMaxTotal())
                );
            }

            if (filter.getUserId() != null) {
                predicates.add(
                        cb.equal(root.join("user", JoinType.INNER).get("id"), filter.getUserId())
                );
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}