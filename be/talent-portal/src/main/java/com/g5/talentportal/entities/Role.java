package com.g5.talentportal.entities;
 
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
 
@Entity
@Table(name = "roles")
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
 
    @Column(length = 50, nullable = false, unique = true)
    private String name;
}
 