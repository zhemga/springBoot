package com.example.springboot.controllers;

import com.example.springboot.constants.Roles;
import com.example.springboot.entities.Admission;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.AdmissionRepository;
import com.example.springboot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/api")
public class AdmissionController {
    private final AdmissionRepository admissionRepository;
    private final UserRepository userRepository;

    @Autowired
    public AdmissionController(AdmissionRepository admissionRepository, UserRepository userRepository) {
        this.admissionRepository = admissionRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/admissions")
    ResponseEntity<Admission> Create(@RequestBody Admission item) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();

            Admission admission = new Admission(item.getDateTime(), userRepository
                    .findByUsername(userDetails.getUsername()), userRepository.findByUsername(item.getMedic().getUsername()));

            List<Admission> admissionList = StreamSupport.stream(admissionRepository.findAll().spliterator(), false)
                    .collect(Collectors.toList());

            if(admissionList.stream().anyMatch(x -> x.getDateTime().equals(admission.getDateTime()) && x.getMedic() == admission.getMedic() && !x.getIsCanceled()))
                throw new IllegalArgumentException();

            admissionRepository.save(admission);
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

    @GetMapping("/cancelAdmission/{id}")
    ResponseEntity<Admission> CancelAdmission(@PathVariable Integer id) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();

            User user = userRepository.findByUsername(userDetails.getUsername());
            if(!user.isUserInRole(Roles.User))
                throw new IllegalArgumentException();

            Admission admission = admissionRepository.findById(id).get();
            admission.setIsCanceled(true);
            admissionRepository.save(admission);

            return new ResponseEntity<>(admission, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/checkAdmission/{id}")
    ResponseEntity<Admission> CheckAdmission(@PathVariable Integer id) {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();

            User user = userRepository.findByUsername(userDetails.getUsername());
            if(!user.isUserInRole(Roles.Doctor))
                throw new IllegalArgumentException();

            Admission admission = admissionRepository.findById(id).get();
            admission.setIsHappened(true);
            admissionRepository.save(admission);

            return new ResponseEntity<>(admission, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/userAdmissions")
    ResponseEntity<List<Admission>> ReadAllUser() {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User user = userRepository.findByUsername(userDetails.getUsername());

            List<Admission> items = StreamSupport.stream(admissionRepository.findAll().spliterator(), false)
                    .filter(x -> x.getUser().getId() == user.getId())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(items, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/doctorAdmissions")
    ResponseEntity<List<Admission>> ReadAllDoctor() {
        try {
            UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
                    .getPrincipal();
            User medic = userRepository.findByUsername(userDetails.getUsername());

            List<Admission> items = StreamSupport.stream(admissionRepository.findAll().spliterator(), false)
                    .filter(x -> x.getMedic().getId() == medic.getId())
                    .collect(Collectors.toList());

            return new ResponseEntity<>(items, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
