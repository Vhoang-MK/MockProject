package com.g5.talentportal.entities;
 
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
 
@Entity
@Table(name = "evaluation_criteria")
@Getter
@Setter
public class EvaluationCriteria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
 
    @Column(nullable = false)
    private String name;
 
    @Lob
    private String description;
 
    private int maxScore = 5;
}
 