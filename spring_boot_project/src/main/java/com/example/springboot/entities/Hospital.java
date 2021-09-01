package com.example.springboot.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Collection;

@Getter
@Setter
@Entity
public class Hospital {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false, length = 256)
    private String name;
    @Column(nullable = false, length = 256)
    private String address;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "hospital")
    private Collection<User> medics;

    public Hospital() {
    }

    public Hospital(int id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    public Hospital(int id, String name, String address, Collection<User> medics) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.medics = medics;
    }
}

