package com.example.demo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContactRepository extends MongoRepository<Contact, String> {
    // No need to write anything unless you want custom queries
}
