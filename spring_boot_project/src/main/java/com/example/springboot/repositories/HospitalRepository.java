package com.example.springboot.repositories;

import com.example.springboot.entities.Hospital;
import org.springframework.data.repository.CrudRepository;

public interface HospitalRepository extends CrudRepository<Hospital, Integer> {
    Hospital findByName(String name);
    Hospital findByAddress(String address);
}
