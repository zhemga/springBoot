package com.example.springboot.repositories;

import com.example.springboot.entities.Role;
import com.example.springboot.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Integer> {
    Role findByName(String name);
}
