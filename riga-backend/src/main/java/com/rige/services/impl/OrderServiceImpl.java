package com.rige.services.impl;

import com.rige.dto.request.OrderRequest;
import com.rige.dto.response.*;
import com.rige.entities.*;
import com.rige.enums.OrderStatus;
import com.rige.repositories.IOrderRepository;
import com.rige.repositories.IProductRepository;
import com.rige.repositories.IUserRepository;
import com.rige.services.IOrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements IOrderService {

    private final IOrderRepository orderRepository;
    private final IUserRepository userRepository;
    private final IProductRepository productRepository;

    @Override
    public List<OrderResponse> findAll() {
        return orderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
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

        double total = items.stream()
                .mapToDouble(i -> i.getUnitPrice() * i.getQuantity())
                .sum();
        order.setTotal(total);

        OrderEntity saved = orderRepository.save(order);

        return mapToResponse(saved);
    }

    private OrderResponse mapToResponse(OrderEntity entity) {
        OrderResponse dto = new OrderResponse();
        dto.setId(entity.getId());
        dto.setOrderDate(entity.getOrderDate());
        dto.setStatus(entity.getStatus());
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
        dto.setCategory(mapCategoryToResponse(product.getCategory()));
        return dto;
    }

    private CategoryResponse mapCategoryToResponse(CategoryEntity category) {
        if (category == null) return null;
        CategoryResponse dto = new CategoryResponse();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        return dto;
    }

    private OrderItemResponse mapOrderItemToResponse(OrderItemEntity item) {
        OrderItemResponse dto = new OrderItemResponse();
        dto.setId(item.getId());
        dto.setQuantity(item.getQuantity());
        dto.setUnitPrice(item.getUnitPrice());
        dto.setProduct(mapProductToResponse(item.getProduct()));
        return dto;
    }
}