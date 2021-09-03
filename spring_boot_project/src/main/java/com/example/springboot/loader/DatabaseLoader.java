package com.example.springboot.loader;

import com.example.springboot.constants.Roles;
import com.example.springboot.entities.Hospital;
import com.example.springboot.entities.Role;
import com.example.springboot.entities.User;
import com.example.springboot.repositories.HospitalRepository;
import com.example.springboot.repositories.RoleRepository;
import com.example.springboot.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final HospitalRepository hospitalRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseLoader(RoleRepository roleRepository, UserRepository userRepository, HospitalRepository hospitalRepository, PasswordEncoder passwordEncoder) {
        this.roleRepository = roleRepository;
        this.userRepository = userRepository;
        this.hospitalRepository = hospitalRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (this.roleRepository.count() == 0) {
            this.roleRepository.save(new Role(Roles.Admin));
            this.roleRepository.save(new Role(Roles.User));
            this.roleRepository.save(new Role(Roles.Doctor));
            this.roleRepository.save(new Role(Roles.Therapist));
            this.roleRepository.save(new Role(Roles.Surgeon));
        }
        if(this.hospitalRepository.count() == 0) {
            this.hospitalRepository.save(new Hospital("Rivne Central Hospital", "Rivne, Chornovola st., 26"));
            this.hospitalRepository.save(new Hospital("Lutsk Central Hospital", "Lutsk, Chornovola st., 6"));
            this.hospitalRepository.save(new Hospital("Lviv Central Hospital", "Lviv, Chornovola st., 2"));
        }
        if (this.userRepository.count() == 0) {
            this.userRepository.save(new User("semen@gmail.com", passwordEncoder.encode("123456"), Arrays.asList(roleRepository.findByName(Roles.User))));
            this.userRepository.save(new User("admin@gmail.com", passwordEncoder.encode("123456"), Arrays.asList(roleRepository.findByName(Roles.User), roleRepository.findByName(Roles.Admin))));
            this.userRepository.save(new User("Oleh", "Kravchuk", "therapist@gmail.com", passwordEncoder.encode("123456"), hospitalRepository.findByName("Rivne Central Hospital"), Arrays.asList(roleRepository.findByName(Roles.User), roleRepository.findByName(Roles.Doctor), roleRepository.findByName(Roles.Therapist))));
            this.userRepository.save(new User("Oleksiy", "Tkachuk", "surgeon@gmail.com", passwordEncoder.encode("123456"), hospitalRepository.findByName("Lutsk Central Hospital"), Arrays.asList(roleRepository.findByName(Roles.User), roleRepository.findByName(Roles.Doctor), roleRepository.findByName(Roles.Surgeon))));
        }
    }
}
