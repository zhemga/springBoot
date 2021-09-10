package com.example.springboot.controllers;

import com.example.springboot.constants.Roles;
import com.example.springboot.entities.Hospital;
import com.example.springboot.entities.Role;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.HospitalRepository;
import com.example.springboot.repositories.RoleRepository;
import com.example.springboot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.webjars.NotFoundException;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@RestController
@RequestMapping("/api")
public class AuthController {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;

    @Autowired
    public AuthController(RoleRepository roleRepository, UserRepository userRepository, HospitalRepository hospitalRepository) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.hospitalRepository = hospitalRepository;
    }

    //Roles CRUD
    @PostMapping("/roles")
    ResponseEntity<Role> CreateRole(@RequestBody Role item) {
        try {
            roleRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/roles")
    List<Role> ReadAllRoles() {
        return StreamSupport.stream(roleRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/roles/{id}")
    ResponseEntity<Role> ReadRoleById(@PathVariable Integer id) {
        Optional<Role> item = roleRepository.findById(id);

        if (item.isPresent()) {
            return new ResponseEntity<>(item.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/roles")
    ResponseEntity<Role> UpdateRole(@RequestBody Role item) {
        try {
            if (roleRepository.findById(item.getId()) == null)
                throw new NotFoundException("Wrong id!");

            roleRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/roles/{id}")
    ResponseEntity<Integer> DeleteRole(@PathVariable Integer id) {
        try {
            roleRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Users CRUD
    @PostMapping("/makeDoctor")
    ResponseEntity<User> MakeDoctor(@RequestBody User item) {
        try {
            User user = userRepository.findById(item.getId()).get();

            if(user == null || user.getRoles().stream().anyMatch(x -> x.getName().equals(Roles.Doctor) || x.getName().equals(Roles.Admin)) ||
                    item.getName() == null || item.getHospital().getName() == null || item.getRoles() == null)
                throw new IllegalArgumentException();

            List<Role> filterRoles = item.getRoles().stream().filter(x -> roleRepository.findByName(x.getName()) != null)
                    .collect(Collectors.toList());

            List<Role> newRoles = new ArrayList<>();

            for (Role role: filterRoles) {
                newRoles.add(roleRepository.findByName(role.getName()));
            }

            if(newRoles.isEmpty())
                throw new IllegalArgumentException();

            List<Role> roles = user.getRoles();
            roles.addAll(newRoles);

            user.setName(item.getName());
            user.setSurname(item.getSurname());
            user.setHospital(hospitalRepository.findByName(item.getHospital().getName()));
            user.setRoles(roles);

            userRepository.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users")
    List<User> ReadAllUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/users/{request}")
    List<User> ReadAllUsers(@PathVariable String request) {
        String requestLowerCase = request.toLowerCase(Locale.ROOT);
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter(item -> item.getUsername().toLowerCase(Locale.ROOT).contains(requestLowerCase))
                .collect(Collectors.toList());
    }

    @GetMapping("/doctors")
    List<User> ReadAllDoctors() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter(user -> user.isUserInRole(Roles.Doctor))
                .collect(Collectors.toList());
    }

    @GetMapping("/doctors/{request}")
    List<User> ReadAllDoctors(@PathVariable String request) {
        String requestLowerCase = request.toLowerCase(Locale.ROOT);
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .filter(user -> user.isUserInRole(Roles.Doctor))
                .filter(item -> item.getName().toLowerCase(Locale.ROOT).contains(requestLowerCase) ||
                        item.getSurname().toLowerCase(Locale.ROOT).contains(requestLowerCase) ||
                        item.getHospital().getName().toLowerCase(Locale.ROOT).contains(requestLowerCase) ||
                        item.getUsername().toLowerCase(Locale.ROOT).contains(requestLowerCase) ||
                        item.getRoles().stream().filter(role -> !Roles.User.equals(role.getName()) && !Roles.Doctor.equals(role.getName()))
                                .anyMatch(role -> role.getName().toLowerCase(Locale.ROOT).contains(requestLowerCase)))
                .collect(Collectors.toList());
    }

    @GetMapping("/usersById/{id}")
    ResponseEntity<User> ReadUserById(@PathVariable Integer id) {
        Optional<User> item = userRepository.findById(id);

        if (item.isPresent()) {
            return new ResponseEntity<>(item.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/users")
    ResponseEntity<User> UpdateUser(@RequestBody User item) {
        try {
            if (userRepository.findById(item.getId()) == null)
                throw new NotFoundException("Wrong id!");

            userRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/users/{id}")
    ResponseEntity<Integer> DeleteUser(@PathVariable Integer id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
