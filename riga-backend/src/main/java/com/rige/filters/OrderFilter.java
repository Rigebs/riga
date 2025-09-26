package com.rige.filters;
import com.rige.enums.OrderStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
public class OrderFilter {

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime orderDateFrom;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDateTime orderDateTo;

    private OrderStatus status;
    private Double minTotal;
    private Double maxTotal;
    private Long userId;
}