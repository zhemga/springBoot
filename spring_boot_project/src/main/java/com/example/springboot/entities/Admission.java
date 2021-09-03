package com.example.springboot.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Getter
@Setter
@Entity
public class Admission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    private Date dateTime;
    @Column(nullable = false)
    private Boolean isHappened;
    @Column(nullable = false)
    private Boolean isCanceled;
    @ManyToOne(cascade=CascadeType.MERGE,  fetch = FetchType.LAZY)
    @JoinColumn(name = "user_admissions_id")
    private User user;
    @ManyToOne(cascade=CascadeType.MERGE,  fetch = FetchType.LAZY)
    @JoinColumn(name = "medic_admissions_id")
    private User medic;
}
