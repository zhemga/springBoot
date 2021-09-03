package com.example.springboot.repositories;

import com.example.springboot.entities.Admission;
import org.springframework.data.repository.CrudRepository;

public interface AdmissionRepository  extends CrudRepository<Admission, Integer> {
}
