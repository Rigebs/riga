package com.rige.services.impl;

import com.rige.dto.request.ProductRequest;
import com.rige.dto.response.CategoryResponse;
import com.rige.dto.response.ProductResponse;
import com.rige.entities.CategoryEntity;
import com.rige.entities.ProductEntity;
import com.rige.repositories.ICategoryRepository;
import com.rige.repositories.IProductRepository;
import com.rige.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements IProductService {

    private final IProductRepository productRepository;
    private final ICategoryRepository categoryRepository;

    @Override
    public List<ProductResponse> findAll() {
        return productRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public Optional<ProductResponse> findById(Long id) {
        return productRepository.findById(id)
                .map(this::mapToResponse);
    }

    @Override
    public ProductResponse save(ProductRequest request) {
        ProductEntity entity = mapToEntity(request);
        ProductEntity saved = productRepository.save(entity);
        return mapToResponse(saved);
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {
        ProductEntity existing = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existing.setName(request.getName());
        existing.setDescription(request.getDescription());
        existing.setPrice(request.getPrice());
        existing.setStock(request.getStock());

        if (request.getCategoryId() != null) {
            CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            existing.setCategory(category);
        }

        ProductEntity updated = productRepository.save(existing);
        return mapToResponse(updated);
    }

    private ProductEntity mapToEntity(ProductRequest request) {
        ProductEntity entity = new ProductEntity();
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        entity.setImageUrl(request.getImageUrl());
        entity.setPrice(request.getPrice());
        entity.setStock(request.getStock());

        if (request.getCategoryId() != null) {
            CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            entity.setCategory(category);
        }

        return entity;
    }

    private ProductResponse mapToResponse(ProductEntity entity) {
        ProductResponse dto = new ProductResponse();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setImageUrl(entity.getImageUrl());
        dto.setPrice(entity.getPrice());
        dto.setStock(entity.getStock());

        if (entity.getCategory() != null) {
            CategoryResponse categoryResponse = new CategoryResponse();
            categoryResponse.setId(entity.getCategory().getId());
            categoryResponse.setName(entity.getCategory().getName());
            categoryResponse.setDescription(entity.getCategory().getDescription());
            dto.setCategory(categoryResponse);
        }

        return dto;
    }
}