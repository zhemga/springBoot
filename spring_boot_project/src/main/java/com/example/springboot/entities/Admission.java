package com.example.springboot.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
@JsonIgnoreProperties("user, medic")
public class Admission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private String dateTime;
    @Column(nullable = false)
    private Boolean isHappened;
    @Column(nullable = false)
    private Boolean isCanceled;
    @ManyToOne(cascade=CascadeType.MERGE,  fetch = FetchType.EAGER)
    @JoinColumn(name = "user_admissions_id")
    private User user;
    @ManyToOne(cascade=CascadeType.MERGE,  fetch = FetchType.EAGER)
    @JoinColumn(name = "medic_admissions_id")
    private User medic;

    public Admission() {
    }

    public Admission(String dateTime, User user, User medic) {
        this.dateTime = dateTime;
        this.isHappened = false;
        this.isCanceled = false;
        this.user = user;
        this.medic = medic;
    }
}
