package com.rige.controllers;

import com.rige.dto.request.ProductRequest;
import com.rige.dto.response.ApiResponse;
import com.rige.dto.response.ProductResponse;
import com.rige.services.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Products retrieved successfully", productService.findAll())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(@PathVariable Long id) {
        return productService.findById(id)
                .map(product -> ResponseEntity.ok(
                        new ApiResponse<>(true, "Product retrieved successfully", product)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(@RequestBody ProductRequest product) {
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Product created successfully", productService.save(product))
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(@PathVariable Long id, @RequestBody ProductRequest product) {
        return productService.findById(id)
                .map(existing -> ResponseEntity.ok(
                        new ApiResponse<>(true, "Product updated successfully", productService.update(id, product))))
                .orElse(ResponseEntity.notFound().build());
    }
}