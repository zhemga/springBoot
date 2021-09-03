package com.example.springboot.controllers;

import com.example.springboot.entities.Hospital;
import com.example.springboot.repositories.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api")
public class HospitalController {
    private final HospitalRepository hospitalRepository;

    @Autowired
    public HospitalController(HospitalRepository hospitalRepository) {
        this.hospitalRepository = hospitalRepository;
    }

    @PostMapping("/hospitals")
    ResponseEntity<Hospital> Create(@RequestBody Hospital item) {
        try {
            hospitalRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/hospitals")
    List<Hospital> ReadAll() {
        return StreamSupport.stream(hospitalRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/hospitals/{request}")
    List<Hospital> ReadAll(@PathVariable String request) {
        String requestLowerCase = request.toLowerCase(Locale.ROOT);
        return StreamSupport.stream(hospitalRepository.findAll().spliterator(), false)
                .filter(item -> item.getName().toLowerCase(Locale.ROOT).contains(requestLowerCase) || item.getAddress().toLowerCase(Locale.ROOT).contains(requestLowerCase))
                .collect(Collectors.toList());
    }

    @GetMapping("/hospitalsById/{id}")
    ResponseEntity<Hospital> ReadById(@PathVariable Integer id) {
        Optional<Hospital> item = hospitalRepository.findById(id);

        if (item.isPresent()) {
            return new ResponseEntity<>(item.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/hospitals")
    ResponseEntity<Hospital> Update(@RequestBody Hospital item) {
        try {
            if(hospitalRepository.findById(item.getId()) == null)
                throw new NotFoundException("Wrong id!");

            hospitalRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/hospitals/{id}")
    ResponseEntity<Integer> Delete(@PathVariable Integer id) {
        try {
            hospitalRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}