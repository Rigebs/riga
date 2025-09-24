package com.rige.controllers;

import com.rige.dto.request.CategoryRequest;
import com.rige.dto.response.ApiResponse;
import com.rige.dto.response.CategoryResponse;
import com.rige.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final ICategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Categories retrieved successfully", categoryService.findAll())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategoryById(@PathVariable Long id) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Category retrieved successfully", categoryService.findById(id))
        );
    }

    @PostMapping
    public ResponseEntity<ApiResponse<CategoryResponse>> createCategory(@RequestBody CategoryRequest category) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Category created successfully", categoryService.save(category))
        );
    }
}