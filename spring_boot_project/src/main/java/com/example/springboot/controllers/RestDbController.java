package com.example.springboot.controllers;

import com.example.springboot.entities.Animal;
import com.example.springboot.entities.Role;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.AnimalRepository;
import com.example.springboot.repositories.RoleRepository;
import com.example.springboot.repositories.UserRepository;
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
public class RestDbController {
    private final AnimalRepository animalRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;

    @Autowired
    public RestDbController(AnimalRepository animalRepository, RoleRepository roleRepository, UserRepository userRepository) {
        this.animalRepository = animalRepository;
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
    }

    //Animals CRUD
    @PostMapping("/animals")
    ResponseEntity<Animal> CreateAnimal(@RequestBody Animal item) {
        try {
            animalRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/animals")
    List<Animal> ReadAllAnimal() {
        return StreamSupport.stream(animalRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/animals/{id}")
    ResponseEntity<Animal> ReadAnimalById(@PathVariable Integer id) {
        Optional<Animal> item = animalRepository.findById(id);

        if (item.isPresent()) {
            return new ResponseEntity<>(item.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/animals")
    ResponseEntity<Animal> UpdateAnimal(@RequestBody Animal item) {
        try {
            if(animalRepository.findById(item.getId()) == null)
                throw new NotFoundException("Wrong id!");

            animalRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/animals/{id}")
    ResponseEntity<Integer> DeleteAnimal(@PathVariable Integer id) {
        try {
            animalRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Roles CRUD
    @PostMapping("/roles")
    ResponseEntity<Role> CreateRole(@RequestBody Role item) {
        try {
            roleRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
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
            if(roleRepository.findById(item.getId()) == null)
                throw new NotFoundException("Wrong id!");

            roleRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/roles/{id}")
    ResponseEntity<Integer> DeleteRole(@PathVariable Integer id) {
        try {
            roleRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Users CRUD
    @PostMapping("/users")
    ResponseEntity<User> CreateUser(@RequestBody User item) {
        try {
            userRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users")
    List<User> ReadAllUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    @GetMapping("/users/{id}")
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
            if(userRepository.findById(item.getId()) == null)
                throw new NotFoundException("Wrong id!");

            userRepository.save(item);
            return new ResponseEntity<>(item, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/users/{id}")
    ResponseEntity<Integer> DeleteUser(@PathVariable Integer id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(id, HttpStatus.OK);
        }
        catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
