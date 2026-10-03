package com.akash.customerorderinventory.controller;

import com.akash.customerorderinventory.dto.CreateOrderRequest;
import com.akash.customerorderinventory.entity.CustomerOrder;
import com.akash.customerorderinventory.service.CustomerOrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;

    public CustomerOrderController(
            CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CustomerOrder createOrder(
            @Valid @RequestBody CreateOrderRequest request) {

        return customerOrderService.createOrder(request);
    }
}