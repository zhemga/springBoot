package com.example.springboot.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Entity
@Data
@Table(name="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String surname;
    private String username;
    private String password;
    private boolean enabled = true;
    @OneToMany(cascade=CascadeType.MERGE,  fetch = FetchType.LAZY)
    @JoinTable(name="user_admissions")
    private Collection<Admission> user_admissions;
    @OneToMany(cascade=CascadeType.MERGE,  fetch = FetchType.LAZY)
    @JoinTable(name="medic_admissions")
    private Collection<Admission> medic_admissions;
    @ManyToOne(cascade=CascadeType.MERGE,  fetch = FetchType.EAGER)
    @JoinColumn(name = "hospital_id")
    private Hospital hospital;
    @ManyToMany(cascade=CascadeType.MERGE,  fetch = FetchType.LAZY)
    @JoinTable(
            name="tblUserRoles",
            joinColumns={@JoinColumn(name="USER_ID", referencedColumnName="id")},
            inverseJoinColumns={@JoinColumn(name="ROLE_ID", referencedColumnName="id")})
    private List<Role> roles;

    public User() {
        roles=new ArrayList<Role>();
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
        this.enabled = true;
        roles=new ArrayList<Role>();
    }

    public User(String username, String password, List<Role> roles) {
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    public User(String name, String surname, String username, String password, Hospital hospital, List<Role> roles) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.password = password;
        this.hospital = hospital;
        this.roles = roles;
    }

    public Boolean isUserInRole(String roleName) {
        Boolean res = this.getRoles().stream().anyMatch(role -> roleName.equals(role.getName()));
        return res;
    }
}
