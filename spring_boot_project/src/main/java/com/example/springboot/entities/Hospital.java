package com.example.springboot.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Getter
@Setter
@Entity
@Table(name="hospitals")
@JsonIgnoreProperties("medics")
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, length = 256)
    private String name;
    @Column(nullable = false, length = 256)
    private String address;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "hospital")
    private Collection<User> medics;

    public Hospital() {
    }

    public Hospital(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public Hospital(String name, String address, Collection<User> medics) {
        this.name = name;
        this.address = address;
        this.medics = medics;
    }
}

