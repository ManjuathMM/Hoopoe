package com.example.demo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "preorders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Preorder {

    @Id
    private String id;

    private String name;
    private String phone;
    private String email;
    private String address;
    private String model;
    private Double amount;
    private LocalDateTime createdAt;

    // Custom constructor (without ID and timestamp)
    public Preorder(String name, String phone, String email, String address, String model, Double amount) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.model = model;
        this.amount = amount;
        this.createdAt = LocalDateTime.now();
    }
}
