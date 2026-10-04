# Customer Order & Inventory Management System

A full-stack business management application developed using Java, Spring Boot, React JS and MySQL.

The system helps manage customers, products, orders and inventory through a web-based interface and RESTful APIs.

## Features

- Customer management
    - Add customers
    - View customers
    - Update customer details
    - Delete customers

- Product management
    - Add products
    - View products
    - Update products
    - Delete products
    - Manage stock quantity

- Order management
    - Create orders with multiple products
    - Validate product stock
    - Calculate order totals automatically
    - Update product inventory after an order
    - View order details

- Inventory management
    - View current product stock
    - Identify low-stock products
    - Identify out-of-stock products

- Dashboard
    - Total customers
    - Total products
    - Total orders
    - Total sales

- Backend validation and exception handling

- REST API testing using Postman

## Technology Stack

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- REST APIs

### Frontend
- React JS
- JavaScript
- HTML
- CSS
- Axios
- React Router

### Database
- MySQL

### Tools
- IntelliJ IDEA
- MySQL Workbench
- Postman
- Git
- GitHub

## System Architecture

```text
React JS Frontend
        |
        | REST APIs / JSON
        ↓
Spring Boot Backend
        |
        | JPA / Hibernate
        ↓
      MySQL