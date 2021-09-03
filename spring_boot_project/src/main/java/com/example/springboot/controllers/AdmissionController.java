package com.example.springboot.controllers;

import com.example.springboot.entities.Admission;
import com.example.springboot.repositories.AdmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api")
public class AdmissionController {
    private final AdmissionRepository admissionRepository;

    @Autowired
    public AdmissionController(AdmissionRepository admissionRepository) {
        this.admissionRepository = admissionRepository;
    }

    @PostMapping("/admissions")
    ResponseEntity<Admission> Create(@RequestBody Admission item) {
        try {
            admissionRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/admissions")
    List<Admission> ReadAll() {
        return StreamSupport.stream(admissionRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/admissions/{id}")
    ResponseEntity<Admission> ReadById(@PathVariable Integer id) {
        Optional<Admission> item = admissionRepository.findById(id);

        if (item.isPresent()) {
            return new ResponseEntity<>(item.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/admissions")
    ResponseEntity<Admission> Update(@RequestBody Admission item) {
        try {
            if(admissionRepository.findById(item.getId()) == null)
                throw new NotFoundException("Wrong id!");

            admissionRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/admissions/{id}")
    ResponseEntity<Integer> Delete(@PathVariable Integer id) {
        try {
            admissionRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
