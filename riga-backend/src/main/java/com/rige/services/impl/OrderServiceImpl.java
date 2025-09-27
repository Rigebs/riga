package com.rige.services.impl;

import com.rige.dto.request.OrderItemRequest;
import com.rige.dto.request.OrderRequest;
import com.rige.dto.response.*;
import com.rige.entities.*;
import com.rige.enums.OrderItemStatus;
import com.rige.enums.OrderStatus;
import com.rige.filters.OrderFilter;
import com.rige.repositories.IOrderRepository;
import com.rige.repositories.IProductRepository;
import com.rige.repositories.IUserRepository;
import com.rige.services.IOrderService;
import com.rige.specifications.OrderSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final IOrderRepository orderRepository;
    private final IUserRepository userRepository;
    private final IProductRepository productRepository;

    @Override
    public Page<OrderResponse> findAll(OrderFilter filter, Pageable pageable) {
        Page<OrderEntity> page = orderRepository.findAll(OrderSpecification.build(filter), pageable);

        List<OrderEntity> ordersWithItems = orderRepository.findAllById(page.getContent().stream()
                .map(OrderEntity::getId)
                .toList());

        Map<Long, OrderEntity> orderMap = ordersWithItems.stream()
                .collect(Collectors.toMap(OrderEntity::getId, Function.identity()));

        List<OrderResponse> orderedResponses = page.getContent().stream()
                .map(order -> mapToResponse(orderMap.get(order.getId())))
                .collect(Collectors.toList());

        return new PageImpl<>(orderedResponses, pageable, page.getTotalElements());
    }

    @Override
    public OrderResponse findById(Long id) {
        OrderEntity entity = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        return mapToResponse(entity);
    }

    @Override
    public OrderResponse save(OrderRequest request) {
        OrderEntity order = new OrderEntity();
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PENDING);

        UserEntity user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        order.setUser(user);

        List<OrderItemEntity> items = request.getItems().stream()
                .map(itemReq -> {
                    ProductEntity product = productRepository.findById(itemReq.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product not found"));

                    OrderItemEntity item = new OrderItemEntity();
                    item.setOrder(order);
                    item.setProduct(product);
                    item.setQuantity(itemReq.getQuantity());
                    item.setUnitPrice(product.getPrice());
                    return item;
                })
                .collect(Collectors.toList());

        order.setItems(items);
        order.setDeliveryRequired(request.isDeliveryRequired());

        double total = items.stream()
                .mapToDouble(i -> i.getUnitPrice() * i.getQuantity())
                .sum();
        order.setTotal(total);

        OrderEntity saved = orderRepository.save(order);

        return mapToResponse(saved);
    }

    @Override
    @Transactional
    public OrderResponse confirmOrder(Long id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (order.getStatus() != OrderStatus.PENDING) {
            throw new RuntimeException("Only pending orders can be confirmed");
        }

        order.setStatus(OrderStatus.PROCESSING);
        OrderEntity updated = orderRepository.save(order);

        return mapToResponse(updated);
    }

    @Override
    public OrderResponse customerConfirmOrder(Long id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setCustomerConfirmed(true);
        orderRepository.save(order);
        return mapToResponse(order);
    }

    @Override
    public OrderResponse updateOrder(Long id, OrderRequest orderRequest) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Map<Long, OrderItemRequest> requestMap = orderRequest.getItems().stream()
                .collect(Collectors.toMap(OrderItemRequest::getProductId, i -> i));

        List<OrderItemEntity> updatedItems = new ArrayList<>();

        for (OrderItemEntity existingItem : order.getItems()) {
            OrderItemRequest reqItem = requestMap.get(existingItem.getProduct().getId());

            if (reqItem == null || (reqItem.getQuantity() != null && reqItem.getQuantity() <= 0)) {
                // REMOVED
                existingItem.setStatus(OrderItemStatus.REMOVED);
            } else if (reqItem.getNewQuantity() != null && !existingItem.getQuantity().equals(reqItem.getNewQuantity())) {
                // UPDATED
                if (existingItem.getOriginalQuantity() == null) {
                    existingItem.setOriginalQuantity(existingItem.getQuantity());
                }
                existingItem.setQuantity(reqItem.getNewQuantity());
                existingItem.setStatus(OrderItemStatus.UPDATED);
            } else {
                // sin cambios
                existingItem.setStatus(OrderItemStatus.ACTIVE);
            }

            updatedItems.add(existingItem);
        }

        for (OrderItemRequest reqItem : orderRequest.getItems()) {
            boolean exists = order.getItems().stream()
                    .anyMatch(i -> i.getProduct().getId().equals(reqItem.getProductId()));
            if (!exists && reqItem.getQuantity() != null && reqItem.getQuantity() > 0) {
                ProductEntity product = productRepository.findById(reqItem.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));

                OrderItemEntity newItem = new OrderItemEntity();
                newItem.setOrder(order);
                newItem.setProduct(product);
                newItem.setQuantity(reqItem.getQuantity());
                newItem.setOriginalQuantity(reqItem.getQuantity());
                newItem.setStatus(OrderItemStatus.ACTIVE);
                updatedItems.add(newItem);
            }
        }

        order.setItems(updatedItems);
        order.setModified(true);

        double total = updatedItems.stream()
                .filter(i -> i.getStatus() == OrderItemStatus.ACTIVE || i.getStatus() == OrderItemStatus.UPDATED)
                .mapToDouble(i -> i.getProduct().getPrice() * i.getQuantity())
                .sum();

        order.setTotal(total);

        orderRepository.save(order);

        return mapToResponse(order);
    }

    private OrderResponse mapToResponse(OrderEntity entity) {
        OrderResponse dto = new OrderResponse();
        dto.setId(entity.getId());
        dto.setOrderDate(entity.getOrderDate());
        dto.setDeliveryRequired(entity.isDeliveryRequired());
        dto.setStatus(entity.getStatus());
        dto.setModified(entity.isModified());
        dto.setCustomerConfirmed(entity.isCustomerConfirmed());
        dto.setTotal(entity.getTotal());
        dto.setUser(mapUserToResponse(entity.getUser()));

        List<OrderItemResponse> itemResponses = entity.getItems().stream()
                .map(this::mapOrderItemToResponse)
                .collect(Collectors.toList());

        dto.setItems(itemResponses);
        return dto;
    }

    private UserResponse mapUserToResponse(UserEntity user) {
        if (user == null) return null;

        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());

        Set<RoleResponse> roleResponses = user.getRoles() != null
                ? user.getRoles().stream()
                .map(this::mapRoleToResponse)
                .collect(Collectors.toSet())
                : Set.of();

        dto.setRoles(roleResponses);
        return dto;
    }

    private RoleResponse mapRoleToResponse(RoleEntity role) {
        if (role == null) return null;
        RoleResponse dto = new RoleResponse();
        dto.setId(role.getId());
        dto.setName(role.getName());
        return dto;
    }

    private ProductResponse mapProductToResponse(ProductEntity product) {
        if (product == null) return null;
        ProductResponse dto = new ProductResponse();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setStock(product.getStock());
        return dto;
    }

    private OrderItemResponse mapOrderItemToResponse(OrderItemEntity item) {
        OrderItemResponse dto = new OrderItemResponse();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setOriginalQuantity(item.getOriginalQuantity());
        dto.setStatus(item.getStatus());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setProduct(mapProductToResponse(item.getProduct()));
        return dto;
    }
}