package com.rige.services;

import com.rige.dto.request.CategoryRequest;
import com.rige.dto.response.CategoryResponse;

import java.util.List;

public interface ICategoryService {
    List<CategoryResponse> findAll();
    CategoryResponse findById(Long id);
    CategoryResponse save(CategoryRequest request);
}
